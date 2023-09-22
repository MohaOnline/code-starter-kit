<!-- banner slider -->
<div class="banner-slider-outer">
	<div class="banner-slider" data-slick='{"autoplay": true, "arrows": true }'>
		<?php
		$banner_query = new WP_Query( $banner_args );
		if ( $banner_query->have_posts() ) {
			while ( $banner_query->have_posts() ) :
				$banner_query->the_post();

				?>
				<div class="post-item-outer">
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
				</div>
				<?php
			endwhile;
			wp_reset_postdata();
		}
		?>
	</div>
</div>
<!-- end banner slider -->
