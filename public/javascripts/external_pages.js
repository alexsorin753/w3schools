window.onload = function() {
   side_navigation();
};

// use it if you make changes to the DOM on load
document.addEventListener('DOMContentLoaded', function() {

});

function side_navigation() {
   const buttons = document.querySelectorAll('.side_navigation > nav > div:nth-child(2) button');
   const overlay = document.querySelector('.side_nav_overlay');
   const close = overlay.children[0];
   const body = document.querySelector('.side_navigation');

   function overlay_anim(width, time) {
      overlay.animate([
         {width: width}
      ], {duration: time, fill: 'forwards', easing: "ease"});
   };
   function body_anim(padding, time, opacity_st, opacity_en) {
      body.animate([
         {paddingLeft: padding}
      ], {duration: time, fill: 'forwards', easing: "ease"});

      if(opacity_st === 0) document.body.children[0].style.display = 'block';
      document.body.children[0].animate([
         {opacity: opacity_st},
         {opacity: opacity_en}
      ], {duration: time, fill: 'forwards', easing: "ease"});
   };
   
   let active;
   for(let e = 0; e < buttons.length; e++) {
      buttons[e].addEventListener('click', function() {
         active = e;
         if(e === 0) overlay_anim('25rem', 700);
         if(e === 1) overlay_anim('25rem', 0);
         if(e === 2) {
            overlay_anim('25rem', 700);
            body_anim('25rem', 700);
         }
         if(e === 3) {
            overlay_anim('25rem', 700);
            body_anim('25rem', 700, 0, 0.8);
         }
         if(e === 4) overlay_anim('100%', 700);
      });
   };

   close.addEventListener('click', function() {
      if(active === 0) overlay_anim(0, 700);
      if(active === 1) overlay_anim(0, 0);
      if(active === 2) {
         overlay_anim(0, 700);
         body_anim(0, 700);
      }
      if(active === 3) {
         overlay_anim(0, 700);
         body_anim(0, 700, 0.8, 0);
         setTimeout(() => document.body.children[0].style.display = 'none', 700);
      }
      if(active === 4) overlay_anim(0, 700);
   });
};