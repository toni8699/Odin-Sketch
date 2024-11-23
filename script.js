const row = 16;
const col = 16;
const container = document.querySelector(".container");
const canvasSize =400;
container.style.width = `${canvasSize}px`;
container.style.height = `${canvasSize}px`;
container.style.border = "1px solid black";
console.log(container);
for (let i = 0; i < row*col; i++) {
    const cell= document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
    cell.style.width = `${canvasSize/row -2}px`;
    cell.style.height = `${canvasSize/col -2}px`;
    cell.style.border = "1px solid black";
}
const cells = document.querySelectorAll(".cell");
// cells.forEach((cell) => {
//     cell.addEventListener("mousedown", () => {
//         cell.style.backgroundColor = "black";
//     });
// });
/*************  ✨ Codeium Command ⭐  *************/
let isMouseDown = false;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

cells.forEach((cell) => {
  cell.addEventListener("mousemove", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = "black";
    }
  });
});
/******  bbce2438-07da-4552-a58b-46ddaf6acbee  *******/