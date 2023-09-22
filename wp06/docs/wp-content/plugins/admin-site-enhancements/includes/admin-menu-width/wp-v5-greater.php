<style>

#wpcontent, #wpfooter {
	margin-left: <?php echo esc_html( esc_html( $custom_width ) ); ?>;
}

#adminmenuback, #adminmenuwrap, #adminmenu, #adminmenu .wp-submenu {
	width: <?php echo esc_html( $custom_width ); ?>;
}

#adminmenu .wp-submenu {
	left: <?php echo esc_html( $custom_width ); ?>;
}

#adminmenu .wp-not-current-submenu .wp-submenu, .folded #adminmenu .wp-has-current-submenu .wp-submenu {
	min-width: <?php echo esc_html( $custom_width ); ?>;
}

/* WooCommerce header fix */
.woocommerce-layout__header {
	width: calc(100% - <?php echo esc_html( $custom_width ); ?>);
}

</style>