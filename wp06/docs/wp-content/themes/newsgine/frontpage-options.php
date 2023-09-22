<?php

/**
 * Option Panel
 *
 * @package Newsgine
 */


function newsgine_customize_register($wp_customize) {

$selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';
$newsup_default = newsgine_get_default_theme_options();

/* Option list of all post */  
    $options_posts = array();
    $options_posts_obj = get_posts('posts_per_page=-1');
    $options_posts[''] = __( 'Choose Post','newsgine' );
    foreach ( $options_posts_obj as $posts ) {
        $options_posts[$posts->ID] = $posts->post_title;
    }

    $wp_customize->add_setting('weekly_top_section',
    array(
        'sanitize_callback' => 'sanitize_text_field',
    )
);

$wp_customize->add_control(
    new newsup_Section_Title(
        $wp_customize,
        'weekly_top_section',
        array(
            'label'             => esc_html__( 'Weekly Top', 'newsgine' ),
            'section'           => 'frontpage_main_banner_section_settings',
            'priority'          => 20,
            'active_callback' => 'newsup_main_banner_section_status'
        )
    )
);

        $wp_customize->add_setting('newsging_weekly_post',
            array(
                'default' => 1,
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'newsup_sanitize_checkbox',
            )
        );

        $wp_customize->add_control('newsging_weekly_post',
            array(
                'label' => esc_html__('Enable Weekly Top Post Section', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'checkbox',
                'priority' => 30,

            )
        );

        $wp_customize->add_setting('weekly_top_title',
            array(
                'default' => $newsup_default['weekly_top_title'],
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
                'transport' => $selective_refresh
            )
        );

        $wp_customize->add_control('weekly_top_title',
            array(
                'label' => esc_html__('Title', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'text',
                'priority' => 32,
                'active_callback' => 'newsup_popular_tags_section_status'

            )
        );

        // Setting - drop down category for slider.
        $wp_customize->add_setting('select_weekly_top_category',
            array(
                'default' => $newsup_default['select_weekly_top_category'],
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'absint',
            )
        );


        $wp_customize->add_control(new Newsup_Dropdown_Taxonomies_Control($wp_customize, 'select_weekly_top_category',
            array(
                'label' => esc_html__('Category', 'newsgine'),
                'description' => esc_html__('Select category for Weekly Post', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'dropdown-taxonomies',
                'taxonomy' => 'category',
                'priority' => 35,
                'active_callback' => 'newsup_main_banner_section_status'
            )));

            

                $wp_customize->add_setting('newsging_slider_post_section',
                array(
                    'default' => 1,
                    'capability' => 'edit_theme_options',
                    'sanitize_callback' => 'newsup_sanitize_checkbox',
                )
            );

            $wp_customize->add_control('newsging_slider_post_section',
                array(
                    'label' => esc_html__('Enable Slider Banner Section', 'newsgine'),
                    'section' => 'frontpage_main_banner_section_settings',
                    'type' => 'checkbox',
                    'priority' => 75,

                )
            );

            

            //section title
            $wp_customize->add_setting('one_post_section',
                array(
                    'sanitize_callback' => 'sanitize_text_field',
                )
            );

            $wp_customize->add_control(
                new newsup_Section_Title(
                    $wp_customize,
                    'one_post_section',
                    array(
                        'label'             => esc_html__( 'Featured Post', 'newsgine' ),
                        'section'           => 'frontpage_main_banner_section_settings',
                        'priority'          => 100,
                        'active_callback' => 'newsup_main_banner_section_status'
                    )
                )
            );

            $wp_customize->add_setting('newsging_featured_post',
            array(
                'default' => 1,
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'newsup_sanitize_checkbox',
            )
        );

        $wp_customize->add_control('newsging_featured_post',
            array(
                'label' => esc_html__('Enable Featured Post Section', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'checkbox',
                'priority' => 105,

            )
        );


             //Select Post One
              $wp_customize->add_setting('newsgine_post_one',array(
                            'capability'=>'edit_theme_options',
                            'sanitize_callback' => 'newsup_sanitize_select',
                        ));
                        
               $wp_customize->add_control('newsgine_post_one',array(
                            'label' => __('Select Post One','newsgine'),
                            'section'=>'frontpage_main_banner_section_settings',
                            'type'=>'select',
                            'priority'          => 110,
                            'choices'=>$options_posts,
                        ));



                     //Select Post two
                      $wp_customize->add_setting('newsgine_post_two',array(
                                    'capability'=>'edit_theme_options',
                                    'sanitize_callback' => 'newsup_sanitize_select',
                                ));
                                
                       $wp_customize->add_control('newsgine_post_two',array(
                                    'label' => __('Select Post Two','newsgine'),
                                    'section'=>'frontpage_main_banner_section_settings',
                                    'type'=>'select',
                                    'priority'          => 115,
                                    'choices'=>$options_posts,
                                ));



                //section title
                $wp_customize->add_setting('newsging_editor_post_section_title',
                    array(
                        'sanitize_callback' => 'sanitize_text_field',
                    )
                );

                $wp_customize->add_control(
                    new newsup_Section_Title(
                        $wp_customize,
                        'newsging_editor_post_section_title',
                        array(
                            'label'             => esc_html__( 'Editor Post', 'newsgine' ),
                            'section'           => 'frontpage_main_banner_section_settings',
                            'priority'          => 120,
                            'active_callback' => 'newsup_main_banner_section_status'
                        )
                    )
                );

                $wp_customize->add_setting('newsging_editor_post',
                    array(
                        'default' => 1,
                        'capability' => 'edit_theme_options',
                        'sanitize_callback' => 'newsup_sanitize_checkbox',
                    )
                );

                $wp_customize->add_control('newsging_editor_post',
                    array(
                        'label' => esc_html__('Enable Editor Post Section', 'newsgine'),
                        'section' => 'frontpage_main_banner_section_settings',
                        'type' => 'checkbox',
                        'priority' => 125,

                    )
                );

                $wp_customize->add_setting('newsging_editor_post_title',
            array(
                'default' => $newsup_default['newsging_editor_post_title'],
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'sanitize_text_field',
                'transport' => $selective_refresh
            )
        );

        $wp_customize->add_control('newsging_editor_post_title',
            array(
                'label' => esc_html__('Title', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'text',
                'priority' => 128,
                'active_callback' => 'newsup_popular_tags_section_status'

            )
        );

                // Setting - drop down category for slider.
        $wp_customize->add_setting('select_editor_post_category',
            array(
                'default' => $newsup_default['select_editor_post_category'],
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'absint',
            )
        );


        $wp_customize->add_control(new Newsup_Dropdown_Taxonomies_Control($wp_customize, 'select_editor_post_category',
            array(
                'label' => esc_html__('Category', 'newsgine'),
                'description' => esc_html__('Select category for Editor Post', 'newsgine'),
                'section' => 'frontpage_main_banner_section_settings',
                'type' => 'dropdown-taxonomies',
                'taxonomy' => 'category',
                'priority' => 130,
                'active_callback' => 'newsup_main_banner_section_status'
            )));

                // Setting banner_advertisement_section.
                $wp_customize->add_setting('banner_right_advertisement_section',
                    array(
                        'default' => $newsup_default['banner_right_advertisement_section'],
                        'capability' => 'edit_theme_options',
                        'sanitize_callback' => 'absint',
                    )
                );

                $wp_customize->add_control(
                    new WP_Customize_Cropped_Image_Control($wp_customize, 'banner_right_advertisement_section',
                        array(
                            'label' => esc_html__('Banner Section Advertisement', 'newsgine'),
                            'description' => sprintf(esc_html__('Recommended Size %1$s px X %2$s px', 'newsgine'), 930, 100),
                            'section' => 'frontpage_advertisement_settings',
                            'width' => 930,
                            'height' => 100,
                            'flex_width' => true,
                            'flex_height' => true,
                            'priority' => 200,
                        )
                    )
                );


/*banner_advertisement_section_url*/
$wp_customize->add_setting('banner_right_advertisement_section_url',
    array(
        'default' => '#',
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw',
    )
);
$wp_customize->add_control('banner_right_advertisement_section_url',
    array(
        'label' => esc_html__('URL Link', 'newsgine'),
        'section' => 'frontpage_advertisement_settings',
        'type' => 'url',
        'priority' => 210,
    )
);

$wp_customize->add_setting('newsup_right_open_on_new_tab',
    array(
        'default' => true,
        'sanitize_callback' => 'newsup_sanitize_checkbox',
    )
    );
    $wp_customize->add_control(new Newsup_Toggle_Control( $wp_customize, 'newsup_right_open_on_new_tab', 
        array(
            'label' => esc_html__('Open link in a new tab', 'newsgine'),
            'type' => 'toggle',
            'section' => 'frontpage_advertisement_settings',
            'priority' => 220,
        )
    ));

    $wp_customize->add_setting('remove_header_newsgine_image_overlay',
        array(
            'default'           => $newsup_default['remove_header_newsgine_image_overlay'],
            'capability'        => 'edit_theme_options',
            'sanitize_callback' => 'newsup_sanitize_checkbox',
        )
    );

    $wp_customize->add_control('remove_header_newsgine_image_overlay',
        array(
            'label'    => esc_html__('Remove Image Overlay', 'newsgine'),
            'section'  => 'header_image',
            'type'     => 'checkbox',
            'priority' => 50,
        )
    );


}
add_action('customize_register', 'newsgine_customize_register');