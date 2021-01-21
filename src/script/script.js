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
const slider = document.getElementsByClassName("slider")[0].offsetWidth;
const articles = document.getElementsByClassName("slides")[0].querySelectorAll('article');
const slidesLength = slides.querySelectorAll('article').length;
let canMove = true, windowWidth = true, moveFactor = 28;

const count = document.querySelector('.slides').children.length;
let current = 0;




// Listeners
rightArrow.addEventListener("click", slideToRight);
leftArrow.addEventListener("click", slideToLeft);
window.onresize =responsiveSlider();

// duplicate the slides
slides.appendChild(slides.querySelector('article').cloneNode(true));
slides.appendChild(slides.querySelectorAll('article')[1].cloneNode(true));
slides.appendChild(slides.querySelectorAll('article')[2].cloneNode(true));
slides.appendChild(slides.querySelectorAll('article')[3].cloneNode(true));


//functions 
function slideToRight(){
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

// Adapt margin to slider size
function responsiveSlider(){
  if(slider == 1000){
    slides.style.transform = `translateX(-155px)`;
    articles.forEach(article => {
      article.style.marginRight = '23.3px';
      windowWidth = false;
      moveFactor = 333.3;
    });
  }
  slides.style.transform = `translateX(-13vw)`;
  articles.forEach(article => {
    article.style.marginRight = '2vw';
    windowWidth = true;
    moveFactor = 28;
  });

}