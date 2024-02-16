const gridContainer = document.querySelector(".grid-container");
let isDrawing = false;

function setGrid(squares){
  gridContainer.textContent = "";
  const squareSide = 720 / squares;

  for(let i=0; i<squares*squares; i++){
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSide}px`;
    square.style.height = `${squareSide}px`;
    //square.style.border = "1px solid black";
    gridContainer.appendChild(square);
  }
}

function drawGrid(){
  const squares = document.querySelectorAll(".square");
  squares.forEach(sq => {
  sq.addEventListener("mouseover", () => {
    if(isDrawing){
      sq.style.backgroundColor = "black";
    }
  })
}); 
}

function drawColorGrid(){
  const squares = document.querySelectorAll(".square");
  squares.forEach(sq => {
  sq.addEventListener("mouseover", () => {
    if(isDrawing){
      sq.style.backgroundColor = "green";
    }
  })
}); 
}

setGrid(24);
drawGrid();

gridContainer.addEventListener("mousedown", () => {
  isDrawing = true;
});

gridContainer.addEventListener("mouseup", () => {
  isDrawing = false;
})

const gridSizeInput = document.querySelector(".grid-size-input");
const gridSizeButton = document.querySelector(".grid-size-button");

/*gridSizeButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(!gridSizeInput.value){
    alert("Set a number of squares/side first");
  }
  setGrid(gridSizeInput.value);
  drawGrid();
});*/

const bnw = document.querySelector(".bnw");
const color = document.querySelector(".color-button");

bnw.addEventListener("click", (e) => {
  e.preventDefault();
  drawGrid();
});

color.addEventListener("click", (e) => {
  e.preventDefault();
  drawColorGrid();
});