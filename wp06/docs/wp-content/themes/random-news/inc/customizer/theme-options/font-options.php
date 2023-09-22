<?php

/**
 * Font section
 */

// Font section.
$wp_customize->add_section(
	'random_news_font_options',
	array(
		'title'    => esc_html__( 'Font ( Typography ) Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 20
	)
);

// Typography - Site Title Font.
$wp_customize->add_setting(
	'random_news_site_title_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'random_news_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'random_news_site_title_font',
	array(
		'label'    => esc_html__( 'Site Title Font Family', 'random-news' ),
		'section'  => 'random_news_font_options',
		'settings' => 'random_news_site_title_font',
		'type'     => 'select',
		'choices'  => random_news_font_choices(),
	)
);

// Typography - Site Description Font.
$wp_customize->add_setting(
	'random_news_site_description_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'random_news_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'random_news_site_description_font',
	array(
		'label'    => esc_html__( 'Site Description Font Family', 'random-news' ),
		'section'  => 'random_news_font_options',
		'settings' => 'random_news_site_description_font',
		'type'     => 'select',
		'choices'  => random_news_font_choices(),
	)
);

// Typography - Header Font.
$wp_customize->add_setting(
	'random_news_header_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'random_news_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'random_news_header_font',
	array(
		'label'    => esc_html__( 'Header Font Family', 'random-news' ),
		'section'  => 'random_news_font_options',
		'settings' => 'random_news_header_font',
		'type'     => 'select',
		'choices'  => random_news_font_choices(),
	)
);

// Typography - Body Font.
$wp_customize->add_setting(
	'random_news_body_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'random_news_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'random_news_body_font',
	array(
		'label'    => esc_html__( 'Body Font Family', 'random-news' ),
		'section'  => 'random_news_font_options',
		'settings' => 'random_news_body_font',
		'type'     => 'select',
		'choices'  => random_news_font_choices(),
	)
);
