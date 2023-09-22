<?php

namespace Elementor;

use function Symfony\Component\Translation\t;

if (!defined('ABSPATH')) exit;

/**
 * @method add_control(string $string, array $array)
 */
class Data_Table extends Widget_Base
{

    private $version;

    public function __construct($data = [], $args = null)
    {
        wp_register_script('graphina_datatables', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatables.min.js', array('jquery'),false,true);
        wp_register_script('graphina_datatables_rowreorder', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatables_rowreorder.js', array('jquery'), false,true);
        wp_register_script('graphina_datatables_row_responsive', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatables_row_responsive.js', array('jquery'), false,true);
        wp_register_script('graphina_datatables_button_print', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatables_button_print.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_button',GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_button.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_button_flash', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_button_flash.js', array('jquery'),false,true);
        wp_register_script('graphina_datatable_html', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_html.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_zip', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_zip.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_pdf', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_pdf.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_font', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_font.js', array('jquery'), false,true);
        wp_register_script('graphina_datatable_colvis', GRAPHINA_URL.'/elementor/js/jquery-datatable/graphina_datatable_colvis.js', array('jquery'), false,true);
        wp_register_style('graphina_datatables_style', GRAPHINA_URL.'/elementor/css/jquery-datatable/graphina_datatables_style.css', array(), true);
        wp_register_style('graphina_datatable_button_style', GRAPHINA_URL.'/elementor/css/jquery-datatable/graphina_datatable_button_style.css', array(), true);
        wp_register_style('graphina_datatable_reponsive_css', GRAPHINA_URL.'/elementor/css/jquery-datatable/graphina_datatable_reponsive_css.css', array(), true);


        parent::__construct($data, $args);
    }

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

    public function get_name()
    {
        return 'data_table_lite';
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
        return 'Jquery Data Table';
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
        return ['iq-graphina-charts'];
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
        return 'eicon-table';
    }
    public function get_chart_type()
    {
        return 'data_table_lite';
    }

    public function get_script_depends() {
        return [
            'graphina_datatables',
            'graphina_datatable_button',
            'graphina_datatables_button_print',
            'graphina_datatables_row_responsive',
            'graphina_datatables_rowreorder',
            'graphina_datatable_button_flash',
            'graphina_datatable_html',
            'graphina_datatable_zip',
            'graphina_datatable_pdf',
            'graphina_datatable_font',
            'graphina_datatable_colvis'
        ];
    }

    public function get_style_depends() {
        return [
            'graphina_datatables_style',
            'graphina_datatable_button_style',
            'graphina_datatable_reponsive-css'
        ];
    }

    protected function register_controls()
    {

        $type = $this->get_chart_type();

        graphina_basic_setting($this, $type);

        $type = $this->get_name();
        graphina_datatable_lite_element_data_option_setting($this, $type);

        do_action('graphina_forminator_addon_control_section', $this, $type);

        $this->start_controls_section(
            'iq_'.$type.'table_setting',
            [
                'label' => esc_html__('Table Settings', 'graphina-charts-for-elementor'),
            ]
        );

        $this->add_control(
            'iq_'.$type.'table_footer',
            [
                'label' => esc_html__('Footer Enable', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'iq_'.$type.'table_search',
            [
                'label' => esc_html__('Search Enabled', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'yes',
            ]
        );

        
        $this->add_control(
            'iq_'.$type.'table_pagination',
            [
                'label' => esc_html__('Pagination Enabled', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'yes',
                ]
            );

            $this->add_control(
                'iq_'.$type.'table_pagination_info',
                [
                    'label' => esc_html__('Pagination Info', 'graphina-charts-for-elementor'),
                    'type' => Controls_Manager::SWITCHER,
                    'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                    'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                    'default' => 'yes',
                    'condition'=>[
                        'iq_'.$type.'table_pagination'=> 'yes'
                ],
                ]
            );
            
            $this->add_control(
                'iq_'.$type.'pagination_type',
                [
                    'label' => __('Pagination Type'),
                    'type' => Controls_Manager::SELECT,
                    'default' => 'numbers',
                    'options'=>[
                        'numbers'=>__('Numbers'),
                        'simple'=>__('Simple'),
                        'simple_numbers'=>__('Simple Numbers'),
                        'full'=>__('Full'),
                        'full_numbers'=>__('Full Numbers'),
                        'first_last_numbers'=>__('First Last Numbers'),
                    ],
                    'condition'=>[
                        'iq_'.$type.'table_pagination'=> 'yes'
                    ],
                ]
            );

        $this->add_control(
            'iq_'.$type.'table_sort',
            [
                'label' => esc_html__('Sorting Enabled', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'iq_'.$type.'table_scroll',
            [
                'label' => esc_html__('Scrolling Enabled', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Hide', 'graphina-charts-for-elementor'),
                'label_off' => esc_html__('Show', 'graphina-charts-for-elementor'),
            ]
        );

        $this->add_control(
            'iq_'.$type.'_pagelength',
            [
                'label' => __('Page Length'),
                'type' => Controls_Manager::SELECT,
                'default' => 10,
                'options'=>[
                    10=>__(10),
                    50=>__(50),
                    100=>__(100),
                    'all'=>__('All'),
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_button_menu',
            [
                'label' => __('Button Menu','graphina-charts-for-elementor'),
                'type' => Controls_Manager::SELECT2,
                'default' =>'pageLength',
                'multiple'=> true,
                'options'=>[
                    'pageLength'=>__('pageLength','graphina-charts-for-elementor'),
                    'colvis'=>__('Column Visibilty','graphina-charts-for-elementor'),
                    'copy'=>__('Copy','graphina-charts-for-elementor'),
                    'excel'=>__('Excel','graphina-charts-for-elementor'),
                    'pdf'=>__('PDF','graphina-charts-for-elementor'),
                    'print'=>__('Print','graphina-charts-for-elementor'),
                    'excelFlash'=>__('excelFlash','graphina-charts-for-elementor')
                ],
            ]
        );

        $this->end_controls_section();

/*Table Column section */        
        $this->start_controls_section(
            'iq_'.$type.'_section_column' ,
            [
                'label' => esc_html__('Table Columns', 'graphina-charts-for-elementor'),
                'condition' => [
                    'iq_'.$type.'_chart_data_option' => 'manual'
                ]
            ]
        );

        for ($i = 0; $i < 25; $i++){
            $this->add_control(
                'iq_'.$type.'_chart_header_title_' . $i,
                [
                    'label' => 'Column Header',
                    'type' => Controls_Manager::TEXT,
                    'placeholder' => esc_html__('Add Title', 'graphina-charts-for-elementor'),
                    'default' => 'Column ' . ($i + 1),
                    'condition'=>[
                        'iq_'.$type.'_element_columns' => range(1 + $i, 25),
                        'iq_'.$type.'_chart_data_option' => 'manual'
                    ],
                    'dynamic' => [
                        'active' => true,
                    ],
                ]
            );
        }

        $this->end_controls_section();

        for ($i = 0; $i < 100; $i++) {
            $this->start_controls_section(
                'iq_'.$type.'_section_4_' . $i,
                [
                    'label' => esc_html__('Row  ' . ($i + 1), 'graphina-charts-for-elementor'),
                    'condition' => [
                        'iq_'.$type.'_element_rows' => range(1 + $i, 100),
                        'iq_'.$type.'_chart_data_option' => 'manual'
                    ]
                ]
            );

            $repeater = new Repeater();

            $repeater->add_control(
                'iq_'.$type.'_row_value',
                [
                    'label' => esc_html__('Row Value', 'graphina-charts-for-elementor'),
                    'type' => Controls_Manager::TEXT,
                    'placeholder' => esc_html__('Add Value', 'graphina-charts-for-elementor'),
                    'dynamic' => [
                        'active' => true,
                    ],
                ]
            );
            /** Chart value list. */
            $this->add_control(
                'iq_'.$type.'_row_list'.$i,
                [
                    'label' => esc_html__('Row Data', 'graphina-charts-for-elementor'),
                    'type' => Controls_Manager::REPEATER,
                    'fields' => $repeater->get_controls(),
                    'default' => [
                        ['iq_'.$type.'_row_value' => 'Data 1'],
                        ['iq_'.$type.'_row_value' => 'Data 2'],
                        ['iq_'.$type.'_row_value' => 'Data 3'],
                    ],
                    'condition' => [
                        'iq_'.$type.'_chart_data_option' => 'manual'
                    ],
                ]
            );

            $this->end_controls_section();

        }

        graphina_style_section($this, $type);

        graphina_card_style($this, $type);

        $this->start_controls_section(
            'iq_'.$type.'_table_style',
            [
                'label' => esc_html__('Table Style', 'graphina-charts-for-elementor'),
                'tab' => Controls_Manager::TAB_STYLE
            ]
        );

        $this->add_control(
            'iq_'.$type.'_header_row_color',
            [
                'label' => esc_html__('Header Row Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} table thead' => 'background-color: {{VALUE}};',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_header_text_row_color',
            [
                'label' => esc_html__('Header Row Text Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'selectors' => [
                    '{{WRAPPER}} table thead' => 'color: {{VALUE}};',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_table_even_row_color',
            [
                'label' => esc_html__('Even Row Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} table .even,{{WRAPPER}} table .even .sorting_1' => 'background-color: {{VALUE}}!important;',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_table_even_row_text_color',
            [
                'label' => esc_html__('Even Row Text Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'selectors' => [
                    '{{WRAPPER}} table .even' => 'color: {{VALUE}};',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_table_old_row_color',
            [
                'label' => esc_html__('Odd Row Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} table .odd,{{WRAPPER}} table .odd .sorting_1' => 'background-color: {{VALUE}}!important;',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_table_old_row_text_color',
            [
                'label' => esc_html__('Odd Row Text Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'selectors' => [
                    '{{WRAPPER}} table .odd' => 'color: {{VALUE}};',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_footer_row_color',
            [
                'label' => esc_html__('Footer Row Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} table tfoot' => 'background-color: {{VALUE}};',
                ]
            ]
        );

        $this->add_control(
            'iq_'.$type.'_footer_row_text_color',
            [
                'label' => esc_html__('Footer Row Text Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'default' => '#000000',
                'selectors' => [
                    '{{WRAPPER}} table tfoot' => 'color: {{VALUE}};',
                ]
            ]
        );


        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'iq_'.$type.'_cell_typography',
                'label' => esc_html__('Typography', 'graphina-charts-for-elementor'),
                'scheme' => Core\Schemes\Typography::TYPOGRAPHY_1,
                'selector' =>'{{WRAPPER}} .dataTables_wrapper',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'iq_' . $type . '_table_search_border',
                'label' => esc_html__('Border', 'graphina-charts-for-elementor'),
                'selector' => '{{WRAPPER}} table'
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_border_radius',
            [
                'label' => esc_html__('Border Radius', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} table' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_margin',
            [
                'label' => esc_html__('Margin', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} table' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_padding',
            [
                'label' => esc_html__('Padding', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} table' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'iq_'.$type.'_search_style',
            [
                'label' => esc_html__('Search Style', 'graphina-charts-for-elementor'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition'=>[
                    'iq_'.$type.'table_search'=> 'yes'
                ]
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'iq_' . $type . '_search_border',
                'label' => esc_html__('Border', 'graphina-charts-for-elementor'),
                'selector' => '{{WRAPPER}} input[type=search]'
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_width',
            [
                'label' => esc_html__('Width', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'min' => 0,
                'default' => 200,
                'selectors' => [
					'{{WRAPPER}} input[type=search]' => 'width: {{VALUE}}px;',
				]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_height',
            [
                'label' => esc_html__('height', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'min' => 0,
                'default' => 40,
                'selectors' => [
                    '{{WRAPPER}} input[type=search]' => 'height: {{VALUE}}px;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_background_color',
            [
                'label' => esc_html__('Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} input[type=search]' => 'background: {{VALUE}}',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_text_font_size',
            [
                'label' => esc_html__('Font Size', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'min' => 0,
                'default' => 16,
                'selectors' => [
                    '{{WRAPPER}} input[type=search]' => 'font-size: {{VALUE}}px;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_text_font_color',
            [
                'label' => esc_html__('Font Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} input[type=search]' => 'color: {{VALUE}}',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_border_radius',
            [
                'label' => esc_html__('Border Radius', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
					'{{WRAPPER}} input[type=search]' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_margin',
            [
                'label' => esc_html__('Margin', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
					'{{WRAPPER}} input[type=search]' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_search_padding',
            [
                'label' => esc_html__('Padding', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
					'{{WRAPPER}} input[type=search]' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				]
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'iq_'.$type.'_table_button_style',
            [
                'label' => esc_html__('Button Style', 'graphina-charts-for-elementor'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'iq_' . $type . '_table_button_search_border',
                'label' => esc_html__('Border', 'graphina-charts-for-elementor'),
                'selector' => '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled'
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_background_color',
            [
                'label' => esc_html__('Background Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'background: {{VALUE}} !important;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_text_font_size',
            [
                'label' => esc_html__('Font Size', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::NUMBER,
                'min' => 0,
                'default' => 16,
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'font-size: {{VALUE}}px !important;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_text_font_color',
            [
                'label' => esc_html__('Font Color', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'color: {{VALUE}}!important;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_border_radius',
            [
                'label' => esc_html__('Border Radius', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_margin',
            [
                'label' => esc_html__('Margin', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
                ]
            ]
        );

        $this->add_control(
            'iq_' . $type . '_table_button_search_padding',
            [
                'label' => esc_html__('Padding', 'graphina-charts-for-elementor'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .buttons-page-length,
                             {{WRAPPER}} .buttons-colvis,
                             {{WRAPPER}} .buttons-copy,
                             {{WRAPPER}} .buttons-excel,
                             {{WRAPPER}} .buttons-pdf,
                             {{WRAPPER}} .buttons-print,
                             {{WRAPPER}} .paginate_button,
                             {{WRAPPER}} .paginate_button.disabled' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
                ]
            ]
        );

        $this->end_controls_section();

        if (function_exists('graphina_pro_password_style_section')) {
            graphina_pro_password_style_section($this, $type);
        }

    }


    protected function render(){

        $type = $this->get_name();
        $mainId = graphina_widget_id($this);
        $settings = $this->get_settings_for_display();

        if (!empty($settings['iq_' . $type . '_button_menu']) && !is_array($settings['iq_' . $type . '_button_menu'])) {
            $button = [$settings['iq_' . $type . '_button_menu']];
        } else {
            $button = $settings['iq_' . $type . '_button_menu'];
        }

        if (isRestrictedAccess('data_table_lite', $mainId, $settings, true)) {
            if ($settings['iq_data_table_lite_restriction_content_type'] === 'password') {
                return true;
            }
            echo html_entity_decode($settings['iq_data_table_lite_restriction_content_template']);
            return true;
        }
        ?>
        <div class="<?php echo $settings['iq_data_table_lite_chart_card_show'] === 'yes' ? 'chart-card' : ''; ?>">
            <div class="">
                <?php if ($settings['iq_data_table_lite_is_card_heading_show'] && $settings['iq_data_table_lite_chart_card_show']) { ?>
                    <h4 class="heading graphina-chart-heading">
                        <?php echo html_entity_decode((string)$settings['iq_data_table_lite_chart_heading']); ?>
                    </h4>
                <?php }
                if ($settings['iq_data_table_lite_is_card_desc_show'] && $settings['iq_data_table_lite_chart_card_show']) { ?>
                    <p class="sub-heading graphina-chart-sub-heading">
                        <?php echo html_entity_decode((string)$settings['iq_data_table_lite_chart_content']); ?>
                    </p>
                <?php } ?>
            </div>
            <table id="data_table_lite_<?php esc_attr_e($mainId); ?>"
                   class="chart-texture display wrap data_table_lite_<?php esc_attr_e($mainId); ?>" style="width:100%">
            </table>
            <p id="data_table_lite_loading_<?php esc_attr_e($mainId); ?>" class="graphina-chart-heading"
               style="text-align: center;">
                <?php echo apply_filters('graphina_datatable_loader', esc_html__('Loading..........', 'graphina-charts-for-elementor')); ?>
            </p>
            <p id="data_table_lite_no_data_<?php esc_attr_e($mainId); ?>" class="graphina-chart-heading d-none">
                <?php echo esc_html__('The Data is Not Available', 'graphina-charts-for-elementor'); ?>
            </p>
        </div>

        <script>
            (function ($) {
                'use strict';

                if (parent.document.querySelector('.elementor-editor-active') !== null) {
                    graphinaDataTableAjax();
                }
                document.addEventListener('readystatechange', event => {
                    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
                    if (event.target.readyState === "complete") {
                        graphinaDataTableAjax();
                    }
                })


                function graphinaDataTableAjax() {
                    jQuery.ajax({
                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                        type: 'POST',
                        data: {
                            action: "get_jquery_datatable_data",
                            chart_type: '<?php echo $this->get_chart_type() ?>',
                            chart_id: '<?php echo $mainId ?>',
                            fields: <?php echo json_encode($settings); ?>
                        },
                        success: function (response) {
                            jQuery("#data_table_lite_loading_<?php esc_attr_e($mainId); ?>").addClass('d-none')
                            if (response.status && response.status === true) {
                                jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?>").removeClass('d-none')
                                jQuery("#data_table_lite_no_data_<?php esc_attr_e($mainId); ?>").addClass('d-none')
                                var columnHeaders = response.data.header;
                                var tableData = response.data.body;
                                var columns = [];
                                let foot = '';
                                for (var i = 0; i < columnHeaders.length; i++) {
                                    foot += '<th class="all graphina-datatable-columns">'+ columnHeaders[i] +' </th>';
                                    columns.push({title: columnHeaders[i]});
                                }
                                if('<?php echo $settings['iq_' . $type . 'table_footer'] ?>'){
                                    jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?>").append(`<tfoot>`+ foot +`</tfoot>`)
                                }

                                graphinaDatatableRender(columns, tableData)

                            } else {
                                jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?>").addClass('d-none')
                                jQuery("#data_table_lite_no_data_<?php esc_attr_e($mainId); ?>").removeClass('d-none')
                            }
                        },
                        error: function (error) {
                            jQuery("#data_table_lite_loading_<?php esc_attr_e($mainId); ?>").addClass('d-none')
                            jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?>").addClass('d-none')
                            jQuery("#data_table_lite_no_data_<?php esc_attr_e($mainId); ?>").removeClass('d-none')
                            console.log(error)
                        }
                    })
                }

                function graphinaDatatableRender(columns, tableData) {
                    var table = jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?>").DataTable({
                        columns: columns,
                        data: tableData,
                        searching: '<?php echo $settings['iq_' . $type . 'table_search'] == 'yes' ?>',
                        paging: '<?php echo $settings['iq_' . $type . 'table_pagination'] == 'yes' ?>',
                        info: '<?php echo $settings['iq_' . $type . 'table_pagination_info'] == 'yes' ?>',
                        lengthChange: false,
                        sort: '<?php echo $settings['iq_' . $type . 'table_sort'] == 'yes' ?>',
                        pagingType: '<?php echo $settings['iq_' . $type . 'pagination_type']; ?>',
                        scrollX: '<?php echo $settings['iq_' . $type . 'table_scroll']; ?>',
                        responsive: true,
                        rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        dom: 'Bfrtip',
                        lengthMenu: [[10, 50, 100, -1], [10, 50, 100, 'All']],
                        buttons: JSON.parse('<?php echo json_encode($button); ?>'),
                        deferRender: true,
                        language: {
                            search: '',
                            info: "<?php echo esc_html__("Showing ", "graphina-charts-for-elementor") ?>" + '_START_'
                                + "<?php echo esc_html__(" to ", "graphina-charts-for-elementor") ?>"
                                + '_END_' + "<?php echo esc_html__(" of ", "graphina-charts-for-elementor") ?>" + '_TOTAL_' +
                                "<?php echo esc_html__(" entries", "graphina-charts-for-elementor") ?>",
                            searchPlaceholder: "<?php echo esc_html__("Search....", "graphina-charts-for-elementor") ?>",
                            emptyTable: "<?php echo esc_html__("No data available in table", "graphina-charts-for-elementor") ?>",
                            zeroRecords: "<?php echo esc_html__("No matching records found", "graphina-charts-for-elementor") ?>",
                            paginate: {
                                first: "<?php echo esc_html__("First", "graphina-charts-for-elementor") ?>",
                                last: "<?php echo esc_html__("Last", "graphina-charts-for-elementor") ?>",
                                next: "<?php echo esc_html__("Next", "graphina-charts-for-elementor") ?>",
                                previous: "<?php echo esc_html__("Previous", "graphina-charts-for-elementor") ?>",
                            },
                            buttons: {
                                copy: "<?php echo esc_html__("Copy", "graphina-charts-for-elementor") ?>",
                                colvis: "<?php echo esc_html__("Column Visibility", "graphina-charts-for-elementor") ?>",
                                pdf: "<?php echo esc_html__("PDF", "graphina-charts-for-elementor") ?>",
                                print: "<?php echo esc_html__("Print", "graphina-charts-for-elementor") ?>",
                                excel: "<?php echo esc_html__("Excel", "graphina-charts-for-elementor") ?>",
                                pageLength: {
                                    "-1": "<?php echo esc_html__("Show all rows", "graphina-charts-for-elementor") ?>",
                                    "_": "<?php echo esc_html__("Show ", "graphina-charts-for-elementor") ?>" +
                                        "%d" + "<?php echo esc_html__(" rows", "graphina-charts-for-elementor") ?>"
                                },
                            }
                        },
                        fnInitComplete: function () {
                            <?php
                            if ($settings['iq_' . $type . 'table_footer'] == true) {
                            ?>
                            // Disable TBODY scoll bars
                            jQuery('.dataTables_scrollBody').css({
                                'overflow': 'hidden',
                                'border': '0'
                            });
                            jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?> thead th").addClass('all graphina-datatable-columns')

                            jQuery("#data_table_lite_<?php esc_attr_e($mainId); ?> tbody td").addClass('graphina-datatable-tbody-td')

                            // Enable TFOOT scoll bars
                            jQuery('.dataTables_scrollFoot').css('overflow', 'auto');

                            // Sync TFOOT scrolling with TBODY
                            jQuery('.dataTables_scrollFoot').on('scroll', function () {
                                jQuery('.dataTables_scrollBody').scrollLeft(jQuery(this).scrollLeft());
                            });
                            <?php
                            }
                            ?>
                        }
                    });
                }
            }).apply(this, [jQuery]);
        </script>

        <?php
    }
}

Plugin::instance()->widgets_manager->register(new \Elementor\Data_Table());
