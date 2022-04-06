(() => {
    //SLIDE MOBILE ONLY (PC - gallery list)
    let swiper_MobileOnly = Swiper;
    let init = false;
    function swiperMobileOnly() {
        let mobile = window.matchMedia('(max-width: 768px');
        let desktop = window.matchMedia('(min-width: 769px');
        if (mobile.matches) {
            if (!init) {
                init = true;
                swiper_MobileOnly = new Swiper('.swiper-mobile-only', {
                    loop: true,
                    pagination: {
                        el: '.swiper-pager',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-next",
                        prevEl: ".swiper-prev",
                      },
                    slidesPerView: 1,
                    centeredSlides: true,
                });
            }
        }else if(desktop.matches) {
            if($('.swiper-mobile-only').hasClass('swiper-container-initialized')) { 
                swiper_MobileOnly.destroy(); 
                init=  false; 
            }
        }
    }
    
    
    window.addEventListener('load', function () {
        if ($.exists('.swiper-mobile-only')) swiperMobileOnly();
        if ($.exists('.swiper-custom-type1')) swiperCustomType1();
    });
    window.addEventListener('resize', function () {
      if ($.exists('.swiper-mobile-only')) swiperMobileOnly();
      if ($.exists('.swiper-custom-type1')) swiperCustomType1();
    });

    // window.addEventListener('mousemove', function(e) { 
    //     console.log(e.clientX, e.clientY);
    // })


    //CUSTOM 
    let swiper_custom_type1 = Swiper; 
    function swiperCustomType1() {
        swiper_custom_type1 = new Swiper( '.swiper-custom-type1',  {
            loop: true,
            effect: 'fade',
            pagination: {
                el: ".swiper-pager",
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return '0' + (current) + '<span>/</span>0' + (total);
                }
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
            },
            
            /* option lists ---- 
                effect: "slide",
                loop: false,
                speed: 1100,
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                parallax: true,
                autoplay: false,
                allowTouchMove: false,
                simulateTouch: false,
                grabCursor: false,
                observer: true,
                mousewheel: {
                    releaseOnEdges: true
                },
                mousewheel: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            ------ */
        })
    }


})();