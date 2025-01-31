import bootstrap from 'bootstrap';
import TypeIt from 'typeit';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'spotlight.js/dist/spotlight.bundle.js';
import './form-submission-handler.js';
import LazyLoad from 'vanilla-lazyload';

{// Dark Theme
  const switchInput       = document.querySelector('#switch');
  const currentTheme      = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  document.addEventListener("DOMContentLoaded", function() {

    if (prefersDarkScheme.matches == true){
      switchInput.checked = true;
    } else if (prefersDarkScheme.matches == false){
      switchInput.checked = false;
    }

    if (currentTheme == 'dark'){
      switchInput.checked = true;
    } else if (currentTheme == 'light'){ 
      switchInput.checked = false;
    }

    if (switchInput.checked == true) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else if (switchInput.checked == false) {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  });
  
  switchInput.addEventListener('change', function() {
    let theme;

    if (switchInput.checked == false) {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      theme =  'light';

    } else if (switchInput.checked == true) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      theme =  'dark';
    }

    localStorage.setItem('theme', theme);
  });
}

{// Spinner
  let spinner = document.querySelector('.by__rukrypto');
  let navbar  = document.querySelector('.ruHeader__menu__navbar');

  window.onload = function(){

    spinner.classList.add('animate__animated', 'animate__fadeOut');
    navbar.classList.add('animate__animated','animate__fadeInDown');
    setTimeout( function(){ spinner.hidden = true; }, 1000 );
  }
}

{// Lazyload
  var myLazyLoad = new LazyLoad();
  myLazyLoad.update();
}

{// Collapse Arrow
  let collapseButton = document.querySelector('.collapseButton');
  let textButton     = document.querySelector('.textButton');
  collapseButton.addEventListener('click', function(){
  	
  	collapseButton.classList.toggle('active');

  	if ( collapseButton.classList.contains('active') ){

  	    textButton.textContent = 'Ver Menos';

  	} else { textButton.textContent = 'Ver Más'; }
  });
}

{// Slider Carousel
  let tinySlider = tns({
    container: '.tinySlider',
    items: 1,
    controls: true,
    speed: 1500,
    autoplayTimeout: 6000,
    autoplay: true,
    navPosition: 'bottom',
    autoplayButtonOutput: false,
    loop: false,
    rewind: true,
    mouseDrag: true,
    controlsContainer: '.ruPortfolio__carousel__controls',
    responsive: {
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
}

{// Type Writer
  new TypeIt('#ruMessage', {
    strings: ['JavaScript.', 'WordPress.', 'Frontend.'],
    nextStringDelay: ['4000', '2000'],
    speed: 85,
    deleteSpeed: 50,
    loop: true,
    loopDelay: 4000,
    breakLines: false,
    lifelike: true,
    cursorChar: '|',
    cursorSpeed: 800,
  }).go();
}

{// Sticky Header
  function stickyHeader(){
    let menu__navbar = document.querySelector('.ruHeader__menu__navbar');
    let DOM__scroll  = document.documentElement.scrollTop;

    if ( DOM__scroll > 1){
      menu__navbar.classList.add('active');
    }
    else {
      menu__navbar.classList.remove('active');
    }

  } window.addEventListener('scroll', stickyHeader );
}

{// Triggers with bootstrap scrollspy
  window.addEventListener('activate.bs.scrollspy', function (e) {
    let activeSection = document.querySelector('.nav-link.active');
    let reCaptcha     = document.querySelector('.grecaptcha-badge');
  
    if ( activeSection.hash === '#payments' || activeSection.hash === '#contact' ){
      reCaptcha.style.visibility = 'visible';
    }

    else {
      reCaptcha.style.visibility = 'hidden';
    }
  });
}

{// Triggers with vanilla js
  const home      = document.querySelectorAll('#home');
  const perfil    = document.querySelectorAll('#perfil');
  const portfolio = document.querySelectorAll('#portfolio');
  const payments  = document.querySelectorAll('#payments');
  const contact   = document.querySelectorAll('#contact');
  const footer    = document.querySelectorAll('#footer');
  const scrollElements = [ home[0], perfil[0], portfolio[0], payments[0], contact[0], footer[0] ];
  
  let elements = document.querySelectorAll('.ruHeader__menu__navbar, .ruHome__content, .ruMain__title, .ruProfile__resume__image, .ruProfile__resume__description, .ruProfile__information__title, .ruProfile__information__item, .ruProfile__skills__title, .ruProfile__skills__item, .ruPortfolio__carousel, .ruPortfolio__item, .ruPayments__item, .ruContact__form__item__input, .ruFooter__copyright, .ruFooter__rrss, .ruFooter__madeIn');



  elements.forEach( function(items){

    items.style.opacity = '0';
  });

  function AnimateCSS(itemSelector, animateClass, delay = '.1s'){
    // console.log(itemSelector)
    document.querySelector(`${itemSelector}`).style.animationDelay = delay;
    document.querySelector(`${itemSelector}`).classList.add('animate__animated',`${animateClass}`);
  }

  function HiddenAnimateCSS(itemSelector, animateClass){
    // console.log(itemSelector)
    document.querySelector(`${itemSelector}`).classList.remove('animate__animated',`${animateClass}`);
  }

  const elementInView = (elem, percentageScroll = 100) => {
    const elementTop = elem.getBoundingClientRect().top;
   
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  }

  const displayScrollElement = (element) => {

    if ( element.id === 'home' ){
      
      AnimateCSS('.ruHome__content', 'animate__fadeIn', '1000ms');
    }

    if ( element.id === 'perfil' ){

      AnimateCSS('.ruProfile .ruMain__title','animate__fadeInDown');

      AnimateCSS('.ruProfile__resume__image', 'animate__fadeInUp', '500ms');
      AnimateCSS('.ruProfile__resume__description', 'animate__fadeInUp', '600ms');

      AnimateCSS('.ruProfile__information__title', 'animate__fadeInDown', '1000ms');
      AnimateCSS('.ruProfile__skills__title', 'animate__fadeInDown', '1000ms');


      let x = 1300;
      let y = 1000;

      let n_items = document.querySelectorAll('.ruProfile__information__item').length +1;
      for (let i = 2; i <= n_items; i++) {
        AnimateCSS(`.ruProfile__information__item:nth-child(${i})`, 'animate__fadeInLeft',`${x}ms`);
        x += 400;
      }

      let n_elements = document.querySelectorAll('.ruProfile__skills__item').length +1;
      for (let i = 2; i <= n_elements; i++) {
        AnimateCSS(`.ruProfile__skills__item:nth-child(${i})`, 'animate__fadeInRight',`${y}ms`);
        y += 200;
      }
    }

    if ( element.id === 'portfolio' ){

      AnimateCSS('.ruPortfolio .ruMain__title','animate__fadeInDown');
      AnimateCSS('.ruPortfolio__carousel', 'animate__fadeIn', '500ms');

      let milliSeconds = 500;
      let n_items = document.querySelectorAll('.ruPortfolio__item').length;
      for (let i = 1; i <= n_items; i++) {
        AnimateCSS(`.ruPortfolio__item:nth-child(${i})`, 'animate__fadeInRight', `${milliSeconds}ms`);
        milliSeconds += 200;
      }
    }

    if ( element.id === 'payments' ){

      AnimateCSS('.ruPayments .ruMain__title','animate__fadeInDown');
      
      let milliSeconds = 0;
      let n_items = document.querySelectorAll('.ruPayments__item').length +2;
      for (let i = 3; i <= n_items; i++) {
        AnimateCSS(`.ruPayments__item:nth-child(${i})`, 'animate__fadeInUp', `${milliSeconds}ms`);
        milliSeconds += 300;
      }
    }

    if ( element.id === 'contact' ){

      AnimateCSS('.ruContact .ruMain__title','animate__fadeInDown');

      AnimateCSS('fieldset.ruContact__form__item:nth-child(2) input.ruContact__form__item__input:nth-child(1)', 'animate__fadeInLeft', '500ms');
      AnimateCSS('fieldset.ruContact__form__item:nth-child(2) input.ruContact__form__item__input:nth-child(2)', 'animate__fadeInRight', '500ms');

      AnimateCSS('fieldset.ruContact__form__item:nth-child(3) input.ruContact__form__item__input:nth-child(1)', 'animate__fadeInLeft', '800ms');
      AnimateCSS('fieldset.ruContact__form__item:nth-child(3) input.ruContact__form__item__input:nth-child(2)', 'animate__fadeInRight', '800ms');

      AnimateCSS('.ruContact__form__item__input.-textArea', 'animate__fadeInUp', '1100ms');
      AnimateCSS('.ruContact__form__item__input.-submit', 'animate__fadeInUp', '1400ms');

      AnimateCSS('.ruFooter__copyright', 'animate__fadeIn', '2500ms');
      AnimateCSS('.ruFooter__rrss', 'animate__fadeIn', '2700ms');
      AnimateCSS('.ruFooter__madeIn', 'animate__fadeIn', '2800ms');
    }
  }

  const hideScrollElement = (element) => {

    if ( element.id === 'home' ){
      
      HiddenAnimateCSS('.ruHome__content', 'animate__fadeIn');
    }

    if ( element.id === 'perfil' ){

      HiddenAnimateCSS('.ruProfile .ruMain__title','animate__fadeInDown');
      HiddenAnimateCSS('.ruProfile__resume__image', 'animate__fadeInUp');
      HiddenAnimateCSS('.ruProfile__resume__description', 'animate__fadeInUp');

      HiddenAnimateCSS('.ruProfile__information__title', 'animate__fadeInDown');
      HiddenAnimateCSS('.ruProfile__skills__title', 'animate__fadeInDown');


      let n_items = document.querySelectorAll('.ruProfile__information__item').length +1;
      for (let i = 2; i <= n_items; i++) {
        HiddenAnimateCSS(`.ruProfile__information__item:nth-child(${i})`, 'animate__fadeInLeft');
      }

      let n_elements = document.querySelectorAll('.ruProfile__skills__item').length +1;
      for (let i = 2; i <= n_elements; i++) {
        HiddenAnimateCSS(`.ruProfile__skills__item:nth-child(${i})`, 'animate__fadeInRight');
      }
    }

    if ( element.id === 'portfolio' ){

      HiddenAnimateCSS('.ruPortfolio .ruMain__title','animate__fadeInDown');
      HiddenAnimateCSS('.ruPortfolio__carousel', 'animate__fadeIn');


      let n_items = document.querySelectorAll('.ruPortfolio__item').length;
      for (let i = 1; i <= n_items; i++) {
        HiddenAnimateCSS(`.ruPortfolio__item:nth-child(${i})`, 'animate__fadeInRight');
      }
    }

    if ( element.id === 'payments' ){

      HiddenAnimateCSS('.ruPayments .ruMain__title','animate__fadeInDown');
      
      let n_items = document.querySelectorAll('.ruPayments__item').length +2;
      for (let i = 3; i <= n_items; i++) {
        HiddenAnimateCSS(`.ruPayments__item:nth-child(${i})`, 'animate__fadeInUp');
      }
    }

    if ( element.id === 'contact' ){
      HiddenAnimateCSS('.ruContact .ruMain__title','animate__fadeInDown');

      HiddenAnimateCSS('fieldset.ruContact__form__item:nth-child(2) input.ruContact__form__item__input:nth-child(1)', 'animate__fadeInLeft');
      HiddenAnimateCSS('fieldset.ruContact__form__item:nth-child(2) input.ruContact__form__item__input:nth-child(2)', 'animate__fadeInRight');


      HiddenAnimateCSS('fieldset.ruContact__form__item:nth-child(3) input.ruContact__form__item__input:nth-child(1)', 'animate__fadeInLeft');
      HiddenAnimateCSS('fieldset.ruContact__form__item:nth-child(3) input.ruContact__form__item__input:nth-child(2)', 'animate__fadeInRight');


      HiddenAnimateCSS('.ruContact__form__item__input.-textArea', 'animate__fadeInUp');
      HiddenAnimateCSS('.ruContact__form__item__input.-submit', 'animate__fadeInUp');



      HiddenAnimateCSS('.ruFooter__copyright', 'animate__fadeIn');
      HiddenAnimateCSS('.ruFooter__rrss', 'animate__fadeIn');
      HiddenAnimateCSS('.ruFooter__madeIn', 'animate__fadeIn');
    }
  }
   
  const handleScrollAnimation = () => {

    scrollElements.forEach((elem) => {

      if (elementInView(elem, 70)) {
        displayScrollElement(elem);
      } else {
        // hideScrollElement(elem);
      }
    });
  }

  window.addEventListener('scroll', () => { handleScrollAnimation(); });
  window.addEventListener('DOMContentLoaded', () => { handleScrollAnimation(); });
}

{// Smooth Scroll

  // ZenScroll.js
  const zenscroll = require('zenscroll/zenscroll-min.js')
  zenscroll.setup(null, 60)


  // MoveTo.js
  // const MoveTo = require('moveto/dist/moveTo.min.js')
  // const moveTo = new MoveTo({ duration: 1000 });
  // const triggers = document.querySelectorAll('.nav-link');
  // for (var i = 0; i < triggers.length; i++) {
  //   moveTo.registerTrigger(triggers[i]);
  // }


  // Jump.js
  // const navLinks = document.querySelectorAll('.nav-link');
  // navLinks.forEach( function(navLink){
  //   navLink.addEventListener('click', function(e) {
  //     let href = navLink.attributes.href.value;
  //     e.preventDefault();
  //     jump(href);
  //   });
  // });
}


/* TO DO
formulario con captcha - listo con honeypot
+modal +icons form - listo
lazy loads - listo
spinner to button contact,    listo
analytics, listo
meta-tags + miniaturas listo
links referidos + links portfolio listo
CV pdf, listo  listo
dark-mode listo
button download cv listo
refactorizar css, colores, variables list colores
animaciones con trigger  - listo
fonts size px to rem-em   listo
responsive, maxwidth containers listo <------
trigger animaciones con offset listo
burger menu listo
llenas links rrss listo

pages-test performance
multi-lenguaje, despues
cambiar fondo light de portfolio
cambiar npm por react
cambiar orden de animacionec formulario descendente
english version
*/
