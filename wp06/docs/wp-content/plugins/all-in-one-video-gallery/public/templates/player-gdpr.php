<?php

/**
 * Video Player - GDPR Consent.
 *
 * @link     https://plugins360.com
 * @since    1.6.0
 *
 * @package All_In_One_Video_Gallery
 */

$image = '';

if ( isset( $_GET['poster'] ) ) {
	$image = $_GET['poster'];
} elseif ( ! empty( $post_meta ) ) {
    $image_data = aiovg_get_image( $post_id, 'large' );
	$image = $image_data['src'];
}

if ( ! empty( $image ) ) {
    $image = aiovg_resolve_url( $image );
} else {
    // YouTube
    if ( isset( $_GET['youtube'] ) ) {
        $src = urldecode( $_GET['youtube'] );
        $image = aiovg_get_youtube_image_url( $src );	
    }

    // Vimeo
    if ( isset( $_GET['vimeo'] ) ) {
        $src = urldecode( $_GET['vimeo'] );
        $image = aiovg_get_vimeo_image_url( $src );
    }

    // Dailymotion
    if ( isset( $_GET['dailymotion'] ) ) {
        $src = urldecode( $_GET['dailymotion'] );
        $image = aiovg_get_dailymotion_image_url( $src );
    }

    // Rumble
    if ( isset( $_GET['rumble'] ) ) {
        $src = urldecode( $_GET['rumble'] );
        $oembed = aiovg_get_rumble_oembed_data( $src );
        $image = $oembed['thumbnail_url'];
    }
}

$consent_message = apply_filters( 'aiovg_translate_strings', $privacy_settings['consent_message'], 'consent_message' );
$consent_button_label = apply_filters( 'aiovg_translate_strings', $privacy_settings['consent_button_label'], 'consent_button_label' );
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
        
    <?php if ( $post_id > 0 ) : ?>    
        <title><?php echo wp_kses_post( get_the_title( $post_id ) ); ?></title>    
        <link rel="canonical" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" />
    <?php endif; ?>

	<style type="text/css">
        html, 
        body {			
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important; 
			padding: 0 !important; 
			font-family: Verdana, Geneva, sans-serif;
			font-size: 14px;
            line-height: 1.5;
            overflow: hidden;
        }

        #privacy-wrapper {            
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #222;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        #privacy-consent-block {
            position: relative;
            width: 90%;
            max-width: 640px;
            height: auto;
            margin: 0;
            padding: 15px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 3px;   
            color: #fff;
            text-align: center;        
            box-sizing: border-box;
        }

        @media only screen and (max-width: 320px) {
            #privacy-consent-block {
                width: 100%;
                height: 100%;
            }
        }

        #privacy-consent-button {
            display: inline-block;
            margin-top: 10px;
            padding: 7px 15px;
            background: #e70808;	
            border: 0;
            border-radius: 3px;   
            box-shadow: none; 
            color: #fff;     
            line-height: 1; 
            cursor: pointer;  
        }

        #privacy-consent-button:hover {
            opacity: 0.8;
        }
    </style>
</head>
<body>    
	<div id="privacy-wrapper" style="background-image: url(<?php echo esc_attr( $image ); ?>);">
		<div id="privacy-consent-block" >
			<div id="privacy-consent-message"><?php echo wp_kses_post( trim( $consent_message ) ); ?></div>
			<button type="button" id="privacy-consent-button"><?php echo esc_html( $consent_button_label ); ?></button>
		</div>
	</div>
				
	<script type="text/javascript">
		/**
		* Set cookie for accepting the privacy consent.
		*
		* @since 1.6.0
		*/
		function ajaxSubmit() {	
            document.getElementById( 'privacy-consent-button' ).innerHTML = '...';

			var xmlhttp;

			if ( window.XMLHttpRequest ) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject( 'Microsoft.XMLHTTP' );
			};
			
			xmlhttp.onreadystatechange = function() {				
				if ( 4 == xmlhttp.readyState && 200 == xmlhttp.status ) {					
					if ( xmlhttp.responseText ) {
                        var url = window.location.href;
                        var separator = url.indexOf( '?' ) > -1 ? '&' : '?';

                        window.parent.postMessage( 'aiovg-cookie-consent', '*' );
						window.location.href = url + separator + 'refresh=1'; // Reload document
					}						
				}					
			};	

			xmlhttp.open( 'POST', '<?php echo admin_url( 'admin-ajax.php' ); ?>?action=aiovg_set_cookie&security=<?php echo wp_create_nonce( 'aiovg_ajax_nonce' ); ?>', true );
			xmlhttp.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			xmlhttp.send( 'action=aiovg_set_cookie' );							
		}
		
		document.getElementById( 'privacy-consent-button' ).addEventListener( 'click', ajaxSubmit );
	</script>
</body>
</html>
