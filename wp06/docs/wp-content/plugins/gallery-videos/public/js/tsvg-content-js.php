<?php
if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Parallax Engine' ) { ?>
  <script type="text/javascript">
	  jQuery(document).on('mousemove', '.TotalSoft_H_Ef<?php echo $Total_Soft_vgallery; ?>',function (event) {
			event=event || window.event
		   var img=jQuery(this).attr("data-tsvg-ef");
		   var title=jQuery(this).find('.TotalSoft_Title_Ef').attr("data-tsvg-ef");
		   var line=jQuery(this).find('.mask').attr("data-tsvg-ef");
		   var overlay=jQuery(this).find('.Hov_TotalSoft').attr("data-tsvg-ef");
			if(line=="TotalSoft_HovLine1") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").css({
				"transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-webkit-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-ms-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-moz-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-o-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine1']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)"
			  })
			}
			else if(line=="TotalSoft_HovLine5") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine5']").css({
				"transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-webkit-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-ms-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-moz-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-o-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)"
			  })
			}
			else if(line=="TotalSoft_HovLine8") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").css({
				"transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-webkit-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-ms-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-moz-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-o-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine8']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)"
			  })
			}
			else if(line=="TotalSoft_HovLine9") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine9']").css({
				"transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-webkit-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-ms-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-moz-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-o-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)"
			  })
			}
			else if(line=="TotalSoft_HovLine10") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").css({
				"transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-webkit-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-ms-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-moz-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)",
				"-o-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().top) / 10 - jQuery(this).height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine10']").offset().left) / 10 - jQuery(this).width() / 2)) + "px)"
			  })
			}
			else if(line=="TotalSoft_HovLine11") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_HovLine11']").css({
				"transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-webkit-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-ms-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-moz-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)",
				"-o-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg) translateY(-50%) translateX(-50%)"
			  })
			}
			if(img=="TotalSoft_H_Ef<?php echo $Total_Soft_vgallery; ?>1") {
			  jQuery(this).css({
				"transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg)",
				"-webkit-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg)",
				"-ms-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg)",
				"-moz-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg)",
				"-o-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 15) + "deg)"
			  })
			}
			else if(img=="TotalSoft_H_Ef<?php echo $Total_Soft_vgallery; ?>2") {
			  jQuery(this).css({
				"transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).offset().top - jQuery(this).height() / 2) / 15)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15)) + "px)",
				"-webkit-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).offset().top - jQuery(this).height() / 2) / 15)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15)) + "px)",
				"-ms-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).offset().top - jQuery(this).height() / 2) / 15)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15)) + "px)",
				"-moz-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).offset().top - jQuery(this).height() / 2) / 15)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15)) + "px)",
				"-o-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).offset().top - jQuery(this).height() / 2) / 15)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 15)) + "px)"
			  })
			}
			if(title=="TotalSoft_Title_Ef1") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").css({
				"transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().top) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().left) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").width() / 2)) + "px) translate3d(0, 0, 0)",
				"-webkit-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().top) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().left) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").width() / 2)) + "px) translate3d(0, 0, 0)",
				"-ms-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().top) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().left) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").width() / 2)) + "px) translate3d(0, 0, 0)",
				"-moz-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().top) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().left) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").width() / 2)) + "px) translate3d(0, 0, 0)",
				"-o-transform": "translateY(" + Math.floor(((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().top) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").height() / 2)) + "px) translateX(" + Math.floor(((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").offset().left) / 5 - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef1']").width() / 2)) + "px) translate3d(0, 0, 0)"
			  })
			}
			else if(title=="TotalSoft_Title_Ef4") {
			  jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").css({
				"transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").offset().left - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").width() / 2) / 10) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").offset().top + jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").height() / 2) / 10) + "deg) translateY(-50%) translateX(-50%) translate3d(0, 0, 0)",
				"-webkit-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").offset().left - jQuery(this).find("[data-tsvg-ef='TotalSoft_Title_Ef4']").width() / 2) / 10) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 10) + "deg) translateY(-50%) translateX(-50%) translate3d(0, 0, 0)",
				"-ms-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 10) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 10) + "deg) translateY(-50%) translateX(-50%) translate3d(0, 0, 0)",
				"-moz-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 10) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 10) + "deg) translateY(-50%) translateX(-50%) translate3d(0, 0, 0)",
				"-o-transform": "rotateX(" + Math.floor((event.pageX - jQuery(this).offset().left - jQuery(this).width() / 2) / 10) + "deg) rotateY(" + Math.floor((event.pageY - jQuery(this).offset().top + jQuery(this).height() / 2) / 10) + "deg) translateY(-50%) translateX(-50%) translate3d(0, 0, 0)"
			  })
			}
			if(overlay=="TotalSoft_Hov_Overlay1") {
			}
		  })
	  
		  function TotalSoft_Hov_Anim(event) { 
	  
		   }
	  TotalSoft_Hov_Anim();
	</script>
<?php } ?>
<?php
if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Thumbnails Video' ) { ?>
  	<script>
		jQuery(document).ready(function () {
		    jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .totalsoft_gv_tv_img_<?php echo esc_attr( $Total_Soft_vgallery ); ?>').adipoli({
		        'startEffect': '<?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01); ?>',
		        'hoverEffect': '<?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02); ?>',
		        'imageOpacity': 1,
		        'animSpeed': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03); ?>,
		        'fillColor': '<?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04); ?>',
		        'textColor': '#ffffff',
		        'overlayText': '<i class="<?php echo esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_14 ); ?>"></i>',
		        'slices': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05); ?>,
		        'boxCols': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06); ?>,
		        'boxRows': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07); ?>,
		        'popOutMargin': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08); ?>,
		        'popOutShadow': <?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09); ?>,
		        'popOutShadowC': '<?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10); ?>'
		    });
		    if (jQuery(window).width() < 820) {
		        jQuery(".boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").boxer({ mobile: true });
		    } else {
		        jQuery(".boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
		    }
		    jQuery(".boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?>.boxer_object").click(function (e) {
		        e.preventDefault();
		        e.stopPropagation();
		        $.boxer(jQuery('<div class="inline_content"><h2>More Content!</h2><p>This was created by jQuery and loaded into the new Boxer instance.</p></div>'));
		    });
		    jQuery(window).one("pronto.load", function () {
		        jQuery.boxer("close");
		        jQuery(".boxer_<?php echo esc_attr( $Total_Soft_vgallery ); ?>").boxer("destroy");
		    });
		});
	</script>
<?php }
if ( $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme == 'Fancy Gallery' ) { ?>
  	<script>
		jQuery(document).ready(function () {
			html5Lightbox = jQuery(".html5lightbox").html5lightbox({},'<?php echo esc_attr( $Total_Soft_vgallery ); ?>');
		});
		jQuery(function() {
			var Totalsoft_FG_HOv_T='<?php echo esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28); ?>';
			if(Totalsoft_FG_HOv_T=='Default') {
			  	Totalsoft_FG_HOv_T=false;
			}
			else {
			  	Totalsoft_FG_HOv_T=true;
			}
			jQuery(' .Total_Soft_GV_Fancy_<?php echo esc_attr( $Total_Soft_vgallery ); ?> > li ').each(function() {
				jQuery(this).hoverdir({hoverDelay: 50, inverse:Totalsoft_FG_HOv_T});
			});
	  	});
  	</script>
<?php } ?>
