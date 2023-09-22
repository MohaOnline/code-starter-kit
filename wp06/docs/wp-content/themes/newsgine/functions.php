<?php
/**
 * Theme functions and definitions
 *
 * @package Newsgine
 */
if ( ! function_exists( 'newsgine_enqueue_styles' ) ) :
	/**
	 * @since 0.1
	 */
	function newsgine_enqueue_styles() {
		wp_enqueue_style( 'newsup-style-parent', get_template_directory_uri() . '/style.css' );
		wp_enqueue_style( 'newsgine-style', get_stylesheet_directory_uri() . '/style.css', array( 'newsup-style-parent' ), '1.0' );
		wp_enqueue_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.css');
		wp_dequeue_style( 'newsup-default',get_template_directory_uri() .'/css/colors/default.css');
		wp_enqueue_style( 'newsgine-default-css', get_stylesheet_directory_uri()."/css/colors/default.css" );
		if(is_rtl()){
		wp_enqueue_style( 'newsup_style_rtl', trailingslashit( get_template_directory_uri() ) . 'style-rtl.css' );
	    }
		
	}

endif;
add_action( 'wp_enqueue_scripts', 'newsgine_enqueue_styles', 9999 );

function newsgine_theme_setup() {

//Load text domain for translation-ready
load_theme_textdomain('newsgine', get_stylesheet_directory() . '/languages');

require( get_stylesheet_directory() . '/hooks/hooks.php' );
require( get_stylesheet_directory() . '/hooks/hook-header-section.php' );
require( get_stylesheet_directory() . '/customizer-default.php' );
require( get_stylesheet_directory() . '/customizer-callback.php' );
require( get_stylesheet_directory() . '/customizer.php' );
require( get_stylesheet_directory() . '/frontpage-options.php' );
} 
add_action( 'after_setup_theme', 'newsgine_theme_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function newsgine_widgets_init() {
	

	register_sidebar( array(
		'name'          => esc_html__( 'Front-Page Left Sidebar Section', 'newsgine'),
		'id'            => 'front-left-page-sidebar',
		'description'   => '',
		'before_widget' => '<div id="%1$s" class="mg-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="mg-wid-title"><h6>',
		'after_title'   => '</h6></div>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Front-Page Right Sidebar Section', 'newsgine'),
		'id'            => 'front-right-page-sidebar',
		'description'   => '',
		'before_widget' => '<div id="%1$s" class="mg-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<div class="mg-wid-title"><h6>',
		'after_title'   => '</h6></div>',
	) );

}
add_action( 'widgets_init', 'newsgine_widgets_init' );


add_action( 'customize_register', 'newsgine_customizer_rid_values', 1000 );
function newsgine_customizer_rid_values($wp_customize) {

  $selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';

  $wp_customize->remove_control('tabbed_section_title');

  $wp_customize->remove_control('latest_tab_title');

  $wp_customize->remove_control('popular_tab_title');

  $wp_customize->remove_control('trending_tab_title');

  $wp_customize->remove_control('select_trending_tab_news_category');

  $wp_customize->remove_control('main_banner_section_background_image');

  $wp_customize->remove_control('newsup_select_slider_setting');

  $wp_customize->remove_control('show_main_news_section');

  $wp_customize->remove_control('remove_header_image_overlay');

 }

function newsgine_remove_some_widgets(){
// Unregister Frontpage sidebar
unregister_sidebar( 'front-page-sidebar' );
}
add_action( 'widgets_init', 'newsgine_remove_some_widgets', 11 );

function newsgine_menu(){ ?>
<script>
jQuery('a,input').bind('focus', function() {
    if(!jQuery(this).closest(".menu-item").length && ( jQuery(window).width() <= 992) ) {
    jQuery('.navbar-collapse').removeClass('show');
}})
</script>
<?php }
add_action( 'wp_footer', 'newsgine_menu' );