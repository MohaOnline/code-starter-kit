<style type="text/css">
  	:root{
        --tsvg_popup_po_bc_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_09 ) ); ?>;
	  	--tsvg_popup_po_bw_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_10 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_po_bc_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_12 ) ); ?>;
	  	--tsvg_popup_po_br_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_13 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_st_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_11 ) ); ?>;
	  	--tsvg_popup_tip_fs_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_16 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_tip_ff_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_17 ) ); ?>;
        --tsvg_popup_tip_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_18 ) ); ?>;
	  	--tsvg_popup_no_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_35 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_no_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_36 ) ); ?>;
	  	--tsvg_popup_pio_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_22 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_pio_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_23 ) ); ?>;
	  	--tsvg_popup_cio_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_26 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_cio_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_27 ) ); ?>;
        --tsvg_popup_cio_ff_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_29 ) ); ?>;
        --tsvg_popup_c_t_a_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_28 ) ); ?>;
	  	--tsvg_popup_ao_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo filter_var( esc_html( $tsvg_style_options->TotalSoft_GV_1_33 ), FILTER_VALIDATE_INT ); ?>px;
        --tsvg_popup_ao_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>:<?php echo htmlspecialchars( esc_html( $tsvg_style_options->TotalSoft_GV_1_34 ) ); ?>;
	}
	div.tsvg_pp_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		background: #000;
		display: none;
		left: 0;
		position: absolute;
		top: 0;
		width: 100% !important;
		z-index: 999999;
	}
	div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: none;
		position: absolute;
		width: 100px;
		z-index: 9999999;
	}
	div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		position: fixed;
		/*top: 10% !important;*/
	}
	.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		position: relative;
	}
	* html .tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		padding: 0 20px;
	}
	.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: 0;
		position: absolute;
		width: 20px;
	}
	.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: 20px;
		position: absolute;
		right: 20px;
	}
	* html .tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		left: 0;
		position: static;
	}
	.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
	}
	.tsvg_pp_content<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 40px;
	}
	.tsvg_pp_fade<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: none;
	}
	.tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		position: relative;
		text-align: left;
		width: 100%;
	}
	.tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		padding-left: 20px;
	}
	.tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		padding-right: 20px;
	}
	.tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_details<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		margin: 10px auto 2px auto;
	}
	.tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: none;
		margin: 0 0 5px 0;
	}
	.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		clear: left;
		float: left;
		margin: 3px 0 0 0;
	}
	.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> p {
		float: left;
		margin: 0px 10px;
		margin-top: 1px;
		line-height: 25px;
	}
	.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> .pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?>, .tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> .pp_pause<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		float: left;
		margin-right: 10px;
		cursor: pointer;
	}
	i.tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>, i.tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: block;
		float: left;
		margin-top: 1px;
		overflow: hidden;
		line-height: 25px;
		cursor: pointer;
	}
	.tsvg_pp_hover_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2000;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		left: 50%;
		margin-top: -50px;
		position: absolute;
		z-index: 10000;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul {
		float: left;
		height: 35px;
		margin: 0 0 0 5px;
		overflow: hidden;
		padding: 0;
		position: relative;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul a {
		border: 1px rgba(0, 0, 0, 0.5) solid;
		display: block;
		float: left;
		height: 33px;
		overflow: hidden;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul a:hover, .tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> li.selected a {
		border-color: #fff;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul a img {
		border: 0;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> li {
		display: block;
		float: left;
		margin: 0 5px 0 0;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> li.default a {
		background: url(../Images/default_thumbnail.gif) 0 0 no-repeat;
		display: block;
		height: 33px;
		width: 50px;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> li.default a img {
		display: none;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>, .tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		margin-top: 7px !important;
	}
	a.tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>, a.pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
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
	i.pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: block;
		float: right;
		line-height: 22px;
		margin-right: 0px;
		cursor: pointer;
	}
	i.pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?>:hover, .totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $tsvg_shortcode_id ); ?>:hover, i.tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>:hover, i.tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>:hover {
		opacity: 0.8;
	}
	.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		position: relative;
	}
	* html .tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		padding: 0 20px;
	}
	.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: 0;
		position: absolute;
		width: 20px;
	}
	.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: 20px;
		position: absolute;
		right: 20px;
	}
	* html .tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		left: 0;
		position: static;
	}
	.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 20px;
		left: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
	}
	.tsvg_pp_loader_icon<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: block;
		height: 24px;
		left: 50%;
		margin: -12px 0 0 -12px;
		position: absolute;
		top: 50%;
		width: 24px;
	}
	#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		line-height: 1 !important;
	}
	#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> * {
		margin: 0 !important;
		width: 100%;
	}
	#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> .pp_inline<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		text-align: left;
	}
	#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> .pp_inline<?php echo esc_attr( $tsvg_shortcode_id ); ?> p {
		margin: 0 0 15px 0;
	}
	div.ppt<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		color: #fff;
		display: none;
		font-size: 17px;
		margin: 0 0 5px 15px;
		z-index: 9999;
	}
	.tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?>:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: inline-block;
	}
	* html .tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		height: 1%;
	}
	.tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: block;
	}
	.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> a {
		background: none !important;
		border: none !important;
		display: none !important;
		height: 146px;
		padding: 2px !important;
		width: 235px;
	}
	div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>{
		background-color:  var(--tsvg_popup_po_bc_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		border:  var(--tsvg_popup_po_bw_<?php echo esc_attr( $tsvg_shortcode_id ); ?>) var(--tsvg_popup_st_<?php echo esc_attr( $tsvg_shortcode_id ); ?>)  var(--tsvg_popup_po_bc_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		border-radius: var(--tsvg_popup_po_br_<?php echo esc_attr( $tsvg_shortcode_id ); ?>); 
	}
	div.ppt<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		display: none !important;
	}
	.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?> div {
		background: none !important;
	}
	.tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?> div {
		background: none !important;
	}
	.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?> div {
		background: none !important;
	}
	.tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		font-size: var(--tsvg_popup_tip_fs_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		font-family: var(--tsvg_popup_tip_ff_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		color: var(--tsvg_popup_tip_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
	}
	.totalsoft-gv-lvg-text<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		font-size: var(--tsvg_popup_no_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		color: var(--tsvg_popup_no_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
	}
	.totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		font-size:  var(--tsvg_popup_pio_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		color:  var(--tsvg_popup_pio_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		margin-top: 1px;
		line-height: 25px;
	}
	.totalsoft-gv-lvg-nepr<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
	   font-size:  var(--tsvg_popup_ao_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		color:  var(--tsvg_popup_ao_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
	  }
	  .totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> {
		font-size:  var(--tsvg_popup_cio_s_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
		color:  var(--tsvg_popup_cio_c_<?php echo esc_attr( $tsvg_shortcode_id ); ?>);
	  }
	  .totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> span{
		font-family: var(--tsvg_popup_cio_ff_<?php echo esc_attr( $tsvg_shortcode_id ); ?>) !important;
	  }
	.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>[data-item-title-align='left'] .tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>{ text-align:left; }
	.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>[data-item-title-align='center'] .tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>{ text-align:center; }
	.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>[data-item-title-align='right'] .tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>{ text-align:right; }
	.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>[data-item-title-show='true'] .tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>{ display: block!important; }
	.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>[data-item-title-show='false'] .tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>{ display: none!important; }
    .tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>{
        max-width: 95%;
    }
    /* @media  only screen and (max-height:550px) {
        div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>{
            top:0% !important;
            height: 70vh;
            margin: 14vh auto;
            padding:10px;
            overflow-x: hidden;
            overflow-y:auto;
        }
        #tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> > iframe,video{
            height: 290px !important;
        }
    }
    @media  only screen and (max-height:390px){
        #tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>{
            height: 290px !important;
        }
    } */
    @media only screen and (max-height:500px){
        div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>{
            top:0 !important;
            height: 80vh;
            margin: 10vh auto;
            overflow-x: hidden;
            overflow-y:auto;
        }
    }
    .tsvg-main-content-<?php echo esc_attr( $tsvg_shortcode_id ); ?>[max-width~="500px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $tsvg_shortcode_id ); ?>: 2;
	}
	.tsvg-main-content-<?php echo esc_attr( $tsvg_shortcode_id ); ?>[max-width~="400px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $tsvg_shortcode_id ); ?>: 1;
	}
</style>
<script type="text/javascript">
    (function ($) {
        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?> = {};
        $.fn.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?> = function (tsvg_pp_settings) {
            tsvg_pp_settings = jQuery.extend({
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
                markup: '<div class="tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                        <div class="tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                        <div class="tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        <div class="tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        <div class="tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        </div> \
                        <div class="tsvg_pp_content_container<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                        <div class="tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                        <div class="tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <div class="tsvg_pp_content<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <div class="tsvg_pp_loader_icon<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                            <div class="tsvg_pp_fade<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <a href="#" class="tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>" title="Expand the image">Expand</a> \
                            <div class="tsvg_pp_hover_container<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <a class="tsvg_pp_next" href="#">next</a> \
                            <a class="tsvg_pp_previous" href="#">previous</a> \
                            </div> \
                            <div id="tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                            <div class="tsvg_pp_details<?php echo esc_attr( $tsvg_shortcode_id ); ?> tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <p class="tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></p> \
                            <i class="totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?> '+ tsvg_pp_settings.icon_close + '"><span>' + tsvg_pp_settings.icon_close_text + '</span></i> \
                            <div class="tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                                <i href="#" class="tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $tsvg_shortcode_id ); ?> '+ tsvg_pp_settings.icon_prev + '"></i> \
                                <p class="tsvg_current_text_holder totalsoft-gv-lvg-text<?php echo esc_attr( $tsvg_shortcode_id ); ?>">0/0</p> \
                                <i href="#" class="tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $tsvg_shortcode_id ); ?> '+ tsvg_pp_settings.icon_next + '"></i> \
                            </div> \
                            </div> \
                            </div> \
                            </div> \
                        </div> \
                        </div> \
                        </div> \
                        <div class="tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                        <div class="tsvg_pp_left<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        <div class="tsvg_pp_middle<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        <div class="tsvg_pp_right<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div> \
                        </div> \
                        </div> \
                        <div class="tsvg_pp_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div>',
                gallery_markup: '<div class="tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>"> \
                            <a href="#" class="tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>">Previous</a> \
                            <ul> \
                            {gallery} \
                            </ul> \
                            <a href="#" class="tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>">Next</a> \
                        </div>',
                image_markup: '<img id="tsvg_full_res_image" src="">',
                flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
                quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
                iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
                inline_markup: '<div class="pp_inline<?php echo esc_attr( $tsvg_shortcode_id ); ?> tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?>">{content}</div>',
                custom_markup: '',
                mp4_markup: '<video width="{width}" height="{height}" controls controlslist="nodownload" {tsvg_autoplay_b}><source src="{path}" type="video/mp4"></video>'
            }, tsvg_pp_settings);
            var matchedObjects = this, percentBased = false, correctSizes, pp_open, tsvg_pp_content_height, tsvg_pp_content_width, tsvg_pp_container_height, tsvg_pp_container_ts_width, windowHeight = $(window).height(), windowWidth = $(window).width(), pp_slideshow;
            doresize = true, scroll_pos = _get_scroll<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
            $(window).unbind('resize').resize(function () {
                tsvg_center_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
                tsvg_resize_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
            });
            if (tsvg_pp_settings.keyboard_shortcuts) {
                $(document).unbind('keydown').keydown(function (e) {
                    if (typeof $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> != 'undefined') {
                        if ($tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.is(':visible')) {
                            switch (e.keyCode) {
                                case 37:
                                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('previous');
                                    break;
                                case 39:
                                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('next');
                                    break;
                                case 27:
                                    if (!settings.modal) $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.close();
                                    break;
                            }
                            return false;
                        }
                    }
                });
            }
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.initialize = function () {
                settings = tsvg_pp_settings;
                if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && parseInt($.browser.version) == 6) settings.theme = "light_square";
                _buildOverlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>(this);
                if (settings.allow_resize) $(window).scroll(function () {
                    tsvg_center_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
                });
                tsvg_center_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
                set_position = jQuery(this).closest('li').index();
                $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.open();
                return false;
            }
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.open = function (event) {
                if (typeof settings == "undefined") {
                    settings = tsvg_pp_settings;
                    if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 6) settings.theme = "light_square";
                    _buildOverlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>(event.target);
                    pp_images = $.makeArray(arguments[0]);
                    pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
                    pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
                    isSet = (pp_images.length > 1) ? true : false;
                    set_position = 0;
                }
                if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequestmsie && $.browser.version == 6) $('select').css('visibility', 'hidden');
                if (settings.hideflash) $('object,embed').css('visibility', 'hidden');
                _checkPosition<?php echo esc_attr( $tsvg_shortcode_id ); ?>($(pp_images).length);
                $('.tsvg_pp_loader_icon<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show();
                if ($ppt.is(':hidden')) $ppt.css('opacity', 0).show();
                $tsvg_pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_current_text_holder').text((set_position + 1) + settings.counter_separator_label + $(pp_images).length);
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_description<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show().html(unescape(pp_descriptions[set_position]));
                (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
                movie_width = (parseFloat(grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>('width', pp_images[set_position]))) ? grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>('width', pp_images[set_position]) : settings.default_width.toString();
                movie_height = (parseFloat(grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>('height', pp_images[set_position]))) ? grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>('height', pp_images[set_position]) : settings.default_height.toString();
                if (movie_width.indexOf('%') != -1 || movie_height.indexOf('%') != -1) {
                    movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150);
                    movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150);
                    percentBased = true;
                } else {
                    percentBased = false;
                }
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.fadeIn(function () {
                    var tsvg_autoplay = jQuery('.tsvg-main-content-<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('data-tsvg-autoplay');
                    imgPreloader = "";
                    if (pp_images[set_position].indexOf('youtube.com/shorts/') > -1 ) {
                        pp_images[set_position] = pp_images[set_position].replace("shorts", "embed")
                    }
                    pp_images[set_position] = pp_images[set_position].replace('embed/', 'watch?v=');
                    switch (_getFileType<?php echo esc_attr( $tsvg_shortcode_id ); ?>(pp_images[set_position])) {    
                        case 'image':
                            imgPreloader = new Image();
                            nextImage = new Image();
                            if (isSet && set_position > $(pp_images).length) nextImage.src = pp_images[set_position + 1];
                            prevImage = new Image();
                            if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
                            $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>')[0].innerHTML = settings.image_markup;
                            $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('#tsvg_full_res_image').attr('src', pp_images[set_position]);
                            imgPreloader.onload = function () {
                                correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(imgPreloader.width, imgPreloader.height);
                                _showContent<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
                            };
                            imgPreloader.onerror = function () {
                                alert('Image cannot be loaded. Make sure the path is correct and image exist.');
                                $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.close();
                            };
                            imgPreloader.src = pp_images[set_position];
                            break;
                        case 'youtube':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            movie = 'https://www.youtube.com/embed/' + grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>('v', pp_images[set_position]);
                            if (tsvg_autoplay == "true") {
                                movie += "?autoplay=1&mute=1";
                            }
                            toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                            break;
                        case 'vimeo':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            movie_id = pp_images[set_position];
                            var regExp = movie_id.split('vimeo.com/');
                            var match = regExp[1];
                            movie = 'https://player.vimeo.com/' + match + '?title=0&amp;byline=0&amp;portrait=0';
                            if (tsvg_autoplay == "true") movie += "&amp;autoplay=1&amp;loop=1&amp;autopause=0";
                            vimeo_width = correctSizes['width'] + '/embed/?moog_width=' + correctSizes['width'];
                            toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                            break;
                        case 'wistia':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            movie_id = pp_images[set_position];
                            var regExp = movie_id.match(/wistia\.com\/medias\/([a-zA-Z0-9\-_]+)/);
                            var match = regExp[1];
                            movie = '//fast.wistia.net/embed/iframe/' + match + '';
                            toInject = settings.iframe_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, movie);
                            break;
                        case 'quicktime':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            correctSizes['height'] += 15;
                            correctSizes['contentHeight'] += 15;
                            correctSizes['containerHeight'] += 15;
                            toInject = settings.quicktime_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                            break;
                        case 'flash':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            flash_vars = pp_images[set_position];
                            flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10, pp_images[set_position].length);
                            filename = pp_images[set_position];
                            filename = filename.substring(0, filename.indexOf('?'));
                            toInject = settings.flash_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + '?' + flash_vars);
                            break;
                        case 'iframe':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
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
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            toInject = settings.custom_markup;
                            break;
                        case 'inline':
                            myClone = $(pp_images[set_position]).clone().css({ 'width': settings.default_width }).wrapInner('<div id="tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>"><div class="pp_inline<?php echo esc_attr( $tsvg_shortcode_id ); ?> tsvg_clearfix<?php echo esc_attr( $tsvg_shortcode_id ); ?>"></div></div>').appendTo($('body'));
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>($(myClone).width(), $(myClone).height());
                            $(myClone).remove();
                            toInject = settings.inline_markup.replace(/{content}/g, $(pp_images[set_position]).html());
                            break;
                        case 'mp4':
                            correctSizes = _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(movie_width, movie_height);
                            toInject = settings.mp4_markup.replace(/{width}/g, correctSizes['width']).replace(/{height}/g, correctSizes['height']).replace(/{path}/g, pp_images[set_position]).replace(/{tsvg_autoplay_b}/g,tsvg_autoplay == "true" ? "autoplay" : "");
                            break;
                    }
                    if (!imgPreloader) {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>')[0].innerHTML = toInject;
                        _showContent<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
                    }
                });
                return false;
            };
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage = function (direction) {
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
                $('.pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?>').removeClass('pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?>').addClass('tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>');
                _hideContent<?php echo esc_attr( $tsvg_shortcode_id ); ?>(function () {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.open();
                });
            };
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changeGalleryPage = function (direction) {
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
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> li').each(function (i) {
                    $(this).animate({ 'left': (i * itemWidth) - ((itemsToSlide * itemWidth) * currentGalleryPage) });
                });
            };
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.startSlideshow = function () {
                if (typeof pp_slideshow == 'undefined') {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?>').unbind('click').removeClass('pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-play')).addClass('pp_pause<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-paus'),).click(function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                        return false;
                    });
                    pp_slideshow = setInterval($.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.startSlideshow, settings.slideshow);
                }
                else {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('next');
                }
                ;
            }
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow = function () {
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.pp_pause<?php echo esc_attr( $tsvg_shortcode_id ); ?>').unbind('click').removeClass('pp_pause<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-paus'),).addClass('pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-play')).click(function () {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.startSlideshow();
                    return false;
                });
                clearInterval(pp_slideshow);
                pp_slideshow = undefined;
            }
            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.close = function () {
                clearInterval(pp_slideshow);
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stop().find('object,embed').css('visibility', 'hidden');
                $('div.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>,div.ppt<?php echo esc_attr( $tsvg_shortcode_id ); ?>,.tsvg_pp_fade<?php echo esc_attr( $tsvg_shortcode_id ); ?>').fadeOut(settings.animation_speed, function () {
                    $(this).remove();
                });
                $tsvg_pp_overlay.fadeOut(settings.animation_speed, function () {
                    if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 6) $('select').css('visibility', 'visible');
                    if (settings.hideflash) $('object,embed').css('visibility', 'visible');
                    $(this).remove();
                    settings.callback();
                    doresize = true;
                    pp_open = false;
                    delete settings;
                });
            };
            _showContent<?php echo esc_attr( $tsvg_shortcode_id ); ?> = function () {
                $('.tsvg_pp_loader_icon<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide();
                $ppt.fadeTo(settings.animation_speed, 1);
                correctHeight = correctSizes['contentHeight'] + 40 ;
                correctWidth = correctSizes['contentWidth'] + 40 ;
                projectedTop = Math.floor( $(window).height() - correctHeight ) / 2;
                projectedLeft = Math.floor( $(window).width() - correctWidth ) / 2;
                if (0 > projectedTop) projectedTop = 0;
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_content<?php echo esc_attr( $tsvg_shortcode_id ); ?>').animate({ 'height': correctSizes['contentHeight'] }, settings.animation_speed);
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.animate({
                    'top': projectedTop, 'left': projectedLeft, 'width': correctSizes['containeTotalSoftidth']
                },
                settings.animation_speed, function () {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_hover_container<?php echo esc_attr( $tsvg_shortcode_id ); ?>,#tsvg_full_res_image').height(correctSizes['height']).width(correctSizes['width']);
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_fade<?php echo esc_attr( $tsvg_shortcode_id ); ?>').fadeIn(settings.animation_speed);
                    if (isSet && _getFileType<?php echo esc_attr( $tsvg_shortcode_id ); ?>(pp_images[set_position]) == "image") {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_hover_container<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show();
                    }
                    else {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_hover_container<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide();
                    }
                    if (correctSizes['resized']) $('a.tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>,a.pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?>').fadeIn(settings.animation_speed);
                    if (settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.startSlideshow();
                    settings.changepicturecallback();
                    pp_open = true;
                });
                _insert_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
            };
            function _hideContent<?php echo esc_attr( $tsvg_shortcode_id ); ?>(callback) {
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> object,#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?> embed').css('visibility', 'hidden');
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_fade<?php echo esc_attr( $tsvg_shortcode_id ); ?>').fadeOut(settings.animation_speed, function () {
                    $('.tsvg_pp_loader_icon<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show();
                    callback();
                });
            };
            function _checkPosition<?php echo esc_attr( $tsvg_shortcode_id ); ?>(setCount) {
                if (set_position == setCount - 1) {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_next').css('visibility', 'hidden');
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_next').addClass('disabled').unbind('click');
                }
                else {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_next').css('visibility', 'visible');
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_next.disabled').removeClass('disabled').bind('click', function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('next');
                        return false;
                    });
                }
                ;
                if (set_position == 0) {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_previous').css('visibility', 'hidden').addClass('disabled').unbind('click');
                }
                else {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('a.tsvg_pp_previous.disabled').css('visibility', 'visible').removeClass('disabled').bind('click', function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('previous');
                        return false;
                    });
                }
                ; (setCount > 1) ? $('.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show() : $('.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide();
            };
            function _fitToViewport<?php echo esc_attr( $tsvg_shortcode_id ); ?>(width, height) {
                resized = false;
                _getDimensions<?php echo esc_attr( $tsvg_shortcode_id ); ?>(width, height);
                imageWidth = width, imageHeight = height;
                if (((tsvg_pp_container_ts_width > windowWidth) || (tsvg_pp_container_height > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
                    resized = true, fitting = false;
                    while (!fitting) {
                        if ((tsvg_pp_container_ts_width > windowWidth)) {
                            imageWidth = (windowWidth - 50);
                            imageHeight = (height / width) * imageWidth;
                        }
                        else if ((tsvg_pp_container_height > windowHeight)) {
                            imageHeight = (windowHeight - 150);
                            imageWidth = (width / height) * imageHeight;
                        }
                        else {
                            fitting = true;
                        }
                        ; tsvg_pp_container_height = imageHeight, tsvg_pp_container_ts_width = imageWidth;
                    }
                    ; _getDimensions<?php echo esc_attr( $tsvg_shortcode_id ); ?>(imageWidth, imageHeight);
                }
                ;
                return {
                    width: Math.floor(imageWidth), height: Math.floor(imageHeight), containerHeight: Math.floor(tsvg_pp_container_height) + 40 , containeTotalSoftidth: Math.floor(tsvg_pp_container_ts_width) + 40, contentHeight: Math.floor(tsvg_pp_content_height), contentWidth: Math.floor(tsvg_pp_content_width), resized: resized
                };
            };
            function _getDimensions<?php echo esc_attr( $tsvg_shortcode_id ); ?>(width, height) {
                width = parseFloat(width);
                height = parseFloat(height);
                $tsvg_pp_details = $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_details<?php echo esc_attr( $tsvg_shortcode_id ); ?>');
                $tsvg_pp_details.width();
                detailsHeight = parseFloat($tsvg_pp_details.css('marginTop')) + parseFloat($tsvg_pp_details.css('marginBottom'));
                $tsvg_pp_details = $tsvg_pp_details.clone().appendTo($('body')).css({
                    'position': 'absolute', 'top': -10000
                });
                detailsHeight += $tsvg_pp_details.height();
                detailsHeight = (34 >= detailsHeight) ? 36 : detailsHeight;
                if (navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest && $.browser.version == 7) detailsHeight += 8;
                $tsvg_pp_details.remove();
                tsvg_pp_content_height = height + detailsHeight;
                tsvg_pp_content_width = width;
                tsvg_pp_container_height = tsvg_pp_content_height + $ppt.height() + $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_top<?php echo esc_attr( $tsvg_shortcode_id ); ?>').height() + $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_bottom<?php echo esc_attr( $tsvg_shortcode_id ); ?>').height();
                tsvg_pp_container_ts_width = width;
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.attr('data-item-title-align', jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-title-align'))
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.attr('data-item-title-show', jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-title-show'))
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('class', 'totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $tsvg_shortcode_id ); ?> pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-play'));
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('class', 'totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-close'));
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> span').text(jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-close-text'));
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('class', 'tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-prev'));
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('class', 'tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?> totalsoft-gv-lvg-nepr<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-next'));
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?>').attr('class', 'totalsoft-gv-lvg-close<?php echo esc_attr( $tsvg_shortcode_id ); ?> pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-close'));
            }
            function _getFileType<?php echo esc_attr( $tsvg_shortcode_id ); ?>(itemSrc) {
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
            function tsvg_center_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>() {
                if (doresize && typeof $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> != 'undefined') {
                    titleHeight =  contentHeight = $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.height(), contentWidth = $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.width();
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.css({
                        'top': Math.floor($(window).height() - contentHeight) / 2, 
                        'left': Math.floor($(window).width() - contentWidth) / 2, 
                    });
                }
            };
            function _get_scroll<?php echo esc_attr( $tsvg_shortcode_id ); ?>() {
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
            function tsvg_resize_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>() {
                windowHeight = $(window).height(), windowWidth = $(window).width();
                if (typeof $tsvg_pp_overlay != "undefined") $tsvg_pp_overlay.height($(document).height());
            };
            function _insert_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>() {
                if (isSet && settings.overlay_gallery && _getFileType<?php echo esc_attr( $tsvg_shortcode_id ); ?>(pp_images[set_position]) == "image") {
                    itemWidth = 52 + 5;
                    navWidth = (settings.theme == "facebook") ? 58 : 38;
                    itemsPerPage = Math.floor((correctSizes['containeTotalSoftidth'] - 100 - navWidth) / itemWidth);
                    itemsPerPage = (pp_images.length > itemsPerPage) ? itemsPerPage : pp_images.length;
                    totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                    if (totalPage == 0) {
                        navWidth = 0;
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>,.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide();
                    }
                    else {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>,.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>').show();
                    }
                    ; galleryWidth = itemsPerPage * itemWidth + navWidth;
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>').width(galleryWidth).css('margin-left', -Math.floor((galleryWidth / 2)));
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul').width(itemsPerPage * itemWidth).find('li.selected').removeClass('selected');
                    goToPage = totalPage >= (Math.floor(set_position / itemsPerPage)) ? Math.floor(set_position / itemsPerPage) : totalPage;
                    if (itemsPerPage) {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide().show().removeClass('disabled');
                    }
                    else {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide().addClass('disabled');
                    }
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changeGalleryPage(goToPage);
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul li:eq(' + set_position + ')').addClass('selected');
                }
                else {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_content<?php echo esc_attr( $tsvg_shortcode_id ); ?>').unbind('mouseenter mouseleave');
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hide();
                }
            }
            function _buildOverlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>(caller) {
                theRel = $(caller).attr('data-tsvg-href');
                isSet = true;
                pp_images = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                    return $(n).attr('data-tsvg-href');
                }) : $.makeArray($(caller).attr('data-tsvg-href'));
                pp_titles = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                    if ($(n).attr('data-tsvg-href').indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : "";
                }) : $.makeArray($(caller).find('img').attr('alt'));
                pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                    return $(n).attr('data-tsvg-title');
                }) : $.makeArray($(caller).attr('data-tsvg-title'));
                $('body').append(settings.markup);
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> = $('.tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>'), $ppt = $('.ppt<?php echo esc_attr( $tsvg_shortcode_id ); ?>'), $tsvg_pp_overlay = $('div.tsvg_pp_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>');
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
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('#tsvg_pp_full_res<?php echo esc_attr( $tsvg_shortcode_id ); ?>').after(toInject);
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>').click(function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changeGalleryPage('next');
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                        return false;
                    });
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>').click(function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changeGalleryPage('previous');
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                        return false;
                    });
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_content<?php echo esc_attr( $tsvg_shortcode_id ); ?>').hover(function () {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>:not(.disabled)').fadeIn();
                    }, function () {
                        $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?>:not(.disabled)').fadeOut();
                    });
                    itemWidth = 52 + 5;
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_gallery<?php echo esc_attr( $tsvg_shortcode_id ); ?> ul li').each(function (i) {
                        $(this).css({ 'position': 'absolute', 'left': i * itemWidth });
                        $(this).find('a').unbind('click').click(function () {
                            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage(i);
                            $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                            return false;
                        });
                    });
                }
                ;
                if (settings.slideshow) {
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?>').prepend('<i class="totalsoft-gv-lvg-pl-pa<?php echo esc_attr( $tsvg_shortcode_id ); ?> pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-play') + '"></i>')
                    $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> .pp_play<?php echo esc_attr( $tsvg_shortcode_id ); ?>').click(function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.startSlideshow();
                        return false;
                    });
                }
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.attr('class', 'tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?> ' + settings.theme);
                $tsvg_pp_overlay.css({
                    'opacity': 0, 'height': $(document).height(), 'width': $(document).width()
                }).bind('click', function () {
                    if (!settings.modal) $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.close();
                });
                $('i.pp_close<?php echo esc_attr( $tsvg_shortcode_id ); ?>').bind('click', function () {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.close();
                    return false;
                });
                $('a.tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>').bind('click', function (e) {
                    if ($(this).hasClass('tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>')) {
                        $(this).removeClass('tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>').addClass('pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?>');
                        doresize = false;
                    }
                    else {
                        $(this).removeClass('pp_contract<?php echo esc_attr( $tsvg_shortcode_id ); ?>').addClass('tsvg_pp_expand<?php echo esc_attr( $tsvg_shortcode_id ); ?>');
                        doresize = true;
                    }
                    _hideContent<?php echo esc_attr( $tsvg_shortcode_id ); ?>(function () {
                        $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.open();
                    });
                    return false;
                });
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_previous, .tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_previous<?php echo esc_attr( $tsvg_shortcode_id ); ?>').bind('click', function () {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('previous');
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                    return false;
                });
                $tsvg_pp_pic_holder<?php echo esc_attr( $tsvg_shortcode_id ); ?>.find('.tsvg_pp_next, .tsvg_pp_nav<?php echo esc_attr( $tsvg_shortcode_id ); ?> .tsvg_pp_arrow_next<?php echo esc_attr( $tsvg_shortcode_id ); ?>').bind('click', function () {
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.changePage('next');
                    $.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.stopSlideshow();
                    return false;
                });
                tsvg_center_overlay<?php echo esc_attr( $tsvg_shortcode_id ); ?>();
            };
            return this.unbind('click').click($.prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>.initialize).children('a').click(function () {
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
        function grab_param<?php echo esc_attr( $tsvg_shortcode_id ); ?>(name, url) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return (results == null) ? "" : results[1];
        }
    })(jQuery);
    jQuery(document).ready(function ($) {
        $(document).on("mousedown", ".tsvg-block-link-hover", function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });
    function lightboxPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>() {
        jQuery(".tsvg-lightbox-block-<?php echo esc_attr( $tsvg_shortcode_id ); ?> figure").prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>({
            animationSpeed:'fast',
            slideshow:5000,
            theme:'light_rounded',
            show_title:false,
            icon_play:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-play'),
            icon_paus:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-paus'),
            icon_close:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-close'),
            icon_close_text:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-close-text'),
            icon_next:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-next'),
            icon_prev:jQuery(".tsvg-lb-blocks-container-<?php echo esc_attr( $tsvg_shortcode_id ); ?>").attr('data-item-prev'),
            overlay_gallery: false
        });
    }
    if(jQuery().prettyPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>) {
        jQuery('.tsvg-section-<?php echo esc_attr( $tsvg_js_shortcode_id ); ?>').fadeIn();
        lightboxPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>(); 
    }
    <?php if ( $tsvg_edit === 'true' ) { ?>
        function lightboxPhotoForAdmin() {
            lightboxPhoto<?php echo esc_attr( $tsvg_shortcode_id ); ?>()
        }
    <?php } ?>
</script>
