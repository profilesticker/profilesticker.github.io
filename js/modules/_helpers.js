
// Block:
// Commonly used methods

function dataURItoBlob(dataURI) {
    /// <summary>Method to convert a data URI to blob.</summary>
    /// <param name="dataURI" type="string">The image to be converted.</param> 
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}

function transferCanvas(sourceCanvas, destinationCanvas) {
    /// <summary>Method to transfer canvas contents from a source element to a destination element.</summary>
    /// <param name="sourceCanvas" type="element">The source canvas element.</param> 
    /// <param name="destinationCanvas" type="element">The destination canvas element.</param> 
    destinationCanvas.height = sourceCanvas.height;
    destinationCanvas.width = sourceCanvas.width;
    destinationCanvas.getContext('2d').drawImage(sourceCanvas, 0, 0);
}

function transferCanvasSquare(sourceCanvas, destinationCanvas) {
    /// <summary>Method to transfer canvas contents from a source element to a destination element keeping the same aspect ratio as the destination.</summary>
    /// <param name="sourceCanvas" type="element">The source canvas element.</param> 
    /// <param name="destinationCanvas" type="element">The destination canvas element.</param> 
    destinationCanvas.width = destinationCanvas.height;
    destinationCanvas.getContext('2d').drawImage(
        sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height,
        0, 0, destinationCanvas.width, destinationCanvas.height);
}

function drawOverlayOnCanvas(currentCanvas, imageURL) {
    /// <summary>Method to draw an image over a canvas.</summary>
    /// <param name="currentCanvas" type="element">The destination canvas element.</param> 
    /// <param name="imageURL" type="string">The image to be drawn over.</param> 
    var img = new Image();
    img.onload = function () {
        var ctx = currentCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, currentCanvas.width, currentCanvas.height);
    };
    img.src = "" + imageURL;
    return img;
}

function showToast(type, message, isSticky) {
    /// <summary>Displays a toast notification on the screen.</summary>
    /// <param name="type" type="String">Value representing the type of toast notification.</param>  
    /// <param name="message" type="String">The message to be displayed in the toast notification.</param>  
    /// <param name="isSticky" type="Boolean">Specifies whether the toast notification must hide automatically (false) or requires user action (true).</param>  
    /// <param name="onClickCode" type="Number">Numeric value representing the onclick event listener method. 0 for no listener method attached.</param>  
    toastr.options = {
        "closeButton": isSticky,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": false, //function () { handleToastrOnClick(onClickCode); },
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": isSticky ? "0" : "5000",
        "extendedTimeOut": isSticky ? "0" : "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](message);
}

function showSiteLoading() {
    /// <summary>Method to show the website loading screen.</summary>
    $(".ps-loading").removeClass("ps-loading-hidden");
}

function hideSiteLoading() {
    /// <summary>Method to hide the website loading screen.</summary>
    $(".ps-loading").addClass("ps-loading-hidden");
}

function initializeBootstrapTooltip() {
    /// <summary>Method to initialize bootstrap's custom tooltip.</summary>
    $('[data-toggle="tooltip"]').tooltip();
}


function getRandomString() {
    /// <summary>Method to return a string of random alphanumeric characters of a set length.</summary>
    var chars ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = appSettings.randomStringLength; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}