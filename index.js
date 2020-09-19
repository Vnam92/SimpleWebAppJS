const table = document.getElementById("table");
const redBtn = document.getElementById("red");
const greenBtn = document.getElementById("green");
const blueBtn = document.getElementById("blue");
const yellowBtn = document.getElementById("yellow");
const downloadBtn = document.getElementById("download");
const wrapperSection = document.getElementById("wrapper");

// User's action logs
let ACTION_LOGS = [];

redBtn.addEventListener("click", () => setColor("red"));
greenBtn.addEventListener("click", () => setColor("green"));
blueBtn.addEventListener("click", () => setColor("blue"));
yellowBtn.addEventListener("click", () => setColor("yellow"));

function setColor(color) {
  const action = createAction(color);
  wrapperSection.className = color;
  ACTION_LOGS.push(action);
  updateTable(action);
  checkDownloadAbility();
}

function updateTable(action) {
  if (ACTION_LOGS.length > 0) {
    // Insert a row in the table at row index 0
    const newRow = table.insertRow(0);

    // Insert a cells in the row
    const indexCell = newRow.insertCell(0);
    const newCell = newRow.insertCell(1);
    const timeCell = newRow.insertCell(2);
    const dateCell = newRow.insertCell(3);

    // Append a nodes to the cell
    const index = document.createTextNode(ACTION_LOGS.length.toString());
    const color = document.createTextNode(action.selectedColor);
    const time = document.createTextNode(action.time);
    const date = document.createTextNode(action.date);

    indexCell.appendChild(index);
    newCell.appendChild(color);
    timeCell.appendChild(time);
    dateCell.appendChild(date);
  }
}

function createAction(selectedColor) {
  const currentDate = new Date();
  return {
    selectedColor,
    date: currentDate.toDateString(),
    time: currentDate.toTimeString()
  };
}

function checkDownloadAbility() {
  if (ACTION_LOGS.length > 0) {
    downloadBtn.setAttribute("aria-disabled", "false");
    downloadBtn.classList.remove("disabled");
    buildJSON();
  } else {
    downloadBtn.setAttribute("aria-disabled", "true");
    downloadBtn.removeAttribute("download");
    downloadBtn.classList.add("disabled");
  }
}

function buildJSON() {
  const json = JSON.stringify(ACTION_LOGS);
  const dataURL = `data:application/json,${json}`;
  const anchor = document.querySelector("a");
  anchor.setAttribute("download", "logs.json");
  anchor.setAttribute("href", dataURL);
}
