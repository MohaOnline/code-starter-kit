<?php
/**
 * Adore Themes Customizer
 *
 * @package Glowing Blog
 *
 * Popular Posts Section
 */

$wp_customize->add_section(
	'glowing_blog_popular_posts_section',
	array(
		'title'    => esc_html__( 'Popular Posts Section', 'glowing-blog' ),
		'panel'    => 'glowing_blog_frontpage_panel',
		'priority' => 20,
	)
);

// Popular Posts section enable settings.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_section_enable',
	array(
		'default'           => false,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_popular_posts_section_enable',
		array(
			'label'    => esc_html__( 'Enable Popular Posts Section', 'glowing-blog' ),
			'type'     => 'checkbox',
			'settings' => 'glowing_blog_popular_posts_section_enable',
			'section'  => 'glowing_blog_popular_posts_section',
		)
	)
);

// Popular Posts title settings.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_title',
	array(
		'default'           => __( 'Popular Post', 'glowing-blog' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_title',
	array(
		'label'           => esc_html__( 'Section Title', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'active_callback' => 'glowing_blog_if_popular_posts_enabled',
	)
);

// Abort if selective refresh is not available.
if ( isset( $wp_customize->selective_refresh ) ) {
	$wp_customize->selective_refresh->add_partial(
		'glowing_blog_popular_posts_title',
		array(
			'selector'            => '.popularpost h3.section-title',
			'settings'            => 'glowing_blog_popular_posts_title',
			'container_inclusive' => false,
			'fallback_refresh'    => true,
			'render_callback'     => 'glowing_blog_popular_posts_title_text_partial',
		)
	);
}

// Popular Posts subtitle settings.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_subtitle',
	array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_subtitle',
	array(
		'label'           => esc_html__( 'Section Subtitle', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'active_callback' => 'glowing_blog_if_popular_posts_enabled',
	)
);

// View All button label setting.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_view_all_button_label',
	array(
		'default'           => __( 'View All', 'glowing-blog' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_view_all_button_label',
	array(
		'label'           => esc_html__( 'View All Button Label', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'settings'        => 'glowing_blog_popular_posts_view_all_button_label',
		'type'            => 'text',
		'active_callback' => 'glowing_blog_if_popular_posts_enabled',
	)
);

// Abort if selective refresh is not available.
if ( isset( $wp_customize->selective_refresh ) ) {
	$wp_customize->selective_refresh->add_partial(
		'glowing_blog_popular_posts_view_all_button_label',
		array(
			'selector'            => '.popularpost .adore-view-all',
			'settings'            => 'glowing_blog_popular_posts_view_all_button_label',
			'container_inclusive' => false,
			'fallback_refresh'    => true,
			'render_callback'     => 'glowing_blog_popular_posts_view_all_button_label_text_partial',
		)
	);
}

// View All button URL setting.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_view_all_button_url',
	array(
		'sanitize_callback' => 'esc_url_raw',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_view_all_button_url',
	array(
		'label'           => esc_html__( 'View All Button Link', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'settings'        => 'glowing_blog_popular_posts_view_all_button_url',
		'type'            => 'url',
		'active_callback' => 'glowing_blog_if_popular_posts_enabled',
	)
);

// popular_posts content type settings.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_content_type',
	array(
		'default'           => 'post',
		'sanitize_callback' => 'glowing_blog_sanitize_select',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_content_type',
	array(
		'label'           => esc_html__( 'Content type:', 'glowing-blog' ),
		'description'     => esc_html__( 'Choose where you want to render the content from.', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'type'            => 'select',
		'active_callback' => 'glowing_blog_if_popular_posts_enabled',
		'choices'         => array(
			'post'     => esc_html__( 'Post', 'glowing-blog' ),
			'category' => esc_html__( 'Category', 'glowing-blog' ),
		),
	)
);

for ( $i = 1; $i <= 3; $i++ ) {
	// popular_posts post setting.
	$wp_customize->add_setting(
		'glowing_blog_popular_posts_post_' . $i,
		array(
			'sanitize_callback' => 'glowing_blog_sanitize_dropdown_pages',
		)
	);

	$wp_customize->add_control(
		'glowing_blog_popular_posts_post_' . $i,
		array(
			'label'           => sprintf( esc_html__( 'Post %d', 'glowing-blog' ), $i ),
			'section'         => 'glowing_blog_popular_posts_section',
			'type'            => 'select',
			'choices'         => glowing_blog_get_post_choices(),
			'active_callback' => 'glowing_blog_popular_posts_section_content_type_post_enabled',
		)
	);

}

// popular_posts category setting.
$wp_customize->add_setting(
	'glowing_blog_popular_posts_category',
	array(
		'sanitize_callback' => 'glowing_blog_sanitize_select',
	)
);

$wp_customize->add_control(
	'glowing_blog_popular_posts_category',
	array(
		'label'           => esc_html__( 'Category', 'glowing-blog' ),
		'section'         => 'glowing_blog_popular_posts_section',
		'type'            => 'select',
		'choices'         => glowing_blog_get_post_cat_choices(),
		'active_callback' => 'glowing_blog_popular_posts_section_content_type_category_enabled',
	)
);

/*========================Active Callback==============================*/
function glowing_blog_if_popular_posts_enabled( $control ) {
	return $control->manager->get_setting( 'glowing_blog_popular_posts_section_enable' )->value();
}
function glowing_blog_popular_posts_section_content_type_post_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'glowing_blog_popular_posts_content_type' )->value();
	return glowing_blog_if_popular_posts_enabled( $control ) && ( 'post' === $content_type );
}
function glowing_blog_popular_posts_section_content_type_category_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'glowing_blog_popular_posts_content_type' )->value();
	return glowing_blog_if_popular_posts_enabled( $control ) && ( 'category' === $content_type );
}

/*========================Partial Refresh==============================*/
if ( ! function_exists( 'glowing_blog_popular_posts_title_text_partial' ) ) :
	// Title.
	function glowing_blog_popular_posts_title_text_partial() {
		return esc_html( get_theme_mod( 'glowing_blog_popular_posts_title' ) );
	}
endif;
if ( ! function_exists( 'glowing_blog_popular_posts_view_all_button_label_text_partial' ) ) :
	// View All.
	function glowing_blog_popular_posts_view_all_button_label_text_partial() {
		return esc_html( get_theme_mod( 'glowing_blog_popular_posts_view_all_button_label' ) );
	}
endif;
