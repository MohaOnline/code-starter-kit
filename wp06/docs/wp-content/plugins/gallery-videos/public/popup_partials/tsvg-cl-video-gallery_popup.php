<style type="text/css">
	:root{
		--tsvg_popup_po_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_15 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_po_br_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_po_br_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_popup_po_br_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_popup_to_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_popup_to_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_lat_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25 ), FILTER_VALIDATE_INT ); ?>%;
		--tsvg_popup_lat_h_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ), FILTER_VALIDATE_INT ); ?>px;
		--tsvg_popup_lat_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_lat_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_cl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30 ), FILTER_SANITIZE_STRING ); ?>;
		--tsvg_popup_cl_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31 ), FILTER_VALIDATE_INT ); ?>px;
	}
	.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: fixed;
		display: none;
		width: 100%;
		top: 53%;
		left: 0;
		z-index: 10000001;
		margin: 0 auto;
		max-width: 100% !important;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
	}
	.TS_GV_ClG_Div_Full_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: fixed;
		width: 0%;
		height: 0%;
		top: 50%;
		left: 50%;
		z-index: 10000000;
		cursor: pointer;
		max-width: 100% !important;
	}
	@media screen and (max-width: 820px) {
		.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			top: 20%;
			transform: translateY(0%);
			-webkit-transform: translateY(0%);
			-moz-transform: translateY(0%);
		}
	}
	@media screen and (max-width: 400px) {
		.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			top: 10%;
			transform: translateY(0%);
			-webkit-transform: translateY(0%);
			-moz-transform: translateY(0%);
		}
	}
	.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		margin: 0 auto;
		width: 50%;
		height: inherit;
		display: none;
		padding: 1em;
		height: 100%;
		overflow-y: auto;
		border: var(--tsvg_popup_po_br_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) solid var(--tsvg_popup_po_br_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: var(--tsvg_popup_po_br_r_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ;
		background: var(--tsvg_popup_po_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		max-height: 85vh !important;
	}
	.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::-webkit-scrollbar {
		width: 0.3em;
	}
	.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6pxvar(--tsvg_popup_po_bc_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>::-webkit-scrollbar-thumb {
		background-color: var(--tsvg_popup_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		outline: var(--tsvg_popup_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> h3 {
		font-size: var(--tsvg_popup_to_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  !important;
		font-family: var(--tsvg_popup_to_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		color: var(--tsvg_popup_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) !important;
		text-align: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23; ?> !important;
		line-height: 1 !important;
		font-weight: 400 !important;
		margin: 10px !important;
		text-transform: none !important;
		letter-spacing: 0 !important;
	}
	.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> p {
		margin: 10px 0;
		line-height: 1.3;
	}
	i.TS_GV_ClG_Div_Close_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: fixed;
		display: none;
		top: 2em;
		right: 1em;
		color: var(--tsvg_popup_cl_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-size: var(--tsvg_popup_cl_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  !important;
		z-index: 10000002;
		line-height: 1;
		cursor: pointer;
	}
	.TotalSoft_GV_CG_Link_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: absolute;
		left: calc(-1em - var(--tsvg_popup_po_br_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
		padding: 0.3em 1.5em;
		top: 0;
		border-top: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32; ?>px solid <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33; ?>;
		border-right: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32; ?>px solid <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33; ?>;
		border-top-right-radius: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34; ?>px;
		background: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_36; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37; ?> !important;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38; ?>px;
		font-family: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39; ?>;
		text-decoration: none !important;
		line-height: 1;
		box-shadow: none !important;
		-webkit-box-shadow: none !important;
		-moz-box-shadow: none !important;
		-o-box-shadow: none !important;
	}
	.TotalSoft_GV_CG_Link_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover, .TotalSoft_GV_CG_Link_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:focus {
		outline: none !important;
		text-decoration: none !important;
		box-shadow: none !important;
		-webkit-box-shadow: none !important;
		-moz-box-shadow: none !important;
		-o-box-shadow: none !important;
	}
	.TotalSoft_GV_CG_Link_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
		background: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_01; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02; ?> !important;
	}
	.TotalSoft_GV_CG_Link_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:before {
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04; ?>px !important;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_05; ?> !important;
	}
	.TS_GV_ClG_Div_box_span_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		margin: 10px auto;
		width: var(--tsvg_popup_lat_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-top: var(--tsvg_popup_lat_h_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_popup_lat_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_popup_lat_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TS_GV_ClG_Div_Image_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		display: block;
		text-align: center;
	}
	.TS_GV_ClG_Div_Image_<?php echo esc_attr( $Total_Soft_vgallery ); ?> img {
		position: relative;
		margin: 0 auto;
		height: 300px;
		width: auto;
	}
	.TS_GV_ClG_Div_video_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: relative;
		padding-bottom: 56.25%;
		padding-top: 30px;
		height: 0;
		width: 100%;
		overflow: hidden;
	}
	.TS_GV_ClG_Div_video_<?php echo esc_attr( $Total_Soft_vgallery ); ?> iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.TotalSoft_GV_CG_Link_parent{
	  position:relative;
	  margin-top:10px;
	}
	.TS_GV_ClG_Div_desc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.TS_GV_ClG_Div_videoTD_<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
	  display:none !important;
	}
	.TS_GV_ClG_Div_desc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-show='true'],.TS_GV_ClG_Div_videoTD_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-show='true']{
	  display:block !important;
	}
	.TS_GV_ClG_Div_videoTD_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-title='left'] h3{
	   text-align:left!important; ;
	}
	.TS_GV_ClG_Div_videoTD_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-title='center'] h3{
		text-align:center!important; ;
	}
	.TS_GV_ClG_Div_videoTD_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-title='right'] h3{
		text-align:right!important; ;
	}
	.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href=''], .TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href='#']{
	  	display:none!important;
	}
	.TS_GV_ClG_Div_video_mp4_<?php echo esc_attr( $Total_Soft_vgallery ); ?> > video{
		width:100%;
	}
	<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 >= '1' ) { ?>
		@media (max-width: 620px) {
			.TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
				width: 100%;
				margin: 0.5em 0;
			}
			.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
				width: 100%;
				top: 100px;
			}
			.TS_GV_ClG_Div_Close_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
				z-index: 1000000000;
				top: 0.2em;
				right: 0.4em;
				font-size: 30px;
			}
		}
	<?php }
	if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 >= '3' ) { ?>
		/* Landscape phone to portrait tablet */
		@media (max-width: 850px) {
			.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
				margin: auto;
				width: 80%;
				max-height: 500px;
			}
		}
	<?php }
	if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 >= '4' ) { ?>
		/* Portrait tablet to landscape and desktop */
		@media (min-width: 850px) and (max-width: 979px) {
			.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
				width: 70%;
				max-height: 550px;
			}
		}
	<?php } ?>
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_g_c_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}
	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_g_c_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
	}
</style>
<?php
$tsvg_figur_popup  = '';
$tsvg_figur_popup .= sprintf(
    "
  	<div class='TS_GV_ClG_Div_box_div1_%s TS_GV_ClG_Div_box_div1_%s_%s' data-tsvg-autoplay='%s'>
  	  	<div class='TS_GV_ClG_Div_video_%s'>
  	  	  	<iframe src='' frameborder='0' allowfullscreen></iframe>
  	  	</div>
		<div class='TS_GV_ClG_Div_video_mp4_%s'>
			<video src=''  controls></video>
	  	</div>
  	  	<div class='TS_GV_ClG_Div_Image_%s' >
  	  	  	<img src=''/>
  	  	</div>
  	  	<div class='TS_GV_ClG_Div_videoTD_%s'  data-show='%s' data-tsvg-title='%s'>
  	  	  	<h3></h3>
  	  	  	<span class='TS_GV_ClG_Div_box_span_%s'></span>
  	  	</div>
  	  	<p class='TS_GV_ClG_Div_desc_%s'  data-show='%s'></p>
  	  	<div class='TotalSoft_GV_CG_Link_parent'>
  	   		<a class='TotalSoft_GV_CG_Link_%s' href='' target='' data-position='%s'>
  	   		   	<i class='TotalSoft_GV_CG_Link_Icon_%s ts-vgallery ts-vgallery-%s' style='margin-right: 5px;'></i>
  	   		  	%s
  	   		</a>
  		</div>
  	</div>
  	",
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( '1' ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_37 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_06 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_03 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35 )
);
echo sprintf(
	"
    <div class='TS_GV_ClG_Div_Full_%s'></div>
    <i class='TS_GV_ClG_Div_Close_Icon_%s %s'></i>
    <div class='TS_GV_ClG_Div_box_%s'>
      	%s
    </div>
    ",
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ),
	esc_attr( $Total_Soft_vgallery ),
	$tsvg_figur_popup
);
?>
<script type="text/javascript">
	let tsvgClassicInterval_for_<?php echo esc_attr( $Total_Soft_vgallery ); ?> = null,
    	tsvgClassicIntervalFunction_<?php echo esc_attr( $Total_Soft_vgallery ); ?> = function(){
    	    if(typeof jQuery === "function" && typeof(jQuery) != "undefined" && jQuery != null) {
				jQuery(document).on("click", ".TS_GV_ClG_Div1_Main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>", function() {
					let id='<?php echo esc_attr( $Total_Soft_vgallery ); ?>';
					if(!jQuery('.TS_GV_ClG_Div_Full_' + id).parent().is('body')){
						jQuery('.TS_GV_ClG_Div_Full_' + id).appendTo(document.body);
						jQuery('.TS_GV_ClG_Div_Close_Icon_' + id).appendTo(document.body);
						jQuery('.TS_GV_ClG_Div_box_' + id).appendTo(document.body);
					}
					let  num=jQuery(this).index();
					var iframesource = jQuery(this).attr('data-tsvg-src');
					var tsvg_autoplay = jQuery('.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').attr('data-tsvg-autoplay');
					var tsvg_cl_gl_title=jQuery(this).find('.TS_GV_ClG_Div2_Hov_Title_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').text();
					var tsvg_cl_gl_desc=jQuery(this).find('.TS_GV_ClG_Div2_desc').html();
					var tsvg_cl_gl_link=jQuery(this).attr('data-tsvg-link');
					var tsvg_cl_gl_target=jQuery(this).attr('data-tsvg-target');
					jQuery('.fixed-header-box').css({'z-index': '0'});
					jQuery('.TS_GV_ClG_Div_Full_' + id).animate({'width': '100%', 'height': '100%', 'top': '0', 'left': '0'}, 500);
					setTimeout(function () {
						jQuery('.TS_GV_ClG_Div_box_' + id).css({ 'display': 'flex', 'display': '-webkit-flex' });
						jQuery('.TS_GV_ClG_Div_box_div1_' + id).css('display', 'none');
						jQuery('.TS_GV_ClG_Div_box_div1_' + id).css({ 'display': 'block' });
						jQuery('.TS_GV_ClG_Div_Close_Icon_' + id).css({ 'display': 'block' });
							var isvideotf = 'false';
							var isvideomp4 = 'false';
							if ( iframesource.indexOf('youtube.com/shorts/') > -1 ) {
								iframesource = iframesource.replace("shorts", "embed")
							}

							if (iframesource.indexOf('youtube.com/embed/') > -1   ) {
								isvideotf = 'true';
								if(tsvg_autoplay == "true"){
									iframesource = iframesource + '?autoplay=1&mute=1';
								}
							}
							else if (iframesource.indexOf('player.vimeo.com/video/') > -1) {
								isvideotf = 'true';
								if(tsvg_autoplay == "true"){
									iframesource = iframesource + '?autoplay=1&loop=1&autopause=0';
								}
							}
							else if (iframesource.indexOf('.mp4') > -1) {
								isvideotf = 'true';
								isvideomp4 = 'true';
							}
							else if (iframesource.indexOf('fast.wistia.net/embed/iframe/') > -1) {
								isvideotf = 'true';
								if(tsvg_autoplay == "true"){
									iframesource = iframesource + '?wvideo=hashedid';
								}
							}
						if (isvideotf == 'true') {
							if(isvideomp4 == 'true'){
								jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('video').attr('src', iframesource);
								if (tsvg_autoplay == "true") {
									jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('video').attr('autoplay', true);
								} else {
									jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('video').removeAttr('autoplay');
								}
								jQuery('.TS_GV_ClG_Div_video_mp4_' + id).css('display', 'block');
								jQuery('.TS_GV_ClG_Div_video_' + id).css('display', 'none');
							}
							else{
								jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('iframe').attr('src', iframesource);
								jQuery('.TS_GV_ClG_Div_video_mp4_' + id).css('display', 'none');
								jQuery('.TS_GV_ClG_Div_video_' + id).css('display', 'block');
							}
							jQuery('.TS_GV_ClG_Div_Image_' + id).css('display', 'none');
						}
						else {
							jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('img').attr('src', iframesource);
							jQuery('.TS_GV_ClG_Div_video_' + id).css('display', 'none');
							jQuery('.TS_GV_ClG_Div_video_mp4_' + id).css('display', 'none');
							jQuery('.TS_GV_ClG_Div_Image_' + id).css('display', 'block');
						}

						// 
						jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('.TS_GV_ClG_Div_videoTD_' + id).find('h3').text(tsvg_cl_gl_title);
						jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('.TS_GV_ClG_Div_desc_' + id).html(tsvg_cl_gl_desc);

						if (tsvg_cl_gl_link) {
							jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('.TotalSoft_GV_CG_Link_' + id).attr('target', tsvg_cl_gl_target).css('display', 'block');
							jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('.TotalSoft_GV_CG_Link_' + id).attr('href', tsvg_cl_gl_link)
						} else {
							jQuery('.TS_GV_ClG_Div_box_div1_' + id).find('.TotalSoft_GV_CG_Link_' + id).attr('href', '#').css({ 'display': 'none' })
						}
					}, 500)
				});
				jQuery(document).on("click", ".TS_GV_ClG_Div_Close_Icon_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.TS_GV_ClG_Div_Full_<?php echo esc_attr( $Total_Soft_vgallery ); ?>", function () {
					let id = '<?php echo esc_attr( $Total_Soft_vgallery ); ?>';
					jQuery('.fixed-header-box').css({ 'z-index': '10' });
					jQuery('.TS_GV_ClG_Div_box_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_box_div1_' + id).css('display', 'none');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' iframe').attr('src', '');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' img').attr('src', '');
					jQuery('.TS_GV_ClG_Div_Close_Icon_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_Full_' + id).animate({ 'width': '0%', 'height': '0%', 'top': '50%', 'left': '50%' }, 500);
				});
				jQuery(document).on("click", ".TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.TS_GV_ClG_Div_box_div1_<?php echo esc_attr( $Total_Soft_vgallery ); ?>", function (e) {
					if (e.target !== this) {
						return;
					}
					let id = '<?php echo esc_attr( $Total_Soft_vgallery ); ?>';
					jQuery('.fixed-header-box').css({ 'z-index': '10' });
					jQuery('.TS_GV_ClG_Div_box_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_box_div1_' + id).css('display', 'none');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' iframe').attr('src', '');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' img').attr('src', '');
					jQuery('.TS_GV_ClG_Div_Close_Icon_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_Full_' + id).animate({ 'width': '0%', 'height': '0%', 'top': '50%', 'left': '50%' }, 500);
				});
				jQuery('.TS_GV_ClG_Div_box_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').click(function (e) {
					if (e.target !== this) {
						return;
					}
					let id = '<?php echo esc_attr( $Total_Soft_vgallery ); ?>';
					jQuery('.fixed-header-box').css({ 'z-index': '10' });
					jQuery('.TS_GV_ClG_Div_box_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_box_div1_' + id).css('display', 'none');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' iframe').attr('src', '');
					jQuery('.TS_GV_ClG_Div_box_div1_' + id + ' img').attr('src', '');
					jQuery('.TS_GV_ClG_Div_Close_Icon_' + id).css({ 'display': 'none' });
					jQuery('.TS_GV_ClG_Div_Full_' + id).animate({ 'width': '0%', 'height': '0%', 'top': '50%', 'left': '50%' }, 500);
				});
    	       	clearInterval(tsvgClassicInterval_for_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
    	    }
    	},
		tsvgClassicReference_for_<?php echo esc_attr( $Total_Soft_vgallery ); ?> = (function tsvgClassicSameCallFunction_<?php echo esc_attr( $Total_Soft_vgallery ); ?>() {
    	    tsvgClassicInterval_for_<?php echo esc_attr( $Total_Soft_vgallery ); ?> = setInterval(tsvgClassicIntervalFunction_<?php echo esc_attr( $Total_Soft_vgallery ); ?>, 1000);
    		return tsvgClassicSameCallFunction_<?php echo esc_attr( $Total_Soft_vgallery ); ?>;
		}());

</script>
