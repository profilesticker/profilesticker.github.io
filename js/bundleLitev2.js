/*
 * Methods contributing to Google Event tracking
 */

// Pre defined categories for event tracking
var categoryEventTracking = {
    navigation: "Navigation",
    advertisements: "Advertisements",
    socialMedia: "Social Media",
    share: "Share",
    cta: "Call to Action",
    interaction: "Interactions",
    outboundNavigation: "Outbound Navigation",
    error: "Error",
    sticker: "Stickers"
};

function sendNavigationEventTracking(pageTo, elementLocation) {
    /// <summary>Send navigation based event tracking data to Google Analytics.</summary>
    /// <param name="pageTo" type="string">The page being redirected to.</param>  
    /// <param name="elementLocation" type="string">The navigation link's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.navigation, "To: " + pageTo, "From: " + elementLocation);
}

function sendOutboundNavigationEventTracking(e) {
    /// <summary>Send navigation based event tracking data to Google Analytics.</summary>
    /// <param name="pageTo" type="string">The page being redirected to.</param>  
    /// <param name="elementLocation" type="string">The navigation link's location in the website.</param>  
    // _sendGoogleEventTracking(categoryEventTracking.outboundNavigation, $(e).attr('data-content'), "To: " + $(e).attr('href') + " From: " + window.location.href.toString());
}

function sendSocialMediaEventTracking(network, elementLocation) {
    /// <summary>Send social media redirects event tracking data to Google Analytics.</summary>
    /// <param name="network" type="string">The social network in context.</param>  
    /// <param name="elementLocation" type="string">The social network's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.socialMedia, network, elementLocation);
}

function sendShareLinkEventTracking(network, elementLocation) {
    /// <summary>Send share button event tracking data to Google Analytics.</summary>
    /// <param name="network" type="string">The social network in context.</param>  
    /// <param name="elementLocation" type="string">The social network's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.share, network, elementLocation);
}

function sendAdvertisementEventTracking(advtTitle, advtLocation) {
    /// <summary>Send navigation based event tracking data to Google Analytics.</summary>
    /// <param name="pageTo" type="string">The page being redirected to.</param>  
    /// <param name="elementLocation" type="string">The navigation link's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.advertisements, advtTitle, advtLocation);
}

function sendStickerEventTracking(sticker, elementLocation) {
    /// <summary>Send general interaction based event tracking data to Google Analytics.</summary>
    /// <param name="element" type="string">The element in context.</param>  
    /// <param name="elementLocation" type="string">The element's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.sticker, sticker, elementLocation);
}

function sendInteractionEventTracking(element, elementLocation) {
    /// <summary>Send general interaction based event tracking data to Google Analytics.</summary>
    /// <param name="element" type="string">The element in context.</param>  
    /// <param name="elementLocation" type="string">The element's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.interaction, element, elementLocation);
}

function sendCTAEventTracking(element, elementLocation) {
    /// <summary>Send CTA based event tracking data to Google Analytics.</summary>
    /// <param name="element" type="string">The element in context.</param>  
    /// <param name="elementLocation" type="string">The CTA's location in the website.</param>  
    _sendGoogleEventTracking(categoryEventTracking.cta, element, elementLocation);
}

function sendErrorEventTracking(errorTitle, errorDescription) {
    /// <summary>Send general error event tracking data to Google Analytics.</summary>
    /// <param name="errorTitle" type="string">The title of the error.</param>  
    /// <param name="errorDescription" type="string">A description of the error occured.</param>  
    _sendGoogleEventTracking(categoryEventTracking.error, errorTitle, errorDescription);
}

// Private methods

function _sendGoogleEventTracking(category, action, label) {
    /// <summary>Send event tracking data to Google Analytics.</summary>
    /// <param name="category" type="string">The broad category of an event.</param>  
    /// <param name="action" type="string">Actionable details of the event.</param>  
    /// <param name="label" type="string">Additional details of the actionable item.</param>  
    ga('gtmProfileSticker.send', 'event', category, action, label);
}

/*
 * Methods that common to the full and lite version
 */

function clickSocialMediaLink(platform) {
    /// <summary>Method to that tracks the social media icon clicks.</summary>
    /// <param name="platform" type="string">The social media platform.</param> 
    sendSocialMediaEventTracking(platform, "Footer of the website. URL: " + window.location.href.toString());
}

function clickShareSocialMedia(platform) {
    /// <summary>Method to that handles the sharing functionality on the site.</summary>
    /// <param name="platform" type="string">The social media platform.</param> 
    if (platform == "twitter") {
        sendShareLinkEventTracking('Share on Twitter', 'Top right share button. URL: ' + window.location.href.toString());
        window.open(getEncodedURI("https://twitter.com/share?text=Add a sticker to your profile picture in just 4 steps @profilesticker&url=https://profilesticker.github.io"), "_blank");
    }
    else if (platform == "facebook") {
        sendShareLinkEventTracking('Share on Facebook', 'Top right share button. URL: ' + window.location.href.toString());
        window.open(getEncodedURI("http://www.facebook.com/sharer.php?t=Add a sticker to your profile picture in just 4 easy steps @profilesticker &u=https://profilesticker.github.io"), "_blank");
    }
    else if (platform == "google") {
        sendShareLinkEventTracking('Share on Google+', 'Top right share button. URL: ' + window.location.href.toString());
        window.open(getEncodedURI("https://plus.google.com/share?text=Add a sticker to your profile picture in just 4 easy steps&url=https://profilesticker.github.io"), "_blank");
    }
    else {
        sendShareLinkEventTracking('Share on LinkedIn', 'Top right share button. URL: ' + window.location.href.toString());
        window.open(getEncodedURI("https://www.linkedin.com/cws/share?url=profilesticker.github.io&original_referer=https://profilesticker.github.io"), "_blank");
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
    sendAdvertisementEventTracking(redirectLink, "Sticker grid");
}

/*!
 * Profile Sticker (c) 2017 Clyde D'Souza
 * clydedsouza.net
 * http://github.com/clydedz
 */


function checkForFaqPage() {
    /// <summary>Method that executes FAQ tasks if the current page is FAQ.</summary>
    if(window.location.href.toString().includes("/faq")){
        var allQuestions = document.getElementsByClassName("ps-faq-q");

        var doThisWhenYouClickAQuestion = function () {
            /// <summary>Method that handles the collapse logic of a FAQ item.</summary>
            var correspondingAnswer = document.getElementById(this.getAttribute("data-target"));
            var correspondingArrow = document.getElementById(this.getAttribute("data-target") + "-arrow");
            // Check if you're closing the QA item
            for (var k = 0; k < correspondingAnswer.classList.length; k++) {
                if (correspondingAnswer.classList.item(k) == "in") {
                    correspondingAnswer.classList.remove("in");
                    correspondingArrow.classList.remove("mdi-arrow-down");
                    correspondingArrow.classList.add("mdi-arrow-right");
                    return false;
                }
            }
            // If not, you're probably opening a closed QA item
            // In which case you close all other answers and then open only the corresponding answer item
            var allAnswers = document.getElementsByClassName("ps-faq-a");
            for (var i = 0; i < allAnswers.length; i++) {
                allAnswers[i].classList.remove("in");
            }
            var allArrows = document.getElementsByClassName("ps-faq-d");
            for (var i = 0; i < allArrows.length; i++) {
                allArrows[i].classList.remove("mdi-arrow-down");
                allArrows[i].classList.add("mdi-arrow-right");
            }
            correspondingAnswer.classList.add("in");
            correspondingArrow.classList.remove("mdi-arrow-right");
            correspondingArrow.classList.add("mdi-arrow-down");
        };

        // Add an event listener
        for (var i = 0; i < allQuestions.length; i++) {
            allQuestions[i].addEventListener('click', doThisWhenYouClickAQuestion, false);
        }
    }
};

checkForFaqPage();