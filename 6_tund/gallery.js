console.log("Gallery page loaded");

$("img").css({ "width": "100px" });

let firstPic = $("img.active").attr("src");

$("#big-image").html("<img src='" + firstPic + "'>").hide().fadeIn(2000, "linear");

$("#pic-container img").click(selectImage);

$("#prev").click(prevImage);
$("#next").click(nextImage);

function nextImage() {
    let currentPic = $("img.active");
    let nextPic = currentPic.next();

    if (nextPic.length == 0) {
        nextPic = $("#pic-container img").siblings().first();
    }

    currentPic.removeClass("active");
    nextPic.addClass("active");

    $("#big-image").html("<img src='" + nextPic.attr("src") + "'>").hide().fadeIn();
}

function prevImage() {
    let currentPic = $("img.active");
    let prevPic = currentPic.prev();

    if (prevPic.length == 0) {
        prevPic = $("#pic-container img").siblings().last();
    }

    currentPic.removeClass("active");
    prevPic.addClass("active");

    $("#big-image").html("<img src='" + prevPic.attr("src") + "'>").hide().slideDown();
}

function selectImage() {
    let currentPic = $("img.active");
    let selectPic = $(this);

    currentPic.removeClass("active");
    selectPic.addClass("active");

    $("#big-image").html("<img src='" + selectPic.attr("src") + "'>").hide().fadeToggle();
}