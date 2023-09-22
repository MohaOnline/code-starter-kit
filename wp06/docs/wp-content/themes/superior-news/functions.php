<?php
/**
 * Superior News functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Superior News
 */

add_theme_support( 'title-tag' );

add_theme_support( 'automatic-feed-links' );

add_theme_support( 'register_block_style' );

add_theme_support( 'register_block_pattern' );

add_theme_support( 'responsive-embeds' );

add_theme_support( 'wp-block-styles' );

add_theme_support( 'align-wide' );

add_theme_support(
	'html5',
	array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	)
);

add_theme_support(
	'custom-logo',
	array(
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	)
);

if ( ! function_exists( 'superior_news_setup' ) ) :
	function superior_news_setup() {
		/*
		* Make child theme available for translation.
		* Translations can be filed in the /languages/ directory.
		*/
		load_child_theme_textdomain( 'superior-news', get_stylesheet_directory() . '/languages' );
	}
endif;
add_action( 'after_setup_theme', 'superior_news_setup' );

if ( ! function_exists( 'superior_news_enqueue_styles' ) ) :
	/**
	 * Enqueue scripts and styles.
	 */
	function superior_news_enqueue_styles() {
		$parenthandle = 'random-news-style';
		$theme        = wp_get_theme();

		wp_enqueue_style(
			$parenthandle,
			get_template_directory_uri() . '/style.css',
			array(
				'random-news-fonts',
				'random-news-slick-style',
				'random-news-fontawesome-style',
				'random-news-blocks-style',
			),
			$theme->parent()->get( 'Version' )
		);

		wp_enqueue_style(
			'superior-news-style',
			get_stylesheet_uri(),
			array( $parenthandle ),
			$theme->get( 'Version' )
		);

	}

endif;

add_action( 'wp_enqueue_scripts', 'superior_news_enqueue_styles' );

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses superior_news_header_style()
 */
function superior_news_custom_header_setup() {
	add_theme_support(
		'custom-header',
		apply_filters(
			'random_news_custom_header_args',
			array(
				'default-image'      => '',
				'default-text-color' => 'dd3333',
				'width'              => 1000,
				'height'             => 250,
				'flex-height'        => true,
				'wp-head-callback'   => 'random_news_header_style',
			)
		)
	);
}
add_action( 'after_setup_theme', 'superior_news_custom_header_setup' );

function superior_news_header_text_style() {
	?>
	<style type="text/css">

		/* Site title */
		.site-title a{
		color: #<?php echo esc_attr( get_header_textcolor() ); ?>;
		}
		/* End Site title */

	</style>
	<?php
}
add_action( 'wp_head', 'superior_news_header_text_style' );

function superior_news_load_custom_wp_admin_style() {
	?>
	<style type="text/css">
		.ocdi p.demo-data-download-link {
		display: none !important;
		}
	</style>
	<?php
}
add_action( 'admin_enqueue_scripts', 'superior_news_load_custom_wp_admin_style' );

// Style for demo data download link.
function superior_news_admin_panel_demo_data_download_link() {
	?>
	<style type="text/css">
		p.superior-news-demo-data {
		font-size: 16px;
		font-weight: 700;
		display: inline-block;
		border: 0.5px solid #dfdfdf;
		padding: 8px;
		background: #ffff;
		}
	</style>
	<?php
}
add_action( 'admin_enqueue_scripts', 'superior_news_admin_panel_demo_data_download_link' );

// Widgets.
require get_theme_file_path() . '/inc/widgets/widgets.php';

// Customizer.
require get_theme_file_path() . '/inc/customizer/customizer.php';

// One Click Demo Import after import setup.
if ( class_exists( 'OCDI_Plugin' ) ) {
	require get_theme_file_path() . '/inc/demo-import.php';
}
