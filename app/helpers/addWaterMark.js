// assets
import waterMarkDesktop from 'assets/images/watermark-desktop.jpg'
import watermarkMobile from 'assets/images/watermark-mobile.jpg'
import watermarkIos from 'assets/images/watermark-ios.jpg'


const addWaterMark = ({ canvas, isWebView, isMobile }) => {
    let watermark;

    if (isWebView) {
        watermark = watermarkIos
    } else if (isMobile) {
        watermark =  watermarkMobile
    } else {
        watermark =  waterMarkDesktop
    }


    fabric.Image.fromURL(watermark, watermark => {

        canvas.add(watermark)

        const mobilePosition = {
            left: 0,
            top: canvas.height - 6,
            width: 50, height: 6,
            opacity: 0.5
        }

        const desktopPosition = {
            left: 0,
            top: canvas.height - 12,
            width: 99, height: 12,
            opacity: 0.5
        }

        const currentNeededPosition = (isMobile ? mobilePosition : desktopPosition)

        watermark.set({
            lockMovementX: true,
            lockMovementY: true,
            ...currentNeededPosition
        })

        canvas.bringToFront(watermark)
        canvas.renderAll()
    })
}

export default addWaterMark