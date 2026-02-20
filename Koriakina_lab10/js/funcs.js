//задание 2//

function onMdown (){
    alert("Выполнена функция onmousedown");
}


function onMleave(){
    alert("Выполнена функция onmouseleave");
}


function onMmove (){
    alert("Выполнена функция onmousemove");
}

//задание 3//
function task3_1(){
    alert("Ура");
}

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const checkbox = document.getElementById('transferCheck');
const rewriteBtn = document.getElementById('rewriteBtn');
const displayArea = document.getElementById('displayArea');
const createElemBtn = document.getElementById('createElem');

btn1.onclick = function() {
    this.innerText = "Нажато!";
    console.log();
};

btn2.onmousedown = function() {
    this.style.backgroundColor = "orange";
    console.log();
    
};

btn2.onmouseup = function() {
    this.style.backgroundColor = "red";
    console.log();
};

input1.onmousemove = function() {
    console.log("Мышь движется над полем 1");
};

input1.onmouseleave = function() {
    this.style.boxShadow = "none";
    console.log();
};

input2.onfocus = function() {
    this.style.border = "2px solid blue";
    this.ariaPlaceholder;
    console.log();
};


input2.onblur = function() {
    this.style.border = "";
    this.ariaPlaceholder;
    console.log();
};

// --- ЗАДАНИЕ 6.2:
document. addEventListener("DOMContentLoaded"), () => {
const inputText = document.getElementById("inputText");
const transferCheckbox = document.getElementById("transferCheckbox");
const outputtext = document.getElementById("outputText");}

function updateoutput() {
   if (transferCheckbox. checked) {
       outputText.value = inputText. value;
} else {
outputText.value = "";
}

}


inputText. addEventListener ("input", updateOutput) ; 
transferCheckbox. addEventListener("change", updatedutput) ;

// --- ЗАДАНИЕ 6.3: 
function formatText() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputText');
    outputDiv.innerHTML = '';

    if (inputText.trim().length === 0) return;

    const formattedHtml = `
        <b>${inputText}</b> <!-- Жирный текст -->
        <i>${inputText}</i> <!-- Курсивный текст -->
        <u>${inputText}</u> <!-- Подчеркнутый текст -->
    `;}

 outputDiv.innerHTML = formattedHtml;