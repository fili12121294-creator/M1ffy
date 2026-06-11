const pokeBtn = document.getElementById('pokeBtn');
const stitchCard = document.getElementById('stitchCard');
const statusBadge = document.getElementById('statusBadge');
const quoteBox = document.getElementById('quoteBox');
const stitchGif = document.getElementById('stitchGif');

// Робочі посилання на GIF-ки Стіча
const normalGif = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjkyMGdlenRxdHhmY3l0dDNxc3M4Yzd6YXRmb2E3azY1cHV6bnZkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VRyiBxgvy9H3y/giphy.gif";
const angryGif = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3doOXI3bGZldTJpdWl1bmxxbjN2ZWRzdWQ1MDVwZHRuYWRld2RvaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fHgKZHDH1BHzi/giphy.gif";
const stitchQuotes = [
    "Meega nala k visual! (Я злий!)",
    "Aloha! 🌺",
    "Ih! (Так!)",
    "Охана! 💙",
    "Бука-бака! *звуки руйнування*",
    "Няу! Кавабанга!"
];

let isAngry = false;

pokeBtn.addEventListener('click', () => {
    const randomQuote = stitchQuotes[Math.floor(Math.random() * stitchQuotes.length)];
    quoteBox.textContent = randomQuote;

    isAngry = !isAngry;

    if (isAngry) {
        stitchCard.classList.add('glitch-mode');
        stitchGif.src = angryGif;
        statusBadge.textContent = "МАКСИМАЛЬНА ХАНА!";
        statusBadge.style.backgroundColor = "#ff1744";
        pokeBtn.textContent = "Заспокоїти Стіча";
        pokeBtn.style.background = "linear-gradient(45deg, #ff1744, #b21f1f)";
    } else {
        stitchCard.classList.remove('glitch-mode');
        stitchGif.src = normalGif;
        statusBadge.textContent = "Безпечний (ніби)";
        statusBadge.style.backgroundColor = "#00e676";
        pokeBtn.textContent = "Ткнути Стіча!";
        pokeBtn.style.background = "linear-gradient(45deg, #00fff0, #0083b0)";
    }
});