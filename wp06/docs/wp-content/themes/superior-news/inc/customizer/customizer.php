<?php

// upgrade to pro.
require get_theme_file_path() . '/inc/upgrade-to-pro/class-customize.php';

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function superior_news_customize_register( $wp_customize ) {

	if ( class_exists( 'WP_Customize_Control' ) ) {

		class Superior_News_Toggle_Checkbox_Custom_control extends WP_Customize_Control {
			public $type = 'toogle_checkbox';

			public function render_content() {
				?>
				<div class="checkbox_switch">
					<div class="onoffswitch">
						<input type="checkbox" id="<?php echo esc_attr( $this->id ); ?>" name="<?php echo esc_attr( $this->id ); ?>" class="onoffswitch-checkbox" value="<?php echo esc_attr( $this->value() ); ?>" 
						<?php
						$this->link();
						checked( $this->value() );
						?>
						>
						<label class="onoffswitch-label" for="<?php echo esc_attr( $this->id ); ?>"></label>
					</div>
					<span class="customize-control-title onoffswitch_label"><?php echo esc_html( $this->label ); ?></span>
					<p><?php echo wp_kses_post( $this->description ); ?></p>
				</div>
				<?php
			}
		}

		class Superior_News_Sub_Section_Heading_Custom_Control extends WP_Customize_Control {

			// The type of control being rendered.
			public $type = 'sub_section_heading';

			// Render the control in the customizer.

			public function render_content() {

				?>
			<div class="sub-section-heading-control">
				<?php if ( ! empty( $this->label ) ) { ?>
					<h4 class="customize-control-title">
						<?php echo esc_html( $this->label ); ?>
					</h4>
				<?php } ?>

			</div>
				<?php
			}
		}

	}

	// Banner.
	require get_theme_file_path() . '/inc/customizer/banner.php';

	// Header Option.
	require get_theme_file_path() . '/inc/customizer/header-option.php';

	// Header Option.
	require get_theme_file_path() . '/inc/customizer/box-layout.php';

}
add_action( 'customize_register', 'superior_news_customize_register' );

function superior_news_custom_control_scripts() {
	wp_enqueue_style( 'superior-news-customize-controls', get_theme_file_uri() . '/assets/customize-controls.css' );
}
add_action( 'customize_controls_enqueue_scripts', 'superior_news_custom_control_scripts' );
