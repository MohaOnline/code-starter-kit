<?php
/**
 * Breadcrumb settings
 */

$wp_customize->add_section(
	'random_news_breadcrumb_section',
	array(
		'title'    => esc_html__( 'Breadcrumb Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 40
	)
);

// Breadcrumb enable setting.
$wp_customize->add_setting(
	'random_news_breadcrumb_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_breadcrumb_enable',
		array(
			'label'    => esc_html__( 'Enable breadcrumb.', 'random-news' ),
			'type'     => 'checkbox',
			'settings' => 'random_news_breadcrumb_enable',
			'section'  => 'random_news_breadcrumb_section',
		)
	)
);

// Breadcrumb - Separator.
$wp_customize->add_setting(
	'random_news_breadcrumb_separator',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '/',
	)
);

$wp_customize->add_control(
	'random_news_breadcrumb_separator',
	array(
		'label'           => esc_html__( 'Separator', 'random-news' ),
		'section'         => 'random_news_breadcrumb_section',
		'active_callback' => function( $control ) {
			return ( $control->manager->get_setting( 'random_news_breadcrumb_enable' )->value() );
		},
	)
);
