/* ------------------------------ Make the burger menu */

// Get elements
const burgerMenuIcon = document.getElementsByClassName("burger-icone")[0];
const mainMenu = document.getElementsByClassName("main-menu")[0];
const secondMenuTitle = document.getElementsByClassName("second-menu-title");
const secondLevelMenu = document.getElementsByClassName("second-menu");

let openedSecond;

// listeners
burgerMenuIcon.addEventListener("click", openBurgerMenu);

for(let i=0 ; i< secondMenuTitle.length ; i++){
  secondMenuTitle[i].addEventListener("click", openSecondLevelMenu);
}


// functions 
function openBurgerMenu(){
  mainMenu.classList.add("open-menu");
  mainMenu.classList.remove("close-menu");
  closeIcon();
  burgerMenuIcon.removeEventListener("click", openBurgerMenu);
  burgerMenuIcon.addEventListener("click", closeBurgerMenu);
}

function closeBurgerMenu(){
  mainMenu.classList.remove("open-menu");
  mainMenu.classList.add("close-menu");
  openIcon();
  burgerMenuIcon.removeEventListener("click", closeBurgerMenu);
  burgerMenuIcon.addEventListener("click", openBurgerMenu);
}

function closeIcon(){
  burgerMenuIcon.classList.add("close-burger-icone");
  burgerMenuIcon.children[0].setAttribute("x", -10);
  burgerMenuIcon.children[0].setAttribute("width", 17);
  burgerMenuIcon.children[0].setAttribute("y", 12);
  burgerMenuIcon.children[2].setAttribute("x", 5);
  burgerMenuIcon.children[2].setAttribute("width", 17);
  burgerMenuIcon.children[2].setAttribute("y", .5);
}

function openIcon(){
  burgerMenuIcon.classList.remove("close-burger-icone");
  burgerMenuIcon.children[0].setAttribute("x", 0);
  burgerMenuIcon.children[0].setAttribute("width", 17);
  burgerMenuIcon.children[0].setAttribute("y", 1);
  burgerMenuIcon.children[2].setAttribute("x", 0);
  burgerMenuIcon.children[2].setAttribute("width", 17);
  burgerMenuIcon.children[2].setAttribute("y", 13);
}

function openSecondLevelMenu(){
  openedSecond = this;
  openedSecond.classList.add("open-second-menu");
  openedSecond.classList.remove("close-second-menu");
  changeBurgerIntoArrow();
}

function changeBurgerIntoArrow(){
  burgerMenuIcon.classList.remove("close-burger-icone");
  burgerMenuIcon.classList.add("arrow-burger-icone");
  burgerMenuIcon.children[0].setAttribute("x", -5);
  burgerMenuIcon.children[0].setAttribute("y", 5);
  burgerMenuIcon.children[0].setAttribute("width", 10);
  burgerMenuIcon.children[1].setAttribute("y", 7);
  burgerMenuIcon.children[2].setAttribute("x", 7);
  burgerMenuIcon.children[2].setAttribute("y", 4);
  burgerMenuIcon.children[2].setAttribute("width", 10);

  burgerMenuIcon.removeEventListener("click", closeBurgerMenu);
  burgerMenuIcon.addEventListener("click", backToBurgerMenu);
}

function backToBurgerMenu(){
  openedSecond.classList.remove("open-second-menu");
  openedSecond.classList.add("close-second-menu");
  burgerMenuIcon.classList.add("close-burger-icone");
  burgerMenuIcon.classList.remove("arrow-burger-icone");
  burgerMenuIcon.removeEventListener("click", backToBurgerMenu);
  openBurgerMenu();
}

/*----------------------------- Slider */

//Get elements 
const rightArrow = document.getElementsByClassName("right-arrow")[0];
const leftArrow = document.getElementsByClassName("left-arrow")[0];
const slides = document.getElementsByClassName("slides")[0];

const count = document.querySelector('.slides').children.length;
let current = 0;

// Listeners
rightArrow.addEventListener("click", slideToRight);
leftArrow.addEventListener("click", slideToLeft);



function slideToRight(){
  current++;
  slide();
}

function slideToLeft(){
  current--;
  slide();
}

function slide(){
  const transform = -27 * current;
  slides.style.transform = `translateX(${transform}vw)`;
  leftArrow.style.display = current === 0 ? "none" : "block";
  rightArrow.style.display = current === count - 1 ? "none" : "block";
}