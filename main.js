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

//Handle scrolling when tapping on the navbar menu
/*
const homeButton = document.querySelector("#home__button");
const aboutButton = document.querySelector("#about__button");
const skillsButton = document.querySelector("#skills__button");
const myworkButton = document.querySelector("#mywork__button");
const testimonialButton = document.querySelector("#testimonial__button");
const contactButton = document.querySelector("#contact__button");
const contactMeButton = document.querySelector(".contactme");
const headboxContentButton = document.querySelector(".headbox__content--button");

homeButton.addEventListener("click",()=>{
  window.scrollTo(0,0);
  headboxContentButton.classList.remove("active");
  homeButton.classList.add("active");
})
aboutButton.addEventListener("click",()=>{
  window.scrollTo(0,585);
  headboxContentButton.classList.remove("active");
  aboutButton.classList.add("active");
})
skillsButton.addEventListener("click",()=>{
  window.scrollTo(0,1421);
  headboxContentButton.classList.remove("active");
  skillsButton.classList.add("active");
})
myworkButton.addEventListener("click",()=>{
  window.scrollTo(0,2173);
  headboxContentButton.classList.remove("active");
  myworkButton.classList.add("active");
})
testimonialButton.addEventListener("click",()=>{
  window.scrollTo(0,3287);
  headboxContentButton.classList.remove("active");
  testimonialButton.classList.add("active");
})
contactButton.addEventListener("click",()=>{
  window.scrollTo(0,3653.5);
  headboxContentButton.classList.remove("active");
  contactButton.classList.add("active");
})
contactMeButton.addEventListener("click",()=>{
  window.scrollTo(0,3653.5);
})*/

const contactMeButton = document.querySelector(".contactme");
const headboxContentButton = document.querySelector(".headbox__content--button");

headboxContent.addEventListener("click",(event)=>{
  
  const target = event.target;
  const link = target.dataset.link;
  if(link == undefined){
    return;
  }
  scrollIntoView(link);
  target.classList.add("active");
  c
})

contactMeButton.addEventListener("click",()=>{
  scrollIntoView('#contact');
});

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);   //link 변수에 있는 dataset 값을 추출한것이고 여기서는 selector
  scrollTo.scrollIntoView({behavior : 'smooth'});
}

//스크롤 했을때 홈이 transparent되게

const homeMom = document.querySelector(".homemom");
const homeHeight = homeMom.getBoundingClientRect().height;


document.addEventListener("scroll",()=>{
  homeMom.style.opacity = 1 - window.scrollY / homeHeight;
});