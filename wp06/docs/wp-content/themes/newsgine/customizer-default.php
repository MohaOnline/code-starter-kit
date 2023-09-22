<?php
/**
 * Default theme options.
 *
 * @package Newsgine
 */

if (!function_exists('newsgine_get_default_theme_options')):

/**
 * Get default theme options
 *
 * @since 1.0.0
 *
 * @return array Default theme options.
 */
function newsgine_get_default_theme_options() {

    $defaults = array();

    $defaults['weekly_top_title'] = 'WEEKLY TOP';
    $defaults['newsging_weekly_post'] = 1;
    $defaults['select_weekly_top_category'] = 0;

    $defaults['newsging_slider_post_section'] = 1;

    $defaults['newsging_featured_post'] = 1;

    $defaults['newsging_editor_post'] = 1;
    $defaults['newsging_editor_post_title'] = "EDITOR'S CHOICE";
    $defaults['select_editor_post_category'] = 0;
    
    $defaults['banner_right_advertisement_section'] = '';
    $defaults['banner_right_advertisement_section_url ']='#';

    $defaults['remove_header_newsgine_image_overlay'] = 1;
    
	return $defaults;

}
endif;