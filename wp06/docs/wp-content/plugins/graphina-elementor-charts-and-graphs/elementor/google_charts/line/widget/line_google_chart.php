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
class Line_google_chart extends Widget_Base
{
    private $defaultLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan1', 'Feb1', 'Mar1', 'Apr1', 'Jun1', 'July1', 'Aug1', 'Sep1', 'Oct1', 'Nov1', 'Dec1'];
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
        wp_register_script('googlecharts-min', GRAPHINA_URL.'/elementor/js/gstatic/loader.js', [], GRAPHINA_CHARTS_FOR_ELEMENTOR_VERSION, true);
        parent::__construct($data, $args);
    }

    public function get_script_depends() {
        return [
            'googlecharts-min'
        ];
    }

    public function get_name()
    {
        return 'line_google_chart';
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
        return 'Line';
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
        return 'graphina-google-line-chart';
    }

    public function get_chart_type()
    {
        return 'line_google';
    }

    protected function register_controls()
    {
        $type = $this->get_chart_type();
        $this->color = graphina_colors('color');
        $this->gradientColor = graphina_colors('gradientColor');

        graphina_basic_setting($this, $type);

        graphina_chart_data_option_setting($this, $type, 0, true);

        $this->start_controls_section(
            'iq_' . $type . '_section_2',
            [
                'label' => esc_html__('Chart Setting', 'graphina-charts-for-elementor'),
            ]
        );
        $this->add_control(
            'iq_' . $type . '_google_chart_title_heading',
            [
                'label' => esc_html__('Chart Title Settings', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::HEADING,
            ]
        );

        $this->add_control(
            'iq_' . $type . '_google_chart_title_show',
            [
                'label' => esc_html__('Chart Title Show', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'no'
            ]
        );

        $this->add_control(
            'iq_' . $type . '_google_chart_title',
            [
                'label' => esc_html__('Chart Title', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::TEXT,
                'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                'default' => esc_html__('Chart Title', 'graphina-charts-for-elementor'),
                'condition' => [
                    'iq_' . $type . '_google_chart_title_show' => 'yes'
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_google_chart_title_position',
            [
                'label' => esc_html__('Position', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'in' => esc_html__('In', 'graphina-charts-for-elementor'),
                    'out' => esc_html__('Out', 'graphina-charts-for-elementor')
                ],
                'default' => 'out',
                'condition' => [
                    'iq_' . $type . '_google_chart_title_show' => 'yes'
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_google_chart_title_color',
            [
                'label' => esc_html__('Title Font Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'condition' => [
                    'iq_' . $type . '_google_chart_title_show' => 'yes'
                ]
            ]
        );
        
        $this->add_control(
            'iq_' . $type . '_google_chart_title_font_size',
            [
                'label' => esc_html__('Title Font Size', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'default' => 20,
                'condition' => [
                    'iq_' . $type . '_google_chart_title_show' => 'yes'
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_chart_title_setting',
            [
                'type' => Controls_Manager::DIVIDER,
            ]
        );
        $this->add_control(
            'iq_' . $type . '_chart_line_curve',
            [
                'label' => esc_html__('Line Shape', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'none',
                 'options' => [
                    "none" => esc_html__('none', 'graphina-charts-for-elementor'),
                    "function" => esc_html__('function', 'graphina-charts-for-elementor')
                   
                ]
            ]
        );

        graphina_common_chart_setting($this, $type, false);

        graphina_tooltip($this, $type);

        graphina_animation($this, $type);

        $this->add_control(
            'iq_' . $type . '_chart_hr_category_listing',
            [
                'type' => Controls_Manager::DIVIDER,
                'condition' => [
                    'iq_' . $type . '_chart_data_option' => 'manual'
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'iq_' . $type . '_chart_category',
            [
                'label' => esc_html__('Category Value', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::TEXT,
                'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                'dynamic' => [
                    'active' => true,
                ],
                'description' => esc_html__('Note: For multiline text seperate Text by comma(,) ','graphina-charts-for-elementor')
            ]
        );

        /** Chart value list. */
        $this->add_control(
            'iq_' . $type . '_category_list',
            [
                'label' => esc_html__('Categories', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::REPEATER,
                'fields' => $repeater->get_controls(),
                'default' => [
                    ['iq_' . $type . '_chart_category' => 'Jan'],
                    ['iq_' . $type . '_chart_category' => 'Feb'],
                    ['iq_' . $type . '_chart_category' => 'Mar'],
                    ['iq_' . $type . '_chart_category' => 'Apr'],
                    ['iq_' . $type . '_chart_category' => 'May'],
                    ['iq_' . $type . '_chart_category' => 'Jun'],
                ],
                'condition' => [
                    'iq_' . $type . '_chart_data_option' => 'manual'
                ],
                'title_field' => '{{{ iq_' . $type . '_chart_category }}}',
            ]
        );

        $this->end_controls_section();

        graphina_advance_legend_setting($this, $type);

        graphina_advance_h_axis_setting($this, $type);

        graphina_advance_v_axis_setting($this, $type);

        graphina_google_series_setting($this, $type, ['tooltip', 'color']);

        for ($i = 0; $i < graphina_default_setting('max_series_value'); $i++) {
            $this->start_controls_section(
                'iq_' . $type . '_section_3_' . $i,
                [
                    'label' => esc_html__('Element ' . ($i + 1), 'graphina-charts-for-elementor'),
                    'condition' => [
                        'iq_' . $type . '_chart_data_series_count' => range(1 + $i, graphina_default_setting('max_series_value')),
                        'iq_' . $type . '_chart_data_option' => 'manual'
                    ],
                    'conditions' => [
                        'relation' => 'or',
                        'terms' => [
                            [
                                'relation' => 'and',
                                'terms' => [
                                    [
                                        'name' => 'iq_' . $type . '_chart_is_pro',
                                        'operator' => '==',
                                        'value' => 'false'
                                    ],
                                    [
                                        'name' => 'iq_' . $type . '_chart_data_option',
                                        'operator' => '==',
                                        'value' => 'manual'
                                    ]
                                ]
                            ],
                            [
                                'relation' => 'and',
                                'terms' => [
                                    [
                                        'name' => 'iq_' . $type . '_chart_is_pro',
                                        'operator' => '==',
                                        'value' => 'true'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            );
            $this->add_control(
                'iq_' . $type . '_chart_title_3_' . $i,
                [
                    'label' => 'Title',
                    'type' => Controls_Manager::TEXT,
                    'placeholder' => esc_html__('Add Tile', 'graphina-charts-for-elementor'),
                    'default' => 'Element ' . ($i + 1),
                    'dynamic' => [
                        'active' => true,
                    ],
                ]
            );

            $repeater = new Repeater();

            $repeater->add_control(
                'iq_' . $type . '_chart_value_3_' . $i,
                [
                    'label' => 'Element Value',
                    'type' => Controls_Manager::NUMBER,
                    'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                    'dynamic' => [
                        'active' => true,
                    ],
                ]
            );

            /** Chart value list. */
            $this->add_control(
                'iq_' . $type . '_value_list_3_1_' . $i,
                [
                    'label' => esc_html__('Values', 'graphina-charts-for-elementor'),
                    'type' => Controls_Manager::REPEATER,
                    'fields' => $repeater->get_controls(),
                    'default' => [
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(10, 200)]
                    ],
                    'condition' => [
                        'iq_' . $type . '_can_chart_negative_values!' => 'yes'
                    ],
                    'title_field' => '{{{ iq_' . $type . '_chart_value_3_' . $i . ' }}}',
                ]
            );

            $this->add_control(
                'iq_' . $type . '_value_list_3_2_' . $i,
                [
                    'label' => esc_html__('Values', 'graphina-charts-for-elementor'),
                    'type' => Controls_Manager::REPEATER,
                    'fields' => $repeater->get_controls(),
                    'default' => [
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)],
                        ['iq_' . $type . '_chart_value_3_' . $i => rand(-200, 200)]
                    ],
                    'condition' => [
                        'iq_' . $type . '_can_chart_negative_values' => 'yes'
                    ],
                    'title_field' => '{{{ iq_' . $type . '_chart_value_3_' . $i . ' }}}',
                ]
            );

            $this->end_controls_section();

        }

        graphina_style_section($this, $type);

        graphina_card_style($this, $type);

        graphina_chart_style($this, $type);

        graphina_chart_filter_style($this,$type);

        if (function_exists('graphina_pro_password_style_section')) {
            graphina_pro_password_style_section($this, $type);
        }
    }

    protected function render()
    {
//        require GRAPHINA_ROOT . '/elementor/google_charts/line/render/line_google_chart.php';
     
        $type = $this->get_chart_type();
        $settings = $this->get_settings_for_display();
        $mainId = graphina_widget_id($this);
        $category_count = 0;
        $lineData = $element_colors = $seriesStyleArray = $elementTitleArray = [];
        $legendPosition = $settings['iq_' . $type . '_google_chart_legend_show'] === 'yes' ? $settings['iq_' . $type . '_google_chart_legend_position'] : 'none';

        if($settings['iq_' . $type . '_chart_data_option'] === 'manual'){
            // category list
            $category_count = count($settings['iq_' . $type . '_category_list']);
            $xaxisPrefix = $xaxisPostfix = '';
            if(!empty($settings['iq_' . $type . '_chart_haxis_label_prefix_postfix'])){
                $xaxisPrefix = $settings['iq_' . $type . '_chart_haxis_label_prefix'];
                $xaxisPostfix = $settings['iq_' . $type . '_chart_haxis_label_postfix'];
            }
            foreach ($settings['iq_' . $type . '_category_list'] as $key => $value ){
                $lineData[$key][] = $xaxisPrefix .$value['iq_' . $type . '_chart_category'] . $xaxisPostfix;
            }
        }

        $annotationPrefix = $annotationPostfix = '';
        if( $settings['iq_' . $type . '_chart_annotation_show'] === 'yes' && !empty($settings['iq_' . $type . '_chart_annotation_prefix_postfix'])){
            $annotationPrefix = $settings['iq_' . $type . '_chart_annotation_prefix'];
            $annotationPostfix = $settings['iq_' . $type . '_chart_annotation_postfix'];
        }

        for ($j = 0; $j < $settings['iq_' . $type . '_chart_data_series_count']; $j++) {
            $valueList = $settings['iq_' . $type . '_value_list_3_' . ($settings['iq_' . $type . '_can_chart_negative_values'] === 'yes' ? 2 : 1) . '_' . $j];
            $element_colors[] = $settings['iq_' . $type . '_chart_element_color_' . $j];
            $elementTitleArray[] =  $settings['iq_' . $type . '_chart_title_3_' . $j];
            $pointShow = $settings['iq_' . $type . '_chart_point_show' . $j];
            if($pointShow){
                $pointSize = $settings['iq_' . $type . '_chart_line_point_size' . $j];
                $pointShape = $settings['iq_' . $type . '_chart_line_point'.$j];
            }else{
                $pointSize = null;
                $pointShape = null;
            }

            switch ($settings['iq_' . $type . '_chart_element_lineDash' . $j]) {
                case "style_1":
                    $lineDash = [1, 1];
                  break;
                case "style_2":
                    $lineDash = [2, 2];
                break;
                case "style_3":
                    $lineDash = [4, 4];
                break;
                case "style_4":
                    $lineDash = [5, 1, 3];
                break;
                case "style_5":
                    $lineDash = [4, 1];
                break;
                case "style_6":
                    $lineDash = [10, 2];
                break;
                case "style_7":
                    $lineDash = [14, 2, 7, 2];
                break;
                case "style_8":
                    $lineDash = [14, 2, 2, 7];
                break;
                case "style_9":
                    $lineDash = [2, 2, 20, 2, 20, 2];
                break;
                default:
                    $lineDash = null;
            }

            $seriesStyleArray[] = [
                'lineWidth' => $settings['iq_' . $type . '_chart_element_linewidth' . $j],
                'lineDashStyle' => $lineDash,
                'pointShow' => $pointShow,
                'pointSize' => $pointSize,
                'pointShape' => $pointShape,
                'targetAxisIndex' => $legendPosition == 'left' ? 1 : 0
            ];

            if($settings['iq_' . $type . '_chart_data_option'] === 'manual'){
                if(!empty($valueList) && count($valueList) > 0){
                    foreach ($valueList as $key => $value) {
                        if($key >= $category_count){
                            break;
                        }
                        $valueData = !empty($value['iq_' . $type . '_chart_value_3_' . $j]) ? $value['iq_' . $type . '_chart_value_3_' . $j] : randomValueGenerator(0, 200);
                        $lineData[$key][] = $valueData;
                        if($settings['iq_' . $type . '_chart_annotation_show'] === 'yes'){
                            $lineData[$key][] = $annotationPrefix .$valueData.$annotationPostfix;
                        }
                    }
                }
            }
        }


        $seriesStyleArray = json_encode($seriesStyleArray);
        $elementTitleArray =  implode('_,_',$elementTitleArray);
        $element_colors = implode('_,_',$element_colors);
        $lineData = json_encode($lineData);
        graphina_chart_widget_content($this, $mainId, $settings);
        if( isRestrictedAccess($type,$mainId,$settings,false) === false)
        {

        ?>

        <script type='text/javascript'>

            (function($) {
                'use strict';
                if(parent.document.querySelector('.elementor-editor-active') !== null){
                    if (typeof isInit === 'undefined') {
                        var isInit = {};
                    }
                    isInit['<?php esc_attr_e($mainId); ?>'] = false;
                    google.charts.load('current', {'packages':["corechart"]});
                    google.charts.setOnLoadCallback(drawChart);
                }
                document.addEventListener('readystatechange', event => {
                    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
                    if (event.target.readyState === "complete") {
                        if (typeof isInit === 'undefined') {
                            var isInit = {};
                        }
                        isInit['<?php esc_attr_e($mainId); ?>'] = false;
                        google.charts.load('current', {'packages':["corechart"]});
                        google.charts.setOnLoadCallback(drawChart);
                    }
                })

                function drawChart() {
                    var chartArea = { left: '10%', right: '5%' }
                    if( '<?php echo strval($legendPosition); ?>' === 'left' ){
                        chartArea = { left: '25%', right: '10%' }
                    }else if( '<?php echo strval($legendPosition); ?>' === 'right' ){
                        chartArea = { left: '10%', right: '25%' }
                    }

                    // chart data
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', '<?php echo strval($settings['iq_' . $type . '_chart_haxis_title']); ?>');
                    '<?php echo $elementTitleArray; ?>'.split('_,_').map((value,key)=>{
                        data.addColumn('number', value);
                        if('<?php echo $settings['iq_' . $type . '_chart_annotation_show'] === 'yes' ; ?>'){
                            data.addColumn( { role: 'annotation' });
                        }
                    })

                    data.addRows(<?php echo $lineData; ?>);

                    // chart options
                    var options = {
                        title: '<?php echo strval($settings['iq_' . $type . '_google_chart_title']); ?>',
                        titlePosition: '<?php echo $settings['iq_' . $type . '_google_chart_title_show'] === 'yes' ? $settings['iq_' . $type . '_google_chart_title_position'] : 'none' ?>', // in, out, none
                        titleTextStyle: {
                            color: '<?php echo strval($settings['iq_' . $type . '_google_chart_title_color']); ?>',
                            fontSize: '<?php echo strval($settings['iq_' . $type . '_google_chart_title_font_size']); ?>',
                        },
                        chartArea: chartArea,
                        height: parseInt('<?php echo $settings['iq_' . $type . '_chart_height']; ?>'),
                        curveType: '<?php echo $settings['iq_' . $type . '_chart_line_curve']; ?>', //function & none
                        series: <?php echo $seriesStyleArray; ?>,
                        isStacked: false,
                        annotations: {
                            stemColor: '<?php echo strval($settings['iq_' . $type . '_chart_annotation_stemcolor']); ?>',
                            textStyle: {
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_chart_annotation_fontsize']; ?>'),
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_annotation_color']); ?>',
                                auraColor: '<?php echo strval($settings['iq_' . $type . '_chart_annotation_color2']); ?>',
                                opacity: parseFloat('<?php echo $settings['iq_' . $type . '_chart_annotation_opacity']; ?>'),
                            }
                        },
                        tooltip: {
                            showColorCode: true,
                            textStyle: {color:'<?php echo $settings['iq_' . $type . '_chart_tooltip_color']; ?>',},
                            trigger: '<?php echo $settings['iq_' . $type . '_chart_tooltip_show'] === 'yes' ? $settings['iq_' . $type . '_chart_tooltip_trigger'] : 'none'; ?>',
                        },
                        animation:{
                            startup: '<?php echo $settings['iq_' . $type . '_chart_animation_show'] == 'yes'  ?>',
                            duration: parseInt('<?php echo $settings['iq_' . $type . '_chart_animation_speed']; ?>'),
                            easing:'<?php echo $settings['iq_' . $type . '_chart_animation_easing']; ?>',
                        },
                        backgroundColor:'<?php echo strval($settings['iq_' . $type . '_chart_background_color1']); ?>',
                        interpolateNulls:true,
                        hAxis: {
                            slantedText:'<?php echo $settings['iq_' . $type . '_chart_xaxis_rotate'] == 'yes' ?>',
                            slantedTextAngle:parseFloat('<?php echo $settings['iq_' . $type . '_chart_xaxis_rotate_value']; ?>'),
                            direction:parseInt('<?php echo $settings['iq_' . $type . '_chart_haxis_direction'] == 'yes' ? -1 : 1  ?>'),
                            title: '<?php echo strval($settings['iq_' . $type . '_chart_haxis_title']); ?>',
                            titleTextStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_haxis_title_font_color']); ?>',
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_chart_haxis_title_font_size']; ?>'),
                            },
                            textStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_xaxis_label_font_color']); ?>',
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_chart_xaxis_label_font_size']; ?>'),


                            },
                            textPosition: '<?php echo $settings['iq_' . $type . '_chart_haxis_label_position_show'] === 'yes' ? $settings['iq_' . $type . '_chart_haxis_label_position'] : 'none' ?>', // in, out, none
                        },
                        vAxis: {
                            title: '<?php echo strval($settings['iq_' . $type . '_chart_vaxis_title']); ?>',
                            viewWindowMode:'explicit',
                            viewWindow:{
                                max:parseInt('<?php echo $settings['iq_' . $type . '_chart_vaxis_maxvalue']; ?>'),
                                min: parseInt('<?php echo $settings['iq_' . $type . '_chart_vaxis_minvalue']; ?>'),
                            },
                            direction:parseInt('<?php echo $settings['iq_' . $type . '_chart_vaxis_direction'] == 'yes' ? -1 : 1  ?>'),
                            logScale:'<?php echo strval($settings['iq_' . $type . '_chart_logscale_show']); ?>',
                            scaleType:'<?php echo strval($settings['iq_' . $type . '_chart_vaxis_scaletype']); ?>',
                            titleTextStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_vaxis_title_font_color']); ?>',
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_chart_vaxis_title_font_size']; ?>'),
                            },
                            textStyle: {
                                color: '<?php echo strval($settings['iq_' . $type . '_chart_yaxis_label_font_color']); ?>',
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_chart_yaxis_label_font_size']; ?>'),


                            },
                            textPosition: '<?php echo $settings['iq_' . $type . '_chart_vaxis_label_position_show'] === 'yes' ? $settings['iq_' . $type . '_chart_vaxis_label_position'] : 'none' ?>', // in, out, none
                            format:'<?php echo $settings['iq_' . $type . '_chart_vaxis_format'] == '\#' ? ($settings['iq_' . $type . '_chart_vaxis_format_currency_prefix'].$settings['iq_' . $type . '_chart_vaxis_format']) : $settings['iq_' . $type . '_chart_vaxis_format'] ; ?>',
                            baseline:0,
                            baselineColor:'<?php echo $settings['iq_' . $type . '_chart_baseline_Color']; ?>',
                            gridlines:{

                                color:'<?php echo $settings['iq_' . $type . '_chart_gridline_color']; ?>',
                                count: parseInt('<?php echo $settings['iq_' . $type . '_chart_gridline_count']; ?>'),
                            },

                        },

                        colors:  '<?php echo $element_colors; ?>'.split('_,_'),
                        legend:{
                            position: '<?php echo strval($legendPosition); ?>', // Position others options:-  bottom,labeled,left,right,top,none
                            textStyle: {
                                fontSize: parseInt('<?php echo $settings['iq_' . $type . '_google_chart_legend_fontsize']; ?>'),
                                color: '<?php echo strval($settings['iq_' . $type . '_google_chart_legend_color']); ?>',
                            },
                            alignment: '<?php echo strval($settings['iq_' . $type . '_google_chart_legend_horizontal_align']); ?>', // start,center,end
                        }
                    };

                    if (typeof graphinaGoogleChartInit !== "undefined") {
                        graphinaGoogleChartInit(
                            document.getElementById('line_google_chart<?php esc_attr_e($mainId); ?>'),
                            {
                                ele:document.getElementById('line_google_chart<?php esc_attr_e($mainId); ?>'),
                                options: options,
                                series: data,
                                animation: true,
                                renderType:'LineChart',
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
                                '<?php echo !empty($settings['iq_' . $type . '_interval_data_refresh']) ?
                                    $settings['iq_' . $type . '_interval_data_refresh'] : 5 ?>')
                        }
                    }
                }

            }).apply(this, [jQuery]);


        </script>
    <?php
        }
    }
}

Plugin::instance()->widgets_manager->register(new Line_google_chart());