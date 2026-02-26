console.log("fail ühendatud")

sessionStorage.setItem("eesnimi", "Tanel");

let fname, lname, human;

fname = document.getElementById("firstName");
lname = document.getElementById("lastName");

function saveData() {

    human = {
        firstname: fname.value,
        lastname: lname.value
    }

    document.cookie = "eesnimi=" + fname.value;

    sessionStorage.setItem("inimene", JSON.stringify(human));

    sessionStorage.setItem("eesnimi", fname.value);
    sessionStorage.setItem("perekonnanimi", lname.value);
    localStorage.setItem("eesnimi", fname.value);
    localStorage.setItem("perekonnanimi", lname.value);
}

function deleteData() {
    sessionStorage.removeItem("eesnimi");
    sessionStorage.removeItem("perekonnanimi");
    localStorage.removeItem("eesnimi");
    localStorage.removeItem("perekonnanimi");
}

function loadData() {
    /*document.getElementById("loadedData").innerHTML = sessionStorage.getItem("eesnimi") + " " + sessionStorage.getItem("perekonnanimi") + "<br>" + localStorage.getItem("eesnimi") + " " + localStorage.getItem("perekonnanimi") + "<br>" + sessionStorage.getItem("inimene");*/

    document.getElementById("loadedData").innerHTML = JSON.parse(sessionStorage.getItem("inimene")).firstname + " " + JSON.parse(sessionStorage.getItem("inimene")).lastname;
}

document.getElementById("save").addEventListener("click", saveData);
document.getElementById("delete").addEventListener("click", deleteData);
document.getElementById("load").addEventListener("click", loadData);