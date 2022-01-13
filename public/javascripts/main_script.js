
window.onload = function() {
    to_top(); 
}
//https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', function() {
    const title = document.head.getElementsByTagName('TITLE')[0].textContent   
    current_page(title); mobile_menu();

    if(title === "Menu") {
        icon_bar(); menu_icon()
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
}

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
}

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
}
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
}

function menu_icon() {
    const ico_btn = document.querySelector('.menu_icon_2');

    ico_btn.addEventListener('click', function() {
        ico_btn.classList.toggle('menu_icon_2_anim');
    })
}
//#endregion menu