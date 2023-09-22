<?php
/**
 * Template part for displaying front page introduction.
 *
 * @package Superior News
 */

// Banner Section.
$banner_section = get_theme_mod( 'superior_news_banner_section_enable', false );

if ( false === $banner_section ) {
	return;
}

$grid_post_content_ids   = array();
$grid_posts_content_type = get_theme_mod( 'superior_news_grid_posts_content_type', 'post' );

if ( $grid_posts_content_type === 'post' ) {

	for ( $i = 1; $i <= 3; $i++ ) {
		$grid_post_content_ids[] = get_theme_mod( 'superior_news_grid_posts_post_' . $i );
	}

	$grid_posts_args = array(
		'post_type'           => 'post',
		'post__in'            => array_filter( $grid_post_content_ids ),
		'orderby'             => 'post__in',
		'posts_per_page'      => absint( 3 ),
		'ignore_sticky_posts' => true,
	);

} elseif ( $grid_posts_content_type === 'category' ) {
	$cat_content_id  = get_theme_mod( 'superior_news_grid_posts_category' );
	$grid_posts_args = array(
		'cat'            => $cat_content_id,
		'posts_per_page' => absint( 3 ),
	);
}

?>

<div id="superior_news_banner_section" class="main-banner-section style-3 adore-navigation">
	<div class="theme-wrapper">
		<div class="main-banner-section-wrapper">

			<!-- Grid Post -->
			<div class="banner-grid-outer">
				<div class="banner-grid-wrapper">
					<?php
					$grid_posts = new WP_Query( $grid_posts_args );
					if ( $grid_posts->have_posts() ) {
						while ( $grid_posts->have_posts() ) :
							$grid_posts->the_post();
							?>
							<div class="post-item overlay-post slider-item" style="background-image: url('<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'full' ) ); ?>');">
								<div class="blog-banner">
									<div class="post-overlay">
										<div class="post-item-content">
											<div class="entry-cat">
												<?php the_category( '', '', get_the_ID() ); ?>
											</div>
											<h2 class="entry-title">
												<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
											</h2>
											<ul class="entry-meta">
												<li class="post-author"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><span class="far fa-user"></span><?php echo esc_html( get_the_author() ); ?></a></li>
												<li class="post-date"> <span class="far fa-calendar-alt"></span><?php echo esc_html( get_the_date() ); ?></li>
												<li class="post-comment"><span class="far fa-comment"></span><?php echo absint( get_comments_number( get_the_ID() ) ); ?></li>
											</ul>
										</div>   
									</div>
								</div>
							</div>
							<?php
						endwhile;
						wp_reset_postdata();
					}
					?>
				</div>
			</div>
			<!-- End Grid Post -->

			<?php
			$latest_news_enable = get_theme_mod( 'superior_news_latest_news_tab_enable', true );
			$random_news_enable = get_theme_mod( 'superior_news_random_news_tab_enable', true );

			if ( $latest_news_enable === true || $random_news_enable === true ) {

				?>
				<!-- Post Tab -->
				<div class="post-tabs-wrapper">
					<div class="post-tabs-head">
						<ul class="post-tabs">
							<?php if ( $latest_news_enable === true ) : ?>
								<li><a href="#tab-1" class="latest"><i class="far fa-clock"></i><?php echo esc_html__( 'Latest News', 'superior-news' ); ?></a></li>
							<?php endif; ?>
							<?php if ( $random_news_enable === true ) : ?>
								<li><a href="#tab-3" class="latest"><i class="fas fa-random"></i><?php echo esc_html__( 'Random News', 'superior-news' ); ?></a></li>
							<?php endif; ?>
						</ul>
					</div>
					<div class="post-tab-content-wrapper">
						<?php if ( $latest_news_enable === true ) : ?>
							<div class="post-tab-container" id="tab-1">
								<?php
								$latest_news_args  = array(
									'post_type'      => 'post',
									'post_status'    => 'publish',
									'posts_per_page' => absint( 5 ),
								);
								$latest_news_query = new WP_Query( $latest_news_args );
								if ( $latest_news_query->have_posts() ) :
									while ( $latest_news_query->have_posts() ) :
										$latest_news_query->the_post();
										?>
										<div class="post-item post-list">
											<div class="post-item-image">
												<?php the_post_thumbnail( 'thumbnail' ); ?>
											</div>
											<div class="post-item-content">
												<h3 class="entry-title">
													<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
												</h3>  
												<ul class="entry-meta">
													<li class="post-author"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><span class="far fa-user"></span><?php echo esc_html( get_the_author() ); ?></a></li>
													<li class="post-date"> <span class="far fa-calendar-alt"></span><?php echo esc_html( get_the_date() ); ?></li>
													<li class="post-comment"><span class="far fa-comment"></span><?php echo absint( get_comments_number( get_the_ID() ) ); ?></li>
												</ul>
											</div>
										</div>
										<?php
									endwhile;
									wp_reset_postdata();
								endif;
								?>
							</div>
						<?php endif; ?>

						<?php if ( $random_news_enable === true ) : ?>
							<div class="post-tab-container" id="tab-3">

								<?php
								$random_posts_args = array(
									'posts_per_page'      => 5,
									'post_type'           => 'post',
									'ignore_sticky_posts' => true,
									'orderby'             => 'rand',
								);
								$random_query      = new WP_Query( $random_posts_args );
								if ( $random_query->have_posts() ) {
									while ( $random_query->have_posts() ) :
										$random_query->the_post();
										?>

										<div class="post-item post-list">
											<div class="post-item-image">
												<?php the_post_thumbnail( 'thumbnail' ); ?>
											</div>
											<div class="post-item-content">
												<h3 class="entry-title">
													<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
												</h3>  
												<ul class="entry-meta">
													<li class="post-author"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><span class="far fa-user"></span><?php echo esc_html( get_the_author() ); ?></a></li>
													<li class="post-date"> <span class="far fa-calendar-alt"></span><?php echo esc_html( get_the_date() ); ?></li>
													<li class="post-comment"><span class="far fa-comment"></span><?php echo absint( get_comments_number( get_the_ID() ) ); ?></li>
												</ul>
											</div>
										</div>

										<?php
									endwhile;
									wp_reset_postdata();
								}
								?>

							</div>
						<?php endif; ?>

					</div>
				</div>
				<!-- End Post Tab -->

			<?php } ?>


		</div>
	</div>
</div>
