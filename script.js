// Tab functionality for the About section
function opentab(tabname) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Skills animation
document.addEventListener('DOMContentLoaded', function() {
    const skillPers = document.querySelectorAll('.skill-per');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#skills'));

    function animateSkills() {
        skillPers.forEach(skillPer => {
            const percentage = skillPer.getAttribute('data-per');
            skillPer.style.width = percentage + '%';
            skillPer.classList.add('animate');

            const counter = {value: 0};
            const duration = 1500;

            anime({
                targets: counter,
                value: parseInt(percentage),
                duration: duration,
                easing: 'easeInOutQuad',
                update: function() {
                    skillPer.setAttribute('data-per', Math.round(counter.value) + '%');
                }
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Responsive navigation menu
const navToggle = document.createElement('div');
navToggle.classList.add('nav-toggle');
navToggle.innerHTML = '&#9776;';
document.querySelector('nav').appendChild(navToggle);

navToggle.addEventListener('click', function() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('show');
});

// Close menu when a link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav ul').classList.remove('show');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        document.querySelector('nav ul').classList.remove('show');
    }
});

// Form submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwbyqe2_GNzRbCGapQaBj7IKWUCgWDHCzLUTTN02olOGluNgTXl0Ie3Hys519tuEV7pXQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})