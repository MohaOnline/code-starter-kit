<style type="text/css">
	.tsvg_flex_col {
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-align-content: center;
		-ms-flex-line-pack: center;
		align-content: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.tsvg_flex_row {
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-align-content: center;
		-ms-flex-line-pack: center;
		align-content: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}
	/* Main CSS */
	.ts_vgallery_select_popup_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-popup-select='hide'], .ts_vgallery_before_popup_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-popup-back='hide'],main[data-tsvg-main='hide']{
		display:none;
	}
	.ts_vgallery_select_popup_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-popup-select='show'], .ts_vgallery_before_popup_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>[data-tsvg-popup-back='show'],main[data-tsvg-main='show']{
		display:block;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> {
		width: 100%!important;
		max-width: 100%!important;
		display:flex;
		flex-direction: column;
		height: auto;
		position: relative;
		padding: 0;
		margin: 0;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery    main.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> >figure> ul,#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery nav > ul {
        margin: 0;
        margin-left:calc(100% -  calc( var(--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>) * calc(calc(100% - var(--tsvg_general_place_between_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))  / var(--tsvg_general_img_w_<?php echo esc_attr( $Total_Soft_vgallery ); ?>))));
    }

	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> > figure > ul{
		padding: unset !important;
	}

	
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery	 main.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> >figure> ul>li, #grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery nav > ul>li{
	  	/* margin-left:0!important; */
		/* margin-bottom: 6px !important */
	}
	.pagination > li{
		margin-bottom: 6px !important;
	}
	.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?> a{
		text-decoration: none!important;
	}
	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery	main.ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?>{
	  	margin-top:20px;
	}
	.TS_VGallery__Content *:not(.TS_VGallery_grid<?php echo $Total_Soft_vgallery; ?>-wrap *) {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
	}
   	#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery  #TS_VGallery_pagination<?php echo esc_attr( $Total_Soft_vgallery ); ?> li {
		border: none !important;
		list-style: none !important;
		display: inline-block !important;
		padding: 0 !important
	}

	<?php if( $tsvgallery_TS_VG_Old_User=='yes'){?>
		#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination-outer li a {
			box-shadow:unset;
		}
	<?php } ?>

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='fadeIn'] >figure> ul>li{
		opacity: 0;
		animation: old-fadeIn 0.65s ease  0s forwards;
		-webkit-animation:  old-fadeIn 0.65s ease  0s forwards;
		-moz-animation:  old-fadeIn 0.65s ease  0s forwards;
		-webkit-transform: none !important;
		-moz-transform: none !important;
		transform: none !important;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='moveUp'] >figure> ul>li{
		opacity: 0;
		-webkit-transform: translateY(200px);
		-moz-transform: translateY(200px);
		transform: translateY(200px);
		animation: old-moveUp 0.65s ease  0s forwards;
		-webkit-animation: old-moveUp 0.65s ease  0s forwards;
		-moz-animation: old-moveUp 0.65s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='scaleUp'] >figure> ul>li{
		opacity: 0;
		-webkit-transform: scale(0.6);
		-moz-transform: scale(0.6);
		transform: scale(0.6);
		animation: old-scaleUp 0.65s ease  0s forwards;
		-webkit-animation: old-scaleUp 0.65s ease  0s forwards;
		-moz-animation: old-scaleUp 0.65s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='fallPerspective'] >figure> ul>li{
		opacity: 0;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		-moz-transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		transform: translateZ(400px) translateY(300px) rotateX(-90deg);
		animation:  0.8s ease-in-out 0.2s 1 normal forwards running  old-fallPerspectives;
		-webkit-animation:  0.8s ease-in-out 0.2s 1 normal forwards running  old-fallPerspective;
		-moz-animation:  0.8s ease-in-out 0.2s 1 normal forwards running  old-fallPerspective;
	
	}


	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='fly'] >figure> ul>li{
		opacity: 0;
		-webkit-transform-style: preserve-3d!important;
		-moz-transform-style: preserve-3d!important;
		transform-style: preserve-3d!important;
		-webkit-transform-origin: 50% 50% -300px!important;
		-moz-transform-origin: 50% 50% -300px!important;
		transform-origin: 50% 50% -300px!important;
		-webkit-transform: rotateX(-180deg);
		-moz-transform: rotateX(-180deg);
		transform: rotateX(-180deg);
		animation: old-fly 0.8s ease  0s forwards;
		-webkit-animation: old-fly 0.8s ease  0s forwards;
		-moz-animation: old-fly 0.8s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='flip'] >figure> ul>li{
		opacity: 0;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transform-origin: 0% 0%;
		-moz-transform-origin: 0% 0%;
		transform-origin: 0% 0%;
		-webkit-transform: rotateX(-80deg);
		-moz-transform: rotateX(-80deg);
		transform: rotateX(-80deg);
		animation: old-flip 0.8s ease  0s forwards;
		-webkit-animation: old-flip 0.8s ease  0s forwards;
		-moz-animation: old-flip 0.8s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='helix'] >figure> ul>li{
		opacity: 0;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transform: rotateY(-180deg);
		-moz-transform: rotateY(-180deg);
		transform: rotateY(-180deg);
		animation: old-helix 0.8s ease  0s forwards;
		-webkit-animation: old-helix 0.8s ease  0s forwards;
		-moz-animation: old-helix 0.8s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='popUp'] >figure> ul>li{
		opacity: 0;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transform: scale(0.4);
		-moz-transform: scale(0.4);
		transform: scale(0.4);
		animation: old-popUp 0.8s ease  0s forwards;
		-webkit-animation: old-popUp 0.8s ease  0s forwards;
		-moz-animation: old-popUp 0.8s ease  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='animno'] >figure> ul>li{
		display: block;
		animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-webkit-animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-moz-animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='animno'] >figure> ul>li{
		display: block;
		opacity: 0;
		animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-webkit-animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-moz-animation: animno 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='animsc'] >figure> ul>li{
		display: block;
		opacity: 0;
		animation: animsc 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-webkit-animation: animsc 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-moz-animation: animsc 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
	}

	#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery main.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-p-lm='animtr'] >figure> ul>li{
		display: block;
		opacity: 0;
		animation: animtr 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-webkit-animation: animtr 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
		-moz-animation: animtr 3s cubic-bezier(0.77, 0.35, 0, 1.6)  0s forwards;
	}

	@media only screen and (max-width: 400px) {
		#grid<?php echo esc_attr( $Total_Soft_vgallery ); ?>-gallery .ts_vgallery_main_<?php echo esc_attr( $Total_Soft_vgallery ); ?> > figure > ul{
			padding: 0 !important;
		}
	}
	@-webkit-keyframes animate-height { 0% {transform: scaleY(0); } 100% {transform: scaleY(1); opacity: 1; } }
	@-moz-keyframes animate-height { 0% {transform: scaleY(0); } 100% {transform: scaleY(1); opacity: 1; } }
	@keyframes animate-height { 0% {transform: scaleY(0); } 100% { transform: scaleY(1);opacity: 1; } }
	@-webkit-keyframes old-fadeIn { 0% { } 100% { opacity: 1; } }
	@-moz-keyframes old-fadeIn { 0% { } 100% { opacity: 1; } }
	@keyframes old-fadeIn { 0% { } 100% { opacity: 1; } }
	@-webkit-keyframes old-moveUp { 0% { } 100% { -webkit-transform: translateY(0); opacity: 1; } }
	@-moz-keyframes old-moveUp { 0% { } 100% { -moz-transform: translateY(0); opacity: 1; } }
	@keyframes old-moveUp { 0% { } 100% { -webkit-transform: translateY(0); transform: translateY(0); opacity: 1; } }
	@-webkit-keyframes old-scaleUp { 0% { } 100% { -webkit-transform: scale(1); opacity: 1; } }
	@-moz-keyframes old-scaleUp { 0% { } 100% { -moz-transform: scale(1); opacity: 1; } }
	@keyframes old-scaleUp { 0% { } 100% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } }
	@-webkit-keyframes old-fallPerspective { 0% { } 100% { -webkit-transform: translateZ(0px) translateY(0px) rotateX(0deg); opacity: 1; } }
	@-moz-keyframes old-fallPerspective { 0% { } 100% { -moz-transform: translateZ(0px) translateY(0px) rotateX(0deg); opacity: 1; } }
	@keyframes old-fallPerspective { 0% { } 100% { -webkit-transform: translateZ(0px) translateY(0px) rotateX(0deg); transform: translateZ(0px) translateY(0px) rotateX(0deg); opacity: 1; } }
	@-webkit-keyframes old-fly { 0% { } 100% { -webkit-transform: rotateX(0deg); opacity: 1; } }
	@-moz-keyframes old-fly { 0% { } 100% { -moz-transform: rotateX(0deg); opacity: 1; } }
	@keyframes old-fly { 0% { } 100% { -webkit-transform: rotateX(0deg); transform: rotateX(0deg); opacity: 1; } }
	@-webkit-keyframes old-flip { 0% { } 100% { -webkit-transform: rotateX(0deg); opacity: 1; } }
	@-moz-keyframes old-flip { 0% { } 100% { -moz-transform: rotateX(0deg); opacity: 1; } }
	@keyframes old-flip { 0% { } 100% { -webkit-transform: rotateX(0deg); transform: rotateX(0deg); opacity: 1; } }
	@-webkit-keyframes old-helix { 0% { } 100% { -webkit-transform: rotateY(0deg); opacity: 1; } }
	@-moz-keyframes old-helix { 0% { } 100% { -moz-transform: rotateY(0deg); opacity: 1; } }
	@keyframes old-helix { 0% { } 100% { -webkit-transform: rotateY(0deg); transform: rotateY(0deg); opacity: 1; } }
	@-webkit-keyframes old-popUp {
		0% { }
		70% { -webkit-transform: scale(1.1); opacity: .8; -webkit-animation-timing-function: ease-out; }
		100% { -webkit-transform: scale(1); opacity: 1; }
	}
	@-moz-keyframes old-popUp {
		0% { }
		70% { -moz-transform: scale(1.1); opacity: .8; -moz-animation-timing-function: ease-out; }
		100% { -moz-transform: scale(1); opacity: 1; }
	}
	@keyframes old-popUp {
		0% { }
		70% { transform: scale(1.1); opacity: .8; animation-timing-function: ease-out; }
		100% { transform: scale(1); opacity: 1; }
	}

	@-webkit-keyframes animtr {
		0% {
			-webkit-transform: translateY(100px);
			-moz-transform: translateY(100px);
			transform: translateY(100px);
		}
		70% {
			-webkit-transform: translateY(0px);
			-moz-transform: translateY(0px);
			transform: translateY(0px);
		}
		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes animtr {
		0% {
			-moz-transform: translateY(100px);
			-moz-transform: translateY(100px);
			-moz-transform: translateY(100px);
		}
		70% {
			-moz-transform: translateY(0px);
			-moz-transform: translateY(0px);
			-moz-transform: translateY(0px);
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes animtr {
		0% {
			-webkit-transform: translateY(100px);
			-moz-transform: translateY(100px);
			transform: translateY(100px);
		}
		70% {
			-webkit-transform: translateY(0px);
			-moz-transform: translateY(0px);
			transform: translateY(0px);
		}
		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes animsc {
		0% {
			-webkit-transform: scale(0.7);
			-moz-transform: scale(0.7);
			transform: scale(0.7);
		}
		50% {
			-webkit-transform: scale(1.2);
			-moz-transform: scale(1.2);
			transform: scale(1.2);
		}
		70% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			transform: scale(1);
		}
		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes animsc {
		0% {
			-moz-transform: scale(0.7);
			-moz-transform: scale(0.7);
			-moz-transform: scale(0.7);
		}
		50% {
			-moz-transform: scale(1.2);
			-moz-transform: scale(1.2);
			-moz-transform: scale(1.2);
		}
		70% {
			-moz-transform: scale(1);
			-moz-transform: scale(1);
			-moz-transform: scale(1);
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes animsc {
		0% {
			-webkit-transform: scale(0.7);
			-moz-transform: scale(0.7);
			transform: scale(0.7);
		}
		50% {
			-webkit-transform: scale(1.2);
			-moz-transform: scale(1.2);
			transform: scale(1.2);
		}
		70% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			transform: scale(1);
		}
		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes animno {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
		}
		70% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes animno {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
		}
		70% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes animno {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
		}
		70% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

</style>