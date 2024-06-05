
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
        '../im/uni.png',
        '../im/sonny.png',
        '../im/war.png',
        '../im/net.png',
        '../im/fed.png',
        '../im/ral.png',
        '../im/ads.png',
        '../im/lav.png',
        '../im/nik.png',
        '../im/redb.png'
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