<?php
/**
 * Adore Themes Customizer
 *
 * @package Random News
 *
 * Breaking News Section
 */

$wp_customize->add_section(
	'random_news_breaking_news_section',
	array(
		'title'    => esc_html__( 'Breaking News Section', 'random-news' ),
		'panel'    => 'random_news_frontpage_panel',
		'priority' => 10
	)
);

// Breaking News section enable settings.
$wp_customize->add_setting(
	'random_news_breaking_news_section_enable',
	array(
		'default'           => false,
		'sanitize_callback' => 'random_news_sanitize_checkbox',
	)
);

$wp_customize->add_control(
	new Random_News_Toggle_Checkbox_Custom_control(
		$wp_customize,
		'random_news_breaking_news_section_enable',
		array(
			'label'    => esc_html__( 'Enable Breaking News Section', 'random-news' ),
			'type'     => 'checkbox',
			'settings' => 'random_news_breaking_news_section_enable',
			'section'  => 'random_news_breaking_news_section',
		)
	)
);

// Breaking News title settings.
$wp_customize->add_setting(
	'random_news_breaking_news_title',
	array(
		'default'           => __( 'Breaking News', 'random-news' ),
		'sanitize_callback' => 'sanitize_text_field',
	)
);

$wp_customize->add_control(
	'random_news_breaking_news_title',
	array(
		'label'           => esc_html__( 'Title', 'random-news' ),
		'section'         => 'random_news_breaking_news_section',
		'active_callback' => 'random_news_if_breaking_news_enabled',
	)
);

// Abort if selective refresh is not available.
if ( isset( $wp_customize->selective_refresh ) ) {
	$wp_customize->selective_refresh->add_partial(
		'random_news_breaking_news_title',
		array(
			'selector'            => '.news-ticker-section .theme-wrapper',
			'settings'            => 'random_news_breaking_news_title',
			'container_inclusive' => false,
			'fallback_refresh'    => true,
			'render_callback'     => 'random_news_breaking_news_title_text_partial',
		)
	);
}


// breaking_news content type settings.
$wp_customize->add_setting(
	'random_news_breaking_news_content_type',
	array(
		'default'           => 'post',
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_breaking_news_content_type',
	array(
		'label'           => esc_html__( 'Content type:', 'random-news' ),
		'description'     => esc_html__( 'Choose where you want to render the content from.', 'random-news' ),
		'section'         => 'random_news_breaking_news_section',
		'type'            => 'select',
		'active_callback' => 'random_news_if_breaking_news_enabled',
		'choices'         => array(
			'post'     => esc_html__( 'Post', 'random-news' ),
			'category' => esc_html__( 'Category', 'random-news' ),
		),
	)
);

for ( $i = 1; $i <= 5; $i++ ) {
	// breaking_news post setting.
	$wp_customize->add_setting(
		'random_news_breaking_news_post_' . $i,
		array(
			'sanitize_callback' => 'random_news_sanitize_dropdown_pages',
		)
	);

	$wp_customize->add_control(
		'random_news_breaking_news_post_' . $i,
		array(
			'label'           => sprintf( esc_html__( 'Post %d', 'random-news' ), $i ),
			'section'         => 'random_news_breaking_news_section',
			'type'            => 'select',
			'choices'         => random_news_get_post_choices(),
			'active_callback' => 'random_news_breaking_news_section_content_type_post_enabled',
		)
	);

}

// breaking_news category setting.
$wp_customize->add_setting(
	'random_news_breaking_news_category',
	array(
		'sanitize_callback' => 'random_news_sanitize_select',
	)
);

$wp_customize->add_control(
	'random_news_breaking_news_category',
	array(
		'label'           => esc_html__( 'Category', 'random-news' ),
		'section'         => 'random_news_breaking_news_section',
		'type'            => 'select',
		'choices'         => random_news_get_post_cat_choices(),
		'active_callback' => 'random_news_breaking_news_section_content_type_category_enabled',
	)
);

/*========================Active Callback==============================*/
function random_news_if_breaking_news_enabled( $control ) {
	return $control->manager->get_setting( 'random_news_breaking_news_section_enable' )->value();
}
function random_news_breaking_news_section_content_type_post_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_breaking_news_content_type' )->value();
	return random_news_if_breaking_news_enabled( $control ) && ( 'post' === $content_type );
}
function random_news_breaking_news_section_content_type_category_enabled( $control ) {
	$content_type = $control->manager->get_setting( 'random_news_breaking_news_content_type' )->value();
	return random_news_if_breaking_news_enabled( $control ) && ( 'category' === $content_type );
}

/*========================Partial Refresh==============================*/
if ( ! function_exists( 'random_news_breaking_news_title_text_partial' ) ) :
	// Title.
	function random_news_breaking_news_title_text_partial() {
		return esc_html( get_theme_mod( 'random_news_breaking_news_title' ) );
	}
endif;
