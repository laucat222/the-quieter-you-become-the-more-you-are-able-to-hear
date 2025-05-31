

// Wähle alle Video-Elemente und Audiodateien aus
const videos = document.querySelectorAll('video');
const sounds = [
    document.getElementById('best prices female'),
    document.getElementById('buy real money_female'),
    document.getElementById('carding counterfeits_male'),
    document.getElementById('cocaine xtc_female'),
    document.getElementById('discounts_anonimty_male'),
    document.getElementById('drugs cards guns_male'),
    document.getElementById('drugs hackers male'),
    document.getElementById('enter here female'),
    document.getElementById('gadgets_female'),
document.getElementById('hardcore porn_male'),
document.getElementById('killings_male'),
document.getElementById('need money need proof_female'),
document.getElementById('trust the people_female'),

];
document.querySelectorAll('.video-container').forEach(video => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialX = 0, initialY = 0;

    video.addEventListener('mousedown', (e) => {
        isDragging = true;
        video.style.cursor = 'grabbing';

        // Z-Index auf einen hohen Wert setzen, damit das Video im Vordergrund bleibt
        video.style.zIndex = 9999;

        // Startposition der Maus speichern
        startX = e.clientX;
        startY = e.clientY;

        // Aktuelle Position des Videos abrufen
        const rect = video.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        // Bewegungshandler
        const moveHandler = (e) => {
            if (isDragging) {
                // Verschiebung berechnen
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                // `left` und `top` Eigenschaften direkt setzen
                video.style.transform = `translate(${dx}px, ${dy}px)`; // Bewege das Video
            }
        };

        // Dragging stoppen
        const stopDrag = () => {
            isDragging = false;
            video.style.cursor = 'grab';

            // Z-Index beibehalten, wenn das Dragging beendet ist
            video.style.zIndex = 9999; // Video bleibt im Vordergrund

            // Event-Listener entfernen
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', stopDrag);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopDrag);
    });

    // Optional: Den Z-Index zurücksetzen, wenn ein anderes Video angeklickt wird
    video.addEventListener('mouseup', () => {
        document.querySelectorAll('.video-container').forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.style.zIndex = ''; // Z-Index auf Standard zurücksetzen
            }
        });
    });
});

