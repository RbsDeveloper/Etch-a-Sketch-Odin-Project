/*
1)se face o variabila care preia valoarea inputului de tip range prin care se presupune ca se poate seta dimensiunea dorita la grid;

    - by default ar trebuii sa plece de la 16;

    -trebuie sa preia la incarcarea paginii valoarea setata la slider bydefault si sa o returneze plus console

    -in cazul in care se schimba valoarea range-ului trebuie sa returneze aceasta avalorare

2)se creeaza o prima functie care imparte singura plansa si o populeaza automat cu patrate;
    - mai intai ar trebuii sa aflam latimea plansei & inaltimea (ar trebuii sa fie fixa mereu)
    -impartim latimea la range-ul dorit si aflam cate patratele ne intra pe latime
        -multiplicam numarul de patratele cu numarul de randuri in jos si obtinem totalul patratelelor;
        -stocam nr patratelelor intr-o variabila
        -ne folosim de un loop pentru a creea patratel cu patratel si al introduce in div-ul 'grid' dar cu inner HTML si folosind template literals pentru a seta width & height la fiecare in parte. 
        -nu ne trebuie nici margin si nici padding si probabil nici border, aici vedem

3 functia de colorat
    -stocam intr-o variabila culoarea de bg
    -facem o func bazata pe un event listener de click down si hover, de cauta pe net cum 
    rainbow e tot aici doar ca facem o functie care sa genereze culori random


4) functia eraser, foloseste acelas criteriu ca si la functia normala de colorat doar ca o sa aiba culoarea alba bydefault ca sa para ca stergem 
5) functia clean, seteaza cu un loop la toate patratelele bg-ul alb pentru a parea ca -sa sters plansa. (hint: posibil efect facut cu opacitatea ? sa para ca se stinge culoarea incet incet spre alb)

6) daca se misca range-ul, trebuie sa il detecteze un event listener care sa actionez eo functie de sterge automat toate patratele si le inlocuoieste cu cate e necesar
*/

//VARIABLES

const colorPicker = document.getElementById('color-picker');
const rainbowBtn =  document.getElementById('rainbox');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const rangePlaceholder = document.getElementById('rangePlaceholder');
const rangeSlider = document.getElementById('slider');
const grid = document.getElementById('grid');

let gridDimension;


//This reflects the value of the slider 
function updateUiGridDimension () {
    rangePlaceholder.innerText = `${gridDimension}X${gridDimension}`;
}

//This function calculates the width of each square based on the selected dimension from the slider
function defineSquareDimension (squareNum) {
    const gridWidth = grid.offsetWidth;

    const squareDimension = gridWidth / squareNum;

    return(squareDimension);
}

//This function injects the squares inside the grid container
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
}*/

let currentColor = colorPicker.value;

colorPicker.addEventListener('input', ()=> {
    currentColor = colorPicker.value;
})

function obtainSquareArray () {
    const squares = grid.children;
    const squaresArr = Array.from(squares);
    return squaresArr; 
}

//This function is responsible for the initial grid display 
function displayInitialGrid () {
    
    gridDimension = rangeSlider.value;

    updateUiGridDimension()
    
    const gridOfEachSquare = defineSquareDimension(gridDimension);

    injectSquaresInsideGrid(gridOfEachSquare);

    const squaresArr = obtainSquareArray()
        
    paintSquares(squaresArr);
    
}


//This function displays each grid variation
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


//Helper function of the paintSquares function, created to avoid code repetion
function setSquareColor(square) {
    if(rainbowBtn.classList.contains('active')){
        square.style.backgroundColor = `${randomColorGenerator()}`;
    }else if ( eraserBtn.classList.contains('active')){
        square.style.backgroundColor = '';
    }else {
        square.style.backgroundColor = `${currentColor}`;
    }
}

// Function that makes the painting possible on the grid

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


//This function cleans the entire sheet 
function cleanSheet () {
    const squaresArr = obtainSquareArray();
    
    squaresArr.forEach((square) => {
        square.style.backgroundColor = '';
    })
}


function toggleEraser () {
    
    if(eraserBtn.classList.contains('active')){
        eraserBtn.classList.remove('active')
    }else{
        eraserBtn.classList.add('active')
    }
    
}

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


window.addEventListener('load', displayInitialGrid)

displayChangedGrid()


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



