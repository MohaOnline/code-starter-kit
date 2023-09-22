<?php
/**
 * Adore Themes Customizer
 *
 * @package Random News
 *
 * Banner Section
 */

$wp_customize->add_section(
	'random_news_banner_section',
	array(
		'title'    => esc_html__( 'Banner Section', 'random-news' ),
		'panel'    => 'random_news_frontpage_panel',
		'priority' => 20,
	)
);

// Banner enable setting.
$wp_customize->add_setting(
	'random_news_banner_section_enable',
	array(
		'default'           => false,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_banner_section_enable',
		array(
			'label'    => esc_html__( 'Enable Banner Section', 'random-news' ),
			'type'     => 'checkbox',
			'settings' => 'random_news_banner_section_enable',
			'section'  => 'random_news_banner_section',
		)
	)
);

// Featured Posts Sub Heading.
$wp_customize->add_setting(
	'random_news_featured_posts_sub_heading',
	array(
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	new Random_News_Sub_Section_Heading_Custom_Control(
		$wp_customize,
		'random_news_featured_posts_sub_heading',
		array(
			'label'           => esc_html__( 'Featured Posts Section', 'random-news' ),
			'settings'        => 'random_news_featured_posts_sub_heading',
			'section'         => 'random_news_banner_section',
			'active_callback' => 'random_news_if_banner_enabled',
		)
	)
);

// banner featured posts content type settings.
$wp_customize->add_setting(
	'random_news_featured_posts_content_type',
	array(
		'default'           => 'post',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_featured_posts_content_type',
	array(
		'label'           => esc_html__( 'Featured Posts Content type:', 'random-news' ),
		'description'     => esc_html__( 'Choose where you want to render the content from.', 'random-news' ),
		'section'         => 'random_news_banner_section',
		'settings'        => 'random_news_featured_posts_content_type',
		'type'            => 'select',
		'active_callback' => 'random_news_if_banner_enabled',
		'choices'         => array(
			'post' => esc_html__( 'Post', 'random-news' ),
			'page' => esc_html__( 'Page', 'random-news' ),
		),
	)
);

for ( $i = 1; $i <= 2; $i++ ) {
	// Featured Posts post setting.
	$wp_customize->add_setting(
		'random_news_featured_posts_post_' . $i,
		array(
			'sanitize_callback' => 'random_news_sanitize_dropdown_pages',
		)
	);

	$wp_customize->add_control(
		'random_news_featured_posts_post_' . $i,
		array(
			'label'           => sprintf( esc_html__( 'Post %d', 'random-news' ), $i ),
			'section'         => 'random_news_banner_section',
			'type'            => 'select',
			'choices'         => random_news_get_post_choices(),
			'active_callback' => 'random_news_featured_posts_section_content_type_post_enabled',
		)
	);

}

// Featured Posts category setting.
$wp_customize->add_setting(
	'random_news_featured_posts_category',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_featured_posts_category',
	array(
		'label'           => esc_html__( 'Category', 'random-news' ),
		'section'         => 'random_news_banner_section',
		'type'            => 'select',
		'choices'         => random_news_get_post_cat_choices(),
		'active_callback' => 'random_news_featured_posts_section_content_type_category_enabled',
	)
);

// Banner Section Sub Heading.
$wp_customize->add_setting(
	'random_news_banner_section_sub_heading',
	array(
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	new Random_News_Sub_Section_Heading_Custom_Control(
		$wp_customize,
		'random_news_banner_section_sub_heading',
		array(
			'label'           => esc_html__( 'Banner Slider Section', 'random-news' ),
			'settings'        => 'random_news_banner_section_sub_heading',
			'section'         => 'random_news_banner_section',
			'active_callback' => 'random_news_if_banner_enabled',
		)
	)
);

// banner slider content type settings.
$wp_customize->add_setting(
	'random_news_banner_slider_content_type',
	array(
		'default'           => 'post',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_banner_slider_content_type',
	array(
		'label'           => esc_html__( 'Banner Slider Content type:', 'random-news' ),
		'description'     => esc_html__( 'Choose where you want to render the content from.', 'random-news' ),
		'section'         => 'random_news_banner_section',
		'type'            => 'select',
		'active_callback' => 'random_news_if_banner_enabled',
		'choices'         => array(
			'post'     => esc_html__( 'Post', 'random-news' ),
			'category' => esc_html__( 'Category', 'random-news' ),
		),
	)
);

for ( $i = 1; $i <= 3; $i++ ) {
	// banner post setting.
	$wp_customize->add_setting(
		'random_news_banner_slider_post_' . $i,
		array(
			'sanitize_callback' => 'random_news_sanitize_dropdown_pages',
		)
	);

	$wp_customize->add_control(
		'random_news_banner_slider_post_' . $i,
		array(
			'label'           => sprintf( esc_html__( 'Post %d', 'random-news' ), $i ),
			'section'         => 'random_news_banner_section',
			'type'            => 'select',
			'choices'         => random_news_get_post_choices(),
			'active_callback' => 'random_news_banner_section_content_type_post_enabled',
		)
	);

}

// banner category setting.
$wp_customize->add_setting(
	'random_news_banner_slider_category',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_banner_slider_category',
	array(
		'label'           => esc_html__( 'Category', 'random-news' ),
		'section'         => 'random_news_banner_section',
		'type'            => 'select',
		'choices'         => random_news_get_post_cat_choices(),
		'active_callback' => 'random_news_banner_section_content_type_category_enabled',
	)
);

/*========================Active Callback==============================*/
function random_news_if_banner_enabled( $control ) {
	return $control->manager->get_setting( 'random_news_banner_section_enable' )->value();
}

// banner slider
function random_news_banner_section_content_type_post_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_banner_slider_content_type' )->value();
	return random_news_if_banner_enabled( $control ) && ( 'post' === $content_type );
}
function random_news_banner_section_content_type_category_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_banner_slider_content_type' )->value();
	return random_news_if_banner_enabled( $control ) && ( 'category' === $content_type );
}

// banner featured posts
function random_news_featured_posts_section_content_type_post_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_featured_posts_content_type' )->value();
	return random_news_if_banner_enabled( $control ) && ( 'post' === $content_type );
}
function random_news_featured_posts_section_content_type_category_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_featured_posts_content_type' )->value();
	return random_news_if_banner_enabled( $control ) && ( 'category' === $content_type );
}
