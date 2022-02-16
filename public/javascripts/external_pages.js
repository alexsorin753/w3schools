window.onload = function() {
   let title = document.head.getElementsByTagName('TITLE')[0].textContent;
   if(title === 'Side Navigation') side_navigation();
   
};

// use it if you make changes to the DOM on load
document.addEventListener('DOMContentLoaded', function() {
   let title = document.head.getElementsByTagName('TITLE')[0].textContent;
   if(title === 'Fullscreen Navigation') fullscreen_navigation();
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

function fullscreen_navigation() {
   const buttons = document.querySelectorAll('.fullscreen_nav > div button');
   const slide_menu = document.querySelector('.fullscreen_nav_slide');
   const swithBTN = document.querySelector('.fullscreen_nav > button');

   let left_right = true;

   function reset_anim(bool, text, top, left, width, height) {
      left_right = bool;
      swithBTN.textContent = text;
      slide_menu.animate([
         {top: top},
         {left: left},
         {width: width},
         {height: height}
      ], {duration: 0, fill: 'forwards'});
      setTimeout(() => {
         slide_menu.setAttribute('style', `top: ${top}; left: ${left}; width: ${width}; height: ${height};`);
      }, 0);
   }

   swithBTN.addEventListener('click', function() {
      if(left_right) reset_anim(false, 'Slide width-height', 0, 0, 0, 0);
      else reset_anim(true, 'Slide left-right', 0, '-100vw', '100%', '100%');
   });


   let trackBTN;   
   slide_menu.setAttribute('style', 'top: 0; left: -100vw; width: 100%; height: 100%;');

   function anim_open(time_h, time_w) {
      slide_menu.animate({width: '100%'}, {duration: time_w, fill: 'forwards'});      
      slide_menu.animate({height: '100%'}, {duration: time_h, fill: 'forwards'});
   }

   for(let e = 0; e < buttons.length; e++) {
      buttons[e].addEventListener('click', function() {
         trackBTN = e;

         if(left_right) {
            if(e===0) slide_menu.animate({left: 0}, {duration: 500, fill: 'forwards'});
            if(e===1) {
               slide_menu.animate({top: '-100vh'}, {duration: 0, fill: 'forwards'});
               slide_menu.animate({left: 0}, {duration: 0, fill: 'forwards'});

               slide_menu.animate({top: 0}, {duration: 500, fill: 'forwards'});
            };
            if(e===2) slide_menu.animate({left: 0}, {duration: 0, fill: "forwards"});            
         } else {
            if(e===0) anim_open(0, 500);
            if(e===1) anim_open(500, 0);
            if(e===2) anim_open(0, 0); // clicking this brakes if change slide. why?
         }
      });
   };

   slide_menu.children[0].addEventListener('click', function() {
      if(left_right) {
         if(trackBTN===0) slide_menu.animate({left: '-100vw'}, {duration: 500, fill: 'forwards'});
         if(trackBTN===1) {
            slide_menu.animate({top: '-100vh'}, {duration: 500, fill: 'forwards'})
            setTimeout(() => {
               slide_menu.animate({top: 0}, {duration: 0, fill: 'forwards'});
               slide_menu.animate({left: '-100vw'}, {duration: 0, fill: 'forwards'});
            }, 500);
         };
         if(trackBTN===2) slide_menu.animate({left: '-100vw'}, {duration: 0, fill: "forwards"});         
      } else {
         if(trackBTN===0) {
            slide_menu.animate({width: 0}, {duration: 500, fill: 'forwards'});
            setTimeout(() => {
               slide_menu.animate({height: 0}, {duration: 0, fill: 'forwards'});
            }, 500)
         }
         if(trackBTN===1) {
            slide_menu.animate({height: 0}, {duration: 500, fill: 'forwards'});
            setTimeout(() => {
               slide_menu.animate({width: 0}, {duration: 0, fill: 'forwards'});
            }, 500)
         };
         if(trackBTN===2) {
            slide_menu.animate([
               {width: 0},
               {height: 0}
            ], {duration: 0, fill: 'forwards'});
         }
      }
   });


   // using left-top distance
   // let trackBTN;   
   // slide_menu.setAttribute('style', 'top: 0; left: -100vw; width: 100%; height: 100%;')
   // for(let e = 0; e < buttons.length; e++) {
   //    buttons[e].addEventListener('click', function() {
   //       trackBTN = e;
   //       if(e===0) slide_menu.animate({left: 0}, {duration: 500, fill: 'forwards'});
   //       if(e===1) {
   //          slide_menu.animate({top: '-100vh'}, {duration: 0, fill: 'forwards'});
   //          slide_menu.animate({left: 0}, {duration: 0, fill: 'forwards'});

   //          slide_menu.animate({top: 0}, {duration: 500, fill: 'forwards'});
   //       };
   //       if(e===2) slide_menu.animate({left: 0}, {duration: 0, fill: "forwards"});
   //    });
   // };

   // slide_menu.children[0].addEventListener('click', function() {
   //    if(trackBTN===0) slide_menu.animate({left: '-100vw'}, {duration: 500, fill: 'forwards'});
   //    if(trackBTN===1) {
   //       slide_menu.animate({top: '-100vh'}, {duration: 500, fill: 'forwards'})
   //       setTimeout(() => {
   //          slide_menu.animate({top: 0}, {duration: 0, fill: 'forwards'});
   //          slide_menu.animate({left: '-100vw'}, {duration: 0, fill: 'forwards'});
   //       }, 500);
   //    };
   //    if(trackBTN===2) slide_menu.animate({left: '-100vw'}, {duration: 0, fill: "forwards"});
   // });

   // using width-height
   // let trackBTN;
   // slide_menu.setAttribute('style', 'top: 0; left: 0; width: 0; height:0;');

   // function anim_open(time_h, time_w) {
   //    slide_menu.animate({width: '100%'}, {duration: time_w, fill: 'forwards'});      
   //    slide_menu.animate({height: '100%'}, {duration: time_h, fill: 'forwards'});
   // }

   // for(let e = 0; e < buttons.length; e++) {
   //    buttons[e].addEventListener('click', function() {
   //       trackBTN = e;
   //       if(e===0) anim_open(0, 500);
   //       if(e===1) anim_open(500, 0);
   //       if(e===2) anim_open(0, 0); 
   //    });
   // };

   // slide_menu.children[0].addEventListener('click', function() {
   //    if(trackBTN===0) {
   //       slide_menu.animate({width: 0}, {duration: 500, fill: 'forwards'});
   //       setTimeout(() => {
   //          slide_menu.animate({height: 0}, {duration: 0, fill: 'forwards'});
   //       }, 500)
   //    }
   //    if(trackBTN===1) {
   //       slide_menu.animate({height: 0}, {duration: 500, fill: 'forwards'});
   //       setTimeout(() => {
   //          slide_menu.animate({width: 0}, {duration: 0, fill: 'forwards'});
   //       }, 500)
   //    };
   //    if(trackBTN===2) {
   //       slide_menu.animate({width: 0}, {duration: 0, fill: 'forwards'});
   //       slide_menu.animate({height: 0}, {duration: 0, fill: 'forwards'});
   //    }
   // });
};