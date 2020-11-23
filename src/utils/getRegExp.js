function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function getRegExp(prefix, suggestions=null, exact=true) {
  const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
  let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

  if (prefixArray.length > 1) {
    prefixToken = `[${prefixToken}]`;
  }

  if (suggestions) {
    if (!exact) {
     const notExactSuggestions = [];
     suggestions.forEach(suggestion => {
       let token = "";
       suggestion.split("").forEach((ch, index) => {
         token += ch;
          if (token.length === suggestion.length) {
            notExactSuggestions.push(token);
          } else {
            notExactSuggestions.push("" + token + "");
          }
       })
     });

     suggestions = notExactSuggestions;
    } 
    const sortedSuggestions = suggestions.slice().sort().reverse();
    const regExString = sortedSuggestions
        .map((suggestion) => `\(${escapeRegExp(suggestion)})`)
        .join('|');

    const regex= new RegExp(`(\\s|^)(${prefixToken})(${regExString}){0,1}`, 'g');
    return regex;
  }



  return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
}
