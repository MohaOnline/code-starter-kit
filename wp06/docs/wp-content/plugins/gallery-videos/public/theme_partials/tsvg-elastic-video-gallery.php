<style type="text/css">
	:root{
	  --tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_01 ), FILTER_VALIDATE_INT ); ?>;
	  --tsvg_g_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_03 ), FILTER_VALIDATE_INT ); ?>px;
	  --tsvg_g_bd_t_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_04 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_g_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_05 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_06 ), FILTER_VALIDATE_INT ); ?>px;
	  --tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_07 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_09 ), FILTER_VALIDATE_FLOAT ); ?>s;
	  --tsvg_vto_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_11 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_vto_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_12 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_vto_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_10 ), FILTER_VALIDATE_INT ); ?>px;
	  --tsvg_vto_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_13 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_15 ), FILTER_VALIDATE_FLOAT ); ?>s;
	  --tsvg_pio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_17 ), FILTER_VALIDATE_INT ); ?>px;
	  --tsvg_pio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_18 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_pio_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_20 ), FILTER_VALIDATE_INT ); ?>px;
	  --tsvg_pio_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_21 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_pio_bd_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_pio_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_23 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_lio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_24 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_lio_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_25 ), FILTER_SANITIZE_STRING ); ?>;
	  --tsvg_lio_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>:<?php echo filter_var( esc_html( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_26 ), FILTER_SANITIZE_STRING ); ?>;
	}
  	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> .TS_VGallery_block{
		position: relative;
		padding-bottom: 56.25%;
		width: 100%!important;
		height: 100%!important; 
		margin: 0;
	}
	.lg-toolbar<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-icon<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30; ?>;
		cursor: pointer;
		float: right;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31; ?>px;
		height: 47px;
		line-height: 27px;
		padding: 10px 0;
		text-align: center;
		width: 50px;
		text-decoration: none !important;
		outline: medium none;
		-webkit-transition: color 0.2s linear;
		-moz-transition: color 0.2s linear;
		-o-transition: color 0.2s linear;
		transition: color 0.2s linear;
	}
	.lg-iconn {
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_30; ?>;
		cursor: pointer;
		float: right;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_31; ?>px;
		height: 47px;
		line-height: 27px;
		padding: 10px 0;
		text-align: center;
		width: 50px;
		text-decoration: none !important;
		outline: medium none;
		-webkit-transition: color 0.2s linear;
		-moz-transition: color 0.2s linear;
		-o-transition: color 0.2s linear;
		transition: color 0.2s linear;
	}
	.lg-toolbar<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-close<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		display: none !important;
	}
	.lg-actions<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-next<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .lg-actions<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-prev<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_35; ?>;
		border-radius: 2px;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_34; ?>;
		cursor: pointer;
		display: block;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_33; ?>px;
		padding: 8px 10px 9px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%) translate3d(0, 0, 0);
		-webkit-transform: translateY(-50%) translate3d(0, 0, 0);
		-ms-transform: translateY(-50%) translate3d(0, 0, 0);
		-moz-transform: translateY(-50%) translate3d(0, 0, 0);
		-o-transform: translateY(-50%) translate3d(0, 0, 0);
		perspective: 800px;
		z-index: 1080;
	}
	.lg-actions<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-prev<?php echo esc_attr( $Total_Soft_vgallery ); ?>:after {
		display: none;
	}
	/* .lg-outer<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-video<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: 100%;
		height: 0;
		border: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_39; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_01; ?> <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02; ?>;
		box-shadow: 0px 0px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_03; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04; ?>;
		-moz-box-shadow: 0px 0px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_03; ?> px<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04; ?>;
		-webkit-box-shadow: 0px 0px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_03; ?>px <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_04; ?>;
		padding-bottom: 56.25%;
		overflow: hidden;
		position: relative;
		background: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_02; ?>;
	} */
	.demo-gallery > ul {
		margin-bottom: 0;
	}
	.demo-gallery > ul > li {
		float: left;
		margin-bottom: 15px;
		margin-right: 20px;
		width: 200px;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .demo-gallery > ul > li a {
		border: 3px solid #FFF;
		border-radius: 3px;
		display: block;
		overflow: hidden;
		position: relative;
		float: left;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery > ul > li a > img {
		-webkit-transition: -webkit-transform 0.15s ease 0s;
		-moz-transition: -moz-transform 0.15s ease 0s;
		-o-transition: -o-transform 0.15s ease 0s;
		transition: transform 0.15s ease 0s;
		-webkit-transform: scale3d(1, 1, 1);
		-moz-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
		height: 100%;
		width: 100%;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .demo-gallery > ul > li a:hover > img {
		-webkit-transform: scale3d(1.1, 1.1, 1.1);
		-moz-transform: scale3d(1.1, 1.1, 1.1);
		transform: scale3d(1.1, 1.1, 1.1);
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery > ul > li a:hover .demo-gallery-poster > img {
		opacity: 1;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .demo-gallery > ul > li a .demo-gallery-poster {
		background-color: rgba(0, 0, 0, 0.1);
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		-webkit-transition: background-color 0.15s ease 0s;
		-moz-transition: background-color 0.15s ease 0s;
		-o-transition: background-color 0.15s ease 0s;
		transition: background-color 0.15s ease 0s;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .demo-gallery > ul > li a .demo-gallery-poster > img {
		left: 50%;
		margin-left: -10px;
		margin-top: -10px;
		opacity: 0;
		position: absolute;
		top: 50%;
		-webkit-transition: opacity 0.3s ease 0s;
		-moz-transition: opacity 0.3s ease 0s;
		-o-transition: opacity 0.3s ease 0s;
		transition: opacity 0.3s ease 0s;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery    .demo-gallery > ul > li a:hover .demo-gallery-poster {
		background-color: rgba(0, 0, 0, 0.5);
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery .justified-gallery > a > img {
		-webkit-transition: -webkit-transform 0.15s ease 0s;
		-moz-transition: -moz-transform 0.15s ease 0s;
		-o-transition: -o-transform 0.15s ease 0s;
		transition: transform 0.15s ease 0s;
		-webkit-transform: scale3d(1, 1, 1);
		-moz-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
		height: 100%;
		width: 100%;
	}
	.demo-gallery .justified-gallery > a:hover > img {
		-webkit-transform: scale3d(1.1, 1.1, 1.1);
		-moz-transform: scale3d(1.1, 1.1, 1.1);
		transform: scale3d(1.1, 1.1, 1.1);
	}
    #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery .justified-gallery > a:hover .demo-gallery-poster > img {
		opacity: 1;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery .justified-gallery > a .demo-gallery-poster {
		background-color: rgba(0, 0, 0, 0.1);
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		-webkit-transition: background-color 0.15s ease 0s;
		-moz-transition: background-color 0.15s ease 0s;
		-o-transition: background-color 0.15s ease 0s;
		transition: background-color 0.15s ease 0s;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .demo-gallery .justified-gallery > a .demo-gallery-poster > img {
		left: 50%;
		margin-left: -10px;
		margin-top: -10px;
		opacity: 0;
		position: absolute;
		top: 50%;
		-webkit-transition: opacity 0.3s ease 0s;
		-moz-transition: opacity 0.3s ease 0s;
		-o-transition: opacity 0.3s ease 0s;
		transition: opacity 0.3s ease 0s;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery .justified-gallery > a:hover .demo-gallery-poster {
		background-color: rgba(0, 0, 0, 0.5);
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery    .demo-gallery .video .demo-gallery-poster img {
		height: 48px;
		margin-left: -24px;
		margin-top: -24px;
		opacity: 0.8;
		width: 48px;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .demo-gallery.dark > ul > li a {
		border: 3px solid #04070a;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery   .home .demo-gallery {
		padding-bottom: 80px;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: inline-block;
		position: relative;
		width: calc( calc(100% - calc(2 * 5px *  var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)) ) / var(--tsvg_g_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))!important;
		height: 100%;
		border:  var(--tsvg_g_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)	var(--tsvg_g_bd_t_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ;
		box-shadow: 0px 0px var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) ;
		-moz-box-shadow: 0px 0px var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		-webkit-box-shadow: 0px 0px var(--tsvg_g_sh_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_g_sh_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		margin: 5px;
		padding: 0;
		overflow: hidden;
		float: left;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='none']{ border-style: none;}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='solid']{ border-style: solid;}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dashed']{ border-style: dashed;}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dotted']{ border-style: dotted;}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff1'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 125% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff1'] {
		top: -25%;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff2'] {
		position: absolute;
		top: -25%;
		left: 0%;
		width: 100%;
		height: 125% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover  [ data-tsvg-img='zEff2'] {
		top: 0%;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff3'] {
		position: absolute;
		top: -15%;
		left: -15%;
		width: 130%;
		max-width:130%;
		height: 130% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover  [ data-tsvg-img='zEff3'] {
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff4'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff4'] {
		top: -15%;
		left: -15%;
		width: 130%;
		height: 130% !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff5'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff5'] {
		width: 130%;
		height: 130% !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff6'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff6'] {
		width: 130%;
		height: 130% !important;
		top: -30%;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff7'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff7'] {
		width: 130%;
		height: 130% !important;
		left: -30%;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff8'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
		transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-webkit-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-moz-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
		-ms-transition: all var(--tsvg_g_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-img='zEff8'] {
		width: 130%;
		height: 130% !important;
		left: -30%;
		top: -30%;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-img='zEff9'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100% !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-hover='zTitfHov1'] {
		position: absolute;
		bottom: -1%;
		left: 0%;
		width: 100%;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: left;
		background:  var(--tsvg_vto_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: #fff;
		transform: translateY(100%) !important;
		-webkit-transform: translateY(100%) !important;
		-moz-transform: translateY(100%) !important;
		-ms-transform: translateY(100%) !important;
		transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
		-webkit-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  linear;
		-moz-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
		-ms-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-hover='zTitfHov1'] {
		transform: translateY(0%) !important;
		-webkit-transform: translateY(0%) !important;
		-moz-transform: translateY(0%) !important;
		-ms-transform: translateY(0%) !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-hover='zTitfHov2'] {
		position: absolute;
		top: -1%;
		left: 0%;
		width: 100%;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: left;
		background:  var(--tsvg_vto_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: #fff;
		transform: translateY(-100%) !important;
		-webkit-transform: translateY(-100%) !important;
		-moz-transform: translateY(-100%) !important;
		-ms-transform: translateY(-100%) !important;
		transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
		-webkit-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
		-moz-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
		-ms-transition: all var(--tsvg_vto_e_tm_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) linear;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover [ data-tsvg-hover='zTitfHov2'] {
		transform: translateY(0%) !important;
		-webkit-transform: translateY(0%) !important;
		-moz-transform: translateY(0%) !important;
		-ms-transform: translateY(0%) !important;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-hover='zTitfHov3'] {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: left;
		background:  var(--tsvg_vto_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: #fff;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-hover='zTitfHov4'] {
		position: absolute;
		bottom: 0%;
		left: 0%;
		width: 100%;
		padding-top: 5px;
		padding-bottom: 5px;
		text-align: left;
		background: var(--tsvg_vto_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color: #fff;
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> figcaption span {
		margin-left: 5px;
		font-size:var(--tsvg_vto_fs_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		color:var(--tsvg_vto_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		font-family: var(--tsvg_vto_ff_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> [ data-tsvg-show='false'] {
		display: none;
	}
	
	 #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .TotalsofthLIcon1<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		float: right;
		padding: 5px;
		margin-right: 5px;
		font-size: var(--tsvg_pio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border: var(--tsvg_pio_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_pio_bd_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_pio_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		background: var(--tsvg_pio_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: 50%;
		color:var(--tsvg_pio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TotalsofthLIcon1<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='solid']{ border-style: solid;}
	.TotalsofthLIcon1<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dashed']{ border-style: dashed;}
	.TotalsofthLIcon1<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dotted']{ border-style: dotted;}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  .TotalsofthLIcon2<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		float: right;
		padding: 5px;
		margin-right: 5px;
		font-size: var(--tsvg_pio_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border: var(--tsvg_pio_bd_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>)  var(--tsvg_pio_bd_s_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) var(--tsvg_lio_bd_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		background: var(--tsvg_lio_bg_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
		border-radius: 50%;
		color: var(--tsvg_lio_c_<?php echo esc_attr( $Total_Soft_vgallery ); ?>);
	}
	.TotalsofthLIcon2<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='solid']{ border-style: solid;}
	.TotalsofthLIcon2<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dashed']{ border-style: dashed;}
	.TotalsofthLIcon2<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-effect='dotted']{ border-style: dotted;}
	.Tot_Vid_Gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href=''],.Tot_Vid_Gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> a[href='#']{ 
		display:none!important;
	}
	.TotalSoftGV_HLG_LM<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_07; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_08; ?>;
		font-size: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_09; ?>px;
		font-family: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_10; ?>;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15 != 'none' ) { ?>
		 	border: 1px solid<?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_16; ?>;
		<?php } else { ?>
		 	border: none !important;
		<?php } ?>
		cursor: pointer;
		display: block;
		padding: 3px !important;
		line-height: 1 !important;
	}
	.TotalSoftGV_HLG_LM<?php echo esc_attr( $Total_Soft_vgallery ); ?>:hover {
		background-color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_13; ?>;
		color: <?php echo $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_14; ?>;
	}
	@media screen and (max-width: 820px) {
		.zEff, .pagination li a {
			cursor: default;
		}
		.lg-actions<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-prev<?php echo esc_attr( $Total_Soft_vgallery ); ?>, .lg-actions<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-next<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			font-size: 15px;
		}
		.lg-outer<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-video<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
		.fhovZoom<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			margin: 5px 0;
		}
	}
	@media screen and (max-width: 400px) {
		.lg-outer<?php echo esc_attr( $Total_Soft_vgallery ); ?> .lg-video<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
			width: 100%;
			height: 0;
			padding-bottom: 56.25%;
			position: relative;
		}
	}
	.Tot_Vid_Gallery<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		display: block;
		text-align: center;
		<?php if ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 == 'fallPerspective' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 == 'fly' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 == 'flip' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 == 'helix' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } elseif ( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 == 'popUp' ) { ?>
			-webkit-perspective: 1300px;
			-moz-perspective: 1300px;
			perspective: 1300px;
		<?php } ?>
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
	$TS_VGallery_url_i                  = $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im == '' ? esc_url( plugins_url( 'img/tsvg_no_video.png', __DIR__ ) ) : esc_url( $ts_vgallery_Question_TS_VG_Options->TotalSoftVGallery_Vid_Im );
	$tsp_main_videos .= sprintf(
		"
        <li class='fhovZoom%s' data-tsvg-class='%s' data-tsvg-id='%s' data-src='%s' data-poster='%s' data-title='%s' style='-moz-animation-delay:  %ss;-webkit-animation-delay:  %ss;animation-delay:  %ss;'>
          	<figure class='TS_VGallery_block'>
          	  	<img  width='' height='' src='%s' alt='img' class='zEff' data-tsvg-img='%s' >
          	  	<figcaption  data-tsvg-hover='%s'>
          	   		<span data-tsvg-show='%s'>
          	  			%s
          	  		</span>
          	  		<i class='TotalsofthLIcon1%s %s' data-tsvg-effect ='%s'></i>
          	    	<a href='%s' class='TotalsofthLIcon2_link' target='%s'>
						<i class='TotalsofthLIcon2%s %s' data-tsvg-effect ='%s'>
						</i>
					</a>
          	  	</figcaption>
          	</figure>
        </li>
      	",
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $i ),
		esc_attr( $ts_galleryv_videos_Columned[ $key ]->id ),
		esc_url( $TS_VGallery_url_v ),
		esc_url( $TS_VGallery_url_i ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_attr( 0.3 * $i ),
		esc_url( $TS_VGallery_url_i ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_08 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_14 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_16 ),
		esc_html( html_entity_decode( htmlspecialchars_decode( $ts_galleryv_videos_Columned[ $key ]->TS_VG_SetName ), ENT_QUOTES ) ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_19 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 ),
		esc_url( $TS_VGallery_url_l ),
		esc_attr( $TS_VGallery_url_target ),
		esc_attr( $Total_Soft_vgallery ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_27 ),
		esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_22 )
	);
}
echo sprintf(
	"
    <main data-tsvg-autoplay='%s' class='%s '  data-item-open='%s'  data-tsvg-main='show' data-item-number='%s' data-pagination='%s' data-p-lm='%s'>
      	<figure  class='video-gallery-parent%s'>
      		<ul class='Tot_Vid_Gallery%s' data-tsvg-slduration='%s' data-tsvg-sldelIcType='%s' data-tsvg-slicLeftType='%s' data-tsvg-slicRightType='%s' data-tsvg-loop='%s' data-tsvg-title-show='%s' data-tsvg-autoplay='%s' >
      			%s  
      		</ul>
      	</figure>
    </main>
	",
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_37 ),
	'ts_vgallery_main_' . esc_attr( $Total_Soft_vgallery ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_07 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_02 ),
	esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
	esc_attr(  $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17 ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $Total_Soft_vgallery ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_29 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_32 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_38 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_39 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_38 ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_FG_PT ),
	esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_1_37 ),
	$tsp_main_videos
);
?>
