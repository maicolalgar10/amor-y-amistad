document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.querySelector('.envelope');
    const closeBtn = document.getElementById('close-btn');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const heartsContainer = document.getElementById('hearts-container');

    let isPlaying = false;

    // Open Letter
    envelope.addEventListener('click', () => {
        if (!envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.add('open');
            
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('playing');
                    musicBtn.textContent = '⏸️';
                    isPlaying = true;
                }).catch(e => console.log('Audio play failed:', e));
            }
        }
    });

    // Close Letter
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent trigger envelope click again
        envelopeWrapper.classList.remove('open');
    });

    // Music toggle
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = '🎵';
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicBtn.classList.add('playing');
            musicBtn.textContent = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // Falling hearts effect
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        // Random properties
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5; // 5 to 10s
        const fontSize = Math.random() * 1.5 + 0.5; // 0.5 to 2rem
        
        heart.style.left = `${left}vw`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.fontSize = `${fontSize}rem`;
        
        heartsContainer.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }

    // Create hearts periodically
    setInterval(createHeart, 500);
});
