<?php

// Header Section Advertisement Image.
$wp_customize->add_setting(
	'superior_news_advertisement_image',
	array(
		'default'           => '',
		'sanitize_callback' => 'random_news_sanitize_image',
	)
);

$wp_customize->add_control(
	new WP_Customize_Image_Control(
		$wp_customize,
		'superior_news_advertisement_image',
		array(
			'label'    => esc_html__( 'Advertisement Image', 'superior-news' ),
			'settings' => 'superior_news_advertisement_image',
			'section'  => 'random_news_header_options_section',
		)
	)
);

	// Header Advertisement Url.
$wp_customize->add_setting(
	'superior_news_advertisement_url',
	array(
		'default'           => '#',
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'superior_news_advertisement_url',
	array(
		'label'    => esc_html__( 'Advertisement Url', 'superior-news' ),
		'settings' => 'superior_news_advertisement_url',
		'section'  => 'random_news_header_options_section',
		'type'     => 'url',
	)
);
