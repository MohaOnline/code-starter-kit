<?php
/**
 * Blog / Archive Options
 */

$wp_customize->add_section(
	'glowing_blog_archive_page_options',
	array(
		'title'    => esc_html__( 'Blog / Archive Pages Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 30,
	)
);

// Excerpt - Excerpt Length.
$wp_customize->add_setting(
	'glowing_blog_excerpt_length',
	array(
		'default'           => 15,
		'sanitize_callback' => 'glowing_blog_sanitize_number_range',
	)
);

$wp_customize->add_control(
	'glowing_blog_excerpt_length',
	array(
		'label'       => esc_html__( 'Excerpt Length (no. of words)', 'glowing-blog' ),
		'section'     => 'glowing_blog_archive_page_options',
		'settings'    => 'glowing_blog_excerpt_length',
		'type'        => 'number',
		'priority'    => 20,
		'input_attrs' => array(
			'min'  => 5,
			'max'  => 200,
			'step' => 1,
		),
	)
);

// Enable archive page read more button.
$wp_customize->add_setting(
	'glowing_blog_archive_page_readmore_button',
	array(
		'default'           => __( 'Read More', 'glowing-blog' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_archive_page_readmore_button',
	array(
		'label'    => esc_html__( 'Read More Button Label', 'glowing-blog' ),
		'section'  => 'glowing_blog_archive_page_options',
		'settings' => 'glowing_blog_archive_page_readmore_button',
		'type'     => 'text',
		'priority' => 30,
	)
);

// Enable archive page category setting.
$wp_customize->add_setting(
	'glowing_blog_enable_archive_category',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_archive_category',
		array(
			'label'    => esc_html__( 'Enable Category', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_archive_category',
			'section'  => 'glowing_blog_archive_page_options',
			'type'     => 'checkbox',
			'priority' => 40,
		)
	)
);

// Enable archive page author setting.
$wp_customize->add_setting(
	'glowing_blog_enable_archive_author',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_archive_author',
		array(
			'label'    => esc_html__( 'Enable Author', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_archive_author',
			'section'  => 'glowing_blog_archive_page_options',
			'type'     => 'checkbox',
			'priority' => 50,
		)
	)
);

// Enable archive page date setting.
$wp_customize->add_setting(
	'glowing_blog_enable_archive_date',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_archive_date',
		array(
			'label'    => esc_html__( 'Enable Date', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_archive_date',
			'section'  => 'glowing_blog_archive_page_options',
			'type'     => 'checkbox',
			'priority' => 60,
		)
	)
);
