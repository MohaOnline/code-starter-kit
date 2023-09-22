<?php 
if (!function_exists('newsgine_banner_trending_posts')):
    /**
     *
     * @since newsgine 0.1
     *
     */
    function newsgine_banner_exclusive_posts()  { 
            if (is_front_page() || is_home()) {
                $show_flash_news_section = newsup_get_option('show_flash_news_section');
            if ($show_flash_news_section): 
        ?>
            <section class="mg-latest-news-sec">
                <?php
                $category = newsup_get_option('select_flash_news_category');
                $number_of_posts = newsup_get_option('number_of_flash_news');
                $newsup_ticker_news_title = newsup_get_option('flash_news_title');

                $all_posts = newsup_get_posts($number_of_posts, $category);
                $show_trending = true;
                $count = 1;
                ?>
                <div class="container-fluid">
                    <div class="mg-latest-news">
                         <div class="bn_title">
                            <h2 class="title">
                                <?php if (!empty($newsup_ticker_news_title)): ?>
                                    <?php echo esc_html($newsup_ticker_news_title); ?><span></span>
                                <?php endif; ?>
                            </h2>
                        </div>
                        <?php if(is_rtl()){ ?> 
                        <div class="mg-latest-news-slider marquee" data-direction='right' dir="ltr">
                        <?php } else { ?> 
                        <div class="mg-latest-news-slider marquee">
                        <?php } ?>
                            <?php
                            if ($all_posts->have_posts()) :
                                while ($all_posts->have_posts()) : $all_posts->the_post();
                                    ?>
                                    <a href="<?php the_permalink(); ?>">
                                        <?php if(has_post_thumbnail()){ ?>
                                                               <?php echo the_post_thumbnail(); ?>
                                         <?php } ?>
                                        <span><?php the_title(); ?></span>
                                     </a>
                                    <?php
                                    $count++;
                                endwhile;
                                endif;
                                wp_reset_postdata();
                                ?>
                        </div>
                    </div>
            </div>
            </section>
            <!-- Excluive line END -->
        <?php endif;
         }
    }
endif;
add_action('newsgine_action_banner_exclusive_posts', 'newsgine_banner_exclusive_posts', 10);


if(!function_exists('newsgine_action_left_list_posts')):

/**
*
* @since Newsgine
*
*
*/
  function newsgine_action_left_list_posts()
    {

        if(is_front_page() || is_home())
        { 
         $number_of_posts = '4';
         $select_weekly_top_category = newsup_get_option('select_weekly_top_category');
         $newsup_all_posts_main = newsup_get_posts($number_of_posts, $select_weekly_top_category); ?>

        <?php if ($newsup_all_posts_main->have_posts()) :
                        while ($newsup_all_posts_main->have_posts()) : $newsup_all_posts_main->the_post();
                        global $post;
                        $newsup_url = newsup_get_freatured_image_url($post->ID, 'newsup-slider-full'); ?>
                        
                             <!-- small-post -->
                                        <div class="small-post clearfix"> 
                                            <div class="small-post-content">
                                                <div class="mg-blog-category">  <?php newsup_post_categories(); ?> </div>
                                                <div class="title_small_post">
                                                    <h5 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                                </div>
                                                <?php newsup_post_meta(); ?>
                                            </div>
                        </div><!-- /small-post -->  
                        <?php
                        endwhile;
                    endif;
                    wp_reset_postdata(); ?>
            
                   
        
       <?php }
    }

endif;

add_action('newsgine_action_left_list_posts', 'newsgine_action_left_list_posts', 30);

if(!function_exists('newsgine_frontpage_editor_post_section')):

/**
*
* @since Newsgine
*
*
*/
  function newsgine_frontpage_editor_post_section()
    {

        if(is_front_page() || is_home())
        { 
         $number_of_posts = '4';
         $select_editor_post_category = newsup_get_option('select_editor_post_category');
         $newsup_all_posts_main = newsup_get_posts($number_of_posts, $select_editor_post_category); ?>

        <?php if ($newsup_all_posts_main->have_posts()) :
                        while ($newsup_all_posts_main->have_posts()) : $newsup_all_posts_main->the_post();
                        global $post;
                        $newsup_url = newsup_get_freatured_image_url($post->ID, 'newsup-slider-full'); ?>
                        <div class="small-post clearfix"> 
                                            <div class="small-post-content">
                                                <div class="mg-blog-category">  <?php newsup_post_categories(); ?> </div>
                                                <div class="title_small_post">
                                                    <h5 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                                                    
                                                </div><?php newsup_post_meta(); ?>
                                            </div>
                        </div><!-- /small-post -->  
                        <?php
                        endwhile;
                    endif;
                    wp_reset_postdata(); ?>
            
                   
        
       <?php }
    }

endif;

add_action('newsgine_action_front_page_editor_section', 'newsgine_frontpage_editor_post_section', 30);

//Front Page Banner
if (!function_exists('newsgine_front_page_banner_section')) :
    /**
     *
     * @since Newsgine
     *
     */
    function newsgine_front_page_banner_section()
    {
        if (is_front_page() || is_home()) {
        $newsging_weekly_post = newsgine_get_option('newsging_weekly_post',1);
        $newsging_slider_post_section = newsgine_get_option('newsging_slider_post_section',1);
        $newsging_featured_post = newsgine_get_option('newsging_featured_post',1);
        $select_weekly_top_category = newsgine_get_option('select_weekly_top_category');
        $vertical_slider_number_of_slides = newsgine_get_option('vertical_slider_number_of_slides');
        $all_posts_vertical = newsgine_get_option($vertical_slider_number_of_slides, $select_weekly_top_category);
        $weekly_top_title = newsgine_get_option('weekly_top_title');
        $newsging_editor_post = newsgine_get_option('newsging_editor_post',1);
        $newsging_editor_post_title = newsgine_get_option('newsging_editor_post_title');
         ?>
            <section class="mg-fea-area">
            <div class="overlay">
                <div class="container-fluid"> 
                    
                    <div class="row">
                        <?php if ($newsging_weekly_post){ ?>
                        <div class="col-md-3 left-list-post">
                        <div class="mg-sec-title">
                            <!-- mg-sec-title -->
                            <h4><i class="fa fa-bolt" aria-hidden="true"></i><?php echo esc_html($weekly_top_title); ?></h4>
                        </div>
                        <?php do_action('newsgine_action_left_list_posts');?>
                        </div>
                        <?php } ?>
                        <?php if($newsging_weekly_post == 0 )
                            { ?>
                            <div class="col-md-7 col-sm-4">
                            <div id="homemain"class="homemain owl-carousel mr-bot60"> 
                                <?php newsup_get_block('list', 'banner'); ?>
                            </div>
                        </div>

                         <?php } elseif($newsging_featured_post == 0 )
                            { ?>
                            <div class="col-md-6">
                            <div id="homemain"class="homemain owl-carousel mr-bot60"> 
                                <?php newsup_get_block('list', 'banner'); ?>
                            </div>
                        </div>
                        <?php } elseif($newsging_editor_post == 0 )
                            { ?>
                            <div class="col-md-7">
                            <div id="homemain"class="homemain owl-carousel mr-bot60"> 
                                <?php newsup_get_block('list', 'banner'); ?>
                            </div>
                        </div>
                       <?php } elseif($newsging_slider_post_section){ ?>
                            <div class="col-md-4">
                            <div id="homemain"class="homemain owl-carousel mr-bot60"> 
                                <?php newsup_get_block('list', 'banner'); ?>
                            </div>
                        </div>
                        <?php } ?>
                        <?php if ($newsging_featured_post){ ?>
                        <div class="col-md-2">
                        <?php do_action('newsgine_action_banner_tabbed_posts');?>
                        </div>
                    <?php } ?>
                    <?php if ($newsging_editor_post){ ?>  
                     <div class="col-md-3 mr-bot30 right-list-post">  
                        <div class="mg-sec-title">
                            <!-- mg-sec-title -->
                            <h4><?php echo esc_html($newsging_editor_post_title); ?></h4>
                        </div>
                        <div class="inner">
                             <?php do_action('newsgine_action_front_page_editor_section');?>
                        </div>
                    </div>
                <?php } ?>
            </div>
                </div>
            </div>
        </section>
        <!--==/ Home Slider ==-->
        <!-- end slider-section -->
        <div class="container-fluid text-center">
            <div class="row">
            <?php do_action('newsgine_action_banner_advertisement'); ?></div></div>
        <section class="mg-fea-area"> 
</section>
        <?php }
    }
endif;
add_action('newsgine_action_front_page_main_section_front', 'newsgine_front_page_banner_section', 40);



//Banner Tabed Section
if (!function_exists('newsgine_banner_tabbed_posts')):
    /**
     *
     * @since Newsgine 1.0.0
     *
     */
    function newsgine_banner_tabbed_posts()
    {
            if(is_front_page() || is_home())
        {
        $newsgine_post_one = array(get_theme_mod('newsgine_post_one'));
        

        $slider_query = new WP_Query( array( 'post__in' => $newsgine_post_one, 'ignore_sticky_posts' => 1));
                if( $slider_query->have_posts() ){                
                    while( $slider_query->have_posts() ){
                    $slider_query->the_post();

        global $post;
        $newsgine_url = newsup_get_freatured_image_url($post->ID);
            ?>
             <div class="mr-bot30">
                <div class="mg-blog-post-box mb-0"> 
                    
                    <div class="mg-blog-thumb">
                         <?php if($newsgine_url) { ?>
                        <a href="<?php the_permalink(); ?>"> 
                            <img alt="blog thumbs 1" src="<?php echo esc_url($newsgine_url); ?>" class="img-responsive"> </a>
                        <?php } ?>
                    </div>
                    
                    <article class="small">
                        <div class="mg-blog-category"> <?php newsup_post_categories(); ?> </div>
                        <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4> 
                    </article>
                </div>
            </div>
           <?php }} else  {
            $slider_query = new WP_Query( array( 'ignore_sticky_posts' => 1, "posts_per_page" => 1));
            if( $slider_query->have_posts() ){                
                    while( $slider_query->have_posts() ){
                    $slider_query->the_post();

        global $post;
        $newsgine_url = newsup_get_freatured_image_url($post->ID); ?>

            <div class="mr-bot30">
                <div class="mg-blog-post-box mb-0"> 
                    
                    <div class="mg-blog-thumb">
                        <?php if($newsgine_url) { ?> 
                        <a href="<?php the_permalink(); ?>"> <img alt="blog thumbs 1" src="<?php echo esc_url($newsgine_url); ?>" class="img-responsive"> </a>
                         <?php } ?>
                    </div>
                   
                    <article class="small">
                        <div class="mg-blog-category"> <?php newsup_post_categories(); ?> </div>
                        <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4> 
                    </article>
                </div>
            </div>
        <?php } } }


        $newsgine_post_two = array(get_theme_mod('newsgine_post_two'));
        

        $slider_query = new WP_Query( array( 'post__in' => $newsgine_post_two, 'ignore_sticky_posts' => 1));
                if( $slider_query->have_posts() ){                
                    while( $slider_query->have_posts() ){
                    $slider_query->the_post();

        global $post;
        $newsgine_url = newsup_get_freatured_image_url($post->ID);
            ?>
            <div class="mr-bot30">
                <div class="mg-blog-post-box mb-0"> 
                    
                    <div class="mg-blog-thumb">
                         <?php if($newsgine_url) { ?>
                        <a href="<?php the_permalink(); ?>"> 
                            <img alt="blog thumbs 1" src="<?php echo esc_url($newsgine_url); ?>" class="img-responsive"> </a>
                        <?php } ?>
                    </div>
                    
                    <article class="small">
                        <div class="mg-blog-category"> <?php newsup_post_categories(); ?> </div>
                        <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4> 
                    </article>
                </div>
            </div>
           <?php }} else  {
            $slider_query = new WP_Query( array( 'ignore_sticky_posts' => 1, "posts_per_page" => 1));
            if( $slider_query->have_posts() ){                
                    while( $slider_query->have_posts() ){
                    $slider_query->the_post();

        global $post;
        $newsgine_url = newsup_get_freatured_image_url($post->ID); ?>

            
                <div class="mg-blog-post-box mr-bot30"> 
                    <div class="mg-blog-thumb">
                        <?php if($newsgine_url) { ?> 
                        <a href="<?php the_permalink(); ?>">        
                            <img alt="blog thumbs 1" src="<?php echo esc_url($newsgine_url); ?>" class="img-responsive"> </a>
                        <?php } ?>
                    </div> 
                    <article class="small">
                        <div class="mg-blog-category"> <?php newsup_post_categories(); ?> </div>
                        <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4> 
                    </article>
                </div>
             
        <?php } } }
}} endif;

add_action('newsgine_action_banner_tabbed_posts', 'newsgine_banner_tabbed_posts', 10);

//Banner Advertisment
if (!function_exists('newsgine_right_banner_advertisement')):
    /**
     *
     * @since Newsgine 0.1
     *
     */
    function newsgine_right_banner_advertisement()
    {

        if (('' != newsup_get_option('banner_right_advertisement_section')) ) {        
            $newsup_center_logo_title = get_theme_mod('newsup_center_logo_title',false); 
            if($newsup_center_logo_title == false ) { 
         
            if(newsup_get_option('banner_advertisement_section'))
            {
            ?>
            <div class="col-md-4 col-sm-8">
            <?php } else { ?>
             <div class="col-md-8 col-sm-8">
             <?php } } else { ?>    
             <div class="col-8 text-center mx-auto">
                <?php } if (('' != newsup_get_option('banner_right_advertisement_section'))):

                    $newsup_right_banner_advertisement = newsup_get_option('banner_right_advertisement_section');
                    $newsup_right_banner_advertisement = absint($newsup_right_banner_advertisement);
                    $newsup_right_banner_advertisement = wp_get_attachment_image($newsup_right_banner_advertisement, 'full');
                    $banner_right_advertisement_section_url = newsup_get_option('banner_advertisement_section_url');
                    $banner_right_advertisement_section_url = isset($banner_right_advertisement_section_url) ? esc_url($banner_right_advertisement_section_url) : '#';
                    $newsup_right_open_on_new_tab = get_theme_mod('newsup_right_open_on_new_tab',true);
                    ?>
                    <div class="header-ads">
                        <a class="pull-right" <?php echo esc_url($banner_right_advertisement_section_url); ?> href="<?php echo $banner_right_advertisement_section_url; ?>"
                            <?php if($newsup_right_open_on_new_tab) { ?>target="_blank" <?php } ?> >
                            <?php echo $newsup_right_banner_advertisement; ?>
                        </a>
                    </div>
                <?php endif; ?>                

            </div>
            <!-- Trending line END -->
            <?php
        }

    }
endif;

add_action('newsgine_action_right_banner_advertisement', 'newsgine_right_banner_advertisement', 10);




//Banner Advertisment
if (!function_exists('newsgine_left_banner_advertisement')):
    /**
     *
     * @since Newsup 1.0.0
     *
     */
    function newsgine_left_banner_advertisement()
    {

        if (('' != newsup_get_option('banner_advertisement_section')) ) {      
            $newsup_center_logo_title = get_theme_mod('newsup_center_logo_title',false); 
            if($newsup_center_logo_title == false ) { 
            
            if(newsup_get_option('banner_right_advertisement_section'))
            {
            ?>
            <div class="col-md-4 col-sm-8">
            <?php } else { ?>
             <div class="col-md-12 col-sm-8 mr-bot30">
             <?php } } else { ?>    
             <div class="col-12 text-center mx-auto">
                <?php } if (('' != newsup_get_option('banner_advertisement_section'))):

                    $newsup_banner_advertisement = newsup_get_option('banner_advertisement_section');
                    $newsup_banner_advertisement = absint($newsup_banner_advertisement);
                    $newsup_banner_advertisement = wp_get_attachment_image($newsup_banner_advertisement, 'full');
                    $newsup_banner_advertisement_url = newsup_get_option('banner_advertisement_section_url');
                    $newsup_banner_advertisement_url = isset($newsup_banner_advertisement_url) ? esc_url($newsup_banner_advertisement_url) : '#';
                    $newsup_open_on_new_tab = get_theme_mod('newsup_open_on_new_tab',true);
                    ?>
                    <div class="header-ads">
                        <a class="pull-right" <?php echo esc_url($newsup_banner_advertisement_url); ?> href="<?php echo $newsup_banner_advertisement_url; ?>"
                            <?php if($newsup_open_on_new_tab) { ?>target="_blank" <?php } ?> >
                            <?php echo $newsup_banner_advertisement; ?>
                        </a>
                    </div>
                <?php endif; ?>                

            </div>
            <!-- Trending line END -->
            <?php
        }
    }
endif;

add_action('newsgine_action_banner_advertisement', 'newsgine_left_banner_advertisement', 10);