<style type="text/css">
	:root{
	  	--tsvg_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_VALIDATE_INT ); ?>;
	  	--tsvg_p_bw_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_11 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_vi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_12 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_vi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_13 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_op_oc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_op_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_op_br_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_op_sc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_ao_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_ao_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_ao_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34 ), FILTER_VALIDATE_INT ); ?>%;
	  	--tsvg_popup_tip_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_tip_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_nc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_ns_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_cio_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_cio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_cio_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37 ), FILTER_VALIDATE_INT ); ?>%;
	}
	.TS_VGallery_effect-container{
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		width: 100%!important;
		height: 100%!important;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fallPerspective' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fly' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'flip' ) { ?>
			 -webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'helix' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'popUp' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } ?>
	    position: relative;
		float: left;
		width: 100%;
	}
	.boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 0;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'moveUp' ) { ?>
			-webkit-transform: translateY(200px);
			-moz-transform: translateY(200px);
			transform: translateY(200px);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'scaleUp' ) { ?>
			-webkit-transform: scale(0.6);
			-moz-transform: scale(0.6);
			transform: scale(0.6);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fallPerspective' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
			-moz-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
			transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fly' ) {
			?>
			 -webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform-origin: 50% 50% -300px;
			-moz-transform-origin: 50% 50% -300px;
			transform-origin: 50% 50% -300px;
			-webkit-transform: rotateX(-180deg);
			-moz-transform: rotateX(-180deg);
			transform: rotateX(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'flip' ) {
			?>
			 -webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform-origin: 0% 0%;
			-moz-transform-origin: 0% 0%;
			transform-origin: 0% 0%;
			-webkit-transform: rotateX(-80deg);
			-moz-transform: rotateX(-80deg);
			transform: rotateX(-80deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'helix' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: rotateY(-180deg);
			-moz-transform: rotateY(-180deg);
			transform: rotateY(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'popUp' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: scale(0.4);
			-moz-transform: scale(0.4);
			transform: scale(0.4);
		<?php } ?>
	}
	.TS_VGallery_effect-container .TS_VGallery_effect-blocks{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		width: 100%!important;
		height: 100%!important;
	}
	
	li.TS_VGallery_effect-blocks_item .adipoli-wrapper{
		margin: 0;
		position: unset;
	}
	.TS_VGallery_effect-container .TS_VGallery_effect-block{
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		list-style-type: none;
		margin: 0;
		width: 100%!important;
		height: 100%!important;
	}
	.TS_VGallery_effect-container .TS_VGallery_tv_<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		margin:  var(--tsvg_p_bw_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		width:calc( calc(100% - calc(2 * var(--tsvg_p_bw_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) *  var(--tsvg_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) ) / var(--tsvg_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))!important;
	}
	.TS_VGallery_effect-container .TS_VGallery_effect-block__item {
		display: inline-block;
		max-width: none;
		border: none;
		opacity: 1;
		width: 100%!important;
		height: 100%!important; 
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TS_VGallery_effect-block__item {
		position: relative;
		padding-bottom: 56.25%;
		width: 100%!important;
		height: 100%!important; 
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TS_VGallery_effect-block__item>img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%!important;
		height: 100%!important;
	}
	
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .adipoli-wrapper {
		width: 100%!important;
		height: 100%!important; 
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .adipoli-wrapper>img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%!important;
		height: 100%!important;
	}
	
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .adipoli-before {
		position: absolute;
		z-index: 5;
		top: 0;
		left: 0;
		width: 100%!important;
		height: 100%!important;
		background: rgba(30, 115, 190, 0.3);
		color: rgb(255, 255, 255);
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .adipoli-after  {
		position: absolute;
		z-index: 10;
		display: none;
	}
	.TS_VGallery_tv_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:not(.TS_VGallery_tv_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-ef='popout'])  .adipoli-after{
		width: 100%!important;
		height: 100%!important;
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery    .adipoli-after img  {
		width: 100%!important;
		height: 100%!important;
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .adipoli-slice {
		display: block;
		position: absolute;
		z-index: 15;
		height: 100%;
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .adipoli-box {
		display: block;
		position: absolute;
		z-index: 15;
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .totalsoft_gv_tv_row {
		opacity: 1 !important;
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   div.boxer-caption{
		display:block;
	}
	.TS_VGallery_tv_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .adipoli-before p {
		position: relative;
		color: var(--tsvg_vi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 0px !important;
		text-align: center !important;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		z-index: 9999999999;
		font-size: var(--tsvg_vi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer-overlay {
		background: var(--tsvg_popup_op_oc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: fixed !important;
		z-index: 999999999!important;
		opacity: 1 !important;
		transition: opacity 0.25s linear;
	}
	#boxer {
		border-radius: var(--tsvg_popup_op_br_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 0 25px var(--tsvg_popup_op_sc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer[data-tsvg-popup_bacg='true']{
		background: var(--tsvg_popup_op_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer[data-tsvg-titl_bacg='true'] .boxer-container , #boxer.mobile .boxer-content {
	   	background: var(--tsvg_popup_tip_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer .boxer-caption p {
		color: var(--tsvg_popup_tip_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_popup_tip_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_popup_tip_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer[data-tsvg-titl_position='left'] .boxer-container p {text-align:left;}
	#boxer[data-tsvg-titl_position='center'] .boxer-container p {text-align:center;}
	#boxer[data-tsvg-titl_position='right'] .boxer-container p {text-align:right;}
	#boxer .boxer-caption {
		background: none !important;
		border: none !important;
	}
	#boxer .boxer-position {
		color: var(--tsvg_popup_tip_nc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_popup_tip_ns_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		perspective: 800px;
		transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
	}
	#boxer .boxer-control {
		background: var(--tsvg_popup_ao_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: var(--tsvg_popup_ao_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer .boxer-control.previous:before {
		border-right: 10.4px solid var(--tsvg_popup_ao_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer .boxer-control.next:before {
		border-left: 10.4px solid var(--tsvg_popup_ao_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer .boxer-close {
		background: var(--tsvg_popup_cio_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: var(--tsvg_popup_cio_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	#boxer .boxer-close:before {
		color: var(--tsvg_popup_cio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.adipoli-slice {
		display: block;
		position: absolute;
		z-index: 15;
		height: 100%;
	}
	.adipoli-box {
		display: block;
		position: absolute;
		z-index: 15;
	}
	.totalsoft_gv_tv_row {
		opacity: 1 !important;
	}
	.totalsoft_gv_tv_row p {
		position: relative;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_13; ?>;
		margin: 0px !important;
		text-align: center !important;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		z-index: 9999999999;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_12; ?>px;
	}
	.boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 0;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'moveUp' ) { ?>
			-webkit-transform: translateY(200px);
			-moz-transform: translateY(200px);
			transform: translateY(200px);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'scaleUp' ) { ?>
			-webkit-transform: scale(0.6);
			-moz-transform: scale(0.6);
			transform: scale(0.6);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fallPerspective' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
			-moz-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
			transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'fly' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform-origin: 50% 50% -300px;
			-moz-transform-origin: 50% 50% -300px;
			transform-origin: 50% 50% -300px;
			-webkit-transform: rotateX(-180deg);
			-moz-transform: rotateX(-180deg);
			transform: rotateX(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'flip' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform-origin: 0% 0%;
			-moz-transform-origin: 0% 0%;
			transform-origin: 0% 0%;
			-webkit-transform: rotateX(-80deg);
			-moz-transform: rotateX(-80deg);
			transform: rotateX(-80deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'helix' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: rotateY(-180deg);
			-moz-transform: rotateY(-180deg);
			transform: rotateY(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 == 'popUp' ) { ?>
			-webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d;
			transform-style: preserve-3d;
			-webkit-transform: scale(0.4);
			-moz-transform: scale(0.4);
			transform: scale(0.4);
		<?php } ?>
	}
/*
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}

	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
	}

	@media (max-width: 850px) {
		div.boxer-wrapper {
			max-width: 90%;
		}
	}
	@media (max-height: 652px) {
		.boxer-caption,.boxer-position {
			display: none;
		}
	}
	@media (max-height: 282px) {
		div.boxer-wrapper {
			max-width: 30%;
		}
	} 
*/
	
	.boxer-position,.current,.total{
		font-family: var(--tsvg_popup_tip_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}

	@media (max-height:450px) {
		#boxer{
			max-height:96vh !important;
			max-width:90vw !important;
			top:2vh !important;
			margin:0 auto;
		}
		div.boxer-container{
			overflow:hidden auto !important;
		}
	}

	#boxer.mobile{
			max-height:100vh !important;
			max-width:100vw !important;
			top: 0 !important;
			margin: 0;
	}
	

	
</style>
<?php
$tsp_main_videos = '';
$i = 0;
foreach ( $ts_galleryv_videos_Columned as $key => $value ) {
	$i++;
	$ts_vgallery_Question_TS_VG_Options = json_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_Options );
	$TS_VGallery_url_target             = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_vont == 'true' ? '_blank' : '_self';
	$TS_VGallery_url_v                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd == '' ? $tsvgallery_def_theme_ifr_link : $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd;
	$TS_VGallery_url_v_ifr              = preg_replace( '/\s*[a-zA-Z\/\/:\.]*youtu(be.com\/watch\?v=|.be\/)([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i', 'www.youtube.com/embed/$2', $TS_VGallery_url_v );
	$TS_VGallery_url_l                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link;
	$TS_VGallery_url_i                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_video.png', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	$tsp_main_videos .= sprintf(
		"
        <li class='TS_VGallery_effect-blocks_item TS_VGallery_tv_%s'  data-tsvg-class='%s' data-tsvg-ef='%s' data-tsvg-id='%s' style='-moz-animation-delay:  %ss;-webkit-animation-delay:  %ss;animation-delay:  %ss;'>
            <figure class='TS_VGallery_effect-block'>
                <a  href='%s' class='TS_VGallery_effect-block__item boxer_%s small' data-gallery='video_gallery_%s' data-id='%s' title='%s'>
                    <img  width='' height='' src='%s' alt='%s'  title='%s' class='totalsoft_gv_tv_img_%s'>
                </a>
            </figure>
        </li>
    	",
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02 ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_url( $TS_VGallery_url_v_ifr ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_url( $TS_VGallery_url_i ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $Total_Soft_vgallery )
	);
}
echo sprintf(
	"
  	<main data-tsvg-autoplay='%s' class='%s  TS_VGallery_effect-container TS_VGallery_effect-container%s'  data-item-open='%s'  data-tsvg-main='show' data-item-number='%s' data-pagination='%s' data-p-lm='%s'>
  	  	<figure  class='TS_VGallery_gv-lvg-content%s' data-tsvg-popup_bacg='%s' data-tsvg-titl_bacg='%s' data-tsvg-titl_position='%s' >
  	   		<ul class='TS_VGallery_effect-blocks'>
  	   			%s  
  	   		</ul>
  	   </figure>
  	</main>
	",
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_37 ),
	'ts_vgallery_main_' . esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_07 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_02 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr(  $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ),
	$tsp_main_videos
);
?>