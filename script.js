const form = document.querySelector(".input-area");
const taskTitle = document.querySelector(".task-title");
const taskDescription = document.querySelector(".task-description");
const categorySelect = document.querySelector(".category-select");
const addButton = document.querySelector(".add-btn");
const taskList = document.querySelector(".tasks");
const searchTask = document.querySelector(".search-task");
const pendingCount = document.querySelector(".pending-count");
const completedCount = document.querySelector(".completed-count");
const head = document.querySelector(".head");
const box = document.querySelector(".box");
const themeBtn = document.querySelector(".theme-btn");
const bubblingGrandparent = document.querySelector(".bubbling-grandparent");
const bubblingParent = document.querySelector(".bubbling-parent");
const bubblingChild = document.querySelector(".bubbling-child");
const capturingGrandparent = document.querySelector(".capturing-grandparent");
const capturingParent = document.querySelector(".capturing-parent");
const capturingChild = document.querySelector(".capturing-child");

const taskArr = [];

let updateIndex = null;
let searchText = "";

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "Light";
  } else {
    themeBtn.innerText = "Dark";
  }
});

const ui = () => {
  taskList.innerHTML = "";

  const completedTasks = taskArr.filter((task) => task.completed).length;
  const pendingTasks = taskArr.length - completedTasks;

  pendingCount.innerText = pendingTasks;
  completedCount.innerText = completedTasks;

  taskArr.forEach((task, index) => {
    const titleMatch = task.title.toLowerCase().includes(searchText);
    const descriptionMatch = task.description.toLowerCase().includes(searchText);
    const categoryMatch = task.category.toLowerCase().includes(searchText);

    if (!titleMatch && !descriptionMatch && !categoryMatch) {
      return;
    }

    taskList.innerHTML += `<li
        class="${task.completed ? "done" : ""}"
        data-id="${index}"
        data-status="${task.completed ? "completed" : "pending"}"
        data-category="${task.category}" >
        <div class="task-info">
          <span class="task-text">${task.title}</span>
          <p class="task-desc">${task.description}</p>
          <small>${task.category}</small>
        </div>
        <div class="task-actions">
          <button class="complete-btn" onclick="completeTask(${index})" type="button">
            Complete
          </button>
          <button class="edit-btn" onclick="editTask(${index})" type="button">
            Edit
          </button>
          <button class="delete-btn" onclick="deleteTask(${index})" type="button">
            Delete
          </button>
        </div>
      </li>`;
  });
  // Attribute methods:
  // taskElement.getAttribute("data-category"); gets the value of an attribute.
  // taskElement.setAttribute("data-priority", "high"); adds or changes an attribute.
  // taskElement.hasAttribute("data-status"); checks if an attribute exists.
  // taskElement.removeAttribute("data-priority"); removes an attribute.
  // taskElement.dataset.category; gets the value of data-category.
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleValue = taskTitle.value.trim();
  const descriptionValue = taskDescription.value.trim();
  const taskCategory = categorySelect.value;

  if (titleValue === "" || descriptionValue === "") {
    return;
  }
  // taskTitle.value returns the current value entered by the user.
  // taskTitle.getAttribute("value") returns the original HTML attribute value.

  if (updateIndex === null) {
    taskArr.push({
      title: titleValue,
      description: descriptionValue,
      category: taskCategory,
      completed: false,
    });
  } else {
    taskArr[updateIndex].title = titleValue;
    taskArr[updateIndex].description = descriptionValue;
    taskArr[updateIndex].category = taskCategory;
    updateIndex = null;
    addButton.innerText = "Add";
  }
  taskTitle.value = "";
  taskDescription.value = "";
  categorySelect.value = "Study";
  ui();
});

searchTask.addEventListener("input", function () {
  searchText = searchTask.value.toLowerCase().trim();
  ui();
});

function completeTask(index) {
  taskArr[index].completed = !taskArr[index].completed;
  ui();
}
function editTask(index) {
  taskTitle.value = taskArr[index].title;
  taskDescription.value = taskArr[index].description;
  categorySelect.value = taskArr[index].category;
  updateIndex = index;
  addButton.innerText = "Update";
}

function deleteTask(index) {
  taskArr.splice(index, 1);
  ui();
}









// Bubbling travels from target element
// upward through ancestors.
bubblingGrandparent.addEventListener("click", function () {
  console.log("Grandparent");
});

bubblingParent.addEventListener("click", function () {
  console.log("Parent");
});

bubblingChild.addEventListener("click", function () {
  console.log("Child");
});

// Capturing travels from outermost ancestor
// down toward the target element.
capturingGrandparent.addEventListener(
  "click",
  function () {
    console.log("Grandparent");
  },
  true
);

capturingParent.addEventListener(
  "click",
  function () {
    console.log("Parent");
  },
  true
);

capturingChild.addEventListener(
  "click",
  function () {
    console.log("Child");
  },
  true
);











// Browser rendering stages:
// HTML: Browser reads the HTML file.
// Parsing: Browser starts converting text into useful parts.
// Tokenization: HTML is split into tokens.
// DOM Tree: Browser creates the page structure.
// CSSOM Tree: Browser creates the style structure.
// Render Tree: DOM and CSSOM are combined.
// Layout: Browser calculates element size and position.
// Paint: Browser draws pixels.
// Compositing: Browser combines layers and shows final screen.
