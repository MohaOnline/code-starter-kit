<style type="text/css">
		:root{
			--tsvg_popup_ps_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32 ), FILTER_VALIDATE_INT ); ?>px;
			--tsvg_popup_ps_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_ps_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34 ), FILTER_VALIDATE_INT ); ?>px;
			--tsvg_popup_ps_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_ps_vt_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37 ), FILTER_VALIDATE_INT ); ?>px;
			--tsvg_popup_ps_vt_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_ps_vt_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_ps_o_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_po_o_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_psi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02 ), FILTER_SANITIZE_STRING ); ?>;
			--tsvg_popup_psi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_01 ), FILTER_VALIDATE_INT ); ?>px;
		}
		#colorbox, #cboxOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxWrapper<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9999999999;
			overflow: hidden;
		}
		#cboxWrapper<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			max-width: none;
		}
		#cboxOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: fixed;
			width: 100%;
			height: 100%;
		}
		#cboxMiddleLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxBottomLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			clear: left;
		}
		#cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: relative;
		}
		#cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
		#cboxTitle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			margin: 0;
		}
		#cboxLoadingOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxLoadingGraphic<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxSlideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			cursor: pointer;
		}
		.cboxPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			float: left;
			margin: auto;
			border: 0;
			display: block;
			max-width: none;
			-ms-interpolation-mode: bicubic;
		}
		.cboxIframe<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 100%;
			height: 100%;
			display: block;
			border: 0;
			padding: 0;
			margin: 0;
		}
		#colorbox<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			box-sizing: content-box;
			-moz-box-sizing: content-box;
			-webkit-box-sizing: content-box;
		}
		#cboxOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: rgba(0, 0, 0, 0.7);
		}
		#colorbox<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			outline: 0;
		}
		#cboxTopLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxTopRight<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxBottomLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxBottomRight<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxMiddleLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			background: #fff;
			display: none;
		}
		#cboxMiddleRight<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 0px;
			background: #fff;
			display: none;
		}
		#cboxTopCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxBottomCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			height: 0px;
			background: #fff;
			display: none;
		}
		#cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: #fff;
			overflow: visible;
			border: 15px solid red;
			border-radius: 5px;
		}
		.cboxIframe<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: #fff;
		}
		#cboxError {
			padding: 50px;
			border: 1px solid #ccc;
		}
		#cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			margin-top: 0px !important;
		}
		#cboxTitle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: relative;
			top: var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
			left: 0;
			text-align: center;
			width: 100%;
			color: #949494;
		}
		#cboxCurrent {
			position: absolute;
			bottom: 4px;
			left: 58px;
			color: #949494;
		}
		#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxSlideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			border: 0;
			padding: 0;
			margin: 0;
			overflow: visible;
			width: auto;
			background: none;
		}
		#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>:active, #cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>:active, #cboxSlideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>:active, #cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>:active {
			outline: 0;
		}
		#cboxSlideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			bottom: 4px;
			right: 30px;
			color: #0092ef;
		}
		#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			top: calc(100% + var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
			left: 0;
			font-size: 25px;
			opacity: 0.7;
			color: red;
			display: inline !important;
		}
		#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
			opacity: 1;
		}
		#cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			top: calc(100% + var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
			left: 27px;
			font-size: 25px;
			color: red;
			opacity: 0.7;
			display: inline !important;
		}
		#cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
			opacity: 1;
		}
		#cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			position: absolute;
			top: calc(100% + var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
			right: 0;
			color: red;
			font-size: 25px;
			opacity: 0.7;
		}
		#cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
			opacity: 1;
		}
		.cboxIE #cboxTopLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxTopCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxTopRight<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxBottomLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxBottomCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxBottomRight<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxMiddleLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .cboxIE #cboxMiddleRight<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF, endColorstr=#00FFFFFF);
		}
		html.swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			overflow: hidden !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay img {
			border: none !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99999999 !important;
			overflow: hidden;
			-webkit-user-select: none;
			-moz-user-select: none;
			user-select: none;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider {
			height: 100%;
			left: 0;
			top: 0;
			width: 100%;
			white-space: nowrap;
			position: absolute;
			display: none;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide {
			background: url("../Images/loading.gif") no-repeat center center;
			height: 100%;
			width: 100%;
			text-align: center;
			display: inline-block;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide:before {
			content: "";
			display: inline-block;
			height: 50%;
			width: 1px;
			margin-right: -1px;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide img, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-container {
			display: inline-block;
			max-height: 100%;
			max-width: 100%;
			margin: 0;
			padding: 0;
			width: auto;
			height: auto;
			vertical-align: middle;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-container {
			background: none;
			max-width: 650px;
			max-height: 100%;
			width: 100%;
			padding: 5%;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-container .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video {
			width: 100%!important;
			height:100%!important;
			/* height: 0; */
			padding-bottom: 56.25%!important;
			overflow: hidden;
			position: relative;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-container .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video iframe {
			width: 100% !important;
			height: 100% !important;
			position: absolute;
			top: 0;
			left: 0;
			background: #ffffff;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			position: absolute;
			left: 0;
			z-index: 999;
			height: 50px;
			width: 100%;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action {
			bottom: -50px;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action.visible-bars {
			bottom: 0;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action.force-visible-bars {
			bottom: 0 !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			top: -50px;
			text-align: center;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption.visible-bars {
			top: 0;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption.force-visible-bars {
			top: 0 !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close {
			border: none !important;
			text-decoration: none !important;
			cursor: pointer;
			position: absolute;
			font-size: 25px;
			color: #fff;
			top: 50%;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-o-transform: translateY(-50%);
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close {
			background-position: 15px 12px;
			left: 40px;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev {
			background-position: -32px 13px;
			right: 100px;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next {
			background-position: -78px 13px;
			right: 40px;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev.disabled, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next.disabled {
			filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
			opacity: 0.3;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider.rightSpring {
			animation: rightSpring 0.3s;
			-moz-animation: rightSpring 0.3s;
			-webkit-animation: rightSpring 0.3s;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider.leftSpring {
			animation: leftSpring 0.3s;
			-moz-animation: leftSpring 0.3s;
			-webkit-animation: leftSpring 0.3s;
		}
		@keyframes rightSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: -30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@keyframes leftSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: 30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@-moz-keyframes rightSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: -30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@-moz-keyframes leftSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: 30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@-webkit-keyframes rightSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: -30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@-webkit-keyframes leftSpring {
			0% {
				margin-left: 0px;
			}
			50% {
				margin-left: 30px;
			}
			100% {
				margin-left: 0px;
			}
		}
		@media screen and (max-width: 800px) {
			#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close {
				/* left: 0; */
			}
			#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev {
				/* right: 60px; */
			}
			#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next {
				/* right: 0; */
			}
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay {
			background: rgba(0, 0, 0, 0.7);
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			text-shadow: 1px 1px 1px black;
			background-color: #0d0d0d;
			background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #0d0d0d), color-stop(100%, #000000));
			background-image: -webkit-linear-gradient(#0d0d0d, #000000);
			background-image: -moz-linear-gradient(#0d0d0d, #000000);
			background-image: -o-linear-gradient(#0d0d0d, #000000);
			background-image: linear-gradient(#0d0d0d, #000000);
			filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=95);
			opacity: 0.95;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action {
			border-top: 1px solid rgba(255, 255, 255, 0.2);
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			color: white !important;
			font-size: 15px;
			line-height: 43px;
			font-family: Helvetica, Arial, sans-serif;
		}
		#cboxOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay {
			background: var(--tsvg_popup_po_o_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			background: var(--tsvg_popup_ps_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			opacity: 1 !important;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide img, #cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video {
			border: var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_popup_ps_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			box-shadow: 0px 0px var(--tsvg_popup_ps_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_popup_ps_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			-moz-box-shadow: 0px 0px var(--tsvg_popup_ps_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_popup_ps_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			-webkit-box-shadow: 0px 0px var(--tsvg_popup_ps_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_popup_ps_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
		}
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide img {
			box-sizing: border-box !important;
			-moz-box-sizing: border-box !important;
			-webkit-box-sizing: border-box !important;
			margin-top: 0px !important;
		}
		#cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action {
			background: var(--tsvg_popup_ps_o_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			opacity: 1 !important;
		}
		#colorbox<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxWrapper<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			overflow: visible !important;
			max-width: 100% !important;
		}
		#cboxContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			max-width: calc(100% - calc(2 * var(--tsvg_popup_ps_b_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)));
		}
		#cboxTitle<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption {
			font-size: var(--tsvg_popup_ps_vt_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  !important;
			font-family: var(--tsvg_popup_ps_vt_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			color: var(--tsvg_popup_ps_vt_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			bottom: 0px !important;
		}
		#cboxTitle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			line-height: calc(7 + var(--tsvg_popup_ps_vt_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) !important;
		}
		#cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next {
			font-size: var(--tsvg_popup_psi_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
			color: var(--tsvg_popup_psi_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		}
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05 == '1' ) { ?>
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide, #cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: url("<?php echo plugins_url( '../Images/loading1.gif', __FILE__ ); ?>") no-repeat center center !important;
		}
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05 == '2' ) { ?>
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide, #cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: url("<?php echo plugins_url( '../Images/loading2.gif', __FILE__ ); ?>") no-repeat center center !important;
		}
		<?php } else { ?>
		#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide, #cboxLoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			background: url("<?php echo plugins_url( '../Images/loading.gif', __FILE__ ); ?>") no-repeat center center !important;
		}
		<?php } ?>
        @media screen and (max-width: 410px) {
            :root{
                --tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:1;
            }
        }
</style>
<script type="text/javascript">
(function (t, e, i) {
    function o(i, o, n) {
        var r = e.createElement(i);
        return o && (r.id = Z + o), n && (r.style.cssText = n), t(r)
    }
    function n() {
        return i.innerHeight ? i.innerHeight : t(i).height()
    }
    function r(e, i) {
        i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.get = function (e) {
            var o, n;
            return void 0 !== this.cache[e] ? n = this.cache[e] : (o = t(this.el).attr("data-cbox-" + e), void 0 !== o ? n = o : void 0 !== i[e] ? n = i[e] : void 0 !== X[e] && (n = X[e]), this.cache[e] = n), t.isFunction(n) ? n.call(this.el) : n
        }
    }
    function h(t) {
        var e = E.length, i = (z + t) % e;
        return 0 > i ? e + i : i
    }
    function s(t, e) {
        return Math.round((/%/.test(t) ? ("x" === e ? W.width() : n()) / 100 : 1) * parseInt(t, 10))
    }
    function a(t, e) {
        return t.get("photo") || t.get("photoRegex").test(e)
    }
    function l(t, e) {
        return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e
    }
    function d(t) {
        "contains" in x[0] && !x[0].contains(t.target) && (t.stopPropagation(), x.focus())
    }
    function c(t) {
        c.str !== t && (x.add(v).removeClass(c.str).addClass(t), c.str = t)
    }
    function g() {
        z = 0, rel && "nofollow" !== rel ? (E = t("." + te).filter(function () {
            var e = t.data(this, Y), i = new r(this, e);
            return i.get("rel") === rel
        }), z = E.index(_.el), -1 === z && (E = E.add(_.el), z = E.length - 1)) : E = t(_.el)
    }
    function u(i) {
        t(e).trigger(i), se.triggerHandler(i)
    }
    function f(i) {
        var n;
        jQuery("#cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>,#cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>,#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>").removeAttr('class');
        jQuery("#cboxClose<?php echo esc_attr( $Total_Soft_vgallery ); ?>").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close'));
        jQuery("#cboxNext<?php echo esc_attr( $Total_Soft_vgallery ); ?>").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next'));
        jQuery("#cboxPrevious<?php echo esc_attr( $Total_Soft_vgallery ); ?>").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev'));
        G || (n = t(i).data("colorbox"), _ = new r(i, n), rel = _.get("rel"), g(), $ || ($ = q = !0, c(_.get("className")), x.css({
            visibility: "hidden", display: "block"
        }), L = o(ae, "LoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
            width: "", height: ""
        }).append(L), D = T.height() + k.height() + b.outerHeight(!0) - b.height(), j = C.width() + H.width() + b.outerWidth(!0) - b.width(), A = L.outerHeight(!0), N = L.outerWidth(!0), _.w = s(_.get("initialWidth"), "x"), _.h = s(_.get("initialHeight"), "y"), L.css({
            width: "", height: _.h
        }), J.position(), u(ee), _.get("onOpen"), O.add(R).hide(), x.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), se.one(re, function () {
            e.removeEventListener("focus", d, !0)
        })), _.get("returnFocus") && se.one(re, function () {
            t(_.el).focus()
        })), v.css({
            opacity: parseFloat(_.get("opacity")), cursor: _.get("overlayClose") ? "pointer" : "auto", visibility: "visible"
        }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w())
    }
    function p() {
        !x && e.body && (V = !1, W = t(i), x = o(ae).attr({
            id: Y, "class": t.support.opacity === !1 ? Z + "IE" : "", role: "dialog", tabindex: "-1"
        }).hide(), v = o(ae, "Overlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>").hide(), M = t([o(ae, "LoadingOverlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>")[0], o(ae, "LoadingGraphic<?php echo esc_attr( $Total_Soft_vgallery ); ?>")[0]]), y = o(ae, "Wrapper<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), b = o(ae, "Content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").append(R = o(ae, "Title<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), F = o(ae, "Current"), P = t('<i class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev') + '" />').attr({ id: Z + "Previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>" }), K = t('<i class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next') + '"/>').attr({ id: Z + "Next<?php echo esc_attr( $Total_Soft_vgallery ); ?>" }), I = o("button", "Slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), M), B = t('<i class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close') + '"/>').attr({ id: Z + "Close<?php echo esc_attr( $Total_Soft_vgallery ); ?>" }), y.append(o(ae).append(o(ae, "TopLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), T = o(ae, "TopCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), o(ae, "TopRight<?php echo esc_attr( $Total_Soft_vgallery ); ?>")), o(ae, !1, "clear:left").append(C = o(ae, "MiddleLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), b, H = o(ae, "MiddleRight<?php echo esc_attr( $Total_Soft_vgallery ); ?>")), o(ae, !1, "clear:left").append(o(ae, "BottomLeft<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), k = o(ae, "BottomCenter<?php echo esc_attr( $Total_Soft_vgallery ); ?>"), o(ae, "BottomRight<?php echo esc_attr( $Total_Soft_vgallery ); ?>"))).find("div div").css({ "float": "left" }), S = o(ae, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(F).add(I), t(e.body).append(v, x.append(y, S)))
    }
    function m() {
        function i(t) {
            t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this))
        }
        return x ? (V || (V = !0, K.click(function () {
            J.next()
        }), P.click(function () {
            J.prev()
        }), B.click(function () {
            J.close()
        }), v.click(function () {
            _.get("overlayClose") && J.close()
        }), t(e).bind("keydown." + Z, function (t) {
            var e = t.keyCode;
            $ && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), $ && _.get("arrowKey") && E[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()))
        }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).on("click." + Z, i)), !0) : !1
    }
    function w() {
        var n, r, h, d = J.prep, c = ++le;
        q = !0, U = !1, u(he), u(ie), _.get("onLoad"), _.h = _.get("height") ? s(_.get("height"), "y") - A - D : _.get("innerHeight") && s(_.get("innerHeight"), "y"), _.w = _.get("width") ? s(_.get("width"), "x") - N - j : _.get("innerWidth") && s(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = s(_.get("maxWidth"), "x") - N - j, _.mw = _.w && _.mw > _.w ? _.w : _.mw), _.get("maxHeight") && (_.mh = s(_.get("maxHeight"), "y") - A - D, _.mh = _.h && _.mh > _.h ? _.h : _.mh), n = _.get("href"), Q = setTimeout(function () {
            M.show()
        }, 100), _.get("inline") ? (h = o(ae).hide().insertBefore(t(n)[0]), se.one(he, function () {
            h.replaceWith(L.children())
        }), d(t(n))) : _.get("iframe") ? d(" ") : _.get("html") ? d(_.get("html")) : a(_, n) ? (n = l(_, n), U = e.createElement("img"), t(U).addClass(Z + "Photo<?php echo esc_attr( $Total_Soft_vgallery ); ?>").bind("error", function () {
            d(o(ae, "Error").html(_.get("imgError")))
        }).one("load", function () {
            var e;
            c === le && (t.each(["alt", "longdesc", "aria-describedby"], function (e, i) {
                var o = t(_.el).attr(i) || t(_.el).attr("data-" + i);
                o && U.setAttribute(i, o)
            }), _.get("retinaImage") && i.devicePixelRatio > 1 && (U.height = U.height / i.devicePixelRatio, U.width = U.width / i.devicePixelRatio), _.get("scalePhotos") && (r = function () {
                U.height -= U.height * e, U.width -= U.width * e
            }, _.mw && U.width > _.mw && (e = (U.width - _.mw) / U.width, r()), _.mh && U.height > _.mh && (e = (U.height - _.mh) / U.height, r())), _.h && (U.style.marginTop = Math.max(_.mh - U.height, 0) / 2 + "px"), E[1] && (_.get("loop") || E[z + 1]) && (U.style.cursor = "pointer", U.onclick = function () {
                J.next()
            }), U.style.width = U.width + "px", U.style.height = U.height + "px", setTimeout(function () {
                d(U)
            }, 1))
        }), setTimeout(function () {
            U.src = n
        }, 1)) : n && S.load(n, _.get("data"), function (e, i) {
            c === le && d("error" === i ? o(ae, "Error").html(_.get("xhrError")) : t(this).contents())
        })
    }
    var v, x, y, b, T, C, H, k, E, W, L, S, M, R, F, I, K, P, B, O, _, D, j, A, N, z, U, $, q, G, Q, J, V, X = {
        html: !1,
        photo: !1,
        iframe: !1,
        inline: !1,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: !1,
        initialWidth: "60",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "45",
        innerHeight: !1,
        maxHeight: !1,
        scalePhotos: !0,
        scrolling: !0,
        opacity: .9,
        preloading: !0,
        className: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        top: !1,
        bottom: !1,
        left: !1,
        right: !1,
        fixed: !1,
        data: void 0,
        closeButton: !0,
        fastIframe: !0,
        open: !1,
        reposition: !0,
        loop: !0,
        slideshow: !1,
        slideshowAuto: !1,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(ashx|gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: !1,
        retinaUrl: !1,
        retinaSuffix: "@2x.$1",
        current: "{current}/{total}",
        previous: "",
        next: "",
        close: "",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: !0,
        trapFocus: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        rel: function () {
            return this.rel
        },
        href: function () {
            return t(this).attr("data-href")
        },
        title: function () {

            return t(this).attr("data-name")
        }
    }, Y = "colorbox", Z = "cbox", te = Z + "Element<?php echo esc_attr( $Total_Soft_vgallery ); ?>", ee = Z + "_open", ie = Z + "_load", oe = Z + "_complete", ne = Z + "_cleanup", re = Z + "_closed", he = Z + "_purge", se = t("<a/>"), ae = "div", le = 0, de = {}, ce = function () {
        function t() {
            clearTimeout(h)
        }
        function e() {
            (_.get("loop") || E[z + 1]) && (t(), h = setTimeout(J.next, _.get("slideshowSpeed")))
        }
        function i() {
            I.html(_.get("slideshowStop")).unbind(a).one(a, o), se.bind(oe, e).bind(ie, t), x.removeClass(s + "off").addClass(s + "on")
        }
        function o() {
            t(), se.unbind(oe, e).unbind(ie, t), I.html(_.get("slideshowStart")).unbind(a).one(a, function () {
                J.next(), i()
            }), x.removeClass(s + "on").addClass(s + "off")
        }
        function n() {
            r = !1, I.hide(), t(), se.unbind(oe, e).unbind(ie, t), x.removeClass(s + "off " + s + "on")
        }
        var r, h, s = Z + "Slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>_", a = "click." + Z;
        return function () {
            r ? _.get("slideshow") || (se.unbind(ne, n), n()) : _.get("slideshow") && E[1] && (r = !0, se.one(ne, n), _.get("slideshowAuto") ? i() : o(), I.show())
        }
    }();
    t.colorbox || (t(p), J = t.fn[Y] = t[Y] = function (e, i) {
        var o, n = this;
        if (e = e || {}, t.isFunction(n)) n = t("<a/>"), e.open = !0; else if (!n[0]) return n;
        return n[0] ? (p(), m() && (i && (e.onComplete = i), n.each(function () {
            var i = t.data(this, Y) || {};
            t.data(this, Y, t.extend(i, e))
        }).addClass(te), o = new r(n[0], e), o.get("open") && f(n[0])), n) : n
    }, J.position = function (e, i) {
        function o() {
            T[0].style.width = k[0].style.width = b[0].style.width = parseInt(x[0].style.width, 10) - j + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(x[0].style.height, 10) - D + "px"
        }
        var r, h, a, l = 0, d = 0, c = x.offset();
        let src_url, url_heigth;
        url_heigth = Math.round(jQuery(window).width() * 0.7 / 16 * 9);
        if (_.get("href")) {
            src_url = _.get("href");
            if (src_url.indexOf('youtube') > 0) url_heigth = Math.round(jQuery(window).width() * 0.7 / 16 * 9);
        }
        if (W.unbind("resize." + Z), x.css({
            top: -9e4, left: -9e4
        }), h = W.scrollTop(), a = W.scrollLeft(), _.get("fixed") ? (c.top -= h, c.left -= a, x.css({ position: "fixed" })) : (l = h, d = a, x.css({ position: "fixed" })), d += _.get("right") !== !1 ? Math.max(W.width() - _.w - N - j - s(_.get("right"), "x"), 0) : _.get("left") !== !1 ? s(_.get("left"), "x") : Math.round(Math.max(W.width() - _.w - N - j, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(n() - _.h - A - D - s(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? s(_.get("top"), "y") : Math.round(Math.max(n() - _.h - A - D, 0) / 2), x.css({
            top: c.top, left: c.left, visibility: "visible"
        }), y[0].style.width = y[0].style.height = "9999px", r = {
            width: _.w + N + j, height: _.h + A + D > 150 ? url_heigth : 0, top: (jQuery(window).height() - Math.round(jQuery(window).width() * 0.7 / 16 * 9)) / 2, left: d
        }, e) {
            var g = 0;
            t.each(r, function (t) {
                return r[t] !== de[t] ? (g = e, void 0) : void 0
            }), e = g
        }
        de = r, e || x.css(r), x.dequeue().animate(r, {
            duration: e || 0, complete: function () {
                o(), q = !1, y[0].style.width = _.w + N + j + "px", y[0].style.height = _.h + A + D + "px", _.get("reposition") && setTimeout(function () {
                    W.bind("resize." + Z, J.position)
                }, 1), i && i()
            }, step: o
        })
    }, J.resize = function (t) {
        var e;
        $ && (t = t || {}, t.width && (_.w = s(t.width, "x") - N - j), t.innerWidth && (_.w = s(t.innerWidth, "x")), L.css({ width: _.w }), t.height && (_.h = s(t.height, "y") - A - D), t.innerHeight && (_.h = s(t.innerHeight, "y")), t.innerHeight || t.height || (e = L.scrollTop(), L.css({ height: "auto" }), _.h = L.height()), L.css({ height: _.h }), e && L.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")))
    }, J.prep = function (i) {
        function n() {
            return _.w = _.w || L.width(), _.w = _.mw && _.w > _.mw ? _.mw : _.w, _.w
        }
        function s() {
            return _.h = _.h || L.height(), _.h = _.mh && _.h > _.mh ? _.mh : _.h, _.h
        }
        if ($) {
            var d, g = "none" === _.get("transition") ? 0 : _.get("speed");
            L.remove(), L = o(ae, "LoadedContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>").append(i), L.hide().appendTo(S.show()).css({
                width: '100%', position: 'relative', overflow: _.get("scrolling") ? "auto" : "hidden"
            }).css({ height: '100%' }).prependTo(b), S.hide(), t(U).css({ "float": "none" }), c(_.get("className")), d = function () {
                function i() {
                    t.support.opacity === !1 && x[0].style.removeAttribute("filter")
                }
                var o, n, s = E.length;
                $ && (n = function () {
                    clearTimeout(Q), M.hide(), u(oe), _.get("onComplete")
                }, R.html(_.get("title")).show(), L.show(), s > 1 ? ("string" == typeof _.get("current") && F.html(_.get("current").replace("{current}", z + 1).replace("{total}", s)).show(), K[_.get("loop") || s - 1 > z ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || z ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([h(-1), h(1)], function () {
                    var i, o = E[this], n = new r(o, t.data(o, Y)), h = n.get("href");
                    h && a(n, h) && (h = l(n, h), i = e.createElement("img"), i.src = h)
                })) : O.hide(), _.get("iframe") ? (o = e.createElement("iframe"), "frameBorder" in o && (o.frameBorder = 0), "allowTransparency" in o && (o.allowTransparency = "true"), _.get("scrolling") || (o.scrolling = "no"), t(o).attr({
                    src: _.get("href"), name: (new Date).getTime(), "class": Z + "Iframe<?php echo esc_attr( $Total_Soft_vgallery ); ?>", allowFullScreen: !0
                }).one("load", n).appendTo(L), se.one(he, function () {
                    o.src = "//about:blank"
                }), _.get("fastIframe") && t(o).trigger("load")) : n(), "fade" === _.get("transition") ? x.fadeTo(g, 1, i) : i())
            }, "fade" === _.get("transition") ? x.fadeTo(g, 0, function () {
                J.position(0, d)
            }) : J.position(g, d)
        }
    }, J.next = function () {
        !q && E[1] && (_.get("loop") || E[z + 1]) && (z = h(1), f(E[z]))
    }, J.prev = function () {
        !q && E[1] && (_.get("loop") || z) && (z = h(-1), f(E[z]))
    }, J.close = function () {
        $ && !G && (G = !0, $ = !1, u(ne), _.get("onCleanup"), W.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), x.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
            x.add(v).css({ opacity: 1, cursor: "auto" }).hide(), u(he), L.remove(), setTimeout(function () {
                G = !1, u(re), _.get("onClosed")
            }, 1)
        }))
    }, J.remove = function () {
        x && (x.stop(), t.colorbox.close(), x.stop().remove(), v.remove(), G = !1, x = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z))
    }, J.element = function () {
        return t(_.el)
    }, J.settings = X)
})(jQuery, document, window);
   
!function (window, document, $, undefined) {
    $.swipebox = function (elem, options) {
        var defaults = {
            useCSS: true, initialIndexOnArray: 0, hideBarsDelay: 3e3, videoMaxWidth: 1140, vimeoColor: "CCCCCC", beforeOpen: null, afterClose: null
        }, plugin = this, elements = [], elem = elem, selector = elem, $selector = $(selector), isTouch = document.createTouch !== undefined || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, supportSVG = !!window.SVGSVGElement, winWidth = window.innerWidth ? window.innerWidth : $(window).width(), winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
            html = '<div id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay"><div id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider"></div><div id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption"></div><div id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action"><i id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close" class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close') + '"></i><i id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev" class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev') + '"></i><i id="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next" class="' + jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next') + '"></i></div></div>';
        plugin.settings = {};
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            if ($.isArray(elem)) {
                elements = elem;
                ui.target = $(window);
                ui.init(plugin.settings.initialIndexOnArray)
            }
            else {
                $selector.click(function (e) {
                    elements = [];
                    var index, relType, relVal;
                    if (!relVal) {
                        relType = "rel";
                        relVal = $(this).attr(relType)
                    }
                    if (relVal && relVal !== "" && relVal !== "nofollow") {
                        $elem = $selector.filter("[" + relType + '="' + relVal + '"]')
                    }
                    else {
                        $elem = $(selector)
                    }
                    $elem.each(function () {
                        var title = null, href = null;
                        if ($(this).attr("data-name")) title = $(this).attr("data-name");
                        if ($(this).attr("data-href")) href = $(this).attr("data-href");
                        elements.push({ href: href, title: title })
                    });
                    index = $elem.index($(this));
                    e.preventDefault();
                    e.stopPropagation();
                    ui.target = $(e.target);
                    ui.init(index)
                })
            }
        };
        plugin.refresh = function () {
            if (!$.isArray(elem)) {
                ui.destroy();
                $elem = $(selector);
                ui.actions()
            }
        };
        var ui = {
            init: function (index) {
                if (plugin.settings.beforeOpen) plugin.settings.beforeOpen();
                this.target.trigger("swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-start");
                $.swipebox.isOpen = true;
                this.build();
                this.openSlide(index);
                this.openMedia(index);
                this.preloadMedia(index + 1);
                this.preloadMedia(index - 1)
            }, build: function () {
                var $this = this;
                $("body").append(html);

                jQuery("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next,#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev,#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close").removeAttr('class');
                jQuery("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close'));
                jQuery("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next'));
                jQuery("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev").addClass(jQuery(".TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev'));
                if ($this.doCssTrans()) {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").css({
                        "-webkit-transition": "left 0.4s ease", "-moz-transition": "left 0.4s ease", "-o-transition": "left 0.4s ease", "-khtml-transition": "left 0.4s ease", transition: "left 0.4s ease"
                    });
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay").css({
                        "-webkit-transition": "opacity 1s ease", "-moz-transition": "opacity 1s ease", "-o-transition": "opacity 1s ease", "-khtml-transition": "opacity 1s ease", transition: "opacity 1s ease"
                    });
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption").css({
                        "-webkit-transition": "0.5s", "-moz-transition": "0.5s", "-o-transition": "0.5s", "-khtml-transition": "0.5s", transition: "0.5s"
                    })
                }
                if (supportSVG) {
                    var bg = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close").css("background-image");
                    bg = bg.replace("png", "svg");
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev,#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next,#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close").css({ "background-image": bg })
                }
                $.each(elements, function () {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").append('<div class="slide"></div>')
                });
                $this.setDim();
                $this.actions();
                $this.keyboard();
                $this.gesture();
                $this.animBars();
                $this.resize()
            }, setDim: function () {
                var width, height, sliderCss = {};
                if ("onorientationchange" in window) {
                    window.addEventListener("orientationchange", function () {
                        if (window.orientation == 0) {
                            width = winWidth;
                            height = winHeight
                        }
                        else if (window.orientation == 90 || window.orientation == -90) {
                            width = winHeight;
                            height = winWidth
                        }
                    }, false)
                }
                else {
                    width = window.innerWidth ? window.innerWidth : $(window).width();
                    height = window.innerHeight ? window.innerHeight : $(window).height()
                }
                sliderCss = { width: width, height: height };
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay").css(sliderCss)
            }, resize: function () {
                var $this = this;
                $(window).resize(function () {
                    $this.setDim()
                }).resize()
            }, supportTransition: function () {
                var prefixes = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");
                for (var i = 0; prefixes.length > i; i++) {
                    if (document.createElement("div").style[prefixes[i]] !== undefined) {
                        return prefixes[i]
                    }
                }
                return false
            }, doCssTrans: function () {
                if (plugin.settings.useCSS && this.supportTransition()) {
                    return true
                }
            }, gesture: function () {
                if (isTouch) {
                    var $this = this, distance = null, swipMinDistance = 10, startCoords = {}, endCoords = {};
                    var bars = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action");
                    bars.addClass("visible-bars");
                    $this.setTimeout();
                    $("body").bind("touchstart", function (e) {
                        $(this).addClass("touching");
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        $(".touching").bind("touchmove", function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            endCoords = e.originalEvent.targetTouches[0]
                        });
                        return false
                    }).bind("touchend", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        distance = endCoords.pageX - startCoords.pageX;
                        if (distance >= swipMinDistance) {
                            $this.getPrev()
                        }
                        else if (distance <= -swipMinDistance) {
                            $this.getNext()
                        }
                        else {
                            if (!bars.hasClass("visible-bars")) {
                                $this.showBars();
                                $this.setTimeout()
                            }
                            else {
                                $this.clearTimeout();
                                $this.hideBars()
                            }
                        }
                        $(".touching").off("touchmove").removeClass("touching")
                    })
                }
            }, setTimeout: function () {
                if (plugin.settings.hideBarsDelay > 0) {
                    var $this = this;
                    $this.clearTimeout();
                    $this.timeout = window.setTimeout(function () {
                        $this.hideBars()
                    }, plugin.settings.hideBarsDelay)
                }
            }, clearTimeout: function () {
                window.clearTimeout(this.timeout);
                this.timeout = null
            }, showBars: function () {
                var bars = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action");
                if (this.doCssTrans()) {
                    bars.addClass("visible-bars");
                    var current = jQuery('div.slide.current');
                    var x = jQuery(current[0].children[0].children[0]);
                    x[0].children[0].controls = true;
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption").animate({ top: 0 }, 500);
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action").animate({ bottom: 0 }, 500);
                    setTimeout(function () {
                        bars.addClass("visible-bars")
                    }, 1e3)
                }
            }, hideBars: function () {
                var bars = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action");
                if (this.doCssTrans()) {
                    bars.removeClass("visible-bars")
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption").animate({ top: "-50px" }, 500);
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action").animate({ bottom: "-50px" }, 500);
                    setTimeout(function () {
                        bars.removeClass("visible-bars")
                    }, 1e3)
                }
            }, animBars: function () {
                var $this = this;
                var bars = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action");
                bars.addClass("visible-bars");
                $this.setTimeout();
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").click(function (e) {
                    if (!bars.hasClass("visible-bars")) {
                        $this.showBars();
                        $this.setTimeout()
                    }
                });
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-action").hover(function () {
                    $this.showBars();
                    bars.addClass("force-visible-bars");
                    $this.clearTimeout()
                }, function () {
                    bars.removeClass("force-visible-bars");
                    $this.setTimeout()
                })
            }, keyboard: function () {
                var $this = this;
                $(window).bind("keyup", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.keyCode == 37) {
                        $this.getPrev()
                    }
                    else if (e.keyCode == 39) {
                        $this.getNext()
                    }
                    else if (e.keyCode == 27) {
                        $this.closeSlide()
                    }
                })
            }, actions: function () {
                var $this = this;
                if (2 > elements.length2) {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next").hide()
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev").bind("click touchend", function (e) {
                        var iframes = jQuery('.slide').find('iframe');
                        jQuery(iframes).each(function (i, el) {
                            var src = jQuery(el).attr('src');
                            jQuery(el).attr('src', src);
                        });
                        e.preventDefault();
                        e.stopPropagation();
                        $this.getPrev();
                        $this.setTimeout()
                    });
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next").bind("click touchend", function (e) {
                        var iframes = jQuery('.slide').find('iframe');
                        jQuery(iframes).each(function (i, el) {
                            var src = jQuery(el).attr('src');
                            jQuery(el).attr('src', src);
                        });
                        e.preventDefault();
                        e.stopPropagation();
                        $this.getNext();
                        $this.setTimeout()
                    })
                }
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-close").bind("click touchend", function (e) {
                    $this.closeSlide()
                })
            }, setSlide: function (index, isFirst) {
                isFirst = isFirst || false;
                var slider = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider");
                if (this.doCssTrans()) {
                    slider.css({ left: -index * 100 + "%" })
                }
                else {
                    slider.animate({ left: -index * 100 + "%" })
                }
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").removeClass("current");
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").eq(index).addClass("current");
                this.setTitle(index);
                if (isFirst) {
                    slider.fadeIn()
                }
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev, #swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next").removeClass("disabled");
                if (index == 0) {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-prev").addClass("disabled")
                }
                else if (index == elements.length - 1) {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-next").addClass("disabled")
                }
            }, openSlide: function (index) {
                $("html").addClass("swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>");
                $(window).trigger("resize");
                this.setSlide(index, true)
            }, preloadMedia: function (index) {
                var $this = this, src = null;
                if (elements[index] !== undefined) {
                    src = elements[index].href;
                    var r = src.replace('embed/', 'watch?v=');
                }
                src = r;
                if (!$this.isVideo(src)) {
                    setTimeout(function () {
                        $this.openMedia(index)
                    }, 1e3)
                }
                else {
                    $this.openMedia(index)
                }
            }, openMedia: function (index) {
                var $this = this, src = null;
                if (elements[index] !== undefined && elements[index].href !== null) {
                    src = elements[index].href;
                    var r = src.replace('embed/', 'watch?v=');
                }
                src = r;
                if (0 > index || index >= elements.length) {
                    return false
                }
                if (!$this.isVideo(src)) {
                    $this.loadMedia(src, function () {
                        $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").eq(index).html(this)
                    })
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").eq(index).html($this.getVideo(src))
                }
            }, setTitle: function (index, isFirst) {
                var title = null;
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption").empty();
                if (elements[index] !== undefined) title = elements[index].title;
                if (title) {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-caption").append(title)
                }
            }, isVideo: function (src) {
                if (src) {
                    if (src.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match(/vimeo\.com\/([0-9]*)/) || src.match(/wistia\.net\/([a-zA-Z0-9\-_]+)/) || src.indexOf('mp4') != -1) {
                        return true;
                    }
                }
            }, getVideo: function (url, x) {
                var iframe = "";
                var output = "";
                var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
                var vimeoUrl = url.match(/vimeo\.com\/([0-9]*)/);
                var wistiaUrl = url.match(/wistia\.net\/([a-zA-Z0-9\-_]+)/);
                let url_heigth = Math.round(jQuery(window).width() * 0.7 / 16 * 9);
                var tsvg_autoplay = jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-tsvg-autoplay');
                if (youtubeUrl) {
                    url_heigth = Math.round(jQuery(window).width() * 0.7 / 16 * 9);
                    var s = youtubeUrl.input.replace('watch?v=', 'embed/');
                    if (youtubeUrl.input.indexOf('start') === -1) {
                        var url_end =  tsvg_autoplay == "true" ? '?autoplay=1&mute=1' : '?&rel=0;iv_load_policy=3';
                        var url_yutub = 'https://www.youtube.com/embed/' + youtubeUrl[1] + url_end
                        iframe = '<iframe width="560" height="315" src="' + url_yutub + '" frameborder="0" allowfullscreen></iframe>'
                    }else {
                        iframe = '<iframe width="560" height="315" src="' + s + '&mute=0&enablejsapi=1&rel=0&;iv_load_policy=3" frameborder="0" allowfullscreen></iframe>'
                    }
                }else if (url.indexOf("mp4") != -1) {
                    if (tsvg_autoplay == "true") {
                        // var url_yutub = 'https://www.youtube.com/embed/' + youtubeUrl[1] + '?autoplay=1&mute=1';
                        // var agg = url + "?autoplay=1&mute=1";
                        var iframe = '<video class="videos" style="width: 100.5% !important;height: 100.5% !important;position: absolute;top: 0;left: 0;background: #ffffff;" controls autoplay controlslist="nodownload" name="media"><source src="' + url + ' " type="video/mp4"></video>'
                    }else{
                        // var url_yutub = 'https://www.youtube.com/embed/' + youtubeUrl[1] + '?&rel=0;iv_load_policy=3';
                        var iframe = '<video class="videos" style="width: 100.5% !important;height: 100.5% !important;position: absolute;top: 0;left: 0;background: #ffffff;" controls controlslist="nodownload" name="media"><source src="' + url + ' " type="video/mp4"></video>'
                    }
                }else if (vimeoUrl) {
                    if (tsvg_autoplay == "true") {
                        var vim = vimeoUrl.input + '?autoplay=1&amp;autopause=0';
                        var iframe = '<iframe width="560" height="315"  src="' + vim + "&amp;byline=0&amp;portrait=0&amp;color=" + plugin.settings.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
                    } else{
                        var iframe = '<iframe width="560" height="315"  src="' + vimeoUrl.input + "?byline=0&amp;portrait=0&amp;color=" + plugin.settings.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
                    }
                }
                if (url.indexOf("wistia") != -1) {
                    wistiaUrl = wistiaUrl.input;
                    wistiaUrl = wistiaUrl.replace('watch?v=', 'embed/');
                    iframe = '<iframe width="560" height="315" src="' + wistiaUrl + '" allowtransparency="true" scrolling="no" frameborder="0" allowfullscreen></iframe>'
                }
                return '<div class="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-container" style="max-width:' + plugin.settings.videomaxWidth + 'px"><div class="swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video"   style="height:' + url_heigth + 'px; ">' + iframe + "</div></div>"
            }, loadMedia: function (src, callback) {
                if (!this.isVideo(src)) {
                    var img = $("<img>").on("load", function () {
                        callback.call(img)
                    });
                    img.attr("src", src)
                }
            }, getNext: function () {
                var $this = this;
                index = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").index($("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide.current"));
                if (elements.length > index + 1) {
                    index++;
                    $this.setSlide(index);
                    $this.preloadMedia(index + 1)
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").addClass("rightSpring");
                    setTimeout(function () {
                        $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").removeClass("rightSpring")
                    }, 500)
                }
            }, getPrev: function () {
                index = $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide").index($("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider .slide.current"));
                if (index > 0) {
                    index--;
                    this.setSlide(index);
                    this.preloadMedia(index - 1)
                }
                else {
                    $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").addClass("leftSpring");
                    setTimeout(function () {
                        $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").removeClass("leftSpring")
                    }, 500)
                }
            }, closeSlide: function () {
                $("html").removeClass("swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>");
                $(window).trigger("resize");
                this.destroy()
            }, destroy: function () {
                $(window).unbind("keyup");
                $("body").unbind("touchstart");
                $("body").unbind("touchmove");
                $("body").unbind("touchend");
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-slider").unbind();
                $("#swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-overlay").remove();
                if (!$.isArray(elem)) elem.removeData("_swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>");
                if (this.target) this.target.trigger("swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-destroy");
                $.swipebox.isOpen = false;
                if (plugin.settings.afterClose) plugin.settings.afterClose()
            }
        };
        plugin.init()
    };
    $.fn.swipebox = function (options) {
        if (!$.data(this, "_swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>")) {
            var swipebox = new $.swipebox(this, options);
            this.data("_swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>", swipebox)
        }
        return this.data("_swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>")
    }
}(window, document, jQuery);
var TotalSoft_JGV_P_T =jQuery('.TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-item-type');
var TotalSoft_JGV_P1S_ET =jQuery('.TotSoft_GV_Container_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-item-efect');
	  
jQuery(document).ready(function() {
	if(TotalSoft_JGV_P_T==1) {
	  	jQuery('.swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-TotSoft<?php echo esc_attr( $Total_Soft_vgallery ); ?>').swipebox();
	}
	else {
	  	jQuery('.swipebox<?php echo esc_attr( $Total_Soft_vgallery ); ?>-video-TotSoft<?php echo esc_attr( $Total_Soft_vgallery ); ?>').colorbox({
			iframe: true, transition: TotalSoft_JGV_P1S_ET, innerWidth: jQuery(window).width() * 0.7, innerHeight: jQuery(window).width() * 0.7 * 0.6, maxWidth: "80%", maxHeight: "80%", current: "", rel: 'slideshow', slideshow: false
	  	});
	}
})
</script>