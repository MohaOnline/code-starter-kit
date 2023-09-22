<?php
/**
 * Customizer callback functions for active_callback.
 *
 * @package Newsgine
 */

/*select page for weekly post*/
if (!function_exists('newsgine_frontpage_content_weekly_post')) :

    /**
     * Check if slider section page/post is active.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Control $control WP_Customize_Control instance.
     *
     * @return bool Whether the control is active to the current preview.
     */
    function newsgine_frontpage_content_weekly_post($control)
    {

        if ('page' == $control->manager->get_setting('newsging_weekly_post')->value()) {
            return true;
        } else {
            return false;
        }

    }

endif;


/*select page for Slider post*/
if (!function_exists('newsgine_frontpage_newsging_slider_post_section')) :

    /**
     * Check if slider section page/post is active.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Control $control WP_Customize_Control instance.
     *
     * @return bool Whether the control is active to the current preview.
     */
    function newsgine_frontpage_newsging_slider_post_section($control)
    {

        if ('page' == $control->manager->get_setting('newsging_slider_post_section')->value()) {
            return true;
        } else {
            return false;
        }

    }

endif;


/*select page for featured post*/
if (!function_exists('newsgine_frontpage_newsging_featured_post')) :

    /**
     * Check if featured section page/post is active.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Control $control WP_Customize_Control instance.
     *
     * @return bool Whether the control is active to the current preview.
     */
    function newsgine_frontpage_newsging_featured_post($control)
    {

        if ('page' == $control->manager->get_setting('newsging_featured_post')->value()) {
            return true;
        } else {
            return false;
        }

    }

endif;


/*select page for featured post*/
if (!function_exists('newsgine_frontpage_newsging_editor_post')) :

    /**
     * Check if featured section page/post is active.
     *
     * @since 1.0.0
     *
     * @param WP_Customize_Control $control WP_Customize_Control instance.
     *
     * @return bool Whether the control is active to the current preview.
     */
    function newsgine_frontpage_newsging_editor_post($control)
    {

        if ('page' == $control->manager->get_setting('newsging_editor_post')->value()) {
            return true;
        } else {
            return false;
        }

    }

endif;