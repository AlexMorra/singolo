// HEADER
let header_menu = document.querySelector('#header_menu');

header_menu.addEventListener('click', function (e) {
    header_menu.querySelectorAll('li').forEach(li => {
        li.classList.remove('menu_active');
    });

    if (e.target.tagName === 'LI' ) {
        e.target.classList.add('menu_active');

        let scroll_to = document.getElementById(e.target.textContent.toLowerCase());
        scroll_to.scrollIntoView({ behavior: 'smooth'})
        header_menu.style.left = -278 + 'px';
    }
});

// PORTFOLIO
let portfolio = document.querySelector('#portfolio');
let tags = document.querySelector('#tags');
let images_wrapper = document.querySelector('.images');

portfolio.addEventListener('click', function (e) {
    let portfolio_images = document.querySelectorAll('.images img');

    if (e.target.tagName === 'LI') {
        tags.querySelectorAll('li').forEach(li => {
            li.classList.remove('tag_active');
            li.style.borderColor = '#666d89';
        });
        e.target.classList.add('tag_active');
        e.target.style.borderColor = 'white';

        let arr_images = [];

        portfolio_images.forEach(el => {
            arr_images.push(el);
            el.remove();
        });
        arr_images.sort(el => 0.5 - Math.random());
        arr_images.forEach(el => images_wrapper.append(el));
    }
    if (e.target.tagName === 'IMG') {
        portfolio_images.forEach(el => {
            if (el.src !== e.target.src) {
                el.classList.remove('img-touch')
            }
        });
        e.target.classList.toggle('img-touch');
    }
});

// SLIDER

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slider = document.querySelector('#slider');
let slides = [];
let slider_images = [];
// [assets/img/1.png assets/img/2.png'

let slide_1 = document.createElement('div');
slide_1.classList.add('slide-single');
let phone1_screen = document.createElement('div');
phone1_screen.classList.add('screen-1');
phone1_screen.setAttribute('id', 'screen-1');
let img_1 = document.createElement('img');
img_1.src = 'assets/img/1.png';
let phone_screen_2 = document.createElement('div');
phone_screen_2.classList.add('screen-2');
phone_screen_2.setAttribute('id', 'screen-2');
slide_1.append(...[phone1_screen, phone_screen_2, img_1]);

let slide_2 = document.createElement('div');
slide_2.classList.add('slide-single');
let phone2_screen = document.createElement('div');
phone2_screen.classList.add('screen-3');
phone2_screen.setAttribute('id', 'screen-3');
let img_2 = document.createElement('img');
img_2.src = 'assets/img/2.png';
slide_2.append(...[phone2_screen, img_2]);

slides.push(slide_1);
slides.push(slide_2);

slider.append(slides[0]);

function left() {
    next.removeEventListener('click', left);
    setTimeout(() => next.addEventListener('click', left), 1100);

    let width = document.querySelector('body').offsetWidth;
    let swap = slides.shift();
    slides.push(swap);
    let current = document.querySelector('.slide-single');
    let next_img = slides[0];
    next_img.style.left = width + 'px';
    slider.append(next_img);
    setTimeout(() => {
        current.style.left = -width + 'px';
        next_img.style.left = 0;
    }, 1);

    setTimeout(function () {

        current.remove();
    }, 1000);
}

function right() {
    prev.removeEventListener('click', right);
    setTimeout(() => prev.addEventListener('click', right), 1100);

    let width = document.querySelector('body').offsetWidth;
    let swap = slides.shift();
    slides.push(swap);
    let current = document.querySelector('.slide-single');
    let next_img = slides[0];
    next_img.style.left = -width + 'px';
    slider.append(next_img);

    setTimeout(() => {
        current.style.left = width + 'px';
        next_img.style.left = 0;
    }, 1);

    setTimeout(function () {
        current.remove();
    }, 1000);1
}

slider.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') === 'screen-1') {
        e.target.classList.toggle('touch_screen');
    }
    if (e.target.getAttribute('id') === 'screen-2') {
        e.target.classList.toggle('touch_screen');
    }
    if (e.target.getAttribute('id') === 'screen-3') {
        e.target.classList.toggle('touch_screen');
    }
});

next.addEventListener('click', left);
prev.addEventListener('click', right);

// FORM

function validateEmail(email) {
    let pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
}


let form_submit = document.querySelector('#form_submit');

form_submit.addEventListener('click', (e) => {
    e.preventDefault();

    let quote_wrapper = document.querySelector('.quote-wrapper');
    let message = document.createElement('div');
    message.classList.add('message');
    message.textContent = 'The letter was sent';

    let form = document.forms.form;
    let name = form.name;
    let email = form.email;
    let subject = form.subject;
    let describe = form.describe;


    let message_subject = document.createElement('div');
    let message_describe = document.createElement('div');

    // console.log(name.value);
    // console.log(email.value);
    // console.log(subject.value);
    // console.log(describe.value);

    if (!name.value) {
        name.classList.add('shake');
        setTimeout(() => name.classList.remove('shake'), 1000);
        return false
    }

    if (!validateEmail(email.value)) {
        email.classList.add('shake');
        setTimeout(() => email.classList.remove('shake'), 1000);
        return false
    }

    if (subject.value) {
        message_subject.textContent = `Subject: ${subject.value}`;
    } else if (!subject.value) {
        message_subject.textContent = 'Without subject';
    }
    message.append(message_subject);

    if (describe.value) {
        message_describe.textContent = `Description: ${describe.value}`;
    } else if (!describe.value) {
        message_describe.textContent = 'Without description';
    }
    message.append(message_describe);

    quote_wrapper.append(message);
    form.reset();
    setTimeout(() => message.remove(), 3000);
});

// @media375

let burger_menu = document.querySelector('.burger-menu');
let logo = document.querySelector('.logo');
let logo_copy = logo.cloneNode(true);
logo_copy.style.opacity = 0;

// open/close menu :)
burger_menu.addEventListener('click', function () {

    burger_menu.classList.toggle('burger-active');

    let position = header_menu.getAttribute('style');
    if (position && position.includes('0')) {

        setTimeout(() => {
            logo_copy.style.opacity = 0
        }, 1);

        header_menu.style.left = -278 + 'px';
    } else {
        header_menu.prepend(logo_copy);
        setTimeout(() => logo_copy.style.opacity = 1, 700);

        header_menu.style.left = 0;
    }
});
