<?php
/**
 * Footer copyright
 */

// Footer copyright
$wp_customize->add_section(
	'glowing_blog_footer_section',
	array(
		'title'    => esc_html__( 'Footer Options', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 70,
	)
);

$copyright_default = sprintf( esc_html_x( 'Copyright &copy; %1$s %2$s', '1: Year, 2: Site Title with home URL', 'glowing-blog' ), '[the-year]', '[site-link]' );

// Footer copyright setting.
$wp_customize->add_setting(
	'glowing_blog_copyright_text',
	array(
		'default'           => $copyright_default,
		'sanitize_callback' => 'glowing_blog_sanitize_html',
	)
);

$wp_customize->add_control(
	'glowing_blog_copyright_text',
	array(
		'label'   => esc_html__( 'Copyright text', 'glowing-blog' ),
		'section' => 'glowing_blog_footer_section',
		'type'    => 'textarea',
	)
);
