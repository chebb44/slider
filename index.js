let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n){
  currentItem = (n + items.length) % items.length;
}

document.querySelector('.arrow.left').addEventListener('click', function(){
  if (isEnabled) {
    previousItem(currentItem);
  }
});
document.querySelector('.arrow.right').addEventListener('click', function(){
  if (isEnabled){ 
    nextItem(currentItem);
  }
});

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

function hideItem(direction){
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  })
}
function showItem(direction){
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  })
}

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 100;
  let resrtaint = 70;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e){
    dist = 0;
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function(e){
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if(elapsedTime < allowedTime){
      if(Math.abs(distX) > threshold && Math.abs(distY) < resrtaint){
        if (distX > 0 && isEnabled) {
          previousItem(currentItem);
        }
        if (distX < 0 && isEnabled) {
          nextItem(currentItem);
        } 
      }
    }
    
    e.preventDefault();
  });

  surface.addEventListener('touchstart', function(e){
    if(e.target.classList.contains('arrow')){
      if(e.target.classList.contains('left') && isEnabled){
        previousItem(currentItem);
      }
      if(e.target.classList.contains('right') && isEnabled){
        nextItem(currentItem);
      } 
    }
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('touchmove', function(e){
    e.preventDefault();
  });

  surface.addEventListener('touchend', function(e){
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if(elapsedTime < allowedTime){
      if(Math.abs(distX) > threshold && Math.abs(distY) < resrtaint){
        if (distX > 0 && isEnabled) {
          previousItem(currentItem);
        }
        if (distX < 0 && isEnabled) {
          nextItem(currentItem);
        } 
      }
    }
    
    e.preventDefault();
  });
}
let el = document.querySelector('.carousel');
swipedetect(el);
