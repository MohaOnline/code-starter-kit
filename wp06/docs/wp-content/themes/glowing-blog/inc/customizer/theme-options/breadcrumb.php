<?php
/**
 * Breadcrumb settings
 */

$wp_customize->add_section(
	'glowing_blog_breadcrumb_section',
	array(
		'title'    => esc_html__( 'Breadcrumb Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 20,
	)
);

// Breadcrumb enable setting.
$wp_customize->add_setting(
	'glowing_blog_breadcrumb_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);
$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_breadcrumb_enable',
		array(
			'label'    => esc_html__( 'Enable breadcrumb.', 'glowing-blog' ),
			'type'     => 'checkbox',
			'settings' => 'glowing_blog_breadcrumb_enable',
			'section'  => 'glowing_blog_breadcrumb_section',
		)
	)
);

// Breadcrumb - Separator.
$wp_customize->add_setting(
	'glowing_blog_breadcrumb_separator',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '/',
	)
);

$wp_customize->add_control(
	'glowing_blog_breadcrumb_separator',
	array(
		'label'           => esc_html__( 'Separator', 'glowing-blog' ),
		'section'         => 'glowing_blog_breadcrumb_section',
		'active_callback' => function( $control ) {
			return ( $control->manager->get_setting( 'glowing_blog_breadcrumb_enable' )->value() );
		},
	)
);
