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
