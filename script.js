let words = ["xxbxx", "xbx", "x"];
// let words = ["aabb", "aaaa", "bbab"];
// let words = ["dd", "bb", "cc", "dd"];

// Test Run
console.log(longestSubstring(words)); // ex result { letter: 'x', length: 4 }

function longestSubstring(words) {
  let currentArray = [...words];
  let combinedWords = [];
  let currentIdx = 0;

  // Build combinations
  while (currentIdx < words.length) {
    // Switch elements in the current array. ex: ['xxbxx', 'xbx', 'x'] to [ 'xbx', 'xxbxx', 'x' ]
    if (currentArray[currentIdx + 1]) {
      const right = currentArray[currentIdx + 1];
      currentArray[currentIdx + 1] = currentArray[currentIdx];
      currentArray[currentIdx] = right;
    }

    currentIdx++;

    // Continue building combinations if needed
    if (currentIdx === words.length) {
      const check = currentArray.every(
        (currentWord, idx) => currentWord === words[idx]
      );

      if (!check) {
        currentIdx = 0;
      }
    } else {
      combinedWords.push(currentArray.join(""));
      // console.log("current", currentArray, combinedWords); // check
    }
  }

  // Find maxCount and maxChars of consecutive characters
  return maxConsecutiveCharactersList(combinedWords); // ex: { letter: 'x', length: 4 }
}

// Find maxCount and maxChars of consecutive characters
function maxConsecutiveCharactersList(combinedWords) {
  let maxChar = "";
  let maxCount = 0;
  let maxResults = [];

  // Check consecutive characters and update maxCount and maxChar
  for (let word of combinedWords) {
    let currentChar = word[0];
    let charCount = 1;

    maxChar = currentChar;
    maxCount = charCount;

    for (let i = 0; i < word.length; i++) {
      if (word[i + 1] !== currentChar) {
        if (maxCount <= charCount) {
          maxCount = charCount;
          maxChar = currentChar;
          maxResults.push({ letter: maxChar, length: maxCount });
        }

        currentChar = word[i + 1];
        charCount = 1;
      } else if (word[i + 1] === currentChar) {
        charCount++;

        if (maxCount < charCount) {
          maxCount = charCount;
          maxChar = currentChar;
          maxResults.push({ letter: maxChar, length: maxCount });
        }
      }
    }
    // console.log(word, charCount, maxChar, maxCount, maxResults); // check
  }

  // Find result with most consecutive characters
  let mxLengthValues = maxResults[0].length;
  let result;

  for (let i = 0; i < maxResults.length; i++) {
    if (maxResults[i].length > mxLengthValues) {
      mxLengthValues = maxResults[i].length;
      result = maxResults[i];
    }
  }

  return result;
}
