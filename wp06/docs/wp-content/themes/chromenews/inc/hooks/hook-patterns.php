<?php
/**
 * Register patterns
 *
 * @package ChromeNews
 */

 

function chromenews_register_patterns_categories(){
    register_block_pattern_category(
        'chromenews',
        array( 'label' => __( 'ChromeNews', 'chromenews' ) )
    );
}

add_action( 'init', 'chromenews_register_patterns_categories' );

function chromenews_register_patterns() {

    if ( ! function_exists( 'register_block_pattern' ) ) {
        return;
    }

    $patterns = [        
        'block-1',      
        'block-2',      
        'block-3',      
        'block-4',      
        'block-5',      
        'section-1',      
        'section-2',      
        'section-3',      
        'section-4', 
        'full',     
             
    ];

    foreach ( $patterns as $pattern ) {
        register_block_pattern(
            'chromenews/' . $pattern,
            require __DIR__ . '/patterns/' . $pattern . '.php'
        );
    }
}

add_action( 'init', 'chromenews_register_patterns' );