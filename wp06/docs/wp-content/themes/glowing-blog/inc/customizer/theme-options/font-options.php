<?php

/**
 * Font section
 */

// Font section.
$wp_customize->add_section(
	'glowing_blog_font_options',
	array(
		'title'    => esc_html__( 'Font ( Typography ) Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 10,
	)
);

// Typography - Site Title Font.
$wp_customize->add_setting(
	'glowing_blog_site_title_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'glowing_blog_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'glowing_blog_site_title_font',
	array(
		'label'    => esc_html__( 'Site Title Font Family', 'glowing-blog' ),
		'section'  => 'glowing_blog_font_options',
		'settings' => 'glowing_blog_site_title_font',
		'type'     => 'select',
		'choices'  => glowing_blog_font_choices(),
	)
);

// Typography - Site Description Font.
$wp_customize->add_setting(
	'glowing_blog_site_description_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'glowing_blog_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'glowing_blog_site_description_font',
	array(
		'label'    => esc_html__( 'Site Description Font Family', 'glowing-blog' ),
		'section'  => 'glowing_blog_font_options',
		'settings' => 'glowing_blog_site_description_font',
		'type'     => 'select',
		'choices'  => glowing_blog_font_choices(),
	)
);

// Typography - Header Font.
$wp_customize->add_setting(
	'glowing_blog_header_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'glowing_blog_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'glowing_blog_header_font',
	array(
		'label'    => esc_html__( 'Header Font Family', 'glowing-blog' ),
		'section'  => 'glowing_blog_font_options',
		'settings' => 'glowing_blog_header_font',
		'type'     => 'select',
		'choices'  => glowing_blog_font_choices(),
	)
);

// Typography - Body Font.
$wp_customize->add_setting(
	'glowing_blog_body_font',
	array(
		'default'           => '',
		'sanitize_callback' => 'glowing_blog_sanitize_google_fonts',
	)
);

$wp_customize->add_control(
	'glowing_blog_body_font',
	array(
		'label'    => esc_html__( 'Body Font Family', 'glowing-blog' ),
		'section'  => 'glowing_blog_font_options',
		'settings' => 'glowing_blog_body_font',
		'type'     => 'select',
		'choices'  => glowing_blog_font_choices(),
	)
);
