<?php
/**
 * Blog / Archive Options
 */

$wp_customize->add_section(
	'random_news_archive_page_options',
	array(
		'title'    => esc_html__( 'Blog / Archive Pages Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 50
	)
);

// Excerpt - Excerpt Length.
$wp_customize->add_setting(
	'random_news_excerpt_length',
	array(
		'default'           => 25,
		'sanitize_callback' => 'random_news_sanitize_number_range',
	)
);

$wp_customize->add_control(
	'random_news_excerpt_length',
	array(
		'label'       => esc_html__( 'Excerpt Length (no. of words)', 'random-news' ),
		'section'     => 'random_news_archive_page_options',
		'settings'    => 'random_news_excerpt_length',
		'type'        => 'number',
		'input_attrs' => array(
			'min'  => 5,
			'max'  => 200,
			'step' => 1,
		),
	)
);

// Grid Column layout options.
$wp_customize->add_setting(
	'random_news_archive_grid_column_layout',
	array(
		'default'           => 'grid-column-3',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_archive_grid_column_layout',
	array(
		'label'   => esc_html__( 'Grid Column Layout', 'random-news' ),
		'section' => 'random_news_archive_page_options',
		'type'    => 'select',
		'choices' => array(
			'grid-column-2' => __( 'Column 2', 'random-news' ),
			'grid-column-3' => __( 'Column 3', 'random-news' ),
		),
	)
);

// Enable archive page category setting.
$wp_customize->add_setting(
	'random_news_enable_archive_category',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_archive_category',
		array(
			'label'    => esc_html__( 'Enable Category', 'random-news' ),
			'settings' => 'random_news_enable_archive_category',
			'section'  => 'random_news_archive_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable archive page author setting.
$wp_customize->add_setting(
	'random_news_enable_archive_author',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_archive_author',
		array(
			'label'    => esc_html__( 'Enable Author', 'random-news' ),
			'settings' => 'random_news_enable_archive_author',
			'section'  => 'random_news_archive_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable archive page date setting.
$wp_customize->add_setting(
	'random_news_enable_archive_date',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_archive_date',
		array(
			'label'    => esc_html__( 'Enable Date', 'random-news' ),
			'settings' => 'random_news_enable_archive_date',
			'section'  => 'random_news_archive_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable archive page comment setting.
$wp_customize->add_setting(
	'random_news_enable_archive_comment',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_enable_archive_comment',
		array(
			'label'    => esc_html__( 'Enable Comment', 'random-news' ),
			'settings' => 'random_news_enable_archive_comment',
			'section'  => 'random_news_archive_page_options',
			'type'     => 'checkbox',
		)
	)
);
