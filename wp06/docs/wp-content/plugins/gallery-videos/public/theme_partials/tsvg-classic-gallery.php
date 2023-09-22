<style>
	:root{
		--tsvg_g_c_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 ), FILTER_VALIDATE_INT ); ?>;
		--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_g_b_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_g_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ), FILTER_VALIDATE_INT ); ?>px;
	}
	.TS_GV_ClG_<?php echo esc_attr( $Total_Soft_vgallery ); ?> *, .TS_GV_ClG_<?php echo esc_attr( $Total_Soft_vgallery ); ?> *:before, .TS_GV_ClG_<?php echo esc_attr( $Total_Soft_vgallery ); ?> *:after {
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .TS_GV_ClG_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		width: 100%;
		text-align: center;
		float: left;
		margin: 0 auto;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: calc(calc(100% /  var(--tsvg_g_c_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ) - 1em)!important;
		display: inline-block;
		margin: 0 !important;
		border: var(--tsvg_g_b_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_g_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: relative;
		z-index: 0;
		cursor: pointer;
		overflow: hidden;
		opacity: 1;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> * {
		line-height: 1 !important;
		list-style-type: none;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']:before {
		z-index: 1;
		position: absolute;
		content: "";
		left: 0.5em;
		width: calc(100% - 1em);
		top: 0.5em;
		height: calc(100% - 1em);
		-webkit-box-shadow: 0 10px 6px -6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 10px 6px -6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 10px 6px -6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 10px 6px -6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02']:after {
		z-index: 1;
		position: absolute;
		content: "";
		padding: 100%;
		bottom: 23px;
		left: 10px;
		width: 50%;
		top: 80%;
		max-width: 300px;
		background:  var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transform: rotate(-5deg);
		-moz-transform: rotate(-5deg);
		-o-transform: rotate(-5deg);
		-ms-transform: rotate(-5deg);
		transform: rotate(-5deg);
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02']:after {
		-webkit-transform: rotate(5deg);
		-moz-transform: rotate(5deg);
		-o-transform: rotate(5deg);
		-ms-transform: rotate(5deg);
		transform: rotate(5deg);
		right: 10px;
		left: auto;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03']:before {
		z-index: 1;
		position: absolute;
		content: "";
		padding: 100%;
		bottom: 23px;
		left: 10px;
		width: 50%;
		top: 80%;
		max-width: 300px;
		background:  var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transform: rotate(-5deg);
		-moz-transform: rotate(-5deg);
		-o-transform: rotate(-5deg);
		-ms-transform: rotate(-5deg);
		transform: rotate(-5deg);
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04']:after {
		z-index: 1;
		position: absolute;
		content: "";
		padding: 100%;
		bottom: 23px;
		right: 10px;
		left: auto;
		width: 50%;
		top: 80%;
		max-width: 300px;
		background:  var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 11px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transform: rotate(5deg);
		-moz-transform: rotate(5deg);
		-o-transform: rotate(5deg);
		-ms-transform: rotate(5deg);
		transform: rotate(5deg);
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05']:after {
		z-index: 1;
		position: absolute;
		content: "";
		padding: 100%;
		bottom: 25px;
		left: 10px;
		width: 50%;
		top: 80%;
		max-width: 300px;
		background:  var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0 18px 5px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 18px 5px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 18px 5px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 18px 5px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transform: rotate(-3deg);
		-moz-transform: rotate(-3deg);
		-o-transform: rotate(-3deg);
		-ms-transform: rotate(-3deg);
		transform: rotate(-3deg);
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05']:after {
		-webkit-transform: rotate(3deg);
		-moz-transform: rotate(3deg);
		-o-transform: rotate(3deg);
		-ms-transform: rotate(3deg);
		transform: rotate(3deg);
		right: 10px;
		left: auto;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']:after {
		content: "";
		position: absolute;
		z-index: 1;
		-webkit-box-shadow: 0 6px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 6px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 6px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 6px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 50%;
		bottom: 0.7em;
		left: 0.7em;
		right: 0.7em;
		-moz-border-radius: 100px / 10px;
		border-radius: 100px / 10px;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']:after {
		content: "";
		position: absolute;
		z-index: 1;
		-webkit-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0.5em;
		bottom: 0.5em;
		left: 0.5em;
		right: 0.5em;
		-moz-border-radius: 100px / 10px;
		border-radius: 100px / 10px;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08']:after {
		content: "";
		position: absolute;
		z-index: 1;
		-webkit-box-shadow: 0 0 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 0 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 0 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 0 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0.5em;
		bottom: 0.5em;
		left: 0.7em;
		right: 0.7em;
		-moz-border-radius: 100px / 10px;
		border-radius: 100px / 10px;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']:before, .TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']:after {
		content: "";
		position: absolute;
		z-index: 1;
		-webkit-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-o-box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 1px 6px var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		top: 0.6em;
		bottom: 0.6em;
		left: 0.5em;
		right: 0.5em;
		-moz-border-radius: 100px / 10px;
		border-radius: 100px / 10px;
	}
	.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']:after {
		right: 0.5em;
		-webkit-transform: skew(5deg) rotate(3deg);
		-moz-transform: skew(5deg) rotate(3deg);
		-ms-transform: skew(5deg) rotate(3deg);
		-o-transform: skew(5deg) rotate(3deg);
		transform: skew(5deg) rotate(3deg);
	}
	.TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		-webkit-transition: all 1s ease;
		-moz-transition: all 1s ease;
		-o-transition: all 1s ease;
		transition: all 1s ease;
		position: relative;
		margin:0 !important;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		content: '';
		background: -webkit-linear-gradient(top, transparent 0%,  var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) 100%);
		background: linear-gradient(to bottom, transparent 0%, var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) 100%);
		width: 100%;
		height: 50%;
		opacity: 0;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 2;
		-webkit-transition-property: top, opacity;
		-moz-transition-property: top, opacity;
		-o-transition-property: top, opacity;
		transition-property: top, opacity;
		-webkit-transition-duration: 0.3s;
		-moz-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 20px;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 3;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> span {
		display: block;
		opacity: 0;
		position: relative;
		top: 100px;
		-webkit-transition-property: top, opacity;
		-moz-transition-property: top, opacity;
		-o-transition-property: top, opacity;
		transition-property: top, opacity;
		-webkit-transition-duration: 0.3s;
		-moz-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
		transition-delay: 0s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:before {
		top: 50%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		top: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect01']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		-webkit-transition-delay: 0.15s;
		-moz-transition-delay: 0.15s;
		-o-transition-delay: 0.15s;
		transition-delay: 0.15s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02']  .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		width: 100%;
		height: 100%;
		opacity: 0;
		-webkit-transition: opacity 0.5s ease;
		-moz-transition: opacity 0.5s ease;
		-o-transition: opacity 0.5s ease;
		transition: opacity 0.5s ease;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		-moz-transform: scale(1.09, 1.09);
		-ms-transform: scale(1.09, 1.09);
		-webkit-transform: scale(1.09, 1.09);
		transform: scale(1.09, 1.09);
		-moz-transition-property: all;
		-o-transition-property: all;
		-webkit-transition-property: all;
		transition-property: all;
		-moz-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		transition-duration: 0.4s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		-moz-transform: scale(1, 1);
		-ms-transform: scale(1, 1);
		-webkit-transform: scale(1, 1);
		transform: scale(1, 1);
		-webkit-filter: blur(2px);
		filter: blur(2px);
		-moz-transition-property: all;
		-o-transition-property: all;
		-webkit-transition-property: all;
		transition-property: all;
		-moz-transition-duration: 0.8s;
		-o-transition-duration: 0.8s;
		-webkit-transition-duration: 0.8s;
		transition-duration: 0.8s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: relative;
		display: block;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		-webkit-transition-delay: 0.5s;
		transition-delay: 0.5s;
		-moz-transition-duration: 0.8s;
		-o-transition-duration: 0.8s;
		-webkit-transition-duration: 0.8s;
		transition-duration: 0.8s;
		opacity: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect02'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> span{
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03'] .TS_GV_ClG_Div2_Hov_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		-webkit-transform: translate(-50%, -50%) scale(0);
		-moz-transform: translate(-50%, -50%) scale(0);
		-o-transform: translate(-50%, -50%) scale(0);
		color: var(--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-moz-transition-duration: 0.8s;
		-o-transition-duration: 0.8s;
		-webkit-transition-duration: 0.8s;
		transition-duration: 0.8s;
		opacity: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect03']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		transform: translate(-50%, -50%) scale(1.1);
		-webkit-transform: translate(-50%, -50%) scale(1.1);
		-moz-transform: translate(-50%, -50%) scale(1.1);
		-o-transform: translate(-50%, -50%) scale(1.1);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: scale3d(0, 0, 1);
		-webkit-transform: scale3d(0, 0, 1);
		-moz-transform: scale3d(0, 0, 1);
		-o-transform: scale3d(0, 0, 1);
		transition: transform .3s ease-out 0s;
		-webkit-transition: transform .3s ease-out 0s;
		-moz-transition: transform .3s ease-out 0s;
		-o-transition: transform .3s ease-out 0s;
		content: '';
		pointer-events: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::before {
		transform-origin: left top;
		z-index: 1;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::after {
		transform-origin: right bottom;
		background: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::after {
		transform: scale3d(1, 1, 1);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		-webkit-transform: translate(-50%, -50%) scale(0);
		-moz-transform: translate(-50%, -50%) scale(0);
		-o-transform: translate(-50%, -50%) scale(0);
		transition: all 300ms 0ms cubic-bezier(0.6, -0.28, 0.735, 0.045);
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		z-index: 2;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect04'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
		-moz-transform: translate(-50%, -50%) scale(1);
		-o-transform: translate(-50%, -50%) scale(1);
		transition: all 300ms 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		width: 100%;
		height: 100%;
		opacity: 0;
		-webkit-transition: opacity 0.5s ease;
		-moz-transition: opacity 0.5s ease;
		-o-transition: opacity 0.5s ease;
		transition: opacity 0.5s ease;
		padding: 30px 3em;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::before {
		position: absolute;
		top: 30px;
		right: 30px;
		bottom: 30px;
		left: 100%;
		border-left: 4px solid var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		content: '';
		opacity: 0;
		background-color: rgba(255, 255, 255, 0.5);
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
		-webkit-transition-delay: 0.6s;
		-moz-transition-delay: 0.6s;
		-o-transition-delay: 0.6s;
		transition-delay: 0.6s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: relative;
		display: block;
		top: 50%;
		-webkit-transform: translate3d(30%, -50%, 0);
		-moz-transform: translate3d(30%, -50%, 0);
		-o-transform: translate3d(30%, -50%, 0);
		transform: translate3d(30%, -50%, 0);
		-webkit-transition-delay: 0.3s;
		-moz-transition-delay: 0.3s;
		-o-transition-delay: 0.3s;
		transition-delay: 0.3s;
		opacity: 0;
		-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
		transition: opacity 0.35s,
		-webkit-transform 0.35s,
		-moz-transform 0.35s,
		-o-transform 0.35s,
		transform 0.35s;
		text-align: left;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
		-webkit-transform: translate3d(0%, -50%, 0);
		-moz-transform: translate3d(0%, -50%, 0);
		-o-transform: translate3d(0%, -50%, 0);
		transform: translate3d(0%, -50%, 0);
		-webkit-transition-delay: 0.4s;
		-moz-transition-delay: 0.4s;
		-o-transition-delay: 0.4s;
		transition-delay: 0.4s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect05'] .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::before {
		background: rgba(255, 255, 255, 0);
		left: 30px;
		opacity: 1;
		-webkit-transition-delay: 0s;
		-moz-transition-delay: 0s;
		-o-transition-delay: 0s;
		transition-delay: 0s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov {
		bottom: 0;
		display: block;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		opacity: 0;
		-webkit-transition: opacity 0.5s ease;
		-moz-transition: opacity 0.5s ease;
		-o-transition: opacity 0.5s ease;
		transition: opacity 0.5s ease;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: absolute;
		left: 0;
		width: 100%;
		bottom: 50%;
		-webkit-transform: translateY(50%);
		-moz-transform: translateY(50%);
		-o-transform: translateY(50%);
		transform: translateY(50%);
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_GV_ClG_Div2_Hov_1 {
		height: 78px;
		width: 78px;
		overflow: hidden;
		position: absolute;
		top: 50%;
		left: 50%;
		content: '';
		-webkit-transform: rotate(45deg) translate(-50%, -50%);
		-moz-transform: rotate(45deg) translate(-50%, -50%);
		-o-transform: rotate(45deg) translate(-50%, -50%);
		transform: rotate(45deg) translate(-50%, -50%);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']   .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:after,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']   .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']   .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:after {
		background-color: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: absolute;
		content: "";
		display: block;
		-webkit-transition: all 0.4s ease-in-out;
		-moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']   .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:after {
		width: 65%;
		height: 2px;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:after {
		width: 2px;
		height: 65%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:before, .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:before {
		left: 0;
		top: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:after, .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:after {
		bottom: 0;
		right: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
		-o-transform: scale(1.1);
		transform: scale(1.1);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov{
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
		-webkit-transform: translateY(0px);
		-moz-transform: translateY(0px);
		-o-transform: translateY(0px);
		transform: translateY(0px);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:before {
		width: 38%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:before {
		height: 38%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1:after {
		width: 55%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect06']   .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_2:after {
		height: 55%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display:none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']   .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		content: "";
		opacity: 0;
		width: 70%;
		height: 100%;
		border-radius: 50%;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: absolute;
		top: 0;
		left: -30%;
		transform: scale(0);
		-webkit-transform: scale(0);
		-moz-transform: scale(0);
		-o-transform: scale(0);
		transition: all 0.2s ease 0s;
		-webkit-transition: all 0.2s ease 0s;
		-moz-transition: all 0.2s ease 0s;
		-o-transition: all 0.2s ease 0s;
		z-index: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']  .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:before {
		opacity: 1;
		transform: scale(2);
		-webkit-transform: scale(2);
		-moz-transform: scale(2);
		-o-transform: scale(2);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']   .TS_VGallery_efect {
		position: absolute;
		top: 50%;
		left: 15%;
		transform: translate(-300%, -50%);
		-webkit-transform: translate(-300%, -50%);
		-moz-transform: translate(-300%, -50%);
		-o-transform: translate(-300%, -50%);
		transition: all 0.2s ease 0s;
		-webkit-transition: all 0.2s ease 0s;
		-moz-transition: all 0.2s ease 0s;
		-o-transition: all 0.2s ease 0s;
		z-index: 2;
		text-align: center;
		max-width: 50%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']    .TS_GV_ClG_Div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_VGallery_efect {
		transform: translate(0, -50%);
		-webkit-transform: translate(0, -50%);
		-moz-transform: translate(0, -50%);
		-o-transform: translate(0, -50%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']   .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']   .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 0;
		margin: 15px 0 !important;
		list-style: none;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect07']   .TS_GV_ClG_Div2_Hov_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		color: var(--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08']  .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display:none;
	}
	
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08']   .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0);
		transition: all 0.3s;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-o-transition: all 0.3s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:after {
		background: rgba(0, 0, 0, 0.2);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_efect {
		position: absolute;
		top: 35%;
		left: 0;
		width: 100%;
		z-index: 1;
		transition: all 0.3s;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-o-transition: all 0.3s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: 40%;
		position: relative;
		top: 0;
		padding: 5px;
		text-align: center;
		background: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: 0 0 5px 5px;
		margin: 0 auto;
		transform: translate(0px, 0px);
		-webkit-transform: translate(0px, 0px);
		-moz-transform: translate(0px, 0px);
		-o-transform: translate(0px, 0px);
		transition: all 0.35s;
		-webkit-transition: all 0.35s;
		-moz-transition: all 0.35s;
		-o-transition: all 0.35s;
		line-height: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		transform: translate(0px, 95%);
		-webkit-transform: translate(0px, 95%);
		-moz-transform: translate(0px, 95%);
		-o-transform: translate(0px, 95%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_Hov_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		color: var(--tsvg_pi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_pi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: 80%;
		position: absolute;
		top: 0;
		left: 10%;
		padding: 10px;
		margin: 0;
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.85);
		text-align: center;
		transform: translate(0px, 0px);
		-webkit-transform: translate(0px, 0px);
		-moz-transform: translate(0px, 0px);
		-o-transform: translate(0px, 0px);
		transition: all 0.2s;
		-webkit-transition: all 0.2s;
		-moz-transition: all 0.2s;
		-o-transition: all 0.2s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect08'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		transform: translate(0px, -2px);
		-webkit-transform: translate(0px, -2px);
		-moz-transform: translate(0px, -2px);
		-o-transform: translate(0px, -2px);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		overflow: hidden;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transition: all 0.45s ease 0s;
		-moz-transition: all 0.45s ease 0s;
		-o-transition: all 0.45s ease 0s;
		transition: all 0.45s ease 0s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		-webkit-transform: skew(30deg) translateX(-80%);
		-moz-transform: skew(30deg) translateX(-80%);
		-o-transform: skew(30deg) translateX(-80%);
		transform: skew(30deg) translateX(-80%);
		z-index: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:before {
		-webkit-transform: skew(30deg) translateX(-20%);
		-moz-transform: skew(30deg) translateX(-20%);
		-o-transform: skew(30deg) translateX(-20%);
		transform: skew(30deg) translateX(-20%);
		-webkit-transition-delay: 0.05s;
		-moz-transition-delay: 0.05s;
		-o-transition-delay: 0.05s;
		transition-delay: 0.05s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		-webkit-transform: skew(-30deg) translateX(-70%);
		-moz-transform: skew(-30deg) translateX(-70%);
		-o-transform: skew(-30deg) translateX(-70%);
		transform: skew(-30deg) translateX(-70%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover:after {
		-webkit-transform: skew(-30deg) translateX(-10%);
		-moz-transform: skew(-30deg) translateX(-10%);
		-o-transform: skew(-30deg) translateX(-10%);
		transform: skew(-30deg) translateX(-10%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		padding: 20px 40% 20px 20px;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
		z-index: -1;
		-webkit-transition: all 0.45s ease 0s;
		-moz-transition: all 0.45s ease 0s;
		-o-transition: all 0.45s ease 0s;
		transition: all 0.45s ease 0s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		-webkit-transform: skew(30deg) translateX(-100%);
		-moz-transform: skew(30deg) translateX(-100%);
		-o-transform: skew(30deg) translateX(-100%);
		transform: skew(30deg) translateX(-100%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		-webkit-transform: skew(30deg) translateX(-40%);
		-moz-transform: skew(30deg) translateX(-40%);
		-o-transform: skew(30deg) translateX(-40%);
		transform: skew(30deg) translateX(-40%);
		-webkit-transition-delay: 0.15s;
		-moz-transition-delay: 0.15s;
		-o-transition-delay: 0.15s;
		transition-delay: 0.15s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		-webkit-transform: skew(-30deg) translateX(-90%);
		-moz-transform: skew(-30deg) translateX(-90%);
		-o-transform: skew(-30deg) translateX(-90%);
		transform: skew(-30deg) translateX(-90%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		-webkit-transform: skew(-30deg) translateX(-30%);
		-moz-transform: skew(-30deg) translateX(-30%);
		-o-transform: skew(-30deg) translateX(-30%);
		transform: skew(-30deg) translateX(-30%);
		-webkit-transition-delay: 0.1s;
		-moz-transition-delay: 0.1s;
		-o-transition-delay: 0.1s;
		transition-delay: 0.1s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 0;
		opacity: 0;
		-webkit-transition: all 0.5s ease 0s;
		-moz-transition: all 0.5s ease 0s;
		-o-transition: all 0.5s ease 0s;
		transition: all 0.5s ease 0s;
		z-index: 2;
		text-align: left;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect09'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 0.9;
		-webkit-transition-delay: 0.2s;
		-moz-transition-delay: 0.2s;
		-o-transition-delay: 0.2s;
		transition-delay: 0.2s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		overflow: hidden;
		text-align: center;
		-webkit-transition: all 0.55s ease;
		-moz-transition: all 0.55s ease;
		-o-transition: all 0.55s ease;
		transition: all 0.55s ease;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		-webkit-transition: opacity 0.55s ease;
		-moz-transition: opacity 0.55s ease;
		-o-transition: opacity 0.55s ease;
		transition: opacity 0.55s ease;
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		opacity: 1;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 10px;
		position: absolute;
		bottom: 25px;
		right: 25px;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: "";
		width: 3000px;
		height: 2px;
		position: absolute;
		background: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transition: all 0.55s ease;
		-moz-transition: all 0.55s ease;
		-o-transition: all 0.55s ease;
		transition: all 0.55s ease;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		top: 0;
		left: 0;
		-webkit-transform: translateX(100%);
		-moz-transform: translateX(100%);
		-o-transform: translateX(100%);
		transform: translateX(100%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		bottom: 0;
		right: 0;
		-webkit-transform: translateX(-100%);
		-moz-transform: translateX(-100%);
		-o-transform: translateX(-100%);
		transform: translateX(-100%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: "";
		width: 2px;
		height: 3000px;
		position: absolute;
		background: var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-transition: all 0.55s ease;
		-moz-transition: all 0.55s ease;
		-o-transition: all 0.55s ease;
		transition: all 0.55s ease;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		top: 0;
		left: 0;
		-webkit-transform: translateY(100%);
		-moz-transform: translateY(100%);
		-o-transform: translateY(100%);
		transform: translateY(100%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		bottom: 0;
		right: 0;
		-webkit-transform: translateY(-100%);
		-moz-transform: translateY(-100%);
		-o-transform: translateY(-100%);
		transform: translateY(-100%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		-webkit-transform: translate(0, 0);
		-moz-transform: translate(0, 0);
		-o-transform: translate(0, 0);
		transform: translate(0, 0);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10']  .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		-webkit-transition-delay: 0.15s;
		-moz-transition-delay: 0.15s;
		-o-transition-delay: 0.15s;
		transition-delay: 0.15s;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='effect10'] .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 0;
	}
	
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		background: var(--tsvg_g_h_c1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1;
		font-weight: 400;
		font-size: var(--tsvg_t_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_t_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_t_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 0;
		position: relative;
		display: block;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none'] .TS_GV_ClG_Div2_Hov_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_GV_ClG_Div2_Hov_1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 5px 10px;
		border: 2px solid var(--tsvg_g_h_c2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: 2px;
	}
	.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none'] .TS_GV_ClG_Div2_Hov_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.Tot_Vid_Gallery_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none'] .TS_GV_ClG_Div2_Hov_Fild_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		width: 100%;
		padding-top: 56.25%;
		position: relative;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery     .TS_GV_ClG_Div2_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
	}
	.TS_GV_ClG_Div2_desc{
		display:none!important;
	}
 </style>
<?php
$tsp_main_videos = '';
$i                = 0;
foreach ( $ts_galleryv_videos_Columned as $key => $value ) {
	$i++;
	$ts_vgallery_Question_TS_VG_Options = json_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_Options );
	$TS_VGallery_url_target             = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_vont == 'true' ? '_blank' : '_self';
	$TS_VGallery_url_v                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd == '' ? $tsvgallery_def_theme_ifr_link : $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd;
	$TS_VGallery_url_l                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_link;
	$TS_VGallery_url_i                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_video.png', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	$tsp_main_videos .= sprintf(
		"
        <li class='TS_GV_ClG_Div1_Main_%s' data-tsvg-class='%s' data-tsvg-id='%s' style='-moz-animation-delay:  %ss;-webkit-animation-delay:  %ss;animation-delay:  %ss;' data-tsvg-effect='%s'  data-tsvg-src='%s' data-tsvg-link='%s' data-tsvg-target='%s'>
          	<figure class='TS_GV_ClG_Div1_%s'>
          		<div class='TS_GV_ClG_Div2_%s' data-tsvg-effect='%s'>
            		<img  width='' height='' src='%s' alt='img' class='TS_GV_ClG_Div2_Img_%s' data-tsvg-img='%s' >
            		<div class='TS_GV_ClG_Div2_desc'>%s</div>
            		<figcaption  data-tsvg-hover='%s'>
                		<div class='TS_VGallery_efect' data-tsvg-ef='%s'>
                		    <div class='TS_GV_ClG_Div2_Hov_2_%s'>
								<div class='TS_GV_ClG_Div2_Hov'></div>
								<div class='TS_GV_ClG_Div2_Hov_1'>
									<div class='TS_GV_ClG_Div2_Hov_2'></div>
								</div>
							</div>
                		    <div class='TS_GV_ClG_Div2_Hov_%s' >
                		        <div class='TS_GV_ClG_Div2_Hov_1_%s'>
                		            <span class='TS_GV_ClG_Div2_Hov_Title_%s'>
                		                %s
                		            </span>
                		        </div>
                		    </div>
                		    <div class='TS_GV_ClG_Div2_Hov_Fild_%s'>
                		        <span>
                		            <i class='TS_GV_ClG_Div2_Hov_Icon_%s %s'></i>
                		        </span>
                		    </div>
                		</div>
            		</figcaption>
            	</div>
          	</figure>
        </li>
      	",
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $i ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05 ),
		esc_url( $TS_VGallery_url_v ),
		esc_url( $TS_VGallery_url_l ),
		esc_attr( $TS_VGallery_url_target ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ),
		esc_url( $TS_VGallery_url_i ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ),
		wp_unslash( html_entity_decode( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_desc ), ENT_QUOTES ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02 ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 )
 	);
}
echo sprintf(
	"
    <main class='%s '  data-item-open='%s'  data-tsvg-main='show' data-item-number='%s' data-pagination='%s'  data-p-lm='%s'>
      	<figure  class='TS_GV_ClG_%s'>
      		<ul class='Tot_Vid_Gallery_%s' data-tsvg-effect='%s' >
      			%s  
      		</ul>
      	</figure>
    </main>
	",
	'ts_vgallery_main_' . esc_attr( $Total_Soft_vgallery ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_07 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_02 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_19 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02 ),
	$tsp_main_videos
);
?>