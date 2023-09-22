<?php
/**
 * Single Post Options
 */

$wp_customize->add_section(
	'glowing_blog_single_page_options',
	array(
		'title'    => esc_html__( 'Single Post Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 60,
	)
);

// Enable single post category setting.
$wp_customize->add_setting(
	'glowing_blog_enable_single_category',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_single_category',
		array(
			'label'    => esc_html__( 'Enable Category', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_single_category',
			'section'  => 'glowing_blog_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post author setting.
$wp_customize->add_setting(
	'glowing_blog_enable_single_author',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_single_author',
		array(
			'label'    => esc_html__( 'Enable Author', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_single_author',
			'section'  => 'glowing_blog_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post date setting.
$wp_customize->add_setting(
	'glowing_blog_enable_single_date',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_single_date',
		array(
			'label'    => esc_html__( 'Enable Date', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_single_date',
			'section'  => 'glowing_blog_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Enable single post tag setting.
$wp_customize->add_setting(
	'glowing_blog_enable_single_tag',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_enable_single_tag',
		array(
			'label'    => esc_html__( 'Enable Post Tag', 'glowing-blog' ),
			'settings' => 'glowing_blog_enable_single_tag',
			'section'  => 'glowing_blog_single_page_options',
			'type'     => 'checkbox',
		)
	)
);

// Single post related Posts title label.
$wp_customize->add_setting(
	'glowing_blog_related_posts_title',
	array(
		'default'           => __( 'Related Posts', 'glowing-blog' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_related_posts_title',
	array(
		'label'    => esc_html__( 'Related Posts Title', 'glowing-blog' ),
		'section'  => 'glowing_blog_single_page_options',
		'settings' => 'glowing_blog_related_posts_title',
	)
);

// Abort if selective refresh is not available.
if ( isset( $wp_customize->selective_refresh ) ) {
	$wp_customize->selective_refresh->add_partial(
		'glowing_blog_related_posts_title',
		array(
			'selector'            => '.site-content div.related-posts h2.related-title',
			'settings'            => 'glowing_blog_related_posts_title',
			'container_inclusive' => false,
			'fallback_refresh'    => true,
		)
	);
}

// Excerpt - Excerpt Length.
$wp_customize->add_setting(
	'glowing_blog_related_excerpt_length',
	array(
		'default'           => 15,
		'sanitize_callback' => 'glowing_blog_sanitize_number_range',
	)
);

$wp_customize->add_control(
	'glowing_blog_related_excerpt_length',
	array(
		'label'       => esc_html__( 'Related Posts Excerpt Length (no. of words)', 'glowing-blog' ),
		'section'     => 'glowing_blog_single_page_options',
		'settings'    => 'glowing_blog_related_excerpt_length',
		'type'        => 'number',
		'input_attrs' => array(
			'min'  => 5,
			'max'  => 200,
			'step' => 1,
		),
	)
);
