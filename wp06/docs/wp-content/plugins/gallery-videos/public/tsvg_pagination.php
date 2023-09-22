<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       TS-Video-Gallery
 * @since      1.7.7
 *
 * @package    TS-Video-Gallery
 */
?>
<style type="text/css">
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery *::after, #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery *::before, #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery * {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		line-height: 1 !important;	
		
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul li,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul li,.pagination-outer[data-pagination='all'],.disabled-item{
		display: none!important;
	}
	.pagination-outer[data-pagination='pagination']{
		display: flex !important;
		/* overflow-y: hidden;
		overflow-x: auto; */
	}
	.page-item a:focus{
	  outline:none!important;
	  box-shadow:unset!important;
	}
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Grid Video Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: flex!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'LightBox Video Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: flex!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Thumbnails Video' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: flex!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Content Popup' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: inline-block!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Elastic Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: inline-block!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Fancy Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: inline-block!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Parallax Engine' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: inline-block!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Classic Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: inline-block!important;
		}
	<?php } ?>
	<?php if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Space Gallery' ) { ?>
		.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-pagination='load-more']  figure ul .item-show{
			display: block!important;
		}
	<?php } ?>
	:root{
		--tsvg_s_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_04 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_03 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_10 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_h_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_07 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_ac_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_08 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_ac_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_09 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_05 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_s_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_06 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_11 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_b_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_12 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_s_pl_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_13 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_19 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_20 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_21 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_s_l_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_22 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_bc_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_23 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_25 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_h_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_26 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_s_l_h_bc_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $TS_VG_Option_Style->TotalSoft_VGallery_Sty_27 ), FILTER_SANITIZE_STRING ); ?>;
	}
	.pagination-outer{
	   display: flex;
	   justify-content: center;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination{
		font-family: var(--tsvg_s_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		display: inline-flex;
		align-items: center;
		position: relative;
		padding-left: 0;
		padding: 20px 0!important;
		margin: 20px 0;
		border-radius: 4px;
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
		max-width: 100%;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		text-align: center;
		width: unset !important;
		overflow: hidden !important;
	}
	.pagination>li {
		display: inline;
		font-family: var(--tsvg_s_ff_480252)!important;
	}
	.pagination>li>a, .pagination>li>span {
		position: relative;
		float: left;
		padding: 6px 12px;
		margin-left: -1px;
		line-height: 1.42857143;
		color: #337ab7 ;
		text-decoration: none;
		background-color: #fff ;
		border: 1px solid #ddd;
	}
	.page-link{
	  	padding: 0 8px !important;
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure .tsvg-load{
		-webkit-transition: height 3s ease-out;
		-moz-transition: height 3s ease-out;
		-o-transition: height 3s ease-out;
		-ms-transition: height 3s ease-out;
		transition: height 3s ease-out;
	}
	/* ef1 */
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link{
		display: flex !important;
		justify-content: center;
		flex-direction: column;
		color: var(--tsvg_s_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ;
		background-color: var(--tsvg_s_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_s_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 500 !important;
		min-height: 35px;
		min-width: 35px;
		height: auto;
		width: auto;
		padding: 0px;
		margin: 0 8px;
		border-radius: 10px;
		border: none !important;
		position: relative;
		z-index: 1;
		transition: all 0.4s ease 0s;
		box-shadow: none !important;
		text-align:center !important;
		font-family: inherit;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .page-link span{
		height: unset !important;
		width: unset !important;
		margin-right: unset !important;
		text-transform: none !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li:first-child a.page-link span,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li:last-child a.page-link span{
		font-size: var(--tsvg_s_pl_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color:var(--tsvg_s_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		font-weight: 600 !important;
		border: unset !important;
		background: unset !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link span:hover{
		color:var(--tsvg_s_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:hover{
		color:var(--tsvg_s_h_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		background-color: transparent !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:hover,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link{
		color:var(--tsvg_s_ac_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		background-color: transparent;
	}

	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:before,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:after{
		content: '';
		height: 100%;
		width: 100%;
		border: 2px solid var(--tsvg_s_b_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: 50%;
		opacity: 0;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		transition: all 0.4s ease 0s;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:after{
		height: 10px;
		width: 10px;
		border: none !important;
		transform: scale(0);
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:hover:before,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:hover:before,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:before{
		opacity: 1;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:hover:after,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:hover:after,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:after{
		opacity: 1;
		transform: scale(1);
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li a.page-link:hover:after{
	  background-color:var(--tsvg_s_h_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:hover:after,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination[data-ef='ef-1'] li.active a.page-link:after{
	  background-color:var(--tsvg_s_ac_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	@media only screen and (max-width: 480px){
		.pagination[data-ef='ef-1']{
			font-size: 0;
			display: inline-block;
		}
		.pagination[data-ef='ef-1'] li{
			display: inline-block;
			vertical-align: top;
			margin: 10px 0;
		}
	}
	

	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .pagination-outer .btn{
		outline:0;
	}
	
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-load-vw='ef-1'] .btn,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-load-vw='ef-1'] .btn:hover{
	   color:  var(--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	   background:  var(--tsvg_s_l_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	   font-family:  var(--tsvg_s_l_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
	   font-size:  var(--tsvg_s_l_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	   font-weight: 500;
		margin: 20px 0;
	   text-transform: uppercase;
	   letter-spacing: 1px;
	   padding: 11px 25px 10px;
	   border: none;
	   border-radius: 30px;
	   box-shadow: 0 15px 35px rgba(0,0,0,0.2);
	   position: relative;
	   z-index: 1;
	   transition: all 0.3s ease 0s;
	   text-decoration: none;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-load-vw='ef-1'] .btn:before,
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-load-vw='ef-1'] .btn:after{
		content: "";
		background: var(--tsvg_s_l_bc_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		width: 30px;
		height: 7px;
		border-radius: 10px 10px;
		box-shadow: 0 0 5px var(--tsvg_s_l_bc_2_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		transform: translateX(-50%);
		position: absolute;
		left: 50%;
		top: -4px;
		margin:0;
		opacity:1;
		outline:0;
		z-index: -1;
		transition: all 0.3s;
	}

	.pagination-outer[data-load-vw='ef-1'] .btn:after{
	 	top: auto!important;
	 	bottom: -4px;
	}

	@media only screen and (max-width: 767px){
		.pagination-outer[data-load-vw='ef-1'] .btn{ margin-bottom: 30px; }
	}
	
	.tsvg_position_select[data-change-elem=".pagination"],.tsvg_position_select[data-change-elem=".pagination-outer"]{
	  	padding:0!important;
	}
	.tsvg_position_select[data-change-elem=".pagination"] >.tsvg_position_item {
	  	padding-bottom:0!important;
	  	/* padding-left:20px; */
	}
	.tsvg_position_select[data-change-elem=".pagination-outer"] >.tsvg_position_item {
	  	padding-bottom:0!important;
	}
	.tsvg_position_select[data-change-elem=".pagination-outer"]>.tsvg_position_item {
	  	width: 47%;
	}
	.tsvg_position_select[data-change-elem=".pagination"] >.tsvg_position_item>img,.tsvg_position_select[data-change-elem=".pagination-outer"] >.tsvg_position_item>img {
	  	position: unset!important;
	  	left: unset!important;
	  	top: unset!important;
	  	bottom: unset!important;
	  	right: unset!important;
	}
	.tsvg_position_select[data-change-elem=".pagination"] .tsvg_position_item.tsvg_active:before {
	 	top: 50%;
	 	transform: translate(0, -50%);
	 	margin:0;
	 	left: 0;
	}
	@-webkit-keyframes line {
	 	5%, 10% {
			transform: translateY(-30px);
	 	}
	 	40% {
			transform: translateY(-20px);
	 	}
	 	65% {
			transform: translateY(0);
	 	}
	 	75%, 100% {
			transform: translateY(30px);
	 	}
	}
	@keyframes line {
	  	5%, 10% {
			transform: translateY(-30px);
	  	}
	  	40% {
			transform: translateY(-20px);
	  	}
	  	65% {
			transform: translateY(0);
	  	}
	  	75%, 100% {
			transform: translateY(30px);
	  	}
	}
	@-webkit-keyframes svg {
	 	0%, 20% {
			stroke-dasharray: 0;
			stroke-dashoffset: 0;
	 	}
	 	21%, 89% {
			stroke-dasharray: 26px;
			stroke-dashoffset: 26px;
			stroke-width: 3px;
			margin: -10px 0 0 -10px;
			stroke:var(--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	 	}
	  	100% {
			stroke-dasharray: 26px;
			stroke-dashoffset: 0;
			margin: -10px 0 0 -10px;
			stroke:var(--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	}
	  	12% {
			opacity: 1;
	  	}
	  	20%, 89% {
			opacity: 0;
	  	}
	  	90%, 100% {
			opacity: 1;
	  	}
	}
	@keyframes svg {
	  	0%, 20% {
			stroke-dasharray: 0;
			stroke-dashoffset: 0;
	  	}
	  	21%, 89% {
			stroke-dasharray: 26px;
			stroke-dashoffset: 26px;
			stroke-width: 3px;
			margin: -10px 0 0 -10px;
			stroke:var(--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	}
	  	100% {
			stroke-dasharray: 26px;
			stroke-dashoffset: 0;
			margin: -10px 0 0 -10px;
			stroke:var(--tsvg_s_l_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  	}
	  	12% {
			opacity: 1;
	  	}
	  	20%, 89% {
			opacity: 0;
	  	}
	  	90%, 100% {
			opacity: 1;
	  	}
	}
	@-webkit-keyframes background {
	  	10% {
			transform: scaleY(0);
	  	}
	  	40% {
			transform: scaleY(0.15);
	  	}
	  	65% {
			transform: scaleY(0.5);
			border-radius: 0 0 50% 50%;
	  	}
	  	75% {
			border-radius: 0 0 50% 50%;
	  	}
	  	90%, 100% {
			border-radius: 0;
	  	}
	  	75%, 100% {
			transform: scaleY(1);
	  	}
	}
	@keyframes background {
	  	10% {
			transform: scaleY(0);
	  	}
	  	40% {
			transform: scaleY(0.15);
	  	}
	  	65% {
			transform: scaleY(0.5);
			border-radius: 0 0 50% 50%;
	  	}
	  	75% {
			border-radius: 0 0 50% 50%;
	  	}
	  	90%, 100% {
			border-radius: 0;
	  	}
	  	75%, 100% {
			transform: scaleY(1);
	  	}
	}
	@media (max-width: 400px) {
	 	body .container .button {
			margin: 12px;
	 	}
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pagination-outer[data-pagination='load-more'] .btn-lg span,.pagination-outer[data-pagination='load-more'] .btn-lg i{
	  display:none;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-pagination='pagination'][data-icon-show='false'] i{
	  display:none;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-pagination='pagination'][data-icon-show='true'] span{
	  display:none;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-pagination='load-more'][data-load-icon='text'] .btn-lg span{
	  display:inline-block;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-pagination='load-more'][data-load-icon='icon'] .btn-lg i{
	  display:inline-block;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pagination-outer[data-pagination='load-more'][data-load-icon='text-icon'] .btn-lg span,.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer[data-pagination='load-more'][data-load-icon='text-icon'] .btn-lg i{
	  display:inline-block;
	}
	a.page-link{
	  display:inline-block!important;
	}
	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .item-show-none{
    /* display: none !important; */
    visibility: hidden !important;
}
</style>
<?php
echo sprintf(
	"
    <nav class='pagination-outer' data-short-id='%s' data-short-theme='%s'  data-pagination='%s' data-load-vw='%s' data-icon-show='%s' data-load-icon='%s' >
        <ul class='pagination' data-ef='%s' data-vw='%s'  data-next-item='%s' data-prev-item='%s' data-prev-icon='%s' data-next-icon='%s' data-load-icon='%s' data-load-text='%s'>
        </ul>
    </nav>
	",
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_08 ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_16'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_17'] ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_05 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_06 ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_01'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_02'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_14'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_15'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_24'] ),
	esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_18'] )
);
?>
<script>
	var flag_load = 'false';
	function appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(userdata,min, max) {
		var requireData = userdata.slice(min, max);
		var short_id =jQuery(userdata).closest('section').find('.pagination-outer').attr('data-short-id');
		var short_theme =jQuery(userdata).closest('section').find('.pagination-outer').attr('data-short-theme');
		jQuery.each(requireData, function (index, value) {
			let  tsvg_elem_delay = 0.3 * index;	
			if(flag_load == 'true'){
				tsvg_elem_delay = 0.9 * (index+1);	
			}
		   	jQuery(this).css({'-moz-animation-delay': tsvg_elem_delay+'s','-webkit-animation-delay': tsvg_elem_delay+'s','animation-delay': tsvg_elem_delay+'s'});
			jQuery(this).addClass('item-show');
			if(short_theme=='Grid Video Gallery') {
            	jQuery(this).addClass('item-show-none');
			}
		})
		if(short_theme=='Grid Video Gallery') {
		  	var interval_pg_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>= setInterval(upGrid_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
		  	function upGrid_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
		   	if (typeof(window.Modernizr) != "undefined" && window.Modernizr != null && 
			  	typeof(window.imagesLoaded) != "undefined" && window.imagesLoaded != null && 
			  	typeof(window.CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>) != "undefined" && window.CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> != null){
					new  CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(document.getElementById(`grid${short_id}-gallery`));
					setTimeout(() => {
						jQuery(userdata).removeClass('item-show-none');
					}, 100);  
						clearInterval(interval_pg_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
					}
		  	}
		}
		if( jQuery('.ts_vgallery_main_'+short_id).attr("data-pagination")=='load-more' && !jQuery('.ts_vgallery_main_'+short_id+' figure ul li').not('.item-show').length){ jQuery('.ts_vgallery_section_'+short_id+'  .pagination li,.ts_vgallery_section_'+short_id+' .pagination-outer .btn').remove();}
	}
	function paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(id = "<?php echo esc_attr( $Total_Soft_vgallery ); ?>") {
		if (!id) {
			return; 
		}
		var userdata = jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure>ul>li');
		var itemsLength = userdata.length;
		var numberItemsPerPage =  Math.ceil(jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-item-number'));
		var paginationItemsLenth;
		var pagina_length;
		var currentPaginationPosition;
		var showFrom;
		var showTo;
		var pageNumber = 1;
		var next_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-next-item');
		var prev_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-prev-item');
		var prev_icon = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-prev-icon');
		var next_icon = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-next-icon'); 
		var load_icon = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-load-icon');  
		var load_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-load-text'); 
		var max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').height(); 
		var currentPosition = 1;
		var page_vw = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-vw');
		jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul').removeClass('tsvg-load');
		jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul li').removeClass('item-show');
		jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination li,.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer .btn').remove();
		if( jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr("data-pagination")=='pagination'){
			paginationItemsLenth = Math.ceil(itemsLength / numberItemsPerPage) ;
			pagina_length=paginationItemsLenth=paginationItemsLenth<1?1:paginationItemsLenth;
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').append('<li class="page-item page-item-prev" data-item-number="prev"><a href="javascript:void(0)" class="page-link"  ><span >'+prev_text+'</span> <i class="'+prev_icon+'"></i></a></li>')
			
			for (var i = 0; i < pagina_length; i++) {
				var itemNumber = i + 1;
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pagination').append('<li data-item-number="' + itemNumber + '" class="page-item page-number "><a class="page-link" href="javascript:void(0)">' + itemNumber + '</a></li>')
			}
			if(page_vw=='vw-4'){ jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number').addClass('disabled-item');}
			if(page_vw=='vw-2'&& paginationItemsLenth>7){
				if((pagina_length+1) < paginationItemsLenth)  jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').append('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>')
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').append('<li data-item-number="' + paginationItemsLenth + '" class="page-item "><a class="page-link" href="javascript:void(0)">' + paginationItemsLenth + '</a></li>')
			}
			if(page_vw=='vw-3'&& paginationItemsLenth>4){
				if((pagina_length+1) < paginationItemsLenth)jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').append('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>')
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pagination').append('<li data-item-number="' + paginationItemsLenth + '" class="page-item "><a class="page-link" href="javascript:void(0)">' + paginationItemsLenth + '</a></li>')
			}
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').append('<li class="page-item page-item-next" data-item-number="next"><a href="javascript:void(0)" class="page-link"  ><span>'+next_text+'</span><i class="'+next_icon+'"></i></a></li>')
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  ul.pagination li').not('.page-null').click(function (e) {
			  	if( jQuery(this).hasClass('active')){
					return false;
			  	}
			  	max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').height();
				if(jQuery(this).parent().find('.active').length){
					const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>')[0]
					const tsvgHeaderOffset = 200;
					const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
					const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
					window.scrollTo({
					  top: tsvgOffsetPosition,
					  behavior: "smooth",
					});
				}
				let effect_open_type =  jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-item-open');
				if(effect_open_type!='effect-1'){
				  	jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({'min-height': max_heigth+'px','transition':'unset'});
				}
				jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul li').removeClass('item-show');
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination li').removeClass('active')
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-item[item-number="prev"]').removeClass('disabled-item')
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-item[item-number="next"]').removeClass('disabled-item')
				jQuery(this).addClass('active');
				pageNumber = jQuery(this).attr('data-item-number');
				if (pageNumber == '1') {
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
				} else{
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
				}
				if (+pageNumber == paginationItemsLenth) {
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').addClass('disabled-item');
				}else{
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
				}
				showFrom = numberItemsPerPage * (pageNumber - 1);
				showTo = showFrom + numberItemsPerPage;
				appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(userdata,showFrom, showTo)
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').unbind('click')
				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').click(function () {
					if(jQuery(this).parent().find('.active').length){
						const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>')[0]
						const tsvgHeaderOffset = 200;
						const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
						const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
						window.scrollTo({
						  top: tsvgOffsetPosition,
						  behavior: "smooth",
						});
					}
					currentPosition = parseInt(jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  li.page-item.active').attr('data-item-number'))
					var last_element = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  li.page-item.active').hasClass( "page-number" );
					var prevPosiotion = currentPosition - 1;
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item').removeClass('active')
					let first_item_position =  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .page-number").first().attr('data-item-number'));
					if(first_item_position>1&&last_element){
						jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").each(function(){
							let item_position =  parseInt(jQuery(this).attr('data-item-number'))-1;
							jQuery(this).attr('data-item-number',item_position).find('a').text(item_position)
						});
					}
					if(paginationItemsLenth > (parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number'))+1) && !jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination").find('.page-null').length && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().after('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>') 
					if((parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number'))+1) >= paginationItemsLenth && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination").find('.page-null').remove();
					if(last_element){ } else { jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="' +  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number')) + '"]').addClass('active') } 
					if (currentPosition == '1') {
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
					} else{
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
					}
					if (+currentPosition == paginationItemsLenth) {
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').addClass('disabled-item');
					}else{
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
					}
					jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="' + prevPosiotion + '"]').click()
				})
	  			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').unbind('click')
	  			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').click(function () {
	  				if(jQuery(this).parent().find('.active').length){
						const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>')[0]
						const tsvgHeaderOffset = 200;
						const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
						const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
						window.scrollTo({
						  top: tsvgOffsetPosition,
						  behavior: "smooth",
						});
	  				}
	 				currentPosition = parseInt(jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  li.page-item.active').attr('data-item-number'))
	 				var nextPosition = currentPosition + 1;
	 				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item').removeClass('active')
	 				let last_item_position =  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number'));
	 				if(((paginationItemsLenth-1)>last_item_position && (page_vw=='vw-2' || page_vw=='vw-3'))||((paginationItemsLenth-1)>=last_item_position && (page_vw=='vw-4' || page_vw=='vw-5'))){
		  				jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").each(function(){
							let item_position =  parseInt(jQuery(this).attr('data-item-number'))+1;
							jQuery(this).attr('data-item-number',item_position).find('a').text(item_position)
		  				});
	 				}
	 				if(paginationItemsLenth > (parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number'))+1) && !jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination").find('.page-null').length && (page_vw=='vw-2' || page_vw=='vw-3') )jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().after('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>') 
	 				if((parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-number").last().attr('data-item-number'))+1) >= paginationItemsLenth && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination").find('.page-null').remove();
	 				if (currentPosition == '1') {
		  				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
	  				} else{
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
					}
	  				if (+currentPosition == paginationItemsLenth) {
						  jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .page-item[data-item-number="next"]').addClass('disabled-item');
	  				}else{
						  jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
	  				}
	  				jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .page-item[data-item-number="' + nextPosition + '"]').click();
	  			})
				if('<?php echo $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme; ?>'=='Grid Video Gallery') {
					var interval_pg_cl_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>= setInterval(upGrid_cl_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
					function upGrid_cl_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
					  	if (typeof(window.Modernizr) != "undefined" && window.Modernizr != null && 
							typeof(window.imagesLoaded) != "undefined" && window.imagesLoaded != null && 
							typeof(window.CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>) != "undefined" && window.CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> != null)
						{
					  		new  CBPGridGallery_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(document.getElementById(`grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery`));
							clearInterval(interval_pg_cl_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
					  	}
					  }
				}
	  			if(effect_open_type=='effect-1' && jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure>ul>li').length>1){
		  			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pagination-outer').attr('style','transition:unset; transform: translateY(200%);');
		  			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('style','transition:unset; margin-bottom:140px;');
		  			setTimeout(() => {
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer').attr('style','transition: transform 3s  ease-out;transform: translateY(0%);');
						jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('style','transition: margin 3s  ease-out;margin-bottom:0;');
		  			}, 1000);
	  			}else{
		  			setTimeout(() => {
						jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({'transition':'min-height 3s  ease-in-out','min-height':'0px'});
		  			}, 1000);
		  		}
			})
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .page-number:nth-child(2)').click();
		}
		if( jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr("data-pagination")=='load-more'){
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination-outer').append('<a href="javascript:void(0)" class="btn btn-lg"><span>'+load_text+'</span><i class="'+load_icon+'"></i></a>');
			jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .btn-lg').click(function (e) {
		 		let max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').height(); 
		 		let main_length = jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul li').length;
				flag_load = 'false';
				
		  		jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({'max-height': max_heigth+'px','transition':'unset'});
		  		setTimeout(() => {
				  	jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({'transition':'max-height 3s  ease-in-out','max-height':main_length+'000vh'});
				}, 100);
		  		appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul li').not('.item-show'),0, numberItemsPerPage);
			})
			appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul li').not('.item-show'),0, numberItemsPerPage)
	  	}
	}
	function newPaginate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(){
		var interval_pag_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> = setInterval(setPagina_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
		function setPagina_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
			if(  typeof(jQuery) != "undefined" && jQuery != null){
				if( jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr("data-pagination")=='pagination'){
					paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>("<?php echo esc_attr( $Total_Soft_vgallery ); ?>");
				}
				if( jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr("data-pagination")=='load-more'){
					paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>("<?php echo esc_attr( $Total_Soft_vgallery ); ?>");
				}
				clearInterval(interval_pag_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
			}
		}
	}
	newPaginate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
	function paginationGenerate(){
		paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
	}
</script>