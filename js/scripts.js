(function ($) {
    $(document).ready(function () {

        var jsonLinkWeb = 'https://content.xynie.com/feed/fashion-section.json';

        // Fetch json and build html structure.
        $.getJSON(jsonLinkWeb, function(data) {
            console.log("Fetched JSON from web");
            buildHtml(data);
        }).fail(function() {
            console.log("JSON data not found");
        })

    });

})(jQuery);

/**
 * Helper function to build html structure. 
 * @param jsonData 
 *  Json data 
 */
var buildHtml = function(jsonData) {
    if (typeof jsonData !== 'object' || jsonData === null) {
        return false;
    }

    // Sort by viewCount
    jsonData.sort(compare);
    
    var item = '';
    var counter = 0;
    jQuery.each(jsonData, function (key, val) {
        var imageData = '';
        if (counter % 2 == 0) {
            imageData = (val.image === undefined || val.image === null) ? '' : val.image;
        } else {
            imageData = (val.wideImage === undefined || val.wideImage === null) ? '' : val.wideImage ;
        }
        if (imageData.url !== '' && imageData.url !== undefined && imageData.url !== null) {
            var title = (val.title === undefined || val.title === null) ? '' : val.title;
            var link = (val.path === undefined || val.path === null) ? '' : val.path;

            item += '<div class="col-xs-6 col-md-2 col-sm-4 item">';
            item += '<div class="thumbnail">';
            item += '<div class="image-container">';
            item += '<a title="' + title + '" href="http://www.pinkvilla.com' + link + '" target="_blank" rel="noreferrer">';
            item += '<img alt="' + title + '" src="' + imageData.url + '">';
            item += '<div class="image-middle-text">';
            item += '<div class="text-oepn">Open</div>';
            item += '</div>'; // Closed image-middle-text div.
            item += '</a>'; // Closed image-container div link
            item += '<div class="image-bottom-left-text">';
            item += '<a title="pinkvilla.com" href="http://www.pinkvilla.com" target="_blank" rel="noreferrer">';
            item += '<div class="text-sitename"><span class="glyphicon glyphicon-arrow-up"></span> pinkvilla.com</div>';
            item += '</a>';
            item += '</div>'; // Closed image-middle-text div.
            item += '</div>'; // Closed thumbnail-img div.
            item += '<div class="caption">';
            item += '<p><a href="http://www.pinkvilla.com' + link + '" target="_blank" rel="noreferrer">' + title + '</a><p>';
            item += '</div>';  // Closed caption div.
            item += '</div>';  // Closed thumbnail div.
            item += '</div>';  // Closed bootstrap column div.
            counter++;
        }
    });

    if (jQuery('.masonry-container').length != 0 && counter != 0) {
        jQuery(".masonry-container").append(item);
        loadMasonary();
    }
}

/**
 * Helper function to sort article by view count
 * @param a
 *  First article data
 * @param b 
 *  Second article data
 */
var compare = function(a, b) {
    const viewCountA = parseInt(a.viewCount);
    const viewCountB = parseInt(b.viewCount);
    let comparison = 0;
    if (viewCountA < viewCountB) {
        comparison = 1;
    } else if (viewCountA > viewCountB) {
        comparison = -1;
    }
    return comparison;
}

/**
 * Function to initialize masonry library.
 */
var loadMasonary = function() {
    var $container = jQuery('.masonry-container');
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item',
        });

        hideLoader();
    });
}

/**
 * Function to hide loader.
 */
var hideLoader = function() {
    if (jQuery('.loader-container').length != 0 && jQuery('.loader-container').css('opacity') == '1') {
       jQuery('.loader-container').fadeOut();
    }
}