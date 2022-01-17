
window.onload = function() {
    to_top(); 

    const title = document.head.getElementsByTagName('TITLE')[0].textContent;

    if(title === "Menu") {
        icon_bar(); menu_icon(); tabs(); vertical_tabs();
    }
};
//https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', function() {
    const title = document.head.getElementsByTagName('TITLE')[0].textContent;
    current_page(title); mobile_menu();

    if(title === "Menu") {
        accordion();
    }
});

//#region layout >
function to_top() {
    const button = document.querySelector('.to_top_button');

    if(window.scrollY > 150) button.style.right = '2rem';
    else button.style.right = '-3rem';

    window.addEventListener('scroll', function() {
        if(this.scrollY > 150) {
            button.animate([{
                right: '2rem'
            }], {duration: 1000, fill: 'forwards'});
        } else {
            button.animate([{
                right: '-3rem'
            }], {duration: 1000, fill: 'forwards'});
        }
    });

    button.addEventListener('click', function() {
        window.scroll(0, 0);
    });
};

// highlight the header and footer button according to the curent page
function current_page(title) {
    const header_button = document.querySelectorAll('.header_menu a');
    const footer_button = document.querySelectorAll('.footer_menu a');

    if(window.innerWidth > 750) {
        for(let e = 0; e < header_button.length; e++) {
            if(header_button[e].textContent == title) {
                header_button[e].classList.add('header_menu_active');
                footer_button[e].classList.add('footer_menu_active');
            }
        }
    } else {
        for(let e = 0; e < header_button.length; e++) {
            if(header_button[e].textContent == title) {
                header_button[e].classList.add('header_menu_active_mob');
            }
        }
    }
};

function mobile_menu() {
    const menu = document.getElementsByClassName('header_menu')[0];
    let height = parseInt(window.getComputedStyle(menu).height) - 8;

    if(window.innerWidth < 750) menu.style.top = `-${height-70}px`;

    let touch_pos;
    menu.addEventListener('touchmove', function(event) {       
        event.preventDefault();
        touch_pos = event.touches[0].clientY;

        if(touch_pos < height && touch_pos > 70) menu.style.top = `-${height - touch_pos}px`;
    });

    let start_pos;
    menu.addEventListener('touchstart', function(event) {
        start_pos = event.touches[0].clientY;
    });

    menu.addEventListener('touchend', function() {      
        touch_pos = 80;
        if(touch_pos > 400) menu.style.top = '70px';
        else if(touch_pos < 5) menu.style.top = `-${height-70}px`;
        else {
            if(start_pos < touch_pos) {
                menu.animate([
                    {top: '70px'}
                ], {duration: 700 - touch_pos});
                setTimeout(() => {menu.style.top = '70px'}, 650 - touch_pos);
            } 
            else {
                menu.animate([
                    {top: `-${height-70}px`}
                ], {duration: 700 - touch_pos});
                setTimeout(() => {menu.style.top = `-${height-70}px`}, 650 - touch_pos);
            }             
        }
    });
};
//#endregion layout


//#region menu
function icon_bar() {
    // // using 2 loops 
    // const vertical = document.querySelectorAll('.icon_bar > div > div:first-child i');
    // const horizontal = document.querySelectorAll('.icon_bar > div > div:last-child i');

    // function clicked(elem, num) {

    //     elem[num].addEventListener('click', function() {
    //         elem.forEach(el => el.classList.remove('icon_bar_active'));
    //         this.classList.add('icon_bar_active');
    //     }); 
    // }
    // for(let e = 0; e < vertical.length; e++) {
    //     clicked(vertical, e); clicked(horizontal, e);
    // }

    // without loops
    let vertical = document.querySelector('.icon_bar > div > div:first-child');
    let horizontal = document.querySelector('.icon_bar > div > div:last-child');

    function clicked(ver_hor) {
        ver_hor.addEventListener('click', function(ez) {
            let active = this.getElementsByClassName('icon_bar_active')[0];

            if(ez.target.tagName === 'I') {
                if(active.classList.contains('icon_bar_active')) {
                    active.classList.remove('icon_bar_active');
                };       
                ez.target.classList.add('icon_bar_active');         
            };
        });
    }; clicked(vertical); clicked(horizontal);
};

function menu_icon() {
    const ico_btn = document.querySelector('.menu_icon_2');

    ico_btn.addEventListener('click', function() {
        ico_btn.classList.toggle('menu_icon_2_anim');
    });
};

function accordion() {
    const section = document.querySelectorAll('.accordion > div > div > span');
    const text = document.querySelectorAll('.accordion > div > div p');

    for(let e = 0; e < section.length; e++) {
        text[e].style.marginTop = -text[e].clientHeight + 'px';

        section[e].addEventListener('click', function() {
			text[e].style.transition = '.5s';
			text[e].classList.toggle('accordion_toggle');

			if(text[e].classList.contains('accordion_toggle')) {
				this.children[0].textContent = '\u2212';
                this.style.backgroundColor = '#cccccc';
			} else {
                this.children[0].textContent = '\u002B';
                this.style.backgroundColor = '';
            } 
        });
    };
};

function tabs() {
    const buttons = document.querySelectorAll('.tabs > div > nav button');
    const city = document.querySelector('.tabs > div > div p:nth-child(1)');
    const city_info = document.querySelector('.tabs > div > div p:nth-child(2)');

    const obj = {
        0 : ['London', 'London is the capital city of England'],
        1 : ['Paris', 'Paris is the capital of France'],
        2 : ['Tokyo', 'Tokyo is the capital of Japan']
    };
    
    for(let e = 0; e < buttons.length; e++) {
        buttons[e].addEventListener('click', function() {
            const active_btn = document.getElementsByClassName('tabs_active')[0];
            if(active_btn.classList.length > 0) active_btn.classList.remove('tabs_active');

            this.classList.add('tabs_active')
            city.textContent = obj[e][0];
            city_info.textContent = obj[e][1];

            city.parentNode.animate([
                {opacity: 0},
                {opacity: 1}
            ], {duration: 500, fill: 'forwards'});
        });
    };
};

function vertical_tabs() {
    const buttons = document.querySelectorAll('.vertical_tabs > div > div button');
    const txt = document.querySelector('.vertical_tabs > div > div:nth-child(2)');

    const obj = {
        0 : ['London', 'London is the capital city of England'],
        1 : ['Paris', 'Paris is the capital of France'],
        2 : ['Tokyo', 'Tokyo is the capital of Japan']
    }

    for(let e = 0; e < buttons.length; e++) {
        buttons[e].addEventListener('click', function() {
            const el_class = document.getElementsByClassName('vertical_tabs_active')[0];
            if(el_class) el_class.classList.remove('vertical_tabs_active');

            txt.children[0].textContent = obj[e][0];
            txt.children[1].textContent = obj[e][1];
            this.classList.add('vertical_tabs_active');

            txt.animate([
                {opacity: 0},
                {opacity: 1}
            ], {duration: 300});
        });
    };
};
//#endregion menu