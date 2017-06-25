/*
 * Methods contributing to the download page
 */

function goToDownload() {
    /// <summary>Method to switch to the download view.</summary>
    sendInteractionEventTracking("Go to download button", "Clicked the next button on the overlay selection page");
    showSiteLoading();
    switchTemplate("download");
}

function transferToDownloadCanvas() {
    /// <summary>Method that transfers the original picture and then applies the selected sticker.</summary>
    var destCtx = document.getElementById('downloadPreviewCanvas');
    var sourceCtx = document.getElementById('globalCanvas');
    transferCanvas(sourceCtx, destCtx);
    var overlayDataFromJson = getStickerData(document.getElementById("selectedOverlay").value);
    var returnedImage = drawOverlayOnCanvas(destCtx, overlayDataFromJson.image);
    sendStickerEventTracking(overlayDataFromJson.id, overlayDataFromJson.title + " by " + overlayDataFromJson.designedBy);
    hideSiteLoading();
}

function resizeAndConvert(downloadCanvasElement) {
    /// <summary>Method to resize the canvas if required and download the convert the image into an image format.</summary>
    /// <param name="downloadCanvasElement" type="element">The downloadable canvas element.</param> 
    // Check if the original image exceeds the max exportable size.
    // If yes, we resize and make it smaller.
    // If no, we download without resizing.
    try{
        if (parseInt(getHdnImageWidth()) > appSettings.maxImageWidth
        && parseInt(getHdnImageHeight()) > appSettings.maxImageHeight) {
            // create a new canvas
            var newCanvas = document.createElement('canvas');
            // set its width&height to the required ones
            newCanvas.width = appSettings.maxImageWidth;
            newCanvas.height = appSettings.maxImageHeight;
            // draw our canvas to the new one
            newCanvas.getContext('2d').drawImage(downloadCanvasElement, 0, 0, downloadCanvasElement.width, downloadCanvasElement.height,
                0, 0, appSettings.maxImageWidth, appSettings.maxImageHeight);
            // return the resized canvas dataURL
            return newCanvas.toDataURL();
        }
        return downloadCanvasElement.toDataURL();
    }
    catch (err) {
        showErrorToast(errorCodes.downloadError, ["" + err.message]);
        return downloadCanvasElement.toDataURL();
    }    
}

function downloadImageToComputer() {
    /// <summary>Method to download the edited picture.</summary>
    var link = document.getElementById("downloadImageButton");
    link.href = resizeAndConvert(document.getElementById("downloadPreviewCanvas"));
    link.download = "profilesticker" + _returnComplexDate() + "" + appSettings.imageDownloadFormat;
    sendInteractionEventTracking("Download image to computer", "Button on the download page");
}


// Private method

function _returnComplexDate() {
    /// <summary>This method returns a string with the current date value in the format yyyymmddms.</summary>
    var d = new Date();
    return "" + d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate() + "" + d.getMilliseconds();
}