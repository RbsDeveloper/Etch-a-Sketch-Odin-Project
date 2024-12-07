//VARIABLES

const colorPicker = document.getElementById('color-picker');
const rainbowBtn =  document.getElementById('rainbox');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const rangePlaceholder = document.getElementById('rangePlaceholder');
const rangeSlider = document.getElementById('slider');
const grid = document.getElementById('grid');
const year = document.getElementById('current-year');

let gridDimension;


// Updates the displayed grid size value (e.g., 16x16)
function updateUiGridDimension () {
    rangePlaceholder.innerText = `${gridDimension}X${gridDimension}`;
}

// Calculates the width of each square based on the grid's dimension
function defineSquareDimension (squareNum) {
    const gridWidth = grid.offsetWidth;

    const squareDimension = gridWidth / squareNum;

    return(squareDimension);
}

// Populates the grid with square div elements based on the grid dimension
function injectSquaresInsideGrid (squareDimension) {

    grid.innerHTML = '';

    const squareNumToInject = gridDimension*gridDimension;

    let innerGrid = '';

    for(let i = 1 ; i <= squareNumToInject ; i++){
        innerGrid += `<div class='square' style='width:${squareDimension}px; height:${squareDimension}px'></div>` 
    }

    grid.innerHTML = innerGrid;

}


//This function will obtain the color from the colorPicker
/*function obtainColor() {
   let selectedColor=colorPicker.value;

    colorPicker.addEventListener('input', ()=> {
        selectedColor = colorPicker.value;
        console.log(selectedColor)
        return selectedColor
    })

    //console.log(selectedColor)
    return selectedColor;
}
*/

let currentColor = colorPicker.value;

colorPicker.addEventListener('input', ()=> {
    currentColor = colorPicker.value;
})

function obtainSquareArray () {
    const squares = grid.children;
    const squaresArr = Array.from(squares);
    return squaresArr; 
}

// Sets up the initial grid based on the default slider value
function displayInitialGrid () {
    
    gridDimension = rangeSlider.value;

    updateUiGridDimension()
    
    const gridOfEachSquare = defineSquareDimension(gridDimension);

    injectSquaresInsideGrid(gridOfEachSquare);

    const squaresArr = obtainSquareArray()
        
    paintSquares(squaresArr);
    
}


// Dynamically updates the grid when the slider value changes
const displayChangedGrid = () => {
    rangeSlider.addEventListener('input', (e) => {
    
        const newGridVal = e.target.value;

        gridDimension = newGridVal;

        updateUiGridDimension()

        const gridOfEachSquare = defineSquareDimension(gridDimension);

        injectSquaresInsideGrid(gridOfEachSquare);

        //return gridDimension;
        
        const squaresArr = obtainSquareArray()
        
        paintSquares(squaresArr); 
    })  
}


// Helper function to apply the appropriate color or effect to a square
function setSquareColor(square) {
    if(rainbowBtn.classList.contains('active')){
        square.style.backgroundColor = `${randomColorGenerator()}`;
    }else if ( eraserBtn.classList.contains('active')){
        square.style.backgroundColor = '';
    }else {
        square.style.backgroundColor = `${currentColor}`;
    }
}

// Enables coloring functionality for squares in the grid

function paintSquares(arrSq) {

    let ismousedown = false;

    grid.addEventListener('mousedown', ()=> {ismousedown = true});
    grid.addEventListener('mouseup', ()=> {ismousedown = false});
    grid.addEventListener('mouseleave', ()=> {ismousedown = false});
    
        arrSq.forEach(sqr => {

                sqr.addEventListener('mousedown', ()=>{
                    
                    /*
                    if(rainbowBtn.classList.contains('active')){
                        sqr.style.backgroundColor = `${randomColorGenerator()}`;
                    }else if ( eraserBtn.classList.contains('active')){
                        sqr.style.backgroundColor = '';
                    }else {
                        sqr.style.backgroundColor = `${currentColor}`;
                    }
                    */
                    
                    setSquareColor(sqr);

                })
                
                sqr.addEventListener('mouseover', ()=>{
    
                    if(ismousedown){
                    
                        
                        /*
                        if(rainbowBtn.classList.contains('active')){
                            sqr.style.backgroundColor = `${randomColorGenerator()}`;
                        }else if ( eraserBtn.classList.contains('active')){
                            sqr.style.backgroundColor = '';
                        }else {
                            sqr.style.backgroundColor = `${currentColor}`;
                        }
                        */

                        setSquareColor(sqr);
                    }
                    
                })
            }

           
        )
}


// Clears all colors from the grid 
function cleanSheet () {
    const squaresArr = obtainSquareArray();
    
    squaresArr.forEach((square) => {
        square.style.backgroundColor = '';
    })
}

// Activates or deactivates eraser mode
function toggleEraser () {
    
    if(eraserBtn.classList.contains('active')){
        eraserBtn.classList.remove('active')
    }else{
        eraserBtn.classList.add('active')
    }
    
}

// Activates or deactivates rainbow mode
function toggleRainbowMode() {
    if(rainbowBtn.classList.contains('active')){
        rainbowBtn.classList.remove('active')
    }else{
        rainbowBtn.classList.add('active');
    }
}


function randomColorGenerator () {

    let chars = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];

    let color = '#'

    for(let i = 1 ; i <= 6 ; i++){
        color+=chars[Math.floor(Math.random()*chars.length)]
    }

    return color;
}

// Returns the current year

 function getYear () {
    const currentYear = new Date().getFullYear();

    return currentYear
}

year.innerText = getYear();


window.addEventListener('load', displayInitialGrid)

displayChangedGrid()

// Deactivates rainbow and eraser modes when selecting a new color
colorPicker.addEventListener('click', ()=>{
    
    if(rainbowBtn.classList.contains('active')){
        rainbowBtn.classList.remove('active');
    }
    
    if(eraserBtn.classList.contains('active')){
        eraserBtn.classList.remove('active');
    }

})

rainbowBtn.addEventListener('click', ()=>{
    toggleRainbowMode()
    
    if(eraserBtn.classList.contains('active')){
        eraserBtn.classList.remove('active')
    }
});

eraserBtn.addEventListener('click', ()=> {
    toggleEraser();
    
    if(rainbowBtn.classList.contains('active')){
        rainbowBtn.classList.remove('active')
    }
});

clearBtn.addEventListener('click', cleanSheet);



