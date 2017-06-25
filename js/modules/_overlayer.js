/*
 * Methods contributing to the overlay page
 */

function transferToOverlayCanvas() {
    /// <summary>Method to copy the canvas image to the overlay canvas.</summary>
    var destCtx = document.getElementById('overlayMainCanvas');
    var sourceCtx = document.getElementById('globalCanvas');
    transferCanvas(sourceCtx, destCtx);
    loadOverlaySelectionPageComponents();
}

function loadOverlaySelectionPageComponents() {
    /// <summary>Method to populate the overlay selection page per component.</summary>
    printCategories();
    if (getHdnSelectedCategory() == null || getHdnSelectedCategory() == "") {
        setHdnSelectedCategory(0);
    }
    printOverlaySkeleton(profileStickerData.categories[getHdnSelectedCategory()].stickers);
}

function printOverlaySkeleton(data) {
    /// <summary>Method to load the overlay skeleton template in the overlay selection page.</summary>
    switchTemplateView = data;
    switchTemplate("overlayGrid");
}


// Block:
// Categories

function printCategories() {
    /// <summary>Method to load the categories above the grid in the overlay selection page.</summary>
    printCategoriesView = {};
    printCategoriesView = loadPrintableCategories();
    switchTemplate("categories");
}

function selectCategory(arrayIndex, forceUpdate) {
    /// <summary>Method that selects the category from the more categories popup.</summary>
    /// <param name="arrayIndex" type="number">The array index value of the selected category.</param>     
    /// <param name="forceUpdate" type="boolean">A boolean value deciding to force an update on the overlay grid or not.</param>     
    reloadGrid(arrayIndex, forceUpdate);
}

// Block:
// Sticker preview area

function loadPreviewStickerArea(stickerId) {
    /// <summary>Method to fill up the preview sticker area.</summary>
    /// <param name="stickerId" type="string">The sticker's ID.</param> 
    var stickerDetails = {}; stickerDetails.stickerNode = [];
    stickerDetails.stickerNode[0] = getStickerData(stickerId);
    var contributorsDetails = getContributorsData(stickerDetails.stickerNode[0].designedBy);
    var categoryDetails = getStickerCategoryData(stickerDetails.stickerNode[0].id);
    if (stickerDetails != null && contributorsDetails != null) {
        stickerDetails.stickerNode[0].designedByFullname = contributorsDetails.fullName;
        stickerDetails.stickerNode[0].designedByWebsite = contributorsDetails.website;
        stickerDetails.stickerNode[0].categoryName = categoryDetails.title;
    }
    switchTemplateView = stickerDetails;
    switchTemplate("previewedSticker");
}

function applyPreviewSticker() {
    /// <summary>Method to apply the selected sticker in the left side preview image in the preview sticker area.</summary>
    var destCtx = document.getElementById("overlayMainCanvas");
    var returnedImage = drawOverlayOnCanvas(destCtx, $("#previewedImageUrl").attr("data-imageUrl"));
    $(".preview-sticker-area").removeClass("off-focus");
}

function removePreviewSticker() {
    /// <summary>Method to remove the selected sticker in the left side preview image in the preview sticker area.</summary>
    var destCtx = document.getElementById('overlayMainCanvas');
    var sourceCtx = document.getElementById('globalCanvas');
    transferCanvas(sourceCtx, destCtx);
    $(".preview-sticker-area").addClass("off-focus");
}

// Block:
// More categories

function openMoreCategories() {
    /// <summary>Method to open more categories popup.</summary>
    $('#commonModal').modal('show');
    switchTemplate("moreCategories");
}

function loadPrintableCategories() {
    /// <summary>Method to load the categories based on the device width.</summary>
    var breakpoint = 0;
    if ($(window).width() <= appSettings.categoriesBreakpointXs) {
        breakpoint = appSettings.categoriesBreakpointXsValue;
    }
    else if ($(window).width() > appSettings.categoriesBreakpointXs
        && $(window).width() <= appSettings.categoriesBreakpointSm) {
        breakpoint = appSettings.categoriesBreakpointSmValue;
    }
    else if ($(window).width() > appSettings.categoriesBreakpointSm
        && $(window).width() <= appSettings.categoriesBreakpointMd) {
        breakpoint = appSettings.categoriesBreakpointMdValue;
    }
    else if ($(window).width() > appSettings.categoriesBreakpointMd
        && $(window).width() <= appSettings.categoriesBreakpointLg) {
        breakpoint = appSettings.categoriesBreakpointLgValue;
    }
    else {
        breakpoint = appSettings.categoriesBreakpointXLgValue;
    }
    return getPrintableCategoriesData(breakpoint);
}


// Block:
// Sticker grid

function selectGrid(stickerId) {
    /// <summary>Method that selects the category from the more categories popup.</summary>
    /// <param name="stickerId" type="string">The sticker's ID.</param> 
    if (getHdnSelectedOverlay() != stickerId) {
        printSelected(stickerId);
        setHdnSelectedOverlay(stickerId);
        removePreviewSticker();
        loadPreviewStickerArea(stickerId);
    }    
}

function printSelected(stickerId) {
    /// <summary>Method to show a visual indication that the sticker is selected.</summary>
    /// <param name="stickerId" type="string">The sticker's ID.</param> 
    $(".selected-text").html("");
    $("#selected-" + stickerId).html("<span><i class='mdi mdi-check'></i>Selected</span>");
}

function populateOverlaysInTheGrid(currentChildNode) {
    /// <summary>Method to populate the overlay grid component.</summary>
    /// <param name="currentChildNode" type="object">The overlay data.</param> 
    for (var i = 0; i < currentChildNode.stickerNode.length; i++) {
        createSingleOverlay(currentChildNode.stickerNode[i]);
    }
    hideSiteLoading();
    if (getHdnSelectedOverlay() == null || getHdnSelectedOverlay() == "") {
        setHdnSelectedOverlay(profileStickerData.categories[0].stickers.stickerNode[0].id);
    }
    loadPreviewStickerArea(getHdnSelectedOverlay());
    printSelected(getHdnSelectedOverlay());
    initializeBootstrapTooltip();
}

function createSingleOverlay(currentNode) {
    /// <summary>Method to create a single overlay.</summary>
    /// <param name="currentNode" type="object">The overlay data.</param> 
    try {
        // Copy canvas from main to the current canvas in the grid and then place
        // the overlay image on it.
        var destCtx = document.getElementById('' + currentNode.id);
        var sourceCtx = document.getElementById('globalCanvas');
        transferCanvasSquare(sourceCtx, destCtx);
        var returnedImage = drawOverlayOnCanvas(destCtx, currentNode.image);
    }
    catch (err) {
        console.log("Error: createSingleOverlay " + err.message);
    }
}

function reloadGrid(newCategory, forceUpdate) {
    /// <summary>Method to reload the overlay grid again with the overlays.</summary>
    /// <param name="newCategory" type="number">The array index of the category selected.</param> 
    /// <param name="forceUpdate" type="boolean">True if the overlay grid needs to be reloaded even if the current category is the same.</param> 
    if (newCategory == "more-categories") {
        openMoreCategories();
    }
    else {
        if (forceUpdate == 'true' || newCategory != getHdnSelectedCategory()) {
            setHdnSelectedCategory(newCategory);
            sendInteractionEventTracking("Category clicked", "Title: " + profileStickerData.categories[newCategory].title + " ID:" + profileStickerData.categories[newCategory].id);
            printOverlaySkeleton(profileStickerData.categories[newCategory].stickers);
        }
    }
}




