<?php
/*
	Plugin name: Gallery
	Plugin URI: https://total-soft.com/wp-video-gallery/
	Description: Gallery is a user-friendly plugin to display user or hashtag-based gallery feeds as a responsive customizable gallery.
	Version: 2.0.2
	Author: Video Gallery by Total-Soft
	Author URI: https://total-soft.com/
	License: GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
*/
if ( ! defined( 'WPINC' ) ) {
	die;
}
	define( 'TS_VGALLERY_VERSION', '2.0.2' );
	define( 'TS_VGALLERY_BASE', plugin_basename( __FILE__ ) );
	define( 'TS_VGALLERY_PLUGIN_ENV', plugin_dir_path( __FILE__ ) );
function activate_ts_vgallery() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ts_vgallery-activator.php';
	ts_vgallery_activate::activate();
}
function deactivate_ts_vgallery() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ts_vgallery-deactivator.php';
	ts_vgallery_deactivate::deactivate();
}
	register_activation_hook( __FILE__, 'activate_ts_vgallery' );
	register_deactivation_hook( __FILE__, 'deactivate_ts_vgallery' );
	require plugin_dir_path( __FILE__ ) . 'includes/class-ts_vgallery.php';
function run_ts_vgallery() {
	$plugin = new TS_VGallery();
	$plugin->run();
}
run_ts_vgallery();
?>
