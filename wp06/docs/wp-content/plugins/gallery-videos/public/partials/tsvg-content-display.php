<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * This file include main and footer section of video gallery.
 *
 * @link       TS-Video-Gallery
 * @since      1.7.7
 *
 * @package    TS_Video_Gallery
 * @subpackage TS_Video_Gallery/public/partials
 */
if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Grid Video Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-grid-video-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'LightBox Video Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-lightbox-video-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Thumbnails Video' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-thumbnails-video-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Content Popup' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-content-popup-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Elastic Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-elastic-video-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Fancy Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-fancy-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Parallax Engine' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-parallax-engine-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Classic Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-classic-gallery.php';
} elseif ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Space Gallery' ) {
	include TS_VGALLERY_PLUGIN_ENV . 'public/theme_partials/tsvg-space-gallery.php';
}
