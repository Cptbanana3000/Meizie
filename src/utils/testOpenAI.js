// A simple script to test OpenAI API integration

async function testOpenAI() {
  const apiKey = process.env.VITE_OPENAI_KEY;
  
  if (!apiKey) {
    console.error('No API key found. Please check your .env file.');
    return;
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {"role": "user", "content": "write a haiku about e-commerce"}
        ],
      })
    });
    
    const data = await response.json();
    console.log('API response:', data);
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return;
    }
    
    console.log('Generated content:', data.choices[0].message.content);
  } catch (error) {
    console.error('Error testing OpenAI API:', error);
  }
}

// You can uncomment and run this when needed
// testOpenAI();

export { testOpenAI }; 