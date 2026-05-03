const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

document.getElementById("refreshBtn").addEventListener("click", () => {
  location.reload();
});

/* 🕒 CLOCK */
const clock = document.getElementById("clock");

function updateClock() {
  const d = new Date();
  clock.textContent =
    d.getHours().toString().padStart(2, "0") + ":" +
    d.getMinutes().toString().padStart(2, "0") + ":" +
    d.getSeconds().toString().padStart(2, "0");
}
setInterval(updateClock, 1000);
updateClock();

/* 🎧 DRAW LOOP */
function draw() {
  requestAnimationFrame(draw);

  const data = getAudioData();
  if (!data) return;

  ctx.clearRect(0, 0, width, height);

  const bars = 64;
  const step = Math.floor(data.length / bars);
  const barWidth = width / bars;

  for (let i = 0; i < bars; i++) {
    let sum = 0;

    for (let j = 0; j < step; j++) {
      sum += data[i * step + j];
    }

    const value = sum / step;
    const heightBar = (value / 255) * height;

    ctx.fillStyle = `hsl(${i * 5},100%,50%)`;
    ctx.fillRect(i * barWidth, height - heightBar, barWidth - 2, heightBar);
  }
}

/* 🚀 START */
document.body.addEventListener("click", async () => {
  if (!audioCtx) {
    await initAudio();
    draw();
  }
});