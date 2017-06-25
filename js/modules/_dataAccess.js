/*
 * Methods to access the JSON data
 */

// Block:
// Import JSON methods

function importProfileStickerData() {
    /// <summary>Method to import sticker data.</summary>
    $.getJSON("../data/profileStickerData.json")
        .done(function (returnedData) {
            // Adds the array index value to each element. Saves time from manually adding it to the file.
            for (var j in returnedData.categories) {
                returnedData.categories[j].index = j;
                returnedData.categories[j].id = "cat" + j + "" + getRandomString();
                for (var jj in returnedData.categories[j].stickers.stickerNode) {
                    returnedData.categories[j].stickers.stickerNode[jj].id = returnedData.categories[j].stickers.stickerNode[jj].designedBy + "" + getRandomString();
                }                         
            }
            profileStickerData = returnedData;
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}

function importContributorsData() {
    /// <summary>Method to import contributors data.</summary>
    $.getJSON("../data/contributorsData.json")
        .done(function (returnedData) {
            for (var j in returnedData.contributors) {
                returnedData.contributors[j].index = j;
            }
            contributorsData = returnedData;
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}


function importFeaturedImagesData() {
    /// <summary>Method to import featured images.</summary>
    $.getJSON("../data/featuredImagesData.json")
        .done(function (returnedData) {
            for (var j in returnedData.featured) {
                returnedData.featured[j].index = j;
            }
            featuredImageData = returnedData;
            switchTemplate("featuredImages");
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}


// Block:
// Get particular details from the imported JSON data

function getStickerData(stickerId) {
    /// <summary>Method to get the sticker details based on the sticker ID.</summary>
    /// <param name="stickerId" type="string">The unique ID of the sticker element.</param> 
    for (var k = 0; k < profileStickerData.categories.length; k++) {
        for (var kk = 0; kk < profileStickerData.categories[k].stickers.stickerNode.length; kk++) {
            if (profileStickerData.categories[k].stickers.stickerNode[kk].id == stickerId) {
                return profileStickerData.categories[k].stickers.stickerNode[kk];
            }
        }
    }
}

function getStickerCategoryData(stickerId) {
    /// <summary>Method to get the sticker's category details based on the sticker's ID.</summary>
    /// <param name="stickerId" type="string">The unique ID of the sticker element.</param> 
    for (var k = 0; k < profileStickerData.categories.length; k++) {
        for (var kk = 0; kk < profileStickerData.categories[k].stickers.stickerNode.length; kk++) {
            if (profileStickerData.categories[k].stickers.stickerNode[kk].id == stickerId) {
                return profileStickerData.categories[k];
            }
        }
    }
}


function getPrintableCategoriesData(maxCategories) {
    /// <summary>Method to get the list of categories.</summary>
    /// <param name="maxCategories" type="number">The maximum number of categories to return.</param> 
    var counter = 0; var dynCategoryData = { "categories": [{}] };
    for (var k = 0; k < profileStickerData.categories.length; k++) {
        counter++;
        if (counter > maxCategories) {
            break;            
        }
        dynCategoryData.categories[k] = profileStickerData.categories[k];
    }
    return dynCategoryData;
}


function getContributorsData(contributorsId) {
    /// <summary>Method to get the contributors details based on the contributors ID.</summary>
    /// <param name="contributorsId" type="string">The unique ID of the contributors element.</param> 
    for (var k = 0; k < contributorsData.contributors.length; k++) {
        if (contributorsData.contributors[k].id == contributorsId) {
            return contributorsData.contributors[k];
        }
    }
}