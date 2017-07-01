/*
 * Methods around errors
 */

// Error codes
var errorCodes = {
    extNotSupported: "extNotSupported",
    canvasNotSupported: "canvasNotSupported",
    fileSizeLimit: "fileSizeLimit",
    fbNotAuth: "fbNotAuth",
    fbNoLogin: "fbNoLogin",
    fbPostPicture: "fbPostPicture",
    uriToBlob: "uriToBlob",
    fbNoLogout: "fbNoLogout",
    downloadError: "downloadError",
}

function showErrorToast(errorCode, additionalParams) {
    /// <summary>Method that handles different type of errors and informs the user about its occurence.</summary>
    /// <param name="errorCode" type="string">The error code from the predefined list of errors.</param> 
    /// <param name="additionalParams" type="array">An array index to pass in additional information for the error.</param> 
    var message = "";
    if (errorCode == errorCodes.extNotSupported) {
        message = "Unfortunately, we cannot upload a " + additionalParams[0] + " image. Try uploading a .jpg, .jpeg or a .png image.";
    }
    else if (errorCode == errorCodes.fileSizeLimit) {
        message = "You may upload an image of a maximum size of 5 Mb only.";
    }
    else if (errorCode == errorCodes.fbNotAuth) {
        message = "You have not authorized this app to allow access to your profile. Will try logging you back in and see if this works.";
    }
    else if (errorCode == errorCodes.fbNoLogin) {
        message = "Unable to log you in to Facebook at the moment."
    }
    else if (errorCode == errorCodes.fbPostPicture) {
        message = "Unable to post the picture to Facebook at the moment. Try downloading the image or posting Facebook sometime later.";
    }
    else if (errorCode == errorCodes.uriToBlob) {
        message = "Unable to convert the image to a blob. More details: " + additionalParams[0];
    }
    else if (errorCode == errorCodes.fbNoLogout) {
        message = "Unable to log you out of Facebook at the moment. If you're not automatically logged out later, try doing this again.";
    }
    else if (errorCode == errorCodes.downloadError) {
        message = "We're experiencing some problem while downloading the image. If an image is not automatically downloaded, try to right-click the image and click save-as to download the image manually. Apologies for the inconvenience caused.";
    }
    else {
    }
    sendErrorEventTracking(errorCode, message);
    console.log("Error: " + message);
    showToast("error", message, false);
}

// Block:
// Methods getting and setting the home page view counter.
// This is used to help a user not click the home icon when on the home page.

function getHomeViewErrorCounterValue() {
    /// <summary>Method that gets the home view error counter value.</summary>
    return document.getElementById("homeViewErrorCounter").value;
}

function incrementHomeViewErrorCounterValue() {
    /// <summary>Method that increments the home view counter by one.</summary>
    var i = getHomeViewErrorCounterValue();
    i++;
    setHomeViewErrorCounterValue(i);
}

function setHomeViewErrorCounterValue(newValue) {
    /// <summary>Method that sets the home view error counter value.</summary>
    /// <param name="newValue" type="number">The new value to be set to the field.</param> 
    document.getElementById("homeViewErrorCounter").value = newValue;
}