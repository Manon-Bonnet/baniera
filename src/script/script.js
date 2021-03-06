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
let articlesClones = [];
let slides, slider, articles, slidesLength;
let canMove = true, moveFactor = 28;
let current = 0, previousArrows = [];


// Listeners
for(let i = 0; i < rightArrows.length; i++){
  rightArrows[i].addEventListener("click", slideToRight);
  leftArrows[i].addEventListener("click", slideToLeft);
}
window.addEventListener('resize', responsiveSlider);
responsiveSlider();

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
  current = 0;
  
  // suppress clones
  for (let i = articlesClones.length - 1; i >= 0; i--) {
    if (articlesClones.length != 0) {
      articlesClones[i].parentElement.removeChild(articlesClones[i]);
    }
  }
  articlesClones = [];

  //change slider if window size changed
  for(let i = 0; i < allSliders.length; i++){
    allSlides[i].style.transform = `translateX(0px)`;
    allSlides[i].querySelectorAll('article').forEach(article => {
      article.style.marginRight = '2vw';
    });
  }
  if(window.innerWidth >= 768){
    createClones();
    for(let i = 0; i < allSliders.length; i++){
      if(allSliders[i].offsetWidth == 1000){
        allSlides[i].style.transform = `translateX(-155px)`;
        allSlides[i].querySelectorAll('article').forEach(article => {
          article.style.marginRight = '23.3px';
          moveFactor = 1000/3;
        });
      } else{
        allSlides[i].style.transform = `translateX(-13vw)`;
        moveFactor = 28;
      }
    
    }
  }

}

function createClones(){
  if(window.innerWidth >= 768){
    // duplicate the slides
    for(let i = 0; i < allSlides.length ; i++){
      let one;
      one = allSlides[i].appendChild(allSlides[i].querySelector('a').cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('a')[1].cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('a')[2].cloneNode(true));
      articlesClones.push(one);
      one = allSlides[i].appendChild(allSlides[i].querySelectorAll('a')[3].cloneNode(true));
      articlesClones.push(one);
    }
  }
}


// Footer see more on mobile versions

const pluses = document.getElementsByClassName('plus');
let seeMoreOn = false, oldMinus, oldPlus;

for(let i = 0; i < pluses.length; i++){
  pluses[i].addEventListener("click", changeSeeMoreState);
}

function changeSeeMoreState(){
  if(seeMoreOn){
    seeMoreOn = false;
    if(oldPlus != this){
      seeMoreOn = true;
      seeMore(this);
      seeLess(oldPlus);
      oldPlus=this;
    }else{
      seeLess(this);
    }
    oldMinus = this;

  } else{
    seeMore(this);
    seeMoreOn = true;
    oldPlus=this;
  }
}

function seeMore(elem){
  let ul = elem.parentElement.parentElement.querySelector("ul");
  ul.style.display = "block";
  turnPlusIntoMinus(elem);
}

function seeLess(elem){
  let ul = elem.parentElement.parentElement.querySelector("ul");
  ul.style.display = "none";
  turnMinusIntoPlus(elem);
}

function turnPlusIntoMinus(plus){
  plus.querySelectorAll("rect")[1].style.display = "none";
}

function turnMinusIntoPlus(minus){
  minus.querySelectorAll("rect")[1].style.display = "block"
}