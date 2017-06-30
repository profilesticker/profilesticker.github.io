/*
 * Method revolving around templating 
 */

// View names
var templateNames = {
    home: "home",
    websiteHeader: "websiteHeader",
    featuredImages: "featuredImages",
    crop: "crop",
    overlay: "overlay",
    previewedSticker: "previewedSticker",
    categories: "categories",
    moreCategories: "moreCategories",
    overlayGrid: "overlayGrid",
    overlayDetails: "overlayDetails",
    overlayDetailsActionButtons: "overlayDetailsActionButtons",
    download: "download",
    pageNotFound: "pageNotFound",
    canvasNotSupported: "canvasNotSupported",
    about: "about",
    legal: "legal",
    footer: "footer",
    comingSoon: "comingSoon"
}

var templateCacheHolder = {
    home: "",
    websiteHeader: "",
    featuredImages: "",
    crop: "",
    overlay: "",
    previewedSticker: "",
    categories: "",
    moreCategories: "",
    overlayGrid: "",
    overlayDetails: "",
    overlayDetailsActionButtons: "",
    download: "",
    pageNotFound: "",
    canvasNotSupported: "",
    about: "",
    legal: "",
    footer: "",
    comingSoon: ""
}

var switchTemplateView = {};
var printCategoriesView = {};

var categoryChoicesHTMLHolder = "";

function switchTemplate(templateName) {
    /// <summary>Method to switch to a different template.</summary>
    /// <param name="templateName" type="string">The template to be loaded.</param> 
    if (templateName == templateNames.home) {
        if (templateCacheHolder.home == "" || templateCacheHolder.home == null) {
            $("#templateHolder").load("partials/home.html #homePartial", function () {
                templateCacheHolder.home = document.getElementById('homePartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.home, switchTemplateView, "#view");
                setCurrentPageView(templateNames.home);
                bindHomeTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.home, switchTemplateView, "#view");
            setCurrentPageView(templateNames.home);
            bindHomeTemplateJS();
        }
    }
    else if (templateName == templateNames.websiteHeader) {
        if (templateCacheHolder.websiteHeader == "" || templateCacheHolder.websiteHeader == null) {
            $("#websiteHeaderViewTemplateHolder").load("partials/websiteHeader.html #websiteHeaderPartial", function () {
                templateCacheHolder.websiteHeader = document.getElementById('websiteHeaderPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.websiteHeader, switchTemplateView, "#websiteHeaderView");
                bindWebsiteHeaderTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.websiteHeader, switchTemplateView, "#websiteHeaderView");
            bindWebsiteHeaderTemplateJS();
        }
    }
    else if (templateName == templateNames.featuredImages) {
        if (templateCacheHolder.featuredImages == "" || templateCacheHolder.featuredImages == null) {
            $("#featuredImagesHolder").load("partials/featuredImages.html #featuredImagesPartial", function () {
                templateCacheHolder.featuredImages = document.getElementById('featuredImagesPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.featuredImages, featuredImageData, "#featuredImagesView");
                bindFeaturedImagesTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.featuredImages, featuredImageData, "#featuredImagesView");
            bindFeaturedImagesTemplateJS();
        }
    }
    else if (templateName == templateNames.footer) {
        if (templateCacheHolder.footer == "" || templateCacheHolder.footer == null) {
            $("#footerTemplateHolder").load("partials/footer.html #footerPartial", function () {
                templateCacheHolder.footer = document.getElementById('footerPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.footer, featuredImageData, "#footerView");
                bindFooterTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.footer, featuredImageData, "#footerView");
            bindFooterTemplateJS();
        }
    }
    else if (templateName == templateNames.crop) {
        if (templateCacheHolder.crop == "" || templateCacheHolder.crop == null) {
            $("#templateHolder").load("partials/crop.html #cropPartial", function () {
                templateCacheHolder.crop = document.getElementById('cropPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.crop, switchTemplateView, "#view");
                setCurrentPageView(templateNames.crop);
                bindCropTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.crop, switchTemplateView, "#view");
            setCurrentPageView(templateNames.crop);
            bindCropTemplateJS();
        }
    }
    else if (templateName == templateNames.overlay) {
        if (templateCacheHolder.overlay == "" || templateCacheHolder.overlay == null) {
            $("#templateHolder").load("partials/overlays.html #overlaysPartial", function () {
                templateCacheHolder.overlay = document.getElementById('overlaysPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.overlay, switchTemplateView, "#view");
                setCurrentPageView(templateNames.overlay);
                importContributorsData();
                bindOverlayTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.overlay, switchTemplateView, "#view");
            setCurrentPageView(templateNames.overlay);
            bindOverlayTemplateJS();
        }
    }
    else if (templateName == templateNames.previewedSticker) {
        if (templateCacheHolder.previewedSticker == "" || templateCacheHolder.previewedSticker == null) {
            $("#previewedStickerTemplateHolder").load("partials/previewedSticker.html #previewedStickerPartial", function () {
                templateCacheHolder.previewedSticker = document.getElementById('previewedStickerPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.previewedSticker, switchTemplateView, "#previewedStickerView");
                bindPreviewedStickerTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.previewedSticker, switchTemplateView, "#previewedStickerView");
            bindPreviewedStickerTemplateJS();
        }
    }
    else if (templateName == templateNames.download) {
        if(templateCacheHolder.download == "" || templateCacheHolder.download == null){
            $("#templateHolder").load("partials/download.html #downloadPartial", function () {
                templateCacheHolder.download = document.getElementById('downloadPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.download, switchTemplateView, "#view");
                setCurrentPageView(templateNames.download);
                bindDownloadTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.download, switchTemplateView, "#view");
            setCurrentPageView(templateNames.download);
            bindDownloadTemplateJS();
        }
    }
    else if (templateName == templateNames.categories) {
        if (templateCacheHolder.categories == "" || templateCacheHolder.categories == null) {
            $("#overlayChoicesTemplateHolder").load("partials/overlayCategoryChoices.html #overlayCategoryChoicesPartial", function () {
                templateCacheHolder.categories = document.getElementById('overlayCategoryChoicesPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.categories, printCategoriesView, "#overlayCategoryChoices");
                bindCategoriesTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.categories, printCategoriesView, "#overlayCategoryChoices");
            bindCategoriesTemplateJS();
        }        
    }
    else if (templateName == templateNames.moreCategories) {
        if (templateCacheHolder.moreCategories == "" || templateCacheHolder.moreCategories == null) {
            $("#modalHolder").load("partials/moreCategories.html #moreCategoriesPartial", function () {
                templateCacheHolder.moreCategories = document.getElementById('moreCategoriesPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.moreCategories, profileStickerData, "#modalView");
                bindMoreCategoriesTemplateJS();
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.moreCategories, profileStickerData, "#modalView");
            bindMoreCategoriesTemplateJS();
        }
    }
    else if (templateName == templateNames.overlayGrid) {
        if (templateCacheHolder.overlayGrid == "" || templateCacheHolder.overlayGrid == null) {
            $("#overlayGridTemplateHolder").load("partials/overlayGrid.html #overlayGridPartial", function () {
                templateCacheHolder.overlayGrid = document.getElementById('overlayGridPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.overlayGrid, switchTemplateView, "#overlayGrid");
                bindOverlayGridTemplateJS();
                populateOverlaysInTheGrid(switchTemplateView);
                
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.overlayGrid, switchTemplateView, "#overlayGrid");
            bindOverlayGridTemplateJS();
            populateOverlaysInTheGrid(switchTemplateView);
        }
    }
    else if (templateName == templateNames.about) {
        if (templateCacheHolder.about == "" || templateCacheHolder.about == null) {
            $("#modalHolder").load("partials/about.html #aboutPartial", function () {
                templateCacheHolder.about = document.getElementById('aboutPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.about, switchTemplateView, "#modalView");
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.about, switchTemplateView, "#modalView");
        }
    }
    else if (templateName == templateNames.legal) {
        if (templateCacheHolder.legal == "" || templateCacheHolder.legal == null) {
            $("#modalHolder").load("partials/legal.html #legalPartial", function () {
                templateCacheHolder.legal = document.getElementById('legalPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.legal, switchTemplateView, "#modalView");
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.legal, switchTemplateView, "#modalView");
        }
    }
    else if (templateName == templateNames.canvasNotSupported) {
        if (templateCacheHolder.canvasNotSupported == "" || templateCacheHolder.canvasNotSupported == null) {
            $("#templateHolder").load("partials/canvasNotSupported.html #canvasNotSupportedPartial", function () {
                templateCacheHolder.canvasNotSupported = document.getElementById('canvasNotSupportedPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.canvasNotSupported, switchTemplateView, "#view");
                setCurrentPageView(templateNames.canvasNotSupported);
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.canvasNotSupported, switchTemplateView, "#view");
            setCurrentPageView(templateNames.canvasNotSupported);
        }
    }
    else if (templateName == templateNames.comingSoon) {
        if (templateCacheHolder.comingSoon == "" || templateCacheHolder.comingSoon == null) {
            $("#templateHolder").load("partials/comingSoon.html #comingSoonPartial", function () {
                templateCacheHolder.comingSoon = document.getElementById('comingSoonPartial').innerHTML;
                extendedTemplateGeneration(templateCacheHolder.comingSoon, switchTemplateView, "#view");
                hideSiteLoading();
                setCurrentPageView(templateNames.comingSoon);
            });
        }
        else {
            extendedTemplateGeneration(templateCacheHolder.comingSoon, switchTemplateView, "#view");
            hideSiteLoading();
            setCurrentPageView(templateNames.comingSoon);
        }
    }
    else{
    }    
}

function extendedTemplateGeneration(htmlTemplate, jsData, htmlContainerId) {
    /// <summary>Helper method to cache partial views and not request again.</summary>
    var output = Mustache.render(htmlTemplate, jsData);
    $(htmlContainerId).html(output);
}


// Block:
// Methods to navigate between various views

function loadAboutModal() {
    /// <summary>Method to load contents of the about modal.</summary>
    switchTemplate("about");
    initializeBootstrapTooltip();
    sendInteractionEventTracking("About view", "Clicked the about link from the website's footer");
}

function loadLegalModal() {
    /// <summary>Method to load contents of the legal modal.</summary>
    switchTemplate("legal");
    initializeBootstrapTooltip();
    sendInteractionEventTracking("Legal view", "Clicked the legal link from the website's footer");
}

function switchToHomePage() {
    /// <summary>Method to load the home page.</summary>
    if (getCurrentPageView() != "home" && appSettings.websiteReleased) {
        switchTemplate("home");
        setHdnSelectedCategory(0);
        setHdnSelectedOverlay("");
        sendInteractionEventTracking("Profile Sticker logo", "Navigate to the home page view");
    }
    else {
        // Display a notification only if the user clicks the logo more than 3 times
        incrementHomeViewErrorCounterValue();
        if (getHomeViewErrorCounterValue() > appSettings.maxHomePageClicks) {
            showToast("info", "You're already on the home page.", false);
            setHomeViewErrorCounterValue(0);
        }
    }
}

function goBack() {
    /// <summary>Method to navigate one step back.</summary>
    showSiteLoading();
    if (getCurrentPageView() == templateNames.crop) {
        switchTemplate(templateNames.home);
    }
    else if (getCurrentPageView() == templateNames.overlay) {
        switchTemplate(templateNames.crop);
    }
    else if (getCurrentPageView() == templateNames.download) {
        switchTemplate(templateNames.overlay);
    }
    else {
        switchTemplate(templateNames.home);       
    }
}


// Block:
// Methods that bind newly added DOM elements to their event listeners.

function bindHomeTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners associated with the home template.</summary>
    hideSiteLoading();
    initializeBootstrapTooltip();
    document.getElementById('uploadComputerImage')
        .addEventListener('change', handleUploadedImage, false);
    importFeaturedImagesData();
}

function bindWebsiteHeaderTemplateJS() {
    /// <summary>Method that binds the JS slick slideshow to the newly added DOM elements.</summary>
    initializeBootstrapTooltip();
}

function bindFeaturedImagesTemplateJS() {
    /// <summary>Method that binds the JS slick slideshow to the newly added DOM elements.</summary>
    $('.featured-images').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        dots: false,
        arrows: false,
        autoplaySpeed: 2000,
        mobileFirst: true,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 544,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 410,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }]
    });
}

function bindFooterTemplateJS() {
    /// <summary>Method that binds the JS slick slideshow to the newly added DOM elements.</summary>
    initializeBootstrapTooltip();
}

function bindCropTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners associated with the crop template.</summary>
    document.getElementById('cropButton')
        .addEventListener('click', cropThePicture, false);
    setTimeout(transferToCropCanvas, 2000);
}

function bindOverlayTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners associated with the overlay template.</summary>
    initializeBootstrapTooltip();
    setTimeout(transferToOverlayCanvas, 2000);
    $('#unitsToggle').on('change', function () {
        if ($(this).is(':checked')) {
            // If checked, the preview sticker area is shown and the sticker is applied to the image.
            applyPreviewSticker();
            setHdnDisplayPreview('1');            
        } else {
            removePreviewSticker();
            setHdnDisplayPreview('0');           
        }
    });
}

function bindPreviewedStickerTemplateJS() {
    /// <summary>Method that binds the JS methods and events listeners when the component is loaded.</summary>
    initializeBootstrapTooltip();
    if (getHdnDisplayPreview() == '1') {
        // If the toggle was turned off then the sticker preview will not be applied.
        $('#unitsToggle').attr('checked', true);
        applyPreviewSticker();
    }
    else {
        $(".preview-sticker-area").addClass("off-focus");
    }
}

function bindCategoriesTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners when the component is loaded.</summary>
    initializeBootstrapTooltip();
    $(window).resize(function () {
        // $('.overlay-grid-container').perfectScrollbar('destroy');
        printCategories();
        //$('.overlay-grid-container').perfectScrollbar('update');  // Update
    });
}

function bindMoreCategoriesTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners when the component is loaded.</summary>
    initializeBootstrapTooltip();
    // $(".more-categories-block").perfectScrollbar();
}

function bindDownloadTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners associated with the download template.</summary>
    initializeBootstrapTooltip();
    setTimeout(transferToDownloadCanvas, 2000);
}

function bindOverlayGridTemplateJS() {
    /// <summary>Method that binds the JS methods and event listeners associated with the download template.</summary>
   // $('.overlay-grid-container').perfectScrollbar();
    printSelected(getHdnSelectedOverlay());
}
