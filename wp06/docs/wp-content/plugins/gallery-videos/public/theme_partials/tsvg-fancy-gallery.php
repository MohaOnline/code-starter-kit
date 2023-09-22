<style>
	:root{
		--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_g_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_g_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_g_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07 ), FILTER_VALIDATE_INT ); ?>%;
		--tsvg_g_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_hoo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_vto_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_vto_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_vto_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_vto_b_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_vto_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_vto_t_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_15 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_vto_t_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_lo_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_lo_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_lo_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_h_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_lo_h_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_po_v_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_popup_po_v_h_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_popup_po_o_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_po_vbc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_psi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_popup_psi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_pt_hbr_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_pt_br_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_pt_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_pt_h_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_pt_c_i_c<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_ci_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_popup_ci_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_01 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_ci_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_ci_csi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_07 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_popup_ci_csi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_08 ), FILTER_SANITIZE_STRING ); ?>;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery    .da-thumbs { text-align:center; list-style: none; position: relative; padding: 0; width:100%; margin:0px !important; }
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .da-thumbs li { display:inline-block; margin: 5px; background: #fff; position: relative;  }
	.da-thumbs li a { display: none; position: relative; }
	.da-thumbs li a { overflow: hidden; }
	.da-thumbs li .TS_VGallery_li-thumbs-hover { position: absolute; top:100%; background: #333; background: rgba(75,75,75,0.7); width: 100%; height: 100%; }
	.TotLi:hover .Totalsoft_VL { opacity:1; }
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .Totalsoft_VT {
		word-break: break-word;
	  	position: relative;
	  	display: block;
	  	padding: 8px 0;
	  	font-size: var(--tsvg_vto_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	font-family: var(--tsvg_vto_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	top: 45%;
	  	left: 50%;
	  	width: 85%;
	  	transform: translateY(-50%) translateX(-50%);
	  	-webkit-transform: translateY(-50%) translateX(-50%);
	  	-ms-transform: translateY(-50%) translateX(-50%);
	  	-moz-transform: translateY(-50%) translateX(-50%);
	  	-o-transform: translateY(-50%) translateX(-50%);
	  	text-transform: uppercase;
	  	font-weight: normal;
	  	color: var(--tsvg_vto_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	border-bottom:var(--tsvg_vto_b_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_vto_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	  	border-top: var(--tsvg_vto_t_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_vto_t_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> [data-tsvg-bottom='solid']{ border-bottom-style: solid!important;}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> [data-tsvg-bottom='dashed']{ border-bottom-style: dashed!important;}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> [data-tsvg-bottom='dotted']{ border-bottom-style: dotted!important;}
	#html5-elem-data-box{
		max-height: 100px!important;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .Totalsoft_VL[data-tsvg-title='center'] {
		position: absolute !important;
		bottom: 5px;
		left: 50%;
		font-size: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		line-height: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_lo_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		color: var(--tsvg_lo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		border: var(--tsvg_lo_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_lo_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		border-radius: var(--tsvg_lo_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		background: var(--tsvg_lo_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		padding: 2px 5px;
		box-sizing: border-box;
		transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-webkit-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-ms-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-moz-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		text-decoration: none;
		box-shadow: none !important;
		-moz-box-shadow: none !important;
		-webkit-box-shadow: none !important;
		z-index: 999;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .Totalsoft_VL[data-tsvg-title='left'] {
		position: absolute !important;
		bottom: 5px;
		left: 5px;
		font-size: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		line-height: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_lo_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		color: var(--tsvg_lo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		border: var(--tsvg_lo_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_lo_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		border-radius:  var(--tsvg_lo_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		background: var(--tsvg_lo_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		padding: 2px 5px;
		box-sizing: border-box;
		transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-webkit-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-ms-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-moz-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		text-decoration: none;
		box-shadow: none !important;
		-moz-box-shadow: none !important;
		-webkit-box-shadow: none !important;
		z-index: 999;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .Totalsoft_VL[data-tsvg-title='right'] {
		position: absolute !important;
		bottom: 5px;
		right: 5px;
		font-size: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		line-height: var(--tsvg_lo_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_lo_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		color: var(--tsvg_lo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		border: var(--tsvg_lo_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_lo_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		border-radius:  var(--tsvg_lo_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		background: var(--tsvg_lo_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		padding: 2px 5px;
		box-sizing: border-box;
		transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-webkit-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-ms-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		-moz-transition: background 0.4s, color 0.4s, border-color 0.4s linear;
		text-decoration: none;
		box-shadow: none !important;
		-moz-box-shadow: none !important;
		-webkit-box-shadow: none !important;
		z-index: 999;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .Totalsoft_VL {
		text-decoration: none;
		display: block;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .Totalsoft_VL:hover{
		color: var(--tsvg_lo_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		border-color: var(--tsvg_lo_h_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		background: var(--tsvg_lo_h_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 0px;
		overflow: hidden;
		perspective: 800px;
		-webkit-perspective: 800px;
		-ms-perspective: 800px;
		-moz-perspective: 800px;
		-o-perspective: 800px;
		width: 100%;
		max-width:calc( calc(100% - calc(2 * var(--tsvg_g_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) *  var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) ) / var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))!important;
		border:  var(--tsvg_g_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid  var(--tsvg_g_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		box-shadow: 0px 0px  var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius:  var(--tsvg_g_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin:  var(--tsvg_g_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		float: left;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  figure{
	  	width: 100%;
	  	height: 0;
	  	padding-bottom: 56.25%;
	  	position: relative;
	  	margin:0;
		display: inline-block;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  figure .ts_vgallery_block_desc{
		display:none !important;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  img{
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-show='false'] {
		display: none;
	}
	@media screen and (max-width: 820px) {
		.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			margin: var(--tsvg_g_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) 0 !important;
		}
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
	}
	.TotLi_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_li-thumbs-hover {
	  background:var(--tsvg_hoo_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
	}
	#html5-elem-data-box{
	  overflow:hidden auto;
	}
	#html5-text{ 
	  font-size : var(--tsvg_popup_ci_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  font-family : var(--tsvg_popup_ci_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  color : var(--tsvg_popup_ci_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Total_Soft_GV_Fancy_<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href=''], .Total_Soft_GV_Fancy_<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href='#']{
		display: none !important;
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
	$TS_VGallery_url_l                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link ?: '#';
	$TS_VGallery_link_show              = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link != '#' ? 'yes' : 'no';
	$TS_VGallery_url_i                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_video.png', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	
	$tsp_main_videos .= sprintf(
		'
        <li class="TS_VGallery_li-thumbs TotLi TotLi_%s" data-tsvg-class="%s" data-tsvg-id="%s" style="-moz-animation-delay:  %ss;-webkit-animation-delay:  %ss;animation-delay:  %ss;">
          	<figure class="TS_VGallery_block html5lightbox"  data-href="%s"  data-width="%s" data-height="%s" data-group="mygroup%s" data-thumbnail="%s"  data-title="%s" >
				<div class="ts_vgallery_block_desc" >%s</div>
          	 	<a class="Totalsoft_VL" href="%s" target="%s" data-tsvg-title="%s" data-tsvg-show="%s">%s</a>
          	 	<img  width="" height="" src="%s" alt="img" class="TS_VGallery_thumbs" >
          	 	<div  class="TS_VGallery_li-thumbs-hover" >
          	 	 	<span class="Totalsoft_VT" data-tsvg-bottom="%s" data-tsvg-show="%s">
          	 	 		%s
          	 		</span>
          	 	</div>
          	</figure>
        </li>
        ',
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $i ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_url( $TS_VGallery_url_v ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34 ),
		esc_attr( $Total_Soft_vgallery ),
		esc_url( $TS_VGallery_url_i ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		wp_unslash( html_entity_decode( htmlspecialchars_decode(addslashes($ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_desc)) ) ),
		esc_url( $TS_VGallery_url_l ),
		esc_attr( $TS_VGallery_url_target ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ),
		esc_attr( $TS_VGallery_link_show ),
		esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_25 ),
		esc_url( $TS_VGallery_url_i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_11 ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) )
	);
}
echo sprintf(
	"
    <main data-tsvg-autoplay='%s' class='%s ts_vgallery_main'  data-item-open='%s'  data-tsvg-main='show' data-item-number='%s' data-pagination='%s' data-p-lm='%s'  data-tsvg-c='%s' data-tsvg-BgC='%s' data-tsvg-HBC='%s' data-tsvg-HBW='%s' data-tsvg-IW='%s' data-tsvg-IH='%s' data-tsvg-ShVAutoPl='%s'>
      	<figure  class='da-thumbs-parent%s da-thumbs-parent'  data-tsvg-ShN='%s'  data-tsvg-ShPT='%s' data-tsvg-ShSlPlIc='%s'   data-tsvg-FS='%s'  data-tsvg-FF='%s'  data-tsvg-C='%s'  data-tsvg-LI='%s'  data-tsvg-RI='%s'  >
      		<ul class='da-thumbs Total_Soft_GV_Fancy_%s'  data-tsvg-S='%s'  data-tsvg-C='%s' data-tsvg-DI='%s'   data-tsvg-DIS='%s'  data-tsvg-DIC='%s'  data-tsvg-TIC='%s'  data-tsvg-Color='%s'  data-tsvg-PT='%s' data-tsvg-PD='%s'>
      		 	%s  
      		</ul>
      	</figure>
    </main>
	",
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_36 ),
	'ts_vgallery_main_' . esc_attr( $Total_Soft_vgallery ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_07 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_02 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr(  $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_09 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_10 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_11 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_12 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_01 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_38 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_39 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_37 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_07 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_08 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_FG_PT ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_FG_PD ),
	$tsp_main_videos
);

?>

