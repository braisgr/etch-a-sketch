import { DrawingMode } from "./drawingMode.js";

const drawingModes = {
  default: new DrawingMode("Default",(square, color) => square.style.backgroundColor = color),
  erase: new DrawingMode("Erase", (square) => square.style.backgroundColor = ""),
  random: new DrawingMode("Random Color", (square) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r},${g},${b})`;
  }),
  darker: new DrawingMode("Darken", (square, color) => {
    let currentColor = window.getComputedStyle(square).backgroundColor;
    if (currentColor === "rgba(0, 0, 0, 0)") {
      currentColor = "rgb(255, 255, 255)"; // Si el cuadrado está en blanco, comienza desde blanco
    }
    const rgbValues = currentColor.match(/\d+/g);
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);
    const darkerR = Math.max(0, r - (r * 0.1)); // Reduce el valor de rojo en un 10%
    const darkerG = Math.max(0, g - (g * 0.1)); // Reduce el valor de verde en un 10%
    const darkerB = Math.max(0, b - (b * 0.1)); // Reduce el valor de azul en un 10%
    square.style.backgroundColor = `rgb(${darkerR},${darkerG},${darkerB})`;
  }),
};

let currentDrawingMode = drawingModes.default;

function updateDrawingMode(mode){
  currentDrawingMode = drawingModes[mode];

  document.querySelectorAll(".button-focus").forEach(button => {
    button.classList.remove("active");
  });

  document.querySelector(`.${mode}-button`).classList.add("active");
}

const gridContainer = document.querySelector(".grid-container");
const gridSizeBar = document.querySelector(".grid-size");
const gridSizeText = document.querySelector(".grid-size-text");
const colorButton = document.querySelector(".default-button");
const colorPicker = document.querySelector(".color-picker");
const darkerButton = document.querySelector(".darker-button");
const eraseButton = document.querySelector(".erase-button");
const randomButton = document.querySelector(".random-button");
const resetButton = document.querySelector(".reset-button");

//Flag para que solo dibuje cuando este el ratón clickado
let isDrawing = false;

function setGrid(squares){
  gridContainer.textContent = "";
  const squareSide = 620 / squares;

  for(let i=0; i<squares*squares; i++){
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSide}px`;
    square.style.height = `${squareSide}px`;
    //square.style.border = "1px solid black";
    gridContainer.appendChild(square);
  }
}

function enableDrawing() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((sq) => {
    sq.addEventListener("mouseover", () => {
      if (isDrawing) {
        currentDrawingMode.execute(sq, colorPicker.value);
      }
    });
  });
}

gridSizeText.textContent = `${gridSizeBar.value}x${gridSizeBar.value}`;
document.querySelector(`.default-button`).classList.add("active");

gridSizeBar.addEventListener("input", () => {
  setGrid(gridSizeBar.value);
  gridSizeText.textContent = `${gridSizeBar.value}x${gridSizeBar.value}`;
  enableDrawing();
});

colorButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateDrawingMode("default");
});

colorPicker.addEventListener("change", () => {
  updateDrawingMode("default");
});

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateDrawingMode("random");
});

darkerButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateDrawingMode("darker");
})

eraseButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateDrawingMode("erase");
});

resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  gridSizeBar.value = 24;
  setGrid(gridSizeBar.value);
  enableDrawing();
  gridSizeText.textContent = `${gridSizeBar.value}x${gridSizeBar.value}`;
});

gridContainer.addEventListener("mousedown", () => {
  isDrawing = true;
});

gridContainer.addEventListener("mouseup", () => {
  isDrawing = false;
});

setGrid(gridSizeBar.value);
enableDrawing();
