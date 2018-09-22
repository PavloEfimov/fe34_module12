import gridItemTpl from './item.hbs';
import * as storage from './storage'
import "./style.css";

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const main = document.querySelector('.main');
const persistedUrls = storage.get();

let urlArray=[];
let markup;

if (persistedUrls){
    persistedUrls.map((item)=>main.insertAdjacentHTML('afterbegin',gridItemTpl({webURL:item}) +'<br>'));
    // let q0 = persistedUrls.reduce((markup, item)=>markup+(gridItemTpl({webURL:item}) +'<br>'),'');
        // console.log('markup', q);
        // main.innerHTML='';
        // main.insertAdjacentHTML('afterbegin', q0);
        urlArray = persistedUrls
    }

form.addEventListener('submit', handleFormSumit);
main.addEventListener('click', handleBtnDel);



function handleFormSumit(e){
    e.preventDefault();

    if (urlArray.find((elem)=>elem==input.value)){
        alert('такая закладка уже есть');
    } else {
        urlArray.push(input.value);
    main.insertAdjacentHTML('afterbegin',gridItemTpl({webURL:input.value}) +'<br>');
}
    // console.log('grid',gridItemTpl({webURL:input.value}));
    input.value='';
    console.log(urlArray);
    storage.set(urlArray);
}

function handleBtnDel(e){
    
if(e.target.className=="buttonDel"){
    urlArray = urlArray.filter(elem=>elem!==e.target.previousSibling.data.trim())
    console.log('after delete', urlArray);
    main.innerHTML='';
    urlArray.map((item)=>main.insertAdjacentHTML('afterbegin',gridItemTpl({webURL:item}) +'<br>'));
    // let q = urlArray.reduce((markup, item)=>markup+(gridItemTpl({webURL:item}) +'<br>'),'');
    // console.log('markup', q);
    
    // main.insertAdjacentHTML('afterbegin', q);
    storage.set(urlArray);
}
console.log(e);
console.log(e.target.previousSibling.data.trim());
}