//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let changetheme = document.querySelector('#change-theme-icon');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });


    //sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //remove toggle icon and navbar when click navbar (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// dark light mode
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


// ScrollReveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading, .home-img', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .skills-box, .icon-skill-box, .portfolio-box, .contact form, .title, .portfolio .btn-box', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content h2, .home-content .text-animate, .about-info p', { origin: 'right' });


// Send Email
const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

function sendEmail() {
    const bodyMessage = 'Full Name: ' + fullName.value + '<br>Email: ' + email.value + '<br>Phone: ' + phone.value + '<br>Message: ' + message.value + '<br>';

    Email.send({
        SecureToken: "132f0302-7b0e-4f66-bfac-b28788802a1e",
        To: 'branch0.disk@gmail.com',
        From: "branch0.disk@gmail.com",
        Subject: "From InterviewSite",
        Body: bodyMessage
    }).then(
        message => {
            if (message == 'OK') {

                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"

                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll('.item');

    for (const item of items){
        if (item.value == "") {
            item.classList.add('error');
            item.parentElement.parentElement.classList.add('error');
        }

        if (items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        })

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove('error');
                item.parentElement.parentElement.classList.remove('error');
            }
            else {
                item.classList.add('error');
                item.parentElement.parentElement.classList.add('error');
            }
        })
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/ ;
    const errorTxtEmail = document.querySelector(".error-text.email");

    if (!email.value.match(emailRegex)){
        email.classList.add('error');
        email.parentElement.parentElement.classList.add('error');

        if(email.value != "") {
            errorTxtEmail.innerHTML = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerHTML = "Email Address can't be blank";
        }
    }
        else {
            email.classList.remove('error');
            email.parentElement.parentElement.classList.remove('error');
        }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }
});