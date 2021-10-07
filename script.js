// 1 task
let xy = document.getElementsByClassName("anthem");
let xtext = xy[0].firstChild.nextSibling.textContent;
let ytext = xy[1].firstChild.nextSibling.textContent;
xy[0].firstChild.nextSibling.textContent = ytext;
xy[1].firstChild.nextSibling.textContent = xtext;

// 2 task
function square(){
    let fifthblock = document.getElementById("item5");
    let width = fifthblock.offsetWidth;
    let height = fifthblock.offsetHeight;
    let square = width * height;
    let result = `Square: ${square} px`;
    if(document.getElementById("task2") === null){
        let textSquare = document.createElement("p");
        textSquare.id = "task2";
        textSquare.style.marginLeft = "5px";
        textSquare.textContent = result;
        fifthblock.appendChild(textSquare);
    }
    else{
        let text = document.querySelector("p#task2");
        text.textContent = result;
    }
}
window.addEventListener("resize", square);

//3 task
function numbersCookies() {
    let text = document.task3.numbers.value;
    let numbers = text.split(",");
    for (let i = 0; i < numbers.length; i++) numbers[i] = parseInt(numbers[i]);
    let count = numOfMin(numbers);
    document.cookie = `count=${count};`;
}
function numOfMin(numbers) {
    let count = 1;
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] === min) {
        count++;
      }
      if (numbers[i] < min) {
        count = 1;
        min = numbers[i];
      }
    }
    return count;
}
let cookie = document.cookie.split(";")[0];
let names = cookie.split("=");
if (names[0].includes("count")) {
  let answer = confirm(`Saved value of count = ${names[1]}. Would you like to save this value?`);
  if (answer) {
    alert("You have saved cookie. Restart page");
    let item5 = document.getElementById("item5");
    let form = document.task3;
    item5.removeChild(form);
  }
  else{
    document.cookie = "count=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    let btnConfirm = document.task3.btnComplete;
    btnConfirm.addEventListener("click", numbersCookies);
  }
} else {
  let btnConfirm = document.task3.btnComplete;
  btnConfirm.addEventListener("click", numbersCookies);
}

// 4 task
let item3text = document.getElementById("item3");
let italicEnable = document.italicEnable.enable;
let isItalic = localStorage.getItem("item3italic");
italicEnable.checked = isItalic === "italic" ? true : false;
item3text.style.fontStyle = isItalic ?? "normal";
function italicChanger(e){
    if(e.target.checked){
        document.getElementById("item3").style.fontStyle = "italic";
        localStorage.setItem("item3italic", "italic")
    }
    else{
        document.getElementById("item3").style.fontStyle = "normal";
        localStorage.setItem("item3italic", "normal")
    }
}
italicEnable.addEventListener("click", italicChanger);

// 5 task
function createButtonSecondItem(name){
    let item2 = document.getElementById("item2");
    let btnEraseStyles = document.createElement("button");
    btnEraseStyles.setAttribute("value", `${name}`);
    btnEraseStyles.style.margin = "5px";
    btnEraseStyles.textContent = `Erase styles of ${name}`;
    btnEraseStyles.addEventListener("click", eraseStyle);
    item2.appendChild(btnEraseStyles);
}
function applyStylesOnRestart(){
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let elems = key.split(".");
        if(elems.length != 1 && elems[0].search("item\d+") && elems[1].search("\d+")){
            let item = document.getElementById(elems[0]);
            let element = item.childNodes[elems[1]];
             element.style.cssText += value;
    
            createButtonSecondItem(`${key}`);
        }
    }
}
function eraseStyle(e){
    let elems = e.target.value.split(".");
    let item = document.getElementById(elems[0]);
    let element = item.childNodes[elems[1]];
    let styleToDelete = localStorage.getItem(e.target.value);

    let neededCss = element.style.cssText.replace(styleToDelete, '');
    element.style.cssText = neededCss;
    localStorage.removeItem(e.target.value);

    let item2 = document.getElementById("item2");
    item2.removeChild(e.target);
}
function applyStyles(){
    let inputsTask5 = document.task5.elements;
    for(let i = 0; i < inputsTask5.length - 1; i++){
        if (inputsTask5[i].value === ''){
            continue;
        }
        let elems = inputsTask5[i].name.split(".");
        let item = document.getElementById(elems[0]);
        let element = item.childNodes[elems[1]];
        let style = inputsTask5[i].value;

        let locStor = localStorage.getItem(inputsTask5[i].name);
        if(locStor !== null){
            let previousCss = element.style.cssText.replace(locStor, '');
            element.style.cssText = previousCss + ' ' + style;
        }
        else{
            element.style.cssText += style;

            createButtonSecondItem(`${inputsTask5[i].name}`);
        }
        localStorage.setItem(inputsTask5[i].name, style);
    }
}
function showCss(){
     let allItems = document.getElementById("grid-container").childNodes;
     let item5 = document.getElementById("item5");
     let form = document.createElement("form");
     form.name = "task5";
     let itemNumber = 1;
     for(let i = 0; i < allItems.length;i++){
        if (allItems[i].nodeType === 3){            
            continue; 
        }

         let h3Item = document.createElement("h3");
         h3Item.textContent = `${itemNumber} item: `;
         form.appendChild(h3Item);

         let item = allItems[i].childNodes;
         for(let j = 0; j < item.length; j++){
            if (item[j].nodeType === 3){            
                continue; 
            }
            let textElement = document.createElement("p");
            textElement.textContent = `Block with \"${item[j].textContent.substr(0, 20)}...\"`;
            let inputForm = document.createElement("input");
            inputForm.setAttribute("type", "text");
            inputForm.setAttribute("name", `${allItems[i].id}.${j}`);
            inputForm.style.width = "100%";
            form.appendChild(textElement);
            form.appendChild(inputForm);
         }
         itemNumber++;
     }
     let btn = document.createElement("input");
     btn.setAttribute("type", "button");
     btn.setAttribute("value", "Apply styles");
     btn.style.marginTop = "5px";
     btn.addEventListener("click", applyStyles);
     form.appendChild(btn);
     item5.appendChild(form);
}
 applyStylesOnRestart();
 let y = document.getElementsByClassName("anthem")[1];
 y.addEventListener("dblclick", showCss);
