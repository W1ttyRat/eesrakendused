

console.log("Hello, World!");

let firstElement = document.getElementById("first");
let number = 10;
let array = ["banaan", "apelsin", "kiivi"];
let human = {
    firstName: "Tanel",
    lastName: "Metshein",
    height: "110" 
};

console.log(array[2], human)

function changeColor() {
    firstElement.style.backgroundColor = "red";
    firstElement.style.color = "blue";
    firstElement.style.fontSize = "30px";    
}

for(let i = 0; i < array.length; i++) {
    let fruit = document.createElement("p");
    fruit.textContent = array[i];
    document.getElementById("second").appendChild(fruit);
}

firstElement.addEventListener("click", changeColor);
window.addEventListener("keypress", changeNumber);

function changeNumber() {
    document.querySelector("#third").innerHTML = number;
    number = number + 10;
}




firstElement.innerHTML = "ei ole esimene tekst";