/*
 * Method to handle file upload and crop
 */

var croppable;
var cropper;

function handleUploadedImage(e) {
    /// <summary>Method that handles the image once its being uploaded via file upload control.</summary>
    /// <param name="e" type="object">The object containing file upload data.</param> 
    try {
        sendInteractionEventTracking("Upload picture from Computer", "Button on the home page");
        _handleImage(e);
    }
    catch (err) {
        console.log("Error: handleUploadedImage" + err.message);
    }    
}

function transferToCropCanvas() {
    /// <summary>Method to copy the original canvas into the crop page</summary>
    croppable = false;
    var destCtx, sourceCtx;

    // Transfer the image from the global canvas to the crop canvas
    try{
        destCtx = document.getElementById('cropCanvas');
        sourceCtx = document.getElementById('globalCanvas');
        transferCanvas(sourceCtx, destCtx);
        hideSiteLoading();
    }
    catch (err) {
        console.log("transferToCropCanvas");
    }

    // Load the cropper plugin to the image in the canvas    
    var image = new Image();
    image.id = "cropCanvasImage";
    image.onload = function () {
        var button = document.getElementById('cropButton');
        var image = document.querySelector('#cropCanvasImage');
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            movable: true,
            zoomable: true,
            rotatable: true,
            scalable: true,
            ready: function () {
                croppable = true;
                document.getElementById('cropButton').disabled = false;
            }
        });
    };
    image.src = destCtx.toDataURL();
    document.getElementById('cropCanvasImageDiv').appendChild(image);
}

function cropThePicture() {
    /// <summary>Method that handles cropping of an image after the crop button is clicked.</summary>
    sendInteractionEventTracking("Crop picture button", "Clicked the button in the crop picture view");
    var croppedCanvas, roundedCanvas, roundedImage;
    var button = document.getElementById('cropButton');
    var image = document.querySelector('#imageCanvasImage');
    if (!croppable) {
        return;
    }
    // Crop
    croppedCanvas = cropper.getCroppedCanvas();
    // Transfer the cropped area to the global canvas
    var destCtx = document.getElementById('globalCanvas');
    transferCanvas(croppedCanvas, destCtx);
    // Go to the next view
    switchTemplate("overlay");
    showSiteLoading();
}


// Private methods

function _handleImage(e) {
    /// <summary>Method that handles the image once its being uploaded via file upload control.</summary>
    /// <param name="e" type="object">The object containing file upload data.</param> 
    var canvas = document.getElementById('globalCanvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    var url = document.getElementById('uploadComputerImage').value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

    if (!e.target.files) {
        console.log("no image selected");
    }   

    // If target control has files
    if (e.target.files[0]) {
        if (e.target.files[0].size > appSettings.maxFileSizeLimit) {
            showErrorToast(errorCodes.fileSizeLimit, [""]);
        }
        else {
            // If target file matches the allowed extensions
            if (ext == "png" || ext == "jpeg" || ext == "jpg") {
                reader.onload = function (event) {
                    var img = new Image();
                    img.onload = function () {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        setHdnImageWidth(img.width);
                        setHdnImageHeight(img.height);
                        ctx.drawImage(img, 0, 0);
                    }
                    img.src = event.target.result;
                    switchTemplate("crop");
                    showSiteLoading();
                }
                reader.readAsDataURL(e.target.files[0]);
            }
            else {
                showErrorToast(errorCodes.extNotSupported, ["" + ext]);
            }
        }             
    }
    else {
        console.log("No image uploaded");
    }
}