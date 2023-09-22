<?php
/**
 * Header Options settings
 */

$wp_customize->add_section(
	'random_news_header_options_section',
	array(
		'title'    => esc_html__( 'Header Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 10
	)
);

// Enable topbar Options.
$wp_customize->add_setting(
	'random_news_enable_topbar',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_topbar',
		array(
			'label'    => esc_html__( 'Enable Topbar.', 'random-news' ),
			'section'  => 'random_news_header_options_section',
			'settings' => 'random_news_enable_topbar',
			'type'     => 'checkbox',
		)
	)
);
