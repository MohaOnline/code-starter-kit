<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://iqonic.design
 * @since      1.5.7
 *
 * @package    Graphina_Charts_For_Elementor
 * @subpackage Graphina_Charts_For_Elementor/public
 */

use Elementor\Plugin;

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Graphina_Charts_For_Elementor
 * @subpackage Graphina_Charts_For_Elementor/public
 * @author     Iqonic Design < hello@iqonic.design>
 */
class Graphina_Charts_For_Elementor_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.5.7
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.5.7
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $plugin_name The name of the plugin.
     * @param string $version The version of this plugin.
     * @since    1.5.7
     */

    public $widget_id;

    public $settings = [];

    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Register the stylesheets for the admin-facing side of the site.
     *
     * @since    1.5.7
     */
    public function admin_enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Graphina_Charts_For_Elementor_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Graphina_Charts_For_Elementor_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_register_style( 'graphina_font_awesome', plugin_dir_url(__FILE__) . 'css/fontawesome-all.min.css', array(), $this->version, 'all' );
        wp_enqueue_style('graphina_font_awesome');
        wp_enqueue_style('graphina-charts-for-elementor-public', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-public.css', array(), $this->version, 'all');
        if (!isGraphinaPro()) {
            wp_enqueue_style('graphina-charts-pro-requirement', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-pro.css', array(), $this->version, 'all');
        }else{
            wp_enqueue_style('graphina-charts-pro-css', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-pro-public.css', array(), $this->version, 'all');
        }

    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.5.7
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Graphina_Charts_For_Elementor_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Graphina_Charts_For_Elementor_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_style('graphina-charts-for-elementor-public', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-public.css', array(), $this->version, 'all');
        if (!isGraphinaPro()) {
            wp_enqueue_style('graphina-charts-pro-requirement', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-pro.css', array(), $this->version, 'all');
        }else{
            wp_enqueue_style('graphina-charts-pro-css', plugin_dir_url(__FILE__) . 'css/graphina-charts-for-elementor-pro-public.css', array(), $this->version, 'all');
        }
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @param int $id
     * @since    1.5.7
     */
    public function enqueue_scripts($id = 0)
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Graphina_Charts_For_Elementor_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Graphina_Charts_For_Elementor_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        // check if graphina is not in preview mode
        if (!graphina_is_preview_mode()) {
            wp_enqueue_script('googlecharts-min', plugin_dir_url(__FILE__) . 'js/gstatic/loader.js', [], $this->version, false);
        }
        wp_enqueue_script('apexcharts-min', plugin_dir_url(__FILE__) . 'js/apexcharts.min.js', array('jquery'), $this->version, false);
        wp_enqueue_script('graphina-charts-for-elementor-public', plugin_dir_url(__FILE__) . 'js/graphina-charts-for-elementor-public.js', array('jquery'), $this->version, false);
        wp_localize_script('graphina-charts-for-elementor-public', 'graphina_localize', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('get_graphina_chart_settings'),
            'graphinaAllGraphs' => [],
            'graphinaAllGraphsOptions' => [],
            'graphinaBlockCharts' => [],
            'is_view_port_disable' => graphina_common_setting_get('view_port'),
            'thousand_seperator' => graphina_common_setting_get('thousand_seperator')
        ));
    }

    public function elementor_init($elements_manager)
    {
        $data = get_option('graphina_common_setting',true);
        $selected_js_array = ( !empty($data['graphina_select_chart_js']) ) ? $data['graphina_select_chart_js'] : [];

        if( in_array("apex_chart_js", $selected_js_array)) {
            $elements_manager->add_category(
                'iq-graphina-charts',
                [
                    'title' => esc_html__('Graphina Apex Chart', 'graphina-charts-for-elementor'),
                    'icon' => 'fa fa-plug',
                ]
            );
        }
        
        if( in_array("google_chart_js", $selected_js_array)) {
            Plugin::$instance->elements_manager->add_category(
                'iq-graphina-google-charts',
                [
                    'title' => esc_html__( 'Graphina Google Chart', 'graphina-charts-for-elementor' ),
                    'icon' => 'fa fa-plug',
                ]
            );
        }
        
        $category_prefix  = 'iq-g';
        $categories = Plugin::$instance->elements_manager->get_categories();
        $reorder_cats = function() use($category_prefix,$categories){
            uksort($categories, function($keyOne, $keyTwo) use($category_prefix){
                if(substr($keyOne, 0, 4) == $category_prefix){
                    return 1;
                }
                if(substr($keyTwo, 0, 4) == $category_prefix){
                    return -1;
                }
                return 0;
            });

        };
        $reorder_cats->call($elements_manager);
    }

    public function include_widgets()
    {
        if (defined('ELEMENTOR_PATH') && class_exists('Elementor\Widget_Base')) {

            /***********************
             *  Charts
             */
            require plugin_dir_path(__FILE__) . '/charts/line/widget/line_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/area/widget/area_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/column/widget/column_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/donut/widget/donut_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/pie/widget/pie_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/radar/widget/radar_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/bubble/widget/bubble_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/candle/widget/candle_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/heatmap/widget/heatmap_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/radial/widget/radial_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/timeline/widget/timeline_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/polar/widget/polar_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/data-tables/widget/data-table.php';
            require plugin_dir_path(__FILE__) . '/charts/distributed_column/widget/Distributed_Column_chart.php';
            require plugin_dir_path(__FILE__) . '/charts/scatter/widget/scatter_chart.php';

            /* Google Charts */
            require plugin_dir_path(__FILE__) . '/google_charts/line/widget/line_google_chart.php';
            require plugin_dir_path(__FILE__) . '/google_charts/area/widget/area_google_chart.php';
            require plugin_dir_path(__FILE__) . '/google_charts/pie/widget/pie_google_chart.php';
            require plugin_dir_path(__FILE__) . '/google_charts/column/widget/column_google_chart.php';
            require plugin_dir_path(__FILE__) . '/google_charts/bar/widget/bar_google_chart.php';
            require plugin_dir_path(__FILE__) . '/google_charts/donut/widget/donut_google_chart.php';
        }
    }

    public function is_preview_mode()
    {
        if (isset($_REQUEST['elementor-preview'])) {
            return false;
        }

        if (isset($_REQUEST['ver'])) {
            return false;
        }

        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'elementor') {
            return false;
        }
        return true;
    }

    public function graphina_is_elementor_installed()
    {
        $file_path = 'elementor/elementor.php';
        $installed_plugins = get_plugins();

        return isset($installed_plugins[$file_path]);
    }

    public function check_required_plugins_for_graphina()
    {
        if ($this->graphina_is_elementor_installed()) {
            if (!is_plugin_active('elementor/elementor.php')) {
                if (!current_user_can('activate_plugins')) {
                    return;
                }

                $plugin = 'elementor/elementor.php';

                $activation_url = esc_url(wp_nonce_url('plugins.php?action=activate&amp;plugin=' . $plugin . '&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_' . $plugin));

                $message = '<strong>'.esc_html__('Graphina - Elementor Charts and Graphs','graphina-charts-for-elementor').'</strong>'. esc_html__('requires','graphina-charts-for-elementor'). '<strong>'.esc_html__('Elementor').'</strong>'. esc_html__('plugin to be active. Please activate Elementor for Graphina - Elementor Charts and Graphs to continue.', 'graphina-charts-for-elementor');
                $button_text = esc_html__('Activate Elementor ', 'graphina-charts-for-elementor');

                $button = "<p><a href='{$activation_url}' class='button-primary'>{$button_text}</a></p>";

                printf('<div class="error"><p>%1$s</p>%2$s</div>', __($message), $button);
                if (isset($_GET['activate'])) unset($_GET['activate']);
                deactivate_plugins(GRAPHINA_BASE_PATH);
            }
            return;
        } else {
            if (!current_user_can('install_plugins')) {
                return;
            }
            $install_url = esc_url(wp_nonce_url(self_admin_url('update.php?action=install-plugin&plugin=elementor'), 'install-plugin_elementor'));
            $message = '<strong>'.esc_html__('Graphina - Elementor Charts and Graphs').' </strong> '. esc_html__('Not working because you need to install the','graphina-charts-for-elementor'). ' <strong> '.esc_html__('Elementor','graphina-charts-for-elementor').' </strong> '. esc_html__('plugin', 'graphina-charts-for-elementor');
            $button_text = esc_html__('Install Elementor ', 'graphina-charts-for-elementor');

            $button = "<p><a href='{$install_url}' class='button-primary'> {$button_text} </a></p>";

            printf('<div class="error"><p>%1$s</p>%2$s</div>', __($message), $button);
            if (isset($_GET['activate'])) unset($_GET['activate']);
            deactivate_plugins(GRAPHINA_BASE_PATH);
        }


    }

    public function promote_pro_elements($config)
    {
        if (isGraphinaPro()) {
            return $config;
        }

        $promotion_widgets = [];

        if (isset($config['promotionWidgets'])) {
            $promotion_widgets = $config['promotionWidgets'];
        }

        $combine_array = array_merge($promotion_widgets, [
            [
                'name' => 'dynamic_column_chart',
                'title' => esc_html__('Nested Column', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-wave-square',
                'categories' => '["iq-graphina-charts"]',
            ],            
            [
                'name' => 'mixed_chart',
                'title' => esc_html__('Mixed', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-water',
                'categories' => '["iq-graphina-charts"]',
            ],
            [
                'name' => 'graphina_counter',
                'title' => esc_html__('Counter', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-sort-numeric-up-alt',
                'categories' => '["iq-graphina-charts"]',
            ],
            [
                'name' => 'advance_datatable',
                'title' => esc_html__('Advance DataTable', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-table',
                'categories' => '["iq-graphina-charts"]',
            ],
                [
                'name' => 'brush_chart',
                'title' => esc_html__('Brush Charts', 'graphina-charts-for-elementor'),
                'icon' => 'fa fa-bars',
                'categories' => '["iq-graphina-charts"]',
            ],
            [
                'name' => 'gauge_google',
                'title' => esc_html__('Gauge', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-tachometer-alt',
                'categories' => '["iq-graphina-google-charts"]',
            ],
            [
                'name' => 'geo_google',
                'title' => esc_html__('Geo', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-globe-asia',
                'categories' => '["iq-graphina-google-charts"]',
            ],
            [
                'name' => 'org_google',
                'title' => esc_html__('Org', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-chess-board',
                'categories' => '["iq-graphina-google-charts"]',
            ],
            [
                'name' => 'gantt_google',
                'title' => esc_html__('Gantt', 'graphina-charts-for-elementor'),
                'icon' => 'fas fa-project-diagram',
                'categories' => '["iq-graphina-google-charts"]',
            ],
        ]);
        $config['promotionWidgets'] = $combine_array;

        return $config;
    }

    public function action_get_graphina_chart_settings()
    {
        $google_chart_data = [
            'count' => 0,
            'title_array' => [],
            'data' => [],
            'title' => ''
        ];
        $optionSetting = [];
        $default = ['chart' => ['dropShadow' => ['enabledOnSeries' => []]]];
        $data = ['series' => [], 'category' => [], 'fail_message' => '', 'fail' => false];
        $instantInit = $filterEnable = false;
        if (
            isset($_POST['action'])
            && 'get_graphina_chart_settings' === $_POST['action']
        ) {

            try {

                $settings = $_POST['fields'];
                $type = $_POST['chart_type'];
                $id = $_POST['chart_id'];
                $selected_item = $_POST['selected_field'];

                $gradient = $second_gradient = $dropShadowSeries = $stockWidth = $stockDashArray = $fill_pattern  = [];


                switch ($type) {
                    case 'distributed_column':
                    case 'line':
                    case 'area':
                    case 'column':
                    case 'heatmap':
                    case 'radar':
                    case 'line_google':   
                    case 'column_google': 
                    case 'bar_google':
                    case 'scatter':
                    case 'mixed':
                    case 'area_google':
                        $dataType = 'area';
                        break;
                    case 'donut':
                    case 'polar':
                    case 'pie':
                    case 'data-tables':
                    case 'radial':
                    case 'pie_google':
                    case 'donut_google':
                    case 'gauge_google':
                    case 'geo_google':
                        $dataType = 'circle';
                        break;
                    case 'timeline':
                        $dataType = 'timeline';
                        break;
                    case 'org_google':
                        $dataType = 'org_google';
                        break;
                    default:
                        $dataType = $type;
                        break;
                }
                if ( $settings['iq_' . $type . '_chart_data_option'] !== 'manual') {
                    if(isGraphinaPro() && $settings['iq_' . $type . '_chart_data_option'] !== 'forminator'){
                        $data = graphina_pro_chart_content($settings, $id, $type, $dataType,$selected_item);
                    }else{
                        if(graphinaForminatorAddonActive()){
                            $data = apply_filters('graphina_forminator_addon_data', $data,$type,$settings);
                        }
                    }
                    if (!empty($data['fail']) && $data['fail'] === 'permission') {
                        wp_send_json(['status' => true, 'instant_init' => false, 'fail' => true, 'fail_message' => !empty($data['fail_message']) ? $data['fail_message'] : '', 'chart_id' => $id, 'chart_option' => [],'category_count' => 0]);
                    }
                }
                $category_count = count($data['category']);
                if(in_array($type,['area_google','bar_google','column_google','line_google','pie_google','donut_google','gauge_google','geo_google','org_google'])){
                    $google_chart_data = $this->get_google_chart_format_data($data,$settings,$type);
                }else{
                    $seriesCount = !empty($settings['iq_' . $type . '_chart_data_series_count']) ? $settings['iq_' . $type . '_chart_data_series_count'] : 0;
                    for ($i = 0; $i < $seriesCount; $i++) {
                        $dropShadowSeries[] = $i;
                        $gradient[] = strval($settings['iq_' . $type . '_chart_gradient_1_' . $i]);
                        $second_gradient[] = !empty($settings['iq_' . $type . '_chart_gradient_2_' . $i]) ? strval($settings['iq_' . $type . '_chart_gradient_2_' . $i]) : strval($settings['iq_' . $type . '_chart_gradient_1_' . $i]);
                        $stockWidth[] = !empty($settings['iq_' . $type . '_chart_width_3_' . $i]) ? $settings['iq_' . $type . '_chart_width_3_' . $i] : 0;
                        $stockDashArray[] = !empty($settings['iq_' . $type . '_chart_dash_3_' . $i]) ? $settings['iq_' . $type . '_chart_dash_3_' . $i] : 0;
                        $fill_pattern[] = !empty($settings['iq_' . $type . '_chart_bg_pattern_' . $i]) ? $settings['iq_' . $type . '_chart_bg_pattern_' . $i] : 'verticalLines';
                    }
                    if($type === "distributed_column" && isset($data['series'][0]['data'])){
                        $data['series'] = [$data['series'][0]];
                        if(is_array($data['series'][0]['data'])){
                            $data['series'][0]['data'] = array_slice($data['series'][0]['data'],0,$seriesCount);
                            $data['category'] = array_slice($data['category'],0,$seriesCount);
                        }
                    }
                    $gradient_count = count($gradient);
                    $second_gradient_count = count($second_gradient);
                    $optionSetting = [
                        'series' => $data['series'],
                        'chart' => [
                            'animations' => [
                                'enabled' => $settings['iq_' . $type . '_chart_animation'] === "yes"
                            ]
                        ],
                        'noData' => [
                            'text' => (!empty($settings['iq_' . $type . '_chart_no_data_text']) ? $settings['iq_' . $type . '_chart_no_data_text'] : '')
                        ],
                        'stroke' => [
                            'width' => $stockWidth,
                            'dashArray' => $stockDashArray
                        ],
                        'colors' => $gradient_count === 0 ? ['#ffffff'] : $gradient,
                        'fill' => [
                            'colors' => $gradient_count === 0 ? ['#ffffff'] : $gradient,
                            'gradient' => [
                                'gradientToColors' => $second_gradient_count === 0 ? ['#ffffff'] : $second_gradient
                            ]
                        ]
                    ];
                    if ($type === 'radar' && $category_count > 0) {
                        $optionSetting['xaxis']['labels']['style']['colors'] = array_fill(0,$category_count,strval($settings['iq_' . $type . '_chart_font_color']));
                    }
                    if ($dataType != 'bubble') {
                        $optionSetting['chart']['dropShadow'] = [
                            'enabledOnSeries' => $dropShadowSeries
                        ];
                    }
                    if (!in_array($dataType, ['candle', 'bubble', 'circle'])) {
                        $optionSetting['xaxis']['categories'] = ($category_count > 0 ? $data['category'] : []);
                    }
                    if ($dataType == 'circle') {
                        $optionSetting['fill']['pattern'] = [
                            'style' => $fill_pattern,
                            'width' => 6,
                            'height' => 6,
                            'strokeWidth' => 2
                        ];
                        $optionSetting['fill']['gradient']['gradientToColors'] = $second_gradient_count === 0 ? ['#ffffff'] : $second_gradient;
                        $optionSetting['stroke'] = ['width' => (!empty($settings['iq_' . $type . '_chart_stroke_width']) ? (int)$settings['iq_' . $type . '_chart_stroke_width'] : 0)];
                        $optionSetting['labels'] = ($category_count > 0 ? $data['category'] : []);
                        $optionSetting['legend'] = ['show' => !empty($settings['iq_' . $type . '_chart_legend_show']) && $settings['iq_' . $type . '_chart_legend_show'] === "yes" && count($data['series']) > 0 && $category_count > 0];
                    }
                    if($type == 'heatmap'){
                        $optionSetting['stroke']['show'] = $settings['iq_' . $type . '_chart_stroke_show'] === 'yes';
                        $optionSetting['stroke']['width'] =  $settings['iq_' . $type . '_chart_stroke_show'] === "yes" && !empty($settings['iq_' . $type . '_chart_stroke_width']) ? $settings['iq_' . $type . '_chart_stroke_width'] : 0 ; ;
                    }
                    if (count($data['series']) > 0 && isset($data['series'][0]['data']) && count($data['series'][0]['data']) > 100) {
                        $optionSetting['chart']['animations'] = [
                            'enabled' => false,
                            'dynamicAnimation' => ['enabled' => false]
                        ];
                        $instantInit = !(!empty($settings['iq_' . $type . '_chart_filter_enable']) && $settings['iq_' . $type . '_chart_filter_enable'] == 'yes');
                        $instantInit = apply_filters('graphina_chart_redraw',$instantInit); 
                    }
                }

                $filterEnable = !empty($settings['iq_'.$type.'_chart_filter_enable']) && $settings['iq_'.$type.'_chart_filter_enable'] == 'yes';

                wp_send_json(['status' => true, 'instant_init' => $instantInit, 'fail' => false, 'fail_message' => '', 'chart_id' => $id, 'chart_option' => $optionSetting, 'extra' => $data ,'filterEnable' => $filterEnable ,'googlechartData' => $google_chart_data ,'category_count' => $category_count ]);
            } catch (Exception $exception) {

                wp_send_json(['status' => false, 'instant_init' => $instantInit, 'fail' => false, 'fail_message' => '', 'chart_id' => -1, 'chart_option' => $default,'filterEnable' => $filterEnable,'googlechartData' => $google_chart_data,'category_count' => 0]);
            }
        }

        wp_send_json(['status' => false, 'instant_init' => $instantInit, 'fail' => false, 'fail_message' => '', 'chart_id' => -1, 'chart_option' => $default,'filterEnable' => $filterEnable,'googlechartData' => $google_chart_data,'category_count' => 0]);
    }

    function action_graphina_restrict_password_ajax(){
        if(isset($_POST['action']) == 'graphina_restrict_password_ajax'){
            if(wp_check_password($_POST['graphina_password'],$_POST['chart_password']))
            {
                wp_send_json(['status' => true ,'chart'=>'graphina_'.$_POST['chart_type'].'_'.$_POST['chart_id']]);
            }
            else{
                wp_send_json(['status' => false]);
            }
            die;
        }
    }

    function get_google_chart_format_data($data,$settings,$type){
        $google_chart_data = [
            'count' => 0,
            'title_array' => [],
            'data' => [],
            'annotation_show' => !empty($settings['iq_' . $type . '_chart_annotation_show']) ? $settings['iq_' . $type . '_chart_annotation_show'] : 'no'
        ];
        $google_chart_data['title'] = !empty($settings['iq_' . $type . '_chart_haxis_title']) ? (string)$settings['iq_' . $type . '_chart_haxis_title'] : '';
        if(!empty($data['series']) && count($data['series']) > 0 &&
            !empty($data['category']) && count($data['category']) > 0){
            if(in_array($type,['pie_google','donut_google','gauge_google','geo_google'])){
                foreach ($data['category'] as $key => $va){
                    $google_chart_data['data'][] = [
                        $va,
                        $data['series'][$key],
                    ];
                }
            }else if($type === 'org_google'){
                foreach ($data['category'] as $key => $value) {
                    if($key >= $settings['iq_' . $type . '_chart_data_series_count'] ){
                        break;
                    }
                    if(!empty($value) && !empty($data['series'][0]['data'][$key])){
                        $temp = [
                            $value,
                            $data['series'][0]['data'][$key]
                        ];
                        if(!empty($data['series'][1]['data'][$key])){
                            $temp[] = $data['series'][1]['data'][$key];
                        }
                        $google_chart_data['data'][] = $temp;
                    }
                }
            }else{
                $google_chart_data['count'] = count($data['series']);
                $seriesName = [];
                $xPrefix = $xPostfix = '';
                if(!empty($settings['iq_' . $type . '_chart_haxis_label_prefix_postfix'])){
                    $xPrefix = $settings['iq_' . $type . '_chart_haxis_label_prefix'];
                    $xPostfix = $settings['iq_' . $type . '_chart_haxis_label_postfix'];
                }
                foreach ($data['category'] as $key => $value){
                    $datas = $seriesName= [];
                    $value = $xPrefix . $value .$xPostfix;
                    $datas[] = $value;
                    foreach ($data['series'] as $key3 => $value3){
                        $seriesName[] = $value3['name'];
                        $datas[] = (float)$value3['data'][$key];
                        if( $settings['iq_' . $type . '_chart_annotation_show'] === 'yes' ){
                            if( !empty($settings['iq_' . $type . '_chart_annotation_prefix_postfix']) ){
                                $datas[] = $settings['iq_' . $type . '_chart_annotation_prefix'].(float)$value3['data'][$key].$settings['iq_' . $type . '_chart_annotation_postfix'];
                            }else{
                                $datas[] =strval($value3['data'][$key]);
                            }
                        }
                    }
                    $google_chart_data['data'][]=$datas;
                }
                $google_chart_data['title_array'] = $seriesName;
            }

        }
        return $google_chart_data;
    }

    function get_id(){
        return $this->widget_id;
    }

    function get_settings_for_display(){
        return $this->settings;
    }

    function action_get_jquery_datatable_data(){

        $id = $_POST['chart_id'];

        if (isset($_POST['action']) && 'get_jquery_datatable_data' === $_POST['action']) {
            try {
                $settings = $_POST['fields'];
                $type = $_POST['chart_type'];
                $dataOption = $settings['iq_' . $type . '_chart_data_option'];
                $data = [];
                $this->widget_id = $id;
                $this->settings = $_POST['fields'];
                switch ($dataOption) {
                    case "manual":
                        for ($i = 0; $i < $settings['iq_' . $type . '_element_columns']; $i++) {
                            $data['header'][] = $settings['iq_' . $type . '_chart_header_title_' . $i];
                        }
                        for ($i = 0; $i < $settings['iq_' . $type . '_element_rows']; $i++) {
                            $data['body'][$i] = array_column($settings['iq_' . $type . '_row_list' . $i],'iq_' . $type . '_row_value');
                        }
                        break;
                    case "dynamic":
                        if (isGraphinaPro()) {
                            $data = graphina_pro_datatable_content($this, $settings, $type);
                        }
                        break;
                    case 'forminator':
                        if (graphinaForminatorAddonActive()) {
                            $data = apply_filters('graphina_forminator_addon_data', $data, $type, $settings);
                        }
                        break;
                    case 'firebase':
                        $data = apply_filters('graphina_addons_render_section', $data, $type, $settings);
                        break;
                }


                if ( empty($data['header']) || !is_array($data['header'])) {
                    wp_send_json(['status' => false, 'table_id' => $id, 'data' => ['head' => [], 'body' => []]]);
                    die;
                }

                $data['body'] = array_map(function ($value) use ($data) {
                    if (count($value) != count($data['header'])) {
                        $diff = count($data['header']) - count($value);
                        if ($diff < 0) {
                            $value = array_slice($value, 0, count($data['header']));
                        } else {
                            $empty_value = array_fill(0, $diff, "-");
                            $value = array_merge($value, $empty_value);
                        }
                    }
                    return $value;
                }, $data['body']);
                wp_send_json(['status' => true,
                        'table_id' => $id,
                        'data' => $data]
                );
                die;
            } catch (Exception $exception) {
                wp_send_json([
                    'status' => false,
                    'table_id' => $id,
                    'data' => ['head' => [], 'body' => []]]
                );
                die;
            }
        }

        wp_send_json(['status' => false, 'chart_id' => $id, 'data' => ['head' => [],'body' => []]]);
        die;

    }
}

