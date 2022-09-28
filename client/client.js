const { createCanvas } = require('canvas');

const init = () => {
    const width = 1200;
    const height = 600;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle('#999');
    context.fillRect(0, 0, width, height);
};

window.onload = init;