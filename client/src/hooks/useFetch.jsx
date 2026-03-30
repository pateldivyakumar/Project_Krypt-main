import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        if (!APIKEY || !keyword) {
          setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
          return;
        }
        
        // Clean the keyword for better search results
        const cleanKeyword = keyword.trim().toLowerCase().replace(/\s+/g, "");
        
        console.log(`🔍 Fetching GIF for keyword: "${keyword}" (cleaned: "${cleanKeyword}")`);
        
        // Simple, reliable API call
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${encodeURIComponent(cleanKeyword)}&limit=5&rating=g&lang=en`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { data } = await response.json();
        console.log(`📊 Found ${data.length} GIFs for "${keyword}"`);

        if (data && data.length > 0) {
          // Pick a random GIF from the results for variety
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedGif = data[randomIndex];
          const gifUrl = selectedGif?.images?.downsized_medium?.url;
          
          if (gifUrl) {
            setGifUrl(gifUrl);
            console.log(`✅ Selected GIF (${randomIndex + 1}/${data.length}): ${gifUrl}`);
          } else {
            console.log(`❌ GIF data invalid for keyword: "${keyword}"`);
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
          }
        } else {
          console.log(`❌ No GIFs found for keyword: "${keyword}"`);
          setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
      } catch (error) {
        console.error("❌ Error fetching GIF:", error);
        setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
      }
    };

    if (keyword) {
      fetchGifs();
    } else {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  }, [keyword]);

  return gifUrl;
};

export default useFetch;