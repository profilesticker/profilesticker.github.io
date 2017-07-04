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

function clickSocialMediaLink(platform) {
    /// <summary>Method to that tracks the social media icon clicks.</summary>
    /// <param name="platform" type="string">The social media platform.</param> 
    sendSocialMediaEventTracking(platform, "Footer of the website");
}

function clickShareSocialMedia(platform) {
    /// <summary>Method to that handles the sharing functionality on the site.</summary>
    /// <param name="platform" type="string">The social media platform.</param> 
    if (platform == "twitter") {
        sendShareLinkEventTracking('Share on Twitter', 'Top right share button');
        window.open(getEncodedURI("https://twitter.com/share?text=Add a sticker to your profile picture in just 4 steps @profilesticker&url=http://profilesticker.net"), "_blank");
    }
    else if (platform == "facebook") {
        sendShareLinkEventTracking('Share on Facebook', 'Top right share button');
        window.open(getEncodedURI("http://www.facebook.com/sharer.php?t=Add a sticker to your profile picture in just 4 easy steps @profilesticker &u=http://profilesticker.net"), "_blank");
    }
    else if (platform == "google") {
        sendShareLinkEventTracking('Share on Google+', 'Top right share button');
        window.open(getEncodedURI("https://plus.google.com/share?text=Add a sticker to your profile picture in just 4 easy steps&url=http://profilesticker.net"), "_blank");
    }
    else {
        sendShareLinkEventTracking('Share on LinkedIn', 'Top right share button');
        window.open(getEncodedURI("https://www.linkedin.com/cws/share?url=profilesticker.net&original_referer=http://profilesticker.net"), "_blank");
    }
}

function getEncodedURI(uri) {
    /// <summary>Method to that encodes and returns a URL friendly string.</summary>
    /// <param name="uri" type="string">The uri that needs to be encoded.</param> 
    return encodeURI(uri);
}

function clickInGridAdvt(redirectLink) {
    /// <summary>Method to that tracks advertisement clicks.</summary>
    /// <param name="redirectLink" type="string">The URL of the advertiser.</param> 
    console.log(redirectLink)
    sendAdvertisementEventTracking(redirectLink, "Sticker grid");
}

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

