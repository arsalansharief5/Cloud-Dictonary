function searchWord() {
    const word = document.getElementById("searchInput").value.trim();
    const resultBox = document.getElementById("result");

    if (word === "") {
        resultBox.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
            if (data.title === "No Definitions Found") {
                resultBox.innerHTML = "<p>No definition found.</p>";
                return;
            }

            const info = data[0];

            const phonetic = info.phonetic || "";
            const audio = info.phonetics[0]?.audio || "";

            let definitionsHTML = "";
            info.meanings.forEach(m => {
                definitionsHTML += `
                    <h3>${m.partOfSpeech}</h3>
                    <ul>
                        ${m.definitions.map(d => `<li>${d.definition}</li>`).join("")}
                    </ul>
                `;
            });

            resultBox.innerHTML = `
                <h2>${info.word}</h2>
                <p><strong>Phonetic:</strong> ${phonetic}</p>

                ${audio ? `<button onclick="playAudio('${audio}')">🔊 Play Audio</button>` : ""}

                <h2>Definitions:</h2>
                ${definitionsHTML}
            `;
        })
        .catch(() => {
            resultBox.innerHTML = "<p>Error fetching data.</p>";
        });
}

function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
}