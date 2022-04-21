//INTERACTION.HTML 
//인터랙션 GSAP  - 위에서부터 순서대로 구현되었습니다. 

document.addEventListener("DOMContentLoaded", function () {
    const heroType = new TypeIt('#element', {
            loop: true,
            speed: 100,
            lifeLike: true,
            loop: true,
        }).type('#DO IT DAILY ', {
            delay: 1000
        })
        .pause(3000)
        .delete()
        .type('#KEEP IT SIMPLE ')
        .pause(3000)
        .go();

    const h3El = document.querySelector('.section1-title');
    const set1Type = new TypeIt(h3El, {
        speed: 20,
        loop: false,
    });

    if (h3El.classList.contains('active')) {
        set1Type.go()
    }


    window.addEventListener('scroll', function () {
        if (h3El.classList.contains('active')) {
            set1Type.go()
        }
    });


});


//keep it simple
gsap.to(".section1-title", {
    scrollTrigger: {
        trigger: ".section1-title",
        scrub: true,
        toggleClass: "active",
    },
    duration: 2,
    ease: "none"
});


//keep it simple
gsap.to(".img1", {
    yPercent: -50,
    scrollTrigger: {
        trigger: ".img1",
        scrub: true,
    },
    duration: 2,
    ease: "none"
});

gsap.to(".txt1", {
    yPercent: 50,
    scrollTrigger: {
        trigger: ".txt1",
        scrub: true,
    },
    ease: "none",
    duration: 2,
});




gsap.fromTo(".img2", {
    //autoAlpha: 0, 
    x: '100%',
    opacity: 0,
}, {
    //TO

    scrollTrigger: {
        trigger: ".img2",

        scrub: true,
        //className: "active",
        toggleClass: "active",
    },
    ease: "Expo.easeOut",
    opacity: 1,
    x: 0,
    duration: 1
});

gsap.to(".img2", {
    scrollTrigger: {
        trigger: '.img2',
        yPercent: 50
    }
});




gsap.to(".txt2", {
    yPercent: -50,
    scrollTrigger: {
        trigger: ".txt2",
        scrub: true,
    },
    ease: "none",
    duration: 2,
});

gsap.to('.section-slide', {
    scrollTrigger: {
        trigger: '.section-slide',
        pin: true,
        start: 'top top',
        scrub: 1,
        toggleClass: "active",


    }
});



// const images = gsap.utils.toArray('img');
// const loader = document.querySelector('.loader--text');
// const updateProgress = (instance) => 
//   loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

// const showDemo = () => {
//   document.body.style.overflow = 'auto';
//   document.scrollingElement.scrollTo(0, 0);
//   gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
  
//   gsap.utils.toArray('section').forEach((section, index) => {
//     const w = section.querySelector('.wrapper');
//     const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
//     gsap.fromTo(w, {  x  }, {
//       x: xEnd,
//       scrollTrigger: { 
//         trigger: section, 
//         scrub: 0.5 
//       }
//     });
//   });
// }

// imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);


// gsap.fromTo(".info-item__third ", {
//     x: '100%',
//     opacity: 0,
// }, {
//     //TO
//     scrollTrigger: {
//         trigger: ".info-item__third ",
//     },
//     ease: "Expo.easeOut",
//     opacity: 1,
//     x: 0,
//     duration: 1
// });
const habbit_title = document.querySelector('.main-habbit__title'); 
const habbit_txt = document.querySelector('.main-habbit__txt'); 
const habbitText = gsap.to('.main-habbit__title', {
    //xPercent : 100, 
    xPercent : this.onUpdate, 
    duration: 3,
    scrollTrigger: {
        trigger: '.main-habbit__title',
        start: "100% 70%",

        //end: "100% 30%", 

        markers: {
            startColor: "blue",
            endColor: 'crimson',
            fontSize: "12px",
            fontWeight: 'bold'
        },

        //end: () => `+=${-computeTransateX()}`,
        onUpdate: ({ progress }) => {
            
            habbit_title.style.transform = `translateX(${(progress * 100) / 5}%)`
            habbit_txt.style.transform = `translateX(-${(progress * 100) / 5 }%)`
            
        },
        onComplete: self => {
            console.log('complete', self);
        }
    },

});

