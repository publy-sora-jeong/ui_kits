documentReady(function () {
    browserCheck();

    setViewHeight.initialize();
    fileAttach.initialize(); //파일첨부커스텀 
    singleNavigation.initialize(); //상단 네비게이션 (1메뉴)
    fulldownNavigation.initialize(); //상단 네비게이션 (전체메뉴)
    showTooltip.initialize(); //툴팁 
    tabUI.initialize(); //탭메뉴 
    jQueryDatepickerUI.initialize(); //jQuery Datepicker 
    
    //Checkbox event
    //Input Validation
    //Modal
    //SideMenu
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
            fulldownBg: document.querySelector('.fulldown-bg')
        },
        initialize() {
            this._focusout();
            this._focus();
            //this._mouseEnter();
        },


        _focus() {
            let items = this.selectors.depth1;
            const bg = this.selectors.fulldownBg;
            let temp = [];


            //GNB BG Height Set
            for (let i = 0; i < $('.gnb-fulldown .node2-menu').length; i++) {
                temp.push($('.gnb-fulldown .node2-menu').eq(i).height())
            }
            let gnbHeight = `${Math.max(...temp)}px`;

            items.forEach(el => {

                el.addEventListener('focusin', function (e) {
                    for (let i = 0; i < items.length; i++) {
                        console.log(el);
                    }

                })
            });
        },

        _focusout() {
            let setTime = null;
            const bg = this.selectors.fulldownBg;

            $('.node1-item').on('focusout blur mouseleave', function (e) {
                e.preventDefault();
                $('.node1-item').removeClass('is-active is-entered')
                bg.style.height = 0;
            })
        },
        _mouseLeave() {},
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
            tooltipCall: document.querySelectorAll('[aria-describedby]'),
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
     * @modify          2022.04.06
     */
    const tabUI = {
        /** 플러그인명 */
        bindjQuery: 'tabUI',
        /** 기본 옵션값 선언부 */
        selectors: {
            tabs : document.querySelectorAll('[role="tab"]'),
            tabLists : document.querySelectorAll('[role="tablist"]'),
        },
        initialize() {
            console.log('init');
            this._click();   
            this._keydown();   
        },
        _click(){
            const tabs = this.selectors.tabs; 

            tabs.forEach( tab => { 
                if(tab.getAttribute('aria-selected') == true) {

                }else{

                }
            })
        },
        _keydown(){

        },
    };
    window.tabUI = tabUI;
})();


// var waiAriaTab = function(){
// 	const tabs = document.querySelectorAll('[role="tab"]');
// 	const tabLists = document.querySelectorAll('[role="tablist"]');

// 	tabs.forEach(tab => {
// 		if(tab.getAttribute("aria-selected") == "true") {
// 			tab.tabIndex = 0;
// 		}else{
// 			tab.tabIndex = -1;
// 		}
// 		tab.addEventListener("click", e => {
// 			const parent = tab.parentNode.tagName === "LI" ? tab.parentNode.parentNode : tab.parentNode;
// 			const panelWrap = document.querySelector(`#${tab.getAttribute("aria-controls")}`).parentNode;

// 			parent.querySelectorAll('[aria-selected="true"]').forEach(t => {
// 				t.setAttribute("aria-selected", false)
// 				t.tabIndex = -1;
// 			});

// 			tab.setAttribute("aria-selected", true);
// 			tab.tabIndex = 0;

// 			panelWrap.querySelectorAll(':scope > [role="tabpanel"]').forEach(p => p.style.display = "none");

// 			panelWrap.querySelector(`#${tab.getAttribute("aria-controls")}`).style.display = "revert"

// 			e.preventDefault();
// 		});
// 	});



// 	tabLists.forEach(tabList => {
// 		tabList.addEventListener("keydown", e => {
// 			const parent = tabList.parentNode.tagName === "LI" ? tabList.parentNode.parentNode : tabList.parentNode;
// 			const innerTabs = parent.querySelectorAll('[role="tab"]');
// 			let tabFocus = 0;
// 			for(let i=0; i < innerTabs.length; i++){
// 				if(innerTabs[i].getAttribute("aria-selected") == "true") {
// 					tabFocus = i;
// 				}
// 			}
// 			if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 36 || e.keyCode === 35) {
// 				innerTabs[tabFocus].tabIndex = -1;
// 				if (e.keyCode === 39) { // right
// 					tabFocus++;
// 					if (tabFocus >= innerTabs.length) {
// 						tabFocus = 0;
// 					}
// 				} else if (e.keyCode === 37) { // left
// 					tabFocus--;
// 					if (tabFocus < 0) {
// 						tabFocus = innerTabs.length - 1;
// 					}
// 				} else if (e.keyCode === 36) { // home
// 					tabFocus = 0;
// 				} else if (e.keyCode === 35) { // end
// 					tabFocus = innerTabs.length - 1;
// 				}
// 				innerTabs[tabFocus].tabIndex = 0;
// 				innerTabs[tabFocus].click();
// 				innerTabs[tabFocus].focus();
// 				e.preventDefault();
// 			}
// 		});
// 	});
// };



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
        data : {
            //unavailableDay : ["2022-4-7"]
            unavailableDay : [], 
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
                monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ], 
                nextText: "다음달",
                prevText: "이전달",

                beforeShowDay: function (date) {
                    const days = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                    let el;
                    if (days == unavailableDay ) {
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

