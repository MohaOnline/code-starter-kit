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
 /* popup 1*/
$tsvg_figur_popup       = '';
$tsvg_figur_edith_popup = '';
for ( $i = 0;$i < $ts_galleryv_videos_Count;$i ++ ) {
	$ts_vgallery_Question_TS_VG_Options = json_decode( $ts_galleryv_videos_Query[ $i ]->TS_VG_Options );
	$TS_VGallery_url_v    = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd;
	$TS_VGallery_url_i    = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_img.jpg', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	$TS_VGallery_url_vont = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_vont == '' ? '_self' : '_blank';
	switch ( true ) {
		case $TS_VGallery_url_v == '':
			  $elem      = sprintf( '<div class="TotalSoft_GV_SG_Imagediv"><img src="%s"></div>', esc_url( $TS_VGallery_url_i ) );
			  $class_url = 'imagecontainer';
			break;
		case strpos( $TS_VGallery_url_v, '.mp4' ) > - 1:
			  $elem      = sprintf( '<div class="TotalSoft_GV_SG_Videodiv"> <video controls controlslist="nodownload" poster="%s"> <source src="%s" type="video/mp4"> </video></div>', esc_url( $TS_VGallery_url_i ), esc_url( $TS_VGallery_url_v ) );
			  $class_url = 'TS_VGallery_Video_Container';
			break;
		case strpos( $TS_VGallery_url_v, 'youtube' ) > - 1:
			  $elem      = sprintf( '<div class="TotalSoft_GV_SG_Videodiv"> <iframe src="%s" frameborder="0" webkitAllowFullScreen></iframe></div>', esc_url( $TS_VGallery_url_v ) );
			  $class_url = 'iframecontainer';
			break;
		default:
			  $elem      = sprintf( '<div class="TotalSoft_GV_SG_Videodiv"> <iframe src="%s" frameborder="0" webkitAllowFullScreen></iframe></div>', esc_url( $TS_VGallery_url_v ) );
			  $class_url = 'iframecontainer';
			break;
	}
	$tsvg_figur_popup      .= sprintf(
		"
    	<li class='%s TS_VGallery_item tsvg-%s' data-tsvg-id='%s' >
    	  	<figure class='TS_VGallery_item_block__%s' data-tsvg-effect='%s'>
    	   		<figcaption class='TS_VGallery_item_block_title__%s' data-tsvg-position='%s'  data-tsvg-bool='%s' data-tsvg-effect='%s' >
    	      		%s
    	   		</figcaption>
    	   		<div class='TS_VGallery__GV_GG_SP TS_VGallery_item_block_desc__%s' data-tsvg-bool='%s'>
    	      		%s
    	   		</div>
    	   		<div class='TS_VGallery__GV_GG_SP TS_VGallery_item_block_link__%s' >
    	      		<a class='TS_VGallery__GV_GVG_Link%s' href='%s' target='%s' >%s</a>
    	  		</div>
    	    	%s
    	  	</figure>
    	</li>
  		",
		esc_attr( $class_url ),
		esc_attr( $i ),
		$ts_galleryv_videos_Query[ $i ]->id,
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_22 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Query[ $i ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_23 ),
		wp_unslash( html_entity_decode( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_desc ) ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link ),
		esc_attr( $TS_VGallery_url_vont ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05 ), ENT_QUOTES ) ),
		$elem
	);
	$tsvg_figur_edith_popup = $i == 0 ?: $tsvg_figur_popup;
}
