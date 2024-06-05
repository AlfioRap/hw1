// Elementi del DOM
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

// URL del tuo script PHP
const PHP_API_URL = '/login/php/lyrics_search.php';

// Funzione per cercare canzoni
async function searchSong(searchValue) {
    try {
        const response = await fetch(`${PHP_API_URL}?search=${encodeURIComponent(searchValue)}`);
        const data = await response.json();
        showSongs(data);
    } catch (error) {
        console.error("Errore nella ricerca delle canzoni:", error);
    }
}

// Funzione per visualizzare i risultati della ricerca
function showSongs(data) {
    const resultContainer = document.getElementById('result');
    if (data && data.data && data.data.length > 0) {
        resultContainer.innerHTML = ''; // Pulisce i risultati precedenti
        const ul = document.createElement('ul');
        ul.className = 'song-list';

        data.data.forEach(song => {
            const li = document.createElement('li');

            const div = document.createElement('div');
            div.innerHTML = `<strong>${song.artist.name}</strong> - ${song.title}`;

            const button = document.createElement('button');
            button.className = 'get-lyrics';
            button.setAttribute('data-artist', song.artist.name);
            button.setAttribute('data-songtitle', song.title);
            button.innerText = 'Ottieni Testo';

            li.appendChild(div);
            li.appendChild(button);
            ul.appendChild(li);
        });

        resultContainer.appendChild(ul);
    } else {
        resultContainer.innerHTML = "<p>Nessuna canzone trovata.</p>";
    }
}

// Funzione per ottenere il testo della canzone
async function getLyrics(artist, songTitle) {
    try {
        const res = await fetch(`${PHP_API_URL}?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(songTitle)}`);
        const data = await res.json();
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        const lyricsContainer = document.createElement('div');
        lyricsContainer.innerHTML = `
            <h4><strong>${artist}</strong> - ${songTitle}</h4>
            <p>${lyrics}</p>
        `;
        result.appendChild(lyricsContainer);
    } catch (error) {
        console.error("Errore nel recupero del testo della canzone:", error);
    }
}

// Event listener per la ricerca di canzoni
form.addEventListener('submit', e => {
    e.preventDefault(); // Previene il ricaricamento della pagina
    const searchValue = search.value.trim();

    if (!searchValue) {
        alert("Si prega di inserire una query di ricerca");
    } else {
        searchSong(searchValue);
    }
});

// Event listener per ottenere i testi delle canzoni
result.addEventListener('click', async e => {
    const clickedElement = e.target;

    if (clickedElement.classList.contains('get-lyrics')) {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
});
