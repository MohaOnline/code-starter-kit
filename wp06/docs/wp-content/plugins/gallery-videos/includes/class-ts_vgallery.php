<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       TS Gallery Video
 * @since      1.7.7
 *
 * @package    TS_Gallery_Video
 * @subpackage TS_Gallery_Video/includes
 */
/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.7.7
 * @package   TS_Gallery_Video
 * @subpackage TS_Gallery_Video/includes
 * @author     TS Gallery Video <TS Gallery Video>
 */
class TS_VGallery {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.7.7
	 * @access   protected
	 * @var      TS_Gallery_Video_loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;
	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.7.7
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;
	/**
	 * The current version of the plugin.
	 *
	 * @since    1.7.7
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;
	/**
	 * The question proporty query result.
	 *
	 * @since    1.7.7
	 * @access   protected
	 * @var      string    $version    The gallery proporty query result.
	 */
	public $TS_VGallery_Videoes_query;
	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.7.7
	 */
	public $TS_VGallery_fonts_array;
	public function __construct() {
		if ( defined( 'TS_VGALLERY_VERSION' ) ) {
			$this->version = TS_VGALLERY_VERSION;
		} else {
			$this->version = '2.0.2';
		}
		$this->plugin_name = 'TS Gallery Video';
		add_shortcode( 'Total_Soft_Gallery_Video', array( $this, 'ts_vgallery_shortcode' ) );
		add_shortcode( 'TS_Video_Gallery', array( $this, 'ts_vgallery_shortcode' ) );
		$this->load_dependencies();
		$this->update_plugin();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		new ts_vgallery_gutenberg_block();
		global $pagenow;
		if( in_array($pagenow,["post-new.php","edit.php","post.php"])){
			add_action( 'wp_enqueue_scripts', [$this,'ts_gallery_activate_scripts'] );
			add_action( 'admin_enqueue_scripts', [$this,'ts_gallery_activate_scripts'] );
		}
		if (strpos($_SERVER['REQUEST_URI'], "elementor-preview") !== false){
			$this->ts_gallery_activate_scripts();
		}
	}

	public function ts_gallery_activate_scripts() {
		wp_register_script( "ts_vgallery_classie", plugin_dir_url( __DIR__ ) . 'public/js/classie.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_imagesloaded", plugin_dir_url( __DIR__ ) . 'public/js/imagesloaded.pkgd.min.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_masonry", plugin_dir_url( __DIR__ ) . 'public/js/masonry.pkgd.min.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_modernizr", plugin_dir_url( __DIR__ ) . 'public/js/modernizr.custom.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_adipoli", plugin_dir_url( __DIR__ ) . 'public/js/jquery.adipoli.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_boxer", plugin_dir_url( __DIR__ ) . 'public/js/jquery.fs.boxer.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_hoverdir", plugin_dir_url( __DIR__ ) . 'public/js/jquery.hoverdir.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_html5lightbox", plugin_dir_url( __DIR__ ) . 'public/js/html5lightbox.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_mousewheel", plugin_dir_url( __DIR__ ) . 'public/js/jquery.mousewheel.min.js', array("jquery"), $this->version, false );
		wp_register_script( "ts_vgallery_froogaloop", plugin_dir_url( __DIR__ ) . 'public/js/froogaloop.min.js', array("jquery"), $this->version, false );
		wp_enqueue_script(  "ts_vgallery_resize_sensor", plugin_dir_url( __DIR__ ) . 'public/js/ResizeSensor.js', array("ts_vgallery_classie","ts_vgallery_imagesloaded","ts_vgallery_masonry","ts_vgallery_modernizr","ts_vgallery_adipoli","ts_vgallery_boxer","ts_vgallery_mousewheel","ts_vgallery_froogaloop"), $this->version, false );
		wp_enqueue_script( "ts_vgallery_element_queries", plugin_dir_url( __DIR__ ) . 'public/js/ElementQueries.js', array("jquery","ts_vgallery_hoverdir","ts_vgallery_html5lightbox"), $this->version, false );
		wp_register_style( "ts_vgallery_fonts", plugin_dir_url( __DIR__ ) . 'public/css/ts_vgallery-fonts.css', array(),$this->version, 'all' );
		wp_register_style( "ts_vgallery_special", plugin_dir_url( __DIR__ ) . 'public/css/ts_vgallery-content-special.css', array(),$this->version, 'all' );
		wp_register_style( "ts_vgallery_boxer_sty", plugin_dir_url( __DIR__ ) . 'public/css/jquery.fs.boxer.css', array(),$this->version, 'all' );
		wp_register_style( "ts_vgallery_style9", plugin_dir_url( __DIR__ ) . 'public/css/style9.css', array(),$this->version, 'all' );
		wp_register_style( "ts_vgallery_common", plugin_dir_url( __DIR__ ) . 'public/css/style_common.css', array(),$this->version, 'all' );
		wp_enqueue_style( "ts_vgallery_Widget", plugin_dir_url( __DIR__ ) . 'public/css/Total-Soft-Gallery-Video-Widget.css', array("ts_vgallery_fonts","ts_vgallery_special","ts_vgallery_boxer_sty","ts_vgallery_style9","ts_vgallery_common"),$this->version, 'all' );
	}

	private function update_plugin() {
		global $wpdb;
		$tsvg_videoes_table         = esc_sql( $wpdb->prefix . 'ts_galleryv_videos' );
		$tsvg_galleries_table       = esc_sql( $wpdb->prefix . 'ts_galleryv_manager' );
		$tsvg_videoes_table_check   = $wpdb->get_results( $wpdb->prepare( 'SELECT  table_name FROM information_schema.TABLES WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s', esc_sql( $wpdb->dbname ), $tsvg_videoes_table ) );
		$tsvg_galleries_table_check = $wpdb->get_results( $wpdb->prepare( 'SELECT  table_name FROM information_schema.TABLES WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s', esc_sql( $wpdb->dbname ), $tsvg_galleries_table ) );
		if ( empty( $tsvg_videoes_table_check ) || empty( $tsvg_galleries_table_check ) ) {
			$tsvg_galleries_table_create = 'CREATE TABLE IF NOT EXISTS ' . $tsvg_galleries_table . '( id INTEGER(10) UNSIGNED AUTO_INCREMENT, TS_VG_Title VARCHAR(155) DEFAULT "", TS_VG_Option longtext NOT NULL, TS_VG_Style longtext NOT NULL, TS_VG_Settings longtext NOT NULL, TS_VG_Option_Style longtext NOT NULL,   TS_VG_Sort longtext NOT NULL,   TS_VG_Old_User longtext NOT NULL,created_at VARCHAR(50) NOT NULL,updated_at VARCHAR(50) NOT NULL, PRIMARY KEY (id))';
			$tsvg_videoes_table_create   = 'CREATE TABLE IF NOT EXISTS ' . $tsvg_videoes_table . '( id INTEGER(10) UNSIGNED AUTO_INCREMENT,TS_VG_SetType int(11) NOT NULL, TS_VG_SetName VARCHAR(255) NOT NULL, TS_VG_Options longtext NOT NULL, PRIMARY KEY (id))';
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
			dbDelta( $tsvg_galleries_table_create );
			dbDelta( $tsvg_videoes_table_create );
			$tsvg_galleries_table_convert = 'ALTER TABLE ' . $tsvg_galleries_table . ' CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci';
			$tsvg_videoes_table_convert   = 'ALTER TABLE ' . $tsvg_videoes_table . ' CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci';
			$wpdb->query( $tsvg_galleries_table_convert );
			$wpdb->query( $tsvg_videoes_table_convert );
			$tsvg_old_table_check = $wpdb->get_results( $wpdb->prepare( 'SELECT  table_name FROM information_schema.TABLES WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s', esc_sql( $wpdb->dbname ), esc_sql( $wpdb->prefix . 'totalsoft_galleryv_manager' ) ) );
		
			if ( ! empty( $tsvg_old_table_check ) ) {
				$tsvg_sql                  = 'SELECT * FROM ' . esc_sql( $wpdb->prefix . 'totalsoft_galleryv_manager' );
				$ts_vgallery_all_questions = $wpdb->get_results( $tsvg_sql, ARRAY_A );
				$TS_VG_Option_Style        = array(
					'TotalSoft_VGallery_Sty_01' => 'Next',
					'TotalSoft_VGallery_Sty_02' => 'Prev',
					'TotalSoft_VGallery_Sty_03' => '#ddd',
					'TotalSoft_VGallery_Sty_04' => '#555',
					'TotalSoft_VGallery_Sty_05' => '18',
					'TotalSoft_VGallery_Sty_06' => 'Amaranth',
					'TotalSoft_VGallery_Sty_07' => '#cf095c',
					'TotalSoft_VGallery_Sty_08' => '#cf095c',
					'TotalSoft_VGallery_Sty_09' => '#cf095c',
					'TotalSoft_VGallery_Sty_10' => '#cf095c',
					'TotalSoft_VGallery_Sty_11' => '#ddd',
					'TotalSoft_VGallery_Sty_12' => '2',
					'TotalSoft_VGallery_Sty_13' => '14',
					'TotalSoft_VGallery_Sty_14' => 'ts-vgallery ts-vgallery-ban',
					'TotalSoft_VGallery_Sty_15' => 'ts-vgallery ts-vgallery-ban',
					'TotalSoft_VGallery_Sty_16' => 'false',
					'TotalSoft_VGallery_Sty_17' => 'text',
					'TotalSoft_VGallery_Sty_18' => 'Load More ...',
					'TotalSoft_VGallery_Sty_19' => '#444',
					'TotalSoft_VGallery_Sty_20' => '#fff',
					'TotalSoft_VGallery_Sty_21' => '20',
					'TotalSoft_VGallery_Sty_22' => 'Amaranth',
					'TotalSoft_VGallery_Sty_23' => '#ff1f71',
					'TotalSoft_VGallery_Sty_24' => 'ts-vgallery ts-vgallery-ban',
					'TotalSoft_VGallery_Sty_25' => '#fff',
					'TotalSoft_VGallery_Sty_26' => '#6225E6',
					'TotalSoft_VGallery_Sty_27' => '#FBC638',
				);
				for ( $i = 0; $i < count( $ts_vgallery_all_questions ); $i++ ) {
					$tsvg_old_question         = $tsvg_old_question_TS_VG_Options = $tsvg_old_TS_VG_Options = $tsvg_old_TS_VG_Styles = $tsvg_old_TS_VG_Settings =$tsvg_old_question_TS_VG_Sort = array();
					$tsvg_old_question         = array(
						'id'                     => $ts_vgallery_all_questions[ $i ]['id'],
						'TS_VG_Title'            => $ts_vgallery_all_questions[ $i ]['TotalSoftGallery_Video_Gallery_Title'],
						'tsvg_question_theme_id' => $ts_vgallery_all_questions[ $i ]['TotalSoftGallery_Video_Option'],
					);
					$tsvg_old_TS_VG_Settings   = array(
						'TotalSoft_VGallery_Set_01' => strtolower($ts_vgallery_all_questions[ $i ]['TotalSoftGallery_Video_ShowType']),
						'TotalSoft_VGallery_Set_02' => $ts_vgallery_all_questions[ $i ]['TotalSoftGallery_Video_PerPage'],
						'TotalSoft_VGallery_Set_03' => $ts_vgallery_all_questions[ $i ]['TotalSoftGallery_LoadMore'],
						'TotalSoft_VGallery_Set_04' => ' ',
						'TotalSoft_VGallery_Set_05' => 'ef-1',
						'TotalSoft_VGallery_Set_06' => 'vw-1',
						'TotalSoft_VGallery_Set_07' => 'none',
						'TotalSoft_VGallery_Set_08' => 'ef-1',
					);
					$tsvg_old_TS_VG_Settings['TotalSoft_VGallery_Set_01'] = str_replace( 'load','load-more', $tsvg_old_TS_VG_Settings['TotalSoft_VGallery_Set_01'] );
					$tsvg_theme_style_select_a = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $wpdb->prefix . 'totalsoft_galleryv_dbt_1' ) . ' WHERE TotalSoftGalleryV_SetName = %s', $tsvg_old_question['tsvg_question_theme_id'] ), ARRAY_A );
					$tsvg_theme_style_select_b = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $wpdb->prefix . 'totalsoft_galleryv_dbt_2' ) . ' WHERE TotalSoftGalleryV_SetName = %s', $tsvg_old_question['tsvg_question_theme_id'] ), ARRAY_A );
					$tsvg_old_TS_VG_Styles     = array_merge( $tsvg_theme_style_select_a, $tsvg_theme_style_select_b );
					if (!array_key_exists("TotalSoft_GV_FG_PT",$tsvg_old_TS_VG_Styles))
					{
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_FG_PT'] ='';
					}
					if (!array_key_exists("TotalSoft_GV_FG_PD",$tsvg_old_TS_VG_Styles))
					{
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_FG_PD'] ='';
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Grid Video Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_03'] = 5;}
						if (  $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_06'] =='opacity' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_07']=$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_07']*10;
						}

						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_40'] = 'false';
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_33'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_33'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_37'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_37'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_37'] );
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'LightBox Video Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_20'] = str_replace( 'totalsoft totalsoft', 'ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_20'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] = str_replace( 'totalsoft totalsoft', 'ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_25'] = str_replace( 'totalsoft totalsoft', 'ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_25'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_31'] = str_replace( 'totalsoft totalsoft', 'ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_31'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] = str_replace( 'totalsoft totalsoft', 'ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_11'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_11']/10;
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14']/10;
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_21'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_21']/10;
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_26'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_26']/10;
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Thumbnails Video' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_11'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14'] = str_replace( 'ts-vgallery ts-vgallery', 'totalsoft totalsoft', $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14'] );
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Content Popup' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_26'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery',$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_26'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_30'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery',$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_30'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_31'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery',$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_31'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_34'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_34'] != '' ? $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_34'] : 'def';
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Elastic Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_19'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_19'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_27'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_27'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] = str_replace(  'totalsoft totalsoft','ts-vgallery ts-vgallery', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_32'] );
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_09'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_09']/10;
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_15'] = $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_15']/10;
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '1' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-double-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-double-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '2' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '3' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '4' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '5' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '6' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '7' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-square-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-square-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '8' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '9' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '10' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-hand-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-hand-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_36'] == '11' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-long-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-long-arrow-right';
						}
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Fancy Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 5;}
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_06'] == '1' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_37'] = 'ts-vgallery ts-vgallery-times';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_37'] == '2' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_06'] = 'ts-vgallery ts-vgallery-times-circle';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_37'] == '3' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_06'] = 'ts-vgallery ts-vgallery-times-circle-o';
						}
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '1' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-double-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-double-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '2' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '3' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '4' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '5' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '6' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '7' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-square-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-square-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '8' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '9' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '10' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-hand-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-hand-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '11' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-long-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-long-arrow-right';
						}
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Parallax Engine' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_04'] = str_replace( 'totalsoft totalsoft','ts-vgallery ts-vgallery',  $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_04'] );
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '1' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-double-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-double-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '2' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-angle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-angle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '3' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '4' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-circle-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-circle-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '5' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-arrow-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '6' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '7' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-caret-square-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-caret-square-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '8' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-circle-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-circle-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '9' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-chevron-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-chevron-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '10' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-hand-o-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-hand-o-right';
						} elseif ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_03'] == '11' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-long-arrow-left';
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-long-arrow-right';
						}
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Classic Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_01'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_12'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_12'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_29'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_29'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_17'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_17'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_16'].'-left';
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_16'].'-right';
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Space Gallery' ) {
						if ( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] > 449 ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 1;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 350, 449 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 2;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 250, 349 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 3;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 150, 249 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 4;
						} elseif ( in_array( (int) $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'], range( 1, 149 ) ) ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_02'] = 5;}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_22'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_22'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_14'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_19'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_19'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_32'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_32'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_31'].'-left';
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_31'].'-right';
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Effective Gallery' ) {
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] != '' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] = str_replace(  'totalsoft totalsoft','', $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] );
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21']       = 'ts-vgallery ts-vgallery' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'];
						} else {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] = 'ts-vgallery ts-vgallery-play';
						}
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] != '' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] = str_replace(  'totalsoft totalsoft','', $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] );
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13']       = 'ts-vgallery ts-vgallery' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'];
						} else {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] = 'ts-vgallery ts-vgallery-external-link';
						}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_32'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_38'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_37'].'-left';
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_37'].'-right';
					}
					if ( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] == 'Gallery Album' ) {
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] != '' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] = str_replace( 'totalsoft totalsoft','',  $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] );
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21']       = 'ts-vgallery ts-vgallery' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'];
						} else {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_1_21'] = 'ts-vgallery ts-vgallery-external-link';
						}
						if ( $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] != '' ) {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] = str_replace(  'totalsoft totalsoft','', $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] );
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13']       = 'ts-vgallery ts-vgallery' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'];
						} else {
							$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_13'] = 'ts-vgallery ts-vgallery-external-link';
						}
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_32'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_09'];
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_38'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_08'].'-left';
						$tsvg_old_TS_VG_Styles['TotalSoft_GV_2_39'] = 'ts-vgallery ts-vgallery-' . $tsvg_old_TS_VG_Styles['TotalSoft_GV_2_08'].'-right';
					}
					$tsvg_old_question_TS_VG_Options = array( 'TS_vgallery_Q_Theme' => $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] );
					unset( $tsvg_old_TS_VG_Styles['id'] );
					unset( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetID'] );
					unset( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetName'] );
					unset( $tsvg_old_TS_VG_Styles['TotalSoftGalleryV_SetType'] );
					$tsvg_get_question_videos = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $wpdb->prefix . 'totalsoft_galleryv_videos' ) . ' WHERE GalleryV_ID = %d', (int) $tsvg_old_question['id'] ), ARRAY_A );
					for ( $a = 0; $a < count( $tsvg_get_question_videos ); $a++ ) {
						if ( ! empty( $tsvg_get_question_videos ) ) {
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_desc']  = $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_VDesc'];
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_link']  = $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_VLink'];
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_vont']  = $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_VONT'];
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_Vd']    = str_replace( 'Tsyou_', 'https://www.youtube.com/watch?v=', $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_VURL'] );
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_Im']    = str_replace( 'Tsyou_', 'https://img.youtube.com/vi/', $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_IURL'] );
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_vd_em'] = str_replace( 'Tsyou_', 'https://www.youtube.com/embed/', $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_Video'] );
						} else {
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_desc']  = '';
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_link']  = '';
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_vont']  = '';
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_Vd']    = '';
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_Im']    = '';
							$tsvg_old_TS_VG_Options['TotalSoftVGallery_Vid_vd_em'] = '';
						}
						$wpdb->insert(
							$tsvg_videoes_table,
							array(
								'id'            => '',
								'TS_VG_SetType' => (int) $tsvg_old_question['id'],
								'TS_VG_SetName' => $tsvg_get_question_videos[ $a ]['TotalSoftGallery_Video_VT'],
								'TS_VG_Options' => json_encode( $tsvg_old_TS_VG_Options ),
							),
							array( '%d', '%d', '%s', '%s' )
						);
						$tsvg_old_question_TS_VG_Sort[] = $wpdb->insert_id;
					}
					$wpdb->insert(
						$tsvg_galleries_table,
						array(
							'id'                 => (int) $tsvg_old_question['id'],
							'TS_VG_Title'        => $tsvg_old_question['TS_VG_Title'],
							'TS_VG_Option'       => json_encode( $tsvg_old_question_TS_VG_Options ),
							'TS_VG_Style'        => json_encode( $tsvg_old_TS_VG_Styles ),
							'TS_VG_Settings'     => json_encode( $tsvg_old_TS_VG_Settings ),
							'TS_VG_Option_Style' => json_encode( $TS_VG_Option_Style ),
							'TS_VG_Sort'         => implode( ',', $tsvg_old_question_TS_VG_Sort ),
							'TS_VG_Old_User'         => 'yes',
							'created_at'         => date( 'd.m.Y h:i:sa' ),
							'updated_at'         => date( 'd.m.Y h:i:sa' ),
						),
						array( '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
					);
				}
			}
		}
	}
	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - ts_vgallery_loader. Orchestrates the hooks of the plugin.
	 * - ts_vgallery_admin. Defines all hooks for the admin area.
	 * - ts_vgallery_public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.7.7
	 * @access   private
	 */
	private function load_dependencies() {
		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-ts_vgallery-loader.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-ts_vgallery-function.php';
		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-ts_vgallery-admin.php';
		/**
		* The class responsible for defining all actions that occur in the admin area.
		*/
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-ts_vgallery_list.php';
		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		/**
		* The class responsible for defining all actions that occur in the admin area.
		*/
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-ts_vgallery_block.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-ts_vgallery-widget.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-ts_vgallery-public.php';
		$this->loader = new ts_vgallery_loader();
	}
	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.7.7
	 * @access   private
	 */
	private function define_admin_hooks() {
		$plugin_admin = new ts_vgallery_admin( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'ts_vgallery_admin_menu', 9 );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'ts_vgallery_admin_sub', 90 );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'ts_vgallery_builder_sub', 100 );
	}
	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.7.7
	 * @access   private
	 */
	private function define_public_hooks() {
		function ts_vgallery_register_widget() {
			register_widget( 'ts_vgallery_widget' );
		}
		$plugin_public = new ts_vgallery_public( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
		add_action( 'widgets_init', 'ts_vgallery_register_widget' );
	}
	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.7.7
	 */
	public function run() {
		$this->loader->run();
	}
	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.7.7
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}
	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.7.7
	 * @return    ts_vgallery_loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}
	/**
	 * Primary function to render a form on the frontend.
	 *
	 * @since 1.7.7
	 *
	 * @param int $id vgallery ID.
	 */
	private function ts_vgallery_content( $Total_Soft_vgallery, $ts_vgallery_edit ) {
		$tsvg_themes = array(
			'grid-video-gallery'     => 'Grid Video Gallery',
			'lightBox-video-gallery' => 'LightBox Video Gallery',
			'thumbnails-video'       => 'Thumbnails Video',
			'content-popup'          => 'Content Popup',
			'elastic-gallery'        => 'Elastic Gallery',
			'fancy-gallery'          => 'Fancy Gallery',
			'parallax-engine'        => 'Parallax Engine',
			'classic-gallery'        => 'Classic Gallery',
			'space-gallery'          => 'Space Gallery'
		);
		global $wpdb;
		$ts_vgallery_manager_table   = $wpdb->prefix . 'ts_galleryv_manager';
		$ts_galleryv_videos_table    = $wpdb->prefix . 'ts_galleryv_videos';
		$ts_galleryv_videos_Values   = $ts_galleryv_videos_Query = $ts_galleryv_videos_Count = $tsvgallery_TS_VG_Styles = $TS_vgallery_TS_VG_Options = $ts_vgallery_TS_VG_Settings = '';
		$ts_galleryv_videos_Columned = array();
		$tsvgallery_theme_popup      = $ts_galleryv_videos_Order = $TS_VGallery_Videoes_query = array();
		$tsvg_stylesheet_ff          = '';
		if ( is_numeric( $Total_Soft_vgallery ) && is_int( (int) $Total_Soft_vgallery ) && (int) $Total_Soft_vgallery > 0 || array_key_exists( $Total_Soft_vgallery, $tsvg_themes ) ) {
			$tsvgallery_icon_swap_arr  = array( 'ts_vgallery_i_it', 'ts_vgallery_ch_tbc', 'ts_vgallery_ch_tac', 'ts_vgallery_vt_it', 'ts_vgallery_vb_it', 'ts_vgallery_rb_it', 'ts_vgallery_p_bb_it', 'ts_vgallery_bb_it', 'ts_vgallery_pop_it', 'ts_vgallery_play_it' );
			$this->tsvg_function_class = new ts_vgallery_function();
			$tsvgallery_theme_popup    = $this->tsvg_function_class->tsvg_get_popup();
			if ( is_numeric( $Total_Soft_vgallery ) && is_int( (int) $Total_Soft_vgallery ) && (int) $Total_Soft_vgallery > 0 ) {
				$TS_VGallery_Videoes_query            = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $ts_vgallery_manager_table WHERE id = %d", $Total_Soft_vgallery ), ARRAY_A );
				$ts_vgallery_question_check           = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $ts_vgallery_manager_table WHERE id = %d", $Total_Soft_vgallery ) );
				$tsvgallery_def_theme_json            = $this->tsvg_function_class->tsvg_get_all_params();
				$tsvgallery_def_theme_Style           = json_decode( $TS_VGallery_Videoes_query['TS_VG_Option_Style'], true );
				$tsvgallery_def_theme_json['Videos'] = array_values( $tsvgallery_def_theme_json['Videos'] );
				$tsvgallery_def_theme_ifr_link        = $tsvgallery_def_theme_json['Videos'][0]['TS_VG_Options']['TotalSoftVGallery_Vid_Vd'];
				if ( $ts_vgallery_question_check == 0 ) {
					return false;
				}
				$ts_galleryv_videos_Query                 = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $ts_galleryv_videos_table WHERE TS_VG_SetType = %d", $Total_Soft_vgallery ) );
				$TS_VGallery_Videoes_query['TS_VG_Style'] = json_decode( $TS_VGallery_Videoes_query['TS_VG_Style'], true );
				foreach ( $tsvgallery_icon_swap_arr as $key => $value ) {
					if ( array_key_exists( $value, $TS_VGallery_Videoes_query['TS_VG_Style'] ) ) {
						$TS_VGallery_Videoes_query['TS_VG_Style'][ $value ] = $this->tsvg_function_class->tsvg_icon_swap( $value, $TS_VGallery_Videoes_query['TS_VG_Style'][ $value ] );
					}
				}
				
				$TS_VGallery_Videoes_query['TS_VG_Style'] = (object) $TS_VGallery_Videoes_query['TS_VG_Style'];
				$TS_VGallery_Videoes_query['TS_VG_Old_User'] =html_entity_decode( htmlspecialchars_decode( $TS_VGallery_Videoes_query['TS_VG_Old_User'] ), ENT_QUOTES );
				
			} elseif ( array_key_exists( $Total_Soft_vgallery, $tsvg_themes ) ) {
				$tsvgallery_theme_json                                        = $this->tsvg_function_class->tsvg_get_all_params();
				$tsvgallery_theme_json['TS_VG_Option']['TS_vgallery_Q_Theme'] = $tsvg_themes[ $Total_Soft_vgallery ];
				$tsvgallery_themes_result                                     = $this->tsvg_function_class->tsvg_get_theme_params( $Total_Soft_vgallery );
				$tsvgallery_def_theme_Style                                   = $tsvgallery_theme_json['TS_VG_Style'];
				foreach ( $tsvgallery_icon_swap_arr as $key => $value ) {
					if ( array_key_exists( $value, $tsvgallery_themes_result ) ) {
						$tsvgallery_themes_result[ $value ] = $this->tsvg_function_class->tsvg_icon_swap( $value, $tsvgallery_themes_result[ $value ] );
					}
				}
				$TS_VGallery_Videoes_query        = array(
					'id'                 => $Total_Soft_vgallery,
					'TS_VG_Title'        => $tsvgallery_theme_json['TS_VG_Title'],
					'TS_VG_Settings'     => json_encode( $tsvgallery_theme_json['TS_VG_Settings'] ),
					'TS_VG_Option_Style' => json_encode( $tsvgallery_theme_json['TS_VG_Style'] ),
					'TS_VG_Option'       => json_encode( $tsvgallery_theme_json['TS_VG_Option'] ),
					'TS_VG_Style'        => (object) $tsvgallery_themes_result,
					'TS_VG_Sort'         => $tsvgallery_theme_json['TS_VG_Sort'],
					'TS_VG_Old_User'     => 'no',
					'created_at'         => date( 'd.m.Y h:i:sa' ),
					'updated_at'         => date( 'd.m.Y h:i:sa' ),
				);
				$tsvgallery_theme_json['Videos'] = array_values( $tsvgallery_theme_json['Videos'] );
				foreach ( $tsvgallery_theme_json['Videos'] as $key => $value ) {
					$tsvgallery_theme_json['Videos'][ $key ]['TS_VG_SetType'] = $Total_Soft_vgallery;
					$tsvgallery_theme_json['Videos'][ $key ]                  = (object) $value;
					$tsvgallery_theme_json['Videos'][ $key ]->TS_VG_Options   = json_encode( $tsvgallery_theme_json['Videos'][ $key ]->TS_VG_Options );
				}
				$ts_galleryv_videos_Query = $tsvgallery_theme_json['Videos'];
			} else {
				return false;
			}
			$ts_galleryv_videos_Count   = count( $ts_galleryv_videos_Query ) != 0 ? count( $ts_galleryv_videos_Query ) : 0;
			$tsvgallery_TS_VG_Styles    = $TS_VGallery_Videoes_query['TS_VG_Style'];
			$TS_VG_Option_Style         = json_decode( $TS_VGallery_Videoes_query['TS_VG_Option_Style'] );
			$tsvgallery_TS_VG_Old_User  =  $TS_VGallery_Videoes_query['TS_VG_Old_User'];
			$TS_vgallery_TS_VG_Options  = json_decode( $TS_VGallery_Videoes_query['TS_VG_Option'] );
			$ts_vgallery_TS_VG_Settings = json_decode( $TS_VGallery_Videoes_query['TS_VG_Settings'] );
			
			if ( $ts_galleryv_videos_Count > 1 ) {
				$ts_galleryv_videos_Order = explode( ',', $TS_VGallery_Videoes_query['TS_VG_Sort'] );
			} elseif ( $ts_galleryv_videos_Count == 1 ) {
				$ts_galleryv_videos_Order = array( $TS_VGallery_Videoes_query['TS_VG_Sort'] );
			} else {
				$ts_galleryv_videos_Order = array();
			}
			foreach ( $ts_galleryv_videos_Query as $key => $value ) {
				if ( is_object( $ts_galleryv_videos_Query[ $key ] ) ) {
					$ts_galleryv_videos_Columned[ $value->id ] = $value;
				} else {
					$ts_galleryv_videos_Columned[ $value['id'] ] = $value;
				}
			}
			uksort(
				$ts_galleryv_videos_Columned,
				function( $x, $y ) use ( $ts_galleryv_videos_Order ) {
					if ( (int) array_search( $x, $ts_galleryv_videos_Order ) == (int) array_search( $y, $ts_galleryv_videos_Order ) ) {
						return 0;
					}
					return ( (int) array_search( $x, $ts_galleryv_videos_Order ) < (int) array_search( $y, $ts_galleryv_videos_Order ) ) ? -1 : 1;
				}
			);
			$ts_vgallery_Info_Query_Obj = array();
		} else {
			return false;
		}
		if ( $ts_vgallery_edit !== 'true' ) {
			switch ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme ) {
				case 'Grid Video Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_12',
						'TotalSoft_GV_1_25',
					);
					break;
				case 'LightBox Video Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_2_18',
						'TotalSoft_GV_2_19',
						'TotalSoft_GV_1_17',
						'TotalSoft_GV_1_17',
						'TotalSoft_GV_1_29',
					);
					break;
				case 'Thumbnails Video':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_27',
					);
					break;
				case 'Content Popup':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_27',
						'TotalSoft_GV_1_14',
						'TotalSoft_GV_2_26',
						'TotalSoft_GV_2_19',
						'TotalSoft_GV_2_07',
					);
					break;
				case 'Elastic Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_12',
					);
					break;
				case 'Fancy Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_10',
						'TotalSoft_GV_2_01',
					);
					break;
				case 'Parallax Engine':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_10',
						'TotalSoft_GV_1_38',
					);
					break;
				case 'Classic Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_10',
						'TotalSoft_GV_1_21',
					);
					break;
				case 'Space Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_05',
						'TotalSoft_GV_1_17',
						'TotalSoft_GV_1_29',
					);
					break;
				case 'Effective Gallery':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_15',
						'TotalSoft_GV_2_09',
					);
					break;
				case 'Gallery Album':
					$tsvgallery_fontfamily_swap_arr = array(
						'TotalSoft_GV_1_16',
						'TotalSoft_GV_1_30',
					);
					break;
			}
			$tsvgallery_fontfamily_swap_arr[] = 'TotalSoft_VGallery_Sty_22';
			$tsvgallery_fontfamily_swap_arr[] = 'TotalSoft_VGallery_Sty_06';
			$tsvg_font_families_css           = '';
			foreach ( $tsvgallery_fontfamily_swap_arr as $key => $value ) {
				if ( isset( $tsvgallery_TS_VG_Styles->$value ) || isset( $ts_vgallery_TS_VG_Settings->$value ) || isset( $TS_VG_Option_Style->$value ) ) {
					if ( isset( $tsvgallery_TS_VG_Styles->$value ) ) {
						$tsvg_font_families_css .= $this->tsvg_function_class->tsvg_get_font_face( $tsvgallery_TS_VG_Styles->$value );
					} elseif ( isset( $TS_VG_Option_Style->$value ) ) {
						$tsvg_font_families_css .= $this->tsvg_function_class->tsvg_get_font_face( $TS_VG_Option_Style->$value );
					} else {
						$tsvg_font_families_css .= $this->tsvg_function_class->tsvg_get_font_face( $ts_vgallery_TS_VG_Settings->$value );
					}
				}
			}
			$tsvg_stylesheet_ff = sprintf(
				"
				<style  id='%s'>
				   %s 
				</style>
		  		",
				'tsvg_fontface_' . $Total_Soft_vgallery,
				$tsvg_font_families_css
			);
		}
		$ts_vgallery_base_id = '';
		if ( $ts_vgallery_edit != 'true' ) {
			$ts_vgallery_base_id = $Total_Soft_vgallery;
			$Total_Soft_vgallery = rand( 100000, 999999 );
		}
		$ts_galleryv_videos_Js_id = str_replace("-","_",$Total_Soft_vgallery);
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( "ts_vgallery_resize_sensor", plugin_dir_url( __DIR__ ) . 'public/js/ResizeSensor.js', array(), $this->version, false );
		wp_enqueue_script( "ts_vgallery_element_queries", plugin_dir_url( __DIR__ ) . 'public/js/ElementQueries.js', array(), $this->version, false );
		wp_enqueue_style( "ts_vgallery_fonts_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/ts_vgallery-fonts.css', array(), time(), 'all' );
		wp_enqueue_style( "ts_vgallery_special_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/ts_vgallery-content-special.css', array(), time(), 'all' );
		wp_enqueue_script( "ts_vgallery_classie_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/classie.js', array( 'jquery' ), time(), true );
		if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Grid Video Gallery' ) {
			wp_enqueue_script( "ts_vgallery_imagesloaded_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/imagesloaded.pkgd.min.js', array( 'jquery' ), time(), false );
			wp_enqueue_script( "ts_vgallery_masonry_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/masonry.pkgd.min.js', array( 'jquery' ), time(), true );
			wp_enqueue_script( "ts_vgallery_modernizr_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/modernizr.custom.js', array( 'jquery' ), time(), false );
		}else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'LightBox Video Gallery' ) {
			// wp_enqueue_script( "ts_vgallery_quicksand_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.quicksand.js', array( 'jquery' ), time(), true );
			// wp_enqueue_script( "ts_vgallery_easing_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.easing.js', array( 'jquery' ), time(), true );
		}else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Thumbnails Video' ) {
			wp_enqueue_script( "ts_vgallery_adipoli_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.adipoli.js', array( 'jquery' ), time(), true );
			wp_enqueue_script( "ts_vgallery_boxer_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.fs.boxer.js', array( 'jquery' ), time(), false );
			wp_enqueue_style( "ts_vgallery_boxer_sty_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/jquery.fs.boxer.css', array(), time(), 'all' );
		}else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Content Popup' ) {
			wp_enqueue_style( "ts_vgallery_style9_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/style9.css', array(), time(), 'all' );
			wp_enqueue_style( "ts_vgallery_common_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/style_common.css', array(), time(), 'all' );
			wp_enqueue_style( "ts_vgallery_Widget_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/css/Total-Soft-Gallery-Video-Widget.css', array(), time(), 'all' );
		}else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Fancy Gallery' ) {
			wp_enqueue_script( "ts_vgallery_js_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/modernizr.custom.js', array( 'jquery' ), time(), true );
			wp_enqueue_script( "ts_vgallery_hoverdir_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.hoverdir.js', array( 'jquery' ), time(), true );
			wp_enqueue_script( "ts_vgallery_html5lightbox_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/html5lightbox.js', array( 'jquery' ), time(), false );
		}else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Elastic Gallery' ) {
			wp_enqueue_script( "ts_vgallery_mousewheel_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/jquery.mousewheel.min.js', array( 'jquery' ), time(), true );
			wp_enqueue_script( "ts_vgallery_froogaloop_{$Total_Soft_vgallery}", plugin_dir_url( __DIR__ ) . 'public/js/froogaloop.min.js', array( 'jquery' ), time(), false );
		}
		echo sprintf("<section class='%s'   id='grid%s-gallery'>", 'ts_vgallery_section_' . esc_attr( $Total_Soft_vgallery ), esc_attr( $Total_Soft_vgallery ));
		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/css/tsvg-content-css.php';
		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/tsvg-content-display.php';
		if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Grid Video Gallery' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-gr-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'LightBox Video Gallery' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-lb-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Content Popup' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-cp-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Elastic Gallery' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-el-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Parallax Engine' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-px-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Classic Gallery' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-cl-video-gallery_popup.php';
		} else if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Space Gallery' ) {
			include TS_VGALLERY_PLUGIN_ENV . 'public/popup_partials/tsvg-sg-video-gallery_popup.php';
		}
		if( $tsvgallery_TS_VG_Old_User=='yes'){
			if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Grid Video Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-gr-video-gallery_pagination.php';	
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='LightBox Video Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-lb-video-gallery_pagination.php';	
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Content Popup'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-cp-video-gallery_pagination.php';
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Elastic Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-el-video-gallery_pagination.php';
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Parallax Engine'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-px-video-gallery_pagination.php';	;
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Classic Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-cl-video-gallery_pagination.php';
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Space Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-sp-video-gallery_pagination.php';	
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Fancy Gallery'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-fn-video-gallery_pagination.php';
			}else if( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Thumbnails Video'){
				include plugin_dir_path( dirname( __FILE__ ) ) . 'public/pagina_partials/tsvg-th-video-gallery_pagination.php';	
			}
		}else{
			include plugin_dir_path( dirname( __FILE__ ) ) . 'public/tsvg_pagination.php';
		}
		include plugin_dir_path( dirname( __FILE__ ) ) . 'public/js/tsvg-content-js.php';
		echo sprintf(
			'
					%s
				</section>
			',
			$tsvg_stylesheet_ff
		);
	}
	/**
	 * Shortcode function for show Video Gallery
	 *
	 * @since 1.7.7
	 *
	 * @param array $atts Shortcode attributes provided by a user.
	 *
	 * @return string
	 */
	public function ts_vgallery_shortcode( $atts ) {
		$atts = shortcode_atts(
			array(
				'id'   => '',
				'edit' => '',
			),
			$atts
		);
		\ob_start();
			echo $this->ts_vgallery_content( $atts['id'], $atts['edit'] );
		return \ob_get_clean();
	}
	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.7.7
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
}
