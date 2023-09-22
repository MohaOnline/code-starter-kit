<?php
class ts_vgallery_gutenberg_block {

	public function __construct() {
        if (function_exists("register_block_type")) {
            add_action( 'enqueue_block_editor_assets', [ $this, 'ts_vgallery_block_editor_scripts' ] );
            add_action( 'init', [ $this, 'ts_vgallery_register_block' ] );
        }
	}

	public function ts_vgallery_register_block() {
        wp_register_script(
            'ts_vgallery_gutenberg_script',
			plugin_dir_url( __FILE__ ) . 'js/ts_vgallery-block.js',
            array( 'jquery', 'wp-blocks', 'wp-element', 'wp-editor','wp-components')
        );
        wp_register_style( 'ts-vgallery-block-css', plugin_dir_url( __FILE__ ) . 'css/ts_vgallery_block.css');
        wp_enqueue_style('ts-vgallery-block-css');
        register_block_type( 'tsvideogallery/gallery-block',
            array(
                'editor_script' => 'ts_vgallery_gutenberg_script',
                'render_callback' => [$this,'ts_vgallery_block_render_callback'],
                'attributes' => array(
                    'tsv_id' => array(
                        'type' => 'string',
                    ),
                    'preview'     => array(
                        'type'    => 'boolean',
                        'default' => false,
                    ),
                )
            )
        );

	}

	public function ts_vgallery_get_all() {
        global $wpdb;
        $vgallery_table = esc_sql($wpdb->prefix . "ts_galleryv_manager");
        $sql = "SELECT `id`,`TS_VG_Title` FROM ".$vgallery_table;
        $ts_vgallerys = $wpdb->get_results($sql, "ARRAY_A");
        return $ts_vgallerys;
    }

	public function ts_vgallery_block_editor_scripts() {
        $ts_vgallerys = $this->ts_vgallery_get_all();
        $ts_vgallery_list = array(
            array(
                'value' => 0,
                'label' => 'Select a gallery',
            )
        );
        foreach ( $ts_vgallerys as $ts_vgallery ) {
            $ts_vgallery_title =  $ts_vgallery['TS_VG_Title'];
            if ( empty( $ts_vgallery_title ) ) {
                $ts_vgallery_title = "";
            }
            $ts_vgallery_list[] = array(
                'value' => esc_attr($ts_vgallery['id']),
                'label' => esc_html(html_entity_decode( $ts_vgallery_title )),
            );
        }
        $ts_vgallerys_count = count($ts_vgallerys);
        wp_localize_script( 'ts_vgallery_gutenberg_script', 'ts_vgallery_gutenberg_script_data', array( 'vgallerys_count' => $ts_vgallerys_count, 'ts_vgallery_list' => $ts_vgallery_list ,'ts_vgallery_logo' => plugin_dir_url( __FILE__ ) . 'img/TS-VG-Logo.png','ts_vgallery_preview' => plugin_dir_url( __FILE__ ) . 'img/vg-logo-gutenbergg.png' ) );

    }   

    public function ts_vgallery_block_render_callback( $attributes ) {
		$id = empty( $attributes['tsv_id'] ) ? 0 : $attributes['tsv_id'];
		if ( $id ) {
            $ts_get_vgallerys = array_column($this->ts_vgallery_get_all(), 'TS_VG_Title', 'id');
			if ( array_key_exists( absint( $id ), $ts_get_vgallerys ) ) {
				if( strstr($_SERVER['REQUEST_URI'], 'gallery-block') ) {
                    return  sprintf( '
                        <div class="notice notice-error is-dismissible"><p>%2$s</p></br>[TS_Video_Gallery id="%1$d"] </div>
                        </br>
                        ', absint( $id ),
                        esc_html__("In the preview of page you can see result of shortcode.")
                    );
				}else{
					return  sprintf( '[TS_Video_Gallery id="%d"]', absint( $id ) );
				}
			} else {
				return sprintf( '<p>%s</p>', 'Selected gallery is not defined.' );
			}
		}
	}

    
}
