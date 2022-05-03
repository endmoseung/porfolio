//Make navbar transparent when it is on the top
'use strict';
const toggleBtn = document.querySelector(".navbar__toggle-btn");
const headboxContent = document.querySelector(".headbox__content");
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

toggleBtn.addEventListener('click',()=>{
    headboxContent.classList.toggle('active');
});

document.addEventListener("scroll",()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add("navbar--dark");
    }else{
        navbar.classList.remove("navbar--dark");
    }
});