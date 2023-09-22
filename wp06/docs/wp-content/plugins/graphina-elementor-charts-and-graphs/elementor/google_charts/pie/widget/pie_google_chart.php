<?php

namespace Elementor;

Use Elementor\Core\Schemes\Typography as Scheme_Typography;

if (!defined('ABSPATH')) exit;

/**
 * Elementor Blog widget.
 *
 * Elementor widget that displays an eye-catching headlines.
 *
 * @since 1.5.7
 */
class Pie_google_chart extends Widget_Base
{


    private $defaultLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan1', 'Feb1', 'Mar1', 'Apr1', 'Jun1', 'July1', 'Aug1', 'Sep1', 'Oct1', 'Nov1', 'Dec1', 'Jan2', 'Feb2', 'Mar2', 'Apr2', 'May2', 'Jun2', 'July2', 'Aug2', 'Sep2', 'Oct2', 'Nov2', 'Dec2'];
    private $color = ['#449DD1', '#F86624', '#546E7A', '#D4526E', '#775DD0', '#FF4560', '#7D02EB', '#8D5B4C', '#F86624', '#2E294E'];
    private $gradientColor = ['#D56767', '#E02828', '#26A2D6', '#40B293', '#69DFDD', '#F28686', '#7D02EB', '#E02828', '#D56767', '#26A2D6'];

    /**
     * Get widget name.
     *
     * Retrieve heading widget name.
     *
     * @return string Widget name.
     * @since 1.5.7
     * @access public
     *
     */

    public function __construct($data = [], $args = null)
    {
        wp_register_script('googlecharts-min', plugin_dir_url(__FILE__) . 'js/gstatic/loader.js', [], GRAPHINA_CHARTS_FOR_ELEMENTOR_VERSION, true);
        parent::__construct($data, $args);
    }

    public function get_script_depends() {
        return [
            'googlecharts-min'
        ];
    }

    public function get_name()
    {
        return 'pie_google_chart';
    }

    /**
     * Get widget Title.
     *
     * Retrieve heading widget Title.
     *
     * @return string Widget Title.
     * @since 1.5.7
     * @access public
     *
     */

    public function get_title()
    {
        return 'Pie';
    }

    /**
     * Get widget categories.
     *
     * Retrieve the list of categories the heading widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * @return array Widget categories.
     * @since 1.5.7
     * @access public
     *
     */


    public function get_categories()
    {
        return ['iq-graphina-google-charts'];
    }


    /**
     * Get widget icon.
     *
     * Retrieve heading widget icon.
     *
     * @return string Widget icon.
     * @since 1.5.7
     * @access public
     *
     */

    public function get_icon()
    {
        return 'graphina-google-pie-chart';
    }

    public function get_chart_type()
    {
        return 'pie_google';
    }

    protected function register_controls()
    {
        $type = $this->get_chart_type();
        $colors = graphina_colors('color');
        $this->color = graphina_colors('color');

        $this->gradientColor = graphina_colors('gradientColor');

        graphina_basic_setting($this, $type);

        graphina_chart_data_option_setting($this, $type, 0, true);
        

        /* Data Option: 'Manual' Start */
        $this->start_controls_section(
            'iq_'.$type.'_datalabel_sections',
            [
                'label' => esc_html__( 'Data Table Options', 'graphina-charts-for-elementor' ),
                'condition' => [
                    'iq_' . $type . '_chart_data_option' => 'manual'
                ],
            ]
        );

        $this->add_control(
			'iq_'.$type.'_columnone_title',
			[
				'label' => esc_html__( 'Label Title', 'graphina-charts-for-elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Month', 'graphina-charts-for-elementor' ),
                'description' => esc_html__("Data Values Title in DataTable", 'graphina-charts-for-elementor'),
			]
		);

        $this->add_control(
			'iq_'.$type.'_columntwo_title',
			[
				'label' => esc_html__( 'Value Title', 'graphina-charts-for-elementor' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Sales', 'graphina-charts-for-elementor' ),
                'description' => esc_html__("Data Values Title in DataTable", 'graphina-charts-for-elementor'),
			]
		);
        
        
        $this->end_controls_section();
        $this->start_controls_section(
            'iq_' . $type . '_section_2',
            [
                'label' => esc_html__('Chart Setting', 'graphina-charts-for-elementor'),
            ]
        );
        $this->add_control(
            'iq_' . $type . '_chart_title_heading',
            [
                'label' => esc_html__('Chart Title Settings', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::HEADING,
            ]
        );

        $this->add_control(
            'iq_' . $type . '_chart_title_show',
            [
                'label' => esc_html__('Chart Title Show', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'no'
            ]
        );

        $this->add_control(
            'iq_' . $type . '_chart_title',
            [
                'label' => esc_html__('Chart Title', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::TEXT,
                'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                'default' => esc_html__('Chart Title', 'graphina-charts-for-elementor'),
                'condition' => [
                    'iq_' . $type . '_chart_title_show' => 'yes'
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_chart_title_color',
            [
                'label' => esc_html__('Title Font Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'condition' => [
                    'iq_' . $type . '_chart_title_show' => 'yes'
                ]
            ]
        );
        
        $this->add_control(
            'iq_' . $type . '_chart_title_font_size',
            [
                'label' => esc_html__('Title Font Size', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'default' => 20,
                'condition' => [
                    'iq_' . $type . '_chart_title_show' => 'yes'
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_chart_title_setting',
            [
                'type' => Controls_Manager::DIVIDER,
            ]
        );

        graphina_common_chart_setting($this, $type, false);
        graphina_element_label($this, $type);
        graphina_tooltip($this, $type);
    
        $this->end_controls_section();

        graphina_advance_legend_setting($this, $type);
       
        /* Manual Data options start */
        for ($i = 0; $i <= graphina_default_setting('max_series_value'); $i++) {

            $this->start_controls_section(
                'iq_' . $type . '_section_series' . $i,
                [
                    'label' => esc_html__('Element ' . ($i + 1), 'graphina-charts-for-elementor'),
                    'default' => rand(50, 200),
                    'condition' => [
                        'iq_' . $type . '_chart_data_series_count' => range($i + 1, graphina_default_setting('max_series_value')),
//                        'iq_' . $type . '_chart_data_option' => 'manual'
                    ],

                ]
            );

            $this->add_control(
                'iq_' . $type . '_chart_label' . $i,
                [
                    'label' => 'Label',
                    'type' => Controls_Manager::TEXT,
                    'placeholder' => esc_html__('Add Label', 'graphina-charts-for-elementor'),
                    'default' => $this->defaultLabel[$i],
                    'dynamic' => [
                        'active' => true,
                    ],
                    'condition'=>[
                        'iq_' . $type . '_chart_data_option' => 'manual'
                    ]
                ]
            );

            $this->add_control(
                'iq_' . $type . '_chart_value' . $i,
                [
                    'label' => 'Value',
                    'type' => Controls_Manager::NUMBER,
                    'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                    'default' => rand(25, 200),
                    'dynamic' => [
                        'active' => true,
                    ],
                    'condition'=>[
                        'iq_' . $type . '_chart_data_option' => 'manual'
                    ]
                ]
            );
         
          
        
                $this->add_control(
                    'iq_' . $type . '_chart_element_color_' . $i,
                    [
                        'label' => esc_html__('Color', 'graphina-charts-for-elementor'),
                        'type' => Controls_Manager::COLOR,
                        'default' => $colors[$i],
        
                    ]
                );
            
        

            $this->end_controls_section();
        }
        /* Manual Data options End */

        graphina_style_section($this, $type);

        graphina_card_style($this, $type);

        graphina_chart_style($this, $type);

        graphina_chart_filter_style($this,$type);

        if (function_exists('graphina_pro_password_style_section')) {
            graphina_pro_password_style_section($this, $type);
        }

    }

    protected function render(){

        $mainId = graphina_widget_id($this);
        $colors = [];
        $pieData = [];
        $type = $this->get_chart_type();
        $settings = $this->get_settings_for_display();
        $legendPosition = $settings['iq_' . $type . '_google_chart_legend_show'] === 'yes' ? $settings['iq_' . $type . '_google_piechart_legend_position'] : 'none';
        for ($i = 0; $i < $settings['iq_' . $type . '_chart_data_series_count']; $i++) {
            $colors[] =(string)graphina_get_dynamic_tag_data($settings, 'iq_' . $type . '_chart_element_color_' . $i);
            if($settings['iq_' . $type . '_chart_data_option'] === 'manual'){
                $pieData[] = [
                    $settings['iq_' . $type . '_chart_label' . $i],
                    (float)$settings['iq_' . $type . '_chart_value' . $i],
                ];
            }
        }


        $pieData = json_encode($pieData);
        $ele_colors = implode('_,_',$colors);
        graphina_chart_widget_content($this, $mainId, $settings);
        if (isRestrictedAccess($type, $mainId, $settings, false) === false) {
            ?>
            <script type="text/javascript">

                (function ($) {
                    'use strict';
                    if (parent.document.querySelector('.elementor-editor-active') !== null) {
                        if (typeof isInit === 'undefined') {
                            var isInit = {};
                        }
                        isInit['<?php esc_attr_e($mainId); ?>'] = false;
                        google.charts.load('current', {'packages': ['corechart']});
                        google.charts.setOnLoadCallback(drawChart);
                    }
                    document.addEventListener('readystatechange', event => {
                        // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
                        if (event.target.readyState === "complete") {
                            if (typeof isInit === 'undefined') {
                                var isInit = {};
                            }
                            isInit['<?php esc_attr_e($mainId); ?>'] = false;
                            google.charts.load('current', {'packages': ['corechart']});
                            google.charts.setOnLoadCallback(drawChart);
                        }
                    })

                    function drawChart() {

                        var data = new google.visualization.DataTable();
                        data.addColumn('string', '<?php echo $settings['iq_' . $type . '_columnone_title']; ?>');
                        data.addColumn('number', '<?php echo $settings['iq_' . $type . '_columntwo_title']; ?>');
                        data.addRows(<?php echo $pieData; ?>);

                        if ('<?php echo !empty($settings['iq_' . $type . '_chart_label_prefix_postfix']) && $settings['iq_' . $type . '_chart_label_prefix_postfix'] === 'yes' ?>') {
                            var formatter = new google.visualization.NumberFormat({
                                prefix: '<?php echo $settings['iq_' . $type . '_chart_label_prefix']?>',
                                suffix: '<?php echo $settings['iq_' . $type . '_chart_label_postfix']?>',
                                fractionDigits: 0
                            });
                                formatter.format(data, 1);
                        }
                        /* Graph Options */
                        var options = {
                            title: '<?php echo strval($settings['iq_' . $type . '_chart_title']); ?>',
                            titleTextStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_title_color']); ?>',
                                fontSize: '<?php echo strval($settings['iq_' . $type . '_chart_title_font_size']); ?>',
                            },
                            chartArea: '<?php echo strval($legendPosition); ?>' === 'top' ? {
                                top: '15%',
                                width: '100%',
                                height: '80%'
                            } : {width: '100%', height: '80%'},
                            height: parseInt('<?php echo $settings['iq_' . $type . '_chart_height']; ?>'),
                            backgroundColor: '<?php echo strval($settings['iq_' . $type . '_chart_background_color1']); ?>',
                            colors: '<?php echo $ele_colors; ?>'.split('_,_'),
                            tooltip: {
                                showColorCode: true,
                                textStyle: {color: '<?php echo $settings['iq_' . $type . '_chart_tooltip_color']; ?>',},
                                trigger: '<?php echo $settings['iq_' . $type . '_chart_tooltip_show'] === 'yes' ? $settings['iq_' . $type . '_chart_tooltip_trigger'] : 'none'; ?>',
                                text: '<?php echo $settings['iq_' . $type . '_chart_tooltip_text']; ?>',
                            },
                            legend: {
                                position: '<?php echo strval($legendPosition); ?>',
                                labeledValueText: '<?php echo strval($settings['iq_' . $type . '_google_chart_legend_labeld_value']); ?>',
                                textStyle: {
                                    fontSize: parseInt('<?php echo $settings['iq_' . $type . '_google_chart_legend_fontsize']; ?>'),
                                    color: '<?php echo strval($settings['iq_' . $type . '_google_chart_legend_color']); ?>',
                                },
                                alignment: '<?php echo strval($settings['iq_' . $type . '_google_chart_legend_horizontal_align']); ?>', // start,center,end
                            },
                            reverseCategories: '<?php echo $settings['iq_' . $type . '_chart_label_reversecategory'] == 'yes'; ?>',
                            pieSliceText: '<?php echo strval($settings['iq_' . $type . '_chart_pieSliceText_show'] === 'yes' ? $settings['iq_' . $type . '_chart_pieSliceText'] : 'none'); ?>',
                            sliceVisibilityThreshold: 0,
                            pieSliceBorderColor: '<?php echo !empty($settings['iq_' . $type . '_chart_pieslice_bordercolor']) ? strval($settings['iq_' . $type . '_chart_pieslice_bordercolor']) : '#000000'; ?>',
                            pieSliceTextStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_pieSliceText_color']); ?>',
                                fontSize: '<?php echo strval($settings['iq_' . $type . '_chart_pieSliceText_fontsize']); ?>',
                            },
                            is3D: '<?php echo $settings['iq_' . $type . '_chart_isthreed'] == 'yes'; ?>',
                        };

                        if (typeof graphinaGoogleChartInit !== "undefined") {
                            graphinaGoogleChartInit(
                                document.getElementById('pie_google_chart<?php esc_attr_e($mainId); ?>'),
                                {
                                    ele: document.getElementById('pie_google_chart<?php esc_attr_e($mainId); ?>'),
                                    options: options,
                                    series: data,
                                    animation: true,
                                    renderType: 'PieChart',
                                    setting_date:<?php echo json_encode($settings); ?>
                                },
                                '<?php esc_attr_e($mainId); ?>',
                                '<?php echo $this->get_chart_type(); ?>',
                            );
                        }
                        if (window['ajaxIntervalGraphina_' + '<?php esc_attr_e($mainId); ?>'] !== undefined) {
                            clearInterval(window['ajaxIntervalGraphina_' + '<?php esc_attr_e($mainId); ?>']);
                        }
                        if('<?php echo ($settings['iq_' . $type . '_chart_data_option'] !== 'manual') ?>'){
                            if('<?php echo $settings['iq_' . $type . '_chart_data_option'] === 'forminator' || isGraphinaPro() ?>'){
                                graphina_google_chart_ajax_reload('<?php echo true ?>',
                                    '<?php echo $this->get_chart_type(); ?>',
                                    '<?php esc_attr_e($mainId); ?>',
                                    '<?php echo !empty($settings['iq_' . $type . '_can_chart_reload_ajax'])
                                    && $settings['iq_' . $type . '_can_chart_reload_ajax'] === 'yes' ? 'true' : 'false'; ?>',
                                    '<?php echo !empty($settings['iq_' . $type . '_interval_data_refresh']) ? $settings['iq_' . $type . '_interval_data_refresh'] : 5 ?>')
                            }
                        }
                    }

                }).apply(this, [jQuery]);

            </script>
            <?php
        }
    }
}

Plugin::instance()->widgets_manager->register(new Pie_google_chart());