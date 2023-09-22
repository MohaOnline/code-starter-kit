<?php
/**
 * Footer copyright
 */

// Footer copyright
$wp_customize->add_section(
	'random_news_footer_section',
	array(
		'title'    => esc_html__( 'Footer Options', 'random-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 80
	)
);

$copyright_default = sprintf( esc_html_x( 'Copyright &copy; %1$s %2$s', '1: Year, 2: Site Title with home URL', 'random-news' ), '[the-year]', '[site-link]' );

// Footer copyright setting.
$wp_customize->add_setting(
	'random_news_copyright_txt',
	array(
		'default'           => $copyright_default,
		'sanitize_callback' => 'random_news_sanitize_html',
	)
);

$wp_customize->add_control(
	'random_news_copyright_txt',
	array(
		'label'   => esc_html__( 'Copyright text', 'random-news' ),
		'section' => 'random_news_footer_section',
		'type'    => 'textarea',
	)
);
