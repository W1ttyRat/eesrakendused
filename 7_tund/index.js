const logo = document.querySelector('.logo.js');
const button = document.querySelector('.controls button');
let rotations = 0;

anime({
    targets: '.logo.js',
    scale: [
        { value: 1.15, duration: 250, easing: 'easeInOutSine' },
        { value: 1.0, duration: 500, easing: 'easeOutElastic(1, .6)' }
    ],
    direction: 'alternate',
    loop: true
});

button.addEventListener('click', () => {
    rotations += 1;
    button.textContent = `rotations: ${rotations}`;

    anime({
        targets: logo,
        rotate: rotations * 360,
        duration: 1200,
        easing: 'easeOutQuart'
    });
});