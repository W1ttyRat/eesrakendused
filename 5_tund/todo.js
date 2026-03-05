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
      const editElement = document.createElement("button");

      deleteElement.textContent = "X";
      deleteElement.className = "delete-button";

      editElement.textContent = "Edit";
      editElement.className = "edit-button";

      deleteElement.addEventListener("click", () => {
        console.log("delete");
        this.entries.splice(entryIndex, 1);
        this.save();
        this.render();
      });

      editElement.addEventListener("click", (e) => {
        console.log("edit");
        e.stopPropagation();
        const newTitle = prompt("Enter new title", entryValue.title);
        const newDescription = prompt("Enter new description", entryValue.description);
        const newDate = prompt("Enter new date", entryValue.date);

        this.entries[entryIndex].title = newTitle;
        this.entries[entryIndex].description = newDescription;
        this.entries[entryIndex].date = newDate;

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

      divElement.innerHTML = `<div>${entryIndex + 1}</div>
            <div>${entryValue.title}</div>
            <div>${entryValue.description}</div>
            <div>${entryValue.date}</div>`;



      liElement.appendChild(divElement);
      divElement.appendChild(editElement);
      divElement.appendChild(deleteElement);
      ul.appendChild(liElement);
    });

    parentElement.appendChild(ul);
  }

  save() {
    localStorage.setItem("entries", JSON.stringify(this.entries));
  }
}

const todo = new Todo();
