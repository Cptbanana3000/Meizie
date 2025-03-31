// Mock API for testing without API keys
export async function generateCaptionsMock(promptData) {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { productName, details, tone, platform, keywords } = promptData;
  const keywordsList = keywords.join(', ');
  
  // Sample captions based on inputs
  const samples = [
    `✨ Elevate your style with our ${productName}! Perfect for ${platform === 'instagram' ? 'your feed' : 'showing off'}. ${details.split('\n')[0]} #${keywords[0] || 'quality'} #${platform || 'shopping'}`,
    
    `🔥 Don't miss out on our amazing ${productName}! ${tone === 'urgent' ? 'Limited stock available!' : ''} ${details.split('\n')[0]} ${keywordsList ? `Featuring: ${keywordsList}` : ''} #musthave #${platform || 'ecommerce'}`,
    
    `${tone === 'luxury' ? '💎' : '👋'} Discover the perfect ${productName} for your needs! ${details.split('\n')[0]} ${tone === 'friendly' ? 'We know you\'ll love it!' : 'Premium quality guaranteed.'} #${keywords[0] || 'trending'} #${keywords[1] || 'shopping'}`
  ];
  
  return samples;
}

// Real OpenAI integration
export async function generateCaptions(promptData) {
  try {
    // Check if we have an API key before making the request
    const apiKey = import.meta.env.VITE_OPENAI_KEY;
    
    if (!apiKey) {
      console.warn('No OpenAI API key found. Using mock data instead.');
      return generateCaptionsMock(promptData);
    }
    
    const { productName, details, tone, platform, keywords } = promptData;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        store: true,
        messages: [{
          role: "user",
          content: `Act as professional e-commerce copywriter. Write 3 ${tone} captions for ${platform} about ${productName}. 
                    Details: ${details}. Keywords: ${keywords.join(', ')}. Include emojis and 2 hashtags. Max 220 chars per caption.`
        }],
        temperature: 0.7,
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return generateCaptionsMock(promptData);
    }
    
    // Parse the response - OpenAI might return in various formats
    // We'll try to split by numbers (1., 2., 3.) or newlines
    const content = data.choices[0].message.content;
    return content
      .split(/\d+\.|\n\n/)
      .map(text => text.trim())
      .filter(text => text.length > 0);
      
  } catch (error) {
    console.error('Error generating captions:', error);
    return generateCaptionsMock(promptData);
  }
} 