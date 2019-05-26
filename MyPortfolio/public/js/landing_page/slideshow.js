function main() {

    // Automatic Slideshow
    autoSlide();

    // Detects mouse movements to close navigation buttons
    detectMouseMove();

    // Hovering on prev and next spaces
    prevSlideHover();
    nextSlideHover();

    // Changong Slides
    changeslide();

}





// Variables
var postSlideIndex = 0;
var preSlideIndex = 0;
var slides = document.getElementsByClassName('slideshow-image');
var noOfSlides = slides.length;

var sildes_content = document.getElementsByClassName('slide-content');

var slideAnimated = true;
var buttonClicked = false;
var timer = null;

var mouseX = null, mouseY = null;

main();






// Automatic SldieShow
function autoSlide() {
    if (slideAnimated) timer = setTimeout(doSlide, 5000);
    else setTimeout(autoSlide, 5000);
}
function doSlide() {
    changetoNext();
    clearTimeout(timer);
    autoSlide();
}





// Previous and next button functions
function changeslide() {
    document.getElementById('prev-slide').addEventListener('click', onClickPrev);
    document.getElementById('next-slide').addEventListener('click', onClickNext);
}
function onClickPrev() {
    buttonClicked = true;
    changetoPrev();
}
function changetoPrev() {
    concealPrevSlideBtn();
    changePrevIndex();
    commonFuncs();
}
function onClickNext() {
    buttonClicked = true;
    changetoNext();
}
function changetoNext() {
    concealNextSlideBtn();
    changeNextIndex();
    commonFuncs();
}
function commonFuncs(){
    if (buttonClicked) {
        clearTimeout(timer);
        autoSlide();
    }
    concealNavigationBtns();
    waitTillSlideAnimation();
    animateSlides();
}
function animateSlides() {
    var preSlideContent = slides[preSlideIndex].firstElementChild;
    var postSlideContent = slides[postSlideIndex].firstElementChild;
    slides[preSlideIndex].style.height = '0';
    slides[postSlideIndex].style.height = '100%';
    setTimeout(function() {
        preSlideContent.style.opacity = '0';
        postSlideContent.style.opacity = '1';
    }, 200);
    preSlideIndex = postSlideIndex;
}
function waitTillSlideAnimation() {
    slideAnimated = false;
    setTimeout(function() {
        slideAnimated = true;
        displayNavigationBtns();
        PrevBtn();
        NextBtn();
        buttonClicked = false;
        autoSlide;
    }, 1000);
}
function concealNavigationBtns() {
    document.getElementById('ss-navs').style.display = 'none';
}
function displayNavigationBtns() {
    document.getElementById('ss-navs').style.display = 'block';
}
function changePrevIndex() {
    --postSlideIndex;
    if (postSlideIndex < 0) {
        postSlideIndex = noOfSlides - 1;
    }
}
function changeNextIndex() {
    ++postSlideIndex;
    if (postSlideIndex >= noOfSlides) {
        postSlideIndex = 0;
    }
}





// Displays Slide Previous button on hovering
function prevSlideHover() {
    var prevSlide = document.getElementById('prev-slide');
    prevSlide.addEventListener('mouseenter', displayPrevSlideBtn);
    prevSlide.addEventListener('mouseleave', concealPrevSlideBtn);
}
function displayPrevSlideBtn() {
    var prevSlideBtn = document.getElementById('prev-slide-btn').style;
    prevSlideBtn.opacity = '1';
    prevSlideBtn.left = '0';
    document.getElementById('prev-slide').style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))';
    // document.getElementById('prev-slide').style.background = 'linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))';
}
function concealPrevSlideBtn() {
    var prevSlideBtn = document.getElementById('prev-slide-btn').style;
    prevSlideBtn.opacity = '0';
    prevSlideBtn.left = '50%';
    document.getElementById('prev-slide').style.background = 'transparent';
}




// Displays Slide Next button on hovering 
function nextSlideHover() {
    var nextSlide = document.getElementById('next-slide');
    nextSlide.addEventListener('mouseover', displayNextSlideBtn);
    nextSlide.addEventListener('mouseout', concealNextSlideBtn);
}
function displayNextSlideBtn() {
    var nextSlideBtn = document.getElementById('next-slide-btn').style;
    nextSlideBtn.opacity = '1';
    nextSlideBtn.right = '0';
    document.getElementById('next-slide').style.background = 'linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))';
    // document.getElementById('next-slide').style.background = 'linear-gradient(to left, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))';
}
function concealNextSlideBtn() {
    var nextSlideBtn = document.getElementById('next-slide-btn').style;
    nextSlideBtn.opacity = '0';
    nextSlideBtn.right = '50%';
    document.getElementById('next-slide').style.background = 'transparent';
}





// Detecting mouse positions to close opened navigation buttons and vice versa
function detectMouseMove() {
    document.addEventListener('mousemove', function() {
        PrevBtn();
        NextBtn();
    });
}
function getMousePosition() {
    mouseX = event.clientX;
    mouseY = event.clientY;
}
function PrevBtn() {
    getMousePosition();
    if (mouseX > window.innerWidth*0.17 + 10) {
        concealPrevSlideBtn();
    }
    else {
        displayPrevSlideBtn();
    }
}
function NextBtn() {
    getMousePosition();
    if (mouseX < window.innerWidth*(1 - 0.17) - 10) {
        concealNextSlideBtn();
    }
    else {
        displayNextSlideBtn();
    }
}
