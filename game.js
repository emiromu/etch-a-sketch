const main = document.querySelector("#main");
const canvas = document.querySelector("#canvas");
const topmenu = document.querySelector("#topmenu");
const eraser = document.querySelector("#eraser");

//array of columns that contain the cells
const columns = [];
//array for the cells
const cells=[];

//noCol the number of columns
var noCol=4;
//noRow the number of rows
var noRow=4;

//Colour an element's background to black
function colourBlack(el){
    el.style.backgroundColor="black";
};

//returns a random rgb(#,#,#) string
function generateRandomColour(){
    var r = Math.random()*254 +1;
    var g = Math.random()*254 +1;
    var b = Math.random()*254 +1;

    return `rgb(${r},${g},${b})`;
};

//Colour an element's background to random
function colourRandom(el){
    el.style.backgroundColor=generateRandomColour();
};


//Increment an element's background color alpha by 10% increments
function colorizeBlack(el){
    var shade=el.style.backgroundColor;
    if(shade==''){
        el.style.backgroundColor="rgba(0,0,0,0.1)";   
    }
    else{

        if(shade.substr(3,1) == 'a' && shade.substr(14,1) != '1'){
           var alpha = parseFloat("0."+shade.substr(16,1))
           alpha = alpha + 0.1;
           shade = shade.substr(0,13)+alpha+")";
        }
        else{
            el.style.backgroundColor="rgba(0,0,0,1)";
        }
        el.style.backgroundColor=shade;
    }
};

//Setup the sketch canvas noCol x noRow
function setup(noCol, noRow){

    //remove existing
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild);
    };

    //create cells
    for(var i=0; i<noCol; i++){
        columns[i] = document.createElement("div");
        columns[i].classList.add("col");
        columns[i].setAttribute("id","col"+i);
        columns[i].setAttribute("width",(100/noCol)+"%");
        canvas.appendChild(columns[i]);

        for(var j=0; j<noRow; j++){
            cells[i+j] = document.createElement("div");
            cells[i+j].classList.add("cell");
            cells[i+j].setAttribute("id","cell"+i+";"+j);
            cells[i+j].setAttribute("width","100%");
            //console.log(cells[i+j]);
            columns[i].appendChild(cells[i+j]);   
            //mouse hover event
            document.getElementById("cell"+i+";"+j).addEventListener("mouseover",function(){
                colorizeBlack(this);
            });
        };
    };
}

eraser.addEventListener("click",function(){
    var noCol=0;
    var noRow=0;

    //NOT square
    /*
    while(noCol<=0 || noCol>100 || noRow<=0 || noRow>100){
        noCol = prompt(`Enter number of columns
        (number between 1 and 100)`,4);
        noRow = prompt(`Enter number of rows
        (number between 1 and 100)`,4);
    }
    */

    //square version
    while(noCol<=0 || noCol>100 || noRow<=0 || noRow>100){
        noCol = prompt(`Enter the canvas size
        (number between 1 and 100)`,10);
        noRow = noCol;
    }

    setup(noCol,noRow);
});