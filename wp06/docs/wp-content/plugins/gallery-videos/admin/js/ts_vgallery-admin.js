(function($) {
	'use strict';
	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	$( document ).on(
		'click',
		'a[data-tsvg-action="copy"],a[data-tsvg-action="delete"],a[data-tsvg-action="edit-theme"]',
		function() {
			var ts_vgallery_action = $( this ).attr( 'data-tsvg-action' );
			$( '#ts_vgallery_confirm_content' ).find( '#TotalSoftGallery_Video_Option' ).remove();
			$( '#ts_vgallery_confirm_content' ).children( 'footer' ).find( 'form' ).removeClass( 'copy-theme' );
			if (ts_vgallery_action == 'copy') {
				document.querySelector( ':root' ).style.setProperty( '--ts_vgallery_action', '#5534a9' );
				$( '#ts_vgallery_confirm_content' ).children( 'header' ).children( 'div' ).html( `<i class="ts-vgallery ts-vgallery-files-o"></i>` );
				$( '#ts_vgallery_confirm_content' ).find( '.ts_vgallery_submit_btn' ).val( 'Copy' );
				$( '#ts_vgallery_action_input' ).val( 'bulk-copy' );
			} else if (ts_vgallery_action == 'edit-theme') {
				var ts_vgallery_theme=$( this ).attr( 'data-tsvg-theme' );
				$( '#ts_vgallery_confirm_content' ).children( 'footer' ).find( 'form' ).addClass( 'copy-theme' );
				$( '#ts_vgallery_confirm_content' ).children( 'header' ).children( 'div' ).html( `<i class="ts-vgallery ts-vgallery-files-o"></i>` );
				$( '#ts_vgallery_confirm_content' ).find( '.ts_vgallery_submit_btn' ).val( 'Copy theme' );
				$( '#ts_vgallery_action_input' ).val( 'bulk-edit-theme' );
				$( '#ts_vgallery_confirm_content' ).children( 'footer' ).find( '.ts_vgallery_cancel_btn' ).before(
					` <select  id="TotalSoftGallery_Video_Option" name="TotalSoftGallery_Video_Option" >
					<option value="Grid Video Gallery" > Grid Video Gallery </option>
					<option value="LightBox Video Gallery" > LightBox Video Gallery </option>
					<option value="Thumbnails Video" > Thumbnails Video </option>
					<option value="Content Popup" > Content Popup </option>
					<option value="Elastic Gallery" > Elastic Gallery </option>
					<option value="Fancy Gallery" > Fancy Gallery </option>
					<option value="Parallax Engine" > Parallax Engine </option>
					<option value="Classic Gallery" > Classic Gallery </option>
					<option value="Space Gallery" > Space Gallery </option>
					</select> `
				);
				$( "#TotalSoftGallery_Video_Option" ).attr( "selected", false );
				$( "#TotalSoftGallery_Video_Option option[ value='" + ts_vgallery_theme + "']" ).attr( "selected", true );
			} else {
				document.querySelector( ':root' ).style.setProperty( '--ts_vgallery_action', '#ff0000' );
				$( '#ts_vgallery_confirm_content' ).children( 'header' ).children( 'div' ).html( `<i class="ts-vgallery ts-vgallery-trash"></i>` );
				$( '#ts_vgallery_confirm_content' ).find( '.ts_vgallery_submit_btn' ).val( 'Delete' );
				$( '#ts_vgallery_action_input' ).val( 'bulk-delete' );
			}
			$( '#ts_vgallery_confirm_content' ).children( 'main' ).html( `Do you really want to ${ts_vgallery_action} this records ? This process cannot be undone.` )
			$( '#ts_vgallery_actioned_item' ).val( $( this ).attr( 'data-tsvg-id' ) );
			$( '#ts_vgallery_confirm_modal' ).css( 'display', '' );
		}
	);
	$( document ).on(
		'click',
		'#ts_vgallery_confirm_content',
		function(event) {
			event.stopPropagation();
		}
	);
	$( document ).on(
		'click',
		'#ts_vgallery_confirm_modal',
		function() {
			$( '#ts_vgallery_confirm_content' ).addClass( 'ts_vgallery_shake_anim' );
			setTimeout(
				() => {
                $( '#ts_vgallery_confirm_content' ).removeClass( 'ts_vgallery_shake_anim' );
				},
				500
			);
		}
	);
	$( document ).on(
		'click',
		'.ts_vgallery_cancel_btn,#ts_vgallery_close_btn',
		function() {
			$( '#ts_vgallery_confirm_modal' ).css( 'display', 'none' );
		}
	);
	var tsp_clicked=0;
	$( document ).on(
		'click',
		'.ts_vgallery_submit_btn',
		function() {
			if (tsp_clicked >= 1) {
				$( this ).prop( 'disabled', true );
			}
			tsp_clicked++;
		}
	);
	$( document ).on(
		'click',
		'#ts_vgallery_form td.column-id>span',
		function(event) {
			event.stopPropagation();
			event.preventDefault();
			$( this ).html( "Copied!" );
			var tsp_create_input=document.createElement( "input" );
			tsp_create_input.setAttribute( "value", `[TS_Video_Gallery id="${$(this).attr("data-tsvg-id")}"]` );
			document.body.appendChild( tsp_create_input );
			tsp_create_input.select();
			document.execCommand( "copy" );
			document.body.removeChild( tsp_create_input );
			setTimeout(
				() => {
                $( this ).html( "Copy!" );
				},
				1000
			);
		}
	);
})( jQuery );
