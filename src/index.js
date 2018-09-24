import { fetchUrls } from './api';
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
    persistedUrls.map((item)=>main.insertAdjacentHTML('afterbegin',gridItemTpl({title:item,url:item,image:item,description:item}) +'<br>'));
        urlArray = persistedUrls
    }

form.addEventListener('submit', handleFormSumit);
main.addEventListener('click', handleBtnDel);



function handleFormSumit(e){
    e.preventDefault();

    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const $value=input.value
    const result = pattern.test($value)
    console.log('url',`${result}`);
    if (!result){
        alert('введен невалидный url');
    }
    else if (urlArray.find((elem)=>elem==input.value)){
        alert('такая закладка уже есть');
    } else {
        fetchUrls({query:input.value}).then(url=>{
            console.log('api:',url.data)
            urlArray.push(input.value);
            main.insertAdjacentHTML('afterbegin',gridItemTpl({title:url.data.title,url:url.data.url,image:url.data.image,description:url.data.description}) +'<br>');
            input.value='';
            console.log('after addition of url',urlArray);
            storage.set(urlArray);
            console.log('storage content', storage.get());
});
}
    
}

function handleBtnDel(e){
    
if(e.target.className=="buttonDel"){
    console.log('test_nazva_del', e.target.previousElementSibling.previousElementSibling.innerHTML.trim());
    urlArray = urlArray.filter(elem=>elem!==e.target.previousElementSibling.previousElementSibling.innerHTML.trim())
    console.log('after delete', urlArray);
    main.innerHTML='';
    urlArray.map((item)=>main.insertAdjacentHTML('afterbegin',gridItemTpl({title:item,url:item,image:item, description:item}) +'<br>'));
    storage.set(urlArray);
}
console.log(e);
console.log(e.target.previousSibling.data.trim());
}