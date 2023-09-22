<?php
require_once get_template_directory() . '/vendor/autoload.php';
// Get customizer options
use SuperbThemesCustomizer\CustomizerControls;

// New color variables
if (method_exists(CustomizerControls::class, "OverwriteDefault")) {
    CustomizerControls::OverwriteDefault(CustomizerControls::NAVIGATION_LAYOUT_STYLE, "navigation_layout_style_choice_large");
    CustomizerControls::OverwriteDefault(CustomizerControls::SITE_IDENTITY_HIDE_TAGLINE, "0");
    CustomizerControls::OverwriteDefault('--superb-pixels-primary', "#ffc934");
    CustomizerControls::OverwriteDefault('--superb-pixels-primary-dark', "#eab830");
    CustomizerControls::OverwriteDefault('--superb-pixels-secondary', "#eeeeee");
    CustomizerControls::OverwriteDefault('--superb-pixels-secondary-dark', "#e3e3e3");
    CustomizerControls::OverwriteDefault(CustomizerControls::BLOGFEED_COLUMNS_STYLE, "blogfeed_twocolumn_masonry");
    CustomizerControls::OverwriteDefault(CustomizerControls::BLOGFEED_HIDE_SIDEBAR, "blogfeed_show_sidebar");


}


// Get stylesheet
add_action('wp_enqueue_scripts', 'elegant_news_magazine_enqueue_styles');
function elegant_news_magazine_enqueue_styles()
{
    wp_enqueue_style('elegant-news-magazine-parent-style', get_template_directory_uri() . '/style.css');
}



// New fonts
function elegant_news_magazine_enqueue_assets()
{
    // Include the file.
    require_once get_theme_file_path('webfont-loader/wptt-webfont-loader.php');
    // Load the webfont.
    wp_enqueue_style(
        'elegant-news-magazine-fonts',
        wptt_get_webfont_url('https://fonts.googleapis.com/css2?family=Jost:wght@600&family=Lato:wght@400;700&display=swap'),
        array(),
        '1.0'
    );
}
add_action('wp_enqueue_scripts', 'elegant_news_magazine_enqueue_assets');
