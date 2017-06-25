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
