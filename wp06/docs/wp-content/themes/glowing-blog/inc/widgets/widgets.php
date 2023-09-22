<?php

// Author Info Widget.
require get_template_directory() . '/inc/widgets/info-author-widget.php';

// Social Widget.
require get_template_directory() . '/inc/widgets/social-widget.php';

/**
 * Register Widgets
 */
function glowing_blog_register_widgets() {

	register_widget( 'Glowing_Blog_Author_Info_Widget' );

	register_widget( 'Glowing_Blog_Social_Widget' );

}
add_action( 'widgets_init', 'glowing_blog_register_widgets' );
