// HEADER
let header_menu = document.querySelector('#header_menu');

header_menu.addEventListener('click', function (e) {
    header_menu.querySelectorAll('li').forEach(li => {
        li.classList.remove('menu_active');
    });
    e.target.classList.add('menu_active');
    let scroll_to = document.getElementById(e.target.textContent.toLowerCase());
    scroll_to.scrollIntoView({ behavior: 'smooth'})
});

// PORTFOLIO
let portfolio = document.querySelector('#portfolio');
let tags = document.querySelector('#tags');
let images_wrapper = document.querySelector('.images');

portfolio.addEventListener('click', function (e) {
    let portfolio_images = document.querySelectorAll('.images div');

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
            if (el.firstElementChild.src !== e.target.src) {
                el.classList.remove('img-touch')
            }
        });
        e.target.parentElement.classList.toggle('img-touch');
    }
});

// SLIDER

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slider = document.querySelector('#slider');
let images = document.querySelectorAll('.slide-single img');
let slider_images = [];

for (let i = 0; i < images.length; i++){
    let div = document.createElement('div');
    let div_screen_1 = document.createElement('div');
    let div_screen_2 = document.createElement('div');
    let div_screen_3 = document.createElement('div');

    div_screen_1.classList.add('screen-1');
    div_screen_2.classList.add('screen-2');
    div_screen_3.classList.add('screen-3');

    div_screen_1.setAttribute('id', 'screen-1');
    div_screen_2.setAttribute('id', 'screen-2');
    div_screen_3.setAttribute('id', 'screen-3');

    let img = document.createElement('img');
    div.classList.add('slide-single');
    img.src = images[i].src;
    slider_images[i] = div;

    if (img.src.includes('1')) {
        div.append(div_screen_1);
        div.append(div_screen_2);
    } else {
        div.append(div_screen_3);
    }
    div.append(img);
    if (i !== 0) images[i].parentElement.remove();

}

next.addEventListener('click', right);
prev.addEventListener('click', left);

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


function left() {
    prev.removeEventListener('click', left);
    setTimeout(() => prev.addEventListener('click', left), 1000);

    let swap = slider_images.shift();
    slider_images.push(swap);
    let next_img = slider_images[0];
    next_img.style.left = 1020 + 'px';
    slider.append(next_img);
    let current = document.querySelector('.slide-single');
    current.style.left = 0 -1020 + 'px';
    setTimeout(() => next_img.style.left = 0);

    setTimeout(function () {
        current.remove();
    }, 1000);
}

function right() {
    next.removeEventListener('click', right);
    setTimeout(() => next.addEventListener('click', right), 1000);

    let swap = slider_images.shift();
    slider_images.push(swap);
    let next_img = slider_images[0];
    next_img.style.left = 0 - 1020 + 'px';
    slider.append(next_img);
    let current = document.querySelector('.slide-single');
    current.style.left = 1020 + 'px';
    setTimeout(() => next_img.style.left = 0);

    setTimeout(function () {
        current.remove();
    }, 1000);
}

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

    let subject = document.querySelector('#subject');
    let describe = document.querySelector('#describe');
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let message_subject = document.createElement('div');
    let message_describe = document.createElement('div');

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
    setTimeout(() => message.remove(), 3000);
});
