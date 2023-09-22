<?php
/**
 * Pagination setting
 */

// Pagination setting.
$wp_customize->add_section(
	'random_news_pagination',
	array(
		'title'    => esc_html__( 'Pagination', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 60
	)
);

// Pagination enable setting.
$wp_customize->add_setting(
	'random_news_pagination_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_pagination_enable',
		array(
			'label'    => esc_html__( 'Enable Pagination.', 'random-news' ),
			'settings' => 'random_news_pagination_enable',
			'section'  => 'random_news_pagination',
			'type'     => 'checkbox',
		)
	)
);

// Pagination - Pagination Style.
$wp_customize->add_setting(
	'random_news_pagination_type',
	array(
		'default'           => 'default',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_pagination_type',
	array(
		'label'           => esc_html__( 'Pagination Style', 'random-news' ),
		'section'         => 'random_news_pagination',
		'type'            => 'select',
		'choices'         => array(
			'default' => __( 'Default (Older/Newer)', 'random-news' ),
			'numeric' => __( 'Numeric', 'random-news' ),
		),
		'active_callback' => function( $control ) {
			return ( $control->manager->get_setting( 'random_news_pagination_enable' )->value() );
		},
	)
);
