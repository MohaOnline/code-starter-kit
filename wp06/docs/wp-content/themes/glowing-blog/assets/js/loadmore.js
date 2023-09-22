jQuery(function($) {
    // Flags to find the start and ending of loading
    var loading = false;
    var ended = false;
    var selector = '.site-main';
    var button = $('button.adore-load-more-posts');
  
    // On button click check.
    button.click(function() {
      if ($(selector).length > 0) {
        if (!loading && !ended) {
          loading = true;
  
          // Get next page link
          var next_page_link = $("nav.pagination.navigation .next.page-numbers").attr("href");
          if (typeof next_page_link !== "undefined") {
            $("<div>").load(next_page_link + " " + selector, function() {
              var $blogContent = $(this).find(".site-main article");
  
              if ($('.list-layout').length > 0) {
                // if list-layout, append each item to the list-layout container
                $blogContent.each(function(i, item) {
                  var $newItem = $(item);
                  $('.list-layout').append($newItem);
                });
              }
  
              // update pagination if it exists
              var $paginationContent = $(this).find(".site-main nav.pagination.navigation");
              if ($paginationContent.length > 0) {
                $(".site-main nav.pagination.navigation").replaceWith($paginationContent);
              }
  
              // If the next link is the last, change ended to true.
              var next_page_link = $(".site-main nav.pagination.navigation .next.page-numbers").attr("href");
              if (typeof next_page_link === "undefined") {
                ended = true;
                button.hide(); // Hide the button when there are no more posts to load
              }
              loading = false;
            });
          }
        }
      }
    });
  });
  