const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.translate = async (text) => {
  try {
    // Используем MyMemory Translation API (бесплатный, без ключа)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ru|es`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error('Translation failed: ' + res.status);
    }

    const data = await res.json();
    
    if (data.responseStatus !== 200) {
      throw new Error('Translation API error: ' + data.responseStatus);
    }

    const translated = data.responseData.translatedText;
    
    if (!translated) {
      throw new Error('No translation received');
    }

    return { text, translated };
  } catch (e) {
    console.error('Translation error:', e);
    throw e;
  }
};