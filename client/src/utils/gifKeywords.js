// Popular GIF keywords that work well with Giphy API
export const popularGifKeywords = [
  // Crypto-related
  'crypto', 'bitcoin', 'ethereum', 'blockchain', 'moon', 'diamond hands', 'hodl',
  'lambo', 'bull market', 'bear market', 'trading', 'profit', 'loss',
  
  // Emotions
  'happy', 'excited', 'celebration', 'party', 'dance', 'success', 'victory',
  'sad', 'crying', 'frustrated', 'angry', 'shocked', 'surprised',
  
  // Actions
  'money', 'cash', 'rich', 'poor', 'flying', 'rocket', 'explosion',
  'fire', 'ice', 'lightning', 'magic', 'power', 'speed',
  
  // Animals
  'cat', 'dog', 'lion', 'tiger', 'eagle', 'shark', 'wolf', 'bear', 'bull',
  
  // Popular memes
  'stonks', 'this is fine', 'mind blown', 'epic', 'awesome', 'fail',
  'winning', 'losing', 'fomo', 'yolo', 'gg', 'rekt',
  
  // Weather/Nature
  'sunny', 'rain', 'storm', 'rainbow', 'star', 'galaxy', 'ocean', 'mountain',
  
  // Food
  'pizza', 'burger', 'coffee', 'beer', 'cake', 'popcorn', 'ramen',
  
  // Technology
  'robot', 'computer', 'code', 'hacker', 'matrix', 'neon', 'cyber'
];

// Keywords that typically return good results
export const recommendedKeywords = [
  'crypto celebration',
  'money rain',
  'rocket moon',
  'diamond hands',
  'bull run',
  'ethereum logo',
  'bitcoin price',
  'hodl strong',
  'to the moon',
  'stack sats'
];

// Function to get random keyword suggestions
export const getRandomKeywords = (count = 5) => {
  const shuffled = [...popularGifKeywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get crypto-specific keywords
export const getCryptoKeywords = () => {
  return [
    'crypto', 'bitcoin', 'ethereum', 'blockchain', 'moon', 'diamond hands',
    'hodl', 'lambo', 'bull market', 'trading', 'profit', 'rocket',
    'to the moon', 'stack sats', 'defi', 'nft', 'web3'
  ];
};

// Function to suggest keywords based on input
export const suggestKeywords = (input) => {
  const inputLower = input.toLowerCase();
  
  // If input contains crypto terms, suggest crypto keywords
  if (inputLower.includes('crypto') || inputLower.includes('bitcoin') || inputLower.includes('eth')) {
    return getCryptoKeywords();
  }
  
  // If input contains emotion words, suggest emotion keywords
  if (inputLower.includes('happy') || inputLower.includes('sad') || inputLower.includes('angry')) {
    return ['happy', 'excited', 'celebration', 'sad', 'crying', 'angry', 'surprised', 'shocked'];
  }
  
  // Default suggestions
  return getRandomKeywords();
};
