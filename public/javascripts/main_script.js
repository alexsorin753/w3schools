
window.onload = function() {
    to_top(); 
}
//https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', function() {
    current_page(); mobile_menu();
})


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

function current_page() {
    const title = document.head.getElementsByTagName('TITLE')[0].textContent;
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

    menu.style.top = `-${height}px`;

    let touch_pos;
    menu.addEventListener('touchmove', function(event) {       
        event.preventDefault();
        touch_pos = event.touches[0].clientY;

        if(touch_pos < height && touch_pos > 0) menu.style.top = `-${height - touch_pos}px`;
    });

    let start_pos;
    menu.addEventListener('touchstart', function(event) {
        start_pos = event.touches[0].clientY;
    });

    menu.addEventListener('touchend', function() {      
        touch_pos = 10;
        if(touch_pos > 400) menu.style.top = 0;
        else if(touch_pos < 5) menu.style.top = `-${height}px`;
        else {
            if(start_pos < touch_pos) {
                menu.animate([
                    {top: 0}
                ], {duration: 700 - touch_pos});
                setTimeout(() => {menu.style.top = 0}, 650 - touch_pos);
            } 
            else {
                menu.animate([
                    {top: `-${height}px`}
                ], {duration: 700 - touch_pos});
                setTimeout(() => {menu.style.top = `-${height}px`}, 650 - touch_pos);
            }             
        }
    });
}