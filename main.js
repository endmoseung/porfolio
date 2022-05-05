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
// 냅바 버튼을 클릭하면 해당하는 section으로 이동함
const headboxContentButtonActive = document.querySelector(".headbox__content--button.active");
const contactMeButton = document.querySelector(".contactme");
const headboxContentButton = document.querySelector(".headbox__content--button");

headboxContent.addEventListener("click",(event)=>{
  
  const target = event.target;
  const link = target.dataset.link;
  console.log(target);
  if(link == undefined){
    return;
  }
  headboxContent.classList.remove("active");
  scrollIntoView(link);
})



contactMeButton.addEventListener("click",()=>{
  scrollIntoView('#contact');

});

//스크롤 했을때 홈이 transparent되게

const homeMom = document.querySelector(".homemom");
const homemomheight = homeMom.getBoundingClientRect().height;
const home = document.querySelector("#home");
const homeheight = home.getBoundingClientRect().height;
console.log(homeheight);
document.addEventListener("scroll",()=>{
  homeMom.style.opacity = 1 - window.scrollY / homemomheight;
});

// up button

const arrowBtn = document.querySelector(".arrow--btn");
document.addEventListener("scroll",()=>{
  function byeButton(){
    arrowBtn.classList.remove("active");
  }
  if(window.scrollY > homeheight){
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

////remove active from the previous button's border, and select the new one's border
//1. 모든 섹션들의 요소들과 메뉴아이템을 가져온다
//2. intersectionobserver를 통해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 버튼을 활성화 시킨다.

const sectionIds = ['#home','#about','#skills','#mywork','#testimonial','#contact']; //애는 걍 단순한 배열
const sections = sectionIds.map(id=>document.querySelector(id)); //map은 일일히 위에 배열을 돌면서 각각의 배열에 해당하는값에 맞는 것을 queryselector로 불러온것을 배열로 만든것
const navItems = 
sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`));//애도 똑같음

let selectedNavItem = navItems[0];
const observeroption = {
  root:null,
  rootmargin: '0px',
  threshold : 0.3,
}
let selectedNavIndex = 0;
function selectNavItem(selected){
      selectedNavItem.classList.remove("active");
      selectedNavItem = selected;
      selectedNavItem.classList.add("active");
}
const observerCallback = (entries, observer)=>{
  entries.forEach(entry =>{
    if(!entry.isintersecting && entry.intersectionRatio > 0){// 요소가 빠져나가고 있을때
      const index = sectionIds.indexOf(`#${entry.target.id}`); //몇번쨰 배열인지 알려준다
      // 밑에에 대한 설명 스크롤이 아래로 내려가면서 페이지가 올라오는경우
      if(entry.boundingClientRect.y<0){
        selectedNavIndex= index + 1;
      }else{
        selectedNavIndex= index - 1;
      }
    }
  })
}
const observer = new IntersectionObserver(observerCallback, observeroption);
sections.forEach(section => observer.observe(section)); // sections배열안에 있는 모든것들을 observer해라는 뜻이고 section은 아무거나 들가도 된다
//화면이 아래로 내려갈떄는 빠져나가는 요소의 0.0의 값이 -이므로 요소의+1값을 불러오고 화면이 위로 올라갈때는 빠져나가는 요소의 0,0의 값이+이므로 요소의-1값을 불러온다 
window.addEventListener("wheel",()=>{ //사용자가 직접 이동할때= wheel
  console.log(window.innerHeight);
  if(window.scrollY === 0){
    selectedNavIndex=0;
  }else if (window.scrollY + window.innerHeight === document.body.getBoundingClientRect().height){//이떄까지 내린 scrolly의 값과 현재 윈도우height의 합은 총 페이지의 하잇과 같다
    selectedNavIndex = navItems.length-1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});


function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);   //link 변수에 있는 dataset 값을 추출한것이고 여기서는 selector
  scrollTo.scrollIntoView({behavior : 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
