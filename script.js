let timerInterval;
let seconds = 0;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTime() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    timerInterval = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    seconds = 0;
    timeDisplay.textContent = '00:00:00';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
});