<?php

function glowing_blog_intro_text( $default_text ) {
	$default_text .= sprintf(
		'<p class="demo-data-download-link">%1$s <a href="%2$s" target="_blank">%3$s</a></p>',
		esc_html__( 'Demo content files for Glowing Blog Theme.', 'glowing-blog' ),
		esc_url( 'https://demo.adorethemes.com/documentations/docs/glowing-blog/demo-data/' ),
		esc_html__( 'Click here for Demo File download', 'glowing-blog' )
	);

	return $default_text;
}
add_filter( 'pt-ocdi/plugin_intro_text', 'glowing_blog_intro_text' );

/**
 * OCDI after import.
 */
function glowing_blog_after_import_setup() {
	// Assign menus to their locations.
	$primary_menu = get_term_by( 'name', 'Primary Menu', 'nav_menu' );
	$social_menu  = get_term_by( 'name', 'Social Menu', 'nav_menu' );

	set_theme_mod(
		'nav_menu_locations',
		array(
			'primary' => $primary_menu->term_id,
			'social'  => $social_menu->term_id,
		)
	);

}
add_action( 'ocdi/after_import', 'glowing_blog_after_import_setup' );
