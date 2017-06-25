/*
 *
 */

function handleImage(e) {
    testN();
    console.log("handle image");
    var reader = new FileReader();
    var url = document.getElementById('imageLoader').value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

    if (!e.target.files) {
        console.log("no image selected");
        document.getElementById('statusOfPicture').innerHTML = "";
    }
    if (e.target.files[0] && (ext == "png" || ext == "jpeg" || ext == "jpg")) {
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                //canvas.width = 200;
                //canvas.height = 200;
                //img.height = 200;
                //img.width = 200;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
            document.getElementById('statusOfPicture').innerHTML = "Loaded";
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    else {
    }
}

// Convert a data URI to blob
function dataURItoBlob(dataURI) {
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

/**
        * This is the function that will take care of image extracting and
        * setting proper filename for the download.
        * IMPORTANT: Call it from within a onclick event.
       */
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;

}

/*
 *
 *
 */

function postNewPicture(authToken) {
    var canvas = document.getElementById("imageCanvas");
    var imageData = canvas.toDataURL("image/png");
    try {
        blob = dataURItoBlob(imageData);
    } catch (e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", "Photo Text");
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);
                $("#poster").html("Posted Canvas Successfully");
            },
            error: function (shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function () {
                console.log("Posted to facebook");
            }
        });

    } catch (e) {
        console.log(e);
    }

}

function logout() {
    FB.logout(function (response) {
        // user is now logged out
    });
}

var _authToken;
function login() {
    FB.login(function (response) {
        // handle the response
        console.log("Response goes here!");
        document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large");
        drawFBPictureToCanvas("http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large");
        console.log(response);
        console.log(response.authResponse.userID);
        //readAlbum(response.authResponse.userID);
        _authToken = response.authResponse.accessToken
        //postNewPicture(response.authResponse.accessToken);
    }, { scope: 'email, user_photos, publish_actions, publish_stream' });
}


//    function readAlbum(manuserid) {
//        FB.api(
//"/" + manuserid + "/albums",
//function (response) {
//    if (response && !response.error) {
//        console.log("albums");
//        console.log(response);
//        console.log(response.data[0].id);
//        postNewPicture('219218548577986');
//        //"219218548577986" test
//        //createAlbum(manuserid)
//    }
//}
//);
//    }

//    function createAlbum(manuserid) {
//        FB.api(
//"/" + manuserid + "/albums",
//    "POST",
//    {
//        "name": "test"
//    },
//function (response) {
//    if (response && !response.error) {
//        console.log("create album");
//        console.log(response);
//    }
//}
//);
//    }

function postToFacebook() {
    postNewPicture(_authToken);
}

/*
 * overlay
 */

function drawFBPictureToCanvas(imageUrl) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    canvas.width = 200;
    canvas.height = 200;
    img.height = 200;
    img.width = 200;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
    img.src = imageUrl;
}

var canvas = document.getElementById("imageCanvas");
var img2;
function createOverlayMagic() {
    console.log("overlay magic");

    //var img1 = loadImage('http://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png', main);
    img2 = loadImage();
    // composite now
    //ctx.drawImage(img1, 0, 0);

    //ctx.globalAlpha = 0.5;
   
}

function doTheMagic() {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img2, 20, 20);
}


function loadImage() {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();
    img.onload = doTheMagic;
    img.height = "20";
    img.width = "20";
    img.src = "../images/coin.png";
    return img;
}
var x = 10;

// Test M
var testM = function () {

}

function testN() {
    console.log(x);
}