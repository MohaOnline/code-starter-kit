<?php
/**
 * Adore Themes Customizer
 *
 * @package Superior News
 *
 * Banner Section
 */

$wp_customize->add_section(
	'superior_news_banner_section',
	array(
		'title' => esc_html__( 'Banner Section', 'superior-news' ),
		'panel' => 'random_news_frontpage_panel',
	)
);

// Banner enable setting.
$wp_customize->add_setting(
	'superior_news_banner_section_enable',
	array(
		'default'           => false,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Superior_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'superior_news_banner_section_enable',
		array(
			'label'    => esc_html__( 'Enable Banner Section', 'superior-news' ),
			'type'     => 'checkbox',
			'settings' => 'superior_news_banner_section_enable',
			'section'  => 'superior_news_banner_section',
		)
	)
);

// Grid Posts Sub Heading.
$wp_customize->add_setting(
	'superior_news_grid_posts_sub_heading',
	array(
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	new Superior_News_Sub_Section_Heading_Custom_Control(
		$wp_customize,
		'superior_news_grid_posts_sub_heading',
		array(
			'label'           => esc_html__( 'Grid Posts Section', 'superior-news' ),
			'settings'        => 'superior_news_grid_posts_sub_heading',
			'section'         => 'superior_news_banner_section',
			'active_callback' => 'superior_news_if_banner_enabled',
		)
	)
);

// Grid content type settings.
$wp_customize->add_setting(
	'superior_news_grid_posts_content_type',
	array(
		'default'           => 'post',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'superior_news_grid_posts_content_type',
	array(
		'label'           => esc_html__( 'Grid Posts Content type:', 'superior-news' ),
		'description'     => esc_html__( 'Choose where you want to render the content from.', 'superior-news' ),
		'section'         => 'superior_news_banner_section',
		'settings'        => 'superior_news_grid_posts_content_type',
		'type'            => 'select',
		'active_callback' => 'superior_news_if_banner_enabled',
		'choices'         => array(
			'post'     => esc_html__( 'Post', 'superior-news' ),
			'category' => esc_html__( 'Category', 'superior-news' ),
		),
	)
);

for ( $i = 1; $i <= 3; $i++ ) {
	// Grid Posts post setting.
	$wp_customize->add_setting(
		'superior_news_grid_posts_post_' . $i,
		array(
			'sanitize_callback' => 'random_news_sanitize_dropdown_pages',
		)
	);

	$wp_customize->add_control(
		'superior_news_grid_posts_post_' . $i,
		array(
			'label'           => sprintf( esc_html__( 'Post %d', 'superior-news' ), $i ),
			'section'         => 'superior_news_banner_section',
			'type'            => 'select',
			'choices'         => random_news_get_post_choices(),
			'active_callback' => 'superior_news_grid_posts_section_content_type_post_enabled',
		)
	);

}

// Featured Posts category setting.
$wp_customize->add_setting(
	'superior_news_grid_posts_category',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'superior_news_grid_posts_category',
	array(
		'label'           => esc_html__( 'Category', 'superior-news' ),
		'section'         => 'superior_news_banner_section',
		'type'            => 'select',
		'choices'         => random_news_get_post_cat_choices(),
		'active_callback' => 'superior_news_grid_posts_section_content_type_category_enabled',
	)
);


// Posts Tab Sub Heading.
$wp_customize->add_setting(
	'superior_news_posts_tab_sub_heading',
	array(
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	new Superior_News_Sub_Section_Heading_Custom_Control(
		$wp_customize,
		'superior_news_posts_tab_sub_heading',
		array(
			'label'           => esc_html__( 'Posts Tab Section', 'superior-news' ),
			'settings'        => 'superior_news_posts_tab_sub_heading',
			'section'         => 'superior_news_banner_section',
			'active_callback' => 'superior_news_if_banner_enabled',
		)
	)
);

// Latest News Tab Enable.
$wp_customize->add_setting(
	'superior_news_latest_news_tab_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Superior_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'superior_news_latest_news_tab_enable',
		array(
			'label'           => esc_html__( 'Enable Latest News Tab', 'superior-news' ),
			'type'            => 'checkbox',
			'settings'        => 'superior_news_latest_news_tab_enable',
			'section'         => 'superior_news_banner_section',
			'active_callback' => 'superior_news_if_banner_enabled',
		)
	)
);

// Random News Tab Enable.
$wp_customize->add_setting(
	'superior_news_superior_news_tab_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Superior_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'superior_news_superior_news_tab_enable',
		array(
			'label'           => esc_html__( 'Enable Random News Tab', 'superior-news' ),
			'type'            => 'checkbox',
			'settings'        => 'superior_news_superior_news_tab_enable',
			'section'         => 'superior_news_banner_section',
			'active_callback' => 'superior_news_if_banner_enabled',
		)
	)
);

/*========================Active Callback==============================*/
function superior_news_if_banner_enabled( $control ) {
	return $control->manager->get_setting( 'superior_news_banner_section_enable' )->value();
}

// banner grid posts
function superior_news_grid_posts_section_content_type_post_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'superior_news_grid_posts_content_type' )->value();
	return superior_news_if_banner_enabled( $control ) && ( 'post' === $content_type );
}
function superior_news_grid_posts_section_content_type_category_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'superior_news_grid_posts_content_type' )->value();
	return superior_news_if_banner_enabled( $control ) && ( 'category' === $content_type );
}
