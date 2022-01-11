// window.addEventListener('load', function() {
//     console.log('script working')    
// })

window.onload = function() {
    to_top();
}

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