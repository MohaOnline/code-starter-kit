<?php

// Home Page Customizer panel.
$wp_customize->add_panel(
	'glowing_blog_frontpage_panel',
	array(
		'title'    => esc_html__( 'Frontpage Sections', 'glowing-blog' ),
		'priority' => 140,
	)
);

require get_template_directory() . '/inc/customizer/frontpage-customizer/popular-posts.php';
