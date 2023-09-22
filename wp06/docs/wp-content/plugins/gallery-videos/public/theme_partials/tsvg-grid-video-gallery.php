<style type="text/css">
	:root{
	  	--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03 ), FILTER_VALIDATE_INT ); ?>;
	  	--tsvg_general_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_general_video_radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_general_opacity_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07 ) ), FILTER_VALIDATE_FLOAT ); ?>;
	  	--tsvg_general_dr_sh_cl_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_title_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_title_mt_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_to_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_VALIDATE_INT ); ?>px;
	  	--tsvg_to_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 ), FILTER_SANITIZE_STRING ); ?>;
	  	--tsvg_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ), FILTER_SANITIZE_STRING ); ?>;
	}
	.TS_VGallery_current<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP {
		max-height: 130px;
	}
	.TS_VGallery_item_block_desc__<?php echo esc_attr( $Total_Soft_vgallery ); ?> p span{
		font-size: 14px;
		color:#000000 !important;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .-wrap_<?php echo $Total_Soft_vgallery; ?>{
		max-width: 95%;
		margin: 0 auto;
		padding: 0;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TS_VGallery_blocks-gallery-grid{
		list-style-type: none;
		padding: 0!important;
		margin: 0 ;
		position: relative;
		list-style: none;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'fallPerspective'
			|| $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'fly'
			|| $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'flip'
			|| $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'helix'
			|| $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'popUp'
		) { ?> 
			-webkit-perspective: 1300px;-moz-perspective: 1300px;perspective: 1300px;
		<?php } ?>
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TS_VGallery_blocks-gallery-item{
	   	display: flex; 
		-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;
		-webkit-justify-content: center;-ms-justify-content: center; justify-content: center;
		align-self: flex-start;
		position: absolute;
		width: calc(calc(100% - var(--tsvg_general_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) / var(--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
		cursor: pointer;
		opacity: 1;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'moveUp' ) { ?> 
			-webkit-transform: translateY(200px);-moz-transform: translateY(200px);transform: translateY(200px);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'scaleUp' ) { ?>
			-webkit-transform: scale(0.6);-moz-transform: scale(0.6); transform: scale(0.6);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'fallPerspective' ) { ?>
			 -webkit-transform-style: preserve-3d;
			-moz-transform-style: preserve-3d; transform-style: preserve-3d;-webkit-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
			-moz-transform: translateZ(400px) translateY(300px) rotateX(-90deg); transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'fly' ) { ?>
			 -webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;transform-style: preserve-3d;
			-webkit-transform-origin: 50% 50% -300px;-moz-transform-origin: 50% 50% -300px;transform-origin: 50% 50% -300px;
			-webkit-transform: rotateX(-180deg); -moz-transform: rotateX(-180deg);transform: rotateX(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'flip' ) { ?>
			-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d; transform-style: preserve-3d;
			-webkit-transform-origin: 0% 0%;-moz-transform-origin: 0% 0%;transform-origin: 0% 0%;
			-webkit-transform: rotateX(-80deg);-moz-transform: rotateX(-80deg);transform: rotateX(-80deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'helix' ) { ?> 
			-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d; transform-style: preserve-3d;
			-webkit-transform: rotateY(-180deg); -moz-transform: rotateY(-180deg);transform: rotateY(-180deg);
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 == 'popUp' ) { ?> 
			-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;transform-style: preserve-3d;
			-webkit-transform: scale(0.4); -moz-transform: scale(0.4);transform: scale(0.4);
		<?php } ?>
	}
	.TS_VGallery_blocks-gallery-item:before {
		content: '' !important;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery     .TS_VGallery_blocks-gallery-item{
		 padding: var(--tsvg_general_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		padding-top: 0;
		 margin:0!important;
	}
   	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .TS_VGallery_blocks-gallery-item figure{
		display: flex;
		-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;
		-webkit-justify-content: center;-ms-justify-content: center;justify-content: center;
		-webkit-flex-wrap: nowrap;-ms-flex-wrap: nowrap;flex-wrap: nowrap;
		align-content: center;
		align-items: stretch;
		margin: 0;
		height: 100%;
		-webkit-transition: opacity 0.2s;
		transition: opacity 0.2s;
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=none] {
		-webkit-filter: none; filter: none;
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=blur] {
		-webkit-filter: blur(2px); filter: blur(2px);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=brightness] {
		-webkit-filter: brightness(120%);filter: brightness(120%);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=contrast] {
		-webkit-filter: contrast(150%); filter: contrast(150%);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=grayscale] {
		-webkit-filter: grayscale(100%);filter: grayscale(100%);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=hue-rotate] {
		-webkit-filter: hue-rotate(90deg); filter: hue-rotate(90deg);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=invert] {
		-webkit-filter: invert(100%); filter: invert(100%);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=drop-shadow] {
	   -webkit-filter: drop-shadow(0px 0px 3px var(--tsvg_general_dr_sh_cl_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)); filter: drop-shadow(0px 0px 3px var(--tsvg_general_dr_sh_cl_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
	}
	.TS_VGallery_blocks-gallery-item:hover  .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=opacity] {
		-webkit-filter: opacity(var(--tsvg_general_opacity_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)); filter: opacity(var(--tsvg_general_opacity_<?php echo esc_attr( $Total_Soft_vgallery ); ?>));
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=sepia] {
		-webkit-filter: sepia(100%); filter: sepia(100%);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=saturate] {
		-webkit-filter: saturate(8);filter: saturate(8);
	}
	.TS_VGallery_blocks-gallery-item:hover .TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect=contrast-brightness] {
		-webkit-filter: contrast(120%) brightness(120%);  filter: contrast(120%) brightness(120%);
	}
	.TS_VGallery_blocks-gallery-item figure img{
		max-width: 100%;
		border: none;
		font-size: inherit;
		line-height: inherit;
		margin: 0 !important;
		padding: 0;
		text-align: inherit;
		height: 100%;
		width: 100%;
		flex: 1;
		-o-object-fit: cover;
		object-fit: cover;
		display: block;
		cursor: pointer;
	}
	.TS_VGallery_blocks-gallery-item figure h3{
		margin: 0;
		padding: 5px 17px;
		text-align: center;
		margin-top:  var(--tsvg_title_mt_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ;
		margin-bottom: 0 !important;
		word-wrap: break-word;
		font-size: var(--tsvg_to_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		line-height:calc(var(--tsvg_to_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) + 1) !important;
		font-family: var(--tsvg_to_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		color:  var(--tsvg_to_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)!important;
		border-bottom: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_15; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16; ?> <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17; ?> !important;
		font-weight: 400 !important;
		text-transform: none !important;perspective: 800px;transform: translate3d(0, 0, 0);-moz-transform: translate3d(0, 0, 0);-webkit-transform: translate3d(0, 0, 0);
	}
	.TS_VGallery_blocks-gallery-item figure h3[data-tsvg-title='left']{
		text-align:left ;
	}
	.TS_VGallery_blocks-gallery-item figure h3[data-tsvg-title='center']{
		text-align:center ;
	}
	.TS_VGallery_blocks-gallery-item figure h3[data-tsvg-title='right']{
		text-align:right ;
	}
	.TS_VGallery_blocks-gallery-item figure figcaption{
		width: 100%;
		max-height: 100%;
		overflow: auto;
		text-align: center;
		font-size: .8em;
		margin: 0;
		padding: 5px 17px;
		margin-bottom: 0 !important;
		word-wrap: break-word;
		line-height: normal;
	}
	.TS_VGallery_blocks-gallery-item-<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure[data-tsvg-bool="false"] h3,
	.TS_VGallery_blocks-gallery-item-<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure[data-tsvg-bool="false"] figcaption{
		background:  var(--tsvg_title_bc_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TS_VGallery_blocks-gallery-item figure figcaption ol ul {
		list-style-type: decimal;
		display: list-item;
		font-size: 13px;
	}
	.TS_VGallery_blocks-gallery-item figcaption > ul li {
		position: unset !important;
		word-wrap: break-word;
		width: unset !important;
	}
	.TS_VGallery_blocks-gallery-item figure figcaption ul, .TS_VGallery_blocks-gallery-item figure figcaption ol {
		left: 0;
		margin-left: 0;
	}
	.TS_VGallery_blocks-gallery-item figure figcaption ul  ul {
		display: list-item;
		list-style-type: disc;
	}
	.TS_VGallery_GRWR-<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		max-width: 100%;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		position: fixed;
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99999999999 !important;
		opacity: 0;
		display: none;
		overflow: hidden;
		-webkit-perspective: 1000px;
		-moz-perspective: 1000px;
		perspective: 1000px;
		-webkit-transition: opacity 0.5s;
		-moz-transition: opacity 0.5s;
		transition: opacity 0.5s;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>-open {
		opacity: 1;
		display: block;
		-webkit-transition: opacity 0.4s;
		-moz-transition: opacity 0.4s;
		transition: opacity 0.4s;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_nav-close-RW<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: 100%;
		height: 100%;
		margin: 0;
		list-style: none;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition: -webkit-transform 0.5s;
		-moz-transition: -moz-transform 0.5s;
		transition: transform 0.5s;
	}
	.TS_VGallery_animatable > .TS_VGallery_item {
		-webkit-transition: -webkit-transform 0.7s;
		-moz-transition: -moz-transform 0.7s;
		transition: transform 0.7s;
	}
	.TS_VGallery_animatable{
		display: inline-table;
	}
	.TS_VGallery__GV_GG_SP>p{
		height :5em;
		overflow:auto;
	}
	/* .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_nav-close-RW<?php echo esc_attr( $Total_Soft_vgallery ); ?> > .TS_VGallery_item {
		padding-left: 0rem;
		width: 600px;
		max-width: 95%;
		position: absolute;
		margin: auto;
		left: 50%;
		top: 45vh;
		bottom: 0;
		height: 100vh;
		visibility: hidden;
		box-sizing: border-box;
		background: none !important;
		background-color: inherit  !important;
	} */
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_nav-close-RW<?php echo esc_attr( $Total_Soft_vgallery ); ?> > .TS_VGallery_item:after
	{
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		-webkit-transition: opacity 0.5s;-moz-transition: opacity 0.5s;transition: opacity 0.5s;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_nav-close-RW<?php echo esc_attr( $Total_Soft_vgallery ); ?> > .TS_VGallery_item.TS_VGallery_current<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		visibility: hidden;
		opacity: 0;
		-webkit-transition: opacity 0.1s, visibility 0s 0.1s; -moz-transition: opacity 0.1s, visibility 0s 0.1s;transition: opacity 0.1s, visibility 0s 0.1s;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_nav-close-RW<?php echo esc_attr( $Total_Soft_vgallery ); ?>  {
		display: flex;
		-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;
		
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item.TS_VGallery_show<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		visibility: visible;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_iframecontainer{
		display: flex;
		-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_iframecontainer.TS_VGallery_show<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		z-index: -99 !important;
		opacity: 0.8 ;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_current<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		z-index: 999999 !important;
		transform: translateX(-50%) translate3d(0, 0, 280px); -webkit-transform: translateX(-50%) translate3d(0, 0, 280px);-moz-transform: translateX(-50%) translate3d(0, 0, 280px); -ms-transform: translateX(-50%) translate3d(0, 0, 280px);
		max-width:  65% !important;
		opacity: 1 !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure {
		position: absolute;
		width: 100%;
		overflow: hidden;
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18; ?>;
		border: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20; ?> <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21; ?>;
		border-radius: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22; ?>px;
		padding: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23; ?>px;
		padding-top:0 ;
		max-width: 100%;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figcaption {
		padding: 5px 0;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TotalSoft_GV_SG_Videodiv,   .ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TotalSoft_GV_SG_Imagediv,.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item .TotalSoft_GV_SG_Imagediv{
		position: relative;
		padding-top: 56.25%;
	}
   	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item figure iframe,.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item figure img, .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item  figure video {
		height: auto;
		min-width: 100%!important;
		position: absolute;
		top: 0;
		left:0;
		width: 100%;
		height: 100%;
		min-height: 100%!important;
		max-height: 100%!important;
		object-fit: cover;
		margin: 0;
		display: block;
		max-height:auto!important;
		margin-left: 0!important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item  figure img {
		height: auto;
		width: auto;
		margin: 0 auto !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP {
		overflow-y: auto;
		overflow-x: hidden;
		margin-top: 5px;
		padding-right: 10px;
		padding: 0 20px;
		padding-left: 15px;
		height: auto;
		width: 100%;
		word-break: break-all;
		line-height: normal;
	}
	.TS_VGallery_current<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP {
		max-height: 130px;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP ul {
		margin-bottom: 0px;
		margin-left: 10px;
		line-height: 15px;
		position: relative !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP ul li {
		top: unset !important;
		position: relative;
		margin-bottom: 0px;
		margin-top: 0px;
		list-style-type: disc !important;
		position: relative !important;
		visibility: inherit;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> > .TS_VGallery_item:after {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18; ?>;
		border-radius: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22; ?>px;
		opacity: 0.8;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ol, .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure ul {
		margin-left: 0 !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery_TotalSoft_GV_GG_SP ol li {
		top: unset !important;
		position: relative;
		margin-bottom: 0px;
		margin-top: 0px;
		position: relative !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  figcaption{
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24; ?>px;
		font-family: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25; ?> !important;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26; ?> !important;
		text-align: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27; ?> !important;
		border-bottom: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_28; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29; ?> <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30; ?> !important;
		margin-bottom: 0 !important;
		line-height: 1 !important;
		font-weight: 400 !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> p {
		margin-bottom: 0 !important;
		display: block !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span {
		position: fixed;
		z-index: 1000;
		padding: 3%;
		cursor: pointer;
		background: none !important;
		background-color: inherit !important;
		width: auto !important;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span:before, .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span:after {
		content: none;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP::-webkit-scrollbar {
		width: 0.5em;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18; ?>;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .TS_VGallery__GV_GG_SP::-webkit-scrollbar-thumb {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26; ?>;
		outline: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26; ?>;
	}
	.TS_VGallery_show<?php echo $Total_Soft_vgallery; ?> {
		-webkit-transition: opacity 1s ease-out 0.5s;-moz-transition: opacity 1s ease-out 0.5s; -o-transition: opacity 1s ease-out 0.5s; transition: opacity 1s ease-out 0.5s;
	}

	@media screen and (max-width: 480px) {
		.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figcaption {
			padding-bottom: 10px !important;
		}
		.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure {
			padding: 20px;
		}
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-prev, .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-next {
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35; ?>px;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34; ?>;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-close {
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39; ?>px;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38; ?>;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-prev, .TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-next{
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-prev {
		left: 0;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-next {
		right: 0;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> nav span.TS_VGallery_nav-close {
		top: 3%;
		right: 0;
	}
	.TS_VGallery_slideshow<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_item .TotalSoft_GV_SG_Imagediv iframe{
		width:100%;
	}
	div.TS_VGallery_center {
		text-align: center !important;
		margin-top: 10px;
		margin-bottom: 10px;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
	.TS_VGallery_blocks-gallery-grid-<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_blocks-gallery-item_caption__<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.TS_VGallery_blocks-gallery-grid-<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_blocks-gallery-item_title__<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		display: none;
		/* margin: 0 !important; */
		opacity: unset !important;
	}
	.TS_VGallery_blocks-gallery-item_caption__<?php echo esc_attr( $Total_Soft_vgallery ); ?> p{
		color: inherit !important;
	}
	.TS_VGallery_blocks-gallery-grid-<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-show-desc='true'] .TS_VGallery_blocks-gallery-item_caption__<?php echo esc_attr( $Total_Soft_vgallery ); ?>,.TS_VGallery_blocks-gallery-grid-<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-show-title='true'] .TS_VGallery_blocks-gallery-item_title__<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
		display: block;
	}
	.TS_VGallery_GV_GVG_LM<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_14; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15; ?>;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_16; ?>px;
		font-family: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17; ?>;
	<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_24 != 'none' ) { ?>
		 border: 1px solid<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_25; ?>;
	<?php } else { ?> 
		border: none !important;
	<?php } ?> 
		cursor: pointer;
		display: block;
		padding: 3px !important;
		line-height: 1 !important;
	}
	.TS_VGallery_GV_GVG_LM<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_20; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_21; ?>;
	}
	.TS_VGallery_blocks-gallery-item_block__<?php echo esc_attr( $Total_Soft_vgallery ); ?> figure figcaption ol ul{
		list-style-type: decimal;
		display: list-item;
		font-size: 13px;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .TS_VGallery_blocks-gallery-item figure{
		overflow: hidden;
		border-radius: var(--tsvg_general_video_radius_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}

	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="500px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 2;
	}

	.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[max-width~="400px"]{
		--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>: 1;
	}

</style>
<?php
$tsp_main_videos = '';
$i                = 0;
foreach ( $ts_galleryv_videos_Columned as $key => $value ) {
	$i++;
	$ts_vgallery_Question_TS_VG_Options = json_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_Options );
	$TS_VGallery_url_v = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd == '' ? $tsvgallery_def_theme_ifr_link : $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Vd;
	$TS_VGallery_url_i = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_img.jpg', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	if ( $TS_VGallery_url_v != '' ) {
		if ( strpos( $TS_VGallery_url_v, '.mp4' ) > - 1 ) {
			$class_url = 'TS_VGallery_Video_Container';
		} else {
			$class_url = 'TS_VGallery_Iframe_Container'; }
	} else {
			$class_url = 'TS_VGallery_imagecontainer';
	}
	$tsp_main_videos .= sprintf(
		"
      	<li class='TS_VGallery_blocks-gallery-item TS_VGallery_blocks-gallery-item-%s'  data-tsvg-class='%s' data-tsvg-id='%s' style='-moz-animation-delay: 0.%ss;-webkit-animation-delay: 0.%ss;animation-delay: 0.%ss;'>
      	  	<figure class='TS_VGallery_blocks-gallery-item_block__%s' data-tsvg-effect='%s' data-tsvg-bool='%s'>
      	  	  	<img  width='' height='' src='%s' alt='img' >
      	  	  	<h3 class='TS_VGallery_blocks-gallery-item_title__%s'  data-tsvg-title='%s'>
      	  	    	%s  
      	  	  	</h3>
      	  	  	<figcaption class='TS_VGallery_blocks-gallery-item_caption__%s'>
      	  	  	  	%s
      	  	  	</figcaption>
      	  	</figure>
      	</li>
    	",
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $i ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_40 ),
		esc_url( $TS_VGallery_url_i ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $Total_Soft_vgallery ),
		wp_unslash( html_entity_decode( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_desc ) )
	);
}
echo sprintf(
	"
 	<main class='%s'  data-tsvg-main='show' data-item-open='%s' data-item-number='%s' data-pagination='%s'  data-p-lm='%s'>
 	  	<figure id='figure-grid%s-gallery' class='TS_VGallery_grid-wrap_%s TS_VGallery_GRWR-%s'>
 	   		<ul class='TS_VGallery_blocks-gallery-grid-%s TS_VGallery_blocks-gallery-grid'  data-show-title='%s'  data-show-desc='%s'>
 	   			%s  
 	   		</ul>
 	   	</figure>
 	</main>
	",
	'ts_vgallery_main_' . esc_attr( $Total_Soft_vgallery ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_07 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_02 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_26 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_02 ),
	$tsp_main_videos
);
?>
