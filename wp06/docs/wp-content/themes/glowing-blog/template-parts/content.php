<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Glowing Blog
 */

$archive_category = get_theme_mod( 'glowing_blog_enable_archive_category', true );
$archive_author   = get_theme_mod( 'glowing_blog_enable_archive_author', true );
$archive_date     = get_theme_mod( 'glowing_blog_enable_archive_date', true );
$read_more_button = get_theme_mod( 'glowing_blog_archive_page_readmore_button', __( 'Read More', 'glowing-blog' ) );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="post-item post-list">
			<div class="post-item-image">
				<?php glowing_blog_post_thumbnail(); ?>
				<div class="read-time-comment">
					<span class="reading-time">
						<i class="far fa-hourglass"></i>
						<?php
						echo glowing_blog_time_interval( get_the_content() );
						echo esc_html__( ' min', 'glowing-blog' );
						?>
					</span>
					<span class="comment">
						<i class="far fa-comment"></i>
						<?php echo absint( get_comments_number( get_the_ID() ) ); ?>
					</span>
				</div>
				<?php if ( $archive_category === true ) : ?>
					<div class="entry-cat">
						<?php the_category( '', '', get_the_ID() ); ?>
					</div>
				<?php endif; ?>
			</div>
		<div class="post-item-content">
			<?php
				if ( is_singular() ) :
					the_title( '<h1 class="entry-title">', '</h1>' );
				else :
					the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
				endif;
			if ( 'post' === get_post_type() ) :
				?>
				<ul class="entry-meta">
					<?php if ( $archive_author === true ) : ?>
						<li class="post-author"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"><i class="far fa-user"></i><?php echo esc_html( get_the_author() ); ?></a></li>
					<?php endif; ?>
					<?php if ( $archive_date === true ) : ?>
						<li class="post-date"><i class="far fa-calendar-alt"></i></span><?php echo esc_html( get_the_date() ); ?></li>
					<?php endif; ?>
				</ul>
			<?php endif; ?>
				<div class="post-content">
					<?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), get_theme_mod( 'glowing_blog_excerpt_length', 15 ) ) ); ?>
				</div><!-- post-content -->
			<?php if ( ! empty( $read_more_button ) ) : ?>
				<div class="post-btn">
					<a href="<?php the_permalink(); ?>" class="btn-read-more"><?php echo esc_html( $read_more_button ); ?></a>
				</div>
			<?php endif; ?>
		</div>
	</div>
</article><!-- #post-<?php the_ID(); ?> -->
