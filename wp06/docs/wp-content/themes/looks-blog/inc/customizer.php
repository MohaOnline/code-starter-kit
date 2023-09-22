<?php
/**
 * looks-blog Theme Customizer
 *
 * @package looks-blog
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function looks_blog_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'looks_blog_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'looks_blog_customize_partial_blogdescription',
			)
		);
	}

	include get_template_directory() . '/inc/upgrade-to-pro.php';

	$wp_customize->register_section_type( 'looks_blog_Customize_Upsell_Section' );

	// Register section.
	$wp_customize->add_section(
		new looks_blog_Customize_Upsell_Section(
			$wp_customize,
			'theme_upsell',
			array(
				'title'    => esc_html__( 'Looks Blog Pro', 'looks-blog' ),
				'pro_text' => esc_html__( 'Buy Pro', 'looks-blog' ),
				'pro_url'  => 'https://crimsonthemes.com/downloads/looks-blog-pro/',
				'priority' => 10,
			)
		)
	);

}
add_action( 'customize_register', 'looks_blog_customize_register' );


/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function looks_blog_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function looks_blog_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function looks_blog_customize_preview_js() {
	wp_enqueue_script( 'looks-blog-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), 20151215, true );

}
add_action( 'customize_preview_init', 'looks_blog_customize_preview_js' );

/**
 * Enqueue style for custom customize control.
 */
function looks_blog_custom_customizer_scripts() {

	wp_enqueue_script( 'looks-blog-customize-controls', get_template_directory_uri() . '/assets/js/customize-controls.js', array( 'customize-controls' ) );

}
add_action( 'customize_controls_enqueue_scripts', 'looks_blog_custom_customizer_scripts' );