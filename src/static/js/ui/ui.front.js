documentReady(function () {
    browserCheck();

    setViewHeight.initialize();
    fileAttach.initialize(); //파일첨부커스텀 
    singleNavigation.initialize(); //상단 네비게이션 (1메뉴)
    fulldownNavigation.initialize(); //상단 네비게이션 (전체메뉴)
    showTooltip.initialize(); //툴팁 
    tabUI.initialize(); //탭메뉴 
    jQueryDatepickerUI.initialize(); //jQuery Datepicker 
    sideNavigation.initialize(); //Siden avigation
    swiperSlides.initialize(); //Siden avigation

    //Checkbox event
    //Input Validation
    //Modal
    //Accordion
    //Dropdown Selectbox
    //HeaderSticky
    //goTop
    //Treeview
});

// document ready 
function documentReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function isInPage(node) {
    return document.querySelectorAll(node).length > 0;
}

//BrowserCheck
function browserCheck() {
    let browser = (function (agent) {
        switch (true) {
            case agent.indexOf("edge") > -1:
                return "edge";
            case agent.indexOf("edg") > -1:
                return "chromium based edge (dev or canary)";
            case agent.indexOf("chrome") > -1 && !!window.chrome:
                return "chrome";
            case agent.indexOf("trident") > -1:
                return "ie";
            case agent.indexOf("firefox") > -1:
                return "firefox";
            case agent.indexOf("safari") > -1:
                return "safari";
            default:
                return "other";
        }
    })(window.navigator.userAgent.toLowerCase());
    const el = document.querySelector('body');
    if (browser === 'chrome') el.classList.add('chrome');
    else if (browser === 'edge') el.classList.add('edge');
    else if (browser === 'edg') el.classList.add('edg-chrome');
    else if (browser === 'trident') el.classList.add('ie');
    else if (browser === 'firefox') el.classList.add('firefox');
    else if (browser === 'safari') el.classList.add('safari');
    else el.classList.add('other');
}

//setViewHeight
(function () {
    "use strict";
    /**
	 * @description 
            vh setting (css body height 100%)
            height: calc(100 * var(--vh));
	 * @modify
	        2022.04.04
	*/

    const setViewHeight = {
        /** 플러그인명 */
        bindjQuery: 'setViewHeight',
        /** 기본 옵션값 선언부 */
        defaults: {},
        initialize() {
            const me = this;
            me._load();
            me._resize();
        },
        _load() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            //console.log('load 1vh = ', vh);
        },
        _resize() {
            window.addEventListener('resize', function () {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                //console.log('resize 1vh = ', vh);
            });
        }
        /*
        let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); 
        window.addEventListener('resize', () => { let vh = window.innerHeight * 0.01; 
            document.documentElement.style.setProperty('--vh', `${vh}px`); }); 
            window.addEventListener('touchend', () => { let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); });

        */
    };
    window.setViewHeight = setViewHeight;
})();

//aosAnimate
(function () {
    "use strict";
    /**
	 * @description     AOS initilize
	 * @modify          2022.04.04
     *  <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out"
            data-aos-mirror="true" data-aos-once="false" data-aos-anchor-placement="top-center" > ... </div>
	*/
    const aosAnimate = {
        /** 플러그인명 */
        bindjQuery: 'aosAnimate',
        /** 기본 옵션값 선언부 */
        initialize() {
            const me = this;
            me._load();
        },
        _load() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE");

            if (msie > 0) {
                $("[data-aos^=fade][data-aos^=fade]").css({
                    opacity: 1,
                    transform: "none",
                });
            } else {
                AOS.init({
                    startEvent: 'DOMContentLoaded',
                    easing: 'ease-in-out-quart',
                    initClassName: 'aos-init', // class applied after initialization
                    animatedClassName: 'aos-animate', // class applied on animation
                    once: false,
                    duration: 800,
                    delay: 150,
                    offset: 120,
                });
            }
        },
    };
    window.aosAnimate = aosAnimate;
})();

//file attachment
(function () {
    "use strict";
    /**
     * @description     file attachment
     * @modify          2022.04.04
     */
    const fileAttach = {
        /** 플러그인명 */
        bindjQuery: 'fileAttach',
        /** 기본 옵션값 선언부 */
        selectors: {
            btn: document.querySelectorAll('.btn-attachfile'),
            input_file: document.querySelectorAll('input[type="file"] + input')
        },
        initialize() {
            const me = this;
            me._click();
            me._focus();
        },
        _click() {
            const me = this.selectors.btn;
            me.forEach(el => {
                el.addEventListener('click', function () {
                    let inputFile = this.previousElementSibling.previousElementSibling;
                    inputFile.click();

                    inputFile.addEventListener('change', function () {
                        let inputvalue = inputFile.files[0].name;

                        inputFile.nextElementSibling.value = '';
                        inputFile.nextElementSibling.value = inputvalue
                    });
                })
            });
        },
        _focus() {
            const inputText = this.selectors.input_file;

            inputText.forEach(el => {
                el.addEventListener('focus', function (e) {
                    this.nextElementSibling.focus();
                    this.nextElementSibling.click();
                })
            })
        }
    };
    window.fileAttach = fileAttach;
})();

// Single Navigation 
(function () {
    "use strict";
    /**
     * @description     dropdown navigation
     * @modify          2022.04.04
     */
    const singleNavigation = {
        /** 플러그인명 */
        bindjQuery: 'singleNavigation',
        /** 기본 옵션값 선언부 */
        selectors: {
            depth1: document.querySelectorAll('.gnb-dropdown .node1-item'),
            depth2: document.querySelectorAll('.gnb-dropdown .node2-item'),
        },
        initialize() {
            this._focusout();
            this._focus();
            this._mouseEnter();
        },
        _focus() {
            let items = this.selectors.depth1;
            items.forEach(el => {
                if (!el.classList.contains('.is-entered')) {
                    el.addEventListener('focusin', function (e) {
                        e.preventDefault();

                        if (!this.classList.contains('.is-active')) {
                            let ariaMenuCurrent = this.getElementsByTagName('a')[0];
                            ariaMenuCurrent.setAttribute('aria-expanded', true);
                            this.classList.add('is-entered');
                            this.classList.add('is-active');
                        }
                    });
                }
            })
        },
        _mouseEnter() {
            let items = this.selectors.depth1;
            items.forEach(el => {
                if (!el.classList.contains('.is-entered')) {
                    el.addEventListener('mouseenter', function (e) {
                        e.preventDefault();

                        if (!this.classList.contains('.is-active')) {
                            let ariaMenuCurrent = this.getElementsByTagName('a')[0];
                            ariaMenuCurrent.setAttribute('aria-expanded', true);
                            this.classList.add('is-entered');
                            this.classList.add('is-active');
                        }
                    });
                }
            })
        },
        _focusout() {
            let setTime = null;
            $('.node1-item').on('focusout blur mouseleave', function (e) {
                e.preventDefault();
                $('.node1-item').removeClass('is-active is-entered')
            })
        },
        _mouseLeave() {},
    };
    window.singleNavigation = singleNavigation;
})();

// Fulldown Navigation 
(function () {
    "use strict";
    /**
     * @description     fulldown navigation
     * @modify          2022.04.04
     */
    const fulldownNavigation = {
        /** 플러그인명 */
        bindjQuery: 'fulldownNavigation',
        /** 기본 옵션값 선언부 */
        selectors: {
            depth1: document.querySelectorAll('.gnb-fulldown .node1-item'),
            depth2: document.querySelectorAll('.gnb-fulldown .node2-item'),
            depth2Wrap: document.querySelectorAll('.gnb-fulldown .node2-menu'),
            fulldownBg: document.querySelector('.fulldown-bg')
        },
        initialize() {
            this._focusout();
            this._focusin();
            this._mouseLeave();
            this._mouseenter();
        },
        _focusin() {
            this._inFn('focusin');
        },
        _mouseenter() {
            this._inFn('mouseenter');
        },
        _focusout() {
            this._outFn('focusout');
        },
        _mouseLeave() {
            this._outFn('mouseleave');
        },
        _inFn(event) {
            let items = this.selectors.depth1;
            const bg = this.selectors.fulldownBg;
            const node2Wrap = this.selectors.depth2Wrap;
            let temp = [];

            //GNB BG Height Set
            for (let i = 0; i < $('.gnb-fulldown .node2-menu').length; i++) {
                temp.push($('.gnb-fulldown .node2-menu').eq(i).height())
            }
            let gnbHeight = `${Math.max(...temp)}px`;

            //add class
            items.forEach(el => {
                el.addEventListener(event, function (e) {
                    items.forEach(el => {
                        el.classList.add('is-active')
                        bg.style.height = gnbHeight;
                    });
                    node2Wrap.forEach(item2 => item2.style.height = gnbHeight);
                });
            });
        },
        _outFn(event) {
            const bg = this.selectors.fulldownBg;
            const node2Wrap = this.selectors.depth2Wrap;
            $('.node1-item ').on(event, function (e) {
                e.preventDefault();
                $('.node1-item').removeClass('is-active is-entered');
                bg.style.height = 0;
            });
        },
    };
    window.fulldownNavigation = fulldownNavigation;
})();

// showTooltip
(function () {
    "use strict";
    /**
     * @description     tooltip
     * @modify          2022.04.06
     */
    const showTooltip = {
        /** 플러그인명 */
        bindjQuery: 'showTooltip',
        /** 기본 옵션값 선언부 */
        selectors: {
            tooltipCall: document.querySelectorAll('.tooltip-sample [aria-describedby]'),
        },
        initialize() {
            this._focus();
            this._focusout();
            //this._mouseleave();
            //this._mouseenter();
        },
        _focus() {
            let tipFocus = this.selectors.tooltipCall;
            this._inFn(tipFocus, 'focus')
        },
        _mouseenter() {
            let tipFocus = this.selectors.tooltipCall;
            this._inFn(tipFocus, 'mouseenter')
        },
        _focusout() {
            let tipFocus = this.selectors.tooltipCall;
            this._outFn(tipFocus, 'focusout');
        },
        _mouseleave() {
            let tipFocus = this.selectors.tooltipCall;
            this._outFn(tipFocus, 'mouseleave');
        },
        //Events
        _inFn(tipFocus, e) {
            let tipElem = '';
            tipFocus.forEach(element => {
                element.addEventListener(e, function () {
                    tipElem = document.querySelector(`#${element.getAttribute('aria-describedby')}`);
                    tipElem.setAttribute('aria-hidden', 'false');
                })
            });
        },
        _outFn(tipFocus, e) {
            let tipElem = '';
            tipFocus.forEach(element => {
                element.addEventListener(e, function () {
                    tipElem = document.querySelector(`#${element.getAttribute('aria-describedby')}`);
                    tipElem.setAttribute('aria-hidden', 'true');
                })
            });
        }
    };
    window.showTooltip = showTooltip;
})();

//Tab Ui 
(function () {
    "use strict";
    /**
     * @description     TAB UI
     * @modify          2022.04.07
     */
    const tabUI = {
        /** 플러그인명 */
        bindjQuery: 'tabUI',
        /** 기본 옵션값 선언부 */
        selectors: {
            tabs: document.querySelectorAll('[role="tab"]'),
            tabLists: document.querySelectorAll('[role="tablist"]'),
        },
        initialize() {
            this._click();
            this._keydown();
        },
        _click() {
            const tabs = this.selectors.tabs;

            tabs.forEach(tab => {
                if (tab.getAttribute('aria-selected') == true) {
                    tab.tabIndfghex = 0;
                } else {
                    tab.tabIndfghex = -1;
                }

                tab.addEventListener('click', e => {
                    const parent = tab.parentNode.tagName === "LI" ? tab.parentNode.parentNode : tab.parentNode;
                    const panelWrap = document.querySelector(`#${tab.getAttribute("aria-controls")}`).parentNode;

                    parent.querySelectorAll('[aria-selected="true"]').forEach(t => {
                        t.setAttribute("aria-selected", false)
                        t.tabIndex = -1;
                    });

                    tab.setAttribute("aria-selected", true);
                    tab.tabIndex = 0;

                    panelWrap.querySelectorAll(':scope > [role="tabpanel"]').forEach(p => p.style.display = "none");

                    panelWrap.querySelector(`#${tab.getAttribute("aria-controls")}`).style.display = "revert"

                    e.preventDefault();
                })
            })
        },
        _keydown() {
            const tabLists = this.selectors.tabLists;
            tabLists.forEach(tabList => {
                tabList.addEventListener("keydown", e => {
                    const parent = tabList.parentNode.tagName === "LI" ? tabList.parentNode.parentNode : tabList.parentNode;
                    const innerTabs = parent.querySelectorAll('[role="tab"]');
                    let tabFocus = 0;
                    for (let i = 0; i < innerTabs.length; i++) {
                        if (innerTabs[i].getAttribute("aria-selected") == "true") {
                            tabFocus = i;
                        }
                    }
                    if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 36 || e.keyCode === 35) {
                        innerTabs[tabFocus].tabIndex = -1;
                        if (e.keyCode === 39) { // right
                            tabFocus++;
                            if (tabFocus >= innerTabs.length) {
                                tabFocus = 0;
                            }
                        } else if (e.keyCode === 37) { // left
                            tabFocus--;
                            if (tabFocus < 0) {
                                tabFocus = innerTabs.length - 1;
                            }
                        } else if (e.keyCode === 36) { // home
                            tabFocus = 0;
                        } else if (e.keyCode === 35) { // end
                            tabFocus = innerTabs.length - 1;
                        }
                        innerTabs[tabFocus].tabIndex = 0;
                        innerTabs[tabFocus].click();
                        innerTabs[tabFocus].focus();
                        e.preventDefault();
                    }
                });
            });
        },
    };
    window.tabUI = tabUI;
})();

//jQuery UI Datepicker 
(function () {
    "use strict";
    /**
     * @description     jQuery Datepicker 
     * @modify          2022.04.06
     */
    const jQueryDatepickerUI = {
        /** 플러그인명 */
        bindjQuery: 'jQueryDatepickerUI',
        /** 기본 옵션값 선언부 */
        selectors: {
            datepickerEl: document.querySelectorAll('.datepicker-ui'),
        },
        data: {
            //unavailableDay : ["2022-4-7"]
            unavailableDay: [],
        },
        initialize() {
            this._focus();
        },
        _focus() {
            const me = this.selectors.datepickerEl;
            const unavailableDay = this.data.unavailableDay;
            const datepickerID = `#${$(me).attr('id')}`
            $(datepickerID).datepicker({
                // showOtherMonths: true,
                // selectOtherMonths: true
                dateFormat: "yy-mm-dd",
                monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                nextText: "다음달",
                prevText: "이전달",

                beforeShowDay: function (date) {
                    const days = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                    let el;
                    if (days == unavailableDay) {
                        return [false, 'unavailable']
                    } else {
                        return [true];
                    }
                }
            });
        }
    };
    window.jQueryDatepickerUI = jQueryDatepickerUI;
})();

// Side Navigation
(function () {
    "use strict";
    /**
     * @description     Sidenavigation toggle
     * @modify          2022.04.07
     */
    const sideNavigation = {
        /** 플러그인명 */
        bindjQuery: 'sideNavigation',
        /** 기본 옵션값 선언부 */
        selectors: {
            navItem: document.querySelectorAll('.side-nav > ul > .side-nav__item')
        },

        initialize() {
            const navItem = this.selectors.navItem;
            this._click();

            navItem.forEach(el => {
                const child = el.childNodes;
                const childClass = 'side-nav__child';
                const hasChildClass = 'side-nav--hassub';


                for (const key in child) {
                    if (Object.hasOwnProperty.call(child, key)) {
                        const element = child[key];
                        if (element.classList == childClass) {
                            element.parentNode.classList.add(hasChildClass)
                        }
                    }
                }
            });
        },
        _click() {
            const navItem = this.selectors.navItem;
            const activeClass = 'side-nav__item--active';

            navItem.forEach(el => {
                el.addEventListener('click', function (e) {
                    //e.preventDefault();
                    if (el.classList.contains(activeClass)) {
                        el.classList.remove(activeClass);
                    } else {
                        el.classList.add(activeClass);
                    }
                });
            });
        }
    };
    window.sideNavigation = sideNavigation;
})();



// Swiper Slider 
(function () {
    "use strict";
    /**
     * @description     swiperSlides
     * @modify          2022.04.07
     */
    const swiperSlides = {
        /** 플러그인명 */
        bindjQuery: 'swiperSlides',
        /** 기본 옵션값 선언부 */
        selectors: {
            swiperEl: document.querySelectorAll('.swiper'),
            swiperStopEl : document.querySelectorAll('.swiper-autoplay-control > button') , 
        },
        data: {
            swiperOption: {
                loop: true, 
                pauseOnMouseEnter: true,
                disableOnInteraction: false,                 
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                //웹접근성 문구 추가 a11y 
                a11y: {
                    prevSlideMessage: '이전슬라이드',
                    nextSlideMessage: '다음슬라이드',
                    paginationBulletMessage : '{{index}} 번째 슬라이드로 이동합니다. ', 
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                },
                //웹접근성 자동재생일 경우 정지버튼 
            },
        },

        initialize() {
            const el = this.selectors.swiperEl;

            this._autoplayStop(); 

            el.forEach(slide => {
                //특정슬라이드 옵션 적용 
                if(slide == document.querySelector('.mySwiper2')) { 
                    slide = new Swiper(slide, {
                        centeredSlides: true,
                        autoplay: {
                            delay: 2500,
                        },
                        // on: {
                        //     beforeInit() {
                        //     }, 
                        //     init() {
                        //         console.log('init');
                        //     }
                        // }, 
                        ...this.data.swiperOption
                    })
                }else {
                    //기본옵션적용
                    slide = new Swiper(slide, {
                        centeredSlides: true,
                        autoplay: {
                            delay: 1500,
                        },
                        ...this.data.swiperOption
                    })
                }
            });
        },

        _autoplayStop() {
            const stopBtn = this.selectors.swiperStopEl; 
            const el = this.selectors.swiperEl;

            stopBtn.forEach(btn => {
                btn.addEventListener('click', e => {
                    
                    let swiperClass = `.${btn.getAttribute('data-swiperCotrol')}`; 
                    //document.querySelector(`.${btn.getAttribute('data-swiperCotrol')}`)
                    console.log(document.querySelector(`.${btn.getAttribute('data-swiperCotrol')}`));
                    
                    if(btn.getAttribute('aria-pressed') == 'false'){ 
                        
                    }
                })
            })
        }
    };
    window.swiperSlides = swiperSlides;
})();



//MODAL 
let btns_modal = document.querySelectorAll('.open-modal');
btns_modal.forEach(function (target) {

    target.addEventListener('click', (e) => {
        let btnOpenModal = e.target;

        let modalID = btnOpenModal.getAttribute('aria-controls');
        let modalIDChar = document.getElementById(modalID);
        let modalClose = modalIDChar.getElementsByClassName('modal-close')[0];
        let tabAble = modalIDChar.querySelectorAll('button:not([tabindex="-1"], input:not([tabindex="-1"], textarea:not([tabindex="-1"]');
        let tabAbleFirst = tabAble && tabAble[0];
        let tabAbleLast = tabAble && tabAble[tabAble.length - 1];
        let tabDisable;
        let modalWidth = 0;
        let modalHeight = 0;
        let modalInner = modalIDChar.querySelector('.modal-layer-inner');


        //IOS 스크롤현상 수정 
        // var iosScrollFixPosition = window.pageYOffset;
        // console.log(iosScrollFixPosition);
        // document.body.offsetTop(iosScrollFixPosition); 


        //OPEN
        modalIDChar.setAttribute('aria-hidden', 'false');
        modalIDChar.classList.add('on');
        modalWidth = modalInner.getBoundingClientRect().width;
        modalHeight = modalInner.getBoundingClientRect().height;
        modalSizeSet(modalInner, modalWidth, modalHeight);

        if (tabAble) {
            tabAbleFirst.focus();

            tabAble.forEach((idx) => {
                idx.addEventListener('keydown', (event) => {
                    if (event.shiftKey && (event.keyCode || event.which) == 9) {
                        event.preventDefault();
                        tabAbleLast.focus();
                    }

                    //ESCAPE 닫기
                    if ((event.keyCode || event.which) == 27) {
                        event.preventDefault();
                        console.log('esc');
                        closeModal(modalIDChar, btnOpenModal);
                    }

                    //마지막요소에서 - 첫번째 요소로 포커스 이동 
                    if (idx == tabAbleLast) {
                        event.preventDefault();
                        tabAbleFirst.focus();
                    }
                })
            });

            //CLOSE ( SPACE & ENTER)
            modalClose.addEventListener('keydown', (event) => {
                event.preventDefault();
                if ((event.keyCode || event.which) === 13 || (event.keyCode || event.which) == 32) {
                    closeModal(modalIDChar, btnOpenModal);
                }
            });
            //닫기버튼 클릭
            modalClose.addEventListener('click', (event) => {
                event.preventDefault();
                closeModal(modalIDChar, btnOpenModal);
            });
        }

        //모달 외부 배경(dimm) 클릭시 닫기
        modalIDChar.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal(modalIDChar, btnOpenModal);
            }
        })
    });

    //window.addEventListener('resize', modalResize);
    function closeModal(modalID, focusOrigin) {
        modalID.setAttribute('tab-index', -1);
        modalID.setAttribute('aria-hidden', 'true');
        modalID.classList.remove('on');
        focusOrigin.focus();
    }

    function modalSizeSet(modal, w, h) {
        let w1 = Math.ceil(w);
        let h1 = Math.ceil(h);

        if (Math.ceil(w) % 2) {
            if (Math.abs(w1) > 0) {
                modal.style.width = (w1 + 1) + 'px';
            } else {
                modal.style.width = w1 + 'px';
            }
        } else {
            modal.style.width = w1 + 'px';
        }

        if (Math.ceil(h) % 2) {
            if (Math.abs(h1) > 0) {
                modal.style.height = (h1 + 1) + 'px';
            } else {
                modal.style.height = h1 + 'px';
            }
        } else {
            modal.style.height = h1 + 'px';
        }
    }
});