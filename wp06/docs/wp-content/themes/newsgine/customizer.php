<?php
/**
 * Newsgine Theme Customizer
 *
 * @package Newsgine
 */

if (!function_exists('newsgine_get_option')):
/**
 * Get theme option.
 *
 * @since 1.0.0
 *
 * @param string $key Option key.
 * @return mixed Option value.
 */
function newsgine_get_option($key) {

	if (empty($key)) {
		return;
	}

	$value = '';

	$default       = newsgine_get_default_theme_options();
	$default_value = null;

	if (is_array($default) && isset($default[$key])) {
		$default_value = $default[$key];
	}

	if (null !== $default_value) {
		$value = get_theme_mod($key, $default_value);
	} else {
		$value = get_theme_mod($key);
	}

	return $value;
}
endif;

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function newszine_customize_register($wp_customize) {

	
 if (isset($wp_customize->selective_refresh)) {
		$wp_customize->selective_refresh->add_partial('weekly_top_title', array(
				'selector'        => '.left-list-post h4',
				'render_callback' => 'newsgine_customize_partial_weekly_top_title',
			));
		
		$wp_customize->selective_refresh->add_partial('newsging_editor_post_title', array(
				'selector'        => '.right-list-post h4',
				'render_callback' => 'newsgine_customize_partial_newsging_editor_post_title',
			));		

	}

    $default = newsup_get_default_theme_options();

    $selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';

}
add_action('customize_register', 'newszine_customize_register');

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */

function newsgine_customize_partial_weekly_top_title()
{
	return get_theme_mod( 'weekly_top_title' );
}

function newsgine_customize_partial_newsging_editor_post_title()
{
	return get_theme_mod( 'newsging_editor_post_title' );
}