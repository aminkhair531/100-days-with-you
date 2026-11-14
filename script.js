let currentPage = 0;
const totalPages = 5;
let musicPlaying = false;

// YouTube-д тушаал илгээх
function ytCommand(func) {
    const player = document.getElementById("ytPlayer");
    if (player && player.contentWindow) {
        player.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: func, args: "" }),
            "*"
        );
    }
}

// Дууны товчнуудын харагдацыг шинэчлэх
function updateMusicUI() {
    document.querySelectorAll(".musicIcon").forEach(el => {
        el.textContent = musicPlaying ? "Ⅱ" : "▶";
    });
    document.querySelectorAll(".musicText").forEach(el => {
        el.textContent = musicPlaying ? "ДУУГ ЗОГСООХ" : "ДУУГ АСААХ";
    });
}

function showPage(index) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => page.classList.remove("active"));
    pages[index].classList.add("active");

    currentPage = index;

    document.getElementById("navigation").hidden = (index === 0);

    document.getElementById("pageCounter").textContent =
        String(index + 1).padStart(2, "0") + " / " +
        String(totalPages).padStart(2, "0");

    document.getElementById("prevBtn").disabled = index === 0;
    document.getElementById("nextBtn").disabled = index === totalPages - 1;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// "БИДНИЙ ТҮҮХИЙГ НЭЭХ" товч
function startStory() {
    ytCommand("unMute");
    ytCommand("playVideo");
    musicPlaying = true;
    updateMusicUI();
    showPage(1);
}

function changePage(direction) {
    const nextPage = currentPage + direction;
    if (nextPage >= 0 && nextPage < totalPages) {
        showPage(nextPage);
    }
}

function openLetter() {
    const envelope = document.getElementById("envelope");
    const hint = document.getElementById("letterHint");

    envelope.classList.toggle("open");

    hint.textContent = envelope.classList.contains("open")
        ? "Чамд зориулсан жижигхэн захидал ♡"
        : "Захидлыг нээхийн тулд дугтуйг дар ♡";
}

// Дуу асаах / зогсоох
function toggleMusic() {
    if (musicPlaying) {
        ytCommand("pauseVideo");
    } else {
        ytCommand("playVideo");
    }
    musicPlaying = !musicPlaying;
    updateMusicUI();
}
