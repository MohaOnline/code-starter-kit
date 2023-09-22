<?php
/**
 * ChromeNews and Blockspare content pattern.
 *
 * @package ChromeNews
 */

return array(
	'title'      => __( 'Main Banner', 'chromenews' ),
    'categories' => array( 'chromenews' ),
	'content'    => '<!-- wp:group {"align":"wide","className":"pattern-row","layout":{"type":"constrained"}} -->
    <div class="wp-block-group alignwide pattern-row"><!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
    <div class="wp-block-group alignfull">
    <!-- wp:blockspare/blockspare-banner-2 {"align":"full","uniqueClass":"blockspare-9d067edc-de4b-4","sliderCategoryBackgroundColor":"#e91802","sliderTitleFontSizeTablet":27,"sliderEnableAutoPlay":false,"sliderCategoryFontWeight":"600","editorCategoryBackgroundColor":"#003bb3","editorCategoryFontWeight":"600","animation":"AFTfadeInUp","marginTop":20,"marginBottom":28,"gutter":15} /--></div>
    <!-- /wp:group -->
     
    </div>
    <!-- /wp:group -->',
	
);
