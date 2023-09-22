<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit_ColibriWP_Page_Builder
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'ProteusThemes\\WPContentImporter2\\' => 33,
        ),
        'C' => 
        array (
            'ColibriWP\\PageBuilder\\' => 22,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ProteusThemes\\WPContentImporter2\\' => 
        array (
            0 => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src',
        ),
        'ColibriWP\\PageBuilder\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'ColibriWP\\PageBuilder\\Customizer\\BaseControl' => __DIR__ . '/../..' . '/src/Customizer/BaseControl.php',
        'ColibriWP\\PageBuilder\\Customizer\\BasePanel' => __DIR__ . '/../..' . '/src/Customizer/BasePanel.php',
        'ColibriWP\\PageBuilder\\Customizer\\BaseSection' => __DIR__ . '/../..' . '/src/Customizer/BaseSection.php',
        'ColibriWP\\PageBuilder\\Customizer\\BaseSetting' => __DIR__ . '/../..' . '/src/Customizer/BaseSetting.php',
        'ColibriWP\\PageBuilder\\Customizer\\Customizer' => __DIR__ . '/../..' . '/src/Customizer/Customizer.php',
        'ColibriWP\\PageBuilder\\Customizer\\Panels\\ContentPanel' => __DIR__ . '/../..' . '/src/Customizer/Panels/ContentPanel.php',
        'ColibriWP\\PageBuilder\\Customizer\\Settings\\ContentSetting' => __DIR__ . '/../..' . '/src/Customizer/Settings/ContentSetting.php',
        'ColibriWP\\PageBuilder\\Customizer\\Template' => __DIR__ . '/../..' . '/src/Customizer/Template.php',
        'ColibriWP\\PageBuilder\\Customizer\\ThemeSupport' => __DIR__ . '/../..' . '/src/Customizer/ThemeSupport.php',
        'ColibriWP\\PageBuilder\\Customizer\\Translations' => __DIR__ . '/../..' . '/src/Customizer/Translations.php',
        'ColibriWP\\PageBuilder\\DemoImport\\DataApi' => __DIR__ . '/../..' . '/src/DemoImport/DataApi.php',
        'ColibriWP\\PageBuilder\\DemoImport\\DemoImport' => __DIR__ . '/../..' . '/src/DemoImport/DemoImport.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Hooks\\ImportContentHook' => __DIR__ . '/../..' . '/src/DemoImport/Hooks/ImportContentHook.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Hooks\\ImportCustomizerHook' => __DIR__ . '/../..' . '/src/DemoImport/Hooks/ImportCustomizerHook.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Hooks\\ImportHook' => __DIR__ . '/../..' . '/src/DemoImport/Hooks/ImportHook.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Hooks\\PreparationHook' => __DIR__ . '/../..' . '/src/DemoImport/Hooks/PreparationHook.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Views\\ItemsView' => __DIR__ . '/../..' . '/src/DemoImport/Views/ItemsView.php',
        'ColibriWP\\PageBuilder\\DemoImport\\Views\\PageView' => __DIR__ . '/../..' . '/src/DemoImport/Views/PageView.php',
        'ColibriWP\\PageBuilder\\GoogleFontsLocalLoader' => __DIR__ . '/../..' . '/src/GoogleFontsLocalLoader.php',
        'ColibriWP\\PageBuilder\\License\\ActivationForm' => __DIR__ . '/../..' . '/src/License/ActivationForm.php',
        'ColibriWP\\PageBuilder\\License\\CheckForm' => __DIR__ . '/../..' . '/src/License/CheckForm.php',
        'ColibriWP\\PageBuilder\\License\\Endpoint' => __DIR__ . '/../..' . '/src/License/Endpoint.php',
        'ColibriWP\\PageBuilder\\License\\License' => __DIR__ . '/../..' . '/src/License/License.php',
        'ColibriWP\\PageBuilder\\License\\RequestResponse' => __DIR__ . '/../..' . '/src/License/RequestResponse.php',
        'ColibriWP\\PageBuilder\\License\\Updater' => __DIR__ . '/../..' . '/src/License/Updater.php',
        'ColibriWP\\PageBuilder\\LoadingScreen' => __DIR__ . '/../..' . '/src/LoadingScreen.php',
        'ColibriWP\\PageBuilder\\Notify\\Notification' => __DIR__ . '/../..' . '/src/Notify/Notification.php',
        'ColibriWP\\PageBuilder\\Notify\\NotificationsManager' => __DIR__ . '/../..' . '/src/Notify/NotificationsManager.php',
        'ColibriWP\\PageBuilder\\OCDI\\CustomizerImporter' => __DIR__ . '/../..' . '/src/OCDI/CustomizerImporter.php',
        'ColibriWP\\PageBuilder\\OCDI\\CustomizerOption' => __DIR__ . '/../..' . '/src/OCDI/CustomizerOption.php',
        'ColibriWP\\PageBuilder\\OCDI\\Downloader' => __DIR__ . '/../..' . '/src/OCDI/Downloader.php',
        'ColibriWP\\PageBuilder\\OCDI\\Helpers' => __DIR__ . '/../..' . '/src/OCDI/Helpers.php',
        'ColibriWP\\PageBuilder\\OCDI\\ImportActions' => __DIR__ . '/../..' . '/src/OCDI/ImportActions.php',
        'ColibriWP\\PageBuilder\\OCDI\\Importer' => __DIR__ . '/../..' . '/src/OCDI/Importer.php',
        'ColibriWP\\PageBuilder\\OCDI\\Logger' => __DIR__ . '/../..' . '/src/OCDI/Logger.php',
        'ColibriWP\\PageBuilder\\OCDI\\OneClickDemoImport' => __DIR__ . '/../..' . '/src/OCDI/OneClickDemoImport.php',
        'ColibriWP\\PageBuilder\\OCDI\\ReduxImporter' => __DIR__ . '/../..' . '/src/OCDI/ReduxImporter.php',
        'ColibriWP\\PageBuilder\\OCDI\\WPCLICommands' => __DIR__ . '/../..' . '/src/OCDI/WPCLICommands.php',
        'ColibriWP\\PageBuilder\\OCDI\\WXRImporter' => __DIR__ . '/../..' . '/src/OCDI/WXRImporter.php',
        'ColibriWP\\PageBuilder\\OCDI\\WidgetImporter' => __DIR__ . '/../..' . '/src/OCDI/WidgetImporter.php',
        'ColibriWP\\PageBuilder\\PageBuilder' => __DIR__ . '/../..' . '/src/PageBuilder.php',
        'ColibriWP\\PageBuilder\\ThemeHooks' => __DIR__ . '/../..' . '/src/ThemeHooks.php',
        'ColibriWP\\PageBuilder\\Utils\\Utils' => __DIR__ . '/../..' . '/src/Utils/Utils.php',
        'ProteusThemes\\WPContentImporter2\\Importer' => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src/Importer.php',
        'ProteusThemes\\WPContentImporter2\\WPImporterLogger' => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src/WPImporterLogger.php',
        'ProteusThemes\\WPContentImporter2\\WPImporterLoggerCLI' => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src/WPImporterLoggerCLI.php',
        'ProteusThemes\\WPContentImporter2\\WXRImportInfo' => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src/WXRImportInfo.php',
        'ProteusThemes\\WPContentImporter2\\WXRImporter' => __DIR__ . '/..' . '/proteusthemes/wp-content-importer-v2/src/WXRImporter.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit_ColibriWP_Page_Builder::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit_ColibriWP_Page_Builder::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit_ColibriWP_Page_Builder::$classMap;

        }, null, ClassLoader::class);
    }
}