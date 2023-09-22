<?php
function getGraphinaProFileUrl($file)
{
    return GRAPHINA_PRO_ROOT . '/elementor/' . $file;
}

function isGraphinaPro()
{
    if (!function_exists('is_plugin_active')) {
        include_once(ABSPATH . 'wp-admin/includes/plugin.php');
    }
    return is_plugin_active(getGraphinaProBasename());    
}

function getGraphinaProBasename(){
    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $plugins = get_plugins();
    $basename = '';

    foreach ($plugins as $key => $value) {

        if($value['TextDomain'] === 'graphina-pro-charts-for-elementor') {
            $basename = $key;
        }

    }
    return $basename ;
}

function isGraphinaProInstall()
{
    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $plugins = get_plugins();
    return isset($plugins[getGraphinaProBasename()]);
}

function graphinaGetPluginVersion($pluginDomain){
    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $plugins = get_plugins();
    foreach ($plugins as $key => $value) {
        if($value['TextDomain'] === $pluginDomain) {
            return $value['Version'];
        }
    }
    return '0' ;
}

function graphinaForminatorAddonActive(){

    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $basename = '';
    $plugins = get_plugins();

    foreach ($plugins as $key => $data) {
        if ($data['TextDomain'] === "graphina-forminator-addon") {
            $basename = $key;
        }
    }

    return is_plugin_active($basename);
}

function graphinaForminatorInstall(){

    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    $basename = '';
    $plugins = get_plugins();

    foreach ($plugins as $key => $data) {
        if ($data['TextDomain'] === "forminator") {
            $basename = $key;
        }
    }

    return is_plugin_active($basename);
}

function graphina_plugin_activation($is_deactivate = false)
{
    $pluginName = "Graphina";
    $arg = 'plugin=' . $pluginName . '&domain=' . get_bloginfo('wpurl') . '&site_name=' . get_bloginfo('name');
    if ($is_deactivate) {
        $arg .= '&is_deactivated=true';
    }
    wp_remote_get('https://innoquad.in/plugin-server/active-server.php?' . $arg);
}

function graphina_if_failed_load(){
    $latest_pro_version = '1.1.3';

    if (!current_user_can('activate_plugins')) {
        return;
    }

    // Get Graphina animation lite version basename
    $basename = '';
    $plugins = get_plugins();

    foreach ($plugins as $key => $data) {
        if ($data['TextDomain'] === "graphina-pro-charts-for-elementor") {
            $basename = $key;
        }
    }

    if (is_graphina_plugin_installed($basename) && is_plugin_active($basename) && version_compare(graphina_get_pro_plugin_version($basename), $latest_pro_version, '<')) {
        $message = sprintf(__('Required <strong>Version '.$latest_pro_version.' </strong>of<strong> Graphina – Elementor Dynamic Charts & Datatable</strong> plugin. Please update to continue.', 'graphina-charts-for-elementor'), '<strong>', '</strong>');
        $url = "https://themeforest.net/downloads";
        $button_text = __('Download Version '.$latest_pro_version, 'graphina-charts-for-elementor');
        $button = '<p><a target="_blank" href="' . $url . '" class="button-primary">' . $button_text . '</a></p>';
        printf('<div class="error"><p>%1$s</p>%2$s</div>', __($message), $button);
    }

}

function is_graphina_plugin_installed($basename)
{
    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $plugins = get_plugins();
    return isset($plugins[$basename]);
}

function graphina_get_pro_plugin_version($basename)
{
    if (!function_exists('get_plugins')) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    $plugins = get_plugins();
    return $plugins[$basename]['Version'];
}

function graphina_is_preview_mode()
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

    $url_params = !empty($_SERVER['HTTP_REFERER']) ?  parse_url(sanitize_url($_SERVER['HTTP_REFERER']),PHP_URL_QUERY) : parse_url(sanitize_url($_SERVER['REQUEST_URI']),PHP_URL_QUERY);
    parse_str($url_params ? $url_params : '',$params);
    if(!empty($params['action']) && $params['action'] == 'elementor'){
        return false;
    }

    if(!empty($params['preview']) && $params['preview'] == 'true'){
        return false;
    }

    if(!empty($params['elementor-preview'])){
        return false;
    }

    return true;
}

function graphina_ajax_reload($callAjax,$new_settings,$type,$mainId){
    ?><script>
        if(typeof getDataForChartsAjax !== "undefined" && '<?php echo $callAjax; ?>' === "1") {
            if( !['mixed'].includes('<?php echo $type; ?>' )){
                getDataForChartsAjax('<?php echo empty($new_settings) ?>' ? graphina_localize.graphinaAllGraphsOptions['<?php echo $mainId ?>'].setting_date : <?php echo json_encode($new_settings); ?> , '<?php echo $type; ?>', '<?php echo $mainId; ?>');
            }
            if(('<?php echo empty($new_settings) ?>' ? graphina_localize.graphinaAllGraphsOptions['<?php echo $mainId ?>'].setting_date : <?php echo json_encode($new_settings); ?>)['iq_'+'<?php echo $type ?>'+ '_can_chart_reload_ajax'] && ('<?php echo empty($new_settings) ?>' ? graphina_localize.graphinaAllGraphsOptions['<?php echo $mainId ?>'].setting_date : <?php echo json_encode($new_settings); ?>)['iq_'+'<?php echo $type ?>'+ '_can_chart_reload_ajax'] === 'yes' ){
                let ajaxIntervalTime = parseInt(('<?php echo empty($new_settings) ?>' ? graphina_localize.graphinaAllGraphsOptions['<?php echo $mainId ?>'].setting_date : <?php echo json_encode($new_settings); ?>)['iq_'+'<?php echo $type ?>'+ '_interval_data_refresh']) * 1000;
                window.ajaxIntervalGraphina_<?php echo $mainId; ?> = setInterval(function () {
                    getDataForChartsAjax('<?php echo empty($new_settings) ?>' ? graphina_localize.graphinaAllGraphsOptions['<?php echo $mainId ?>'].setting_date : <?php echo json_encode($new_settings); ?>, '<?php echo $type; ?>', '<?php echo $mainId; ?>');
                }, ajaxIntervalTime);
            }
        }
    </script>
    <?php
}

function apexChartLocales(){
    $data = [
        'name' => 'en',
        'options' => [
            'toolbar'=> [
                'download'=> esc_html__('Download SVG', 'graphina-charts-for-elementor'),
                'selection'=> esc_html__('Selection', 'graphina-charts-for-elementor'),
                'selectionZoom'=> esc_html__('Selection Zoom', 'graphina-charts-for-elementor' ),
                'zoomIn'=> esc_html__('Zoom In', 'graphina-charts-for-elementor'),
                'zoomOut'=> esc_html__('Zoom Out', 'graphina-charts-for-elementor'),
                'pan'=> esc_html__('Panning', 'graphina-charts-for-elementor'),
                'reset'=> esc_html__('Reset Zoom', 'graphina-charts-for-elementor'),
                'menu' => esc_html__('Menu', 'graphina-charts-for-elementor'),
                "exportToSVG"=>esc_html__('Download SVG', 'graphina-charts-for-elementor'),
                "exportToPNG"=>esc_html__('Download PNG', 'graphina-charts-for-elementor'),
                "exportToCSV"=>esc_html__('Download CSV', 'graphina-charts-for-elementor'),
            ]
        ]
    
    ];

    return json_encode($data);
}

function graphina_filter_common($this_ele,$settings,$type,$mainId=''){
    if (!empty($settings['iq_'.$type.'_chart_filter_enable']) && $settings['iq_'.$type.'_chart_filter_enable'] == 'yes') {
        ?>
        <div class="graphina_chart_filter" style="display: flex; flex-wrap: wrap; align-items: end;">
            <?php
            if(!empty($settings['iq_'.$type.'_chart_filter_list'])){
                foreach ($settings['iq_'.$type.'_chart_filter_list'] as $key => $value) {
                    if(!empty($value['iq_' . $type . '_chart_filter_type']) && $value['iq_' . $type . '_chart_filter_type'] === 'date'){
                        ?>
                        <div class="graphina-filter-div">
                            <div>
                                <label for="start-date_<?php echo $key.$mainId?>"> <?php echo !empty($value['iq_' . $type . '_chart_filter_value_label']) ? $value['iq_' . $type . '_chart_filter_value_label'] : '';?> </label>
                            </div>
                            <?php if(!empty($value['iq_' . $type . '_chart_filter_date_type']) && $value['iq_' . $type . '_chart_filter_date_type'] === 'date'){
                                $defaultdate = !empty($value['iq_' . $type . '_chart_filter_date_default']) ? $value['iq_' . $type . '_chart_filter_date_default'] : current_time('Y-m-d h:i:s');
                                ?>
                                <div>
                                    <input  type="date"  id="start-date_<?php echo $key.$mainId?>" class="graphina-chart-filter-date-time graphina_datepicker_<?php echo $mainId ?> graphina_filter_select<?php echo $mainId ?>" value="<?php echo date('Y-m-d', strtotime($defaultdate)); ?>" >
                                </div>
                                <?php
                            }else{
                                $defaultdate = !empty($value['iq_' . $type . '_chart_filter_datetime_default']) ? $value['iq_' . $type . '_chart_filter_datetime_default'] : current_time('Y-m-d h:i:s');
                                ?>
                                <div>
                                    <input  type="datetime-local"  id="start-date_<?php echo $key.$mainId ?>" class="graphina-chart-filter-date-time graphina_datepicker_<?php echo $mainId ?> graphina_filter_select<?php echo $mainId ?>" step="1" value="<?php echo date('Y-m-d\TH:i', strtotime($defaultdate)); ?>" >
                                </div>
                                <?php
                            }?>
                        </div>
                        <?php
                    }else{
                        if (!empty($value['iq_'.$type.'_chart_filter_value']) && !empty($value['iq_'.$type.'_chart_filter_option'])) {
                            $data = explode(',', $value['iq_'.$type.'_chart_filter_value']);
                            $dataOption =  explode(',', $value['iq_'.$type.'_chart_filter_option']);
                            if (!empty($data) && is_array($data) && !empty($dataOption) && is_array($dataOption)) {
                                ?>
                                <div  class="graphina-filter-div">
                                    <div>
                                        <label for="graphina-drop_down_filter_<?php echo $key.$mainId ?>" >
                                            <?php echo !empty($value['iq_' . $type . '_chart_filter_value_label']) ? $value['iq_' . $type . '_chart_filter_value_label'] : '';?>
                                        </label>
                                    </div>
                                    <div>
                                        <select  class="graphina_filter_select<?php echo $mainId ?>"
                                                id="graphina-drop_down_filter_<?php echo $key.$mainId ?>">
                                            <?php foreach ($data as $key1 => $value1) {
                                                ?>
                                                <option value="<?php echo $value1 ; ?>" <?php echo $key1 == 0 ? 'selected' : '' ?>>
                                                    <?php echo isset($dataOption[$key1]) ? $dataOption[$key1] : '' ?>
                                                </option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                    }
                }
                ?>
                <div  class="graphina-filter-div" >
                    <input class="graphina-filter-div-button" type="button"
                           value="<?php echo esc_html__('Apply Filter', 'graphina-charts-for-elementor') ?>"
                           id="grapina_apply_filter_<?php echo $mainId; ?>"
                           onclick='graphinaChartFilter("<?php echo $type; ?>",this,"<?php esc_attr_e($mainId); ?>");' />
                </div>
                <?php
            }
            ?>
        </div>
        <?php
    }
    do_action('graphina_custom_filter',$settings,$type,$mainId);
}

function graphina_check_external_database($type){
    $data = get_option('graphina_mysql_database_setting',true);
    return $type === 'status' ? gettype($data) != 'boolean' && is_array($data) && count($data) > 0 : $data;
}

function graphina_common_setting_get($type){
    $data = get_option('graphina_common_setting',true);
    $value = '';
    switch ($type){
        case 'thousand_seperator':
            $value = !empty($data['thousand_seperator_new']) ? $data['thousand_seperator_new'] : ",";
            break;
        case 'view_port':
            $value = !empty($data['view_port']) ? $data['view_port'] : 'off';
            break;
        case 'csv_seperator':
            $value = !empty($data['csv_seperator']) ? $data['csv_seperator'] == 'semicolon' ? ';' : ',' : ',';
            break;
        case 'graphina_loader':
            $value = !empty($data['graphina_loader']) ? $data['graphina_loader']  : GRAPHINA_URL . '/admin/assets/images/graphina.gif';
            break;
    }

    return $value;
}


function randomValueGenerator($min, $max){
    return rand( (int)$min, (int)$max );
}

function graphinaRecursiveSanitizeTextField($array)
{
    $filterParameters = [];
    foreach ($array as $key => $value) {

        if ($value === '') {
            $filterParameters[$key] = null;
        } else {
            if (is_array($value)) {
                $filterParameters[$key] = graphinaRecursiveSanitizeTextField($value);
            } else {
                if(is_object($value)){
                    $filterParameters[$key] = $value;
                }
                else if (preg_match("/<[^<]+>/", $value, $m) !== 0) {
                    $filterParameters[$key] = $value;
                }
                elseif($key === 'graphina_loader' ){
                    $filterParameters[$key] = sanitize_url($value);
                }
                elseif($key  === 'nonce'){
                    $filterParameters[$key] = sanitize_key($value);
                }
                else {
                    $filterParameters[$key] = sanitize_text_field($value);
                }
            }
        }

    }

    return $filterParameters;
}

function graphina_change_apex_chart_type($settings, $type, $mainId){
    $chartType = $type;
    if ($type === 'column') {
        $chartType = 'bar';
    } elseif ($type === 'polar') {
        $chartType = 'polarArea';
    }
    if (!empty($settings['iq_' . $type . '_dynamic_change_chart_type']) && $settings['iq_' . $type . '_dynamic_change_chart_type'] == 'yes') { ?>
        <div class="graphina_dynamic_change_type">
            <select id="graphina-select-chart-type"
                    onchange="updateChartType('<?php echo esc_js($chartType); ?>',this,'<?php esc_attr_e($mainId); ?>');">
                <option selected
                        disabled><?php echo esc_html__('Choose Chart Type', 'graphina-charts-for-elementor') ?></option>
                <?php if (in_array($type, ['pie', 'donut', 'polar'])) {
                    ?>
                    <option value="donut">Donut</option>
                    <option value="pie">Pie</option>
                    <option value="polarArea">PolarArea</option>
                    <?php
                } else {
                    ?>
                    <option value="area">Area</option>
                    <option value="bar">Column</option>
                    <option value="line">Line</option>
                    <?php
                } ?>

            </select>
        </div>
    <?php }
}

function graphina_change_google_chart_type($settings,$type,$mainId){
    if (!empty($settings['iq_'.$type.'_dynamic_change_chart_type']) && $settings['iq_'.$type.'_dynamic_change_chart_type'] == 'yes') { ?>
        <div class="graphina_dynamic_change_type">
            <select id="graphina-select-chart-type"
                    onchange="updateGoogleChartType('<?php echo esc_js($type); ?>',this,'<?php echo esc_js($mainId); ?>');">
                <option selected
                        disabled><?php echo esc_html__('Choose Chart Type', 'graphina-charts-for-elementor') ?></option>
                <?php if (in_array($type, ['pie_google', 'donut_google'])) {
                    ?>
                    <option value="PieChart">Pie</option>
                    <option value="DonutChart">Donut</option>
                    <?php
                } else { ?>
                    <option value="AreaChart">Area</option>
                    <option value="LineChart">Line</option>
                    <option value="BarChart">Bar</option>
                    <option value="ColumnChart">Column</option>
                <?php } ?>
            </select>
        </div>
    <?php }
}
function graphina_chart_widget_content($this_,$mainId,$settings){
    $type = $this_->get_chart_type();
    $heading_text_align = !empty($settings['iq_'.$type.'_card_title_align']) ? ('text-align:'.$settings['iq_'.$type.'_card_title_align'].';') : '' ;
    $heading_color = !empty($settings['iq_'.$type.'_card_title_font_color']) ? ('color:'.$settings['iq_'.$type.'_card_title_font_color'].';') : '' ;
    $subheading_text_align = !empty($settings['iq_'.$type.'_card_subtitle_align']) ? ('text-align:'.$settings['iq_'.$type.'_card_subtitle_align'].';') : '' ;
    $subheading_color = !empty($settings['iq_'.$type.'_card_subtitle_font_color']) ? ('color:'.$settings['iq_'.$type.'_card_subtitle_font_color'].';') : '' ;
    $title = !empty($settings['iq_'.$type.'_chart_heading']) ? (string)$settings['iq_'.$type.'_chart_heading'] : '';
    $description = !empty($settings['iq_'.$type.'_chart_content']) ? (string)$settings['iq_'.$type.'_chart_content'] : '';
    if(isRestrictedAccess($type,$mainId,$settings, true)) {
        if($settings['iq_'.$type.'_restriction_content_type'] ==='password'){
            return true;
        }
        echo html_entity_decode($settings['iq_'.$type.'_restriction_content_template']);
        return true;
    }
    ?>
    <div class="<?php echo !empty($settings['iq_'.$type.'_chart_card_show']) && $settings['iq_'.$type.'_chart_card_show'] === 'yes' ? 'chart-card' : ''; ?>">
        <div class="">
            <?php if (!empty($settings['iq_'.$type.'_is_card_heading_show']) && $settings['iq_'.$type.'_is_card_heading_show'] === 'yes'
                && !empty($settings['iq_'.$type.'_chart_card_show']) && $settings['iq_'.$type.'_chart_card_show']  === 'yes') { ?>
                <h4 class="heading graphina-chart-heading" style="<?php echo $heading_text_align.$heading_color; ?>">
                    <?php echo html_entity_decode($title); ?>
                </h4>
            <?php }
            if (!empty($settings['iq_'.$type.'_is_card_desc_show']) && $settings['iq_'.$type.'_is_card_desc_show'] === 'yes'  && !empty($settings['iq_'.$type.'_chart_card_show']) && $settings['iq_'.$type.'_chart_card_show'] === 'yes') { ?>
                <p class="sub-heading graphina-chart-sub-heading" style="<?php echo $subheading_text_align.$subheading_color; ?>">
                    <?php echo html_entity_decode($description); ?>
                </p>
            <?php } ?>
        </div>
        <?php
        if(in_array($type,['pie_google','donut_google','line_google','area_google',
            'column_google','bar_google'])){
            graphina_change_google_chart_type($settings,$type,$mainId);
        }else{
            graphina_change_apex_chart_type($settings,$type,$mainId);
        }
        graphina_filter_common($this_,$settings,$type,$mainId);
        ?>
        <?php if($type === 'nested_column'){
            ?>
            <div class="chart-texture <?php esc_attr_e($type); ?>-chart-wrapper">
                <div class="<?php esc_attr_e($type); ?>-chart-one <?php esc_attr_e($type); ?>-chart-one-<?php esc_attr_e($mainId); ?>
                   <?php echo !empty($settings['iq_'.$type.'_chart_border_show']) && $settings['iq_'.$type.'_chart_border_show'] === 'yes' ? 'chart-box' : ''; ?>">
                </div>
                <div class="<?php esc_attr_e($type); ?>-chart-two <?php esc_attr_e($type); ?>-chart-two-<?php esc_attr_e($mainId); ?>
                   <?php echo !empty($settings['iq_'.$type.'_chart_border_show']) && $settings['iq_'.$type.'_chart_border_show'] === 'yes' ? 'chart-box' : ''; ?>">
                </div>
            </div>
            <?php
        } else{
            ?>
            <div class="<?php echo !empty($settings['iq_'.$type.'_chart_border_show']) && $settings['iq_'.$type.'_chart_border_show'] === 'yes' ? 'chart-box' : ''; ?>">
                <?php if($type === 'brush'){
                    ?>
                    <div class="brush-chart-<?php esc_attr_e($mainId); ?>-1">
                    </div>
                    <div class="brush-chart-<?php esc_attr_e($mainId); ?>-2">
                    </div>
                    <?php
                }else{
                    ?>
                    <div class="chart-texture <?php esc_attr_e($type); ?>-chart-<?php esc_attr_e($mainId); ?>" style="<?php echo !empty($settings['iq_' . $type . '_chart_height']) ? 'min-height:'. $settings['iq_' . $type . '_chart_height'].'px;' : '';?>"
                         id='<?php esc_attr_e($type); ?>_chart<?php esc_attr_e($mainId); ?>'></div>
                    <?php
                }?>
            </div>
            <?php
        }?>
        <div style="<?php echo !empty($settings['iq_' . $type . '_chart_height']) ? 'height:'. $settings['iq_' . $type . '_chart_height'].'px;' : '';?>
                display: flex;justify-content: center;align-items: center;"
             class="d-none area-texture <?php esc_attr_e($type); ?>-chart-<?php esc_attr_e($mainId); ?>-loader" >
            <?php if(!empty($settings['iq_'.$type.'_chart_filter_enable']) && $settings['iq_'.$type.'_chart_filter_enable'] == 'yes'){
                $loader_img = !empty($val = graphina_common_setting_get('graphina_loader')) ? $val : GRAPHINA_URL . '/admin/assets/images/graphina.gif';
                $loader_img = apply_filters('graphina_chart_loader',$loader_img);
                $loader = "<img class='graphina-loader d-none' src='".esc_url($loader_img)."'>";
                $loader = apply_filters('graphina_chart_loader_tag',$loader);
                echo html_entity_decode($loader);
            }?>
            <p class="graphina-filter-notext d-none" style="text-align: center;">
                <?php echo esc_html__('No Data Found' ,'graphina-charts-for-elementor');?>
            </p>
        </div>
    </div>
    <?php
}

function graphina_widget_id($this_el){
    $post_id = get_the_ID();
    $post_id = !empty($post_id) ? '_'.$post_id : '';
    return $this_el->get_id().$post_id;
}