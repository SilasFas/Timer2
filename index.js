const timeDisplay = document.querySelector('#timeDisplay')

const startBtn = document.querySelector('#startBtn')
const pauseBtn = document.querySelector('#pauseBtn')
const resetBtn = document.querySelector('#resetBtn')

let startTime = 0
let elapsedtime = 0
let currentTime = 0
let paused = true
let intervalId
let hours = 0
let mins = 0
let secs = 0

startBtn.addEventListener('click', () => {
    if (paused) {
        paused = false
        startTime = Date.now() - elapsedtime
        // Date.now() gets the time in miliseconds
        intervalId = setInterval(updateTime, 1000) // 1000ms
    }
})

pauseBtn.addEventListener('click', () => {
    if (!paused) {
        paused = true
        elapsedtime = Date.now() - startTime
        clearInterval(intervalId)
    }
})

resetBtn.addEventListener('click', () => {
    paused = true
    clearInterval(intervalId)

    startTime = 0
    elapsedtime = 0
    currentTime = 0
    hours = 0
    mins = 0
    secs = 0
    timeDisplay.textContent = '00:00:00'

})

function updateTime() {
    elapsedtime = Date.now() - startTime

    secs = Math.floor((elapsedtime / 1000) % 60)
    mins = Math.floor((elapsedtime / (1000 * 60)) % 60)
    hours = Math.floor((elapsedtime / (1000 * 60 * 60)) % 60)

    secs = pad(secs)
    mins = pad(mins)
    hours = pad(hours)

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit
    }
    timeDisplay.textContent = `${hours}:${mins}:${secs}`
}