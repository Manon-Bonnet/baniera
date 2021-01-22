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
const allSlides = document.querySelectorAll(".slides");
const allSliders = document.querySelectorAll(".slider");
const rightArrows = document.getElementsByClassName("right-arrow");
const leftArrows = document.getElementsByClassName("left-arrow");
let slides, slider, articles, slidesLength;
let canMove = true, windowWidth = true, moveFactor = 28;
let current = 0, previousArrows = [];


// Listeners
for(let i = 0; i < rightArrows.length; i++){
  rightArrows[i].addEventListener("click", slideToRight);
  leftArrows[i].addEventListener("click", slideToLeft);
}
window.onresize = responsiveSlider;



if(window.innerWidth >= 768){
  // duplicate the slides
  for(let i = 0; i < allSlides.length ; i++){
    allSlides[i].appendChild(allSlides[i].querySelector('article').cloneNode(true));
    allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[1].cloneNode(true));
    allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[2].cloneNode(true));
    allSlides[i].appendChild(allSlides[i].querySelectorAll('article')[3].cloneNode(true));
  }
  responsiveSlider();
}


//functions 
function slideToRight(){
  getSlider(this);
  current++;
  if(canMove && current <= slidesLength){
    slide(-moveFactor*current, false);
    if (current === slidesLength) { 
      setTimeout(function() {
        current=0;
        jumpTo(0); 
      }, 300);
    } 
  }
}

function slideToLeft(){
  getSlider(this);
  current--;
  if(canMove && current >= -1){
    if (current === -1) { 
      jumpTo((-slidesLength)*moveFactor, function() { 
        current=4;
        slide(-moveFactor*current, false); 
      });
    } else {
      slide(-moveFactor*current, false);
    }
  }
}

function slide(nextPosition, jump){
  if (!jump) { 
    canMove = false;
    setTimeout(function() {
      canMove = true;
    }, 300);
  }
  if(moveFactor == 28){
    slides.style.transform = `translateX(${nextPosition-13}vw)`;
  } else{
    slides.style.transform = `translateX(${nextPosition-155}px)`;
  }
}

function jumpTo(newPosition, callback) {
  window.requestAnimationFrame(function() { 
    slides.style.transition = 'none'; 
    slide(newPosition, true);

    window.requestAnimationFrame(function() { 
      slides.style.transition = 'transform 300ms'; 
      
      if (callback) { 
        callback();
      }
    });
  });
}

function getSlider(elem){
  getArrow(elem);
  let sliderSection = elem.parentElement;
  slider = sliderSection.getElementsByClassName("slider")[0].offsetWidth;
  slides = sliderSection.getElementsByClassName("slides")[0];
  articles = slides.querySelectorAll('article');
  slidesLength = Number((slides.querySelectorAll('article').length) -4);
}

function getArrow(arrow){
  let otherArrow;
  // get the arrows clicked
  if(arrow.classList.contains("right-arrow")){
    otherArrow = arrow.parentElement.querySelector('.left-arrow');
  } else{
    otherArrow = arrow.parentElement.querySelector('.right-arrow');
  }

  // check if arrow is on another slider
  if(current != 0){
    checkChangedSlider(arrow, otherArrow, previousArrows);
  }

  // register the arrow clicked for next click to compare
  previousArrows = [arrow, otherArrow];

}

function checkChangedSlider(arrow1, arrow2, arrowTab){
  if(arrowTab[0] != arrow1 && arrowTab[0] != arrow2 && arrowTab[1] != arrow1 && arrowTab[1] != arrow2){
    current = 0;
  }
  resetPreviousSlider(arrowTab);
}

function resetPreviousSlider(arrowTab){
  if(arrowTab[0].parentElement.querySelector(".slides").length == 1000){
    arrowTab[0].parentElement.querySelector(".slides").style.transform = `translateX(-155px)`;
  } else{
    arrowTab[0].parentElement.querySelector(".slides").style.transform = `translateX(-13vw)`;
  }
}

// Adapt margin to slider size
function responsiveSlider(){
  if(window.innerWidth >= 768){
    for(let i = 0; i < allSliders.length; i++){
      if(allSliders[i].offsetWidth == 1000){
        allSlides[i].style.transform = `translateX(-155px)`;
        allSlides[i].querySelectorAll('article').forEach(article => {
          article.style.marginRight = '23.3px';
          windowWidth = false;
          moveFactor = 1000/3;
        });
      } else{
        allSlides[i].style.transform = `translateX(-13vw)`;
        allSlides[i].querySelectorAll('article').forEach(article => {
          article.style.marginRight = '2vw';
          windowWidth = true;
          moveFactor = 28;
        });
      }
    
    }
  }
  

}