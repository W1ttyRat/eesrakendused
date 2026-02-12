console.log("fail ühendatud");


let hours, minutes, seconds, day, month, year, dateTime;
let fontSize = 25;


function changeFontSizeBigger() {

    fontSize = fontSize + 5;

    if (fontSize > 100) {
        fontSize = 100;
        window.alert("Font ei saa olla suurem kui 100px");
    }

    document.getElementById("dateContainer").style.fontSize = fontSize + "px";

    document.getElementById("clockContainer").style.fontSize = fontSize + "px";

    console.log(document.getElementById("dateContainer").style.fontSize);
}

function changeFontSizeSmaller() {

    fontSize = fontSize - 5;

    if (fontSize < 10) {
        fontSize = 10;
        window.alert("Font ei saa olla väiksem kui 10px");
    }

    document.getElementById("dateContainer").style.fontSize = fontSize + "px";

    document.getElementById("clockContainer").style.fontSize = fontSize + "px";

    console.log(document.getElementById("dateContainer").style.fontSize);
}

function updateBlock() {
    dateTime = new Date();
    hours = dateTime.getHours();
    minutes = dateTime.getMinutes();
    seconds = dateTime.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }

    document.getElementById("hours").innerHTML = hours + ":";
    document.getElementById("minutes").innerHTML = minutes + ":";
    document.getElementById("seconds").innerHTML = seconds;
}

function updateDate() {
    dateTime = new Date();
    day = dateTime.getDate();
    month = dateTime.getMonth()+1;
    year = dateTime.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }

    if (month < 10) {
        month = "0" + month;
    }

    document.getElementById("day").innerHTML = day + ".";
    document.getElementById("month").innerHTML = month + ".";
    document.getElementById("year").innerHTML = year;
}

function checkKey(event) {
    console.log(event.key);

    if(event.key === "+") {
        changeFontSizeBigger();
    } else if (event.key === "-") {
        changeFontSizeSmaller();
    }
}

updateBlock();
updateDate();
setInterval(updateBlock, 1000);
setInterval(updateDate, 60000);

document.getElementById("bigger").addEventListener("click", changeFontSizeBigger);

document.getElementById("smaller").addEventListener("click", changeFontSizeSmaller);

window.addEventListener("keypress", checkKey);