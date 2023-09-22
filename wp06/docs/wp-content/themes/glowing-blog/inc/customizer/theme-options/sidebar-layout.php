<?php
/**
 * Sidebar settings
 */

$wp_customize->add_section(
	'glowing_blog_sidebar_option',
	array(
		'title'    => esc_html__( 'Sidebar Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 40,
	)
);

// Sidebar Option - Global Sidebar Position.
$wp_customize->add_setting(
	'glowing_blog_sidebar_position',
	array(
		'sanitize_callback' => 'glowing_blog_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'glowing_blog_sidebar_position',
	array(
		'label'   => esc_html__( 'Global Sidebar Position', 'glowing-blog' ),
		'section' => 'glowing_blog_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'glowing-blog' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'glowing-blog' ),
		),
	)
);

// Sidebar Option - Post Sidebar Position.
$wp_customize->add_setting(
	'glowing_blog_post_sidebar_position',
	array(
		'sanitize_callback' => 'glowing_blog_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'glowing_blog_post_sidebar_position',
	array(
		'label'   => esc_html__( 'Post Sidebar Position', 'glowing-blog' ),
		'section' => 'glowing_blog_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'glowing-blog' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'glowing-blog' ),
		),
	)
);

// Sidebar Option - Page Sidebar Position.
$wp_customize->add_setting(
	'glowing_blog_page_sidebar_position',
	array(
		'sanitize_callback' => 'glowing_blog_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'glowing_blog_page_sidebar_position',
	array(
		'label'   => esc_html__( 'Page Sidebar Position', 'glowing-blog' ),
		'section' => 'glowing_blog_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'glowing-blog' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'glowing-blog' ),
		),
	)
);
