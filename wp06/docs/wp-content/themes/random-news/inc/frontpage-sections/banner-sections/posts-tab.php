<!-- Post Tab -->
<div class="post-tabs-wrapper">
	<div class="post-tabs-head">
		<ul class="post-tabs">
			<li><a href="#tab-1" class="latest"><i class="far fa-clock"></i><?php echo esc_html( 'Latest News', 'random-news' ); ?></a></li>
			<li><a href="#tab-3" class="latest"><i class="fas fa-random"></i><?php echo esc_html( 'Random News', 'random-news' ); ?></a></li>
		</ul>
	</div>
	<div class="post-tab-content-wrapper">
		
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

	</div>
</div>
<!-- End Post Tab -->
