<?php
/**
 * Sidebar settings.
 */

$wp_customize->add_section(
	'random_news_sidebar_option',
	array(
		'title'    => esc_html__( 'Sidebar Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 30
	)
);

// Sidebar Option - Global Sidebar Position.
$wp_customize->add_setting(
	'random_news_sidebar_position',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'random_news_sidebar_position',
	array(
		'label'   => esc_html__( 'Global Sidebar Position', 'random-news' ),
		'section' => 'random_news_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'random-news' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'random-news' ),
		),
	)
);

// Sidebar Option - Post Sidebar Position.
$wp_customize->add_setting(
	'random_news_post_sidebar_position',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'random_news_post_sidebar_position',
	array(
		'label'   => esc_html__( 'Post Sidebar Position', 'random-news' ),
		'section' => 'random_news_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'random-news' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'random-news' ),
		),
	)
);

// Sidebar Option - Page Sidebar Position.
$wp_customize->add_setting(
	'random_news_page_sidebar_position',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
		'default'           => 'right-sidebar',
	)
);

$wp_customize->add_control(
	'random_news_page_sidebar_position',
	array(
		'label'   => esc_html__( 'Page Sidebar Position', 'random-news' ),
		'section' => 'random_news_sidebar_option',
		'type'    => 'select',
		'choices' => array(
			'right-sidebar' => esc_html__( 'Right Sidebar', 'random-news' ),
			'no-sidebar'    => esc_html__( 'No Sidebar', 'random-news' ),
		),
	)
);
