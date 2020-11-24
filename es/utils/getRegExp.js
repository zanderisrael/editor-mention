function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function getRegExp(prefix) {
  var suggestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var exact = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var withoutLeadingWhitespace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var prefixArray = Array.isArray(prefix) ? prefix : [prefix];
  var prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

  if (prefixArray.length > 1) {
    prefixToken = '[' + prefixToken + ']';
  }

  if (suggestions) {
    if (!exact) {
      var notExactSuggestions = [];
      suggestions.forEach(function (suggestion) {
        var token = "";
        suggestion.split("").forEach(function (ch, index) {
          token += ch;
          if (token.length === suggestion.length) {
            notExactSuggestions.push(token);
          } else {
            notExactSuggestions.push("" + token + "");
          }
        });
      });

      suggestions = notExactSuggestions;
    }
    var sortedSuggestions = suggestions.slice().sort().reverse();
    var regExString = sortedSuggestions.map(function (suggestion) {
      return '(' + escapeRegExp(suggestion) + ')';
    }).join('|');

    if (withoutLeadingWhitespace) {
      return new RegExp('()(' + prefixToken + ')(' + regExString + '){0,1}', 'g');
    }
    var regex = new RegExp('(\\s|^)(' + prefixToken + ')(' + regExString + '){0,1}', 'g');
    return regex;
  }

  return new RegExp('(\\s|^)(' + prefixToken + ')[^\\s]*', 'g');
}