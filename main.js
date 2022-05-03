const toggleBtn = document.querySelector(".navbar__toggle-btn");
const headboxContent = document.querySelector(".headbox__content");

toggleBtn.addEventListener('click',()=>{
    headboxContent.classList.toggle('active');
});