/*
 * Methods and settings variables
 */

// General application settings
var appSettings = {
    maxImageWidth: 500,
    maxImageHeight: 500,
    fbImageWidth: 960,
    fbImageHeight: 960,
    imageDownloadFormat: ".jpg",
    maxFileSizeLimit: 5242880,
    categoriesBreakpointXs: 368,
    categoriesBreakpointXsValue: 3,
    categoriesBreakpointSm: 768,
    categoriesBreakpointSmValue: 4,
    categoriesBreakpointMd: 992,
    categoriesBreakpointMdValue: 5,
    categoriesBreakpointLg: 1200,
    categoriesBreakpointLgValue: 6,
    categoriesBreakpointXLg: 2100,
    categoriesBreakpointXLgValue: 10,
    maxHomePageClicks: 3,
    websiteReleased: true,
    randomStringLength: 6,
    fbAppId: 653803501477017
};

// Collection of different messages
var facebookMessages = [
    "Use Profile Sticker to create an amazing profile picture at ",
    "Add a sticker to your profile picture in just 4 steps at ",
    "Add an amazing sticker to your profile picture using Profile Sticker at ",
    "Choose from over a 100 stickers for your profile picture using Profile Sticker at ",
    "Create a fabulous profile picture using Profile Sticker ",
];

function generateRandomMessage() {
    /// <summary>Method to get a random message to post on Facebook along with the profile sticker generated image.</summary>
    var x = Math.floor((Math.random() * facebookMessages.length) + 1);
    return facebookMessages[x - 1] + "" + window.location.href.toString() + " #profilesticker #featureme";
}


// Block:
// Get or set values from the hidden controls

// Preview toggle state

function getHdnDisplayPreview() {
    /// <summary>Method to get the display preview toggle state.</summary>
    return document.getElementById('hdnDisplayPreview').value;
}

function setHdnDisplayPreview(val) {
    /// <summary>Method to set the display preview toggle state.</summary>
    /// <param name="val" type="string">The new value to be set.</param> 
    document.getElementById('hdnDisplayPreview').value = val;
}

// Uploaded image height and width

function getHdnImageHeight() {
    /// <summary>Method to get the uploaded images' height.</summary>
    return document.getElementById('hdnImageHeight').value;
}
function setHdnImageHeight(val) {
    /// <summary>Method to set the uploaded images' height.</summary>
    /// <param name="val" type="string">The new value to be set.</param> 
    document.getElementById('hdnImageHeight').value = val;
}

function getHdnImageWidth() {
    /// <summary>Method to get the uploaded images' width.</summary>
    return document.getElementById('hdnImageHeight').value;
}

function setHdnImageWidth(val) {
    /// <summary>Method to get the uploaded images' width.</summary>
    /// <param name="val" type="string">The new value to be set.</param> 
    document.getElementById('hdnImageHeight').value = val;
}

// Selected overlay

function getHdnSelectedOverlay() {
    /// <summary>Method to get the selected overlays id.</summary>
    return document.getElementById('selectedOverlay').value;
}

function setHdnSelectedOverlay(val) {
    /// <summary>Method to set the selected overlays id.</summary>
    /// <param name="val" type="string">The new value to be set.</param> 
    document.getElementById('selectedOverlay').value = val;
}

// Selected category

function getHdnSelectedCategory() {
    /// <summary>Method to get the selected overlays category id.</summary>
    return document.getElementById('selectedCategory').value;
}

function setHdnSelectedCategory(val) {
    /// <summary>Method to set the selected overlays category id.</summary>
    /// <param name="val" type="string">The new value to be set.</param> 
    document.getElementById('selectedCategory').value = val;
}

// Current page view name.

function getCurrentPageView() {
    /// <summary>Method to get the current page view.</summary>
    return document.getElementById("currentView").value;
}

function setCurrentPageView(viewName) {
    /// <summary>Method to set the current page view.</summary>
    /// <param name="viewName" type="string">The name of the current view.</param> 
    document.getElementById("currentView").value = viewName;
}