<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       TS-Video-Gallery
 * @since      1.7.7
 *
 * @package    TS-Video-Gallery
 * @subpackage TS-Video-Gallery/public
 */
/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    TS-Video-Gallery
 * @subpackage TS-Video-Gallery/public
 */
class ts_vgallery_public {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.7.7
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;
	/**
	 * The version of this plugin.
	 *
	 * @since    1.7.7
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;
	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.7.7
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}
	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.7.7
	 */
	public function enqueue_styles() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in ts_vgallery_loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The ts_vgallery_loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		// wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ts_vgallery-public.css', array(), time(), 'all' );
		wp_enqueue_style( 'ts_vgallery_fonts', plugin_dir_url( __DIR__ ) . 'fonts/ts_vgallery-fonts.css', array(), $this->version, 'all' );
	}
	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.7.7
	 */
	public function enqueue_scripts() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in ts_vgallery_loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The ts_vgallery_loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script("jquery");
	}
}
