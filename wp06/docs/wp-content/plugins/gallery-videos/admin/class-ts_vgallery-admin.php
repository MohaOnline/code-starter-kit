<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       TS vgallery
 * @since      1.7.7
 *
 * @package    TS-Video-Gallery
 * @subpackage TS-Video-Gallery/admin
 */
/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    TS-Video-Gallery
 * @subpackage TS-Video-Gallery/admin
 */
class ts_vgallery_admin extends ts_vgallery_function {
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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public $ts_vgallery_question_obj;
	public $tsvg_build;
	public $tsvg_build_proporties;
	public $tsvg_build_id;
	private $tsvg_page_slug;
	private $tsvg_themes;
	private $tsvg_themes_links;
	protected $tsvg_function_class;
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		if ( isset( $_GET ) && isset( $_GET['page'] ) && isset( $_GET['page'] ) ) {
			if ( $_GET['page'] == 'ts-vgallery' || $_GET['page'] == 'ts-vgallery-builder' ) {
				$this->tsvg_page_slug = $_GET['page'];
			}
		}
		if ( $this->tsvg_page_slug == 'ts-vgallery-builder' && is_admin() ) {
			$this->tsvg_themes = array(
				'grid-video-gallery'     => 'Grid Video Gallery',
				'lightBox-video-gallery' => 'LightBox Video Gallery',
				'thumbnails-video'       => 'Thumbnails Video',
				'content-popup'          => 'Content Popup',
				'elastic-gallery'        => 'Elastic Gallery',
				'fancy-gallery'          => 'Fancy Gallery',
				'parallax-engine'        => 'Parallax Engine',
				'classic-gallery'        => 'Classic Gallery',
				'space-gallery'          => 'Space Gallery',
				'effective-gallery'      => 'Effective Gallery',
				'gallery-album'          => 'Gallery Album',
			);
			if ( isset( $_GET['tsvg-id'] ) || isset( $_GET['tsvg-theme'] ) ) {
				$this->tsvg_function_class = new ts_vgallery_function();
				$tsvgallery_icon_swap_arr  = array( 'ts_vgallery_i_it', 'ts_vgallery_ch_tbc', 'ts_vgallery_ch_tac', 'ts_vgallery_vt_it', 'ts_vgallery_vb_it', 'ts_vgallery_rb_it', 'ts_vgallery_p_bb_it', 'ts_vgallery_bb_it', 'ts_vgallery_pop_it', 'ts_vgallery_play_it' );
				if ( isset( $_GET['tsvg-id'] ) && is_numeric( $_GET['tsvg-id'] ) && is_int( (int) $_GET['tsvg-id'] ) && (int) $_GET['tsvg-id'] > 0 ) {
					global $wpdb;
					$ts_vgallery_check = false;
					$ts_vgallery_table = esc_sql( $wpdb->prefix . 'ts_galleryv_manager' );
					$tsvg_sql          = 'SELECT * FROM ' . $ts_vgallery_table . ' WHERE id = ' . $_GET['tsvg-id'];
					$ts_vgallery_check = $wpdb->get_row( $tsvg_sql, ARRAY_A );
					if ( is_array( $ts_vgallery_check ) ) {
						$ts_vgallery_check['TS_VG_Title'] = html_entity_decode( htmlspecialchars_decode( $ts_vgallery_check['TS_VG_Title'] ), ENT_QUOTES );
						$tsvg_ndecoded_style              = json_decode( $ts_vgallery_check['TS_VG_Style'], true );
						$tsvg_ndecoded_settings           = json_decode( $ts_vgallery_check['TS_VG_Settings'], true );
						$tsvg_ndecoded_Option_Style       = json_decode( $ts_vgallery_check['TS_VG_Option_Style'], true );
						foreach ( $tsvg_ndecoded_style as $key => $value ) {
							$tsvg_ndecoded_style[ $key ] = html_entity_decode( htmlspecialchars_decode( $value ), ENT_QUOTES );
						}
						foreach ( $tsvg_ndecoded_settings as $key => $value ) {
							$tsvg_ndecoded_settings[ $key ] = html_entity_decode( htmlspecialchars_decode( $value ), ENT_QUOTES );
						}
						foreach ( $tsvg_ndecoded_Option_Style as $key => $value ) {
							$tsvg_ndecoded_Option_Style[ $key ] = html_entity_decode( htmlspecialchars_decode( $value ), ENT_QUOTES );
						}
						$ts_vgallery_check['TS_VG_Style']        = json_encode( $tsvg_ndecoded_style, true );
						$ts_vgallery_check['TS_VG_Option_Style'] = json_encode( $tsvg_ndecoded_Option_Style, true );
						$ts_vgallery_check['TS_VG_Old_User'] = html_entity_decode( htmlspecialchars_decode( $ts_vgallery_check['TS_VG_Old_User'] ), ENT_QUOTES );
						$ts_vgallery_check['TS_VG_Settings']     = json_encode( $tsvg_ndecoded_settings, true );
						$ts_galleryv_videos_table                = esc_sql( $wpdb->prefix . 'ts_galleryv_videos' );
						$tsvg_sqla                               = 'SELECT * FROM ' . $ts_galleryv_videos_table . ' WHERE TS_VG_SetType = ' . (int) $_GET['tsvg-id'];
						$ts_vgallery_check_videos               = $wpdb->get_results( $tsvg_sqla, ARRAY_A );
						foreach ( $ts_vgallery_check_videos as $key => $value ) {
							$ts_vgallery_check_videos[ $key ]['TS_VG_SetName'] = html_entity_decode( htmlspecialchars_decode( $value['TS_VG_SetName'] ), ENT_QUOTES );
						}
						$ts_vgallery_check['Question_Videos'] = $ts_vgallery_check_videos;
						$ts_vgallery_check['TS_VG_Style']      = json_decode( $ts_vgallery_check['TS_VG_Style'], true );
						foreach ( $tsvgallery_icon_swap_arr as $key => $value ) {
							if ( array_key_exists( $value, $ts_vgallery_check['TS_VG_Style'] ) ) {
								$ts_vgallery_check['TS_VG_Style'][ $value ] = $this->tsvg_function_class->tsvg_icon_swap( $value, $ts_vgallery_check['TS_VG_Style'][ $value ] );
							}
						}
						$this->tsvg_build            = 'edit';
						$this->tsvg_build_proporties = $ts_vgallery_check;
						$this->tsvg_build_id         = sanitize_text_field( $_GET['tsvg-id'] );
					} else {
						$this->tsvg_build = 'not';
					}
				} elseif ( isset( $_GET['tsvg-theme'] ) && array_key_exists( $_GET['tsvg-theme'], $this->tsvg_themes ) ) {
					$this->tsvg_build_id   = sanitize_text_field( $_GET['tsvg-theme'] );
					$this->tsvg_build      = 'edit';
					$tsvgallery_theme_json = $this->tsvg_function_class->tsvg_get_all_params();
					$tsvgallery_theme_json['TS_VG_Option']['TS_vgallery_Q_Theme'] = $this->tsvg_themes[ $this->tsvg_build_id ];
					$tsvgallery_theme_json['Videos']                             = array_values( $tsvgallery_theme_json['Videos'] );
					foreach ( $tsvgallery_theme_json['Videos'] as $key => $value ) {
						$tsvgallery_theme_json['Videos'][ $key ]['TS_VG_SetType'] = $this->tsvg_build_id;
						$tsvgallery_theme_json['Videos'][ $key ]['TS_VG_Options'] = json_encode( $tsvgallery_theme_json['Videos'][ $key ]['TS_VG_Options'] );
					}
					$tsvgallery_themes_result = $this->tsvg_function_class->tsvg_get_theme_params( $this->tsvg_build_id );
					foreach ( $tsvgallery_icon_swap_arr as $key => $value ) {
						if ( array_key_exists( $value, $tsvgallery_themes_result ) ) {
							$tsvgallery_themes_result[ $value ] = $this->tsvg_function_class->tsvg_icon_swap( $value, $tsvgallery_themes_result[ $value ] );
						}
					}
					$this->tsvg_build_proporties = array(
						'id'                 => $this->tsvg_build_id,
						'TS_VG_Title'        => $tsvgallery_theme_json['TS_VG_Title'],
						'TS_VG_Settings'     => json_encode( $tsvgallery_theme_json['TS_VG_Settings'] ),
						'TS_VG_Option_Style' => json_encode( $tsvgallery_theme_json['TS_VG_Style'] ),
						'TS_VG_Option'       => json_encode( $tsvgallery_theme_json['TS_VG_Option'] ),
						'TS_VG_Style'        => $tsvgallery_themes_result,
						'TS_VG_Sort'         => $tsvgallery_theme_json['TS_VG_Sort'],
						'TS_VG_Old_User'         => 'no',
						'created_at'         => date( 'd.m.Y h:i:sa' ),
						'updated_at'         => date( 'd.m.Y h:i:sa' ),
						'Question_Videos'   => $tsvgallery_theme_json['Videos'],
					);
				} else {
					$this->tsvg_build = '404';
				}
			} else {
				$this->tsvg_build        = 'new';
				$this->tsvg_themes_links = array(
					'grid-video-gallery'     => 'wp-video-gallery-grid/',
					'lightBox-video-gallery' => 'wp-video-gallery-lightbox/',
					'thumbnails-video'       => 'wp-video-gallery-thumbnails/',
					'content-popup'          => 'wp-video-gallery-content-popup/',
					'elastic-gallery'        => 'wp-video-gallery-elastic/',
					'fancy-gallery'          => 'wp-video-gallery-fancy/',
					'parallax-engine'        => 'wp-video-gallery-parallax/',
					'classic-gallery'        => 'wp-video-gallery-classic/',
					'space-gallery'          => 'wp-video-gallery-space/',
					'effective-gallery'		 => 'wp-video-gallery-effective/',
					'gallery-album'			 => 'wp-video-gallery-album/'
				);
			}
		}
		add_action( 'wp_ajax_tsvg_check_attachment', array( $this, 'tsvg_get_attachment_callback' ) );
		add_action( 'wp_ajax_tsvg_get_attachment_id', array( $this, 'tsvg_get_attachment_id' ) );
		add_action( 'wp_ajax_tsvg_save_question', array( $this, 'tsvg_save_question' ) );
		add_filter( 'plugin_action_links_' . TS_VGALLERY_BASE, array( $this, 'tsvg_add_action_link' ) );
		add_filter( 'set-screen-option', array( $this, 'set_screen' ), 10, 3 );
	}
	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.7.7
	 */
	public function tsvg_add_action_link( $links ) {
		$links['tsvgallery_support'] = sprintf( '<a href="%s" style="color: #8bc34a;font-weight: bold;" target="_blank">Support</a>', esc_url( 'https://wordpress.org/support/plugin/gallery-videos/' ) );
		$links['tsvgallery_go_pro']  = sprintf( '<a href="%s" style="color: #ff0000;font-weight: bold;" target="_blank">Go Pro</a>', esc_url( 'https://total-soft.com/wp-video-gallery/' ) );
		return $links;
	}
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
		wp_enqueue_style( 'ts_vgallery_fonts', plugin_dir_url( __DIR__ ) . 'fonts/ts_vgallery-fonts.css', array(), time(), 'all' );
		if ( $this->tsvg_page_slug == 'ts-vgallery' ) {
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ts_vgallery-admin.css', array(), time(), 'all' );
		}
		if ( $this->tsvg_page_slug == 'ts-vgallery-builder' ) {
			wp_enqueue_style( 'tsvgallery_toastr', plugin_dir_url( __FILE__ ) . 'css/toastr.min.css', array(), time(), 'all' );
			wp_enqueue_style( 'tsvgallery_builder', plugin_dir_url( __FILE__ ) . 'css/ts_vgallery-builder.css', array(), time(), 'all' );
			if ( $this->tsvg_build == 'edit' ) {
				wp_enqueue_style( 'tsvg_builder', plugin_dir_url( __FILE__ ) . 'css/ts_vgallery-edit.css', array(), time(), 'all' );
				wp_enqueue_style( 'tsvgallery_icon_picker', plugin_dir_url( __FILE__ ) . 'css/tsvg-aesthetic-icon-picker.css', array(), time(), 'all' );
				wp_enqueue_style( 'tsvgallery_color_picker', plugin_dir_url( __FILE__ ) . 'css/tsvg-spectrum.css', array(), time(), 'all' );
			} elseif ( $this->tsvg_build == 'new' ) {
				wp_enqueue_style( 'tsvg_builder', plugin_dir_url( __FILE__ ) . 'css/ts_vgallery-new.css', array(), time(), 'all' );
			}
		}
	}
	/**
	 * Register the JavaScript for the admin area.
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
		if ( $this->tsvg_page_slug == 'ts-vgallery' ) {
			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ts_vgallery-admin.js', array( 'jquery' ), time(), false );
		}
		if ( $this->tsvg_page_slug == 'ts-vgallery-builder' ) {
			wp_enqueue_media();
			wp_register_script( 'tsvgallery_toastr', plugin_dir_url( __FILE__ ) . 'js/toastr.min.js', array(), time(), false );
			wp_enqueue_script( 'tsvgallery_color_picker', plugin_dir_url( __FILE__ ) . 'js/tsvg-spectrum.js', array(), time(), false );
			wp_enqueue_script( 'tsvgallery_builder', plugin_dir_url( __FILE__ ) . 'js/ts_vgallery-builder.js', array( 'jquery', 'tsvgallery_toastr', 'jquery-ui-sortable', 'tsvgallery_color_picker' ), time(), true );
			if ( $this->tsvg_build == 'edit' ) {
				$tsvg_videos                                    = $tsvg_votes = $tsvg_colors = array();
				$this->tsvg_build_proporties['Question_Videos'] = array_column( $this->tsvg_build_proporties['Question_Videos'], null, 'id' );
				foreach ( $this->tsvg_build_proporties['Question_Videos'] as $key => $value ) :
					$TS_VGallery_Args_Videos = json_decode( $value['TS_VG_Options'] );
					$this->tsvg_build_proporties['Question_Videos'][ $key ]['TS_VG_Options']                             = json_decode( $value['TS_VG_Options'] );
					$this->tsvg_build_proporties['Question_Videos'][ $key ]['TS_VG_Options']->TotalSoftVGallery_Vid_desc = wp_unslash( html_entity_decode( $this->tsvg_build_proporties['Question_Videos'][ $key ]['TS_VG_Options']->TotalSoftVGallery_Vid_desc ) );
				endforeach;
				$popup_options        = array(
					'popup1' => 'red',
					'popup2' => 'green',
					'popup3' => 'blue',
				);
				$popup_options_merged = array_merge( $this->tsvg_build_proporties['TS_VG_Style'], $popup_options );
				wp_localize_script(
					'tsvgallery_builder',
					'tsvgallery_builder_json',
					array(
						'ajaxurl'         => admin_url( 'admin-ajax.php' ),
						'tsvg_nonce'      => wp_create_nonce( 'tsvg_builder_nonce_field' ),
						'tsvg_proporties' => $this->tsvg_build_proporties,
						'tsvg_id'         => $this->tsvg_build_id,
						'tsvg_creation'   => isset( $_GET['tsvg-theme'] ) ? 'save' : 'update',
						'fonts'           => $this->tsvg_function_class->tsvg_get_all_fonts(),
						'tsvg_svg_move'   => esc_url( plugin_dir_url( __FILE__ ) . 'img/move.svg' ),
						'tsvg_svg_remove' => esc_url( plugin_dir_url( __FILE__ ) . 'img/recycle.svg' ),
						'tsvg_svg_edit'   => esc_url( plugin_dir_url( __FILE__ ) . 'img/edit.svg' ),
						'tsvg_svg_copy'   => esc_url( plugin_dir_url( __FILE__ ) . 'img/copy.svg' ),
						'tsvg_no_img'     => esc_url( plugin_dir_url( __DIR__ ) . 'public/img/tsvg_no_img.jpg' ),
						// 'tsvg_no_iframe'  => esc_url( $TS_VGallery_Args_Videos->TotalSoftVGallery_Vid_Vd ),
						'tsvg_no_iframe'  => esc_url("https://www.youtube.com/embed/kYY88h5J86A"),
						'tsvg_image_load' => esc_url( plugin_dir_url( __DIR__ ) . 'public/img/loading.gif'),
						'tsvg_no_video'   => esc_url( plugin_dir_url( __DIR__ ) . 'public/img/tsvg_no_video.png' ),
						'popup_options'   => $popup_options_merged,
					)
				);
			}
		}
	}
	public static function set_screen( $status, $option, $value ) {
		return $value;
	}
	function tsvg_get_attachment_callback() {
		if ( ! isset( $_POST['tsvg_nonce'] ) || $_POST['tsvg_nonce'] == '' || ! wp_verify_nonce( $_POST['tsvg_nonce'], 'tsvg_builder_nonce_field' ) ) {
			wp_send_json_error();
		}
		$attachment_url = sanitize_text_field( $_POST['attachment_url'] );
		if ( is_numeric( attachment_url_to_postid( $attachment_url ) ) && attachment_url_to_postid( $attachment_url ) != 0 ) {
			wp_send_json_success( attachment_url_to_postid( $attachment_url ) );
		} else {
			wp_send_json_error();
		}
	}
	function tsvg_get_attachment_id() {
		if ( ! isset( $_POST['tsvg_nonce'] ) || $_POST['tsvg_nonce'] == '' || ! wp_verify_nonce( $_POST['tsvg_nonce'], 'tsvg_builder_nonce_field' ) ) {
			wp_send_json_error();
		}
		$attachment_url = sanitize_text_field( $_POST['attachment_url'] );
		$fp             = fopen( $attachment_url, 'rb' );
		if ( $fp ) {
			list($width, $height) = getimagesize( $attachment_url );
			$data                 = array(
				'image'  => esc_url( $attachment_url ),
				'width'  => esc_html( $width ),
				'height' => esc_html( $height ),
			);
			if ( is_numeric( attachment_url_to_postid( $attachment_url ) ) ) {
				$data['id'] = attachment_url_to_postid( $attachment_url );
			}
			wp_send_json_success( $data );
		} else {
			wp_send_json_error();
		}
	}
	function tsvg_save_question() {
		if ( ! isset( $_POST['tsvg_nonce'] ) || $_POST['tsvg_nonce'] == '' || ! wp_verify_nonce( $_POST['tsvg_nonce'], 'tsvg_builder_nonce_field' ) ) {
			wp_send_json_error();
		}
		$tsvg_themes_arr    = array(
			'grid-video-gallery'     => 'Grid Video Gallery',
			'lightBox-video-gallery' => 'LightBox Video Gallery',
			'thumbnails-video'       => 'Thumbnails Video',
			'content-popup'          => 'Content Popup',
			'elastic-gallery'        => 'Elastic Gallery',
			'fancy-gallery'          => 'Fancy Gallery',
			'parallax-engine'        => 'Parallax Engine',
			'classic-gallery'        => 'Classic Gallery',
			'space-gallery'          => 'Space Gallery',
		);
		$tsvg_TS_VG_SetType = sanitize_text_field( $_POST['tsvg_id'] );
		$tsvg_TS_VG_Title   = sanitize_text_field( htmlentities( stripslashes( $_POST['tsvg_TS_VG_Title'] ), ENT_QUOTES ) );
		if ( is_numeric( $tsvg_TS_VG_SetType ) || array_key_exists( $tsvg_TS_VG_SetType, $tsvg_themes_arr ) ) {
			global $wpdb;
			$tsvg_question_table     = $wpdb->prefix . 'ts_galleryv_manager';
			$tsvg_videos_table      = $wpdb->prefix . 'ts_galleryv_videos';
			$tsvg_videos            = json_decode( json_encode( $_POST['tsvg_videos'] ), true );
			$tsvg_TS_VG_Sort         = json_decode( json_encode( $_POST['tsvg_TS_VG_Sort'] ), true );
			$tsvg_TS_VG_Styles       = json_decode( json_encode( $_POST['tsvg_TS_VG_Styles'] ), true );
			$tsvg_TS_VG_Options      = json_decode( json_encode( $_POST['tsvg_TS_VG_Options'] ), true );
			$tsvg_TS_VG_Settings     = json_decode( json_encode( $_POST['tsvg_TS_VG_Settings'] ), true );
			$tsvg_TS_VG_Option_Style = json_decode( json_encode( $_POST['tsvg_TS_VG_Option_Style'] ), true );
			$tsvg_deleted_videos    = json_decode( json_encode( $_POST['tsvg_deleted_videos'] ), true );
			$tsvg_response           = array();
			$tsvg_sort_arr           = array();
			foreach ( $tsvg_TS_VG_Styles as $key => $value ) {
				$tsvg_TS_VG_Styles[ $key ] = sanitize_text_field( htmlentities( stripslashes( $value ), ENT_QUOTES ) );
			}
			foreach ( $tsvg_TS_VG_Settings as $key => $value ) {
				$tsvg_TS_VG_Settings[ $key ] = sanitize_text_field( htmlentities( stripslashes( $value ), ENT_QUOTES ) );
			}
			foreach ( $tsvg_TS_VG_Option_Style as $key => $value ) {
				$tsvg_TS_VG_Option_Style[ $key ] = sanitize_text_field( htmlentities( stripslashes( $value ), ENT_QUOTES ) );
			}
			if ( array_key_exists( $tsvg_TS_VG_SetType, $tsvg_themes_arr ) ) {
				$wpdb->insert(
					$tsvg_question_table,
					array(
						'id'                 => '',
						'TS_VG_Title'        => $tsvg_TS_VG_Title,
						'TS_VG_Option'       => json_encode( $tsvg_TS_VG_Options ),
						'TS_VG_Style'        => json_encode( $tsvg_TS_VG_Styles ),
						'TS_VG_Settings'     => json_encode( $tsvg_TS_VG_Settings ),
						'TS_VG_Option_Style' => json_encode( $tsvg_TS_VG_Option_Style ),
						'TS_VG_Sort'         => '',
						'TS_VG_Old_User'     => 'no',
						'created_at'         => date( 'd.m.Y h:i:sa' ),
						'updated_at'         => date( 'd.m.Y h:i:sa' ),
					),
					array( '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
				);
				$tsvg_new_TS_VG_SetType = $wpdb->insert_id;
				foreach ( $tsvg_TS_VG_Sort as $key => $value ) {
					$tsvg_arr_key       = sanitize_text_field( $value );
					$tsvg_TS_VG_SetName = htmlentities( sanitize_text_field( stripslashes( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_SetName'] ) ), ENT_QUOTES );
					foreach ( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'] as $param_key => $param_value ) {
						if ( $param_key == 'TotalSoftVGallery_Vid_Vd' || $param_key == 'TotalSoftVGallery_Vid_Im' || $param_key == 'TotalSoftVGallery_Vid_link' ) {
							$tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_url( $param_value );
						} elseif ( $param_key == 'TotalSoftVGallery_Vid_desc' ) {
							 $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_text_field( htmlentities( stripslashes( $param_value ) ) );
						} else {
							$tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_text_field( $param_value );
						}
					}
					$wpdb->insert(
						$tsvg_videos_table,
						array(
							'id'            => '',
							'TS_VG_SetType' => (int) $tsvg_new_TS_VG_SetType,
							'TS_VG_SetName' => $tsvg_TS_VG_SetName,
							'TS_VG_Options' => json_encode( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'] ),
						),
						array( '%d', '%d', '%s', '%s' )
					);
					$tsvg_sort_arr[] = $wpdb->insert_id;
				}
				$wpdb->update( $tsvg_question_table, array( 'TS_VG_Sort' => implode( ',', $tsvg_sort_arr ) ), array( 'id' => (int) $tsvg_new_TS_VG_SetType ), array( '%s' ), array( '%d' ) );
				$tsvg_response['url'] = add_query_arg( 'tsvg-id', $tsvg_new_TS_VG_SetType, admin_url( 'admin.php?page=ts-vgallery-builder' ) );
				wp_send_json_success( $tsvg_response );
			} else {
				foreach ( $tsvg_TS_VG_Sort as $key => $value ) {
					$tsvg_arr_key       = sanitize_text_field( $value );
					$tsvg_TS_VG_SetName = sanitize_text_field( htmlentities( stripslashes( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_SetName'] ), ENT_QUOTES ) );
					foreach ( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'] as $param_key => $param_value ) {
						if ( $param_key == 'TotalSoftVGallery_Vid_Im' || $param_key == 'TotalSoftVGallery_Vid_Vd' || $param_key == 'TotalSoftVGallery_Vid_link' ) {
							$tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_url( $param_value );
						} elseif ( $param_key == 'TotalSoftVGallery_Vid_desc' ) {
							$tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_text_field( htmlentities( stripslashes( $param_value ) ) );
						} else {
							$tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'][ $param_key ] = sanitize_text_field( $param_value );
						}
					}
					if ( strpos( $value, 'new' ) !== false ) {
						$wpdb->insert(
							$tsvg_videos_table,
							array(
								'id'            => '',
								'TS_VG_SetType' => (int) $tsvg_TS_VG_SetType,
								'TS_VG_SetName' => $tsvg_TS_VG_SetName,
								'TS_VG_Options' => json_encode( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'] ),
							),
							array( '%d', '%d', '%s', '%s' )
						);
						$tsvg_sort_arr[] = $wpdb->insert_id;
					} else {
						$wpdb->update(
							$tsvg_videos_table,
							array(
								'TS_VG_SetName' => $tsvg_TS_VG_SetName,
								'TS_VG_Options' => json_encode( $tsvg_videos[ $tsvg_arr_key ]['TS_VG_Options'] ),
							),
							array( 'id' => (int) $tsvg_arr_key ),
							array( '%s', '%s' ),
							array( '%d' )
						);
						$tsvg_sort_arr[] = (int) $tsvg_arr_key;
					}
				}
				if ( is_array( $tsvg_deleted_videos ) && count( $tsvg_deleted_videos ) != 0 ) {
					foreach ( $tsvg_deleted_videos as $key => $value ) {
						if ( strpos( sanitize_text_field( $value ), 'new' ) === false ) {
							$wpdb->delete(
								$tsvg_videos_table,
								array( 'id' => (int) sanitize_text_field( $value ) ),
								array( '%d' )
							);
						}
					}
				}
				$wpdb->update(
					$tsvg_question_table,
					array(
						'TS_VG_Title'        => $tsvg_TS_VG_Title,
						'TS_VG_Option'       => json_encode( $tsvg_TS_VG_Options ),
						'TS_VG_Style'        => json_encode( $tsvg_TS_VG_Styles ),
						'TS_VG_Settings'     => json_encode( $tsvg_TS_VG_Settings ),
						'TS_VG_Option_Style' => json_encode( $tsvg_TS_VG_Option_Style ),
						'TS_VG_Sort'         => implode( ',', $tsvg_sort_arr ),
						'updated_at'         => date( 'd.m.Y h:i:sa' ),
					),
					array( 'id' => (int) $tsvg_TS_VG_SetType ),
					array( '%s', '%s', '%s', '%s', '%s', '%s' ),
					array( '%d' )
				);
				$tsvg_response['url'] = add_query_arg( 'tsvg-id', $tsvg_TS_VG_SetType, admin_url( 'admin.php?page=ts-vgallery-builder' ) );
				wp_send_json_success( $tsvg_response );
			}
		} else {
			wp_send_json_error();
		}
	}
	public function tsvg_get_field_html( $fieldname, $field, $value ) {
		switch ( $field['type'] ) :
			case 'range':
				return sprintf(
					'
					<div class="length tsvg_range_div" data-tsvg-min="%1$s" data-tsvg-max="%2$s" >
						<div class="tsvg_range_div_title tsvg_field_title" data-tsvg-field="%4$s" data-tsvg-length="%3$s(%7$s)">length:</div>
						<label class="tsvg_range_label" for="%4$s">%5$s</label>
						<input id="%4$s" class="tsvg_range_input" type="range" min="%1$s" max="%2$s" value="%3$s" step="%8$s" data-tsvg-change="%6$s" data-tsvg-param="%7$s"  />
			  		</div>',
					esc_attr( $field['options']['min'] ),
					esc_attr( $field['options']['max'] ),
					array_key_exists( 'time', $field ) ? strpos( $value, '.' ) !== false ? esc_attr( $value ) : esc_attr( $value / 10 ) : esc_attr( $value ),
					esc_attr( $fieldname ),
					esc_attr( $field['label'] ),
					array_key_exists( 'change', $field ) ? esc_attr( $field['change'] ) : '',
					array_key_exists( 'change_param', $field ) ? esc_attr( $field['change_param'] ) : '',
					array_key_exists( 'step', $field ) ? esc_attr( $field['step'] ) : ''
				);
				break;
			case 'text':
			case 'date':
				return sprintf(
					'<div class="tsvg_select_div"><span class="tsvg_select_div_title tsvg_field_title">%s</span><input id="%s" name="%s" type="%s" class="tsvg_text_input" value="%s" data-tsvg-elem="%s" data-change-prop="%s"/></div>',
					esc_attr( $field['label'] ),
					esc_attr( $fieldname ),
					esc_attr( $fieldname ),
					$field['type'] == 'text' ? 'text' : 'date',
					esc_attr( $value ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : ''
				);
				break;
			case 'color':
				return sprintf(
					'
					<div class="tsvg_color_div">
						<label class="tsvg_color_label" for="%1$s">%2$s</label>
						<input id="%1$s" name="%1$s" data-tsvg-field="color" value="%3$s" data-tsvg-change="%4$s" />
					</div>
					',
					esc_attr( $fieldname ),
					esc_attr( $field['label'] ),
					esc_attr( $value ),
					array_key_exists( 'change_prop', $field ) ? esc_attr( $field['change_prop'] ) : ''
				);
				break;
			case 'input-toggle':
				return sprintf(
					'
					<div class="tsvg_checkbox_div" data-tsvg-check="%6$s" data-tsvg-uncheck="%7$s">
						<input class="tsvg_checkbox_input" type="checkbox" id="%1$s" name="%1$s" %2$s data-change-elem="%4$s" data-change-prop="%5$s"/>
						<label class="tsvg_checkbox_label" for="%1$s">%3$s</label>
					</div>
				',
					esc_attr( $fieldname ),
					$value == 'true' ? esc_attr( 'checked' ) : '',
					esc_attr( $field['label'] ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : '',
					array_key_exists( 'yes', $field['options'] ) ? esc_attr( $field['options']['yes'] ) : 'true',
					array_key_exists( 'no', $field['options'] ) ? esc_attr( $field['options']['no'] ) : 'false'
				);
				break;
			case 'select-icon':
				if ( $fieldname == 'ts_vgallery_ch_tbc' || $fieldname == 'ts_vgallery_ch_tac' ) {
					$tsvg_function = new ts_vgallery_function();
				}
				return sprintf(
					'    
				<div class="tsvg_icon_picker_div">
					<label id="%s" for="%s">%s</label>
					<div class="ts-vgallery-icon-picker-wrap" id="%s" data-tsvg-field="%s">
						<ul class="icon-picker">
							%s
							<li id="%s" class="ts-vgallery-select-icon" title="Icon Library"><i class="%s"></i></li>
							<input type="hidden" name="icon_value" id="%s" value="%s" data-tsvg-elem="%s" data-change-prop="%s">
						</ul>
					</div>
				</div>	',
					esc_attr( $fieldname ) . '-icon-picker-wrap-label',
					esc_attr( $fieldname ) . '-icon_value',
					esc_attr( $field['label'] ),
					esc_attr( $fieldname ) . '-icon-picker-wrap',
					esc_attr( $fieldname ),
					$fieldname == 'ts_vgallery_ch_tbc' || $fieldname == 'ts_vgallery_ch_tac' ? '' : sprintf( '<li class="tsvg-set-icon-none" id="%s" title="None"><i class="ts-vgallery ts-vgallery-ban"></i></li>', esc_attr( $fieldname ) . '-icon-none' ),
					esc_attr( $fieldname ),
					$fieldname == 'ts_vgallery_ch_tbc' || $fieldname == 'ts_vgallery_ch_tac' ? $tsvg_function->tsvg_icon_get_class_value( $value ) : esc_attr( $value ),
					esc_attr( $fieldname ) . '-icon_value',
					$fieldname == 'ts_vgallery_ch_tbc' || $fieldname == 'ts_vgallery_ch_tac' ? $tsvg_function->tsvg_icon_get_class_value( $value ) : esc_attr( $value ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : ''
				);
				break;
			case 'select':
				$tsvg_select = '';
				foreach ( $field['options'] as $opt_value => $opt_name ) {
					$tsvg_select .= sprintf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $opt_value ),
						$opt_value == $value ? esc_attr( 'selected' ) : esc_attr( '' ),
						esc_html( $opt_name )
					);
				}
				return sprintf( '<div class="tsvg_select_div"><span class="tsvg_select_div_title tsvg_field_title">%s</span><select id="%s" name="%s" class="%s" data-change-elem="%s" data-change-prop="%s" />%s</select></div>', esc_attr( $field['label'] ), esc_attr( $fieldname ), esc_attr( $fieldname ), array_key_exists( 'change_elem', $field ) ? esc_attr( 'tsvg_elem_data' ) : esc_attr( 'tsvg_root_elem' ), array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '', array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : '', $tsvg_select );
				break;
			case 'select-position':
				$tsvg_select = '';
				foreach ( $field['options'] as $opt_value => $opt_name ) {
					$tsvg_select .= sprintf(
						'<div class="tsvg_position_item %s" data-tsvg-pos="%s"><p class="tsvg_flex_col">%s</p></div>',
						$opt_value == $value ? esc_attr( 'tsvg_active' ) : esc_attr( '' ),
						esc_attr( $opt_value ),
						esc_html( $opt_name )
					);
				}
				return sprintf(
					'
					<div class="tsvg_select_div"><span class="tsvg_select_div_title tsvg_field_title">%s</span>
						<div class="tsvg_position_select  tsvg_flex_row" data-tsvg="%s" data-tsvg-select="%s" data-change-elem="%s" data-change-prop="%s">
							%s
						</div>
					</div>	
					',
					esc_attr( $field['label'] ),
					array_key_exists( 'full', $field['options'] ) ? 'btn' : 'div',
					esc_attr( $fieldname ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : '',
					$tsvg_select
				);
				break;
			case 'select-position-efect':
				$tsvg_select = '';
				foreach ( $field['options'] as $opt_value => $opt_name ) {
					$tsvg_select .= sprintf(
						'<div class="tsvg_position_item %s" data-tsvg-pos="%s"><p class="tsvg_flex_col">%s</p></div>',
						$opt_value == $value ? esc_attr( 'tsvg_active' ) : esc_attr( '' ),
						esc_attr( $opt_value ),
						esc_html( $opt_name )
					);
				}
				return sprintf(
					'
						<div class="tsvg_select_div tsvg_select_div_ef"><span class="tsvg_select_div_title tsvg_field_title">%s</span>
							<div class="tsvg_position_select tsvg_position_select-ef  tsvg_flex_row" data-tsvg="%s" data-tsvg-select="%s" data-change-elem="%s" data-change-prop="%s">
								<div class="tsvg-style-inner-pro tsvg_flex_col tsvg_flex_col_hide"><h2>This photo for illustration. Feature are available in the Professional version of the plugin only.</h2>
    								<a href="https://total-soft.com/wp-video-gallery/" target="_blank">GET THE FULL VERSION</a></div>	
									%s
								</div>
						</div>	
						',
					esc_attr( $field['label'] ),
					array_key_exists( 'full', $field['options'] ) ? 'btn' : 'div',
					esc_attr( $fieldname ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : '',
					$tsvg_select
				);
					break;
			case 'select-position-image':
				$tsvg_select = '';
				foreach ( $field['options'] as $opt_value => $opt_name ) {
					$tsvg_select .= sprintf(
						'<div class="tsvg_position_item %s" data-tsvg-pos="%s"><img class="tsvg_position_image tsvg_flex_col" src="%s"></div>',
						$opt_value == $value ? esc_attr( 'tsvg_active' ) : esc_attr( '' ),
						esc_attr( $opt_value ),
						esc_html( $opt_name )
					);
				}
				return sprintf(
					'
					<div class="tsvg_select_div"><span class="tsvg_select_div_title tsvg_field_title">%s</span>
						<div class="tsvg_position_select tsvg_flex_row" data-tsvg="image" data-tsvg-select="%s" data-change-elem="%s" data-change-prop="%s">
							<div class="tsvg-style-inner-pro tsvg_flex_col"><h2>This photo for illustration. Feature are available in the Professional version of the plugin only.</h2>
								<a href="https://total-soft.com/wp-video-gallery/" target="_blank">GET THE FULL VERSION</a></div>	
									%s
						</div>
					</div>	
					',
					esc_attr( $field['label'] ),
					esc_attr( $fieldname ),
					array_key_exists( 'change_elem', $field ) ? esc_attr( $field['change_elem'] ) : '',
					array_key_exists( 'change_attr', $field ) ? esc_attr( $field['change_attr'] ) : '',
					$tsvg_select
				);
				break;
			case 'wp_media_image':
				$tsvg_image_id_ = $tsvg_image_url_ = '';
				// $tsvg_image_url_ = '';
				if ( $value == '' ) {
					$tsvg_image_id_ = $tsvg_image_url_ = plugin_dir_url( __DIR__ ) . 'public/img/tsvg_no_img.jpg';
				} else {
					if ( is_numeric( attachment_url_to_postid( $value ) ) ) {
						$tsvg_image_id_  = attachment_url_to_postid( $value );
						$tsvg_image_url_ = $value;
					} else {
						$tsvg_image_id_ = $tsvg_image_url_ = $value;
					}
				}
				return sprintf(
					'
                  <div class="tsvg_img_div_edit">
                    <span class="tsvg_field_title">Question image</span>
                    <div class="tsvg_img_change">
                      <img src="%1$s">
                      <div class="tsvg_img_hover_div">
                        <span>Choose image</span>
                        <input type="text" value="%2$s" id="tsvg_video_attachment_id" style="display:none;">
                      </div>
                      <div class="tsvg_img_loading_div tsvg_flex_col"  style="display:none;">
                        <img src="%3$s" >
                      </div>
                    </div>
                  </div>
                  ',
					esc_url( $tsvg_image_url_ ),
					is_int( $tsvg_image_id_ ) ? esc_attr( $tsvg_image_id_ ) : esc_url( $tsvg_image_id_ ),
					esc_url( plugin_dir_url( __DIR__ ) . 'public/img/tsvg_loading.gif' )
				);
				break;
			case 'wp_media_video':
				global $wp_embed;
				$tsvg_video_id_ = $tsvg_video_url_ = '';
				if ( $value != '' ) {
					if ( is_numeric( attachment_url_to_postid( $value ) ) ) {
						$tsvg_video_id_  = attachment_url_to_postid( $value );
						$tsvg_video_url_ = $value;
					} else {
						$tsvg_video_id_ = $tsvg_video_url_ = $value;
					}
				}
				return sprintf(
					'
					<div class="tsvg_video_div_edit">
					  <span class="tsvg_field_title">Question video</span>
					  <div class="tsvg_vd_change">
					  	%5$s
						<img src="%1$s" %2$s>
						<div class="tsvg_vd_hover_div">
						  <span>Choose video</span>
						  <input type="text" value="%3$s"  id="tsvg_video_video_attachment_id" style="display:none;">
						</div>
						<div class="tsvg_vd_loading_div tsvg_flex_col"  style="display:none;">
						  <img src="%4$s" >
						</div>
					  </div>
					</div>
					',
					esc_url( plugin_dir_url( __DIR__ ) . 'public/img/tsvg_no_video.png' ),
					$value == '' ? '' : "style='display:none'",
					is_int( $tsvg_video_id_ ) || $value == '' ? esc_attr( $tsvg_video_id_ ) : esc_url( $tsvg_video_id_ ),
					esc_url( plugin_dir_url( __DIR__ ) . 'public/img/tsvg_loading.gif' ),
					$value == '' ? '' : do_shortcode( $wp_embed->run_shortcode( '[embed]' . esc_url( $value ) . '[/embed]' ) )
				);
				break;
		endswitch;
	}
	public function screen_option() {
		$option = 'per_page';
		$args   = array(
			'label'   => 'Galleries per page',
			'default' => 5,
			'option'  => 'ts_vgallerys_per_page',
		);
		add_screen_option( $option, $args );
		$this->ts_vgallery_question_obj = new ts_vgallery_list_table();
	}
	public function ts_vgallery_admin_menu() {
		$hook = add_menu_page(
			$this->plugin_name,
			esc_html( 'TS Gallery' ),
			'manage_options',
			'ts-vgallery',
			array( $this, 'get_ts_vgallery_admin_vgallerys' ),
			esc_url( plugin_dir_url( __FILE__ ) . 'img/ts_vgallery_logo_sm.png' )
		);
		add_action( "load-$hook", array( $this, 'screen_option' ) );
	}
	public function ts_vgallery_admin_sub() {
		$hooks = add_submenu_page(
			'ts-vgallery',
			esc_html( 'All TS Gallery' ),
			esc_html( 'All Galleries' ),
			'manage_options',
			'ts-vgallery',
			array( $this, 'get_ts_vgallery_admin_vgallerys' )
		);
		add_action( "load-$hooks", array( $this, 'screen_option' ) );
	}
	public function ts_vgallery_builder_sub() {
		add_submenu_page(
			'ts-vgallery',
			esc_html( 'TS Gallery Builder' ),
			esc_html( 'Add Gallery' ),
			'manage_options',
			'ts-vgallery-builder',
			array( $this, 'get_ts_vgallery_builder' )
		);
	}
	public function get_ts_vgallery_admin_vgallerys() {
		include_once 'ts_vgallery_admin.php';
	}
	public function get_ts_vgallery_builder() {
		include_once 'ts_vgallery_builder.php';
	}
}
?>
