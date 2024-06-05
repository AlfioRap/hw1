document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('.menu');
  const closeIcon = document.querySelector('.close-icon');

  menuIcon.addEventListener('click', function() {
    menu.classList.toggle('active');
  });

  closeIcon.addEventListener('click', function() {
    menu.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const images = [
    '../login/im/uni.png',
    '../login/im/sonny.png',
    '../login/im/war.png',
    '../login/im/net.png',
    '../login/im/fed.png',
    '../login/im/ral.png',
    '../login/im/ads.png',
    '../login/im/lav.png',
    '../login/im/nik.png',
    '../login/im/redb.png'
  ];

  let currentIndex = 0;

  const image1 = document.getElementById('image1');
  const image2 = document.getElementById('image2');
  const image3 = document.getElementById('image3');
  const image4 = document.getElementById('image4');
  const Back = document.getElementById('back');
  const Next = document.getElementById('next');

  function updateGallery() {
      image1.src = images[currentIndex];
      image2.src = images[currentIndex + 1];
      image3.src = images[currentIndex + 2];
      image4.src = images[currentIndex + 3];

      // Nascondi il pulsante "Back" quando siamo alla prima immagine
      if (currentIndex === 0) {
          Back.style.visibility = "hidden";
      } else {
          Back.style.visibility = "visible";
      }

      // Nascondi il pulsante "Next" quando siamo all'ultima immagine
      if (currentIndex >= images.length - 4) {
          Next.style.visibility = "hidden";
      } else {
          Next.style.visibility = "visible";
      }
  }

  Back.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
      }
  });

  Next.addEventListener('click', () => {
      if (currentIndex < images.length - 4) {
          currentIndex++;
          updateGallery();
      }
  });

  const indicators = document.querySelectorAll('.indicator');

  indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
          const index = parseInt(indicator.dataset.index);
          currentIndex = index;
          updateGallery();
      });
  });

  updateGallery();
});




document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("album-search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      fetchAlbums();
    });
  

    document.getElementById("clear-search-button").addEventListener("click", clearSearch);

    function fetchAlbums() {
      const query = encodeURIComponent(document.getElementById("album").value);
      fetch(`php/fetch_song.php?q=${query}`)
        .then(fetchResponse)
        .then(fetchAlbumsJson)
        .catch(error => console.error('Error:', error));
    }
  
    function fetchResponse(response) {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error) });
      }
      return response.json();
    }
  
    function fetchAlbumsJson(json) {
      console.log("Fetching...");
      console.log(json);
      if (!json.albums || !json.albums.items.length) {
        noResults();
        return;
      }
  
      const container = document.getElementById('album-view');
      container.innerHTML = '';
      container.className = 'spotify';
  
      const albums = json.albums.items;
  
      for (let album of albums) {
        const card = document.createElement('div');
        card.dataset.id = album.id;
        card.classList.add('album');
  
        const albumInfo = document.createElement('div');
        albumInfo.classList.add('albumInfo');
        card.appendChild(albumInfo);
  
        const img = document.createElement('img');
        img.src = album.images[0]?.url || 'placeholder.jpg';
        albumInfo.appendChild(img);
  
        const infoContainer = document.createElement('div');
        infoContainer.classList.add("infoContainer");
        albumInfo.appendChild(infoContainer);
  
        const info = document.createElement('div');
        info.classList.add("info");
        infoContainer.appendChild(info);
  
        const name = document.createElement('strong');
        name.innerHTML = album.name;
        info.appendChild(name);
  
        const artist = document.createElement('a');
        artist.innerHTML = album.artists.map(a => a.name).join(', ');
        info.appendChild(artist);
  
        const saveButton = document.createElement('button');
        saveButton.innerText = "Salva";
        saveButton.classList.add('button');
        saveButton.addEventListener('click', () => saveAlbum(album));
        card.appendChild(saveButton);
  
        container.appendChild(card);
      }
    }



    function clearSearch() {
      const container = document.getElementById('album-view');
      container.innerHTML = '';
      container.className = '';
      document.getElementById('album').value = '';
  }

  function noResults() {
      const container = document.getElementById('album-view');
      container.className = '';
  }



    function saveAlbum(album) {
      const formData = new FormData();
      formData.append('album_id', album.id);
      formData.append('name', album.name);
      formData.append('artist', album.artists.map(a => a.name).join(', '));
      formData.append('image_url', album.images[0]?.url || 'placeholder.jpg');
      formData.append('spotify_url', album.external_urls.spotify);
    
      fetch('php/save_album.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Album salvato con successo!');
            alert('Album salvato con successo!');
    
            // Dispatch event with album details
            const event = new CustomEvent('albumSaved', {
              detail: {
                album: data.album
              }
            });
            document.dispatchEvent(event);
          } else {
            console.error('Errore:', data.error);
          }
        })
        .catch(error => console.error('Errore:', error));
    }
    
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Carica gli album preferiti all'avvio
    fetch('php/get_favorites.php')
        .then(response => response.json())
        .then(albums => {
            const favoritesContainer = document.getElementById('favorites');
            favoritesContainer.innerHTML = '';
            albums.forEach(album => {
                addAlbumToFavorites(album, favoritesContainer);
            });
        })
        .catch(error => console.error('Error:', error));
    
    // Funzione per aggiungere album ai preferiti
    function addAlbumToFavorites(album, container) {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');

        const img = document.createElement('img');
        img.src = album.image_url || 'placeholder.jpg';
        albumDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('album-info');

        const name = document.createElement('span');
        name.textContent = album.name;
        infoDiv.appendChild(name);

        const artist = document.createElement('span');
        artist.textContent = album.artist;
        infoDiv.appendChild(artist);

        albumDiv.appendChild(infoDiv);
        container.appendChild(albumDiv);
    }

    // Salva album e aggiorna la lista dei preferiti
    document.addEventListener('albumSaved', event => {
        const album = event.detail.album;
        const favoritesContainer = document.getElementById('favorites');
        addAlbumToFavorites(album, favoritesContainer);
    });
});






  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletterForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene l'invio del form tradizionale

        const formData = new FormData(form);

        fetch('php/subscribe.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore di rete');
            }
            return response.json();
        })
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            const errorMessage = document.getElementById('errorMessage');
            if (data.success) {
                responseMessage.innerHTML = `<p>${data.message}</p>`;
                errorMessage.innerHTML = ''; // Pulisce eventuali messaggi di errore
                form.reset(); // Resetta il form in caso di successo
            } else {
                errorMessage.innerHTML = `<p>${data.message}</p>`;
                responseMessage.innerHTML = ''; // Pulisce eventuali messaggi di successo
            }
        })
        .catch(error => {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.innerHTML = `<p>${error.message}</p>`;
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = ''; // Pulisce eventuali messaggi di successo
        });
    });
});















