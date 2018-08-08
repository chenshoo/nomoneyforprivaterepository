

export default (position, canvas, initialFontSize) => {

    switch(position) {
        case 'top': {
            return 0.05 * canvas.height;
        }

        case 'middle': {
            return canvas.height / 2;
        }

        case 'bottom': {
            return (canvas.height - parseInt(initialFontSize) * 2.2);
        }
    }
}