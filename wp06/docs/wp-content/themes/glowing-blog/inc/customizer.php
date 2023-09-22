<?php
/**
 * Glowing Blog Theme Customizer
 *
 * @package Glowing Blog
 */

// upgrade to pro.
require get_template_directory() . '/inc/customizer/upgrade-to-pro/class-customize.php';

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function glowing_blog_customize_register( $wp_customize ) {

	// Custom Controls.
	require get_template_directory() . '/inc/customizer/custom-controller.php';

	$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'glowing_blog_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'glowing_blog_customize_partial_blogdescription',
			)
		);
	}

	// Header text display setting.
	$wp_customize->add_setting(
		'glowing_blog_header_text_display',
		array(
			'default'           => true,
			'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
		)
	);

	$wp_customize->add_control(
		'glowing_blog_header_text_display',
		array(
			'section' => 'title_tagline',
			'type'    => 'checkbox',
			'label'   => esc_html__( 'Display Site Title and Tagline', 'glowing-blog' ),
		)
	);

	// Archive Page title.
	$wp_customize->add_setting(
		'glowing_blog_archive_page_title',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	$wp_customize->add_control(
		'glowing_blog_archive_page_title',
		array(
			'label'           => esc_html__( 'Archive Posts Title', 'glowing-blog' ),
			'section'         => 'static_front_page',
			'active_callback' => 'glowing_blog_is_latest_posts',
		)
	);

	// Abort if selective refresh is not available.
if ( isset( $wp_customize->selective_refresh ) ) {
	$wp_customize->selective_refresh->add_partial(
		'glowing_blog_archive_page_title',
		array(
			'selector'            => '.site-content h3.section-title',
			'settings'            => 'glowing_blog_archive_page_title',
			'container_inclusive' => false,
			'fallback_refresh'    => true,
		)
	);
}

	// Archive Page sub title.
	$wp_customize->add_setting(
		'glowing_blog_archive_page_subtitle',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	$wp_customize->add_control(
		'glowing_blog_archive_page_subtitle',
		array(
			'label'           => esc_html__( 'Archive Posts Sub Title', 'glowing-blog' ),
			'section'         => 'static_front_page',
			'active_callback' => 'glowing_blog_is_latest_posts',
		)
	);

	// Color Customizer Setting.
	require get_template_directory() . '/inc/customizer/color.php';

	// frontpage customizer section.
	require get_template_directory() . '/inc/customizer/frontpage-customizer/customizer-sections.php';

	// theme options customizer section.
	require get_template_directory() . '/inc/customizer/theme-options/theme-options-sections.php';

}
add_action( 'customize_register', 'glowing_blog_customize_register' );

// Sanitize callback.
require get_template_directory() . '/inc/customizer/sanitize-callback.php';

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function glowing_blog_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function glowing_blog_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function glowing_blog_customize_preview_js() {
	wp_enqueue_script( 'glowing-blog-customizer', get_template_directory_uri() . '/assets/js/customizer.min.js', array( 'customize-preview' ), GLOWING_BLOG_VERSION, true );
}
add_action( 'customize_preview_init', 'glowing_blog_customize_preview_js' );

/**
 * Binds JS handlers for Customizer controls.
 */
function glowing_blog_customize_control_js() {
	wp_enqueue_style( 'glowing-blog-customize-style', get_template_directory_uri() . '/assets/css/customize-controls.min.css', array(), '1.0.0' );
	wp_enqueue_script( 'glowing-blog-customize-control', get_template_directory_uri() . '/assets/js/customize-control.min.js', array( 'jquery', 'customize-controls' ), '1.0.0', true );
}
add_action( 'customize_controls_enqueue_scripts', 'glowing_blog_customize_control_js' );
