var rp = require('request-promise');


export default {
    // Multiple browsers support
    isMultiBrowser: false,

    //runningBrowsers: {},

    // Required - must be implemented
    // Browser control
    openBrowser(id, pageUrl, browserName) {
        //runningBrowsers[id] = id;

        // do a GET request to the server
        const server = process.env.TESTCAFE_LAMBDA_CHROME_URL;
        rp(`${server}?url=${pageUrl}`);

        console.log('id is', id, pageUrl, browserName);

        return Promise.resolve();
    },

    closeBrowser (id) {
        console.log("We should close browser", 'id is', id);
        return Promise.resolve();
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    async init() {
        console.log("We are going to Init")
        return;
    },

    async dispose () {
        return;
    },


    // Browser names handling
    async getBrowserList () {
        throw new Error('Not implemented!');
    },

    async isValidBrowserName (/* browserName */) {
        return true;
    },


    // Extra methods
    async resizeWindow (/* id, width, height, currentWidth, currentHeight */) {
        this.reportWarning('The window resize functionality is not supported by the "lambda-chrome" browser provider.');
    },

    async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
        this.reportWarning('The screenshot functionality is not supported by the "lambda-chrome" browser provider.');
    }
};
