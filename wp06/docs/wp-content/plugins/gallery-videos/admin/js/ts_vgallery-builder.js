(function ($) {
	'use strict';
	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write $ code here, so the
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
	var resizeContentPreview;
	if (typeof tsvgallery_builder_json !== 'undefined') {
		resizeContentPreview = function () {
			let tsvg_TS_VG_Options = JSON.parse(tsvgallery_builder_json.tsvg_proporties.TS_VG_Option);
			switch (tsvg_TS_VG_Options.TS_vgallery_Q_Theme) {
				case 'Grid Video Gallery':
					resizeGridForAdmin();
					break;
			}
		}
	}
	$(window).load(
		function () {
			$('#tsvg_loader').hide();
			$('#tsvg_builder_section').removeAttr('style');
			if ($(window).width() <= 1024 && typeof tsvgallery_builder_json !== 'undefined') {
				document.getElementById("tsvg_sidebar").dataset.tsvgOpen = "close";
				setTimeout(() => {
					resizeContentPreview();
				}, 1000);
			}
		}
	);
	// tsvg Sidebar switcher
	$(document).on(
		'click',
		'#tsvg_switch_sidebar',
		function () {
			if (document.getElementById("tsvg_sidebar").dataset.tsvgOpen == "open") {
				document.getElementById("tsvg_sidebar").dataset.tsvgOpen = "close";
				if (typeof tsvgallery_builder_json !== 'undefined') {
					setTimeout(() => {
						resizeContentPreview();
					}, 500);
				}
			} else if (document.getElementById("tsvg_sidebar").dataset.tsvgOpen == "close") {
				if ($(window).width() <= 1024 && typeof tsvgallery_builder_json !== 'undefined') {
					toastr["warning"]('Current window width is not support switch sidebar.', 'Warning', tsvg_toastr_options);
					return;
				}
				document.getElementById("tsvg_sidebar").dataset.tsvgOpen = "open";
				if (typeof tsvgallery_builder_json !== 'undefined') {
					setTimeout(() => {
						resizeContentPreview();
					}, 500);
				}
			}
		}
	);
	$(window).on("resize", function () {
		if ($(window).width() <= 1024 && document.getElementById("tsvg_sidebar").dataset.tsvgOpen === "open" && typeof tsvgallery_builder_json !== 'undefined') {
			document.getElementById("tsvg_sidebar").dataset.tsvgOpen = "close";
			if (typeof tsvgallery_builder_json !== 'undefined') {
				setTimeout(() => {
					resizeContentPreview();
				}, 500);
			}
		}
	});
	// tsvg Toastr
	var tsvg_toastr_options = { "closeButton": true, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-right", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut", },
		tsvg_theme_settings = [],
		tsvg_theme_option_style = [];
	var docElem = window.document.documentElement;
	$(document).on(
		'click',
		'div.tsvg_sidebar_item:not(".tsvg_active")',
		function () {
			if (typeof tsvgallery_builder_json !== 'undefined') {
				if ($(this).attr('data-tsvg-item') == "theme") {
					toastr["warning"]('You are already choose theme.', 'Warning', tsvg_toastr_options);
				} else {
					var tsvg_TS_VG_SetType = tsvgallery_builder_json.tsvg_proporties.id;
					switch ($(this).attr('data-tsvg-item')) {
						case "field":
						case "style":
						case "pagination":
						case "popup":
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} main`).attr('data-tsvg-main', 'hide');
							$(`.tsvg_preview_content`).css('width', '100%');
						case "setting":
						case "shortcode":
							$('div.tsvg_sidebar_item').removeClass('tsvg_active');
							$(this).addClass('tsvg_active');
							$('.tsvg_content').removeClass('active');
							$('.tsvg_content[data-tsvg-section="field_style"]').addClass('active');
							$('.tsvg_content_subsection.active').removeClass('active');
							$('.tsvg_content_subsection[data-tsvg-subsection="' + $(this).attr('data-tsvg-item') + '"]').addClass('active');
							break;
						case "info":
							toastr["warning"]('vgallery statistics field is pro feature.', 'Info', { "closeButton": true, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-full-width", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut", });
							break;
						case "results":
							toastr["warning"]('vgallery results field is pro feature.', 'Info', { "closeButton": true, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-full-width", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut", });
							break;
						default:
							$('.tsvg_content[data-tsvg-section="' + $(this).attr('data-tsvg-item') + '"]').addClass('active');
							break;
					}
					if ($(this).attr('data-tsvg-item') != 'popup') {
						$(`.tsvg_preview_content`).css('width', '70%');
						$(`.ts_vgallery_select_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-select', 'hide');
						$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} main`).attr('data-tsvg-main', 'show');
						hidePopup(tsvg_TS_VG_SetType);
					} else {
						if (tsvg_theme_settings['TotalSoft_VGallery_Set_04'].length === 0 || !tsvg_theme_settings['TotalSoft_VGallery_Set_04'].trim()) {
							$(`.ts_vgallery_select_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-select', 'show');
						} else {
							showPopup(tsvg_TS_VG_SetType, tsvg_theme_settings['TotalSoft_VGallery_Set_04']);
						}
					}
				}
			} else {
				toastr["warning"]('Please Choose a theme for more experiance.', 'Warning', tsvg_toastr_options);
			}
		}
	);
	function hidePopup(tsvg_TS_VG_SetType) {
		let tsvg_selected_popup = '';
		if (jQuery("figure[data-popup-content='builder-show']").length) {
			tsvg_selected_popup = jQuery("figure[data-popup-content='builder-show']").attr('data-popup-label');
		}
		$(`.ts_vgallery_before_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-back', 'hide');
		$('.tsvg_content_subsection[data-tsvg-subsection="' + tsvg_selected_popup + '"]').removeClass('active');
		if (tsvg_selected_popup == 'Popup 1') {
			jQuery(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}`).removeClass(`TS_VGallery_slideshow${tsvg_TS_VG_SetType}-open`);
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} .TS_VGallery_item`).removeClass(`TS_VGallery_current_${tsvg_TS_VG_SetType} TS_VGallery_show`).removeAttr('style');
		}
	}
	function showPopup(tsvg_TS_VG_SetType, tsvg_selected_popup) {
		$(`.ts_vgallery_select_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-select', 'hide');
		$('.tsvg_content_subsection.active').removeClass('active');
		$('.tsvg_content_subsection[data-tsvg-subsection="' + tsvg_selected_popup + '"]').addClass('active');
		$(`.ts_vgallery_before_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-back', 'show');
		if (tsvg_selected_popup == 'Popup 1') {
			jQuery(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}`).attr('data-popup-content', 'builder-show')
			let div_curent = jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).find('.tsvg-0').addClass(`TS_VGallery_current_${tsvg_TS_VG_SetType} TS_VGallery_show`);
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).find('.tsvg-0').prevAll().attr('style', 'transform:translate3d(-' + Number(getViewportW() / 1 + jQuery(div_curent).width() / 2) + 'px, 0, -300px)');
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).find('.tsvg-0').prev().addClass(`TS_VGallery_slideshow${tsvg_TS_VG_SetType}-open`).attr('style', 'transform:translate3d(-' + Number(getViewportW() / 2 + jQuery(div_curent).width() / 1.5) + 'px, 0, -300px); height: ');
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).find('.tsvg-0').nextAll().attr('style', 'transform:translate3d(+' + Number((getViewportW()) / 1 - jQuery(div_curent).width() / 2) + 'px, 0, -300px)');
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).find('.tsvg-0').next().addClass(`TS_VGallery_slideshow${tsvg_TS_VG_SetType}`).attr('style', 'transform:translate3d(+' + Number((getViewportW()) / 2 - jQuery(div_curent).width() / 3) + 'px, 0, -300px)');
			jQuery(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}`).addClass(`TS_VGallery_slideshow${tsvg_TS_VG_SetType}-open`);
			jQuery(`.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}`).addClass('.TS_VGallery_animatable');
		}
	}
	function getViewportW() {
		var client = docElem['clientWidth'], inner = window['innerWidth'];
		if (client < inner) {
			return inner;
		} else {
			return client;
		}
	}
	// Tmce editor content set/get
	function tsvg_Tmce_getContent(editor_id, textarea_id) {
		if (typeof editor_id == 'undefined') {
			editor_id = wpActiveEditor;
		}
		if (typeof textarea_id == 'undefined') {
			textarea_id = editor_id;
		}
		if (jQuery('#wp-' + editor_id + '-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id)) {
			return tinyMCE.get(editor_id).getContent();
		} else {
			return jQuery('#' + textarea_id).val();
		}
	}
	function tsvg_Tmce_setContent(content, editor_id, textarea_id) {
		if (typeof editor_id == 'undefined') {
			editor_id = wpActiveEditor;
		}
		if (typeof textarea_id == 'undefined') {
			textarea_id = editor_id;
		}
		if (jQuery('#wp-' + editor_id + '-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id)) {
			return tinyMCE.get(editor_id).setContent(content);
		} else {
			return jQuery('#' + textarea_id).val(content);
		}
	}
	$(function () {
		if (typeof tsvgallery_builder_json !== 'undefined') {
			var tsvg_styles = tsvgallery_builder_json.tsvg_proporties.TS_VG_Style,
				tsvg_videos = tsvgallery_builder_json.tsvg_videos,
				tsvg_votes = tsvgallery_builder_json.tsvg_votes,
				tsvg_colors = tsvgallery_builder_json.tsvg_colors,
				tsvg_TS_VG_Options = JSON.parse(tsvgallery_builder_json.tsvg_proporties.TS_VG_Option),
				tsvg_video_sort = tsvgallery_builder_json.tsvg_proporties.TS_VG_Sort,
				tsvg_TS_VG_SetType = tsvgallery_builder_json.tsvg_proporties.id,
				tsvg_delete_ids = [],
				tsvg_theme_name = tsvg_TS_VG_Options.TS_vgallery_Q_Theme;
			tsvg_theme_settings = JSON.parse(tsvgallery_builder_json.tsvg_proporties.TS_VG_Settings);
			tsvg_theme_option_style = JSON.parse(tsvgallery_builder_json.tsvg_proporties.TS_VG_Option_Style);
			if (tsvgallery_builder_json.tsvg_creation != "save") {
				$("input#tsvg_global_shortcode").val(`[TS_Video_Gallery id="${tsvg_TS_VG_SetType}"]`);
				$("input#tsvg_global_theme_shortcode").val(`<?php echo do_shortcode( '[TS_Video_Gallery id="${tsvg_TS_VG_SetType}"]' ); ?>`);
				$('.tsvg_content_subsection[data-tsvg-subsection="shortcode"] > div[data-tsvg-field="notice"]').remove();
			} else {
				$('.tsvg_content_subsection[data-tsvg-subsection="shortcode"] > div[data-tsvg-field="shortcode"]').remove();
			}
			var tsvg_videos_props_arr = Object();
			Object.keys(tsvgallery_builder_json.tsvg_proporties.Question_Videos).map((key) => tsvg_videos_props_arr[key] = tsvgallery_builder_json.tsvg_proporties.Question_Videos[key]);
			var tsvg_icons = [];
			var tsvg_emojies = [];
			tsvg_icons = Object.values(tsvgallery_builder_json.fonts.tsvg_fonts.tsvg_fontawesome);
			tsvg_emojies = Object.values(tsvgallery_builder_json.fonts.tsvg_fonts.tsvg_emojies);
			var tsvg_all_fonts = Object.assign(tsvgallery_builder_json.fonts.tsvg_fonts.tsvg_fontawesome, tsvgallery_builder_json.fonts.tsvg_fonts.tsvg_emojies);
			var tsvg_edit_elem_id = "";
			var $tsvg_frame = $('#tsvg_content_area_ifr');
			var $tsvg_body = $('body');
			if ($tsvg_frame[0]) {
				var tsvg_doc = $tsvg_frame[0].contentWindow.document;
				$tsvg_body = $('body', tsvg_doc);
			}
			let tsvgActiveSize = "desktop";

			$(document).on(
				'click',
				'.tsvg_preview_content_sizes > .tsvg_preview_content_size',
				function (e) {
					if (tsvgActiveSize !== $(e.target).attr("data-tsvg-size")) {
						tsvgActiveSize = $(e.target).attr("data-tsvg-size");
						$('.tsvg_preview_content_sizes > .tsvg_preview_content_size_active').removeClass("tsvg_preview_content_size_active");
						$(`.tsvg_preview_content_sizes > .tsvg_preview_content_size[data-tsvg-size="${tsvgActiveSize}"]`).addClass("tsvg_preview_content_size_active");
						let root = document.documentElement;
						switch (tsvgActiveSize) {
							case "desktop":
								root.style.setProperty('--tsvg_shortcode_width', "100%");
								break;
							case "tablet":
								root.style.setProperty('--tsvg_shortcode_width', "475px");
								break;
							case "mobile":
								root.style.setProperty('--tsvg_shortcode_width', "375px");
								break;
							default:
								break;
						}
						resizeContentPreview();
					}
				}
			);
			function tsvgGetKeyByValue(object, value) {
				return Object.keys(object).find(key => object[key] === value);
			}
			function tsvgSetImage(type, id, url, width, height) {
				jQuery('.wpv-video-frame').last().remove();
				if (type == "library") {
					jQuery('input#tsvg_video_attachment_id').val(id);
				} else if (type == "embed") {
					jQuery('input#tsvg_video_attachment_id').val(url);
				}
				if (tsvg_theme_name == "Image Without Button") {
					tsvg_embed_data.tsvg_embed[`tsvg_embed_id_${tsvg_edit_elem_id}`] = ` <div class="tsvg_embed_popup_inner_${tsvg_edit_elem_id} tsvg_video_popup_embed" ><img src="${url}" alt="No Image avaible" ></div> `;
				}
				document.documentElement.style.setProperty('--tsvg_img_aspect_ratio', `${height} / ${width}`);
				$(".tsvg_img_change > img").attr("src", url);
				$("div.tsvg_img_loading_div").attr("style", "display:none;");
				if (tsvg_theme_name == "Image in Question") {
					// $(`header.ts_vgallery_header_${tsvg_TS_VG_SetType} > div.ts_vgallery_img_div_${tsvg_TS_VG_SetType} > img`).attr("src", url);
					// tsvg_TS_VG_Options.TotalSoftVGallery_Q_Im = url;
					// $('.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").height(`${$('.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").children(".tsvg_accordion_items").prop("scrollHeight")}px`);
				} else {
					tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Im = url;
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  ul li[data-tsvg-id='${tsvg_edit_elem_id}']  img`).attr("src", tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Im);
					if (tsvg_theme_name == 'Elastic Gallery') {
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-poster", tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Im);
					}
					if (tsvg_theme_name == 'Fancy Gallery') {
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  ul li[data-tsvg-id='${tsvg_edit_elem_id}']  figure`).attr("data-thumbnail", url)
					}
					if (tsvg_theme_name == 'Grid Video Gallery') {
						if ($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}']`).find(".TotalSoft_GV_SG_Imagediv").length) {
							if ($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Imagediv`).hasClass("TotalSoft_iframe-field")) {
								$(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}']`).find(".TotalSoft_bgr_iframe").attr("src", url);
							}
							else {
								$(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}']`).find(".TotalSoft_GV_SG_Imagediv img").attr("src", url);
							}
						}
						else {
							$(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}']`).find(".TotalSoft_GV_SG_Videodiv video").attr("poster", url);
						}
					}
				}
			}
			function tsvgAddNewVideo(tsvg_action, tsvg_title, tsvg_copied_id = "") {
				var tsvg_new_video_id = `new-${Math.floor(Math.random() * 900000) + 100000}`,
					tsvg_resalt_after_vote = $("input#TotalSoft_vgallery_Set_01[type='checkbox']").is(":checked"),
					tsvg_checkbox_type = $("input#ts_vgallery_ch_cm[type='checkbox']").is(":checked") == false ? "radio" : "checkbox",
					tsvg_no_result_text = $("input#TotalSoft_vgallery_Set_05[type='text']").val(),
					tsvg_style_special = [],
					tsvg_elem_vd_link = '',
					tsvg_elem_delay = 0.3 * $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li`).length,
					tsvg_new_title_name = tsvg_title,
					tsvg_elem_img_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_img : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] img`).attr("src"),
					tsvg_new_element = "",
					tsvg_new_popup_element = "";
				if (tsvg_action == "copy") {
					let tsvg_new_props = JSON.parse(JSON.stringify(tsvg_videos_props_arr[tsvg_copied_id]));
					tsvg_new_props.id = `${tsvg_new_video_id}`;
					tsvg_videos_props_arr[`${tsvg_new_video_id}`] = tsvg_new_props;
					$(`.tsvg-list-item[aria-tsvg-video="${tsvg_copied_id}"]`).clone(true).attr("aria-tsvg-video", tsvg_new_video_id).appendTo("#tsvg-list");
					document.documentElement.style.setProperty(`--tsvg_a_c_${tsvg_TS_VG_SetType}-${tsvg_new_video_id}`, getComputedStyle(document.documentElement).getPropertyValue(`--tsvg_a_c_${tsvg_TS_VG_SetType}-${tsvg_copied_id}`));
					toastr["success"]('Video successfully copied.', 'Success', tsvg_toastr_options);
				} else {
					var tsvg_new_props = {
						id: tsvg_new_video_id,
						TS_VG_SetType: tsvg_TS_VG_SetType,
						TS_VG_Options: { TotalSoftVGallery_Vid_Im: '', TotalSoftVGallery_Vid_Vd: '', TotalSoftVGallery_Vid_vont: '', TotalSoftVGallery_Vid_link: '', TotalSoftVGallery_Vid_vd_em: '', TotalSoftVGallery_Vid_desc: '', TotalSoftVGallery_Vid_Cl: '#23a24d' },
						TS_VG_SetName: tsvg_title,
					};
					tsvg_videos_props_arr[`${tsvg_new_video_id}`] = tsvg_new_props;
					$("#tsvg-list").append(
						`
							<div class="tsvg-list-item" aria-tsvg-video = "${tsvg_new_video_id}" >
							<div class="tsvg_handle_list tsvg_list_action flex-center ui-sortable-handle" > <img src="${tsvgallery_builder_json.tsvg_svg_move}" ></div>
							<div class="details tsvg_analytics_flex_r"> <h2> ${tsvg_new_title_name} </h2></div>
							<div class="tsvg_list_action flex-center" data-tsvg-action="edit" ><img src="${tsvgallery_builder_json.tsvg_svg_edit}" ></div>
							<div class="tsvg_list_action flex-center" data-tsvg-action="copy" ><img src="${tsvgallery_builder_json.tsvg_svg_copy}" ></div>
							<div class="tsvg_list_action flex-center" data-tsvg-action="delete" ><img src="${tsvgallery_builder_json.tsvg_svg_remove}" ></div>
							</div>
							`
					);
					document.documentElement.style.setProperty(`--tsvg_a_c_${tsvg_TS_VG_SetType}-${tsvg_new_video_id}`, "#23a24d");
					toastr["success"]('New video successfully added.', 'Success', tsvg_toastr_options);
				}
				switch (tsvg_theme_name) {
					case 'Grid Video Gallery':
						var tsvg_eftsvg_effect = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_popup_link_name = 'View More',
							tsvg_popup_bool = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_23'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_popup_ef_2 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_29'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_popup_bool = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_22'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_popup_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_27'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_popup_effect = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_bool = $("#TotalSoft_GV_1_40").val() == 'on' ? 'true' : 'false',
							tsvg_elem_link = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_bool = tsvg_elem_link ? 'true' : 'false',
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target"),
							tsvg_elem_descp = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] figcaption`).html(),
							tsvg_title = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_14'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_elem_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_GV_ClG_Div2_desc`).html();
						let tsvg_elem_vid_link = ' ';
						let tsvg_elem_img = " ";
						let media_elem = " ";
						let media_element_class = " ";

						if (tsvg_action == "add") {
							media_elem = `<div class="TotalSoft_GV_SG_Imagediv"><img width="" height="" src="${tsvgallery_builder_json.tsvg_no_video}" alt="${tsvg_new_title_name}" ></img></div>`;
							media_element_class = 'imagecontainer';
						}
						else {
							if ($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_copied_id}']`).find(".TotalSoft_GV_SG_Imagediv").length) {
								if ($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Imagediv`).hasClass("TotalSoft_iframe-field")) {
									tsvg_elem_vid_link = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_iframe-field `).attr("data-creat_src");
									tsvg_elem_img = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Imagediv .TotalSoft_bgr_iframe`).attr("src");
									let image_load = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Imagediv .TotalSoft_loder`).attr("src");
									media_elem = `<div class="TotalSoft_GV_SG_Imagediv TotalSoft_iframe-field" data-creat_src="${tsvg_elem_vid_link}"><img src="${tsvg_elem_img}" class="TotalSoft_bgr_iframe"><img src="${image_load}" class="TotalSoft_loder TotalSoft_loder_hide"></div>`;
									media_element_class = 'iframecontainer';
								}
								else {
									tsvg_elem_img = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Imagediv img`).attr("src");
									media_elem = `<div class="TotalSoft_GV_SG_Imagediv"><img width="" height="" src="${tsvg_elem_img}" alt="${tsvg_new_title_name}" ></img></div>`;
									media_element_class = 'imagecontainer';
								}
							}
							else {
								tsvg_elem_vid_link = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Videodiv source`).attr("src");
								tsvg_elem_img = $(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_Videodiv video`).attr("poster");
								media_elem = `<div class="TotalSoft_GV_SG_Videodiv"> <video controls="" poster="${tsvg_elem_img}" name="media"><source src="${tsvg_elem_vid_link}"></video> </div> `;
								media_element_class = 'videocontainer';
							}
						}
						tsvg_new_element = `
								<li class="TS_VGallery_blocks-gallery-item" data-tsvg-class="0" data-tsvg-id='${tsvg_new_video_id}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
								<figure  class="TS_VGallery_blocks-gallery-item_block__${tsvg_TS_VG_SetType}" data-tsvg-effect="${tsvg_eftsvg_effect}" data-tsvg-bool="${tsvg_bool}" >
								<img width="" height="" src=" ${tsvg_elem_img_link} " alt=" ${tsvg_new_title_name} " >
								<h3 class="TS_VGallery_blocks-gallery-item_title__${tsvg_TS_VG_SetType}"  data-tsvg-title="${tsvg_title}">
								${tsvg_new_title_name}
								</h3>
								<figcaption class="TS_VGallery_blocks-gallery-item_caption__${tsvg_TS_VG_SetType}" >
								${tsvg_elem_descp}
								</figcaption>
								</figure>
							</li> `;
						tsvg_new_popup_element = `
							<li class="${media_element_class} TS_VGallery_item" data-tsvg-class="0" data-tsvg-id='${tsvg_new_video_id}' >
								<figure class='TS_VGallery_item_block__${tsvg_TS_VG_SetType}' data-tsvg-effect='${tsvg_popup_effect}' >
								<figcaption class='TS_VGallery_item_block_title__${tsvg_TS_VG_SetType}' data-tsvg-position='${tsvg_popup_position}'  data-tsvg-bool='${tsvg_popup_bool}' data-tsvg-effect='${tsvg_popup_ef_2}' >
								${tsvg_new_title_name}
								</figcaption>
								<div class='TS_VGallery__GV_GG_SP TS_VGallery_item_block_desc__${tsvg_TS_VG_SetType}' data-tsvg-bool='${tsvg_popup_bool}' >
								${tsvg_elem_descp}
								</div>
								<div class='TS_VGallery__GV_GG_SP TS_VGallery_item_block_link__${tsvg_TS_VG_SetType}'  data-tsvg-bool='${tsvg_link_bool}' >
									<a class='TS_VGallery__GV_GVG_Link${tsvg_TS_VG_SetType}' href = '${tsvg_elem_link}' target = '${tsvg_elem_target}' > ${tsvg_popup_link_name} </a>
								</div>
								${media_elem}
								</figcaption>
								</figure>
							</li> `;
						$(tsvg_new_popup_element).insertAfter($(`figure .TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} > li`).last());
						break;
					case 'LightBox Video Gallery':
						var tsvg_effect = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_lay = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_13'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_hover = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_20'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_hoverline = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_25'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_hoverline_border = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_23'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_img = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_10'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_link_border = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_31'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_effect_link_hover = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_33'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_link_title = $("#TotalSoft_GV_2_32").val(),
							tsvg_bool = $("#TotalSoft_GV_1_40").val() == 'on' ? 'false' : 'true',
							tsvg_elem_target = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target"),
							tsvg_elem_link = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_VGallery_gv-lvg-image-block${tsvg_TS_VG_SetType}`).attr("data-tsvg-href"),
							tsvg_new_element = `
								<li class='TS_VGallery_gv-lvg-item TS_VGallery_GV_LVG_Li TS_VGallery_lb_${tsvg_TS_VG_SetType}' data-tsvg-border='${tsvg_effect}' data-tsvg-class="0" data-tsvg-id='${tsvg_new_video_id}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
									<figure  class='TS_VGallery_gv-lvg-image-block${tsvg_TS_VG_SetType}'  data-tsvg-href='${tsvg_elem_vd_link}' data-tsvg-title='${tsvg_new_title_name}' >
										<div class='hoverlay_${tsvg_TS_VG_SetType}' data-hoverlay='${tsvg_effect_lay}' ></div>
										<figcaption class='title-hover_${tsvg_TS_VG_SetType}' data-hover='${tsvg_effect_hover}' >
											${tsvg_new_title_name}
										</figcaption>
										<div class='hoverline_${tsvg_TS_VG_SetType}' data-hoverline='${tsvg_effect_hoverline}' data-tsvg-border='${tsvg_effect_hoverline_border}' ></div>
										<img width="" height="" src="${tsvg_elem_img_link} " alt=" ${tsvg_new_title_name} " class='LImg l_img_${tsvg_TS_VG_SetType} ' data-tsvg-img='${tsvg_effect_img}' >
										<a href='${tsvg_elem_link}' class='hovLink hov_link_${tsvg_TS_VG_SetType}'  data-hover='${tsvg_effect_link_hover}'  target = '${tsvg_elem_target}' data-tsvg-border='${tsvg_effect_link_border}' >
											${tsvg_link_title}
										</a>
									</figure>
								</li> `;
						break;
					case 'Thumbnails Video':
						var tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							ef_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_new_element = `
							<li class='TS_VGallery_effect-blocks_item TS_VGallery_tv_${tsvg_TS_VG_SetType}'  data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}'  data-tsvg-ef='${ef_1}' >
							<figure class='TS_VGallery_effect-block' >
							<a href='${tsvg_elem_vd_link}' class='TS_VGallery_effect-block__item boxer_${tsvg_TS_VG_SetType} small'  data-id='${tsvg_TS_VG_SetType}' data-gallery='video_gallery_${tsvg_TS_VG_SetType}' title='${tsvg_new_title_name}' >
							<img width='' height='' src='${tsvg_elem_img_link}' alt='${tsvg_new_title_name}'  title='${tsvg_new_title_name}' class='totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}' >
							</a>
							</figure>
							</li> `;
						break;
					case 'Content Popup':
						var tsvg_elem_link = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target"),
							tsvg_link_title = $("#TotalSoft_GV_1_19").val(),
							tsvg_link_show = $("#TotalSoft_GV_2_32").is(":checked") == false ? 'false' : 'true',
							tsvg_desc_show = $("#TotalSoft_GV_1_16").is(":checked") == false ? 'false' : 'true',
							tsvg_title_show = $("#TotalSoft_GV_1_11").is(":checked") == false ? 'false' : 'true',
							tsvg_totalsoftview = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_09'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_elem_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_VGallery_desc-${tsvg_TS_VG_SetType}`).html(),
							tsp_main_videos = "",
							tsvg_mask = '',
							tsvg_mask1 = '',
							tsvg_mask2 = '',
							tsvg_content = '',
							tsvg_mask_parent = '',
							tsvg_shadow = $("#TotalSoft_GV_1_06").is(":checked") == false ? 'false' : 'true',
							TotSoft = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
						tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] `).attr("data-tsvg-href");
						if ($("#TotalSoft_GV_1_09").val() == '2') {
							tsvg_mask = 'mask';
							tsvg_content = `content content${tsvg_TS_VG_SetType}`;
						} else if ($("#TotalSoft_GV_1_09").val() == '9') {
							tsvg_mask1 = `mask mask-1 mask-1${tsvg_TS_VG_SetType}`;
							tsvg_mask2 = `mask mask-2 mask-2${tsvg_TS_VG_SetType}`;
							tsvg_content = `content content${tsvg_TS_VG_SetType}`;
						} else {
							tsvg_mask_parent = 'mask';
						}
						tsvg_new_element = `
								<li class='TS_VGallery_view totalsoftview totalsoftview${tsvg_TS_VG_SetType} totalsoftview-${TotSoft[tsvg_totalsoftview]}'  data-tsvg-target='${tsvg_elem_target}'  data-tsvg-link='${tsvg_elem_link}'  data-tsvg-href='${tsvg_elem_vd_link}'  data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}'  data-tsvg-shadow='${tsvg_shadow}'  style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
								<figure class='TS_VGallery_block' >
								<img  width='' height='' src='${tsvg_elem_img_link}' alt='${tsvg_new_title_name}'  title='${tsvg_new_title_name}' class='totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}' >
								<div class='TS_VGallery_block_row ${tsvg_mask_parent}' >
								<div class='TS_VGallery_block_col ${tsvg_mask}' ></div>
								<div class='TS_VGallery_block_col_1 ${tsvg_mask1}' ></div>
								<div class='TS_VGallery_block_col_2 ${tsvg_mask2}' ></div>
								<figcaption class='${tsvg_content}' >
								<h2 class='TS_VGallery_title-${tsvg_TS_VG_SetType}' data-tsvg-show='${tsvg_title_show}' > ${tsvg_new_title_name} </h2>
								<div class='TS_VGallery_desc-${tsvg_TS_VG_SetType}' data-tsvg-show='${tsvg_desc_show}' > ${tsvg_elem_desc} </div>
								<a class='TS_VGallery_info-${tsvg_TS_VG_SetType} totalsoftview_info info '  href = '${tsvg_elem_link}' target = '${tsvg_elem_target}'  data-tsvg-show='${tsvg_link_show}' > ${tsvg_link_title} </a>
								</figure>
								</div>
								</figure>
								</li> `;
						break;
					case 'Elastic Gallery':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $("#TotalSoft_GV_1_13").val(),
							tsvg_link_name = $("#TotalSoft_GV_2_25").val(),
							tsvg_data_ef_1 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_04'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_ef_2 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_22'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_ef_3 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_22'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_hov = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_14'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_show = $("#TotalSoft_GV_1_16").val(),
							tsvg_data_img_ef = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_08'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_icon_1 = $("#TotalSoft_GV_1_19-icon_value").val(),
							tsvg_data_icon_2 = $("#TotalSoft_GV_1_27-icon_value").val(),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target");
						tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] `).attr("data-src");
						tsvg_new_element = `
								<li class='fhovZoom${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-effect='${tsvg_data_ef_1}' data-src='${tsvg_elem_vd_link}' data-poster='${tsvg_elem_img_link}' data-title='${tsvg_new_title_name}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
								<figure  class='TS_VGallery_block' >
								<img width='' height='' src='${tsvg_elem_img_link}' alt='img' class='zEff' data-tsvg-img='${tsvg_data_img_ef}' >
								<figcaption  data-tsvg-hover='${tsvg_data_hov}' >
								   <span data-tsvg-show= '${tsvg_data_show}' >
								   ${tsvg_new_title_name}
								  </span >
								  <i class='TotalsofthLIcon1${tsvg_TS_VG_SetType} ${tsvg_data_icon_1}' data-tsvg-effect='${tsvg_data_ef_2}' > </i>
								  <a href='${tsvg_elem_link}' class='TotalsofthLIcon2_link' target = ''${tsvg_elem_target}'> <i class='TotalsofthLIcon2${tsvg_TS_VG_SetType} ${tsvg_data_icon_2}' data-tsvg-effect ='${tsvg_data_ef_3}' > </i> </a>
								</figcaption>
								</figure>
							  </li> `;
						break;
					case 'Fancy Gallery':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_11").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_13'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_link_name = $("#TotalSoft_GV_2_25").val(),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target"),
							tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']  .html5lightbox`).attr("data-href"),
							tsvg_popup_witdh = $("#TotalSoft_GV_1_33").val(),
							tsvg_popup_heigth = $("#TotalSoft_GV_1_34").val(),
							tsvg_popup_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']  .html5lightbox .ts_vgallery_block_desc`).html();
						tsvg_new_element = `
								<li class='TS_VGallery_li-thumbs TotLi TotLi_${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
								<figure  class='TS_VGallery_block html5lightbox' data-href='${tsvg_elem_vd_link}'  data-width='${tsvg_popup_witdh}' data-height='${tsvg_popup_heigth}' data-group='mygroup${tsvg_TS_VG_SetType}' data-thumbnail='${tsvg_elem_img_link}'  data-title='${tsvg_new_title_name}'  >
								  <div class="ts_vgallery_block_desc" >${tsvg_popup_desc}</div>
								  <a class='Totalsoft_VL' href = '${tsvg_elem_link}' target = '${tsvg_elem_target}' data-tsvg-title='${tsvg_link_position}' data-tsvg-show='${tsvg_link_show}' > ${tsvg_link_name} </a>
								  <img width='' height='' src='${tsvg_elem_img_link}' alt='img' class='TS_VGallery_thumbs' >
								  <div class='TS_VGallery_li-thumbs-hover' >
								   <span class='Totalsoft_VT' data-tsvg-bottom='${tsvg_title_bottom}' data-tsvg-show='${tsvg_title_show}' >
								   ${tsvg_new_title_name}
								  </span>
								  </div>
								</figure>
							  </li> `;
						break;
					case 'Parallax Engine':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $("#TotalSoft_GV_1_13").val(),
							tsvg_type = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_ef_1 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_07'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_ef_2 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_19'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_show_1 = $("#TotalSoft_GV_1_20").val() == 'on' ? 'false' : 'true',
							tsvg_ef_3 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_26'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_show_2 = $("#TotalSoft_GV_1_27").val() == 'on' ? 'false' : 'true',
							tsvg_show_3 = $("#TotalSoft_GV_1_15").val(),
							tsvg_ef_4 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_14'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_icon_1 = $("#TotalSoft_GV_1_16-icon_value").val(),
							tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-href"),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target");
						tsvg_new_element = `
								<li class='TotalSoft_H_Ef${tsvg_TS_VG_SetType}  swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}' data-tsvg-class='0'  data-href='${tsvg_elem_vd_link}'  data-name='${tsvg_new_title_name}' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-type='${tsvg_type}' data-tsvg-ef='${tsvg_ef_1}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
								<figure class='TS_VGallery_block' >
								  <img class='TotalSoft_HZ2' src='${tsvg_elem_img_link}' / >
								  <div class='mask line_TotalSoft' data-tsvg-ef='${tsvg_ef_2}'  data-tsvg-show='${tsvg_show_1}' >
									  <div class='mask mask_1' data-tsvg-ef='${tsvg_ef_2}_1' ></div>
									  <div class='mask mask_2' data-tsvg-ef='${tsvg_ef_2}_2' ></div>
									  <div class='mask mask_3'  data-tsvg-ef='${tsvg_ef_2}_3' ></div>
									  <div class='mask mask_4'  data-tsvg-ef='${tsvg_ef_2}_4' ></div>
								  </div>
								  <div class='Hov_TotalSoft' data-tsvg-ef='${tsvg_ef_3}'  data-tsvg-show='${tsvg_show_2}' ></div>
								  <figcaption class='TotalSoft_Title_Ef '  data-tsvg-ef='${tsvg_ef_4}' >
									  ${tsvg_new_title_name}
									  <i class='TotalSoft_PI ${tsvg_data_icon_1}' data-tsvg-show='${tsvg_show_3}' > </i>
								  </figcaption>
								</figure>
							  </li> `;
						break;
					case 'Classic Gallery':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-link"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $("#TotalSoft_GV_1_13").val(),
							tsvg_link_name = $("#TotalSoft_GV_2_25").val(),
							tsvg_data_ef_1 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_05'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_img_ef = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_08'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_ef_2 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_14'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_ef_3 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_ef_4 = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_04'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_icon = $("#TotalSoft_GV_1_12-icon_value").val(),
							tsvg_elem_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_GV_ClG_Div2_desc`).html(),
							tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-src"),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-target");
						tsvg_new_element = `
									<li class='TS_GV_ClG_Div1_Main_${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-effect='${tsvg_data_ef_1}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s; '  data-tsvg-target='${tsvg_elem_target}'  data-tsvg-link='${tsvg_elem_link}' data-tsvg-src='${tsvg_elem_vd_link}'>
										<figure class='TS_GV_ClG_Div1_${tsvg_TS_VG_SetType}' >
											 <div class='TS_GV_ClG_Div2_${tsvg_TS_VG_SetType}' data-tsvg-effect='${tsvg_data_ef_4}' >
												<img  width='' height='' src='${tsvg_elem_img_link}' alt='img' class='TS_GV_ClG_Div2_Img_${tsvg_TS_VG_SetType}' data-tsvg-img='${tsvg_data_img_ef}' >
											   <div class='TS_GV_ClG_Div2_desc' >
													${tsvg_elem_desc}
												</div>
												<figcaption  data-tsvg-hover='${tsvg_data_ef_2}' >
													<div class='TS_VGallery_efect' data-tsvg-ef='${tsvg_data_ef_3}' >
														<div class='TS_GV_ClG_Div2_Hov_2_${tsvg_TS_VG_SetType}' > <div class='TS_GV_ClG_Div2_Hov' ></div> <div class='TS_GV_ClG_Div2_Hov_1' > <div class='TS_GV_ClG_Div2_Hov_2' ></div> </div></div>
														<div class='TS_GV_ClG_Div2_Hov_${tsvg_TS_VG_SetType}' >
															<div class='TS_GV_ClG_Div2_Hov_1_${tsvg_TS_VG_SetType}' >
																<span class='TS_GV_ClG_Div2_Hov_Title_${tsvg_TS_VG_SetType}' >
																${tsvg_new_title_name}
																</span>
															</div>
														</div>
														<div class='TS_GV_ClG_Div2_Hov_Fild_${tsvg_TS_VG_SetType}' >
															<span>
																<i class='TS_GV_ClG_Div2_Hov_Icon_${tsvg_TS_VG_SetType} ${tsvg_data_icon}' > </i>
															</span>
														</div>
													</div>
												</figcaption>
											 </div>
										</figure>
									</li> `;
						break;
					case 'Space Gallery':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $("#TotalSoft_GV_1_13").val(),
							tsvg_link_name = $("#TotalSoft_GV_2_25").val(),
							tsvg_data_icon_text = $("#TotalSoft_GV_1_14").val(),
							tsvg_data_ps_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_data_c = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_08'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_data_icon = $("#TotalSoft_GV_1_22-icon_value").val(),
							tsvg_elem_vd_link = tsvg_action == "add" ? tsvgallery_builder_json.tsvg_no_iframe : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-src"),
							tsvg_el_mediya = ` <div class="TotalSoft_GV_SG_Videodiv" > <iframe src="${tsvg_elem_vd_link}" frameborder = "0" webkitAllowFullScreen > </iframe></div> `,
							tsvg_elem_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TotalSoft_GV_SG_desc`).html(),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-target");
						// clon
						if (tsvg_action == "copy") {
							if ($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TotalSoft_GV_SG_Imagediv`).length) {
								tsvg_el_mediya = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TotalSoft_GV_SG_Imagediv`).clone()[0];
								tsvg_el_mediya = $(tsvg_el_mediya).html();
								tsvg_el_mediya = ` <div class="TotalSoft_GV_SG_Imagediv" > ${tsvg_el_mediya} </div> `;
							} else {
								tsvg_el_mediya = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TotalSoft_GV_SG_Videodiv`).clone()[0];
								tsvg_el_mediya = $(tsvg_el_mediya).html();
								tsvg_el_mediya = ` <div class="TotalSoft_GV_SG_Videodiv" > ${tsvg_el_mediya} </div> `;
							}
						}
						tsvg_new_element = `
									<li class='TotalSoft_GV_SG_Item_${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-effect='${tsvg_data_ef_1}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;'  data-tsvg-link='${tsvg_elem_link}' data-tsvg-target='${tsvg_elem_target}' data-tsvg-src='${tsvg_elem_vd_link}' >
										<figure  class='TS_VGallery_block' >
											<span class='TotalSoft_GV_SG_VideoTitle_${tsvg_TS_VG_SetType}' data-tsvg-text-ps='${tsvg_data_ps_1}' data-tsvg-c='${tsvg_data_c}' >
											 ${tsvg_new_title_name}
											</span>
											${tsvg_el_mediya}
											<p class='TotalSoft_GV_SG_desc' > ${tsvg_elem_desc} </p>
											<span class='TotalSoft_GV_SG_VideoPMspan_${tsvg_TS_VG_SetType}' >
												<span class='TotalSoft_GV_SG_VideoPM_${tsvg_TS_VG_SetType}' >
												<i class='TS_VGallery_before TotalSoft_GV_SG_VideoPMicon_${tsvg_TS_VG_SetType}  ${tsvg_data_icon}' > </i>
												<span> ${tsvg_data_icon_text} </span>
												</span>
											</span>
										</figure>
									</li> `;
						break;
					case 'Effective Gallery':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_title_bottom = $("#TotalSoft_GV_1_13").val(),
							tsvg_link_name = $("#TotalSoft_GV_2_04").val(),
							tsvg_data_br_1 = $("#TotalSoft_GV_1_25").is(":checked") == false ? 'false' : 'true',
							tsvg_data_ps_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_07'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_data_br_2 = $("#TotalSoft_GV_1_11").val(),
							tsvg_data_ef_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_18'] .tsvg_active").attr('data-tsvg-pos'),
							tsvg_data_sh_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_16'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_data_img_ef = $("#TotalSoft_GV_1_21-icon_value").val(),
							tsvg_data_ps_2 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_07'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_data_ef_2 = $("#TotalSoft_GV_1_08").is(":checked") == false ? 'false' : 'true',
							tsvg_data_ps_3 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_2_07'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_GV_XG_Desc_Div_${tsvg_TS_VG_SetType}`).text(),
							tsvg_data_icon = $("#TotalSoft_GV_2_13-icon_value").val(),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("target"),
							tsvg_lv = '',
							tsvg_li = '';
						if (tsvg_action != "add") {
							tsvg_li = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-li");
							tsvg_lv = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).attr("data-tsvg-lv");
						}
						// clon
						tsvg_new_element = `
									<li class='TS_GV_XG_Gallery_Div1_${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-ps='${tsvg_data_ps_1}' data-tsvg-br='${tsvg_data_br_1}'  data-tsvg-lv='${tsvg_lv}'  data-tsvg-li='${tsvg_li}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
										<figure  class='TS_VGallery_block' >
											<div class='TS_GV_XG_Gallery_Title_${tsvg_TS_VG_SetType}' data-tsvg-br='${tsvg_data_br_2}'  data-tsvg-ef='${tsvg_data_ef_1}' data-tsvg-sh='${tsvg_data_sh_1}' >
												<div>
													${tsvg_new_title_name}
												</div>
												${tsvg_new_title_name}
											</div>
											<div class='TS_GV_XG_block_${tsvg_TS_VG_SetType}' data-tsvg-ps='${tsvg_data_ps_2}' >
												<div class='TS_GV_XG_main_${tsvg_TS_VG_SetType}'  data-tsvg-ef='${tsvg_data_ef_2}' >
													<div class='TS_GV_XG_Desc_Div_${tsvg_TS_VG_SetType}' > <p> ${tsvg_desc} </p></div>
														<div class='TS_GV_XG_Img_Div_${tsvg_TS_VG_SetType}' >
															<div class='TS_GV_XG_Img_Div1_${tsvg_TS_VG_SetType}' >
																<div class='TS_GV_XG_Img_Div2_${tsvg_TS_VG_SetType}' ></div>
																<img src='${tsvg_elem_img_link}' /> <span class='TS_GV_XG_Img_Play ${tsvg_data_img_ef}'> </span>
															</div>
													</div>
												</div>
												<div class='TS_GV_XG_Link_Div_${tsvg_TS_VG_SetType}' data-tsvg-class='${tsvg_link_show}' data-tsvg-ps='${tsvg_data_ps_3}' >
													<a href='${tsvg_elem_link}' target = '${tsvg_elem_target}' >
														<span> ${tsvg_link_name} </span>
														<i class='TS_GV_XG_Link_Icon_${tsvg_TS_VG_SetType} ${tsvg_data_icon}' style='margin-right: 5px;' > </i>
													</a>
												</div>
											</div>
										</figure>
									</li> `;
						break;
					case 'Gallery Album':
						var tsvg_elem_link = tsvg_action == "add" ? '#' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href"),
							tsvg_link_show = tsvg_elem_link != '#' ? 'yes' : 'no',
							tsvg_link_position = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_20'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_title_show = $("#TotalSoft_GV_2_09").is(":checked") == false ? 'false' : 'true',
							tsvg_link_name = $("#TotalSoft_GV_1_25").val(),
							tsvg_sh_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_ef_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_09'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_ps_1 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_29'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_ef_2 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_37'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_rd_1 = $("#TotalSoft_GV_1_12").val(),
							tsvg_ef_3 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_19'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_sh_2 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_17'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_ps_2 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_28'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_ps_3 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_05'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_desc = tsvg_action == "add" ? '' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] .TS_GV_GA_Desc_Div_${tsvg_TS_VG_SetType}`).text(),
							tsvg_ps_4 = $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_36'] .tsvg_active ").attr('data-tsvg-pos'),
							tsvg_el_mediya = ` <div class="TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType}" ><img src="${tsvg_elem_img_link}" ></div> `,
							tsvg_data_icon = $("#TotalSoft_GV_1_34-icon_value").val(),
							tsvg_elem_target = tsvg_action == "add" ? '_self' : $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}'] a`).attr("href");
						// clon
						if (tsvg_action == "copy") {
							if ($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType}`).length) {
								tsvg_el_mediya = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType}`).clone()[0];
								tsvg_el_mediya = $(tsvg_el_mediya).html();
								tsvg_el_mediya = ` <div class="TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType}" > ${tsvg_el_mediya} </div> `;
							} else {
								tsvg_el_mediya = $(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_copied_id}']`).find(`.TS_GV_GA_Vid_Div1_${tsvg_TS_VG_SetType}`).clone()[0];
								tsvg_el_mediya = $(tsvg_el_mediya).html();
								tsvg_el_mediya = ` <div class="TS_GV_GA_Vid_Div1_${tsvg_TS_VG_SetType}" > ${tsvg_el_mediya} </div> `;
							}
						}
						tsvg_new_element = `
									<li class='TS_GV_GA_Gallery_Div1_${tsvg_TS_VG_SetType}' data-tsvg-class='0' data-tsvg-id='${tsvg_new_video_id}' data-tsvg-sh='${tsvg_sh_1}'  data-tsvg-ef='${tsvg_ef_1}' style='-moz-animation-delay: ${tsvg_elem_delay}s;-webkit-animation-delay: ${tsvg_elem_delay}s;animation-delay: ${tsvg_elem_delay}s;' >
										<figure class='TS_GV_GA_Gallery_Div2_${tsvg_TS_VG_SetType}' data-tsvg-ps='${tsvg_ps_1}' data-tsvg-ef='${tsvg_ef_2}' >
											<div class='TS_GV_GA_Gallery_Title_${tsvg_TS_VG_SetType}' data-tsvg-rd='${tsvg_rd_1}' data-tsvg-ef='${tsvg_ef_3}' data-tsvg-sh='${tsvg_sh_2}' >
												<div>
													${tsvg_new_title_name}
												</div>
												${tsvg_new_title_name}
											</div>
											<div class='TS_GV_XG_block_${tsvg_TS_VG_SetType}' data-tsvg-ps='${tsvg_ps_2}' >
											<div class='TS_GV_XG_main_${tsvg_TS_VG_SetType}'  data-tsvg-ps='${tsvg_ps_3}' >
											   <div class='TS_GV_GA_Vid_Div_${tsvg_TS_VG_SetType}' >
											   ${tsvg_el_mediya}
											   </div>
											   <div class='TS_GV_GA_Desc_Div_${tsvg_TS_VG_SetType}' > ${tsvg_desc} </div>
											</div>
											<div class='TS_GV_GA_Link_Div_${tsvg_TS_VG_SetType}' data-tsvg-show='${tsvg_link_show}'  data-tsvg-ps='${tsvg_ps_4}' >
											   <a href= '${tsvg_elem_link}' target = '${tsvg_elem_target}' >
												<span>
												${tsvg_link_name}
												<i class='TS_GV_GA_Link_Icon_${tsvg_TS_VG_SetType} ${tsvg_data_icon}' > </i>
												</span>
											   </a>
											</div>
										 </div>
										</figure>
									</li> `;
						break;
				}
				$(tsvg_new_element).insertAfter($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} li`).last());
				if (tsvg_theme_name == 'Grid Video Gallery') {
					CBPGridGalleryForAdmin();
				}
				if (tsvg_theme_name == 'Thumbnails Video') {
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
					jQuery(`.totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}`).adipoli(
						{
							'startEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_01'] .tsvg_active").attr('data-tsvg-pos'),
							'hoverEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
							'imageOpacity': 1,
							'animSpeed': $("#TotalSoft_GV_1_03").val(),
							'fillColor': $("#TotalSoft_GV_1_04").val(),
							'textColor': '#ffffff',
							'overlayText': '<i class="' + $("#TotalSoft_GV_2_14-icon_value").val() + '"></i>',
							'slices': $("#TotalSoft_GV_1_05").val(),
							'boxCols': $("#TotalSoft_GV_1_06").val(),
							'boxRows': $("#TotalSoft_GV_1_07").val(),
							'popOutMargin': $("#TotalSoft_GV_1_08").val(),
							'popOutShadow': $("#TotalSoft_GV_1_09").val(),
							'popOutShadowC': $("#TotalSoft_GV_1_10").val(),
						}
					);
					if (jQuery(window).width() < 820) {
						jQuery(`.boxer_${tsvg_TS_VG_SetType}`).boxer({ mobile: true });
					} else {
						jQuery(`.boxer_${tsvg_TS_VG_SetType}`).not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
					}
				}
				if (tsvg_theme_name == 'Fancy Gallery') {
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
					var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
					if (Totalsoft_FG_HOv_T == 'Default') {
						Totalsoft_FG_HOv_T = false;
					} else {
						Totalsoft_FG_HOv_T = true;
					}
					jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
						function () {
							jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
						}
					);
					jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
				}
				if (tsvg_theme_name == 'LightBox Video Gallery') {
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
					lightboxPhotoForAdmin();
				}
				if (tsvg_theme_name == 'Parallax Engine') {
					TotalSoft_Hov_Anim();
					jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask`).removeAttr('style');
				}
				if (tsvg_theme_name == 'Elastic Gallery') {
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
					// jQuery(`.Tot_Vid_Gallery${tsvg_TS_VG_SetType}`).lightGallery();
					lightGalleryForAdmin();
				}
				var TotalSoft_JGV_P1S_ET = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-efect');
				if (tsvg_theme_name == 'Parallax Engine') {
					var TotalSoft_JGV_P_T = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-type');
					var TotalSoft_JGV_P1S_ET = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-efect');
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
					if (TotalSoft_JGV_P_T == 1) {
						jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).swipebox();
					} else {
						jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).colorbox(
							{
								iframe: true, transition: TotalSoft_JGV_P1S_ET, innerWidth: jQuery(window).width() * 0.7, innerHeight: jQuery(window).width() * 0.7 * 0.6, maxWidth: "80%", maxHeight: "80%", current: "", rel: 'slideshow', slideshow: false
							}
						);
					}
				}
				if (jQuery(`.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-pagination") != 'all') {
					paginationGenerate();
				}
			}
			$(document).on(
				'click',
				'.tsvg_shortcode_div > span',
				function (event) {
					event.stopPropagation();
					event.preventDefault();
					var tsvg_value_shortcode = $(`input#${$(this).attr("data-tsvg-copy")}`).val();
					var tsvg_create_input = document.createElement("input");
					tsvg_create_input.setAttribute("value", tsvg_value_shortcode);
					document.body.appendChild(tsvg_create_input);
					tsvg_create_input.select();
					document.execCommand("copy");
					document.body.removeChild(tsvg_create_input);
					setTimeout(
						() => {
							if ($(this).attr("data-tsvg-copy") == "tsvg_global_shortcode") {
								toastr["success"](`Shortcode copied !`, 'Success', { "closeButton": true, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-right", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "3000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut", });
							} else {
								toastr["success"](`Shortcode theme code copied !`, 'Success', { "closeButton": true, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-right", "preventDuplicates": true, "showDuration": "300", "hideDuration": "1000", "timeOut": "3000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut", });
							}
						},
						100
					);
				}
			);
			$(document).on(
				'click',
				`span#tsvg_TS_VG_Title_e,
			header.ts_vgallery_header_${tsvg_TS_VG_SetType} .ts_vgallery_title_${tsvg_TS_VG_SetType}`,
				function (event) {
					$('.tsvg_sidebar_item[data-tsvg-item="shortcode"]').trigger("click");
					var tsvg_title_input = $('input#tsvg_global_title');
					var tsvg_title_input_l = tsvg_title_input.val().length;
					tsvg_title_input.focus();
					tsvg_title_input[0].setSelectionRange(tsvg_title_input_l, tsvg_title_input_l);
				}
			);
			$(document).on(
				'input',
				'input#tsvg_global_title',
				function (event) {
					tsvgallery_builder_json.tsvg_proporties.TS_VG_Title = $(this).val();
					$("#tsvg_TS_VG_Title_e").text($(this).val());
					$(`.ts_vgallery_header_${tsvg_TS_VG_SetType} > .ts_vgallery_title_${tsvg_TS_VG_SetType},.ts_vgallery_r_header_${tsvg_TS_VG_SetType} > .ts_vgallery_title_${tsvg_TS_VG_SetType}`).text(tsvgallery_builder_json.tsvg_proporties.TS_VG_Title);
				}
			);
			$('.ts-vgallery-select-icon > i.ts-vgallery-none').each(
				function () {
					$(this).attr("class", "ts-vgallery ts-vgallery-ban");
				}
			);
			// tsvg Aim modal
			// Close Picker function
			function tsvgCloseIconPicker() {
				$("#ts-vgallery-aim-modal").attr("style", "display:none;");
				$(".ts-vgallery-aim-icon-item.ts-vgallery-aim-icon-item-aesthetic-selected").each(
					function () {
						$(this).removeClass("ts-vgallery-aim-icon-item-aesthetic-selected");
					}
				);
				$("#ts-vgallery-aim-modal--search_input").val("");
			}
			$(document).on('click', '.ts-vgallery-aim-modal--header-close-btn', tsvgCloseIconPicker);
			// Set Icon  function
			function tsvgSetIconClass(changeItem, changeAttr, changeValue) {
				if (changeAttr == "class") {
					var tsvg_elem_classlist = $(`${changeItem}`).attr("class");
					var tsvg_elem_arr = tsvg_elem_classlist.split(" ");
					var tsvg_removed_elems = [];
					tsvg_elem_arr.forEach(
						element => {
							if (element.indexOf('ts-vgallery') > -1) {
								tsvg_removed_elems.push(element);
							}
						}
					);
					tsvg_elem_arr = tsvg_elem_arr.filter(
						function (val) {
							return tsvg_removed_elems.indexOf(val) == -1;
						}
					);
					var tsvg_add_classes = changeValue.split(" ");
					var tsvg_result_classes = tsvg_elem_arr.concat(tsvg_add_classes);
					tsvg_result_classes = tsvg_result_classes.join(" ");
					$(`${changeItem}`).attr("class", tsvg_result_classes);
				} else if (changeAttr.indexOf("data-") != -1) {
					$(`${changeItem}`).attr(changeAttr, changeValue)
				} else {
					document.documentElement.style.setProperty(changeItem, `"\\${tsvgGetKeyByValue(tsvg_all_fonts, changeValue)}"`);
				}
				tsvgCloseIconPicker();
			}
			$(document).on(
				'click',
				'#ts-vgallery-aim-insert-icon-button',
				function () {
					var tsvg_selected_icon = $('.ts-vgallery-aim-icon-item.ts-vgallery-aim-icon-item-aesthetic-selected');
					var tsvg_select_item_for = $(this).attr("data-tsvg-field");
					var tsvg_select_item = $(`.ts-vgallery-select-icon#${tsvg_select_item_for}`);
					var tsvg_selected_value = "";
					var tsvg_input_icon_value = $(`#${tsvg_select_item_for}-icon_value`);
					if ($(tsvg_selected_icon).length != 0) {
						if ($(tsvg_selected_icon).attr("data-library-id") == "ts-vgallery-regular") {
							tsvg_selected_value = `ts-vgallery ts-vgallery-${$(tsvg_selected_icon).attr("data-filter")}`;
						} else {
							tsvg_selected_value = `ts-vgallery-emoji ts-vgallery-emoji-${$(tsvg_selected_icon).attr("data-filter")}`;
						}
						if (tsvg_select_item_for == 'TotalSoft_VGallery_Sty_14') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-icon", tsvg_selected_value);
						}
						if (tsvg_select_item_for == 'TotalSoft_VGallery_Sty_15') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-icon", tsvg_selected_value);
						}
						if (tsvg_select_item_for == 'TotalSoft_VGallery_Sty_24') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-icon", tsvg_selected_value);
						}
						if (tsvg_theme_name == 'Classic Gallery') {
							if (tsvg_select_item_for == 'TotalSoft_GV_2_39') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_38') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_17') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-icon", tsvg_selected_value);
							}
						}
						if (tsvg_theme_name == 'Effective Gallery') {
							if (tsvg_select_item_for == 'TotalSoft_GV_2_38') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_39') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_1_38') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-icon", tsvg_selected_value);
							}
						}
						if (tsvg_theme_name == 'Gallery Album') {
							if (tsvg_select_item_for == 'TotalSoft_GV_2_39') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_38') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_09') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-icon", tsvg_selected_value);
							}
						}
						if (tsvg_theme_name == 'Space Gallery') {
							if (tsvg_select_item_for == 'TotalSoft_GV_2_39') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_38') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-icon", tsvg_selected_value);
							}
							if (tsvg_select_item_for == 'TotalSoft_GV_2_32') {
								$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-icon", tsvg_selected_value);
							}
						}
						$(tsvg_input_icon_value).attr("value", tsvg_selected_value);
						tsvgSetIconClass($(tsvg_input_icon_value).attr("data-tsvg-elem"), $(tsvg_input_icon_value).attr("data-change-prop"), tsvg_selected_value);
						$(tsvg_select_item).children("i").attr("class", tsvg_selected_value);
						if (tsvg_styles.hasOwnProperty(`${tsvg_select_item_for}`)) {
							tsvg_styles[tsvg_select_item_for] = tsvg_selected_value;
						} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_select_item_for}`)) {
							tsvg_theme_option_style[tsvg_select_item_for] = tsvg_selected_value;
						}
					} else {
						if (tsvg_select_item_for == "ts_vgallery_ch_tbc" || tsvg_select_item_for == "ts_vgallery_ch_tac") {
							toastr["warning"]('Icon for this field required.', 'Warning', tsvg_toastr_options);
						} else {
							$(tsvg_select_item).children("i").attr("class", "ts-vgallery ts-vgallery-ban");
							tsvg_selected_value = "ts-vgallery ts-vgallery-none";
							$(tsvg_input_icon_value).attr("value", tsvg_selected_value);
							if (tsvg_styles.hasOwnProperty(`${tsvg_select_item_for}`)) {
								tsvg_styles[tsvg_select_item_for] = tsvg_selected_value;
							} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_select_item_for}`)) {
								tsvg_theme_option_style[tsvg_select_item_for] = tsvg_selected_value;
							}
							tsvgSetIconClass($(tsvg_input_icon_value).attr("data-tsvg-elem"), $(tsvg_input_icon_value).attr("data-change-prop"), tsvg_selected_value);
						}
					}
				}
			);
			// Change sidebar items
			$(document).on(
				'click',
				'.ts-vgallery-aim-modal--sidebar-tab-item',
				function () {
					if (!$(this).hasClass('aesthetic-active')) {
						$(".ts-vgallery-aim-modal--sidebar-tab-item.aesthetic-active").each(
							function () {
								$(this).removeClass("aesthetic-active");
							}
						);
						$(this).addClass("aesthetic-active");
						if ($(this).attr("data-library-id") == "all") {
							$(".ts-vgallery-aim-icon-item").each(
								function () {
									$(this).removeAttr("style");
								}
							);
						} else {
							$(`.ts-vgallery-aim-icon-item[data-library-id="${$(this).attr('data-library-id')}"]`).each(
								function () {
									$(this).removeAttr("style");
								}
							);
							$(`.ts-vgallery-aim-icon-item:not( [data-library-id="${$(this).attr('data-library-id')}"] )`).each(
								function () {
									$(this).attr("style", "display:none;");
								}
							);
							$('.ts-vgallery-aim-modal--icon-preview-inner').animate(
								{
									scrollTop: 0
								},
								50
							);
						}
						if ($("#ts-vgallery-aim-modal--search_input").val() != "") {
							$("#ts-vgallery-aim-modal--search_input").trigger('input');
						}
					}
				}
			);
			// change selected icon
			$(document).on(
				'click',
				'div.ts-vgallery-aim-icon-item',
				function () {
					if ($(this).hasClass("ts-vgallery-aim-icon-item-aesthetic-selected")) {
						$(this).removeClass("ts-vgallery-aim-icon-item-aesthetic-selected");
					} else {
						$(".ts-vgallery-aim-icon-item.ts-vgallery-aim-icon-item-aesthetic-selected").each(
							function () {
								$(this).removeClass("ts-vgallery-aim-icon-item-aesthetic-selected");
							}
						);
						$(this).addClass("ts-vgallery-aim-icon-item-aesthetic-selected");
					}
				}
			);
			// Init picker
			$(document).on(
				'click',
				'.ts-vgallery-icon-picker-wrap > .icon-picker > .ts-vgallery-select-icon',
				function () {
					$("#ts-vgallery-aim-modal").attr("style", "display:flex;");
					$(".ts-vgallery-aim-icon-item.ts-vgallery-aim-icon-item-aesthetic-selected").each(
						function () {
							$(this).removeClass("ts-vgallery-aim-icon-item-aesthetic-selected");
						}
					);
					var tsvg_select_item_for = $(this).attr("id");
					$("#ts-vgallery-aim-insert-icon-button").attr("data-tsvg-field", tsvg_select_item_for);
					var tsvg_select_item = $(this);
					var tsvg_current = $(this).find("i").attr("class");
					if (tsvg_current == "ts-vgallery ts-vgallery-ban") {
						$('.ts-vgallery-aim-modal--sidebar-tab-item[data-library-id="all"]').trigger("click");
						$('.ts-vgallery-aim-modal--icon-preview-inner').animate(
							{
								scrollTop: 0
							},
							50
						);
					} else {
						$(`.ts-vgallery-aim-icon-item > .ts-vgallery-aim-icon-item-inner > i[class='${tsvg_current}']`).parent().parent().addClass('ts-vgallery-aim-icon-item-aesthetic-selected');
						var tsvg_selected_library = $(`.ts-vgallery-aim-icon-item > .ts-vgallery-aim-icon-item-inner > i[class='${tsvg_current}']`).parent().parent().attr('data-library-id');
						$(`.ts-vgallery-aim-modal--sidebar-tab-item[data-library-id="${tsvg_selected_library}"]`).trigger("click");
						var position = $(`.ts-vgallery-aim-icon-item > .ts-vgallery-aim-icon-item-inner > i[class='${tsvg_current}']`).parent().parent().offset().top -
							$('.ts-vgallery-aim-modal--icon-preview-inner').offset().top +
							$('.ts-vgallery-aim-modal--icon-preview-inner').scrollTop() - 10;
						$('.ts-vgallery-aim-modal--icon-preview-inner').animate(
							{
								scrollTop: position
							}
						);
					}
					// when click outside close modal
					$(document).mouseup(
						function (e) {
							if (!$(".ts-vgallery-aim-modal--content").is(e.target) && $(".ts-vgallery-aim-modal--content").has(e.target).length === 0) {
								tsvgCloseIconPicker();
							}
						}
					);
				}
			);
			// Set icon none
			$(document).on(
				'click',
				'.tsvg-set-icon-none',
				function () {
					var tsvg_selection_field = $(this).parent().parent().attr("data-tsvg-field");
					$(`.icon-picker li#${tsvg_selection_field} > i`).attr("class", "ts-vgallery ts-vgallery-ban")
					var tsvg_selected_value = "ts-vgallery ts-vgallery-none";
					var tsvg_input_icon_value = $(`input#${tsvg_selection_field}-icon_value`);
					$(tsvg_input_icon_value).attr("value", tsvg_selected_value);
					if (tsvg_styles.hasOwnProperty(`${tsvg_selection_field}`)) {
						tsvg_styles[tsvg_selection_field] = tsvg_selected_value;
					} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_selection_field}`)) {
						tsvg_theme_option_style[tsvg_selection_field] = tsvg_selected_value;
					}
					tsvgSetIconClass($(tsvg_input_icon_value).attr("data-tsvg-elem"), $(tsvg_input_icon_value).attr("data-change-prop"), tsvg_selected_value);
				}
			);
			$(document).on(
				'click',
				'span.tsvg_btn_select_popup',
				function () {
					let tsvg_selected_popup = $(".tsvg_position_select[data-tsvg-select='Popup options']").find('.tsvg_active').attr('data-tsvg-pos');
					tsvg_theme_settings['TotalSoft_VGallery_Set_04'] = tsvg_selected_popup;
					showPopup(tsvg_TS_VG_SetType, tsvg_selected_popup);
				}
			);
			$(document).on(
				'click',
				'span.tsvg_btn_back_popup',
				function () {
					hidePopup(tsvg_TS_VG_SetType);
					$(`.ts_vgallery_select_popup_section_${tsvg_TS_VG_SetType}`).attr('data-tsvg-popup-select', 'show');
				}
			);
			var mutationObserver = new MutationObserver(
				function (mutations) {
					mutations.forEach(
						function (mutation) {
							if (tsvg_videos_props_arr.hasOwnProperty(`${tsvg_edit_elem_id}`) && tsvg_Tmce_getContent('tsvg_content_area') != '') {
								tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_desc = tsvg_Tmce_getContent('tsvg_content_area');
								switch (tsvg_theme_name) {
									case 'Grid Video Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  .TS_VGallery_blocks-gallery-item[data-tsvg-id='${tsvg_edit_elem_id}'] figcaption`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_item_block_desc__${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										CBPGridGalleryForAdmin();
										break;
									case 'LightBox Video Gallery':
										break;
									case 'Content Popup':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_desc-${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Fancy Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figure .ts_vgallery_block_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`)
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
										var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
										if (Totalsoft_FG_HOv_T == 'Default') {
											Totalsoft_FG_HOv_T = false;
										} else {
											Totalsoft_FG_HOv_T = true;
										}
										jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
											function () {
												jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
											}
										);
										jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
										break;
									case 'Classic Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_ClG_Div2_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Space Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Effective Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Desc_Div_${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Gallery Album':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Desc_Div_${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
								}
							}
						}
					);
				}
			);
			$(window).load(
				function () {
					mutationObserver.observe(
						jQuery('[id="tsvg_content_area_ifr"]')[0].contentWindow.document,
						{
							attributes: true,
							characterData: false,
							childList: true,
							subtree: true,
							attributeOldValue: false,
							characterDataOldValue: false
						}
					);
					jQuery(jQuery('[id="tsvg_content_area_ifr"]')[0].contentWindow.document).on(
						'keyup',
						function (e) {
							if (tsvg_videos_props_arr.hasOwnProperty(`${tsvg_edit_elem_id}`)) {
								tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_desc = tsvg_Tmce_getContent('tsvg_content_area');
								switch (tsvg_theme_name) {
									case 'Grid Video Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  .TS_VGallery_blocks-gallery-item[data-tsvg-id='${tsvg_edit_elem_id}'] figcaption`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_item_block_desc__${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										CBPGridGalleryForAdmin();
										break;
									case 'LightBox Video Gallery':
										break;
									case 'Content Popup':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_desc-${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Fancy Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figure .ts_vgallery_block_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`)
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
										var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
										if (Totalsoft_FG_HOv_T == 'Default') {
											Totalsoft_FG_HOv_T = false;
										} else {
											Totalsoft_FG_HOv_T = true;
										}
										jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
											function () {
												jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
											}
										);
										jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
										break;
									case 'Classic Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_ClG_Div2_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Space Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_desc`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Effective Gallery':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Desc_Div_${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
									case 'Gallery Album':
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Desc_Div_${tsvg_TS_VG_SetType}`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
										break;
								}
							}
						}
					);
				}
			)
			$('#wp-tsvg_content_area-editor-container .mce-top-part ').on(
				'click',
				function () {
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  .TS_VGallery_blocks-gallery-item[data-tsvg-id='${tsvg_edit_elem_id}'] figcaption`).html(`${tsvg_Tmce_getContent('tsvg_content_area')}`);
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].hasOwnProperty(`TotalSoftVGallery_Vid_desc`)) {
						tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_desc = tsvg_Tmce_getContent('tsvg_content_area');
					}
				}
			)
			// Search icon
			$(document).on(
				'input',
				'#ts-vgallery-aim-modal--search_input',
				function () {
					var searchText = $(this).val().toLowerCase();
					var tsvg_active_sidebar_item = $(".ts-vgallery-aim-modal--sidebar-tab-item.aesthetic-active").attr("data-library-id");
					if (searchText == "") {
						$(`.ts-vgallery-aim-icon-item[data-library-id="${tsvg_active_sidebar_item}"]`).each(
							function () {
								$(this).removeAttr("style");
							}
						);
					} else {
						switch (tsvg_active_sidebar_item) {
							case "ts-vgallery-emoji-regular":
							case "ts-vgallery-regular":
								$(`.ts-vgallery-aim-icon-item[data-library-id="${tsvg_active_sidebar_item}"]:not( [data-filter*= "${searchText}"] )`).each(
									function () {
										$(this).attr("style", "display:none;");
									}
								);
								$(`.ts-vgallery-aim-icon-item[data-library-id="${tsvg_active_sidebar_item}"][data-filter*= "${searchText}"]`).each(
									function () {
										$(this).removeAttr("style");
									}
								);
								break;
							default:
								$(`.ts-vgallery-aim-icon-item:not( [data-filter*= "${searchText}"] )`).each(
									function () {
										$(this).attr("style", "display:none;");
									}
								);
								$(`.ts-vgallery-aim-icon-item[data-filter*= "${searchText}"]`).each(
									function () {
										$(this).removeAttr("style");
									}
								);
								break;
						}
					}
				}
			);
			$(`#tsvg_video_color`).spectrum(
				{
					type: "color",
					showPalette: false,
					togglePaletteOnly: true,
					hideAfterPaletteSelect: true,
					showInput: true,
					showInitial: true,
					showButtons: false,
					move: function (color) {
						$(this).val(color.toRgbString());
						document.documentElement.style.setProperty(`--tsvg_title_bc_${tsvg_TS_VG_SetType}-${tsvg_edit_elem_id}`, color.toRgbString());
						if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.hasOwnProperty(`TotalSoftVGallery_Vid_Cl`)) {
							tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Cl = color.toRgbString();
						}
					},
				}
			);
			$(document).on(
				'input',
				'input#tsvg_video_link[type="text"]',
				function () {
					tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_link = $(this).val();
					switch (tsvg_theme_name) {
						case 'Grid Video Gallery':
							$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('href', `${$(this).val()}`);
							break;
						case 'LightBox Video Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .hov_link_${tsvg_TS_VG_SetType}`).attr('href', `${$(this).val()}`);
							break;
						case 'Content Popup':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-link', `${$(this).val()}`);
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('href', `${$(this).val()}`);
							break;
						case 'Elastic Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalsofthLIcon2_link`).attr('href', `${$(this).val()}`);
							break;
						case 'Fancy Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .Totalsoft_VL`).attr('href', `${$(this).val()}`);
							break;
						case 'Classic Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-link', `${$(this).val()}`);
							break;
						case 'Space Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-link', `${$(this).val()}`);
							break;
						case 'Effective Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Link_Div_${tsvg_TS_VG_SetType} a`).attr('href', `${$(this).val()}`);
							break;
						case 'Gallery Album':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Link_Div_${tsvg_TS_VG_SetType} a`).attr('href', `${$(this).val()}`);
							break;
					}
				}
			);
			$(document).on(
				'change',
				'input#tsvg_video_Video_ONT[type="checkbox"]',
				function () {
					tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_vont = `${$(this).is(':checked')}`;
					switch (tsvg_theme_name) {
						case 'Grid Video Gallery':
							if ($(this).is(':checked')) {
								$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('target', '_blank');
							} else {
								$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('target', '_self');
							}
							break;
							break;
						case 'LightBox Video Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .hov_link_${tsvg_TS_VG_SetType}`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .hov_link_${tsvg_TS_VG_SetType}`).attr(
									'target',
									'_self'
								);
							}
							break;
						case 'Content Popup':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_blank');
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_self');
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr('target', '_self');
							}
							break;
						case 'Elastic Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalsofthLIcon2_link`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalsofthLIcon2_link`).attr('target', '_self');
							}
							break;
						case 'Fancy Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .Totalsoft_VL`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .Totalsoft_VL`).attr('target', '_self');
							}
							break;
						case 'Classic Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_self');
							}
							break;
						case 'Space Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr('data-tsvg-target', '_self');
							}
							break;
						case 'Effective Gallery':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Link_Div_${tsvg_TS_VG_SetType} a`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Link_Div_${tsvg_TS_VG_SetType} a`).attr('target', '_self');
							}
							break;
						case 'Gallery Album':
							if ($(this).is(':checked')) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Link_Div_${tsvg_TS_VG_SetType} a`).attr('target', '_blank');
							} else {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Link_Div_${tsvg_TS_VG_SetType} a`).attr('target', '_self');
							}
							break;
					}
				}
			);
			$(document).on(
				'input',
				'input#tsvg_TS_VG_SetName[type="text"]',
				function () {
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].hasOwnProperty(`TS_VG_SetName`)) {
						tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_SetName = $(this).val();
					}
					switch (tsvg_theme_name) {
						case 'Grid Video Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  .TS_VGallery_blocks-gallery-item[data-tsvg-id='${tsvg_edit_elem_id}'] h3`).html(`${$(this).val()}`);
							$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_item_block_title__${tsvg_TS_VG_SetType}`).html(`${$(this).val()}`);
							break;
						case 'LightBox Video Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figcaption`).html(`${$(this).val()}`);
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figure`).attr('data-tsvg-title', `${$(this).val()}`);
							break;
						case 'Thumbnails Video':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr("title", `${$(this).val()}`)
							break;
						case 'Content Popup':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_title-${tsvg_TS_VG_SetType}`).html(`${$(this).val()}`)
							break;
						case 'Elastic Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-title", `${$(this).val()}`)
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figcaption span`).html(`${$(this).val()}`)
							break;
						case 'Fancy Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-title", `${$(this).val()}`)
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .Totalsoft_VT`).html(`${$(this).val()}`)
							break;
						case 'Classic Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_ClG_Div2_Hov_Title_${tsvg_TS_VG_SetType}`).text(`${$(this).val()}`)
							break;
						case 'Space Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_VideoTitle_${tsvg_TS_VG_SetType}`).text(`${$(this).val()}`)
							break;
						case 'Effective Gallery':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_XG_Gallery_Title_${tsvg_TS_VG_SetType}`).text(`${$(this).val()}`)
							break;
						case 'Gallery Album':
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Gallery_Title_${tsvg_TS_VG_SetType}`).text(`${$(this).val()}`)
							break;
					}
					$(`.tsvg-list-item[aria-tsvg-video = "${tsvg_edit_elem_id}"] h2`).html($(this).val());
				}
			);
			// Add new video
			$(document).on(
				'click',
				'#tsvg-add_video',
				function () {
					tsvgAddNewVideo("add", "New video");
				}
			);
			// Delete video
			$(document).on(
				'click',
				'.tsvg_list_action[data-tsvg-action="delete"]',
				function () {
					if ($("#tsvg-list > .tsvg-list-item").length <= 1) {
						toastr["error"]('Minimum amount of videos is 1.', 'Error', tsvg_toastr_options);
						return;
					}
					var tsvg_delete_video_id = $(this).parent().attr("aria-tsvg-video");
					$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_delete_video_id}']`).remove();
					$(this).parent().remove();
					delete tsvg_videos_props_arr[tsvg_delete_video_id];
					tsvg_delete_ids.push(tsvg_delete_video_id);
					if (tsvg_theme_name == 'Grid Video Gallery') {
						jQuery(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} li[data-tsvg-id='${tsvg_delete_video_id}']`).remove();
						CBPGridGalleryForAdmin();
					}
					toastr["success"]('Video successfully deleted.', 'Success', tsvg_toastr_options);
					// del
					if (tsvg_theme_name == 'LightBox Video Gallery') {
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
						lightboxPhotoForAdmin();
					}
					if (tsvg_theme_name == 'Parallax Engine') {
						var TotalSoft_JGV_P_T = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-type');
						var TotalSoft_JGV_P1S_ET = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-efect');
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
						if (TotalSoft_JGV_P_T == 1) {
							jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).swipebox();
						} else {
							jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).colorbox(
								{
									iframe: true, transition: TotalSoft_JGV_P1S_ET, innerWidth: jQuery(window).width() * 0.7, innerHeight: jQuery(window).width() * 0.7 * 0.6, maxWidth: "80%", maxHeight: "80%", current: "", rel: 'slideshow', slideshow: false
								}
							);
						}
					}
					if (tsvg_theme_name == 'Fancy Gallery') {
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
						var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
						if (Totalsoft_FG_HOv_T == 'Default') {
							Totalsoft_FG_HOv_T = false;
						} else {
							Totalsoft_FG_HOv_T = true;
						}
						jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
							function () {
								jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
							}
						);
						jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
					}
					if (jQuery(`.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-pagination") == 'pagination') {
						paginationGenerate();
					}
				}
			);
			// Edit video
			$(document).on(
				'click',
				'.tsvg_list_action[data-tsvg-action="edit"]',
				function () {
					tsvg_edit_elem_id = $(this).parent().attr("aria-tsvg-video");
					$("input#tsvg_TS_VG_SetName").val(tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_SetName);
					$("input#tsvg_video_link").val(tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_link);
					$("input#tsvg_video_Video_ONT").prop('checked', false);
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_vont) {
						$("input#tsvg_video_Video_ONT").prop('checked', true);
					}
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_desc) {
						tsvg_Tmce_setContent(
							tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_desc,
							'tsvg_content_area'
						);
					}
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Im == "") {
						tsvgSetImage("embed", "", tsvgallery_builder_json.tsvg_no_img, "600", "600");
					} else {
						$.ajax(
							{
								url: tsvgallery_builder_json.ajaxurl,
								data: {
									action: 'tsvg_get_attachment_id',
									tsvg_nonce: tsvgallery_builder_json.tsvg_nonce,
									attachment_url: tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Im
								},
								beforeSend: function () {
									$("div.tsvg_img_loading_div").removeAttr("style");
								},
								type: 'POST',
							}
						).done(
							function (response) {
								if (response.success === true) {
									if (response.data.hasOwnProperty('id')) {
										tsvgSetImage("library", response.data.id, response.data.image, response.data.width, response.data.height);
									} else {
										tsvgSetImage("embed", "", response.data.image, response.data.width, response.data.height);
									}
								}
							}
						).fail(
							function () {
								tsvgSetImage("embed", "", tsvgallery_builder_json.tsvg_no_img, "600", "600");
							}
						);
					}
					if (tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Vd == "") {
						jQuery('input#tsvg_video_video_attachment_id').val('');
						jQuery('.tsvg_vd_change > iframe').attr("style", "display:none;");
						jQuery('.tsvg_vd_change > img').removeAttr("style");
						$(".tsvg_img_div_edit").attr("style", "display:none;");
					} else {
						let url = tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Vd;
						var regexp = /https?:\/\/www\.youtube\.com\/embed\/([^/]+)/;
						var youTubeEmbedMatch = regexp.exec(url);
						if (youTubeEmbedMatch) {
							url = 'https://www.youtube.com/watch?v=' + youTubeEmbedMatch[1];
						}
						var data = {
							action: 'tsvg_check_attachment',
							tsvg_nonce: tsvgallery_builder_json.tsvg_nonce,
							attachment_url: url
						};
						jQuery.post(
							tsvgallery_builder_json.ajaxurl,
							data,
							function (response) {
								if (response.success === true) {
									jQuery('.tsvg_vd_change').children("iframe").remove();
									jQuery('.tsvg_vd_change').children("video").remove();
									jQuery('.tsvg_vd_change').children("blockquote").remove();
									jQuery('.tsvg_img_div_edit').removeAttr("style");
									jQuery('input#tsvg_video_video_attachment_id').val(response.data);
									jQuery('.tsvg_vd_change').prepend(` <video controls="" name="media"><source src="${data.attachment_url}"></video>`);
									jQuery('.tsvg_vd_change > img').attr("style", "display:none;");
								} else {
									wp.apiRequest(
										{
											url: wp.media.view.settings.oEmbedProxyUrl,
											data: {
												url: url,
											},
											beforeSend: function () {
												$(".tsvg_vd_loading_div").removeAttr("style");
											},
											type: 'GET',
											dataType: 'json',
											context: this
										}
									).done(
										function (responseApi) {
											if (responseApi.provider_name == "Embed Handler") {
												responseApi.html = ` <video controls="" name="media"><source src="${data.url}"></video>`;
											}
											jQuery('.tsvg_vd_change').children("iframe").remove();
											jQuery('.tsvg_vd_change').children("video").remove();
											jQuery('.tsvg_vd_change').children("blockquote").remove();
											jQuery('.tsvg_img_div_edit').removeAttr("style");
											jQuery('input#tsvg_video_video_attachment_id').val(url);
											jQuery('.tsvg_vd_change > img').attr("style", "display:none;");
											jQuery('.tsvg_vd_change').prepend(responseApi.html);
											$(".tsvg_vd_loading_div").attr("style", "display:none;");
										}
									).fail(
										function () {
											$(".tsvg_vd_loading_div").attr("style", "display:none;");
										}
									);
								}
							}
						);
					}
					$("main.tsvg_content_fields_menu").attr("style", "display:none;");
					$("main.tsvg_content_fields_edit").removeAttr("style");
				}
			);
			$(document).on(
				'click',
				'.tsvg_back_to_videos',
				function () {
					$("main.tsvg_content_fields_edit").attr("style", "display:none;");
					$("main.tsvg_content_fields_menu").removeAttr("style");
					jQuery('input#tsvg_video_video_attachment_id').val('');
					jQuery('.tsvg_content_fields_edit .tsvg_vd_change > iframe,.tsvg_content_fields_edit .tsvg_vd_change > video,.tsvg_content_fields_edit .tsvg_vd_change > blockquote').remove();
					jQuery('.tsvg_content_fields_edit .tsvg_vd_change > img').removeAttr("style");
					tsvg_Tmce_setContent('', 'tsvg_content_area');
				}
			);
			// Copy video
			$(document).on(
				'click',
				'.tsvg_list_action[data-tsvg-action="copy"]',
				function () {
					var tsvg_copied_elem = $(this).parent();
					tsvgAddNewVideo("copy", $(tsvg_copied_elem).children(".details").children("h2").text(), $(tsvg_copied_elem).attr("aria-tsvg-video"));
				}
			);
			// Spectrum Color Picker Init
			$('input[data-tsvg-field="color"]').each(
				function () {
					var tsvg_spectrum_element_id = $(this).attr('id');
					$(`#${$(this).attr('id')}`).spectrum(
						{
							type: "color",
							showPalette: false,
							togglePaletteOnly: true,
							hideAfterPaletteSelect: true,
							showInput: true,
							showInitial: true,
							showButtons: false,
							move: function (color) {
								$(this).val(color.toRgbString());
								document.documentElement.style.setProperty($(this).attr('data-tsvg-change'), color.toRgbString());
								if (tsvg_styles.hasOwnProperty(`${tsvg_spectrum_element_id}`)) {
									tsvg_styles[tsvg_spectrum_element_id] = color.toRgbString();
								} else if (tsvg_theme_settings.hasOwnProperty(`${tsvg_spectrum_element_id}`)) {
									tsvg_theme_settings[tsvg_spectrum_element_id] = color.toRgbString();
								} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_spectrum_element_id}`)) {
									tsvg_theme_option_style[tsvg_spectrum_element_id] = color.toRgbString();
								}
								if (tsvg_theme_name == 'Thumbnails Video') {
									if (tsvg_spectrum_element_id == 'TotalSoft_GV_1_10' || tsvg_spectrum_element_id == 'TotalSoft_GV_1_04') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
										jQuery(`.totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}`).adipoli(
											{
												'startEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_01'] .tsvg_active").attr('data-tsvg-pos'),
												'hoverEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
												'imageOpacity': 1,
												'animSpeed': $("#TotalSoft_GV_1_03").val(),
												'fillColor': $("#TotalSoft_GV_1_04").val(),
												'textColor': '#ffffff',
												'overlayText': '<i class="' + $("#TotalSoft_GV_2_14-icon_value").val() + '"></i>',
												'slices': $("#TotalSoft_GV_1_05").val(),
												'boxCols': $("#TotalSoft_GV_1_06").val(),
												'boxRows': $("#TotalSoft_GV_1_07").val(),
												'popOutMargin': $("#TotalSoft_GV_1_08").val(),
												'popOutShadow': $("#TotalSoft_GV_1_09").val(),
												'popOutShadowC': $("#TotalSoft_GV_1_10").val(),
											}
										);
										if (jQuery(window).width() < 820) {
											jQuery(`.boxer_${tsvg_TS_VG_SetType}`).boxer({ mobile: true });
										} else {
											jQuery(`.boxer_${tsvg_TS_VG_SetType}`).not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
										}
									}
								}
							},
						}
					);
				}
			);
			// Accordion style sidebar
			$(document).on(
				'click',
				'.tsvg_accordion_header',
				function () {
					if ($(this).parent().hasClass('tsvg_accordion_item_opened')) {
						$(this).parent().children('.tsvg_accordion_item_content').removeAttr('style');
						$(this).parent().removeClass('tsvg_accordion_item_opened');
					} else if ($('.tsvg_accordion_item_opened').length > 0) {
						$('.tsvg_accordion_item_opened').children('.tsvg_accordion_item_content').removeAttr('style');
						$('.tsvg_accordion_item_opened').removeClass('tsvg_accordion_item_opened');
						$(this).parent().children('.tsvg_accordion_item_content').height(`${$(this).parent().children('.tsvg_accordion_item_content').prop("scrollHeight")}px`);
						$(this).parent().addClass('tsvg_accordion_item_opened');
					} else {
						$(this).parent().children('.tsvg_accordion_item_content').height(`${$(this).parent().children('.tsvg_accordion_item_content').prop("scrollHeight")}px`);
						$(this).parent().addClass('tsvg_accordion_item_opened');
					}
				}
			);
			if (tsvg_theme_name == 'Grid Video Gallery') {
				if ($(`.tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] > .tsvg_position_item.tsvg_active`).attr('data-tsvg-pos') != 'opacity') {
					$(`#TotalSoft_GV_1_07`).parent().css('display', 'none');
				}
				// else{
				// 	$(`#TotalSoft_GV_1_07`).parent().css('display', 'visible');
				// }
				if ($(`.tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_06'] > .tsvg_position_item.tsvg_active`).attr('data-tsvg-pos') != 'drop-shadow') {
					$(`#TotalSoft_GV_1_08`).parent().css('display', 'none');
				}
				// else{
				// 	$(`#TotalSoft_GV_1_08`).parent().css('display', 'visible');
				// }
			}
			$(document).on(
				'click',
				'.tsvg_position_select > .tsvg_position_item:not(.tsvg_active)',
				function (event) {
					event.preventDefault();
					// if ($(this).parent().attr('data-tsvg-select') == 'TotalSoft_VGallery_Set_07' || $(this).parent().attr('data-tsvg-select') == 'TotalSoft_VGallery_Set_05' || $(this).parent().attr('data-tsvg-select') == 'TotalSoft_VGallery_Set_08') {
					// 	return;
					// }
					$(this).siblings().removeClass('tsvg_active');
					$(this).addClass('tsvg_active');
					var tsvg_change_style = $(this).parent().attr('data-tsvg-select');
					if (tsvg_theme_name == 'Grid Video Gallery') {
						$(`#TotalSoft_GV_1_07`).parent().css('display', 'none');
						if (tsvg_change_style == "TotalSoft_GV_1_06") {
							if ($(this).attr('data-tsvg-pos') == 'opacity') {
								$(`#TotalSoft_GV_1_07`).parent().removeAttr('style');
							}
							else{
								$(`#TotalSoft_GV_1_07`).parent().css('display','visible');
							}
						}
						$(`#TotalSoft_GV_1_08`).parent().css('display', 'none');
						if (tsvg_change_style == "TotalSoft_GV_1_06") {
							if ($(this).attr('data-tsvg-pos') == 'drop-shadow') {
								$(`#TotalSoft_GV_1_08`).parent().removeAttr('style');
							}
						}
					}
					if (tsvg_styles.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_styles[tsvg_change_style] = $(this).attr('data-tsvg-pos');
					} else if (tsvg_theme_settings.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_theme_settings[`${tsvg_change_style}`] = $(this).attr('data-tsvg-pos');
					} else if (tsvg_theme_option_style.hasOwnProperty(`${`${tsvg_change_style}`}`)) {
						tsvg_theme_option_style[`${tsvg_change_style}`] = $(this).attr('data-tsvg-pos');
					}
					if (tsvg_theme_name == 'Content Popup') {
						if (tsvg_change_style == "TotalSoft_GV_1_09") {
							let TotSoft = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'],
								tsvg_totalsoftview = $(" .tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_09'] .tsvg_active").attr('data-tsvg-pos');
							$(`.totalsoftview${tsvg_TS_VG_SetType}`).removeAttr('class').attr('class', `TS_VGallery_view totalsoftview totalsoftview${tsvg_TS_VG_SetType} totalsoftview-${TotSoft[tsvg_totalsoftview]}`);
						}
					}
					if (tsvg_theme_name == "Thumbnails Video") {
						if ($(this).closest(".tsvg_position_select").attr("data-tsvg-select") == "TotalSoft_GV_1_02" || $(this).closest(".tsvg_position_select").attr("data-tsvg-select") == "TotalSoft_GV_1_01") {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
							jQuery(`.totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}`).adipoli(
								{
									'startEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_01'] .tsvg_active").attr('data-tsvg-pos'),
									'hoverEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
									'imageOpacity': 1,
									'animSpeed': $("#TotalSoft_GV_1_03").val(),
									'fillColor': $("#TotalSoft_GV_1_04").val(),
									'textColor': '#ffffff',
									'overlayText': '<i class="' + $("#TotalSoft_GV_2_14-icon_value").val() + '"></i>',
									'slices': $("#TotalSoft_GV_1_05").val(),
									'boxCols': $("#TotalSoft_GV_1_06").val(),
									'boxRows': $("#TotalSoft_GV_1_07").val(),
									'popOutMargin': $("#TotalSoft_GV_1_08").val(),
									'popOutShadow': $("#TotalSoft_GV_1_09").val(),
									'popOutShadowC': $("#TotalSoft_GV_1_10").val(),
								}
							);
							if (jQuery(window).width() < 820) {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).boxer({ mobile: true });
							} else {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
							}
						}
					}
					if ($(this).parent().attr('data-change-prop').indexOf("data") != -1) {
						$(`${$(this).parent().attr('data-change-elem')}`).attr(`${$(this).parent().attr('data-change-prop')}`, $(this).attr('data-tsvg-pos'));
					} else {
						document.documentElement.style.setProperty(`${$(this).parent().attr('data-change-prop')}`, $(this).attr('data-tsvg-pos'));
					}
					if (tsvg_theme_name == 'Parallax Engine') {
						var TotalSoft_JGV_P_T = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-type');
						var TotalSoft_JGV_P1S_ET = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-efect');
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
						if (TotalSoft_JGV_P_T == 1) {
							jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).swipebox();
						} else {
							jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).colorbox(
								{
									iframe: true, transition: TotalSoft_JGV_P1S_ET, innerWidth: jQuery(window).width() * 0.7, innerHeight: jQuery(window).width() * 0.7 * 0.6, maxWidth: "80%", maxHeight: "80%", current: "", rel: 'slideshow', slideshow: false
								}
							);
						}
						let mask_1 = jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_1`).attr("data-tsvg-ef").replace("_1", "");
						let mask_2 = jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_2`).attr("data-tsvg-ef").replace("_2", "");
						let mask_3 = jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_3`).attr("data-tsvg-ef").replace("_3", "");
						let mask_4 = jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_4`).attr("data-tsvg-ef").replace("_4", "");
						jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask`).removeAttr('style');
						jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_1`).attr("data-tsvg-ef", mask_1 + "_1");
						jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_2`).attr("data-tsvg-ef", mask_2 + "_2");
						jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_3`).attr("data-tsvg-ef", mask_3 + "_3");
						jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_4`).attr("data-tsvg-ef", mask_4 + "_4");
						TotalSoft_Hov_Anim();
					}
					paginationGenerate();
				}
			);
			$(document).on(
				'input',
				'.tsvg_range_input',
				function (event) {
					$(`.tsvg_range_div_title[data-tsvg-field="${$(this).attr('id')}"]`).attr('data-tsvg-length', `${event.target.value}${$(this).attr('data-tsvg-param')}`);
					var tsvg_range_width = (100 * ($(this).val() - $(this).attr('min'))) / ($(this).attr('max') - $(this).attr('min')),
						tsvg_range_background = `linear-gradient(90deg,#4b55be ${tsvg_range_width}%,rgba( 204, 204, 204, 0.214 ) ${tsvg_range_width + 0.1}%)`;
					$(this).css('background', tsvg_range_background);
					var tsvg_change_style = $(this).attr('id');
					if (tsvg_styles.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_styles[tsvg_change_style] = event.target.value;
					} else if (tsvg_theme_settings.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_theme_settings[tsvg_change_style] = event.target.value;
					} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_theme_option_style[`${tsvg_change_style}`] = event.target.value;
					}
					document.documentElement.style.setProperty($(this).attr('data-tsvg-change'), `${$(this).val() + $(this).attr('data-tsvg-param')}`);
					if (event.isTrigger === "undefined") {
						if (tsvg_theme_name == 'Grid Video Gallery') {
							CBPGridGalleryForAdmin();
						}
					}
					if (tsvg_theme_name == 'Grid Video Gallery') {
						CBPGridGalleryForAdmin();
					}
					if ($(this).attr("id") == "TotalSoft_VGallery_Set_02") {
						jQuery(`.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr('data-item-number', $(this).val());
						if (jQuery(`.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-pagination") == 'pagination' || jQuery(`.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-pagination") == 'load-more') {
							paginationGenerate();
						}
					}
				}
			);
			$(document).on(
				'input',
				'input.tsvg_checkbox_input',
				function (event) {
					if (tsvg_styles.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_styles[`${$(this).attr("id")}`] = `${$(this).is(':checked')}`;
					} else if (tsvg_theme_settings.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_theme_settings[`${$(this).attr("id")}`] = `${$(this).is(':checked')}`;
					} else if (tsvg_theme_option_style.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_theme_option_style[`${$(this).attr("id")}`] = `${$(this).is(':checked')}`;
					}
					if ($(this).is(':checked')) {
						$(`${$(this).attr('data-change-elem')}`).attr(`${$(this).attr('data-change-prop')}`, $(this).parent().attr('data-tsvg-check'));
					} else {
						$(`${$(this).attr('data-change-elem')}`).attr(`${$(this).attr('data-change-prop')}`, $(this).parent().attr('data-tsvg-uncheck'));
					}
					if (tsvg_theme_name == 'Grid Video Gallery') {
						CBPGridGalleryForAdmin();
					}
				}
			);
			$(document).on(
				'change',
				'input.tsvg_range_input',
				function (event) {
					if (tsvg_theme_name == "Fancy Gallery") {
						if ($(this).attr("id") == "TotalSoft_GV_1_33") {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li figure`).attr("data-width", $(this).val())
						}
						if ($(this).attr("id") == "TotalSoft_GV_1_34") {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li figure`).attr("data-height", $(this).val())
						}
						$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
						var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
						if (Totalsoft_FG_HOv_T == 'Default') {
							Totalsoft_FG_HOv_T = false;
						} else {
							Totalsoft_FG_HOv_T = true;
						}
						jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
							function () {
								jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
							}
						);
						jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
					}
					if (tsvg_theme_name == "Thumbnails Video") {
						if ($(this).attr("id") == "TotalSoft_GV_1_03" || $(this).attr("id") == "TotalSoft_GV_1_05" || $(this).attr("id") == "TotalSoft_GV_1_06" || $(this).attr("id") == "TotalSoft_GV_1_07" || $(this).attr("id") == "TotalSoft_GV_1_08" || $(this).attr("id") == "TotalSoft_GV_1_09") {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
							jQuery(`.totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}`).adipoli(
								{
									'startEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_01'] .tsvg_active").attr('data-tsvg-pos'),
									'hoverEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
									'imageOpacity': 1,
									'animSpeed': $("#TotalSoft_GV_1_03").val(),
									'fillColor': $("#TotalSoft_GV_1_04").val(),
									'textColor': '#ffffff',
									'overlayText': '<i class="' + $("#TotalSoft_GV_2_14-icon_value").val() + '"></i>',
									'slices': $("#TotalSoft_GV_1_05").val(),
									'boxCols': $("#TotalSoft_GV_1_06").val(),
									'boxRows': $("#TotalSoft_GV_1_07").val(),
									'popOutMargin': $("#TotalSoft_GV_1_08").val(),
									'popOutShadow': $("#TotalSoft_GV_1_09").val(),
									'popOutShadowC': $("#TotalSoft_GV_1_10").val(),
								}
							);
							if (jQuery(window).width() < 820) {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).boxer({ mobile: true });
							} else {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
							}
						}
					}
				}
			)
			$('.tsvg_range_input').trigger('input');
			$(document).on(
				'input',
				'input.tsvg_text_input',
				function (event) {
					if ($(this).attr('id') == 'TotalSoft_VGallery_Sty_01') {
						$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
					}
					if ($(this).attr('id') == 'TotalSoft_VGallery_Sty_02') {
						$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
					}
					if ($(this).attr('id') == 'TotalSoft_VGallery_Sty_18') {
						$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
					}
					if (tsvg_theme_name == 'Classic Gallery') {
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Content Popup') {
						if ($(this).attr('id') == 'TotalSoft_GV_1_30') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_1_29') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Effective Gallery') {
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Elastic Gallery') {
						if ($(this).attr('id') == 'TotalSoft_GV_2_05') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_2_06') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Fancy Gallery') {
						if ($(this).attr('id') == 'TotalSoft_GV_2_14') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_2_13') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Gallery Album') {
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Grid Video Gallery') {
						if ($(this).attr('id') == 'TotalSoft_GV_2_12') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_2_13') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'LightBox Video Gallery') {
						if ($(this).attr('id') == 'TotalSoft_GV_1_37') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_1_38') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Parallax Engine') {
						if ($(this).attr('id') == 'TotalSoft_GV_2_06') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_2_07') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Space Gallery') {
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if (tsvg_theme_name == 'Thumbnails Video') {
						if ($(this).attr('id') == 'TotalSoft_GV_1_38') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-next-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_GV_1_39') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-prev-item", event.target.value);
						}
						if ($(this).attr('id') == 'TotalSoft_VGallery_Set_03') {
							$(`.ts_vgallery_section_${tsvg_TS_VG_SetType} .pagination`).attr("data-load-text", event.target.value);
						}
					}
					if ($(this).attr('data-change-prop')) {
						$(`${$(this).attr('data-tsvg-elem')}`).attr(
							`${$(this).attr('data-change-prop')}`,
							event.target.value
						);
					} else {
						$(`${$(this).attr('data-tsvg-elem')}`).text(event.target.value);
					}
					var tsvg_change_style = $(this).attr('id');
					if (tsvg_styles.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_styles[tsvg_change_style] = event.target.value;
					} else if (tsvg_theme_settings.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_theme_settings[tsvg_change_style] = event.target.value;
					} else if (tsvg_theme_option_style.hasOwnProperty(`${tsvg_change_style}`)) {
						tsvg_theme_option_style[tsvg_change_style] = event.target.value;
					}
				}
			);
			$(document).on(
				'change',
				'.tsvg_select_div > select',
				function (event) {
					if (tsvg_styles.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_styles[`${$(this).attr("id")}`] = `${event.target.value}`;
					} else if (tsvg_theme_settings.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_theme_settings[`${$(this).attr("id")}`] = `${event.target.value}`;
					} else if (tsvg_theme_option_style.hasOwnProperty(`${$(this).attr("id")}`)) {
						tsvg_theme_option_style[`${$(this).attr("id")}`] = `${event.target.value}`;
					}
					if ($(this).hasClass('tsvg_root_elem')) {
						document.documentElement.style.setProperty($(this).attr('data-change-prop'), event.target.value);
					} else {
						$(`${$(this).attr('data-change-elem')}`).attr(`${$(this).attr('data-change-prop')}`, event.target.value);
					}
					if ($(this).attr("id") == "ts_vgallery_a_iht") {
						if (event.target.value == "fixed") {
							$(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr']").parent().attr("style", "display:none");
							$(".tsvg_range_div_title[data-tsvg-field='ts_vgallery_a_ih']").parent().removeAttr("style");
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-tsvg-ratio", "none");
							$(`input#ts_vgallery_a_ih`).trigger("input");
						} else {
							$(".tsvg_range_div_title[data-tsvg-field='ts_vgallery_a_ih']").parent().attr("style", "display:none");
							$(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr']").parent().removeAttr("style");
							if ($(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr'] > .tsvg_active").length > 0) {
								$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).attr("data-tsvg-ratio", $(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr'] > .tsvg_active").attr("data-tsvg-pos"));
								tsvg_styles["ts_vgallery_a_ih"] = $(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr'] > .tsvg_active").attr("data-tsvg-pos");
							} else {
								$(".tsvg_position_select[data-tsvg-select='ts_vgallery_a_ihr > .tsvg_position_item']").first().trigger("click");
							}
						}
						$('.tsvg_accordion_item_opened.video-image').children(".tsvg_accordion_item_content").height(`${$('.tsvg_accordion_item_opened.video-image').children(".tsvg_accordion_item_content").children(".tsvg_accordion_items").prop("scrollHeight")}px`);
					}
					if ($(this).attr("id") == "ts_vgallery_p_sheff") {
						$(`.ts_vgallery_r_section_${tsvg_TS_VG_SetType},#ts_vgallery_modal_result_section_${tsvg_TS_VG_SetType}`).removeAttr("style");
					}
					if ($(this).attr("id") == "TotalSoft_VGallery_Set_01") {
						$("#TotalSoft_VGallery_Set_02").parent().attr("style", "display:none;");
						$("#TotalSoft_VGallery_Set_03").parent().attr("style", "display:none;");
						$("[data-tsvg-select='TotalSoft_VGallery_Set_05']").parent().attr("style", "display:none;");
						$("[data-tsvg-select='TotalSoft_VGallery_Set_06']").parent().attr("style", "display:none;");
						$("[data-tsvg-select='TotalSoft_VGallery_Set_08']").parent().attr("style", "display:none;");
						$("#TotalSoft_VGallery_Set_03").parent().attr("style", "display:none;");
						$(".tsvg_accordion_item.style").attr("style", "display:none;");
						$("#TotalSoft_VGallery_Sty_01,#TotalSoft_VGallery_Sty_02,#TotalSoft_VGallery_Sty_03,#TotalSoft_VGallery_Sty_04,#TotalSoft_VGallery_Sty_05,#TotalSoft_VGallery_Sty_06,#TotalSoft_VGallery_Sty_07,#TotalSoft_VGallery_Sty_08,#TotalSoft_VGallery_Sty_09,#TotalSoft_VGallery_Sty_10,#TotalSoft_VGallery_Sty_11,#TotalSoft_VGallery_Sty_12,#TotalSoft_VGallery_Sty_13,#TotalSoft_VGallery_Sty_14-icon-picker-wrap,#TotalSoft_VGallery_Sty_15-icon-picker-wrap,#TotalSoft_VGallery_Sty_16,[data-tsvg-select='TotalSoft_VGallery_Sty_17'],#TotalSoft_VGallery_Sty_18,#TotalSoft_VGallery_Sty_19,#TotalSoft_VGallery_Sty_20,#TotalSoft_VGallery_Sty_21,#TotalSoft_VGallery_Sty_22,#TotalSoft_VGallery_Sty_23,#TotalSoft_VGallery_Sty_24-icon-picker-wrap,#TotalSoft_VGallery_Sty_25,#TotalSoft_VGallery_Sty_26,#TotalSoft_VGallery_Sty_27").parent().attr("style", "display:none;");
						jQuery('.pagination li').remove();
						switch (event.target.value) {
							case "pagination":
								$("#TotalSoft_VGallery_Set_02").parent().removeAttr("style");
								$("[data-tsvg-select='TotalSoft_VGallery_Set_05']").parent().removeAttr("style");
								$("[data-tsvg-select='TotalSoft_VGallery_Set_06']").parent().removeAttr("style");
								$("#TotalSoft_VGallery_Sty_01,#TotalSoft_VGallery_Sty_02,#TotalSoft_VGallery_Sty_03,#TotalSoft_VGallery_Sty_04,#TotalSoft_VGallery_Sty_05,#TotalSoft_VGallery_Sty_06,#TotalSoft_VGallery_Sty_07,#TotalSoft_VGallery_Sty_08,#TotalSoft_VGallery_Sty_09,#TotalSoft_VGallery_Sty_10,#TotalSoft_VGallery_Sty_11,#TotalSoft_VGallery_Sty_12,#TotalSoft_VGallery_Sty_13,#TotalSoft_VGallery_Sty_14-icon-picker-wrap,#TotalSoft_VGallery_Sty_15-icon-picker-wrap,#TotalSoft_VGallery_Sty_16").parent().removeAttr("style");
								$(".tsvg_accordion_item.style").removeAttr("style");
								paginationGenerate();
								break;
							case "load-more":
								$("#TotalSoft_VGallery_Set_02").parent().removeAttr("style");
								$("#TotalSoft_VGallery_Set_03").parent().removeAttr("style");
								$("[data-tsvg-select='TotalSoft_VGallery_Set_08']").parent().removeAttr("style");
								$("[data-tsvg-select='TotalSoft_VGallery_Sty_17'],#TotalSoft_VGallery_Sty_18,#TotalSoft_VGallery_Sty_19,#TotalSoft_VGallery_Sty_20,#TotalSoft_VGallery_Sty_21,#TotalSoft_VGallery_Sty_22,#TotalSoft_VGallery_Sty_23,#TotalSoft_VGallery_Sty_24-icon-picker-wrap,#TotalSoft_VGallery_Sty_25,#TotalSoft_VGallery_Sty_26,#TotalSoft_VGallery_Sty_27").parent().removeAttr("style");
								$(".tsvg_accordion_item.style").removeAttr("style");
								paginationGenerate();
								break;
							default:
								if (tsvg_theme_name == 'Grid Video Gallery') {
									CBPGridGalleryForAdmin();
								}
								break;
						}
						$('.tsvg_accordion_item.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").height(`${$('.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").children(".tsvg_accordion_items").prop("scrollHeight")}px`)
					}
					if (tsvg_theme_name == "Grid Video Gallery") {
						if ($(this).attr("id") == "TotalSoft_GV_1_06") {
							$("#TotalSoft_GV_1_07").parent().attr("style", "display:none;");
							$("#TotalSoft_GV_1_08").parent().attr("style", "display:none;");
							switch (event.target.value) {
								case "opacity":
									$("#TotalSoft_GV_1_07").parent().removeAttr("style");
									break;
								case "drop-shadow":
									$("#TotalSoft_GV_1_08").parent().removeAttr("style");
									break;
								default:
									break;
							}
							$('.tsvg_accordion_item.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").height(`${$('.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").children(".tsvg_accordion_items").prop("scrollHeight")}px`)
						}
					}
					if (tsvg_theme_name == "Thumbnails Video") {
						if ($(this).attr("id") == "TotalSoft_GV_1_02") {
							$("#TotalSoft_GV_1_03,#TotalSoft_GV_1_05,#TotalSoft_GV_1_06,#TotalSoft_GV_1_07,#TotalSoft_GV_1_08,#TotalSoft_GV_1_09,#TotalSoft_GV_1_10").parent().attr("style", "display:none;");
							const slice = ["sliceDown", "sliceDownLeft", "sliceUp", "sliceUpLeft", "sliceUpRandom", "sliceUpDownLeft", "sliceDownRandom", "sliceUpDown", "fold", "foldLeft"];
							const box = ["boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse"];
							switch (event.target.value) {
								case "normal":
									$("#TotalSoft_GV_1_03").parent().removeAttr("style");
									break;
								case "popout":
									$("#TotalSoft_GV_1_08,#TotalSoft_GV_1_09,#TotalSoft_GV_1_10").parent().removeAttr("style");
									break;
								default:
									break;
							}
							if (slice.includes(event.target.value)) {
								$("#TotalSoft_GV_1_03,#TotalSoft_GV_1_05,#TotalSoft_GV_1_06").parent().removeAttr("style");
							}
							if (box.includes(event.target.value)) {
								$("#TotalSoft_GV_1_03,#TotalSoft_GV_1_07,#TotalSoft_GV_1_06").parent().removeAttr("style");
							}
							$('.tsvg_accordion_item.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").height(`${$('.tsvg_accordion_item_opened').children(".tsvg_accordion_item_content").children(".tsvg_accordion_items").prop("scrollHeight")}px`)
						}
						if ($(this).attr("id") == "TotalSoft_GV_1_02" || $(this).attr("id") == "TotalSoft_GV_1_01") {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
							jQuery(`.totalsoft_gv_tv_img_${tsvg_TS_VG_SetType}`).adipoli(
								{
									'startEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_01'] .tsvg_active").attr('data-tsvg-pos'),
									'hoverEffect': $(".tsvg_position_select[data-tsvg-select='TotalSoft_GV_1_02'] .tsvg_active").attr('data-tsvg-pos'),
									'imageOpacity': 1,
									'animSpeed': $("#TotalSoft_GV_1_03").val(),
									'fillColor': $("#TotalSoft_GV_1_04").val(),
									'textColor': '#ffffff',
									'overlayText': '<i class="' + $("#TotalSoft_GV_2_14-icon_value").val() + '"></i>',
									'slices': $("#TotalSoft_GV_1_05").val(),
									'boxCols': $("#TotalSoft_GV_1_06").val(),
									'boxRows': $("#TotalSoft_GV_1_07").val(),
									'popOutMargin': $("#TotalSoft_GV_1_08").val(),
									'popOutShadow': $("#TotalSoft_GV_1_09").val(),
									'popOutShadowC': $("#TotalSoft_GV_1_10").val(),
								}
							);
							if (jQuery(window).width() < 820) {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).boxer({ mobile: true });
							} else {
								jQuery(`.boxer_${tsvg_TS_VG_SetType}`).not(".retina, .boxer_fixed, .boxer_top, .boxer_format, .boxer_mobile, .boxer_object").boxer();
							}
						}
					}
					if (tsvg_theme_name == 'Fancy Gallery') {
						if ($(this).attr("id") == "TotalSoft_GV_1_28") {
							var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
							if (Totalsoft_FG_HOv_T == 'Default') {
								Totalsoft_FG_HOv_T = false;
							} else {
								Totalsoft_FG_HOv_T = true;
							}
							jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
								function () {
									jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
								}
							);
						}
					}
					if (tsvg_theme_name == 'Parallax Engine') {
						if ($(this).attr("id") == "TotalSoft_GV_1_19") {
							TotalSoft_Hov_Anim();
							jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask`).removeAttr('style');
							jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_1`).attr("data-tsvg-ef", jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_1`).attr("data-tsvg-ef") + "_1");
							jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_2`).attr("data-tsvg-ef", jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_2`).attr("data-tsvg-ef") + "_2");
							jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_3`).attr("data-tsvg-ef", jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_3`).attr("data-tsvg-ef") + "_3");
							jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_4`).attr("data-tsvg-ef", jQuery(`.TotalSoft_H_Ef${tsvg_TS_VG_SetType} .mask_4`).attr("data-tsvg-ef") + "_4");
						}
						if ($(this).attr("id") == "TotalSoft_GV_1_26") {
							TotalSoft_Hov_Anim();
						}
						if ($(this).attr("id") == "TotalSoft_GV_1_29" || $(this).attr("id") == "TotalSoft_GV_1_30") {
							var TotalSoft_JGV_P_T = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-type');
							var TotalSoft_JGV_P1S_ET = jQuery(`.TotSoft_GV_Container_${tsvg_TS_VG_SetType}`).attr('data-item-efect');
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
							if (TotalSoft_JGV_P_T == 1) {
								jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).swipebox();
							} else {
								jQuery(`.swipebox${tsvg_TS_VG_SetType}-video-TotSoft${tsvg_TS_VG_SetType}`).colorbox(
									{
										iframe: true, transition: TotalSoft_JGV_P1S_ET, innerWidth: jQuery(window).width() * 0.7, innerHeight: jQuery(window).width() * 0.7 * 0.6, maxWidth: "80%", maxHeight: "80%", current: "", rel: 'slideshow', slideshow: false
									}
								);
							}
						}
					}
				}
			);
			$(".tsvg_select_div > select#TotalSoft_GV_1_02").trigger("change");
			$(".tsvg_select_div > select#TotalSoft_GV_1_06").trigger("change");
			$(".tsvg_select_div > select#TotalSoft_VGallery_Set_01").trigger("change");
			if (tsvg_theme_name == "Image vgallery" || tsvg_theme_name == "Video vgallery") {
				$(".tsvg_select_div > select#ts_vgallery_a_iht").trigger('change');
			}
			$(document).on(
				'click',
				'.tsvg_save_btn ',
				function () {
					var tsvg_video_sort_array = [];
					$("#tsvg-list > .tsvg-list-item").each(
						function () {
							tsvg_video_sort_array.push($(this).attr("aria-tsvg-video"));
						}
					)
					$.ajax(
						{
							url: tsvgallery_builder_json.ajaxurl,
							data: {
								action: 'tsvg_save_question',
								tsvg_nonce: tsvgallery_builder_json.tsvg_nonce,
								tsvg_id: tsvg_TS_VG_SetType,
								tsvg_TS_VG_Title: tsvgallery_builder_json.tsvg_proporties.TS_VG_Title,
								tsvg_videos: tsvg_videos_props_arr,
								tsvg_TS_VG_Sort: tsvg_video_sort_array,
								tsvg_TS_VG_Styles: tsvg_styles,
								tsvg_TS_VG_Options: tsvg_TS_VG_Options,
								tsvg_TS_VG_Settings: tsvg_theme_settings,
								tsvg_TS_VG_Option_Style: tsvg_theme_option_style,
								tsvg_deleted_videos: tsvg_delete_ids,
							},
							beforeSend: function () {
								$("section#tsvg_loader").attr("style", "z-index: 100053;");
							},
							type: 'POST',
						}
					).done(
						function (response) {
							if (response.success === true) {
								if (response.data.hasOwnProperty("url")) {
									window.location.href = response.data.url;
								} else {
									toastr["error"](`Your vgallery isn't saved.`, 'Error', tsvg_toastr_options)
									setTimeout(
										() => {
											window.location.href = window.location.href;
										},
										400
									);
								}
							}
						}
					).fail(
						function (response) {
							toastr["error"](`Your vgallery isn't saved.`, 'Error', tsvg_toastr_options)
							setTimeout(
								() => {
									window.location.href = window.location.href;
								},
								400
							);
						}
					);
				}
			);
			// Sortable list videos
			$('#tsvg-list').sortable(
				{
					cursor: 'move',
					handle: ".tsvg_handle_list",
					placeholder: "tsvg-portlet-placeholder",
					update: function (event, ui) {
						if ($(ui.item).prev().attr('aria-tsvg-video') == null) {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} ul li[data-tsvg-id='${$(ui.item).attr("aria-tsvg-video")}']`).insertBefore($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} > figure > ul > li:first-child`));
							if (tsvg_theme_name == 'Grid Video Gallery') {
								$(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} ul li[data-tsvg-id='${$(ui.item).attr("aria-tsvg-video")}']`).insertBefore($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} > ul > li:first-child`));
								CBPGridGalleryForAdmin();
							}
						} else {
							$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} ul li[data-tsvg-id='${$(ui.item).attr("aria-tsvg-video")}']`).insertAfter($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType} > figure > ul > li[data-tsvg-id="${$(ui.item).prev().attr('aria-tsvg-video')}"]`));
							if (tsvg_theme_name == 'Grid Video Gallery') {
								$(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} ul li[data-tsvg-id='${$(ui.item).attr("aria-tsvg-video")}']`).insertAfter($(`.TS_VGallery_slideshow${tsvg_TS_VG_SetType} > ul > li[data-tsvg-id="${$(ui.item).prev().attr('aria-tsvg-video')}"]`));
								CBPGridGalleryForAdmin();
							}
						}
						paginationGenerate();
					},
				}
			);
			jQuery(document).on(
				"click",
				"div.tsvg_img_change",
				function (e) {
					e.preventDefault();
					var tsvg_wp_media_library;
					if (tsvg_wp_media_library) {
						tsvg_wp_media_library.open();
					}
					tsvg_wp_media_library = wp.media(
						{
							frame: 'post',
							type: 'image',
							multiple: false,
							states: [new wp.media.controller.Library(
								{
									title: 'Select image',
									library: wp.media.query(
										{
											type: 'image'
										}
									),
									multiple: false,
									date: false,
									gallery: false,
								}
							)]
						}
					);
					tsvg_wp_media_library.state('embed').on(
						'select',
						function () {
							var state = tsvg_wp_media_library.state('embed'),
								type = state.get('type'),
								embed = state.props.toJSON();
							if (type == "image") {
								tsvgSetImage("embed", "", embed.url, embed.height, embed.width);
							} else {
								tsvgSetImage("embed", "", tsvgallery_builder_json.tsvg_no_img, "600", "600");
								toastr["error"](`Your inserted file type isn't image.`, 'Error', tsvg_toastr_options);
							}
						}
					);
					tsvg_wp_media_library.state('library').on(
						'select',
						function () {
							var selection = tsvg_wp_media_library.state('library').get('selection'),
								tsvg_selection_id = "";
							selection.each(
								function (attachment) {
									tsvg_selection_id = attachment["id"];
								}
							);
							if (Number.isInteger(tsvg_selection_id)) {
								var url = wp.media.attachment(tsvg_selection_id).get('url');
								var width = wp.media.attachment(tsvg_selection_id).get('width');
								var height = wp.media.attachment(tsvg_selection_id).get('height');
								tsvgSetImage("library", tsvg_selection_id, url, width, height);
							}
						}
					);
					tsvg_wp_media_library.on(
						'open',
						function () {
							$("button#menu-item-video-playlist,button#menu-item-playlist,button#menu-item-gallery,button#menu-item-insert").remove();
							var tsvg_selected_attachment = jQuery('input#tsvg_video_attachment_id').val();
							if (Number.isInteger(+tsvg_selected_attachment)) {
								$("button#menu-item-library").trigger("click");
								var selection = tsvg_wp_media_library.state('library').get('selection');
								var attachment = wp.media.attachment(+tsvg_selected_attachment);
								attachment.fetch();
								selection.add(attachment ? [attachment] : []);
							} else {
								$("button#menu-item-embed").trigger("click");
								$("input#embed-url-field").val(tsvg_selected_attachment).trigger("input");
							}
						}
					);
					tsvg_wp_media_library.open();
				}
			);
			jQuery(document).on(
				"click",
				"div.tsvg_vd_change",
				function (e) {
					e.preventDefault();
					var tsvg_wp_media_library;
					if (tsvg_wp_media_library) {
						tsvg_wp_media_library.open();
					}
					tsvg_wp_media_library = wp.media(
						{
							frame: 'post',
							type: 'video',
							multiple: false,
							states: [new wp.media.controller.Library(
								{
									title: 'Select video',
									library: wp.media.query(
										{
											type: 'video'
										}
									),
									multiple: false,
									date: false,
									gallery: false,
								}
							)]
						}
					);
					tsvg_wp_media_library.state('embed').on(
						'select',
						function () {
							var state = tsvg_wp_media_library.state('embed'),
								type = state.get('type'),
								embed = state.props.toJSON(),
								url = embed.url;
							var url_split = url.split("&");
							url = url_split[0];
							var regexp = /https?:\/\/www\.youtube\.com\/embed\/([^/]+)/;
							var youTubeEmbedMatch = regexp.exec(url);
							if (youTubeEmbedMatch) {
								url = 'https://www.youtube.com/watch?v=' + youTubeEmbedMatch[1];
							}
							if (url.indexOf('https://youtu.be/') > -1) {
								let split_be = url.split('youtu.be/');
								url = 'https://www.youtube.com/watch?v=' + split_be[1];
							}
							// else {
							// 	let url_watch = url.split("embed/");
							// 	if (url_watch > 1) {
							// 		url = 'https://www.youtube.com/watch?v=' + url_watch[1];
							// 	}
							// }
							wp.apiRequest(
								{
									url: wp.media.view.settings.oEmbedProxyUrl,
									data: {
										url: url,
									},
									beforeSend: function () {
										$(".tsvg_vd_loading_div").removeAttr("style");
									},
									type: 'GET',
									dataType: 'json',
									context: this
								}
							).done(
								function (response) {

									if (response.hasOwnProperty("thumbnail_url")) {
										var tsvgImgSrc = response.thumbnail_url;
										var tsvgImgW = response.thumbnail_width;
										var tsvgImgH = response.thumbnail_height;
										if (tsvgImgSrc.includes('hqdefault.jpg')) {
											tsvgImgSrc = tsvgImgSrc.replace('hqdefault.jpg', 'mqdefault.jpg');
											tsvgImgW = 320;
											tsvgImgH = 180;
										}
										tsvgSetImage("embed", "", tsvgImgSrc, tsvgImgW, tsvgImgH);
										toastr["info"](`Your selected video has thumbnail,but you can change it.`, 'Info', tsvg_toastr_options);
									} else {
										if (response.provider_name == "Embed Handler") {
											response.html = ` <video controls="" name="media"><source src="${url}"></video>`;
										}
										toastr["warning"](`Your selected video has not thumbnail,but you can add image.`, 'Warning', tsvg_toastr_options);
									}
									jQuery('.tsvg_vd_change').children("iframe").remove();
									jQuery('.tsvg_vd_change').children("video").remove();
									jQuery('.tsvg_vd_change').children("blockquote").remove();
									jQuery('.tsvg_img_div_edit').removeAttr("style");
									jQuery('input#tsvg_video_video_attachment_id').val(url);
									jQuery('.tsvg_vd_change > img').attr("style", "display:none;");
									jQuery('.tsvg_vd_change').prepend(response.html);
									$(".tsvg_vd_loading_div").attr("style", "display:none;");
									var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
									var match = url.match(regExp);
									if (match) {
										url = 'https://player.vimeo.com/video/' + match[5] ;
										// + '?autoplay=1&loop=1&autopause=0';
									} else {
										if (response.provider_url === "https://rumble.com/") {
											let rumblerIframeDiv = document.createElement('div')
											rumblerIframeDiv.innerHTML = response.html
											url = rumblerIframeDiv.querySelector('iframe').src;
										} else {
											if (response.provider_name === "YouTube") {
												var url_ifr = url.split("=");
												if (url_ifr.length > 1) {
													url = 'https://www.youtube.com/embed/' + url_ifr[1];
													//  + '?autoplay=1&mute=1';
												}
											}
										}
									}
									tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Vd = url;
									if (tsvg_theme_name == 'Grid Video Gallery') {
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).removeClass('videocontainer imagecontainer');
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).addClass("iframecontainer");
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Imagediv`).remove();
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] figure`).append(`<div class="TotalSoft_GV_SG_Imagediv TotalSoft_iframe-field" data-creat_src="${url}"><img src="${tsvgImgSrc}" class="TotalSoft_bgr_iframe"><img src="${tsvgallery_builder_json.tsvg_image_load}" class="TotalSoft_loder TotalSoft_loder_hide"></div>`);
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).find('.TotalSoft_iframe-field').attr('data-creat_src', url);
										$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Videodiv`).removeClass("TotalSoft_GV_SG_Videodiv").addClass("TotalSoft_GV_SG_Imagediv");
									}
									if (tsvg_theme_name == 'LightBox Video Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_gv-lvg-image-block${tsvg_TS_VG_SetType}`).attr("data-tsvg-href", url)
									}
									if (tsvg_theme_name == 'Thumbnails Video') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr("href", url)
									}
									if (tsvg_theme_name == 'Content Popup') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-href", url)
									}
									if (tsvg_theme_name == 'Elastic Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-src", url)
									}
									if (tsvg_theme_name == 'Fancy Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}' ] figure `).attr("data-href", url);
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
										var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
										if (Totalsoft_FG_HOv_T == 'Default') {
											Totalsoft_FG_HOv_T = false;
										} else {
											Totalsoft_FG_HOv_T = true;
										}
										jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
											function () {
												jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
											}
										);
										jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
									}
									if (tsvg_theme_name == 'Parallax Engine') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}' ]`).attr("data-href", url);
									}
									if (tsvg_theme_name == 'Classic Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-src", url)
									}
									if (tsvg_theme_name == 'Space Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-src", url);
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Videodiv `).html(` <iframe src="${url}" frameborder = "0" webkitAllowFullScreen > </iframe> `)
									}
									if (tsvg_theme_name == 'Effective Gallery') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-lv", url);
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-li", url);
									}
									if (tsvg_theme_name == 'Gallery Album') {
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Vid_Div1_${tsvg_TS_VG_SetType} `).html(` <iframe src="${url}" frameborder = "0" webkitAllowFullScreen > </iframe> `);
										$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType} `).html(` <iframe src="${url}" frameborder = "0" webkitAllowFullScreen > </iframe> `);
									}
								}
							).fail(
								function () {
									$(".tsvg_vd_loading_div").attr("style", "display:none;");
									toastr["error"](`Your inserted link isn't valid.`, 'Error', tsvg_toastr_options)
								}
							);
						}
					);
					tsvg_wp_media_library.state('library').on(
						'select',
						function () {
							$(".tsvg_vd_loading_div").removeAttr("style");
							var selection = tsvg_wp_media_library.state('library').get('selection'),
								tsvg_selection_id = "";
							selection.each(
								function (attachment) {
									tsvg_selection_id = attachment["id"];
								}
							);
							if (Number.isInteger(tsvg_selection_id)) {
								toastr["warning"](`Your selected video has not thumbnail,but you can add image.`, 'Warning', tsvg_toastr_options);
								jQuery('.tsvg_vd_change').children("iframe").remove();
								jQuery('.tsvg_vd_change').children("video").remove();
								jQuery('.tsvg_vd_change').children("blockquote").remove();
								jQuery('.tsvg_img_div_edit').removeAttr("style");
								var url = wp.media.attachment(tsvg_selection_id).get('url');
								tsvg_videos_props_arr[`${tsvg_edit_elem_id}`].TS_VG_Options.TotalSoftVGallery_Vid_Vd = url;
								if (tsvg_theme_name == 'LightBox Video Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_VGallery_gv-lvg-image-block${tsvg_TS_VG_SetType}`).attr("data-tsvg-href", url)
								}
								if (tsvg_theme_name == 'Thumbnails Video') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] a`).attr("href", url)
								}
								if (tsvg_theme_name == 'Content Popup') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-href", url)
								}
								if (tsvg_theme_name == 'Elastic Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-src", url)
								}
								if (tsvg_theme_name == 'Fancy Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] figure`).attr("data-href", url);
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).replaceWith($(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}`).clone());
									var Totalsoft_FG_HOv_T = $("#TotalSoft_GV_1_28").val();
									if (Totalsoft_FG_HOv_T == 'Default') {
										Totalsoft_FG_HOv_T = false;
									} else {
										Totalsoft_FG_HOv_T = true;
									}
									jQuery(`.Total_Soft_GV_Fancy_${tsvg_TS_VG_SetType} > li `).each(
										function () {
											jQuery(this).hoverdir({ hoverDelay: 50, inverse: Totalsoft_FG_HOv_T });
										}
									);
									jQuery(".html5lightbox").html5lightbox({}, tsvg_TS_VG_SetType);
								}
								if (tsvg_theme_name == 'Grid Video Gallery') {
									if ($(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).hasClass("imagecontainer")) $(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).removeClass("imagecontainer");
									if ($(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).hasClass("iframecontainer")) $(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).removeClass("iframecontainer");
									$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}']`).addClass("videocontainer");
									$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Imagediv`).removeClass("TotalSoft_GV_SG_Imagediv").addClass("TotalSoft_GV_SG_Videodiv");
									$(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Videodiv`).html(` <video controls="" controlslist="nodownload" name="media"><source src="${url}"></video>`);
									// $(`ul.TS_VGallery_nav-close-RW${tsvg_TS_VG_SetType}  .TS_VGallery_item[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Imagediv`).html(` <video controls="" name="media"><source src="${url}"></video>`);
								}
								if (tsvg_theme_name == 'Classic Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-src", url)
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Videodiv `).html(` <video controls="" controlslist="nodownload" name="media"><source src="${url}"></video>`)
								}
								if (tsvg_theme_name == 'Space Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-src", url);
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TotalSoft_GV_SG_Videodiv `).html(` <video controls="" controlslist="nodownload" name="media"><source src="${url}"></video>`)
								}
								if (tsvg_theme_name == 'Effective Gallery') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-lv", url);
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}']`).attr("data-tsvg-li", url);
								}
								if (tsvg_theme_name == 'Parallax Engine') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}' ]`).attr("data-href", url);
								}
								if (tsvg_theme_name == 'Gallery Album') {
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Vid_Div1_${tsvg_TS_VG_SetType} `).html(` <video controls="" controlslist="nodownload" name="media"><source src="${url}"></video>`);
									$(`main.ts_vgallery_main_${tsvg_TS_VG_SetType}  li[data-tsvg-id='${tsvg_edit_elem_id}'] .TS_GV_GA_Vid_Div2_${tsvg_TS_VG_SetType} `).html(` <video controls="" controlslist="nodownload" name="media"><source src="${url}"></video>`)
								}
								jQuery('input#tsvg_video_video_attachment_id').val(tsvg_selection_id);
								jQuery('.tsvg_vd_change').prepend(` <video controls="" controlslist="nodownload" name="media" autoplay="false"><source src="${url}"></video>`);
								jQuery('.tsvg_vd_change > img').attr("style", "display:none;");
								setTimeout(
									() => {
										$(".tsvg_vd_loading_div").attr("style", "display:none;");
									},
									200
								);
							}
						}
					);
					tsvg_wp_media_library.on(
						'open',
						function () {
							$("button#menu-item-video-playlist,button#menu-item-playlist,button#menu-item-gallery,button#menu-item-insert").remove();
							var tsvg_selected_attachment = jQuery('input#tsvg_video_video_attachment_id').val();
							if (Number.isInteger(+tsvg_selected_attachment)) {
								$("button#menu-item-library").trigger("click");
								$("input#embed-url-field").val("");
								var selection = tsvg_wp_media_library.state('library').get('selection');
								var attachment = wp.media.attachment(+tsvg_selected_attachment);
								attachment.fetch();
								selection.add(attachment ? [attachment] : []);
							} else {
								$("button#menu-item-embed").trigger("click");
								$("input#embed-url-field").val(tsvg_selected_attachment).trigger("input");
							}
						}
					);
					tsvg_wp_media_library.open();
				}
			);
		}
	});
})(jQuery);
