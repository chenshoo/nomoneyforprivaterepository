
class WebViewService {

    constructor() {
        this.isWebView = false;
        this.isAndroid = false;
    }

    setIsWebView = (value) => {
        this.isWebView = value;
    }

    setIsAndroid = (value) => {
        this.isAndroid = value;
    }

    isInsideWebView = () => {
        return this.isWebview;
    }


}


export default new WebViewService()