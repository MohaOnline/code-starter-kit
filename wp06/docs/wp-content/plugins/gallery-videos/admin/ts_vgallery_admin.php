<section class="tsvg_admin_section">
	<header class="tsvg_admin_header">
		<div>
			<span>
				TS Video Gallery
			</span>
		</div>
		<div>
			<img src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . 'img/TS-VG-Logo.png' ); ?>"  alt="TS vgallery">
		</div>
		<div>
			<a href="<?php echo esc_url( 'https://total-soft.com/wp-video-gallery/' ); ?>" target="_blank">Upgrade to pro</a>
		</div>
	</header>
	<div class="tsvg_manager_field">
		<div id="tsvg_vgallerys_field">
			<div id="post-body" class="metabox-holder">
				<div id="post-body-content">
					<div class="meta-box-sortables ui-sortable">
						<form method="post" id="ts_vgallery_form">
						<?php
							$this->ts_vgallery_question_obj->ts_vgallery_nonce_field();
							$this->ts_vgallery_question_obj->prepare_items();
						?>
						<div class="ts_vgallery_admin_bar">
							<div class="ts_vgallery_nav">
								<div class="ts_vgallery_nav_link">
									<a>Dashboard</a>
								</div>
								<div class="ts_vgallery_nav_link">
									<a href="<?php echo esc_url( admin_url( 'admin.php?page=ts-vgallery-builder' ) ); ?>" >Create Gallery</a>
								</div>
								<div class="ts_vgallery_nav_link">
									<a href="<?php echo esc_url( 'https://wordpress.org/support/plugin/gallery-videos/' ); ?>" target="_blank">Support</a>
								</div>
								<div class="ts_vgallery_nav_link">
									<a href="<?php echo esc_url( 'https://total-soft.com/wp-video-gallery/' ); ?>" target="_blank">Go Pro</a>
								</div>
							</div>
							<div class="ts_vgallery_searchbar">
								<?php $this->ts_vgallery_question_obj->search_box( 'Search', 'search_id' ); ?>
							</div>
						</div>
						<?php
							$this->ts_vgallery_question_obj->display();
						?>
						</form>
					</div>
				</div>
			</div>
			<br class="clear">
		</div>
	</div>
</section>
<?php
$this->ts_vgallery_question_obj->ts_vgallery_confirm_modal();
