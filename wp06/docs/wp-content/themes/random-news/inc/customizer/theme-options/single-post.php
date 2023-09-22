<?php
/**
 * Single Post Options
 */

$wp_customize->add_section(
	'random_news_single_page_options',
	array(
		'title'    => esc_html__( 'Single Post Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 70
	)
);

// Enable single post category setting.
$wp_customize->add_setting(
	'random_news_enable_single_category',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_single_category',
		array(
			'label'    => esc_html__( 'Enable Category', 'random-news' ),
			'settings' => 'random_news_enable_single_category',
			'section'  => 'random_news_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post author setting.
$wp_customize->add_setting(
	'random_news_enable_single_author',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_single_author',
		array(
			'label'    => esc_html__( 'Enable Author', 'random-news' ),
			'settings' => 'random_news_enable_single_author',
			'section'  => 'random_news_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post date setting.
$wp_customize->add_setting(
	'random_news_enable_single_date',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_single_date',
		array(
			'label'    => esc_html__( 'Enable Date', 'random-news' ),
			'settings' => 'random_news_enable_single_date',
			'section'  => 'random_news_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post tag setting.
$wp_customize->add_setting(
	'random_news_enable_single_tag',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_single_tag',
		array(
			'label'    => esc_html__( 'Enable Post Tag', 'random-news' ),
			'settings' => 'random_news_enable_single_tag',
			'section'  => 'random_news_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post related Posts setting.
$wp_customize->add_setting(
	'random_news_enable_single_post_related_posts',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_single_post_related_posts',
		array(
			'label'    => esc_html__( 'Enable Related posts', 'random-news' ),
			'settings' => 'random_news_enable_single_post_related_posts',
			'section'  => 'random_news_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Single post related Posts title label.
$wp_customize->add_setting(
	'random_news_related_posts_title',
	array(
		'default'           => __( 'Related Posts', 'random-news' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'random_news_related_posts_title',
	array(
		'label'           => esc_html__( 'Related Posts Title', 'random-news' ),
		'section'         => 'random_news_single_page_options',
		'settings'        => 'random_news_related_posts_title',
		'active_callback' => function( $control ) {
			return ( $control->manager->get_setting( 'random_news_enable_single_post_related_posts' )->value() );
		},
	)
);
