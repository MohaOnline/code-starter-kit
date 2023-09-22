<?php

/**
 * Color Options
 */

// Site tagline color setting.
$wp_customize->add_setting(
	'random_news_header_tagline',
	array(
		'default'           => '#404040',
		'sanitize_callback' => 'random_news_sanitize_hex_color',
	)
);

$wp_customize->add_control(
	new WP_Customize_Color_Control(
		$wp_customize,
		'random_news_header_tagline',
		array(
			'label'   => esc_html__( 'Site tagline Color', 'random-news' ),
			'section' => 'colors',
		)
	)
);
