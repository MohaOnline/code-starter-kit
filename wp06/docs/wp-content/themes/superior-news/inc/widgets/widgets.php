<?php

// List Posts Widget.
require get_theme_file_path() . '/inc/widgets/list-posts-widget.php';

// Featured Posts Widget.
require get_theme_file_path() . '/inc/widgets/featured-posts-widget.php';

/**
 * Register Widgets
 */
function superior_news_register_widgets() {

	register_widget( 'Superior_News_List_Posts_Widget' );

	register_widget( 'Random_News_Featured_Posts_Widget' );

}
add_action( 'widgets_init', 'superior_news_register_widgets' );
