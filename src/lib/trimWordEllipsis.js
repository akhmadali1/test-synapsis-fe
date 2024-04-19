export function TrimWords(text, maxLength, ellipsis = '...') {
    if (!text) return '';
  
    const words = text.split(' ');
    let trimmedText = '';
  
    for (let i = 0; i < words.length; i++) {
      if (trimmedText.length + words[i].length > maxLength) {
        return trimmedText.trim() + (ellipsis ? ellipsis : '');
      }
  
      trimmedText += (trimmedText ? ' ' : '') + words[i];
    }
  
    return trimmedText.trim();
  }