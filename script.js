document.addEventListener("DOMContentLoaded", () => {
    // Prüfen, ob es sich um einen echten Refresh handelt
    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isRealRefresh = navigationEntry.type === "reload";
    
    // DOM-Elemente
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.querySelector(".close");
    const audios = document.querySelectorAll("audio");
    const videos = document.querySelectorAll("video");

    // Audio-Steuerungsfunktionen
    function playAllSounds() {
        audios.forEach(audio => {
            audio.loop = true;
            audio.muted = false;
            audio.play()
                .catch(error => console.log("Fehler beim Abspielen der Hintergrundsounds:", error));
        });
        console.log("Sounds werden abgespielt");
    }

    // Nur bei echtem Refresh den localStorage zurücksetzen und Popup anzeigen
    if (isRealRefresh) {
        localStorage.removeItem("popupShown");
        console.log("Seite wurde neu geladen - Pop-up wird angezeigt");
        
        if (popup && overlay) {
            overlay.style.display = "block";
            popup.style.display = "block";
        }
    } else {
        console.log("Navigation - kein Pop-up");
        // Wenn das Popup bereits geschlossen wurde, Sounds abspielen
        if (localStorage.getItem("popupShown") === "true") {
            playAllSounds();
        }
    }

    // Event Listener für Close-Button
    if (closeBtn && popup && overlay) {
        closeBtn.addEventListener("click", () => {
            overlay.style.display = "none";
            popup.style.display = "none";
            localStorage.setItem("popupShown", "true");
            console.log("Pop-up wurde geschlossen.");
            playAllSounds(); // Sound starten nach dem Schließen
        });
    }

    // Initialisiere Click Counter für jedes Video
    videos.forEach((video, index) => {
        // Hole gespeicherte Klicks oder setze auf 0 falls noch nicht vorhanden
        let clicks = parseInt(localStorage.getItem(`video${index}Clicks`)) || 0;
        
        // Event Listener für Klicks
        video.addEventListener("click", () => {
            clicks++;
            localStorage.setItem(`video${index}Clicks`, clicks);
            console.log(`Video ${index + 1} wurde ${clicks} mal geklickt`);
        });
    });
});
