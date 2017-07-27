/*!
 * Profile Sticker (c) 2017 Clyde D'Souza
 * clydedsouza.net
 * http://github.com/clydedz
 */

// This holds the entire sticker data
var profileStickerCategoryData = {};

// This holds the entire sticker data
var profileStickerData = {};

// This holds the entire contributorsData data
var contributorsData = {};

// This holds all the featured images
var featuredImageData = {};

// Start here
$(document).ready(function () {

    if (!Modernizr.canvas) {
        switchTemplate("canvasNotSupported");
        setTimeout(function () {
            sendErrorEventTracking(errorCodes.canvasNotSupported, "HTML Canvas is not supported. More details: " + navigator.userAgent);
        }, 1000);
    }
    else {
        //showToast("info", "hello world", true);
        //showToast("error", "hello world", true);
        // Make the body perfect scrollable
        //$('.ps-body').perfectScrollbar();  

        // Show the home page only after the websites release date
        if (appSettings.websiteReleased) {
            // Load profile sticker data
            importProfileStickerData();
            // Initialize Facebook
            initializeFacebook();
            // Load the home page
            switchTemplate("home");           
        }
        else {
            switchTemplate("comingSoon");
        }     
    }
    // Load the website header
    switchTemplate("websiteHeader");
    // Load the footer contents
    switchTemplate("footer");
});

