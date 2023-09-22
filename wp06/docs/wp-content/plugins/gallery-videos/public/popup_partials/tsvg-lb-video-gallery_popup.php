<style type="text/css" id="edo">
  	:root{
	  	--tsvg_popup_po_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_po_bw_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_po_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_po_br_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_st_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_tip_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_tip_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_no_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_no_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_pio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_pio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_cio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_cio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_cio_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_c_t_a_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_popup_ao_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_popup_ao_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34 ), FILTER_SANITIZE_STRING ); ?>;
	}
	div.pp_overlay<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		background: #000;
		display: none;
		left: 0;
		position: absolute;
		top: 0;
		width: 100% !important;
		z-index: 999999;
	}
	div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
		position: absolute;
		width: 100px;
		z-index: 9999999;
	}
	div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: fixed;
		/*top: 10% !important;*/
	}
	.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		position: relative;
	}
	* html .pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 0 20px;
	}
	.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: 0;
		position: absolute;
		width: 20px;
	}
	.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: 20px;
		position: absolute;
		right: 20px;
	}
	* html .pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		left: 0;
		position: static;
	}
	.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
	}
	.pp_content<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 40px;
	}
	.pp_fade<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
	}
	.pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		text-align: left;
		width: 100%;
	}
	.pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding-left: 20px;
	}
	.pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding-right: 20px;
	}
	.pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_details<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		margin: 10px auto 2px auto;
	}
	.pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none;
		margin: 0 0 5px 0;
	}
	.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		clear: left;
		float: left;
		margin: 3px 0 0 0;
	}
	.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> p {
		float: left;
		margin: 0px 10px;
		margin-top: 1px;
		line-height: 25px;
	}
	.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_pause<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		float: left;
		margin-right: 10px;
		cursor: pointer;
	}
	i.pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>, i.pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		float: left;
		margin-top: 1px;
		overflow: hidden;
		line-height: 25px;
		cursor: pointer;
	}
	.pp_hoverContainer<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2000;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		left: 50%;
		margin-top: -50px;
		position: absolute;
		z-index: 10000;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul {
		float: left;
		height: 35px;
		margin: 0 0 0 5px;
		overflow: hidden;
		padding: 0;
		position: relative;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul a {
		border: 1px rgba(0, 0, 0, 0.5) solid;
		display: block;
		float: left;
		height: 33px;
		overflow: hidden;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul a:hover, .pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> li.selected a {
		border-color: #fff;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul a img {
		border: 0;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> li {
		display: block;
		float: left;
		margin: 0 5px 0 0;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> li.default a {
		background: url(../Images/default_thumbnail.gif) 0 0 no-repeat;
		display: block;
		height: 33px;
		width: 50px;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> li.default a img {
		display: none;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		margin-top: 7px !important;
	}
	a.pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>, a.pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		cursor: pointer;
		display: none;
		height: 20px;
		position: absolute;
		right: 30px;
		text-indent: -10000px;
		top: 10px;
		width: 20px;
		z-index: 20000;
	}
	i.pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		float: right;
		line-height: 22px;
		margin-right: 0px;
		cursor: pointer;
	}
	i.pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover, .totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover, i.pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover, i.pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
		opacity: 0.8;
	}
	.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		position: relative;
	}
	* html .pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		padding: 0 20px;
	}
	.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: 0;
		position: absolute;
		width: 20px;
	}
	.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: 20px;
		position: absolute;
		right: 20px;
	}
	* html .pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		left: 0;
		position: static;
	}
	.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 20px;
		left: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
	}
	.pp_loaderIcon<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		height: 24px;
		left: 50%;
		margin: -12px 0 0 -12px;
		position: absolute;
		top: 50%;
		width: 24px;
	}
	#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		line-height: 1 !important;
	}
	#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> * {
		margin: 0 !important;
		width: 100%;
	}
	#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_inline<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		text-align: left;
	}
	#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_inline<?php echo esc_attr( $Total_Soft_vgallery ); ?> p {
		margin: 0 0 15px 0;
	}
	div.ppt<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		color: #fff;
		display: none;
		font-size: 17px;
		margin: 0 0 5px 15px;
		z-index: 9999;
	}
	.clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: inline-block;
	}
	* html .clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		height: 1%;
	}
	.clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
	}
	.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> a {
		background: none !important;
		border: none !important;
		display: none !important;
		height: 146px;
		padding: 2px !important;
		width: 235px;
	}
	div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		background-color:  var(--tsvg_popup_po_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border:  var(--tsvg_popup_po_bw_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_popup_st_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_popup_po_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: var(--tsvg_popup_po_br_<?php echo esc_attr( $Total_Soft_vgallery ); ?>); 
	}
	div.ppt<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: none !important;
	}
	.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?> div {
		background: none !important;
	}
	.pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?> div {
		background: none !important;
	}
	.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?> div {
		background: none !important;
	}
	.pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		font-size: var(--tsvg_popup_tip_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_popup_tip_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_popup_tip_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.totalsoft-gv-lvg-text<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		font-size: var(--tsvg_popup_no_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: var(--tsvg_popup_no_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		font-size:  var(--tsvg_popup_pio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color:  var(--tsvg_popup_pio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin-top: 1px;
		line-height: 25px;
	}
	.totalsoft-gv-lvg-nepr<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
	   font-size:  var(--tsvg_popup_ao_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color:  var(--tsvg_popup_ao_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  }
	  .totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		font-size:  var(--tsvg_popup_cio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color:  var(--tsvg_popup_cio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	  }
	  .totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> span{
		font-family: var(--tsvg_popup_cio_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
	  }
	.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-item-title-align='left'] .pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>{ text-align:left; }
	.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-item-title-align='center'] .pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>{ text-align:center; }
	.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-item-title-align='right'] .pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>{ text-align:right; }
	.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-item-title-show='true'] .pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>{ display: block!important; }
	.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-item-title-show='false'] .pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>{ display: none!important; }
    .pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
        max-width: 95%;
    }
  /* @media  only screen and (max-height:550px) {
        div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
            top:0% !important;
            height: 70vh;
            margin: 14vh auto;
            padding:10px;
            overflow-x: hidden;
            overflow-y:auto;
        }
        #pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> > iframe,video{
            height: 290px !important;
        }
    }
    @media  only screen and (max-height:390px){
        #pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
            height: 290px !important;
        }
    } */

    @media only screen and (max-height:500px){
        div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
            top:0 !important;
            height: 80vh;
            margin: 10vh auto;
            overflow-x: hidden;
            overflow-y:auto;
        }
    }
    @media only screen (max-width:500px){
        div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
        }
    }

    /* .ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}

	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
	} */
</style>
<script type="text/javascript">
(function ($) {
    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?> = {};
    $.fn.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?> = function (pp_settings) {
        pp_settings = jQuery.extend({
            animation_speed: 'fast',
            slideshow: false,
            icon_play: 'ts-vgallery ts-vgallery-play-circle-o',
            icon_paus: 'ts-vgallery ts-vgallery-pause-circle-o',
            icon_close: 'ts-vgallery ts-vgallery-times-circle-o',
            icon_next: 'ts-vgallery ts-vgallery-arrow-circle-left',
            icon_prev: 'ts-vgallery ts-vgallery-arrow-circle-right',
            icon_close_text: 'Close',
            autoplay_slideshow: false,
            opacity: 0.80,
            show_title: true,
            allow_resize: true,
            default_width: 530,
            default_height: 360,
            counter_separator_label: '/',
            theme: 'facebook',
            hideflash: false,
            wmode: 'opaque',
            autoplay: true,
            modal: false,
            overlay_gallery: true,
            keyboard_shortcuts: true,
            changepicturecallback: function () {
            },
            callback: function () {
            },
            markup: '<div class="pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                      <div class="pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                       <div class="pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                       <div class="pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                       <div class="pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                      </div> \
                      <div class="pp_content_container<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                       <div class="pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                       <div class="pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                        <div class="pp_content<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                         <div class="pp_loaderIcon<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                         <div class="pp_fade<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                          <a href="#" class="pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>" title="Expand the image">Expand</a> \
                          <div class="pp_hoverContainer<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                           <a class="pp_next" href="#">next</a> \
                           <a class="pp_previous" href="#">previous</a> \
                          </div> \
                          <div id="pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                          <div class="pp_details<?php echo esc_attr( $Total_Soft_vgallery ); ?> clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                           <p class="pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></p> \
                           <i class="totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?> '+ pp_settings.icon_close + '"><span>' + pp_settings.icon_close_text + '</span></i> \
                           <div class="pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                            <i href="#" class="pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $Total_Soft_vgallery ); ?> '+ pp_settings.icon_prev + '"></i> \
                            <p class="currentTextHolder totalsoft-gv-lvg-text<?php echo esc_attr( $Total_Soft_vgallery ); ?>">0/0</p> \
                            <i href="#" class="pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $Total_Soft_vgallery ); ?> '+ pp_settings.icon_next + '"></i> \
                           </div> \
                          </div> \
                         </div> \
                        </div> \
                       </div> \
                       </div> \
                      </div> \
                      <div class="pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                       <div class="pp_left<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                       <div class="pp_middle<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                       <div class="pp_right<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div> \
                      </div> \
                     </div> \
                     <div class="pp_overlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div>',
            gallery_markup: '<div class="pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>"> \
                        <a href="#" class="pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>">Previous</a> \
                        <ul> \
                         {gallery} \
                        </ul> \
                        <a href="#" class="pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>">Next</a> \
                       </div>',
            image_markup: '<img id="fullResImage" src="">',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
            inline_markup: '<div class="pp_inline<?php echo esc_attr( $Total_Soft_vgallery ); ?> clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?>">{content}</div>',
            custom_markup: '',
            mp4_markup: '<video width="{width}" height="{height}" controls controlslist="nodownload" {tsvg_autoplay_b}><source src="{path}" type="video/mp4"></video>'
        }, pp_settings);
        var matchedObjects = this, percentBased = false, correctSizes, pp_open, pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containeTotalSoftidth, windowHeight = $(window).height(), windowWidth = $(window).width(), pp_slideshow;
        doresize = true, scroll_pos = _get_scroll();

        $(window).unbind('resize').resize(function () {
            _center_overlay();
            _resize_overlay();
        });
        if (pp_settings.keyboard_shortcuts) {
            $(document).unbind('keydown').keydown(function (e) {
                if (typeof $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> != 'undefined') {
                    if ($pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.is(':visible')) {
                        switch (e.keyCode) {
                            case 37:
                                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('previous');
                                break;
                            case 39:
                                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('next');
                                break;
                            case 27:
                                if (!settings.modal) $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.close();
                                break;
                        }
                        ;
                        return false;
                    }
                    ;
                }
                ;
            });
        }
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.initialize = function () {
            settings = pp_settings;
            if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && parseInt($.browser.version) == 6) settings.theme = "light_square";
            _buildOverlay(this);
            if (settings.allow_resize) $(window).scroll(function () {
                _center_overlay();
            });
            _center_overlay();

            //set_position=jQuery.inArray($(this).attr('data-tsvg-href'), pp_images);
            set_position = jQuery(this).closest('li').index();
            $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.open();
            return false;
        }
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.open = function (event) {
            if (typeof settings == "undefined") {
                settings = pp_settings;
                if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 6) settings.theme = "light_square";
                _buildOverlay(event.target);
                pp_images = $.makeArray(arguments[0]);
                pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
                pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
                isSet = (pp_images.length > 1) ? true : false;
                set_position = 0;

            }
            if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequestmsie && $.browser.version == 6) $('select').css('visibility', 'hidden');
            if (settings.hideflash) $('object,embed').css('visibility', 'hidden');
            _checkPosition($(pp_images).length);
            $('.pp_loaderIcon<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show();
            if ($ppt.is(':hidden')) $ppt.css('opacity', 0).show();
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.currentTextHolder').text((set_position + 1) + settings.counter_separator_label + $(pp_images).length);
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_description<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show().html(unescape(pp_descriptions[set_position]));
            (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
            movie_width = (parseFloat(grab_param('width', pp_images[set_position]))) ? grab_param('width', pp_images[set_position]) : settings.default_width.toString();
            movie_height = (parseFloat(grab_param('height', pp_images[set_position]))) ? grab_param('height', pp_images[set_position]) : settings.default_height.toString();
            if (movie_width.indexOf('%') != -1 || movie_height.indexOf('%') != -1) {
                movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150);
                movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150);
                percentBased = true;
            }
            else {
                percentBased = false;
            }

            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.fadeIn(function () {
                var tsvg_autoplay = jQuery('.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-tsvg-autoplay');
                imgPreloader = "";
                var r = pp_images[set_position].replace('embed/', 'watch?v=');
                pp_images[set_position] = r;
                switch (_getFileType(pp_images[set_position])) {
                    case 'image':
                        imgPreloader = new Image();
                        nextImage = new Image();
                        if (isSet && set_position > $(pp_images).length) nextImage.src = pp_images[set_position + 1];
                        prevImage = new Image();
                        if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
                        $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>')[0].innerHTML = settings.image_markup;
                        $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('#fullResImage').attr('src', pp_images[set_position]);
                        imgPreloader.onload = function () {
                            correctSizes = _fitToViewport(imgPreloader.width, imgPreloader.height);
                            _showContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>();
                        };
                        imgPreloader.onerror = function () {
                            alert('Image cannot be loaded. Make sure the path is correct and image exist.');
                            $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.close();
                        };
                        imgPreloader.src = pp_images[set_position];
                        break;
                    case 'youtube':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        movie = 'https://www.youtube.com/embed/' + grab_param('v', pp_images[set_position]);
                        if (tsvg_autoplay == "true") {
                            movie += "?autoplay=1&mute=1";
                        }
                        toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                        break;
                    case 'vimeo':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        movie_id = pp_images[set_position];
                        var regExp = movie_id.split('vimeo.com/');
                        var match = regExp[1];
                        movie = 'https://player.vimeo.com/' + match + '?title=0&amp;byline=0&amp;portrait=0';
                        if (tsvg_autoplay == "true") movie += "&amp;autoplay=1&amp;loop=1&amp;autopause=0";
                        vimeo_width = correctSizes['width'] + '/embed/?moog_width=' + correctSizes['width'];
                        toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                        break;
                    case 'wistia':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        movie_id = pp_images[set_position];
                        var regExp = movie_id.match(/wistia\.com\/medias\/([a-zA-Z0-9\-_]+)/);
                        var match = regExp[1];
                        movie = '//fast.wistia.net/embed/iframe/' + match + '';
                        toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                        break;
                    case 'quicktime':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        correctSizes['height'] += 15;
                        correctSizes['contentHeight'] += 15;
                        correctSizes['containerHeight'] += 15;
                        toInject = settings.quicktime_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case 'flash':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        flash_vars = pp_images[set_position];
                        flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10, pp_images[set_position].length);
                        filename = pp_images[set_position];
                        filename = filename.substring(0, filename.indexOf('?'));
                        toInject = settings.flash_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + '?' + flash_vars);
                        break;
                    case 'iframe':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        frame_url = pp_images[set_position];
                        if (frame_url.indexOf("wistia") != -1) {
                            var arr = frame_url.split('/');
                            var frame_url = '//' + arr[2] + '/embed/iframe/' + arr[4];
                            toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, frame_url);
                        }
                        else {
                            frame_url = frame_url.substr(0, frame_url.indexOf('iframe') - 1);
                            toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, frame_url);
                        }
                        break;
                    case 'custom':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        toInject = settings.custom_markup;
                        break;
                    case 'inline':
                        myClone = $(pp_images[set_position]).clone().css({ 'width': settings.default_width }).wrapInner('<div id="pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>"><div class="pp_inline<?php echo esc_attr( $Total_Soft_vgallery ); ?> clearfix<?php echo esc_attr( $Total_Soft_vgallery ); ?>"></div></div>').appendTo($('body'));
                        correctSizes = _fitToViewport($(myClone).width(), $(myClone).height());
                        $(myClone).remove();
                        toInject = settings.inline_markup.replace(/{content}/g, $(pp_images[set_position]).html());
                        break;
                    case 'mp4':
                        correctSizes = _fitToViewport(movie_width, movie_height);
                        toInject = settings.mp4_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, pp_images[set_position]).replace(/{tsvg_autoplay_b}/g,tsvg_autoplay == "true" ? "autoplay" : "");
                        break;
                }
                ;
                if (!imgPreloader) {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>')[0].innerHTML = toInject;
                    _showContent<?php echo esc_attr( $Total_Soft_vgallery ); ?>();
                }
                ;
            });
            return false;
        };
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage = function (direction) {
            currentGalleryPage = 0;
            if (direction == 'previous') {
                set_position--;
                if (0 > set_position) {
                    set_position = 0;
                    return;
                }
                ;
            }
            else if (direction == 'next') {
                set_position++;
                if (set_position > $(pp_images).length - 1) {
                    set_position = 0;
                }
            }
            else {
                set_position = direction;
            }
            ;
            if (!doresize) doresize = true;
            $('.pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?>').removeClass('pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?>').addClass('pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
            _hideContent(function () {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.open();
            });
        };
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changeGalleryPage = function (direction) {
            if (direction == 'next') {
                currentGalleryPage++;
                if (currentGalleryPage > totalPage) {
                    currentGalleryPage = 0;
                }
                ;
            }
            else if (direction == 'previous') {
                currentGalleryPage--;
                if (0 > currentGalleryPage) {
                    currentGalleryPage = totalPage;
                }
                ;
            }
            else {
                currentGalleryPage = direction;
            }
            ; itemsToSlide = (currentGalleryPage == totalPage) ? pp_images.length - ((totalPage) * itemsPerPage) : itemsPerPage;
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').each(function (i) {
                $(this).animate({ 'left': (i * itemWidth) - ((itemsToSlide * itemWidth) * currentGalleryPage) });
            });
        };
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.startSlideshow = function () {
            if (typeof pp_slideshow == 'undefined') {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?>').unbind('click').removeClass('pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-play')).addClass('pp_pause<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-paus'),).click(function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                    return false;
                });
                pp_slideshow = setInterval($.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.startSlideshow, settings.slideshow);
            }
            else {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('next');
            }
            ;
        }
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow = function () {
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_pause<?php echo esc_attr( $Total_Soft_vgallery ); ?>').unbind('click').removeClass('pp_pause<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-paus'),).addClass('pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-play')).click(function () {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.startSlideshow();
                return false;
            });
            clearInterval(pp_slideshow);
            pp_slideshow = undefined;
        }
        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.close = function () {
            clearInterval(pp_slideshow);
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stop().find('object,embed').css('visibility', 'hidden');
            $('div.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>,div.ppt<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.pp_fade<?php echo esc_attr( $Total_Soft_vgallery ); ?>').fadeOut(settings.animation_speed, function () {
                $(this).remove();
            });
            $pp_overlay.fadeOut(settings.animation_speed, function () {
                if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 6) $('select').css('visibility', 'visible');
                if (settings.hideflash) $('object,embed').css('visibility', 'visible');
                $(this).remove();
                // $(window).unbind('scroll');
                settings.callback();
                doresize = true;
                pp_open = false;
                delete settings;
            });
        };
        _showContent<?php echo esc_attr( $Total_Soft_vgallery ); ?> = function () {
            $('.pp_loaderIcon<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide();
            $ppt.fadeTo(settings.animation_speed, 1);
            correctHeight = correctSizes['contentHeight'] + 40 ;
            correctWidth = correctSizes['contentWidth'] + 40 ;
            projectedTop = Math.floor( $(window).height() - correctHeight ) / 2;
            projectedLeft = Math.floor( $(window).width() - correctWidth ) / 2;
            
            if (0 > projectedTop) projectedTop = 0;
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').animate({ 'height': correctSizes['contentHeight'] }, settings.animation_speed);
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.animate({
                'top': projectedTop, 'left': projectedLeft, 'width': correctSizes['containeTotalSoftidth']
            },
                settings.animation_speed, function () {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_hoverContainer<?php echo esc_attr( $Total_Soft_vgallery ); ?>,#fullResImage').height(correctSizes['height']).width(correctSizes['width']);
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_fade<?php echo esc_attr( $Total_Soft_vgallery ); ?>').fadeIn(settings.animation_speed);
                    if (isSet && _getFileType(pp_images[set_position]) == "image") {
                        $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_hoverContainer<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show();
                    }
                    else {
                        $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_hoverContainer<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide();
                    }
                    if (correctSizes['resized']) $('a.pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>,a.pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?>').fadeIn(settings.animation_speed);
                    if (settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.startSlideshow();
                    settings.changepicturecallback();
                    pp_open = true;
                });
            _insert_gallery();
        };
        function _hideContent(callback) {
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> object,#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?> embed').css('visibility', 'hidden');
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_fade<?php echo esc_attr( $Total_Soft_vgallery ); ?>').fadeOut(settings.animation_speed, function () {
                $('.pp_loaderIcon<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show();
                callback();
            });
        };
        function _checkPosition(setCount) {
            if (set_position == setCount - 1) {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_next').css('visibility', 'hidden');
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_next').addClass('disabled').unbind('click');
            }
            else {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_next').css('visibility', 'visible');
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_next.disabled').removeClass('disabled').bind('click', function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('next');
                    return false;
                });
            }
            ;
            if (set_position == 0) {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_previous').css('visibility', 'hidden').addClass('disabled').unbind('click');
            }
            else {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('a.pp_previous.disabled').css('visibility', 'visible').removeClass('disabled').bind('click', function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('previous');
                    return false;
                });
            }
            ; (setCount > 1) ? $('.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show() : $('.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide();
        };
        function _fitToViewport(width, height) {
            resized = false;
            _getDimensions(width, height);
            imageWidth = width, imageHeight = height;
            if (((pp_containeTotalSoftidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
                resized = true, fitting = false;
                while (!fitting) {
                    if ((pp_containeTotalSoftidth > windowWidth)) {
                        imageWidth = (windowWidth - 50);
                        imageHeight = (height / width) * imageWidth;
                    }
                    else if ((pp_containerHeight > windowHeight)) {
                        imageHeight = (windowHeight - 150);
                        imageWidth = (width / height) * imageHeight;
                    }
                    else {
                        fitting = true;
                    }
                    ; pp_containerHeight = imageHeight, pp_containeTotalSoftidth = imageWidth;
                }
                ; _getDimensions(imageWidth, imageHeight);
            }
            ;
            return {
                width: Math.floor(imageWidth), height: Math.floor(imageHeight), containerHeight: Math.floor(pp_containerHeight) + 40 , containeTotalSoftidth: Math.floor(pp_containeTotalSoftidth) + 40, contentHeight: Math.floor(pp_contentHeight), contentWidth: Math.floor(pp_contentWidth), resized: resized
            };
        };
        function _getDimensions(width, height) {
            width = parseFloat(width);
            height = parseFloat(height);
            $pp_details = $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_details<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
            $pp_details.width();
            detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
            $pp_details = $pp_details.clone().appendTo($('body')).css({
                'position': 'absolute', 'top': -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (34 >= detailsHeight) ? 36 : detailsHeight;
            if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 7) detailsHeight += 8;
            $pp_details.remove();
            pp_contentHeight = height + detailsHeight;
            pp_contentWidth = width;
            pp_containerHeight = pp_contentHeight + $ppt.height() + $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_top<?php echo esc_attr( $Total_Soft_vgallery ); ?>').height() + $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_bottom<?php echo esc_attr( $Total_Soft_vgallery ); ?>').height();
            pp_containeTotalSoftidth = width;
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.attr('data-item-title-align', jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-title-align'))
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.attr('data-item-title-show', jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-title-show'))
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('class', 'totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $Total_Soft_vgallery ); ?> pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-play'));
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('class', 'totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close'));
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> span').text(jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close-text'));
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('class', 'pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev'));
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('class', 'pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next'));
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('class', 'totalsoft-gv-lvg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?> pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close'));
        }
        function _getFileType(itemSrc) {
            if (itemSrc.match(/youtube\.com\/watch/i)) {
                return 'youtube';
            }
            else if (itemSrc.match(/vimeo\.com/i)) {
                return 'vimeo';
            }
            else if (itemSrc.indexOf('.mov') != -1) {
                return 'quicktime';
            }
            else if (itemSrc.indexOf('.swf') != -1) {
                return 'flash';
            }
            else if (itemSrc.indexOf('.mp4') != -1) {
                return 'mp4';
            }
            else if (itemSrc.indexOf('iframe') != -1) {
                return 'iframe';
            }
            else if (itemSrc.indexOf('custom') != -1) {
                return 'custom';
            }
            else if (itemSrc.substr(0, 1) == '#') {
                return 'inline';
            }
            else if (itemSrc.match(/wistia\.com\/medias/i)) {
                return 'wistia';
            }
            else {
                return 'image';
            }
            ;
        };
        function _center_overlay() {
            if (doresize && typeof $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> != 'undefined') {
                titleHeight =  contentHeight = $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.height(), contentWidth = $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.width();
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.css({
                    'top': Math.floor($(window).height() - contentHeight) / 2, 
                    'left': Math.floor($(window).width() - contentWidth) / 2, 
                });
            }
        };
        function _get_scroll() {
            if (self.pageYOffset) {
                return { scrollTop: self.pageYOffset, scrollLeft: self.pageXOffset };
            }
            else if (document.documentElement && document.documentElement.scrollTop) {
                return { scrollTop: document.documentElement.scrollTop, scrollLeft: document.documentElement.scrollLeft };
            }
            else if (document.body) {
                return { scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft };
            }
        };
        function _resize_overlay() {
            windowHeight = $(window).height(), windowWidth = $(window).width();
            if (typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height());
        };
        function _insert_gallery() {
            if (isSet && settings.overlay_gallery && _getFileType(pp_images[set_position]) == "image") {
                itemWidth = 52 + 5;
                navWidth = (settings.theme == "facebook") ? 58 : 38;
                itemsPerPage = Math.floor((correctSizes['containeTotalSoftidth'] - 100 - navWidth) / itemWidth);
                itemsPerPage = (pp_images.length > itemsPerPage) ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                if (totalPage == 0) {
                    navWidth = 0;
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide();
                }
                else {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>').show();
                }
                ; galleryWidth = itemsPerPage * itemWidth + navWidth;
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>').width(galleryWidth).css('margin-left', -Math.floor((galleryWidth / 2)));
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul').width(itemsPerPage * itemWidth).find('li.selected').removeClass('selected');
                goToPage = totalPage >= (Math.floor(set_position / itemsPerPage)) ? Math.floor(set_position / itemsPerPage) : totalPage;
                if (itemsPerPage) {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide().show().removeClass('disabled');
                }
                else {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide().addClass('disabled');
                }
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changeGalleryPage(goToPage);
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul li:eq(' + set_position + ')').addClass('selected');
            }
            else {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').unbind('mouseenter mouseleave');
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hide();
            }
        }
        function _buildOverlay(caller) {
            // theRel=$(caller).attr('rel');
            // galleryRegExp=/\[(?:.*)\]/;
            // isSet=(galleryRegExp.exec(theRel)) ? true : false;
            theRel = $(caller).attr('data-tsvg-href');
            isSet = true;
            pp_images = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                return $(n).attr('data-tsvg-href');
                // if($(n).attr('data-tsvg-href').indexOf(theRel)!= -1) return $(n).attr('data-tsvg-href');
            }) : $.makeArray($(caller).attr('data-tsvg-href'));
            pp_titles = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                if ($(n).attr('data-tsvg-href').indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : "";
            }) : $.makeArray($(caller).find('img').attr('alt'));
            pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                return $(n).attr('data-tsvg-title');
                // if($(n).attr('data-tsvg-href').indexOf(theRel)!= -1) return ($(n).attr('data-tsvg-title')) ? $(n).attr('data-tsvg-title') : "";
            }) : $.makeArray($(caller).attr('data-tsvg-title'));

            $('body').append(settings.markup);
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> = $('.pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>'), $ppt = $('.ppt<?php echo esc_attr( $Total_Soft_vgallery ); ?>'), $pp_overlay = $('div.pp_overlay<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var i = 0;pp_images > i.length; i++) {
                    var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif)$");
                    var results = regex.exec(pp_images[i]);
                    if (!results) {
                        classname = 'default';
                    }
                    else {
                        classname = '';
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + pp_images[i] + "' width='50' alt='' /></a></li>";
                }
                ; toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('#pp_full_res<?php echo esc_attr( $Total_Soft_vgallery ); ?>').after(toInject);
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>').click(function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changeGalleryPage('next');
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                    return false;
                });
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>').click(function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changeGalleryPage('previous');
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                    return false;
                });
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').hover(function () {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>:not(.disabled)').fadeIn();
                }, function () {
                    $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?>:not(.disabled)').fadeOut();
                });
                itemWidth = 52 + 5;
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> ul li').each(function (i) {
                    $(this).css({ 'position': 'absolute', 'left': i * itemWidth });
                    $(this).find('a').unbind('click').click(function () {
                        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage(i);
                        $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                        return false;
                    });
                });
            }
            ;
            if (settings.slideshow) {
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?>').prepend('<i class="totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $Total_Soft_vgallery ); ?> pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-play') + '"></i>')
                $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_play<?php echo esc_attr( $Total_Soft_vgallery ); ?>').click(function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.startSlideshow();
                    return false;
                });
            }
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.attr('class', 'pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?> ' + settings.theme);
            $pp_overlay.css({
                'opacity': 0, 'height': $(document).height(), 'width': $(document).width()
            }).bind('click', function () {
                if (!settings.modal) $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.close();
            });
            $('i.pp_close<?php echo esc_attr( $Total_Soft_vgallery ); ?>').bind('click', function () {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.close();
                return false;
            });
            $('a.pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>').bind('click', function (e) {
                if ($(this).hasClass('pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>')) {
                    $(this).removeClass('pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>').addClass('pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
                    doresize = false;
                }
                else {
                    $(this).removeClass('pp_contract<?php echo esc_attr( $Total_Soft_vgallery ); ?>').addClass('pp_expand<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
                    doresize = true;
                }
                ; _hideContent(function () {
                    $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.open();
                });
                return false;
            });
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_previous, .pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_previous<?php echo esc_attr( $Total_Soft_vgallery ); ?>').bind('click', function () {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('previous');
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                return false;
            });
            $pp_pic_holder<?php echo esc_attr( $Total_Soft_vgallery ); ?>.find('.pp_next, .pp_nav<?php echo esc_attr( $Total_Soft_vgallery ); ?> .pp_arrow_next<?php echo esc_attr( $Total_Soft_vgallery ); ?>').bind('click', function () {
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.changePage('next');
                $.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.stopSlideshow();
                return false;
            });
            _center_overlay();
        };
        return this.unbind('click').click($.prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>.initialize).children('a').click(function () {

            let link = jQuery(this).attr('href'),
                target = jQuery(this).attr('target');
            if (target != '_self') {
                window.open(link);
            } else {
                window.location.assign(link)
            }
            return false;
        });
    };
    function grab_param(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return (results == null) ? "" : results[1];
    }
})(jQuery);

jQuery(document).ready(function () {
    var win = jQuery(window);
    checkWidth();
    function checkWidth() {
        var parent_element = jQuery('.TotalSoft_GV_SG_Item_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').parent().parent().parent();
        jQuery(parent_element).each(function (index, elem) {
            if (250 >= jQuery(elem).width()) {
                jQuery(parent_element).find('.TotalSoft_GV_SG_Grid_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({ 'column-count': '1' });
                jQuery(parent_element).css({ 'padding-left': '0', 'padding-right': '0' });
            }
        });
    }
    var array_images = [];
    var array_videos = [];
    jQuery('.TotalSoft_GV_SG_Item_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').each(function () {
        if (jQuery(this).find('img').attr("src") != "" && jQuery(this).find('img').attr("src") != undefined) {
            array_images.push(jQuery(this).find('img').attr("src"));
        }
        if (jQuery(this).find('iframe').attr("src") != "" && jQuery(this).find('iframe').attr("src") != undefined) {
            array_videos.push(jQuery(this).find('iframe').attr("src"));
        }
    })
    var imagesload = 'false';
    var videosload = 'false';
    var y_images = 0;
    var y_videos = 0;
    if (array_images.length != 0) {
        jQuery('.TotalSoft_GV_SG_Imagediv_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').each(function (i) {
            jQuery(this).find('img').attr('src', array_images[i]).on("load", function () {
                y_images++;
                if (y_images == array_images.length) {
                    imagesload = 'true';
                }
            })
        })
    }
    else {
        imagesload = 'true';
    }
    if (array_videos.length != 0) {
        jQuery('.TotalSoft_GV_SG_Videodiv_<?php echo esc_attr( $Total_Soft_vgallery ); ?> iframe').each(function (i) {
            jQuery(this).attr('src', array_videos[i]).on("load", function () {
                y_videos++;
                if (y_videos == array_videos.length) {
                    videosload = 'true';
                }
            })
        })
    }
    else {
        videosload = 'true';
    }
    var myTS_Interval = setInterval(function () {
        if (imagesload == 'true' && videosload == 'true') {
            jQuery('.TS_GV_SG_Loading_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('display', 'none');
            myTS_Clear_Interval();
        }
    }, 100)
    function myTS_Clear_Interval() {
        clearInterval(myTS_Interval);
    }
    var delaytime = 0;
    var TS_VG_SG_AE = jQuery('.TS_VG_SG_AE_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').val();

})

jQuery(document).on('ready', function () {
    var Tot_GL = jQuery('.Tot_GL<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
    jQuery('.TotalSoftGV_LVG_LM').click(function () {
    });
    var array_images = [];
    jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').each(function () {
        if (jQuery(this).find('img').attr("src") != "") {
            array_images.push(jQuery(this).find('img').attr("src"));
        }
    })
    var y_images = 0;
    jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').each(function (i) {
        jQuery(this).find('img').attr('src', array_images[i]).on("load", function () {
            y_images++;
            if (y_images == array_images.length) {
                jQuery('.TS_GV_LVG_Loading_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('display', 'none');
            }
        })
    })
    var ImWidth = jQuery('.ImWidth').val();
    function imH() {
        jQuery('.TotalSoft_GV_LVG_Li').css('width', Math.floor(ImWidth * jQuery('.ulContWidth').outerWidth() / 2000) + 'px');
        if (200 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css({ 'width': '100%', 'height': '110px' });
            jQuery('.totalsoft-gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('overflow', 'visible');
            jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').css('margin', '5px 0');
            jQuery('.fHeightZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css({ 'height': '110px' });
        }
        else if (450 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css({ 'width': '100%' });
            jQuery('.totalsoft-gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('overflow', 'visible');
            jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').css('margin', '5px 0');
        }
        else if (700 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css('width', Math.floor(ImWidth * jQuery('.ulContWidth').outerWidth() / 700) + 'px');
        }
        else if (1000 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css('width', Math.floor(ImWidth * jQuery('.ulContWidth').outerWidth() / 1000) + 'px');
        }
        else if (1500 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css('width', Math.floor(ImWidth * jQuery('.ulContWidth').outerWidth() / 1500) + 'px');
        }
        else if (1800 >= jQuery('.ulContWidth').outerWidth()) {
            jQuery('.TotalSoft_GV_LVG_Li').css('width', Math.floor(ImWidth * jQuery('.ulContWidth').outerWidth() / 1800) + 'px');
        }
    }
    imH();
    jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('display', 'inline-block');
    function checkWidth() {
        var height = jQuery('.totalsoft-gv-lvg-item2').height();
        jQuery('.image-zoom').css({ 'height': height });
        jQuery('.totalsoft-gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>').css('overflow', 'visible');
        jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> li').css('margin', '5px 0');
        var items = jQuery('.TotalSoft_GV_LVG_Li').find('.fHeightZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
        var TotalSoft_GV_LVG_Li = jQuery('.ulContWidth').find('.TotalSoft_GV_LVG_Li').not('.noshow1');
        var arr = [];
        var min_height;
        jQuery(TotalSoft_GV_LVG_Li).find('img').each(function (index, elem) {
            arr[index] = jQuery(elem).height();
            min_height = Math.min(arr[index]);
        });
        jQuery(items).each(function (index, elem) {
            jQuery(elem).css({
                'height': min_height + 'px', 'width': '<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01; ?>' + 'px'
            });
            jQuery('.LImg').css({ 'top': '0px' });
        });
        var parent_element = jQuery('.TotalSoft_GV_LVG_Li').parent().parent().parent().parent();
        var video_gallery_l_h = '<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01; ?>';
        jQuery(parent_element).each(function (index, elem) {
            jQuery(elem).css({ 'padding-left': '0', 'padding-right': '0' });
            var width = jQuery(elem).width();
            if (video_gallery_l_h >= jQuery(elem).width()) {
                jQuery(elem).find('.totalsoft-gv-lvg-item2').css({ 'width': width });
                var TotalSoft_GV_LVG_Li = jQuery(elem).find('.ulContWidth').find('.TotalSoft_GV_LVG_Li').not('.noshow1');
                var arr = [];
                var min_height;
                jQuery(TotalSoft_GV_LVG_Li).find('img').each(function (index, elem) {
                    arr[index] = jQuery(elem).height();
                    min_height = Math.min(arr[index]);
                });
                jQuery('.TotalSoft_GV_LVG_Li').find('.fHeightZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>').each(function (index, elem) {
                    jQuery(elem).css({ 'height': min_height + 'px' });
                    jQuery('.LImg').css({ 'top': '0px' });
                });
            }
        });
        jQuery('.TotalSoft_GV_LVG_Li').css({ 'width': <?php echo $tsvgallery_TS_VG_Styles-> TotalSoft_GV_1_01; ?> +'px'})
    }
    checkWidth();
    jQuery(window).on('resize', function () {
        setTimeout(() => {
            imH();
            checkWidth();
        }, 300);
    })
    var delaytime = 0;
    var TS_VG_LG_AE = jQuery('.TS_VG_LG_AE_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').val();
    jQuery('.totalsoft-gv-lvg-area<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TotalSoft_GV_LVG_Li').each(function () {
        if (!jQuery(this).hasClass('noshow1')) {
            delaytime++;
            if (TS_VG_LG_AE == '') {
                jQuery(this).css({ 'opacity': '1' });
            }
            else if (TS_VG_LG_AE == 'fadeIn') {
                jQuery(this).css({
                    'animation': 'fadeIn 0.65s ease ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'fadeIn 0.65s ease ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'fadeIn 0.65s ease ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'moveUp') {
                jQuery(this).css({
                    'animation': 'moveUp 0.65s ease ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'moveUp 0.65s ease ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'moveUp 0.65s ease ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'scaleUp') {
                jQuery(this).css({
                    'animation': 'scaleUp 0.65s ease-in-out ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'scaleUp 0.65s ease-in-out ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'scaleUp 0.65s ease-in-out ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'fallPerspective') {
                jQuery(this).css({
                    'animation': 'fallPerspective 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'fallPerspective 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'fallPerspective 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'fly') {
                jQuery(this).css({
                    'animation': 'fly 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'fly 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'fly 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'flip') {
                jQuery(this).css({
                    'animation': 'flip 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'flip 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'flip 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'helix') {
                jQuery(this).css({
                    'animation': 'helix 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'helix 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'helix 0.8s ease-in-out ' + 0.2 * delaytime + 's forwards'
                });
            }
            else if (TS_VG_LG_AE == 'popUp') {
                jQuery(this).css({
                    'animation': 'popUp 0.8s ease-in ' + 0.2 * delaytime + 's forwards', '-webkit-animation': 'popUp 0.8s ease-in ' + 0.2 * delaytime + 's forwards', '-moz-animation': 'popUp 0.8s ease-in ' + 0.2 * delaytime + 's forwards'
                });
            }
        }
    });
    jQuery(window).trigger('resize');
});
jQuery(document).ready(function ($) {
    $(document).on("mousedown", ".hovLink", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});
if(jQuery().prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>) {
	lightboxPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>(); 
}
function lightboxPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>() {
	jQuery(".TS_VGallery_lb_<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure").prettyPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>({
		animationSpeed:'fast',
		slideshow:5000,
		theme:'light_rounded',
		show_title:false,
  		icon_play:jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-play'),
  		icon_paus:jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-paus'),
  		icon_close:	jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close'),
  		icon_close_text:	jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-close-text'),
  		icon_next:	jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-next'),
  		icon_prev:	jQuery(".TS_VGallery_gv-lvg-content<?php echo esc_attr( $Total_Soft_vgallery ); ?>").attr('data-item-prev'),
		overlay_gallery: false
	});
}
function lightboxPhotoForAdmin() {
    lightboxPhoto<?php echo esc_attr( $Total_Soft_vgallery ); ?>()
}

</script>