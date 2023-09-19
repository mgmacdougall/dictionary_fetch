function randomWord() {
  const data = ["Hello", "Good", "Ugly"];
  return data[Math.ceil(Math.random() * (data.length - 1))];
}

function getMeanings(wordDetails, wordObj) {
  console.log(wordObj.phonetics);

  let meaningElString = "";
  let { audio } = wordObj.phonetics[0];

  wordDetails.map((word) => {
    const { partOfSpeech } = word;
    meaningElString += `${partOfSpeech} `;
  });

  const resultDefinitions = [];
  wordDetails.map((word) => {
    word.definitions.forEach((_word, idx) => {
      if (idx === 0) {
        resultDefinitions.push(`<div>${_word.definition}</div>`);
      } else {
        resultDefinitions.push(`<div>${_word.definition}</div>`);
      }
    });
  });

  const definitionResult = resultDefinitions.join("\n");
  definitionResult.replace(" ", "\n");
  let result = `
        <div>
            <p><strong>Part of speech</strong>: ${meaningElString.replace(
              " ",
              ", "
            )}</p>
            <p><strong>Definitions</strong>:</p>
            
            <div>${definitionResult.replace(" ", "\n")}</div>
            <a href="${wordObj.sourceUrls[0]}" target="_blank">Definition</a>
            <div>
            <span>Phoentics:</span></div>
            <div>
                <audio controls>
                    <source src="${audio}" type="audio/mp4">
                </audio controls>
            </div>
        </div>
    `;
  return result;
}

function render(details) {
  console.log(details);
  const rootEl = document.getElementById("root");

  const listDetails = details.map((word) => {
    return `
        <li class="word-item">
            <h4>${word.word}</h4>
            ${getMeanings(word.meanings, word)}
        </li>
        `;
  });

  listDetails.join(" ");

  rootEl.innerHTML = `
  <ul class="list">
      ${listDetails.join(" ")}
  </ul>
`;
}

document
  .getElementById("word-to-find")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const result = document.getElementById("word").value.trim();
    console.log(result);
    getWord(result);
  });

function getWord(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((resp) => resp.json())
    .then((data) => render(data));
}

getWord(randomWord());
