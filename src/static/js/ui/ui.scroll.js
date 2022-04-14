document.addEventListener("DOMContentLoaded", function () {

    //TYPE IT  (GPLv3)
    const heroType = new TypeIt('#element', {
            loop: true,
            speed: 100,
            lifeLike: false,
        }).type('#DO IT DAILY ', {
            delay: 1000
        })
        .pause(3000)
        .delete()
        .type('#KEEP IT SIMPLE ')
        .pause(3000)
        .go();
});


const scrollContent = document.querySelector('.scroll-content');
const headerElem = document.querySelector('.header');

//RAF 
function optimizeAnimation(callback) {
    let ticking = false;

    return () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                callback();
                ticking = false;
            });
        }
    };
}

window.addEventListener(
    "scroll",
    optimizeAnimation(() => {

    }), {
        passive: true
    }
);


//RESIZE EVENT
let resizeTimer = null;

function resizeComplete() {
    //console.log('resize Complete');
}

window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeComplete, 400);
}, false);




//Marquee Animation
const marquees = document.querySelectorAll('.marquee');
let start = 0;

function animate(time) {
    start++;
    marquees[0].style.transform = `translate(-${start}px, 0px)`
    marquees[1].style.transform = `translate(-${start}px, 0px)`

    if (start > marquees[0].offsetWidth) {
        start = 0;
    }
    if (start < marquees[0].offsetWidth) {
        raf = requestAnimationFrame(animate);
    } else if (start >= marquees[0].offsetWidth) {
        start = 0;
        raf = requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(raf)
    }
}

animate();
let yOffset = 0;


window.addEventListener('scroll', (e) => {
    yOffset = window.pageYOffset;

    //패럴랙스 스크롤 이미지 인터랙션
    //console.log(window.screenY, window.scrollY, window.innerHeight, window.outerHeight);
    let imgEl = document.querySelectorAll('.info-item__img');
    let parallax_text = document.querySelectorAll('.parallax-text');

    //IMAGE
    imgEl.forEach(img => {
        let temp = img.getBoundingClientRect().y;
        if (temp < window.innerHeight && temp > -10) {

            //img.childNodes[1].style.transform = `translate(0, ${-50 + temp/15}%)`
            console.log(img.children);

            if (img.classList.contains('img-overlay')) {
                img.classList.add('is-active');
            }

        } else {
            img.classList.remove('is-active')
        }
    });

    parallax_text.forEach(el => {
        let temp = el.getBoundingClientRect().y;
        if (temp < window.innerHeight && temp > -10) {
            el.style.transform = `translate(0, ${-50 + temp/10}%)`
        }
    });
    //HEADER fix
    //yOffset > 0 ? headerElem.classList.add('header--fixed') : headerElem.classList.remove('header--fixed');
});



const slide = document.querySelectorAll('.slide-item');
const slideContainer = document.querySelector('.slide-container');
const slideFullWidth = window.innerWidth * slide.length;
slideContainer.style.width = slideFullWidth + 'px';

slide.forEach(el => {
    el.style.width = window.innerWidth + 'px'
})
let removeItem = null;

function removeChild() {
    removeItem = slideContainer.removeChild(slideContainer.firstElementChild);
    slideContainer.appendChild(removeItem);
}

function moveChild() {
    slideContainer.style.transform = `translate3D(-${window.innerWidth}px, 0, 0)`;

    setTimeout(() => {
        //        removeChild();
    }, 1600);
}
setInterval(() => {
    //slideContainer.style.transform = `translate3D(-${window.innerWidth}px, 0, 0)`;      
    moveChild();
}, 1000);