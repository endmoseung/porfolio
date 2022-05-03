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

// up button

const arrowBtn = document.querySelector(".arrow--btn");
document.addEventListener("scroll",()=>{
  function byeButton(){
    arrowBtn.classList.remove("active");
  }
  if(window.scrollY > homeHeight){
    arrowBtn.classList.add("active");
    setTimeout(byeButton,5000)//시간이 일정시간 지났을때 함수호출 여기서는 5000ms 즉 5초뒤에 arrowbtn이 사라지도록 함
  }else{
    arrowBtn.classList.remove("active");
  }
})

// if click up button go to top
arrowBtn.addEventListener("click",()=>{
  scrollIntoView('#home');
})

// filtering project

const myWorkProjectImgs = document.querySelectorAll(".mywork__projectimgs a");
const myWorkProjectImgBox = document.querySelector(".mywork__projectimgs");
const projectPosition = document.querySelector(".project__position");

projectPosition.addEventListener("click",(event)=>{
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;  //or 오른쪽에 경우는 버튼안에 숫자에 관한 경운데 이 숫자의 부모요소의 Dataset은 or 왼쪽의 data와 같다
  if (filter == null){
    return ;
  }
//remove active from the previous item, and select the new one
  const active = document.querySelector(".project__position button.active");
  active.classList.remove("active");
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add("active");
  myWorkProjectImgBox.classList.add("anim-out");

setTimeout(()=>{
  myWorkProjectImgBox.classList.remove("anim-out");
  myWorkProjectImgs.forEach((project)=>{
    console.log(project.dataset.type);
    if(filter === '*' || filter === project.dataset.type){
      project.classList.remove("invisible");
    }else{
      project.classList.add("invisible");
    }
  })
},300);

});