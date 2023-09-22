<?php
/**
 * Box Layout settings
 */

$wp_customize->add_section(
	'superior_news_box_layout_setting',
	array(
		'title'    => esc_html__( 'Box Layout Setting', 'superior-news' ),
		'panel'    => 'random_news_theme_options_panel',
		'priority' => 15,
	)
);

// Box layout enable setting.
$wp_customize->add_setting(
	'superior_news_enable_box_layout',
	array(
		'default'           => false,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);
$wp_customize->add_control(
	new Superior_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'superior_news_enable_box_layout',
		array(
			'label'    => esc_html__( 'Enable Box Layout.', 'superior-news' ),
			'settings' => 'superior_news_enable_box_layout',
			'section'  => 'superior_news_box_layout_setting',
			'type'     => 'checkbox',
		)
	)
);
