
<style type="text/css">


:after, :before,  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery   .pagination-outer .disabled-item{
    display: none!important;
}

.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul li,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul li,.pagination-outer[data-pagination='all']  ,.disabled-item{
    display: none!important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination-outer[data-pagination='pagination']{
    display: flex!important;
    overflow-y: hidden;
    overflow-x: auto;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .page-item a:focus{
  outline:none!important;
  box-shadow:unset!important;
}

<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Grid Video Gallery'){ ?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: flex!important;
    }
<?php } ?>

<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='LightBox Video Gallery'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: flex!important;
    }
<?php }?>

<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Thumbnails Video'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: flex!important;
    }
<?php }?>


<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Content Popup'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: inline-block!important;
    }
<?php }?>

<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Elastic Gallery'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: inline-block!important;
    }
<?php }?>


<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Fancy Gallery'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: inline-block!important;
    }
<?php }?>


<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Parallax Engine'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: inline-block!important;
    }
<?php }?>


<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Classic Gallery'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: inline-block!important;
    }
<?php }?>

<?php if($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme=='Space Gallery'){?>
    .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='pagination']  figure ul .item-show,.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>[data-pagination='load-more']  figure ul .item-show{
        display: block!important;
    }
<?php }?>

:root{

--tsvg_p_lm_bc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_08), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_c_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_09), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_fs_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_10), FILTER_VALIDATE_INT);?>px;
--tsvg_p_lm_ff_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_11), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_cbc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_12), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_cc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_13), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_hbc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_14), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_hc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_15), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm_bs_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_16), FILTER_SANITIZE_STRING);?>;
--tsvg_p_lm__bdc_<?php echo esc_attr($Total_Soft_vgallery);?>:<?php echo filter_var(esc_html($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_17), FILTER_SANITIZE_STRING);?>;
}


#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination-outer{
   text-align: center;
   display: flex;
   justify-content: center;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination{
    font-family: var(--tsvg_s_ff_<?php echo esc_attr($Total_Soft_vgallery);?>)!important;
    display: inline-flex;
    align-items: center;
    position: relative;
    padding-left: 0;
	padding: 20px 0!important;
    margin: 20px 0;
    border-radius: 4px;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination>li {
    display: inline;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination>li>a,#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination>li>span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .page-link{
  padding: 0 8px!important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure .tsvg-load{
    -webkit-transition: height 3s ease-out;
     -moz-transition: height 3s ease-out;
       -o-transition: height 3s ease-out;
      -ms-transition: height 3s ease-out;
          transition: height 3s ease-out;
}

.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination-outer[data-pagination='load-more'] .btn-lg span,.pagination-outer[data-pagination='load-more'] .btn-lg i{
  display:none;
}

.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer[data-pagination='pagination'][data-icon-show='false'] i{
  display:none;
}

.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer[data-pagination='pagination'][data-icon-show='true'] span{
  display:none;
}

.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer[data-pagination='load-more'][data-load-icon='text'] .btn-lg span{
  display:inline-block;
  vertical-align: sub;
}
	
.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer[data-pagination='load-more'][data-load-icon='icon'] .btn-lg i{
  display:inline-block;
}
	
.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination-outer[data-pagination='load-more'][data-load-icon='text-icon'] .btn-lg span,.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer[data-pagination='load-more'][data-load-icon='text-icon'] .btn-lg i{
  display:inline-block;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery a.page-link{
  display:inline-block!important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery .pagination-outer li {
    border: none !important;
    list-style: none !important;
    display: inline-block !important;
    padding: 0 !important
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='pagination'] li a {
    background-color:  var(--tsvg_p_lm_bc_<?php echo esc_attr($Total_Soft_vgallery);?>);
    color:var(--tsvg_p_lm_c_<?php echo esc_attr($Total_Soft_vgallery);?>);
    font-size: var(--tsvg_p_lm_fs_<?php echo esc_attr($Total_Soft_vgallery);?>);
    font-family: var(--tsvg_p_lm_ff_<?php echo esc_attr($Total_Soft_vgallery);?>);
    height: auto !important;
    border: 1px  var(--tsvg_p_lm_bs_<?php echo esc_attr($Total_Soft_vgallery);?>)  var(--tsvg_p_lm__bdc_<?php echo esc_attr($Total_Soft_vgallery);?>) !important;
    line-height: 1 !important;
    display: block;
    cursor: pointer;
    padding: 2px 10px;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='pagination'] li:not(.active) a:hover {
    background-color: var(--tsvg_p_lm_hbc_<?php echo esc_attr($Total_Soft_vgallery);?>) !important;
    color:  var(--tsvg_p_lm_hc_<?php echo esc_attr($Total_Soft_vgallery);?>) !important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='pagination'] .active a {
    background-color: var(--tsvg_p_lm_cbc_<?php echo esc_attr($Total_Soft_vgallery);?>);
    color: var(--tsvg_p_lm_cc_<?php echo esc_attr($Total_Soft_vgallery);?>) !important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='pagination'] {
     text-align: center !important;
}

#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='load-more'] a {
    background-color:var(--tsvg_p_lm_bc_<?php echo esc_attr($Total_Soft_vgallery);?>);
    color:var(--tsvg_p_lm_c_<?php echo esc_attr($Total_Soft_vgallery);?>);
    font-size: var(--tsvg_p_lm_fs_<?php echo esc_attr($Total_Soft_vgallery);?>);
    font-family: var(--tsvg_p_lm_ff_<?php echo esc_attr($Total_Soft_vgallery);?>);
    border: 1px  var(--tsvg_p_lm_bs_<?php echo esc_attr($Total_Soft_vgallery);?>)  var(--tsvg_p_lm__bdc_<?php echo esc_attr($Total_Soft_vgallery);?>) !important;
    cursor: pointer;
    display: block;
    padding: 3px !important;
    line-height: 1 !important;
}


#grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery  .pagination-outer[data-pagination='load-more'] a:hover {
    background-color:  var(--tsvg_p_lm_hbc_<?php echo esc_attr($Total_Soft_vgallery);?>);
    color: var(--tsvg_p_lm_hc_<?php echo esc_attr($Total_Soft_vgallery);?>);
}


</style>

<?php
echo sprintf("
    <nav class='pagination-outer' data-short-id='%s' data-short-theme='%s'  data-pagination='%s' data-load-vw='%s' data-icon-show='%s' data-load-icon='%s' >
        <ul class='pagination' data-ef='%s' data-vw='%s' data-next-item='%s' data-prev-item='%s' data-load-text='%s'>
        </ul>
    </nav>",
esc_attr($Total_Soft_vgallery),
esc_attr($TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme),
esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_01 ),
esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_08 ),
esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_16'] ),
esc_attr( $tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_17'] ),
esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_05 ),
esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_06 ),
esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_06),
esc_attr( $tsvgallery_TS_VG_Styles->TotalSoft_GV_2_07),
esc_attr( $ts_vgallery_TS_VG_Settings->TotalSoft_VGallery_Set_03)

); 

?>
<script>
    var flag_load = 'false';
    function appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(userdata,min, max) {
        var requireData = userdata.slice(min, max);
		var short_id =jQuery(userdata).closest('section').find('.pagination-outer').attr('data-short-id');
		var short_theme =jQuery(userdata).closest('section').find('.pagination-outer').attr('data-short-theme');
		
        jQuery.each(requireData, function (index, value) {
			let  tsvg_elem_delay = 0.3 * index;	
			if(flag_load == 'true'){
				tsvg_elem_delay = 0.9 * (index+1);	
			}
           jQuery(this).css({'-moz-animation-delay': tsvg_elem_delay+'s','-webkit-animation-delay': tsvg_elem_delay+'s','animation-delay': tsvg_elem_delay+'s'});
            jQuery(this).addClass('item-show');
        })
        if(short_theme=='Grid Video Gallery') {
          var interval_pg_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> = setInterval(upGrid_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
          function upGrid_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
           if (typeof(window.Modernizr) != "undefined" && window.Modernizr != null && 
              typeof(window.imagesLoaded) != "undefined" && window.imagesLoaded != null && 
              typeof(window.CBPGridGallery) != "undefined" && window.CBPGridGallery != null){
            new  CBPGridGallery(document.getElementById(`grid${short_id}-gallery`));
              clearInterval(interval_pg_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
            }
          }
        }
       
        if( jQuery('.ts_vgallery_main_'+short_id).attr("data-pagination")=='load-more' && !jQuery('.ts_vgallery_main_'+short_id+' figure ul li').not('.item-show').length){ jQuery('.ts_vgallery_section_'+short_id+'  .pagination li,.ts_vgallery_section_'+short_id+' .pagination-outer .btn').remove();}
    
    }
       
    function paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(id = "<?php echo esc_attr( $Total_Soft_vgallery ); ?>") {
        if (!id) {
			return; 
		}
        var userdata = jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure>ul>li');
        var itemsLength = userdata.length;
        var numberItemsPerPage =  Math.ceil(jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr('data-item-number'));
        var paginationItemsLenth;
        var pagina_length;
        var currentPaginationPosition;
        var showFrom;
        var showTo;
        var pageNumber = 1;

        // var next_text = '<?php echo  esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_06);?>';
        // var prev_text ='<?php echo  esc_js($tsvgallery_TS_VG_Styles->TotalSoft_GV_2_07);?>'; 
        // var next_icon =''; 
        // var prev_icon =''; 
        // var load_icon =''; 
        // var load_text ='<?php echo  esc_attr($tsvgallery_def_theme_Style['TotalSoft_VGallery_Sty_18']);?>';
        
        var next_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-next-item');
		var prev_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-prev-item');
		var prev_icon = '';
		var next_icon = ''; 
		var load_icon = '';  
		var load_text = jQuery('.ts_vgallery_section_<?php echo esc_attr( $Total_Soft_vgallery ); ?>  .pagination').attr('data-load-text');

        var max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').height(); 
        var currentPosition = 1;
        var page_vw = jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').attr('data-vw');
        jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul').removeClass('tsvg-load');
        jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul li').removeClass('item-show');
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination li,.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer .btn').remove();
        if( jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr("data-pagination")=='pagination'){
        
        paginationItemsLenth = Math.ceil(itemsLength / numberItemsPerPage) ;
        pagina_length=paginationItemsLenth=paginationItemsLenth<1?1:paginationItemsLenth;
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').append('<li class="page-item page-item-prev" data-item-number="prev"><a href="javascript:void(0)" class="page-link"  ><span >'+prev_text+'</span> <i class="'+prev_icon+'"></i></a></li>')
        if(page_vw=='vw-2'&& paginationItemsLenth>7)pagina_length=7;
        if(page_vw=='vw-3'&& paginationItemsLenth>4)pagina_length=4;
        if(page_vw=='vw-5')pagina_length=1;
        if(page_vw=='vw-4')pagina_length=1;
            for (var i = 0; i < pagina_length; i++) {
                var itemNumber = i + 1;
                jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination').append('<li data-item-number="' + itemNumber + '" class="page-item page-number "><a class="page-link" href="javascript:void(0)">' + itemNumber + '</a></li>')
            }
        
        if(page_vw=='vw-4'){ jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number').addClass('disabled-item');}
        if(page_vw=='vw-2'&& paginationItemsLenth>7){
            if(paginationItemsLenth > (pagina_length+1))  jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').append('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>')
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').append('<li data-item-number="' + paginationItemsLenth + '" class="page-item "><a class="page-link" href="javascript:void(0)">' + paginationItemsLenth + '</a></li>')
        }

        if(page_vw=='vw-3'&& paginationItemsLenth>4){
            if(paginationItemsLenth > (pagina_length+1))jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').append('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>')
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination').append('<li data-item-number="' + paginationItemsLenth + '" class="page-item "><a class="page-link" href="javascript:void(0)">' + paginationItemsLenth + '</a></li>')
        }
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination').append('<li class="page-item page-item-next" data-item-number="next"><a href="javascript:void(0)" class="page-link"  ><span >'+next_text+'</span><i class="'+next_icon+'"></i></a></li>')

        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  ul.pagination li').not('.page-null').click(function (e) {
          if( jQuery(this).hasClass('active')){
              return false;
          }
          max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').height();
        if(jQuery(this).parent().find('.active').length){
            const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>')[0]
                const tsvgHeaderOffset = 200;
                const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
                const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
                window.scrollTo({
                  top: tsvgOffsetPosition,
                  behavior: "smooth",
                });
        }
        let effect_open_type =  jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr('data-item-open');
        if(effect_open_type!='effect-1'){
          jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').css({'min-height': max_heigth+'px','transition':'unset'});
        }
        jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul li').removeClass('item-show');
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination li').removeClass('active')
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-item[item-number="prev"]').removeClass('disabled-item')
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-item[item-number="next"]').removeClass('disabled-item')
        jQuery(this).addClass('active');
        pageNumber = jQuery(this).attr('data-item-number');
        if (pageNumber == '1') {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
        } else{
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
        }
        if (+pageNumber == paginationItemsLenth) {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').addClass('disabled-item');
        }else{
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
        }

        showFrom = numberItemsPerPage * (pageNumber - 1);
        showTo = showFrom + numberItemsPerPage;
        appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(userdata,showFrom, showTo)

        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').unbind('click')
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').click(function () {
      
        if(jQuery(this).parent().find('.active').length){
            const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>')[0]
            const tsvgHeaderOffset = 200;
            const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
            const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
            window.scrollTo({
              top: tsvgOffsetPosition,
              behavior: "smooth",
            });
        }
        currentPosition = parseInt(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  li.page-item.active').attr('data-item-number'))
        var last_element = jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  li.page-item.active').hasClass( "page-number" );
        var prevPosiotion = currentPosition - 1;
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item').removeClass('active')
        let first_item_position =  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .page-number").first().attr('data-item-number'));
        if(first_item_position>1&&last_element){
            jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").each(function(){
            let item_position =  parseInt(jQuery(this).attr('data-item-number'))-1;
            jQuery(this).attr('data-item-number',item_position).find('a').text(item_position)
            });
        }

              
        if(paginationItemsLenth > (parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number'))+1) && !jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination").find('.page-null').length && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().after('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>') 
        if((parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number'))+1) >= paginationItemsLenth && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination").find('.page-null').remove();
        
        if(last_element){
        } else {
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="' +  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number')) + '"]').addClass('active')
        } 
       
        if (-currentPosition == 1) {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
        } else{
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
        }
        if (+currentPosition == paginationItemsLenth) {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').addClass('disabled-item');
        }else{
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
        }
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="' + prevPosiotion + '"]').click()
      })

      jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').unbind('click')
      jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').click(function () {
      if(jQuery(this).parent().find('.active').length){
        const tsvgMain = jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>')[0]
        const tsvgHeaderOffset = 200;
        const tsvgMainPosition = tsvgMain.getBoundingClientRect().top;
        const tsvgOffsetPosition = tsvgMainPosition + window.pageYOffset - tsvgHeaderOffset;
        window.scrollTo({
          top: tsvgOffsetPosition,
          behavior: "smooth",
        });
      }
      currentPosition = parseInt(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  li.page-item.active').attr('data-item-number'))
      var nextPosition = currentPosition + 1;
      jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item').removeClass('active')
      let last_item_position =  parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number'));
      if(((paginationItemsLenth-1)>last_item_position && (page_vw=='vw-2' || page_vw=='vw-3'))||((paginationItemsLenth-1) >= last_item_position&& (page_vw=='vw-4' || page_vw=='vw-5'))){
          jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").each(function(){
              let item_position =  parseInt(jQuery(this).attr('data-item-number'))+1;
              jQuery(this).attr('data-item-number',item_position).find('a').text(item_position)
          });
      }
      if(paginationItemsLenth > (parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number'))+1) && !jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination").find('.page-null').length && (page_vw=='vw-2' || page_vw=='vw-3') )jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().after('<li data-item-number=" " class="page-item page-null  "><a class="page-link" href="javascript:void(0)">...</a></li>') 
      if((parseInt(jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-number").last().attr('data-item-number'))+1) >= paginationItemsLenth && (page_vw=='vw-2' || page_vw=='vw-3'))jQuery(".ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination").find('.page-null').remove();
      if (currentPosition == '1') {
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').addClass('disabled-item');
      } else{
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="prev"]').removeClass('disabled-item');
      }
      if (+currentPosition == paginationItemsLenth) {
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .page-item[data-item-number="next"]').addClass('disabled-item');
      }else{
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="next"]').removeClass('disabled-item');
      }
      jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .page-item[data-item-number="' + nextPosition + '"]').click();
      })
      if('<?php echo $TS_vgallery_TS_VG_Options->TS_vgallery_Q_Theme;?>'=='Grid Video Gallery') {
        var interval_pg_cl_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> = setInterval(upGrid_cl_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
          function upGrid_cl_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
          if (typeof(window.Modernizr) != "undefined" && window.Modernizr != null && 
                typeof(window.imagesLoaded) != "undefined" && window.imagesLoaded != null && 
                typeof(window.CBPGridGallery) != "undefined" && window.CBPGridGallery != null){
          new  CBPGridGallery(document.getElementById(`grid<?php echo esc_attr($Total_Soft_vgallery);?>-gallery`));
            clearInterval(interval_pg_cl_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
          }
          }
      }

      if(effect_open_type=='effect-1' && jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure>ul>li').length>1){
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination-outer').attr('style','transition:unset; transform: translateY(200%);');
          jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>').attr('style','transition:unset; margin-bottom:140px;');
          setTimeout(() => {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr('style','transition: transform 3s  ease-out;transform: translateY(0%);');
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>').attr('style','transition: margin 3s  ease-out;margin-bottom:0;');
          }, 1000);
      }else{
          setTimeout(() => {
            jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').css({'transition':'min-height 3s  ease-in-out','min-height':'0px'});
          }, 1000);
		  }
    })

    jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .page-number:nth-child(2)').click();
    }
        if( jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr("data-pagination")=='load-more'){
       
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').append('<a href="javascript:void(0)" class="btn btn-lg"><span>'+load_text+'</span><i class="'+load_icon+'"></i></a>');
        if( jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-4' || jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-5' ){
            if(!jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer svg').length){
                if(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-5'){
                    jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination-outer').find('.btn-lg').html('<ul><li>'+load_text+'</li></ul><div><svg viewBox="0 0 24 24"></svg></div>');
                }else{
                    jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?> .pagination-outer').find('.btn-lg').html('<div><svg viewBox="0 0 24 24"></svg></div>');
                }
                
                var  svg = document.querySelector('.btn-lg svg'),
                svgPath = new Proxy({
                    y: null,
                    smoothing: null
                }, {
                    set(target, key, value) {
                        target[key] = value;
                        if(target.y !== null && target.smoothing !== null) {
                            svg.innerHTML = getPath(target.y, target.smoothing, null);
                        }
                        return true;
                    },
                    get(target, key) {
                        return target[key];
                    }
                });
                svgPath.y = 20;
                svgPath.smoothing = 0;
            }
        }
        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').click(function (e) {
          let max_heigth =jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').height(); 
		 let main_length = jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul li').length;
			flag_load = 'false';
			if(jQuery(this).closest('.pagination-outer').attr("data-load-vw")=='ef-3'||jQuery(this).closest('.pagination-outer').attr("data-load-vw")=='ef-4'||jQuery(this).closest('.pagination-outer').attr("data-load-vw")=='ef-5'){
				flag_load = 'true';
			}
          jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').css({'max-height': max_heigth+'px','transition':'unset'});
          setTimeout(() => {
              jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').css({'transition':'max-height 3s  ease-in-out','max-height':main_length+'000vh'});
            }, 100);
			
          appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul li').not('.item-show'),0, numberItemsPerPage);
          if(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-3'){
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').addClass('animate');
            setTimeout(function(){
                jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').removeClass('animate');
            },700);
          }
         
            if(!jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').hasClass('loading')&&(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-4'||jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-5')&&jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer svg').length) {
            jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').addClass('loading');

                setTimeout(() => {
                    svg.innerHTML = getPath(0, 0, [
                        [3, 14],
                        [8, 19],
                        [21, 6]
                    ]);
                }, 1000 / 2);
                setTimeout(() => {
                    jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .btn-lg').removeClass('loading');
                    if(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').attr("data-load-vw")=='ef-5'){
                        jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').find('.btn-lg').html('<ul><li><span>'+load_text+'</span><i class="'+load_icon+'"></i></li></ul><div><svg viewBox="0 0 24 24"><path d="M 4,12 C 4,12 12,20 12,20 C 12,20 20,12 20,12"></path></svg></div>');
                    }else{
                       jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .pagination-outer').find('.btn-lg').html('<div><svg viewBox="0 0 24 24"><path d="M 4,12 C 4,12 12,20 12,20 C 12,20 20,12 20,12"></path></svg></div>');
                    }
                }, 2000 );

            }
        })
        appendSelectedComments_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(jQuery('.ts_vgallery_section_<?php echo esc_attr($Total_Soft_vgallery);?>  .ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?> figure ul li').not('.item-show'),0, numberItemsPerPage)
      }
    }
    function newPaginate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>(){
        var interval_pag_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?> = setInterval(setPagina_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>, 100);
        function setPagina_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>() {
        if(  typeof(jQuery) != "undefined" && jQuery != null){
            if( jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr("data-pagination")=='pagination'){
                paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
            }
            
            if( jQuery('.ts_vgallery_main_<?php echo esc_attr($Total_Soft_vgallery);?>').attr("data-pagination")=='load-more'){
                paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
            }
            clearInterval(interval_pag_fn_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>);
        }
        }
    }
    newPaginate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
	function paginationGenerate(){
		paginationGenerate_<?php echo esc_attr( $ts_galleryv_videos_Js_id ); ?>();
	}

    function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
    let points = pointsNew ? pointsNew : [
            [4, 12],
            [12, update],
            [20, 12]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}

</script>
			

    