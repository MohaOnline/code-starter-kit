<?php
if ( ! class_exists( 'Random_News_Tab_Filter_Widget' ) ) {
	/**
	 * Adds Random News Tab Filter.
	 */
	class Random_News_Tab_Filter_Widget extends WP_Widget {

		/**
		 * Register widget with WordPress.
		 */
		public function __construct() {
			$random_news_tab_filter_widget = array(
				'classname'   => 'widget adore-widget tab-filter-widget',
				'description' => __( 'Retrive Tab Filter Widget', 'random-news' ),
			);
			parent::__construct(
				'random_news_tab_filter_widget',
				__( 'Random News: Tab Filter Widget', 'random-news' ),
				$random_news_tab_filter_widget
			);
		}

		/**
		 * Front-end display of widget.
		 *
		 * @see WP_Widget::widget()
		 * @param array $args     Widget arguments.
		 * @param array $instance Saved values from database.
		 */
		public function widget( $args, $instance ) {
			if ( ! isset( $args['widget_id'] ) ) {
				$args['widget_id'] = $this->id;
			}
			$section_title = ! empty( $instance['title'] ) ? $instance['title'] : '';
			$section_title = apply_filters( 'widget_title', $section_title, $instance, $this->id_base );
			$posts_offset  = isset( $instance['offset'] ) ? absint( $instance['offset'] ) : '';

			echo $args['before_widget'];
			?>
			<div class="tab-filter-main">
				<div class="widget-header <?php echo esc_attr( ! empty( $section_title ) ? '' : 'no-title' ); ?>">
					<?php
					if ( ! empty( $section_title ) ) {
						echo $args['before_title'] . esc_html( $section_title ) . $args['after_title'];
					}
					?>
					<ul id="tabs-navs" class="tabs-nav-filter">
						<?php
						for ( $i = 1; $i <= 4; $i++ ) {
							$select_category = isset( $instance[ 'select_category' . '-' . $i ] ) ? absint( $instance[ 'select_category' . '-' . $i ] ) : '';
							$tab_category    = get_category( $select_category );
							if ( ! empty( $select_category ) ) {
								?>
								<li><a href="#<?php echo esc_attr( $tab_category->slug ); ?>"><?php echo esc_html( $tab_category->name ); ?></a></li>
								<?php
							}
						}
						?>
					</ul> <!-- END tabs-nav -->
				</div>
				<div class="tab-filter-widget-tabs">
					<div id="tabs-content-wrapper">
						<?php
						for ( $i = 1; $i <= 4; $i++ ) {
							$select_category = isset( $instance[ 'select_category' . '-' . $i ] ) ? absint( $instance[ 'select_category' . '-' . $i ] ) : '';
							if ( ! empty( $select_category ) ) {
								$tab_category = get_category( $select_category );
								$tab_slug     = $tab_category->slug;
								?>
								<div id="<?php echo esc_attr( $tab_slug ); ?>" class="tab-contents ">
									<div class="express-list-widget-wrapper">
										<?php
										$posts_tabs_widgets_args = array(
											'post_type' => 'post',
											'posts_per_page' => absint( 4 ),
											'offset'    => absint( $posts_offset ),
											'orderby'   => 'date',
											'order'     => 'desc',
											'cat'       => absint( $select_category ),
										);
										$query                   = new WP_Query( $posts_tabs_widgets_args );
										$j                       = 1;
										if ( $query->have_posts() ) :
											while ( $query->have_posts() ) :
												$query->the_post();
												?>
												<div class="post-item <?php echo esc_attr( $j === 1 ? 'overlay-post' : 'post-list' ); ?>">
													<div class="post-item-image">
														<a href="<?php the_permalink(); ?>">
															<?php the_post_thumbnail(); ?>						
														</a>
													</div>
													<div class="post-item-content">
														<?php if ( $j === 1 ) : ?>
															<div class="entry-cat">
																<?php the_category( '', '', get_the_ID() ); ?>
															</div>
														<?php endif ?>
														<h3 class="entry-title">
															<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														</h3>  
														<ul class="entry-meta">
															<li class="post-author"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><span class="far fa-user"></span><?php echo esc_html( get_the_author() ); ?></a></li>
															<li class="post-date"> <span class="far fa-calendar-alt"></span><?php echo esc_html( get_the_date() ); ?></li>
															<li class="post-comment"> <span class="far fa-comment"></span><?php echo absint( get_comments_number( get_the_ID() ) ); ?></li>
														</ul>
													</div>
												</div>
												<?php
												$j++;
											endwhile;
											wp_reset_postdata();
										endif;
										?>
									</div>
								</div>
								<?php
							}
						}
						?>
					</div> <!-- END tabs-content -->
				</div> <!-- END tabs -->
			</div>
			<?php
			echo $args['after_widget'];
		}

		/**
		 * Back-end widget form.
		 *
		 * @see WP_Widget::form()
		 * @param array $instance Previously saved values from database.
		 */
		public function form( $instance ) {
			$section_title = isset( $instance['title'] ) ? $instance['title'] : '';
			$posts_offset  = isset( $instance['offset'] ) ? absint( $instance['offset'] ) : '';
			?>
			<p>
				<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Section Title:', 'random-news' ); ?></label>
				<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $section_title ); ?>" />
			</p>
			<?php
			for ( $i = 1; $i <= 4; $i++ ) {
				$select_category = isset( $instance[ 'select_category' . '-' . $i ] ) ? absint( $instance[ 'select_category' . '-' . $i ] ) : '';
				?>
				<p>
					<label for="<?php echo esc_attr( $this->get_field_id( 'select_category' . '-' . $i ) ); ?>"><?php echo sprintf( esc_html__( 'Select Category %d :', 'random-news' ), $i ); ?></label>
					<select id="<?php echo esc_attr( $this->get_field_id( 'select_category' . '-' . $i ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'select_category' . '-' . $i ) ); ?>" class="widefat" style="width:100%;">
						<?php
						$categories = random_news_get_post_cat_choices();
						foreach ( $categories as $category => $value ) {
							?>
							<option value="<?php echo absint( $category ); ?>" <?php selected( $select_category, $category ); ?>><?php echo esc_html( $value ); ?></option>
						<?php } ?>      
					</select>
				</p>
			<?php } ?>
			<p>
				<label for="<?php echo esc_attr( $this->get_field_id( 'offset' ) ); ?>"><?php esc_html_e( 'Number of posts to displace or pass over:', 'random-news' ); ?></label>
				<input class="tiny-text" id="<?php echo esc_attr( $this->get_field_id( 'offset' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'offset' ) ); ?>" type="number" step="1" min="0" value="<?php echo absint( $posts_offset ); ?>" size="3" />
			</p>

			<?php
		}

		/**
		 * Sanitize widget form values as they are saved.
		 *
		 * @see WP_Widget::update()
		 * @param array $new_instance Values just sent to be saved.
		 * @param array $old_instance Previously saved values from database.
		 * @return array Updated safe values to be saved.
		 */
		public function update( $new_instance, $old_instance ) {

			$instance           = $old_instance;
			$instance['title']  = sanitize_text_field( $new_instance['title'] );
			$instance['offset'] = (int) $new_instance['offset'];
			for ( $i = 1; $i <= 4; $i++ ) {
				$instance[ 'select_category' . '-' . $i ] = (int) $new_instance[ 'select_category' . '-' . $i ];
			}
			return $instance;
		}

	}
}


