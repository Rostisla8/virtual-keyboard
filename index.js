import { EN ,EN_SHIFT , RUS , RUS_SHIFT , KEY_CODES, KEY_WRITE } from "./modules/modules.js";

let language = true

let shift = false

let capsss = false


function createKeyboard(){
let body = document.querySelector('body');

let container = document.createElement('div');
container.className = 'container'
body.appendChild(container)

let textArea = document.createElement('textarea');
container.appendChild(textArea)

let boardWrapper = document.createElement('div')
boardWrapper.className = 'boardWrapper'
container.appendChild(boardWrapper)

KEY_CODES.forEach((el , index)=>{
    let key = document.createElement('button')
    key.className = el
    key.classList.add('key')
    key.innerHTML = language  ? RUS[index] : EN[index]
    boardWrapper.appendChild(key)
})
let description = document.createElement('div');
description.className = 'description'
description.textContent = ' Language change : Alt + shift'
body.appendChild(description)
}
createKeyboard()

function capsLock(){
let buttons = document.querySelectorAll('button');
window.addEventListener('keyup' , function(event){
    if(event.code == 'CapsLock'){
        capsss = !capsss
        if(capsss == true){
            buttons.forEach((el , index)=>{
                el.innerHTML = language == true ? RUS_SHIFT[index] : EN_SHIFT[index]
            })
        }else{
            buttons.forEach((el , index)=>{
                el.innerHTML = language == true ? RUS[index] : EN[index]
            })
        }
    }
})
buttons.forEach((el)=>{
    if(el.classList.contains('CapsLock')){
        el.addEventListener('mousedown' , function(event){
            if(!shift){
                buttons.forEach((el , index)=>{
                    el.innerHTML = language == true ? RUS_SHIFT[index] : EN_SHIFT[index]
                })
                shift = !shift
            }else{
                buttons.forEach((el , index)=>{
                    el.innerHTML = language == true ? RUS[index] : EN[index]
                })
                shift = !shift
            }
        })
    }
})
}
capsLock()

function shiftDown(){
let buttons = document.querySelectorAll('button');
window.addEventListener('keydown'  , function(event){
    if(event.code == 'ShiftLeft' || event.code ==  'ShiftRight'){
        buttons.forEach((el , index)=>{
            el.innerHTML = language == true ? RUS_SHIFT[index] : EN_SHIFT[index]
        })
    }
})
window.addEventListener('keyup' , function(event){
    buttons.forEach((el)=>{
        if(el.classList.contains(event.code)){
            el.classList.remove('active')
        }
    })
    if(event.code == 'ShiftLeft' || event.code == 'ShiftRight'){
    buttons.forEach((el , index)=>{
        el.innerHTML = language == true ? RUS[index] : EN[index]
    })
}
})
buttons.forEach((el)=>{
    if(el.classList.contains('ShiftLeft') || el.classList.contains('ShiftRight')){
        el.addEventListener('mousedown' , function(event){
            if(!shift){
                buttons.forEach((el , index)=>{
                    el.innerHTML = language == true ? RUS_SHIFT[index] : EN_SHIFT[index]
                })
                shift = !shift
            }else{
                buttons.forEach((el , index)=>{
                    el.innerHTML = language == true ? RUS[index] : EN[index]
                })
                shift = !shift
            }
        })
    }
})
}

shiftDown()

function changeLanguage(){
let buttons = document.querySelectorAll('button');
window.addEventListener('keydown' , function(event){
    if (event.code == "ShiftLeft" && event.altKey == true){
        language = !language
        buttons.forEach((el , index)=>{
            if(capsss == false){
                el.innerHTML = language == true ? RUS_SHIFT[index] : EN_SHIFT[index]
            }else if(capsss == true){
                el.innerHTML = language == true ? RUS[index] : EN[index]
            }
            
        })
    }
})
}

changeLanguage()

function writeText(){
let textarea = document.querySelector('textarea');
let buttons = document.querySelectorAll('button');
window.addEventListener('keydown' , function(event){
    event.preventDefault()
    buttons.forEach((el)=>{
        if(el.classList.contains(event.code)){
            el.classList.add('active')
        }
        if(el.classList.contains(event.code) && !KEY_WRITE.includes(event.code)){
            textarea.setRangeText(el.textContent, textarea.selectionStart, textarea.selectionEnd, "end");
            textarea.focus();
        }
        if(event.code === 'Space' && el.classList.contains('Space')){
                textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, "end");
                textarea.focus();
        }
        if(event.code === 'Tab' && el.classList.contains('Tab')){
                textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, "end");
                textarea.focus();
        }
        if(event.code === 'Backspace' && el.classList.contains('Backspace')){
            textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, "end");
            textarea.focus();
        }
        if(event.code === 'Delete' && el.classList.contains('Delete')){
            textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd+1, "end");
            textarea.focus();
        }
        if(event.code === 'Enter' && el.classList.contains('Enter')){
            textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd+1, "end");
            textarea.focus();
        }
        if(event.code === 'ArrowRight' && el.classList.contains('ArrowRight')){
            textarea.selectionStart = textarea.selectionEnd+1;
            textarea.focus();
        }
        if(event.code === 'ArrowLeft' && el.classList.contains('ArrowLeft')){
            textarea.selectionEnd = textarea.selectionStart - 1;
            textarea.focus();
        }
        if(event.code === 'ArrowUp' && el.classList.contains('ArrowUp')){
            textarea.selectionEnd = 0;
            textarea.focus();
        }
        if(event.code === 'ArrowDown' && el.classList.contains('ArrowDown')){
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length
            textarea.focus();
        }
    })
})
}
writeText()


function clickText(){
let textarea = document.querySelector('textarea');
let buttons = document.querySelectorAll('button');
buttons.forEach((el)=>{
    el.addEventListener('mousedown' , function(event){
        this.classList.add('active')
            if(this.classList.contains('Space')){
                    textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, "end");
                    textarea.focus();
            }
            else if(this.classList.contains('Tab')){
                    textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, "end");
                    textarea.focus();
            }
            else if(this.classList.contains('Backspace')){
                try {
                textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, "end");
                textarea.focus();
                } catch (error) {
                    console.log('нечего удалять')
                }
            }
            else if(this.classList.contains('Delete')){
                textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd+1, "end");
                textarea.focus();
            }
            else if(this.classList.contains('Enter')){
                textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd+1, "end");
                textarea.focus();
            }else if(!KEY_WRITE.includes(this.classList[0])){
                textarea.setRangeText(el.textContent, textarea.selectionStart, textarea.selectionEnd, "end");
                textarea.focus();
            }
            else if(this.classList.contains('ArrowRight')){
                textarea.selectionStart = textarea.selectionEnd+1;
                textarea.focus();
            }
            else if(this.classList.contains('ArrowLeft')){
                textarea.selectionEnd = textarea.selectionStart - 1;
                textarea.focus();
            }
            else if(this.classList.contains('ArrowUp')){
                textarea.selectionEnd = 0;
                textarea.focus();
            }
            else if(this.classList.contains('ArrowDown')){
                textarea.selectionStart = textarea.selectionEnd = textarea.value.length
                textarea.focus();
            }
            
            el.addEventListener('mouseup' , function(){
                this.classList.remove('active')
            })
        
    }) 
})
}
clickText()


function setLocalStorage() {
    localStorage.setItem('lang', language);
}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        language = localStorage.getItem('lang');
    }
}
window.addEventListener('load', getLocalStorage)
