import OpenAI from 'openai';

// Mock API for testing without API keys
export async function generateCaptionsMock(formData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockCaptions = [
    `✨ Elevate your style with ${formData.productName}! ${formData.productDetails} Shop now and transform your look! #Fashion #Style #ShopNow`,
    `🌟 Discover the perfect ${formData.productName} that's been missing from your life! ${formData.productDetails} Limited time offer! #Trending #MustHave`,
    `💫 Experience luxury with ${formData.productName}! ${formData.productDetails} Don't miss out on this amazing deal! #Luxury #Exclusive`
  ];
  
  return mockCaptions;
}

// Real OpenAI integration
export async function generateCaptions(formData) {
  try {
    // Check if we have an API key before making the request
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('No OpenAI API key found. Using mock data instead.');
      return generateCaptionsMock(formData);
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Check rate limit before making the request
    checkRateLimit();

    const prompt = `Generate 3 engaging social media captions for the following product:
    Product Name: ${formData.productName}
    Description: ${formData.productDetails}
    Tone: ${formData.tone}
    Platform: ${formData.platform}
    Keywords: ${formData.keywords.join(', ')}

    Requirements:
    1. Each caption should be unique and creative
    2. Include relevant emojis where appropriate
    3. Match the specified tone
    4. Optimize for the specified platform
    5. Include relevant hashtags
    6. Keep each caption under 220 characters
    7. Make them engaging and action-oriented
    8. Include a call-to-action
    9. Use the provided keywords naturally

    Format each caption as a separate line.`;

    const completion = await retryWithBackoff(async () => {
      return await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional social media copywriter specializing in e-commerce and product marketing."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
    });

    // Process and validate the response
    const captions = completion.choices[0].message.content
      .split('\n')
      .filter(caption => caption.trim().length > 0)
      .map(caption => caption.trim());

    if (captions.length === 0) {
      throw new AIError(
        'No valid captions generated',
        'NO_CAPTIONS_GENERATED',
        500
      );
    }

    return captions;
  } catch (error) {
    // Handle specific error types
    if (error instanceof AIError) {
      throw error;
    }

    // Handle OpenAI API errors
    if (error.response) {
      const statusCode = error.response.status;
      let errorType = 'API_ERROR';
      let message = 'An error occurred while generating captions.';

      switch (statusCode) {
        case 401:
          errorType = 'AUTHENTICATION_ERROR';
          message = 'Invalid API key. Please check your configuration.';
          break;
        case 429:
          errorType = 'RATE_LIMIT_EXCEEDED';
          message = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorType = 'SERVER_ERROR';
          message = 'OpenAI service is currently unavailable.';
          break;
        default:
          message = error.response.data?.error?.message || message;
      }

      throw new AIError(message, errorType, statusCode);
    }

    // Handle network errors
    if (error.request) {
      throw new AIError(
        'Network error. Please check your connection.',
        'NETWORK_ERROR',
        0
      );
    }

    // Handle other errors
    throw new AIError(
      'An unexpected error occurred.',
      'UNKNOWN_ERROR',
      500
    );
  }
}

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10, // Maximum requests per minute
  windowMs: 60000, // 1 minute window
};

// Store for rate limiting
let requestTimestamps = [];

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 5000, // 5 seconds
};

// Error types
class AIError extends Error {
  constructor(message, type, statusCode) {
    super(message);
    this.name = 'AIError';
    this.type = type;
    this.statusCode = statusCode;
  }
}

// Rate limiting check
function checkRateLimit() {
  const now = Date.now();
  // Remove timestamps older than the window
  requestTimestamps = requestTimestamps.filter(
    timestamp => now - timestamp < RATE_LIMIT.windowMs
  );
  
  if (requestTimestamps.length >= RATE_LIMIT.maxRequests) {
    throw new AIError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT_EXCEEDED',
      429
    );
  }
  
  requestTimestamps.push(now);
}

// Exponential backoff for retries
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff(operation, retryCount = 0) {
  try {
    return await operation();
  } catch (error) {
    if (retryCount >= RETRY_CONFIG.maxRetries) {
      throw error;
    }

    const delay = Math.min(
      RETRY_CONFIG.initialDelay * Math.pow(2, retryCount),
      RETRY_CONFIG.maxDelay
    );

    await sleep(delay);
    return retryWithBackoff(operation, retryCount + 1);
  }
} 