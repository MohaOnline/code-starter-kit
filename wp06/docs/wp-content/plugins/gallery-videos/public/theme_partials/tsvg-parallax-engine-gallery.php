<style>
 	:root{
	  	--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02 ), FILTER_VALIDATE_INT ); ?>;
	  	--tsvg_g_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_g_place_between_v_i<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_t_t_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_t_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25 ), FILTER_SANITIZE_STRING ); ?>;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TotSoft_GV_Container {
		width: 100%;
		text-align: center;
		margin:0 auto;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>    .TotSoft_GV_Container * {
		transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
		perspective: 800px;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  div.fluid-width-video-wrapper{
		padding-top:0;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .TotSoft_GV_Container> ul>li{
		padding:0;
	} 

	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		max-width: 100%;
		border-radius: var(--tsvg_g_border_Radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		border: none !important;
		position: relative !important;
		display: inline-block;
		overflow: hidden !important;
		width:100%;
		height: auto;
		max-width:calc( calc(100% - calc(2 * var(--tsvg_g_place_between_v_i<?php echo esc_attr( $Total_Soft_vgallery ); ?>) *  var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) ) / var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))!important;
		margin: var(--tsvg_g_place_between_v_i<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		outline: none !important;
		perspective-origin: 800px !important;
		-webkit-perspective-origin: 800px !important;
		-ms-perspective-origin: 800px !important;
		-moz-perspective-origin: 800px !important;
		-o-perspective-origin: 800px !important;
		transition: all 0s !important;
		-webkit-transition: all 0s !important;
		-ms-transition: all 0s !important;
		-moz-transition: all 0s !important;
		-o-transition: all 0s !important;
		float: left;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-type='1']{
	  box-shadow: 0px 0px var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	   
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-type='2']{
	  	box-shadow: 0px var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		width: 100% !important;
		height: 100% !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery_block{
		margin:0;
		line-height: 0;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_block{
		position: relative;
		padding-bottom: 56.25%;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TotalSoft_HZ2{
		position: absolute;
		left: 0;
		top: 0;
	}
	[data-tsvg-ef='TotalSoft_HovLine1'] {
		position: absolute;
		border: 0px solid red;
		width: 90%;
		height: 90%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine2'] {
		position: absolute;
		border: 0px solid red;
		opacity: 0;
		width: 85%;
		height: 85%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine3'] {
		position: absolute;
		border: 0px solid red;
		opacity: 0;
		width: 105%;
		height: 105%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.3s cubic-bezier(1, 2.5, 0.3, 1.8);
		-webkit-transition: all 0.3s cubic-bezier(1, 2.5, 0.3, 1.8);
		-ms-transition: all 0.3s cubic-bezier(1, 2.5, 0.3, 1.8);
		-moz-transition: all 0.3s cubic-bezier(1, 2.5, 0.3, 1.8);
		-o-transition: all 0.3s cubic-bezier(1, 2.5, 0.3, 1.8);
	}
	[data-tsvg-ef='TotalSoft_HovLine4'] {
		position: absolute;
		border: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		opacity: 0.5;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		top: 100%;
		left: 100%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-webkit-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-ms-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-moz-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-o-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
	}
	[data-tsvg-ef='TotalSoft_HovLine5'] {
		position: absolute;
		border: 0px solid red;
		width: 90%;
		height: 90%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine6'], [data-tsvg-ef='TotalSoft_HovLine7'], [data-tsvg-ef='TotalSoft_HovLine8'], [data-tsvg-ef='TotalSoft_HovLine9'], [data-tsvg-ef='TotalSoft_HovLine10'], [data-tsvg-ef='TotalSoft_HovLine11'] {
		position: absolute;
		border: 0px solid red;
		width: 90%;
		height: 90%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine12'] {
		position: absolute;
		border: 0px solid red;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		z-index: 9999;
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine4_1'], [data-tsvg-ef='TotalSoft_HovLine4_2'], [data-tsvg-ef='TotalSoft_HovLine4_3'], [data-tsvg-ef='TotalSoft_HovLine4_4'] {
		width: 0px !important;
		height: 0px !important;
	}
	[data-tsvg-ef='TotalSoft_HovLine1_1'], [data-tsvg-ef='TotalSoft_HovLine2_1'], [data-tsvg-ef='TotalSoft_HovLine3_1'], [data-tsvg-ef='TotalSoft_HovLine5_1'] {
		position: absolute;
		width: 100%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	[data-tsvg-ef='TotalSoft_HovLine1_2'], [data-tsvg-ef='TotalSoft_HovLine2_2'], [data-tsvg-ef='TotalSoft_HovLine3_2'], [data-tsvg-ef='TotalSoft_HovLine5_2'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 100%;
		top: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	[data-tsvg-ef='TotalSoft_HovLine1_3'], [data-tsvg-ef='TotalSoft_HovLine2_3'], [data-tsvg-ef='TotalSoft_HovLine3_3'], [data-tsvg-ef='TotalSoft_HovLine5_3'] {
		position: absolute;
		width: 100%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		bottom: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	[data-tsvg-ef='TotalSoft_HovLine1_4'], [data-tsvg-ef='TotalSoft_HovLine2_4'], [data-tsvg-ef='TotalSoft_HovLine3_4'], [data-tsvg-ef='TotalSoft_HovLine5_4'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 100%;
		bottom: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	[data-tsvg-ef='TotalSoft_HovLine6_1'], [data-tsvg-ef='TotalSoft_HovLine8_1'], [data-tsvg-ef='TotalSoft_HovLine9_1'], [data-tsvg-ef='TotalSoft_HovLine12_1'] {
		position: absolute;
		width: 0%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine6_2'], [data-tsvg-ef='TotalSoft_HovLine8_2'], [data-tsvg-ef='TotalSoft_HovLine9_2'], [data-tsvg-ef='TotalSoft_HovLine12_2'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 0%;
		top: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine6_3'], [data-tsvg-ef='TotalSoft_HovLine8_3'], [data-tsvg-ef='TotalSoft_HovLine9_3'], [data-tsvg-ef='TotalSoft_HovLine12_3'] {
		position: absolute;
		width: 0%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		bottom: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine6_4'], [data-tsvg-ef='TotalSoft_HovLine8_4'], [data-tsvg-ef='TotalSoft_HovLine9_4'], [data-tsvg-ef='TotalSoft_HovLine12_4'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 0%;
		bottom: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_HovLine7_1'], [data-tsvg-ef='TotalSoft_HovLine10_1'], [data-tsvg-ef='TotalSoft_HovLine11_1'], [data-tsvg-ef='TotalSoft_HovLine13_1'] {
		position: absolute;
		width: 0%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0.6s;
		-webkit-transition-delay: 0.6s;
		-ms-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
	}
	[data-tsvg-ef='TotalSoft_HovLine7_2'], [data-tsvg-ef='TotalSoft_HovLine10_2'], [data-tsvg-ef='TotalSoft_HovLine11_2'], [data-tsvg-ef='TotalSoft_HovLine13_2'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 0%;
		top: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;
		-ms-transition: all 0.1s linear;
		-moz-transition: all 0.1s linear;
		-o-transition: all 0.1s linear;
		transition-delay: 0.5s;
		-webkit-transition-delay: 0.5s;
		-ms-transition-delay: 0.5s;
		-moz-transition-delay: 0.5s;
		-o-transition-delay: 0.5s;
	}
	[data-tsvg-title='TotalSoft_HovLine7_3'], [data-tsvg-ef='TotalSoft_HovLine10_3'], [data-tsvg-ef='TotalSoft_HovLine11_3'], [data-tsvg-ef='TotalSoft_HovLine13_3'] {
		position: absolute;
		width: 0%;
		height: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		bottom: 0px;
		right: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.2s linear;
		-webkit-transition: all 0.2s linear;
		-ms-transition: all 0.2s linear;
		-moz-transition: all 0.2s linear;
		-o-transition: all 0.2s linear;
		transition-delay: 0.3s;
		-webkit-transition-delay: 0.3s;
		-ms-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
	}
	[data-tsvg-ef='TotalSoft_HovLine7_4'], [data-tsvg-ef='TotalSoft_HovLine10_4'], [data-tsvg-ef='TotalSoft_HovLine11_4'], [data-tsvg-ef='TotalSoft_HovLine13_4'] {
		position: absolute;
		width: var(--tsvg_hl_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		height: 0%;
		bottom: 0px;
		left: 0px;
		background: var(--tsvg_hl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_hl_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_hl_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0s;
		-webkit-transition-delay: 0s;
		-ms-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine1'] {
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine5'] {
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine6'] {
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine7'] {
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine8'] {
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine9']
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine10']{
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine11']{
		transition: all 0s linear;
		-moz-transition: all 0s linear;
		-webkit-transition: all 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine2']{
		opacity: 1;
		width: 90%;
		height: 90%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine3']{
		opacity: 1;
		width: 90%;
		height: 90%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine4']{
		opacity: 1;
		top: 50%;
		left: 50%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine6_1'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine6_2'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine6_3'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine6_4'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine8_1'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine8_2'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine8_3'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine8_4'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine9_1'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine9_2'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine9_3'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine9_4'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine12_1'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine12_2'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine12_3'] {
		width: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine12_4'] {
		height: 100%;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine7_1'] {
		width: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0s;
		-webkit-transition-delay: 0s;
		-ms-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine7_2']{
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.2s linear;
		-ms-transition: all 0.2s linear;
		-moz-transition: all 0.2s linear;
		-o-transition: all 0.2s linear;
		transition-delay: 0.3s;
		-webkit-transition-delay: 0.3s;
		-ms-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine7_3'] {
		width: 100%;
		transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;
		-ms-transition: all 0.1s linear;
		-moz-transition: all 0.1s linear;
		-o-transition: all 0.1s linear;
		transition-delay: 0.5s;
		-webkit-transition-delay: 0.5s;
		-ms-transition-delay: 0.5s;
		-moz-transition-delay: 0.5s;
		-o-transition-delay: 0.5s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine7_4']{
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0.6s;
		-webkit-transition-delay: 0.6s;
		-ms-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine10_1']{
		width:100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0s;
		-webkit-transition-delay: 0s;
		-ms-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine10_2'] {
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.2s linear;
		-ms-transition: all 0.2s linear;
		-moz-transition: all 0.2s linear;
		-o-transition: all 0.2s linear;
		transition-delay: 0.3s;
		-webkit-transition-delay: 0.3s;
		-ms-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine10_3'] {
		width: 100%;
		transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;
		-ms-transition: all 0.1s linear;
		-moz-transition: all 0.1s linear;
		-o-transition: all 0.1s linear;
		transition-delay: 0.5s;
		-webkit-transition-delay: 0.5s;
		-ms-transition-delay: 0.5s;
		-moz-transition-delay: 0.5s;
		-o-transition-delay: 0.5s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine10_4'] {
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0.6s;
		-webkit-transition-delay: 0.6s;
		-ms-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine11_1']{
		width: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0s;
		-webkit-transition-delay: 0s;
		-ms-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine11_2'] {
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.2s linear;
		-ms-transition: all 0.2s linear;
		-moz-transition: all 0.2s linear;
		-o-transition: all 0.2s linear;
		transition-delay: 0.3s;
		-webkit-transition-delay: 0.3s;
		-ms-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine11_3'] {
		width: 100%;
		transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;
		-ms-transition: all 0.1s linear;
		-moz-transition: all 0.1s linear;
		-o-transition: all 0.1s linear;
		transition-delay: 0.5s;
		-webkit-transition-delay: 0.5s;
		-ms-transition-delay: 0.5s;
		-moz-transition-delay: 0.5s;
		-o-transition-delay: 0.5s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine11_4'] {
		height: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0.6s;
		-webkit-transition-delay: 0.6s;
		-ms-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine13_1'] {
		width: 100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0s;
		-webkit-transition-delay: 0s;
		-ms-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine13_2']  {
		height:100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.2s linear;
		-ms-transition: all 0.2s linear;
		-moz-transition: all 0.2s linear;
		-o-transition: all 0.2s linear;
		transition-delay: 0.3s;
		-webkit-transition-delay: 0.3s;
		-ms-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine13_3'] {
		width: 100%;
		transition: all 0.1s linear;
		-webkit-transition: all 0.1s linear;
		-ms-transition: all 0.1s linear;
		-moz-transition: all 0.1s linear;
		-o-transition: all 0.1s linear;
		transition-delay: 0.5s;
		-webkit-transition-delay: 0.5s;
		-ms-transition-delay: 0.5s;
		-moz-transition-delay: 0.5s;
		-o-transition-delay: 0.5s;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_HovLine13_4'] {
		height:100%;
		transition: all 0.3s linear;
		-webkit-transition: all 0.3s linear;
		-ms-transition: all 0.3s linear;
		-moz-transition: all 0.3s linear;
		-o-transition: all 0.3s linear;
		transition-delay: 0.6s;
		-webkit-transition-delay: 0.6s;
		-ms-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
	}
	.TotalSoft_Title_Ef {
		perspective: 800px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	[data-tsvg-ef='TotalSoft_Title_Ef1'], [data-tsvg-ef='TotalSoft_Title_Ef2'], [data-tsvg-ef='TotalSoft_Title_Ef3'], [data-tsvg-ef='TotalSoft_Title_Ef4'] {
		text-shadow: 0px 0px var(--tsvg_t_t_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_t_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	   
	[data-tsvg-ef='TotalSoft_Title_Ef1'] {
		position: absolute;
		z-index: 9999;
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 800 !important;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-webkit-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-ms-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-moz-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-o-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-webkit-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-ms-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-moz-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-o-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
	}
	[data-tsvg-ef='TotalSoft_Title_Ef2']  {
	   	position: absolute;
		z-index: 9999;
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 800 !important;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%) scale(0, 0) translate3d(0, 0, 0)!important;
		-webkit-transform: translateY(-50%) translateX(-50%) scale(0, 0) translate3d(0, 0, 0)!important;
		-ms-transform: translateY(-50%) translateX(-50%) scale(0, 0) translate3d(0, 0, 0)!important;
		-moz-transform: translateY(-50%) translateX(-50%) scale(0, 0) translate3d(0, 0, 0)!important;
		-o-transform: translateY(-50%) translateX(-50%) scale(0, 0) translate3d(0, 0, 0)!important;
		transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-webkit-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-ms-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-moz-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
		-o-transition: transform 0.4s cubic-bezier(1, 1.5, 0.3, 1.8);
	}
	[data-tsvg-ef='TotalSoft_Title_Ef3']  {
	   	position: absolute;
		z-index: 9999;
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 800 !important;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0)!important;
		-webkit-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0)!important;
		-ms-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0)!important;
		-moz-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0)!important;
		-o-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0)!important;
	}
	[data-tsvg-ef='TotalSoft_Title_Ef4']  {
	   position: absolute;
		z-index: 9999;
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 800 !important;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-webkit-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-ms-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-moz-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		-o-transform: translateY(-50%) translateX(-50%) translate3d(0, 0, 0);
		transition: transform 0.4s linear;
		-webkit-transition: transform 0.4s linear;
		-ms-transition: transform 0.4s linear;
		-moz-transition: transform 0.4s linear;
		-o-transition: transform 0.4s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Title_Ef1'] {
		transition: transform 0s linear;
		-moz-transition: transform 0s linear;
		-webkit-transition: transform 0s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Title_Ef2']  {
	   transform: translateY(-50%) translateX(-50%) scale(1, 1) translate3d(0, 0, 0)!important;
		-moz-transform: translateY(-50%) translateX(-50%) scale(1, 1) translate3d(0, 0, 0)!important;
		-webkit-transform: translateY(-50%) translateX(-50%) scale(1, 1) translate3d(0, 0, 0)!important;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Title_Ef4']   {
	  transition: transform 0s linear;
		-moz-transition: transform 0s linear;
		-webkit-transition: transform 0s linear;
	}
	[data-tsvg-ef='TotalSoft_Hov_Overlay1'] {
		position: absolute;
		width: 0%;
		height: 0%;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		background: var(--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_Hov_Overlay2'] {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0%;
		background: var(--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_Hov_Overlay3'] {
		position: absolute;
		width: 0%;
		height: 0%;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		background: var(--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	[data-tsvg-ef='TotalSoft_Hov_Overlay4'] {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		-webkit-transform: translateY(-50%) translateX(-50%);
		-ms-transform: translateY(-50%) translateX(-50%);
		-moz-transform: translateY(-50%) translateX(-50%);
		-o-transform: translateY(-50%) translateX(-50%);
		background: var(--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		opacity: 0 !important;
		transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-webkit-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-ms-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-moz-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
		-o-transition: all 0.4s cubic-bezier(1, 2.5, 0.3, 1.8);
	}
	[data-tsvg-ef='TotalSoft_Hov_Overlay5'] {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0%;
		background: var(--tsvg_ho_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transition: all 0.4s linear;
		-webkit-transition: all 0.4s linear;
		-ms-transition: all 0.4s linear;
		-moz-transition: all 0.4s linear;
		-o-transition: all 0.4s linear;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Hov_Overlay1'] {
		width: 90% !important;
		height: 90% !important;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Hov_Overlay3'] {
		width: 100% !important;
		height: 100% !important;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Hov_Overlay4'] {
		opacity: 0.8 !important;
	}
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [data-tsvg-ef='TotalSoft_Hov_Overlay5'] {
		opacity: 0 !important;
	}
	.line_TotalSoft[data-tsvg-show='true'] {
		 display: block !important;
	}
	.line_TotalSoft[data-tsvg-show='false'] {
	   display: none !important;
	}
	.Hov_TotalSoft[data-tsvg-show='true'] {
	   display: block !important;
	}
	.Hov_TotalSoft[data-tsvg-show='false'] {
		display: none !important;
	}
	.TotalSoft_PI {
		font-size: var(--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		color: var(--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	
	.TotalSoft_H_Ef<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TotalSoft_PI[data-tsvg-show='false'] {
		display: none !important;
	}
	.swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video {
		cursor: move; /* fallback if grab cursor is unsupported */
		cursor: grab;
		cursor: -moz-grab;
		cursor: -webkit-grab;
	}

	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
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
	$TS_VGallery_url_l                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link;
	$TS_VGallery_desc                   = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_desc;
	$TS_VGallery_url_i                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_video.png', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	$tsp_main_videos .= sprintf(
		"
    	<li class='TotalSoft_H_Ef%s swipebox%s-video-TotSoft%s' data-href='%s'  data-name='%s'  data-tsvg-class='%s' data-tsvg-id='%s' style='-moz-animation-delay:  %ss;-webkit-animation-delay:  %ss;animation-delay:  %ss;'  data-tsvg-type='%s' data-tsvg-ef='%s' >
    		<figure class='TS_VGallery_block'>
    		    <img class='TotalSoft_HZ2' src='%s' />
    		    <div class='mask line_TotalSoft' data-tsvg-ef='%s'  data-tsvg-show='%s'>
    		      	<div class='mask mask_1' data-tsvg-ef='%s_1'></div>
    		      	<div class='mask mask_2' data-tsvg-ef='%s_2' ></div>
    		      	<div class='mask mask_3'  data-tsvg-ef='%s_3' ></div>
    		      	<div class='mask mask_4'  data-tsvg-ef='%s_4' ></div>
    		    </div>
    		    <div class='Hov_TotalSoft' data-tsvg-ef='%s'  data-tsvg-show='%s'></div>
    		    <figcaption class='TotalSoft_Title_Ef '  data-tsvg-ef='%s'>
    		        %s
    		        <i class=' TotalSoft_PI %s' data-tsvg-show='%s'></i>
    		    </figcaption>
    		</figure>
    	</li>
		",
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_url( $TS_VGallery_url_v ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $i ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07 ),
		esc_url( $TS_VGallery_url_i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_15 )
	);
}
echo sprintf(
	"
  	<main data-tsvg-autoplay='%s' class='%s TotSoft_GV_Container-parent%s'  data-item-open='%s'  data-tsvg-main='show' data-item-number='%s' data-pagination='%s' data-p-lm='%s'>
  	  <figure  class='TotSoft_GV_Container TotSoft_GV_Container_%s myExMul'  data-item-prev='%s'  data-item-next='%s'  data-item-close='%s' data-item-efect='%s'  data-item-type='%s'>
  	   <ul class='TS_VGallery_blocks-gallery'>
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
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_18 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_38 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_39 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ),
	$tsp_main_videos
); 
?>