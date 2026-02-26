console.log("fail ühendatud");

class Entry {
  constructor(titleFromPage, descriptionFromPage, dateFromPage) {
    this.title = titleFromPage;
    this.description = descriptionFromPage;
    this.date = dateFromPage;
    this.done = false;
  }
}

class Todo {
  constructor() {
    document.querySelector("#addButton").addEventListener("click", () => {
      this.addEntry();
    });
    this.entries = JSON.parse(localStorage.getItem("entries")) || [];
    this.render();
  }

  addEntry() {
    const titleValue = document.querySelector("#title").value;
    const descriptionValue = document.querySelector("#description").value;
    const dateValue = document.querySelector("#date").value;

    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

    console.log(this.entries);
    this.save();
    this.render();
  }

  render() {
    if (document.querySelector(".todo-list")) {
      document
        .querySelector("#entries")
        .removeChild(document.querySelector(".todo-list"));
    }
    const parentElement = document.querySelector("#entries");
    const ul = document.createElement("ul");
    ul.className = "todo-list";

    this.entries.forEach((entryValue, entryIndex) => {
      const liElement = document.createElement("li");
      const divElement = document.createElement("div");
      const deleteElement = document.createElement("button");

      deleteElement.textContent = "X";

      deleteElement.addEventListener("click", () => {
        console.log("delete");
        this.entries.splice(entryIndex, 1);
        this.save();
        this.render();
      });

      liElement.addEventListener("click", () => {
        if (entryValue.done == true) {
          this.entries[entryIndex].done = false;
          this.save();
          this.render();
        } else if (entryValue.done == false) {
          this.entries[entryIndex].done = true;
          this.save();
          this.render();
        }
      });

      if (entryValue.done == true) {
        divElement.classList.add("task-done");
      }

      divElement.innerHTML = `<div>${entryIndex}</div>
            <div>${entryValue.title}</div>
            <div>${entryValue.description}</div>
            <div>${entryValue.date}</div>`;

      liElement.appendChild(divElement);
      liElement.appendChild(deleteElement);
      ul.appendChild(liElement);
    });

    parentElement.appendChild(ul);
  }

  save() {
    localStorage.setItem("entries", JSON.stringify(this.entries));
  }
}

const todo = new Todo();
