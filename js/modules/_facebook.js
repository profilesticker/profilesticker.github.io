/*
 * Facebook related js methods
 */


function initializeFacebook() {
    /// <summary>Initialises Facebook JS SDK on the page.</summary>
    
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '653803501477017',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
    };
   
    /*
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1932663840336823',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
        FB.AppEvents.logPageView();
    };
    */

}


function facebookLogin(callback) {
    /// <summary>Method that handles Facebook login and calls back the passed method with required parameters.</summary>
    /// <param name="callback" type="method">The method to callback.</param> 
    try {
        FB.login(function (response) {
            if (response.status === 'connected'){
                var _loginFacebookResponse = {
                    userPicture: "https://graph.facebook.com/" + response.authResponse.userID + "/picture?width=960",
                    userToken: response.authResponse.accessToken
                };
                showToast("info", "Logged in to Facebook.", false);
                // Callback the method
                callback(_loginFacebookResponse);
            }
            else {
                showErrorToast(errorCodes.fbNoLogin, [""]);
            }
        }, { scope: 'email, user_photos, publish_actions', auth_type: 'reauthenticate' });
    }
    catch (err) {
        console.log("Error: " + err.message);
        showErrorToast(errorCodes.fbNoLogin, [""]);
    }
}

function getImageFromFacebook() {
    /// <summary>Get user's profile picture from Facebook.</summary>
    try {
        sendInteractionEventTracking("Get picture from Facebook", "Button on the home page");
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                var _facebookResponseObject = _returnFacebookResponseObject(response.authResponse);
                setHdnImageWidth(appSettings.fbImageWidth);
                setHdnImageHeight(appSettings.fbImageHeight);
                _drawFacebookPictureToGlobalCanvas(_facebookResponseObject);
            } else if (response.status === 'not_authorized') {
                showErrorToast(errorCodes.fbNotAuth, [""]);
                facebookLogin(_drawFacebookPictureToGlobalCanvas);
            } else {
                facebookLogin(_drawFacebookPictureToGlobalCanvas);
            }
        }, true);
    }
    catch (err) {
        facebookLogin(_drawFacebookPictureToGlobalCanvas);
    }
}

function postImageToFacebook() {
    /// <summary>Method to post an image to Facebook.</summary>
    try {
        sendInteractionEventTracking("Post picture to Facebook", "Button on the download page");
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                var _facebookResponse = _returnFacebookResponseObject(response.authResponse);
                _postNewPicture(_facebookResponse);
            } else if (response.status === 'not_authorized') {
                showErrorToast(errorCodes.fbNotAuth, [""]);
                facebookLogin(_postNewPicture);
            } else {
                facebookLogin(_postNewPicture);
            }
        }, true);
    }
    catch (err) {
        facebookLogin(_postNewPicture);
    }
}

function facebookLogout() {
    /// <summary>Method to logout of Facebook.</summary>
    try {
        FB.logout(function (response) {
            // user is now logged out
            showToast("info", "Logged out of Facebook", false);
        });
    }
    catch (err) {
        showErrorToast(errorCodes.fbNoLogout, ["" + e.message]);
    }
}


// Private methods

function _returnFacebookResponseObject(authResponse) {
    /// <summary>Returns a Facebook complex object containing the user's profile picture and access token.</summary>
    /// <param name="authResponse" type="object">Holds the response sent back from Facebook.</param> 
    var _facebookResponseObject = {  
        userPicture: "https://graph.facebook.com/" + authResponse.userID + "/picture?width=960",      
        userToken: authResponse.accessToken
    };
    return _facebookResponseObject;
}

function _postNewPicture(facebookResponseObject) {
    /// <summary>Method to post a new picture to Facebook.</summary>
    /// <param name="facebookResponseObject" type="object">A complex object containing a user's profile picture and its access token.</param> 
    var canvas = document.getElementById("downloadPreviewCanvas");
    var imageData = canvas.toDataURL("image/png");
    try {
        blob = dataURItoBlob(imageData);
    } catch (e) {
        showErrorToast(errorCodes.uriToBlob, ["" + e.message]);
    }
    var fd = new FormData();
    fd.append("access_token", facebookResponseObject.userToken);
    fd.append("source", blob);
    fd.append("message", "");
    try {
        showToast("info", "Posting your picture to Facebook...", false);
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + facebookResponseObject.userToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                showToast("info", "Your picture has been posted to Facebook", false);
            },
            error: function (shr, status, data) {
                showErrorToast(errorCodes.fbPostPicture, [""]);
            }
        });
    } catch (e) {
        console.log(e);
        showErrorToast(errorCodes.fbPostPicture, ["" + e.message]);
    }
}

function _drawFacebookPictureToGlobalCanvas(facebookResponseObject) {
    /// <summary>Method to draw Facebook user's profile picture to the projects global canvas.</summary>
    /// <param name="facebookResponseObject" type="object">A complex object containing a user's profile picture and its access token.</param> 
    var img = new Image();
    img.crossOrigin = "Anonymous";
    var globalCanvas = document.getElementById("globalCanvas");
    img.onload = function () {
        globalCanvas.width = img.width;
        globalCanvas.height = img.height;
        setHdnImageWidth(img.width);
        setHdnImageHeight(img.height);
        globalCanvas.getContext('2d').drawImage(img, 0, 0);
        switchTemplate("crop");
        showSiteLoading();
    }
    img.src = facebookResponseObject.userPicture;
}

// userPicture: "https://avatars.io/facebook/" + authResponse.userID + "/large",
// userPicture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",