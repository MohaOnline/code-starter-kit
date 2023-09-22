<?php
/**
 * Pagination setting
 */

// Pagination setting.
$wp_customize->add_section(
	'glowing_blog_pagination',
	array(
		'title'    => esc_html__( 'Pagination', 'glowing-blog' ),
		'panel'    => 'glowing_blog_theme_options_panel',
		'priority' => 50,
	)
);

// Pagination enable setting.
$wp_customize->add_setting(
	'glowing_blog_pagination_enable',
	array(
		'default'           => true,
		'sanitize_callback' => 'glowing_blog_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Glowing_Blog_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'glowing_blog_pagination_enable',
		array(
			'label'    => esc_html__( 'Enable Pagination.', 'glowing-blog' ),
			'settings' => 'glowing_blog_pagination_enable',
			'section'  => 'glowing_blog_pagination',
			'type'     => 'checkbox',
		)
	)
);

// Pagination - Pagination Style.
$wp_customize->add_setting(
	'glowing_blog_pagination_type',
	array(
		'default'           => 'loadmore',
		'sanitize_callback' => 'glowing_blog_sanitize_select',
	)
);

$wp_customize->add_control(
	'glowing_blog_pagination_type',
	array(
		'label'           => esc_html__( 'Pagination Style', 'glowing-blog' ),
		'section'         => 'glowing_blog_pagination',
		'type'            => 'select',
		'choices'         => array(
			'default'  => __( 'Default (Older/Newer)', 'glowing-blog' ),
			'numeric'  => __( 'Numeric', 'glowing-blog' ),
			'loadmore' => __( 'Load More Button', 'glowing-blog' ),
		),
		'active_callback' => 'glowing_blog_pagination_enabled',
	)
);

// Loadmore text label.
$wp_customize->add_setting(
	'glowing_blog_loadmore_text_label',
	array(
		'default'           => __( 'Load More', 'glowing-blog' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'glowing_blog_loadmore_text_label',
	array(
		'label'           => esc_html__( 'Load More Button Label', 'glowing-blog' ),
		'settings'        => 'glowing_blog_loadmore_text_label',
		'section'         => 'glowing_blog_pagination',
		'active_callback' => 'glowing_blog_loadmore_text_label_enabled',
	)
);

/*========================Active Callback==============================*/
function glowing_blog_pagination_enabled( $control ) {
	return $control->manager->get_setting( 'glowing_blog_pagination_enable' )->value();
}
function glowing_blog_loadmore_text_label_enabled( $control ) {
	$pagination = $control->manager->get_setting( 'glowing_blog_pagination_type' )->value();
	return glowing_blog_pagination_enabled( $control ) && ( 'loadmore' === $pagination );
}
