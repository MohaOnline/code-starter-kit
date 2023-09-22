<?php

/**
 * Videos: "Thumbnail Image" meta box.
 *
 * @link    https://plugins360.com
 * @since   3.5.0
 *
 * @package All_In_One_Video_Gallery
 */
?>

<div id="aiovg-image-uploader" class="aiovg-input-wrap aiovg-media-uploader">                                                
	<input type="text" name="image" id="aiovg-image" class="text" placeholder="<?php esc_attr_e( 'Enter your direct file URL (OR) upload your file using the button here', 'all-in-one-video-gallery' ); ?> &rarr;" value="<?php echo esc_attr( $image ); ?>" />
	<div class="aiovg-upload-media hide-if-no-js">
		<a href="javascript:;" id="aiovg-upload-image" class="button button-secondary" data-format="image">
			<?php esc_html_e( 'Upload File', 'all-in-one-video-gallery' ); ?>
		</a>
	</div>
</div>				

<?php do_action( 'aiovg_admin_after_image_field' ); ?> 

<div id="aiovg-video-image-footer">
	<div class="aiovg-input-wrap aiovg-field-image_alt">
		<label for="aiovg-image_alt"><?php esc_html_e( 'Image Alt Text', 'all-in-one-video-gallery' ); ?></label>
		<input type="text" name="image_alt" id="aiovg-image_alt" class="text" placeholder="<?php esc_attr_e( 'Optional', 'all-in-one-video-gallery' ); ?>" value="<?php echo esc_attr( $image_alt ); ?>" />
		<p class="description">
			<a href="https://www.w3.org/WAI/tutorials/images/decision-tree" target="_blank" rel="noopener">
				<?php esc_html_e( 'Learn how to describe the purpose of the image.', 'all-in-one-video-gallery' ); ?>
			</a>
		</p>
	</div>

	<?php if ( ! empty( $featured_images_settings['enabled'] ) ) : ?>
		<p>
			<label>
				<input type="checkbox" name="set_featured_image" value="1" <?php checked( $set_featured_image, 1 ); ?>/>
				<?php esc_html_e( 'Store this image as a featured image', 'all-in-one-video-gallery' ); ?>
			</label>
		</p>
	<?php endif; ?>
</div>
      		

<?php
// Add a nonce field
wp_nonce_field( 'aiovg_save_video_image', 'aiovg_video_image_nonce' );