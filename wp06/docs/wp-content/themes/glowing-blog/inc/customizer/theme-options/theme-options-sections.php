<?php

/**
 * Theme Options Customizer.
 */

$wp_customize->add_panel(
	'glowing_blog_theme_options_panel',
	array(
		'title'    => esc_html__( 'Theme Options', 'glowing-blog' ),
		'priority' => 150,
	)
);

$theme_options_customizer = array( 'font-options', 'breadcrumb', 'archive-options', 'sidebar-layout', 'pagination', 'single-post', 'footer', 'back-to-top' );

foreach ( $theme_options_customizer as $customizer ) {
	require get_template_directory() . '/inc/customizer/theme-options/' . $customizer . '.php';

}
