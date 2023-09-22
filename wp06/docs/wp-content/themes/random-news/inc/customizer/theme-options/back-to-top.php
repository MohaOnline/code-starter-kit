<?php
/**
 * Back To Top settings
 */

$wp_customize->add_section(
	'random_news_back_to_top_section',
	array(
		'title'    => esc_html__( 'Scroll Up ( Back To Top )', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 90
	)
);

// Scroll to top enable setting.
$wp_customize->add_setting(
	'random_news_enable_scroll_to_top',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);
$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_scroll_to_top',
		array(
			'label'    => esc_html__( 'Enable scroll to top.', 'random-news' ),
			'settings' => 'random_news_enable_scroll_to_top',
			'section'  => 'random_news_back_to_top_section',
			'type'     => 'checkbox',
		)
	)
);
