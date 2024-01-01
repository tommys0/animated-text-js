const extensions = [
    "videographer",
    "designer",
    "photographer",
    "traveller",
    "car enthusiast",
];
const speed = 3000;
const fastSpeed = 100;
const pause = 2;
let globalNumber = 0;

extensions.sort(() => 0.5 - Math.random());
extensions.unshift("developer");
document.querySelector("#extention").dataset.extensions = extensions;

let timeOut = null;
let timeOutGlobal = null;
const extensionLength = extensions.length - 1;
let i = 0;

function startLoopExtensions() {
    if (globalNumber === 0) {
        i = 0;
    }

    function extensionsLoop() {
        const extensionWord = extensions[i];
        extensionsWord(extensionWord, 0, 0);
        i++;
        globalNumber++;
        if (i <= extensionLength) {
            timeOutGlobal = setTimeout(extensionsLoop, speed);
            return false;
        } else if (i === extensionLength + 1) {
            globalNumber = 0;
            timeOutGlobal = setTimeout(startLoopExtensions, speed);
            return false;
        }
    }

    extensionsLoop();

    function extensionsWord(word, s, c) {
        const charLength = word.length;
        const speedInCounts = speed / 100;
        const maxLengthForStart = speedInCounts - charLength;

        if (s <= charLength) {
            timeOut = setTimeout(() => {
                document.getElementById("extention").innerHTML = word.substring(0, c);
                s++;
                c++;
                extensionsWord(word, s, c);
            }, fastSpeed);
        } else if (s >= maxLengthForStart - pause && s < speedInCounts) {
            timeOut = setTimeout(() => {
                document.getElementById("extention").innerHTML = word.substring(0, c);
                s++;
                c--;
                extensionsWord(word, s, c);
            }, fastSpeed);
        } else if (s > charLength && s < maxLengthForStart - pause) {
            timeOut = setTimeout(() => {
                s++;
                extensionsWord(word, s, c);
            }, fastSpeed);
        } else {
            c = 0;
            s = 0;
        }
    }
}

startLoopExtensions();

window.onfocus = function () {
    console.log("start");
    window.startLoopExtensions();
}

window.onblur = function () {
    console.log("stop");
    clearTimeout(timeOut);
    clearTimeout(timeOutGlobal);
}