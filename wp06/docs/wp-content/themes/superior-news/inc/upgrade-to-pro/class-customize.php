<?php
/**
 * Singleton class for handling the theme's customizer integration.
 *
 * @since  Superior News 1.0.0
 * @access public
 */
final class Superior_News_Customize {

	/**
	 * Returns the instance.
	 *
	 * @since Superior News 1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self();
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since Superior News 1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	/**
	 * Sets up initial actions.
	 *
	 * @since Superior News 1.0.0
	 * @access private
	 * @return void
	 */
	private function setup_actions() {

		// Register panels, sections, settings, controls, and partials.
		add_action( 'customize_register', array( $this, 'sections' ) );

		// Register scripts and styles for the controls.
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_control_scripts' ), 0 );
	}

	/**
	 * Sets up the customizer sections.
	 *
	 * @since Superior News 1.0.0
	 * @access public
	 * @param  object $manager
	 * @return void
	 */
	public function sections( $manager ) {

		// Load custom sections.
		require trailingslashit( get_theme_file_path() ) . 'inc/upgrade-to-pro/section-pro.php';

		// Register custom section types.
		$manager->register_section_type( 'Superior_News_Customize_Section_Pro' );

		// Register sections.
		$manager->add_section(
			new Superior_News_Customize_Section_Pro(
				$manager,
				'superior-news',
				array(
					'title'    => esc_html__( 'Superior News Pro', 'superior-news' ),
					'pro_text' => esc_html__( 'Go Pro', 'superior-news' ),
					'pro_url'  => esc_url( 'https://adorethemes.com/downloads/superior-news-pro/' ),
				)
			)
		);
	}

	/**
	 * Loads theme customizer CSS.
	 *
	 * @since Superior News 1.0.0
	 * @access public
	 * @return void
	 */
	public function enqueue_control_scripts() {

		wp_enqueue_script( 'superior-news-go-pro-customize-controls', trailingslashit( get_stylesheet_directory_uri() ) . 'inc/upgrade-to-pro/customize-controls.js', array( 'customize-controls' ) );

		wp_enqueue_style( 'superior-news-go-pro-customize-controls', trailingslashit( get_stylesheet_directory_uri() ) . 'inc/upgrade-to-pro/customize-controls.css' );
	}
}

// Doing this customizer thang!
Superior_News_Customize::get_instance();
