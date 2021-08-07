
const inputField = document.getElementById("input");

const oneBtn = document.getElementById("num1");
const twoBtn = document.getElementById("num2");
const threeBtn = document.getElementById("num3");
const fourBtn = document.getElementById("num4");
const fiveBtn = document.getElementById("num5");
const sixBtn = document.getElementById("num6");
const sevenBtn = document.getElementById("num7");
const eightBtn = document.getElementById("num8");
const nineBtn = document.getElementById("num9");
const zeroBtn = document.getElementById("num0");

const negateBtn = document.getElementById("negate");

//number pad actions
oneBtn.addEventListener("click", () =>{
    inputField.value += "1";
})
twoBtn.addEventListener("click", () =>{
    inputField.value += "2";
})
threeBtn.addEventListener("click", () =>{
    inputField.value += "3";
})
fourBtn.addEventListener("click", () =>{
    inputField.value += "4";
})
fiveBtn.addEventListener("click", () =>{
    inputField.value += "5";
})
sixBtn.addEventListener("click", () =>{
    inputField.value += "6";
})
sevenBtn.addEventListener("click", () =>{
    inputField.value += "7";
})
eightBtn.addEventListener("click", () =>{
    inputField.value += "8";
})
nineBtn.addEventListener("click", () =>{
    inputField.value += "9";
})
zeroBtn.addEventListener("click", () =>{
    inputField.value += "0";
})

//negate
negateBtn.addEventListener("click", () => {
    let op1 = inputField.value;
    if(op1 == null || op1 == NaN || op1 == undefined || op1 == ""){
        return ;
    }
    inputField.value *= -1;
})