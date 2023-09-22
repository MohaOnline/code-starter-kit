<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit803d2507fda7368ebadf070a14c884f6
{
    public static $files = array (
        '3773ef3f09c37da5478d578e32b03a4b' => __DIR__ . '/../..' . '/jetpack_vendor/automattic/jetpack-assets/actions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'Q' => 
        array (
            'QuadLayers\\WP_Plugin_Table_Links\\' => 33,
            'QuadLayers\\WP_Plugin_Suggestions\\' => 33,
            'QuadLayers\\WP_Notice_Plugin_Required\\' => 37,
            'QuadLayers\\WP_Notice_Plugin_Promote\\' => 36,
            'QuadLayers\\WP_Dashboard_Widget_News\\' => 36,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'QuadLayers\\WP_Plugin_Table_Links\\' => 
        array (
            0 => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-table-links/src',
        ),
        'QuadLayers\\WP_Plugin_Suggestions\\' => 
        array (
            0 => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-suggestions/src',
        ),
        'QuadLayers\\WP_Notice_Plugin_Required\\' => 
        array (
            0 => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-required/src',
        ),
        'QuadLayers\\WP_Notice_Plugin_Promote\\' => 
        array (
            0 => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src',
        ),
        'QuadLayers\\WP_Dashboard_Widget_News\\' => 
        array (
            0 => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-dashboard-widget-news/src',
        ),
    );

    public static $classMap = array (
        'Automattic\\Jetpack\\Assets' => __DIR__ . '/../..' . '/jetpack_vendor/automattic/jetpack-assets/src/class-assets.php',
        'Automattic\\Jetpack\\Assets\\Semver' => __DIR__ . '/../..' . '/jetpack_vendor/automattic/jetpack-assets/src/class-semver.php',
        'Automattic\\Jetpack\\Composer\\Manager' => __DIR__ . '/..' . '/automattic/jetpack-composer-plugin/src/class-manager.php',
        'Automattic\\Jetpack\\Composer\\Plugin' => __DIR__ . '/..' . '/automattic/jetpack-composer-plugin/src/class-plugin.php',
        'Automattic\\Jetpack\\Constants' => __DIR__ . '/../..' . '/jetpack_vendor/automattic/jetpack-constants/src/class-constants.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Base' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/class-base.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Libraries\\Get' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/libraries/class-get.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Navmenu\\Get' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/navmenu/class-get.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Settings\\Delete' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/settings/class-delete.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Settings\\Get' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/settings/class-get.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Backend\\Settings\\Post' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/backend/settings/class-post.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Base' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/class-base.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Endpoints\\Route' => __DIR__ . '/../..' . '/lib/api/rest/endpoints/interface-route.php',
        'QuadLayers\\WPMI\\Api\\Rest\\Routes_Library' => __DIR__ . '/../..' . '/lib/api/rest/class-routes-library.php',
        'QuadLayers\\WPMI\\Controllers\\Backend' => __DIR__ . '/../..' . '/lib/controllers/class-backend.php',
        'QuadLayers\\WPMI\\Controllers\\Frontend' => __DIR__ . '/../..' . '/lib/controllers/class-frontend.php',
        'QuadLayers\\WPMI\\Controllers\\Libraries' => __DIR__ . '/../..' . '/lib/controllers/class-libraries.php',
        'QuadLayers\\WPMI\\Controllers\\Navmenu' => __DIR__ . '/../..' . '/lib/controllers/class-navmenu.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Base' => __DIR__ . '/../..' . '/lib/entities/libraries/class-base.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Dashicons' => __DIR__ . '/../..' . '/lib/entities/libraries/class-dashicons.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Elegant_Icons' => __DIR__ . '/../..' . '/lib/entities/libraries/class-elegant-icons.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Elusive' => __DIR__ . '/../..' . '/lib/entities/libraries/class-elusive.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Fontawesome' => __DIR__ . '/../..' . '/lib/entities/libraries/class-fontawesome.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Fontello' => __DIR__ . '/../..' . '/lib/entities/libraries/class-fontello.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Foundation' => __DIR__ . '/../..' . '/lib/entities/libraries/class-foundation.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Icomoon' => __DIR__ . '/../..' . '/lib/entities/libraries/class-icomoon.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Library' => __DIR__ . '/../..' . '/lib/entities/libraries/interface-library.php',
        'QuadLayers\\WPMI\\Entities\\Libraries\\Themify' => __DIR__ . '/../..' . '/lib/entities/libraries/class-themify.php',
        'QuadLayers\\WPMI\\Menu_Item_Custom_Fields_Walker' => __DIR__ . '/../..' . '/lib/class-menu-item-custom-fields-walker.php',
        'QuadLayers\\WPMI\\Models\\Base' => __DIR__ . '/../..' . '/lib/models/class-base.php',
        'QuadLayers\\WPMI\\Models\\Libraries' => __DIR__ . '/../..' . '/lib/models/class-libraries.php',
        'QuadLayers\\WPMI\\Models\\Navmenu' => __DIR__ . '/../..' . '/lib/models/class-navmenu.php',
        'QuadLayers\\WPMI\\Models\\Settings' => __DIR__ . '/../..' . '/lib/models/class-settings.php',
        'QuadLayers\\WPMI\\Plugin' => __DIR__ . '/../..' . '/lib/class-plugin.php',
        'QuadLayers\\WP_Dashboard_Widget_News\\Load' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-dashboard-widget-news/src/Load.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\Load' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/Load.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\PluginByFile' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/PluginByFile.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\PluginBySlug' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/PluginBySlug.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\PluginBySlugV2' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/PluginBySlugV2.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\Traits\\PluginActions' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/Traits/PluginActions.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\Traits\\PluginActionsLinks' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/Traits/PluginActionsLinks.php',
        'QuadLayers\\WP_Notice_Plugin_Promote\\Traits\\PluginDataByFile' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-promote/src/Traits/PluginDataByFile.php',
        'QuadLayers\\WP_Notice_Plugin_Required\\Load' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-required/src/Load.php',
        'QuadLayers\\WP_Notice_Plugin_Required\\Plugin' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-notice-plugin-required/src/Plugin.php',
        'QuadLayers\\WP_Plugin_Suggestions\\Load' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-suggestions/src/Load.php',
        'QuadLayers\\WP_Plugin_Suggestions\\Page' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-suggestions/src/Page.php',
        'QuadLayers\\WP_Plugin_Suggestions\\Table' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-suggestions/src/Table.php',
        'QuadLayers\\WP_Plugin_Table_Links\\Load' => __DIR__ . '/../..' . '/jetpack_vendor/quadlayers/wp-plugin-table-links/src/Load.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit803d2507fda7368ebadf070a14c884f6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit803d2507fda7368ebadf070a14c884f6::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit803d2507fda7368ebadf070a14c884f6::$classMap;

        }, null, ClassLoader::class);
    }
}