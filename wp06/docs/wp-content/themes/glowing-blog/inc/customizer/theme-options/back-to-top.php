<?php
/**
 * Back To Top settings
 */

$wp_customize->add_section(
	'glowing_blog_back_to_top_section',
	array(
		'title'    => esc_html__( 'Scroll Up ( Back To Top )', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 80,
	)
);

// Scroll to top enable setting.
$wp_customize->add_setting(
	'glowing_blog_enable_scroll_to_top',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);
$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_scroll_to_top',
		array(
			'label'    => esc_html__( 'Enable scroll to top.', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_scroll_to_top',
			'section'  => 'glowing_blog_back_to_top_section',
			'type'     => 'checkbox',
		)
	)
);
