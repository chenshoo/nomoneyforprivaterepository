import isMobile from './isMobile';
import getTextPosition from './getTextPosition';
import uniqueId from './uniqueId';
import isRTL from './isRtl';
import modifyImageDimensions from './modifyImageDimensions';
import getRandomNumber from './getRandomNumber';
import isWebview from './isWebview';
import getQueryVariable from './getQueryVariable';
import addWaterMark from './addWaterMark';
import sendDownloadedMemeAnalyticsEvent from './sendDownloadedMemeAnlyticsEvent';
import apiMiddleware from './apiMiddleware';


class Helpers {

    constructor() {
        this.isMobile = isMobile;
        this.getTextPosition = getTextPosition;
        this.uniqueId = uniqueId;
        this.isRTL = isRTL;
        this.modifyImageDimensions = modifyImageDimensions;
        this.getRandomNumber = getRandomNumber;
        this.isWebview = isWebview;
        this.getQueryVariable = getQueryVariable;
        this.addWaterMark = addWaterMark;
        this.sendDownloadedMemeAnalyticsEvent = sendDownloadedMemeAnalyticsEvent;
        this.apiMiddleware = apiMiddleware;
    }

}


export default new Helpers();