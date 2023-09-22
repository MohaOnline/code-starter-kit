<?php
/**
 * Adds ts_vgallery_widget.
 */
class ts_vgallery_widget extends WP_Widget {
	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'ts_vgallery_widget', // Base ID
			esc_html( 'TS Video Gallery Widget' ), // Name
			array( 'description' => esc_html( 'Gallery is a user-friendly plugin to display user or hashtag-based gallery feeds as a responsive customizable gallery.' ) ) // Args
		);
	}
	/**
	 * Get All TS Galleries
	 */
	public function ts_vgallery_get_questions( $return = false, $tsp_id = '' ) {
		global $wpdb;
		$vgallery_table = esc_sql( $wpdb->prefix . 'ts_galleryv_manager' );
		$sql            = 'SELECT `id`,`TS_VG_Title` FROM ' . $vgallery_table;
		$ts_vgallerys   = $wpdb->get_results( $sql, 'ARRAY_A' );
		if ( $return == true ) {
			$tsvgallery_return = '';
			array_unshift(
				$ts_vgallerys,
				array(
					'id'          => '',
					'TS_VG_Title' => 'Select video gallery',
				)
			);
			foreach ( $ts_vgallerys as $value ) {
				$tsvgallery_return .= sprintf(
					"
                     <option value='%s' %s>%s</option>
                 ",
					esc_attr( $value['id'] ),
					$value['id'] == $tsp_id ? esc_attr( 'selected' ) : '',
					esc_html( wp_strip_all_tags( html_entity_decode( htmlspecialchars_decode( $value['TS_VG_Title'] ), ENT_QUOTES ) ) )
				);
			}
			return $tsvgallery_return;
		} else {
			return $ts_vgallerys;
		}
	}
	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		$ts_vgallery_id = empty( $instance['ts_vgallery_id'] ) ? '' : $instance['ts_vgallery_id'];
		if ( $ts_vgallery_id ) {
			$ts_get_vgallerys = array_column( $this->ts_vgallery_get_questions(), 'TS_VG_Title', 'id' );
			if ( array_key_exists( absint( $ts_vgallery_id ), $ts_get_vgallerys ) ) {
				echo do_shortcode( sprintf( '[TS_Video_Gallery id="%s"]', absint( $ts_vgallery_id ) ) );
			} else {
				echo '<p>Selected Gallery is not defined.</p>';
			}
		}
		echo $args['after_widget'];
	}
	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$ts_vgallery_id = ! empty( $instance['ts_vgallery_id'] ) ? $instance['ts_vgallery_id'] : '';
		echo sprintf(
			"
            <p>
                <select class='widefat'
                        id='%s'
                        name='%s'>
                    %s
                </select>
            </p>",
			esc_attr( $this->get_field_id( 'ts-vgallery' ) ),
			esc_attr( $this->get_field_name( 'ts_vgallery_id' ) ),
			$this->ts_vgallery_get_questions( true, $ts_vgallery_id )
		);
	}
	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance                   = array();
		$instance['ts_vgallery_id'] = ( ! empty( $new_instance['ts_vgallery_id'] ) ) ? absint( sanitize_text_field( $new_instance['ts_vgallery_id'] ) ) : '';
		return $instance;
	}
} // class ts_vgallery_widget
