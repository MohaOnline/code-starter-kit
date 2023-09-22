<?php
if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}
class ts_vgallery_list_table extends WP_List_Table {
	public function __construct() {
		parent::__construct(
			array(
				'singular' => __( 'gallery' ), // singular name of the listed records
				'plural'   => __( 'galleries' ), // plural name of the listed records
				'ajax'     => false, // should this table support ajax?
			)
		);
	}
	/**
	 * Retrieve video galleries data from the database
	 *
	 * @param int $per_page
	 * @param int $page_number
	 *
	 * @return mixed
	 */
	public static function ts_get_vgallerys( $per_page = 10, $page_number = 1 ) {
		global $wpdb;
		$sql = "SELECT `id`,`TS_VG_Title`,`TS_VG_Option`,`TS_VG_Sort`,`created_at` FROM {$wpdb->prefix}ts_galleryv_manager";
		if ( isset( $_REQUEST['s'] ) ) {
			$sql .= ' WHERE TS_VG_Title LIKE "%%' . esc_sql( $_REQUEST['s'] ) . '%%"';
		}
		if ( ! empty( $_REQUEST['orderby'] ) ) {
			$sql .= ' ORDER BY ' . esc_sql( $_REQUEST['orderby'] );
			$sql .= ! empty( $_REQUEST['order'] ) ? ' ' . esc_sql( $_REQUEST['order'] ) : ' ASC';
		}
		$sql   .= " LIMIT $per_page";
		$sql   .= ' OFFSET ' . ( $page_number - 1 ) * $per_page;
		$result = $wpdb->get_results( $sql, 'ARRAY_A' );
		return $result;
	}
	/**
	 * Delete a gallery.
	 *
	 * @param int $id gallery id
	 */
	public static function ts_vgallery_delete( $id ) {
		global $wpdb;
		$wpdb->delete(
			"{$wpdb->prefix}ts_galleryv_manager",
			array( 'id' => $id ),
			array( '%d' )
		);
		$wpdb->delete(
			"{$wpdb->prefix}ts_galleryv_videos",
			array( 'TS_VG_SetType' => $id ),
			array( '%d' )
		);
	}
	/**
	 * Copy a gallery.
	 *
	 * @param int $id gallery id
	 */
	public static function ts_vgallery_copy( $id ) {
		global $wpdb;
		$ts_vgallery_manager_table = $wpdb->prefix . 'ts_galleryv_manager';
		$ts_galleryv_videos_table  = $wpdb->prefix . 'ts_galleryv_videos';
		$ts_vgallery_Question_Copy = $wpdb->get_row( $wpdb->prepare( "SELECT `TS_VG_Title`, `TS_VG_Option`, `TS_VG_Style`, `TS_VG_Settings`,`TS_VG_Option_Style`, `TS_VG_Sort`, `TS_VG_Old_User` FROM $ts_vgallery_manager_table WHERE id = %d", $id ) );
		$wpdb->insert(
			$ts_vgallery_manager_table,
			array(
				'id'                 => '',
				'TS_VG_Title'        => $ts_vgallery_Question_Copy->TS_VG_Title,
				'TS_VG_Option'       => $ts_vgallery_Question_Copy->TS_VG_Option,
				'TS_VG_Style'        => $ts_vgallery_Question_Copy->TS_VG_Style,
				'TS_VG_Settings'     => $ts_vgallery_Question_Copy->TS_VG_Settings,
				'TS_VG_Option_Style' => $ts_vgallery_Question_Copy->TS_VG_Option_Style,
				'TS_VG_Sort'         => '',
				'TS_VG_Old_User' => 'no',
				'created_at'         => date( 'd.m.Y h:i:sa' ),
				'updated_at'         => date( 'd.m.Y h:i:sa' ),
			),
			array( '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
		);
		$ts_vgallery_Question_Copied = $wpdb->insert_id;
		$ts_galleryv_videos_Copy     = $wpdb->get_results( $wpdb->prepare( "SELECT `id`, `TS_VG_SetType`, `TS_VG_SetName`, `TS_VG_Options` FROM $ts_galleryv_videos_table WHERE TS_VG_SetType = %d", $id ) );
		if ( count( $ts_galleryv_videos_Copy ) != 0 ) {
			$ts_vgallery_Video_Sort          = explode( ',', $ts_vgallery_Question_Copy->TS_VG_Sort );
			$ts_galleryv_videos_Copy_Columned = array_column( json_decode( json_encode( $ts_galleryv_videos_Copy ), true ), null, 'id' );
			for ( $i = 0; $i < count( $ts_galleryv_videos_Copy ); $i++ ) {
				$wpdb->insert(
					$ts_galleryv_videos_table,
					array(
						'id'            => '',
						'TS_VG_SetType' => (int) $ts_vgallery_Question_Copied,
						'TS_VG_SetName' => $ts_galleryv_videos_Copy_Columned[ $ts_vgallery_Video_Sort[ $i ] ]['TS_VG_SetName'],
						'TS_VG_Options' => $ts_galleryv_videos_Copy_Columned[ $ts_vgallery_Video_Sort[ $i ] ]['TS_VG_Options'],
					),
					array( '%d', '%d', '%s', '%s' )
				);
			}
			$ts_galleryv_videos_Copied          = $wpdb->get_results( $wpdb->prepare( "SELECT `id` FROM $ts_galleryv_videos_table WHERE TS_VG_SetType = %d", (int) $ts_vgallery_Question_Copied ) );
			$ts_galleryv_videos_Copied_Imploded = implode( ',', array_column( json_decode( json_encode( $ts_galleryv_videos_Copied ), true ), 'id' ) );
			$wpdb->update( $ts_vgallery_manager_table, array( 'TS_VG_Sort' => $ts_galleryv_videos_Copied_Imploded ), array( 'id' => $ts_vgallery_Question_Copied ), array( '%s' ), array( '%d' ) );
		}
	}
	public static function ts_vgallery_edit_theme( $id, $theme ) {
		global $wpdb;
		$ts_vgallery_manager_table  = $wpdb->prefix . 'ts_galleryv_manager';
		$ts_galleryv_videos_table   = $wpdb->prefix . 'ts_galleryv_videos';
		$tsvg_get_all               = new ts_vgallery_function();
		$tsvg_themes                = array(
			'Grid Video Gallery'     => 'grid-video-gallery',
			'LightBox Video Gallery' => 'lightBox-video-gallery',
			'Thumbnails Video'       => 'thumbnails-video',
			'Content Popup'          => 'content-popup',
			'Elastic Gallery'        => 'elastic-gallery',
			'Fancy Gallery'          => 'fancy-gallery',
			'Parallax Engine'        => 'parallax-engine',
			'Classic Gallery'        => 'classic-gallery',
			'Space Gallery'          => 'space-gallery',
		);
		$theme_key                  = $tsvg_themes[ $theme ];
		$tsvgallery_def_theme_Style = $tsvg_get_all->tsvg_get_theme_params( $theme_key );
		$ts_vgallery_Question_Copy  = $wpdb->get_row( $wpdb->prepare( "SELECT `TS_VG_Title`, `TS_VG_Option`, `TS_VG_Style`, `TS_VG_Settings`,`TS_VG_Option_Style`, `TS_VG_Sort` FROM $ts_vgallery_manager_table WHERE id = %d", $id ) );
		$wpdb->insert(
			$ts_vgallery_manager_table,
			array(
				'id'                 => '',
				'TS_VG_Title'        => $ts_vgallery_Question_Copy->TS_VG_Title,
				'TS_VG_Option'       => '{"TS_vgallery_Q_Theme":"' . $theme . '"}',
				'TS_VG_Style'        => json_encode( $tsvgallery_def_theme_Style ),
				'TS_VG_Settings'     => $ts_vgallery_Question_Copy->TS_VG_Settings,
				'TS_VG_Option_Style' => $ts_vgallery_Question_Copy->TS_VG_Option_Style,
				'TS_VG_Sort'         => '',
				'TS_VG_Old_User' => 'no',
				'created_at'         => date( 'd.m.Y h:i:sa' ),
				'updated_at'         => date( 'd.m.Y h:i:sa' ),
			),
			array( '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
		);
		$ts_vgallery_Question_Copied = $wpdb->insert_id;
		$ts_galleryv_videos_Copy     = $wpdb->get_results( $wpdb->prepare( "SELECT `id`, `TS_VG_SetType`, `TS_VG_SetName`, `TS_VG_Options` FROM $ts_galleryv_videos_table WHERE TS_VG_SetType = %d", $id ) );
		if ( count( $ts_galleryv_videos_Copy ) != 0 ) {
			$ts_vgallery_Video_Sort          = explode( ',', $ts_vgallery_Question_Copy->TS_VG_Sort );
			$ts_galleryv_videos_Copy_Columned = array_column( json_decode( json_encode( $ts_galleryv_videos_Copy ), true ), null, 'id' );
			for ( $i = 0; $i < count( $ts_galleryv_videos_Copy ); $i++ ) {
				$wpdb->insert(
					$ts_galleryv_videos_table,
					array(
						'id'            => '',
						'TS_VG_SetType' => (int) $ts_vgallery_Question_Copied,
						'TS_VG_SetName' => $ts_galleryv_videos_Copy_Columned[ $ts_vgallery_Video_Sort[ $i ] ]['TS_VG_SetName'],
						'TS_VG_Options' => $ts_galleryv_videos_Copy_Columned[ $ts_vgallery_Video_Sort[ $i ] ]['TS_VG_Options'],
					),
					array( '%d', '%d', '%s', '%s' )
				);
			}
			$ts_galleryv_videos_Copied          = $wpdb->get_results( $wpdb->prepare( "SELECT `id` FROM $ts_galleryv_videos_table WHERE TS_VG_SetType = %d", (int) $ts_vgallery_Question_Copied ) );
			$ts_galleryv_videos_Copied_Imploded = implode( ',', array_column( json_decode( json_encode( $ts_galleryv_videos_Copied ), true ), 'id' ) );
			$wpdb->update( $ts_vgallery_manager_table, array( 'TS_VG_Sort' => $ts_galleryv_videos_Copied_Imploded ), array( 'id' => $ts_vgallery_Question_Copied ), array( '%s' ), array( '%d' ) );
		}
	}
	/**
	 * Returns the count of galleries in the database.
	 *
	 * @return null|string
	 */
	public static function ts_vgallery_question_count() {
		global $wpdb;
		$sql = "SELECT COUNT(*) FROM {$wpdb->prefix}ts_galleryv_manager";
		return $wpdb->get_var( $sql );
	}

	/** Text displayed when no galleries data is available */
	public function no_items() {
		_e( 'No galleries avaliable.' );
	}
	/**
	 * Method for name column
	 *
	 * @param array $item an array of DB data
	 *
	 * @return string
	 */
	function column_name( $item ) {
		// create a nonce
		$ts_vgallery_action_nonce  = wp_create_nonce( 'ts_vgallery_nonce' );
		$tsp_question_param_decode = json_decode( $item['TS_VG_Option'], true );
		$title                     = sprintf( '<strong><a href="?page=%s&tsvg-id=%d" target="_blank">%s</a></strong>', esc_attr( 'ts-vgallery-builder' ), absint( $item['id'] ), esc_html( html_entity_decode( htmlspecialchars_decode( $item['TS_VG_Title'] ), ENT_QUOTES ) ) );
		$actions                   = array(
			'edit'       => sprintf( '<a href="?page=%s&tsvg-id=%s">Edit</a>', esc_attr( 'ts-vgallery-builder' ), absint( $item['id'] ) ),
			'copy'       => sprintf( '<a data-tsvg-action="%s" data-tsvg-id="%d">Copy</a>', 'copy', absint( $item['id'] ) ),
			'edit-theme' => sprintf( '<a data-tsvg-action="%s" data-tsvg-id="%d" data-tsvg-theme="%s">Copy theme</a>', 'edit-theme', absint( $item['id'] ), esc_html( $tsp_question_param_decode['TS_vgallery_Q_Theme'] ) ),
			'delete'     => sprintf( '<a data-tsvg-action="%s" data-tsvg-id="%d">Delete</a>', 'delete', absint( $item['id'] ) ),
		);
		return $title . $this->row_actions( $actions );
	}
	/**
	 * Render a column when no column specific method exists.
	 *
	 * @param array  $item
	 * @param string $column_name
	 *
	 * @return mixed
	 */
	public function column_default( $item, $column_name ) {
		switch ( $column_name ) {
			case 'TS_VG_Title':
				return self::column_name( $item );
			case 'id':
				return '[TS_Video_Gallery id="' . $item[ $column_name ] . '"] <span class="tsp_copy_shorcode" data-tsvg-id="' . $item[ $column_name ] . '">Copy</span>';
			case 'TS_VG_Option':
				$tsp_question_param_decode = json_decode( $item[ $column_name ], true );
				return esc_html( $tsp_question_param_decode['TS_vgallery_Q_Theme'] );
			case 'created_at':
				return esc_html( date( 'F jS, Y', strtotime( $item[ $column_name ] ) ) );
			case 'TS_VG_Sort':
				$gallery_videoes_ids = explode(",", $item[$column_name]);
				return count( $gallery_videoes_ids );
			default:
				return print_r( $item, true ); // Show the whole array for troubleshooting purposes
		}
	}
	/**
	 * Render the bulk edit checkbox
	 *
	 * @param array $item
	 *
	 * @return string
	 */
	function column_cb( $item ) {
		return sprintf(
			'<input type="checkbox" name="tsvgallery_ids[]" value="%s" />',
			$item['id']
		);
	}
	/**
	 * Associative array of columns
	 *
	 * @return array
	 */
	function get_columns() {
		$columns = array(
			'cb'           => '<input type="checkbox" />',
			'TS_VG_Title'  => __( 'Title' ),
			'id'           => __( 'Shortcode' ),
			'TS_VG_Option' => __( 'Video theme' ),
			'created_at'   => __( 'Created At' ),
			'TS_VG_Sort' => __( 'Videos Count')
		);
		return $columns;
	}
	/**
	 * Columns to make sortable.
	 *
	 * @return array
	 */
	public function get_sortable_columns() {
		$sortable_columns = array(
			'created_at'  => array( 'created_at', false ),
			'TS_VG_Title' => array( 'TS_VG_Title', true ),
		);
		return $sortable_columns;
	}
	/**
	 * Returns an associative array containing the bulk action
	 *
	 * @return array
	 */
	public function get_bulk_actions() {
		$actions = array(
			'bulk-delete' => 'Delete',
			'bulk-copy'   => 'Copy',
		);
		return $actions;
	}
	public function ts_vgallery_admin_notice( $class, $message ) {
		return sprintf( '<div class="%1$s is-dismissible"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
	}
	/**
	 * Handles data query and filter, sorting, and pagination.
	 */
	public function process_bulk_action() {
		if ( isset( $_POST['action'] ) || isset( $_POST['action2'] ) ) {
			if ( ! isset( $_POST['ts_vgallery_action_nonce'] )
				|| ! wp_verify_nonce( $_POST['ts_vgallery_action_nonce'], 'ts_vgallery_action' )
			) {
				echo self::ts_vgallery_admin_notice( 'notice notice-error ', 'Sorry, your nonce did not verify.' );
				exit;
			} else {
				// If the bulk action is triggered
				$ts_vgallery_post_action = isset( $_POST['action'] ) ? sanitize_text_field( $_POST['action'] ) : sanitize_text_field( $_POST['action2'] );
				if ( isset( $_POST['tsvgallery_ids'] ) ) {
					$count           = count( $_POST['tsvgallery_ids'] );
					$ts_vgallery_ids = esc_sql( $_POST['tsvgallery_ids'] );
					if ( $ts_vgallery_post_action == 'bulk-delete' ) {
						// loop over the array of record IDs and delete them
						foreach ( $ts_vgallery_ids as $id ) {
							self::ts_vgallery_delete( $id );
						}
						echo self::ts_vgallery_admin_notice( 'notice notice-success', "{$count} galleries was successfully deleted." );
					} elseif ( $ts_vgallery_post_action == 'bulk-copy' ) {
						// loop over the array of record IDs and copy them
						foreach ( $ts_vgallery_ids as $id ) {
							self::ts_vgallery_copy( $id );
						}
						echo self::ts_vgallery_admin_notice( 'notice notice-success', "{$count} galleries was successfully copied." );
					} elseif ( $ts_vgallery_post_action == 'bulk-edit-theme' ) {
						$ts_vgallery_opt = esc_sql( $_POST['TotalSoftGallery_Video_Option'] );
						// loop over the array of record IDs and copy them
						foreach ( $ts_vgallery_ids as $id ) {
							self::ts_vgallery_edit_theme( $id, $ts_vgallery_opt );
						}
						echo self::ts_vgallery_admin_notice( 'notice notice-success', "{$count} galleries was successfully copied." );
					} else {
						echo self::ts_vgallery_admin_notice( 'notice notice-error ', 'Not valid action.' );
					}
				}
			}
		}
	}
	public function ts_vgallery_nonce_field() {
		return wp_nonce_field( 'ts_vgallery_action', 'ts_vgallery_action_nonce' );
	}
	public function ts_vgallery_confirm_modal() {
		echo sprintf(
			'<section id="ts_vgallery_confirm_modal" style="display: none;">
    			<div id="ts_vgallery_confirm_inner" >
					<div id="ts_vgallery_confirm_content">
    		    		<header><div></div><p>Are you sure?</p></header>
    		    		<main></main>
    		    		</hr>
    		   			<footer>
    		   			    <form action="" id="ts_vgallery_modal_form" method="POST">
    		   			        	%s
    		   			        <input type="hidden" id="ts_vgallery_actioned_item" name="tsvgallery_ids[]" value="" style="display:none;">
    		   			        <input type="hidden" id="ts_vgallery_action_input" name="action" value="" style="display:none;">
    		   			        <input type="button" class="ts_vgallery_cancel_btn" value="Cancel"><input type="submit" name="submit" value="Delete" class="ts_vgallery_submit_btn">
    		   			    </form>
    		   			</footer>
    		    		<button type="button" id="ts_vgallery_close_btn">×</button>
					</div>
				</div>
			</section>
			',
			self::ts_vgallery_nonce_field()
		);
	}
	public function prepare_items() {
		$this->_column_headers = $this->get_column_info();
		/** Process bulk action */
		$this->process_bulk_action();
		$per_page     = $this->get_items_per_page( 'ts_vgallerys_per_page', 5 );
		$current_page = $this->get_pagenum();
		$total_items  = self::ts_vgallery_question_count();
		$this->set_pagination_args(
			array(
				'total_items' => $total_items, // WE have to calculate the total number of items
				'per_page'    => $per_page, // WE have to determine how many items to show on a page
			)
		);
		$this->items = self::ts_get_vgallerys( $per_page, $current_page );
	}
}
