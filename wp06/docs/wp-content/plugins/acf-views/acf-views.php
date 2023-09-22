<?php
/**
 * Plugin Name: ACF Views
 * Plugin URI: https://wplake.org/acf-views/
 * Description: Smart templates to display your content easily.
 * Version: 2.1.1
 * Author: WPLake
 * Author URI: https://wplake.org/acf-views/
 * Text Domain: acf-views
 */

namespace org\wplake\acf_views;

use org\wplake\acf_views\AcfCard\{AcfCardFactory, AcfCards, CardMarkup, QueryBuilder};
use org\wplake\acf_views\AcfGroups\{AcfCardData,
    AcfViewData,
    Integration\AcfIntegration,
    Integration\CardDataIntegration,
    Integration\FieldIntegration,
    Integration\ItemIntegration,
    Integration\MetaFieldIntegration,
    Integration\MountPointIntegration,
    Integration\TaxFieldIntegration,
    Item};
use org\wplake\acf_views\AcfPro\AcfPro;
use org\wplake\acf_views\AcfView\{AcfViewFactory, AcfViews, Fields\Fields, ViewMarkup};
use org\wplake\acf_views\vendors\LightSource\AcfGroups\Creator;
use org\wplake\acf_views\vendors\LightSource\AcfGroups\Loader as GroupsLoader;

defined('ABSPATH') || exit;

$acfViews = new class {
    protected function acfGroups(): void
    {
        $acfGroupsLoader = new GroupsLoader();
        $acfGroupsLoader->signUpGroups(
            'org\wplake\acf_views\AcfGroups',
            __DIR__ . '/src/AcfGroups'
        );

        $fieldIntegration = new FieldIntegration();
        $cardDataIntegration = new CardDataIntegration($fieldIntegration);
        $itemIntegration = new ItemIntegration();
        $metaFieldIntegration = new MetaFieldIntegration($fieldIntegration);
        $mountPointIntegration = new MountPointIntegration();
        $taxFieldIntegration = new TaxFieldIntegration();

        $fieldIntegration->setHooks();
        $cardDataIntegration->setHooks();
        $itemIntegration->setHooks();
        $metaFieldIntegration->setHooks();
        $mountPointIntegration->setHooks();
        $taxFieldIntegration->setHooks();
    }

    protected function all(): void
    {
        $groupCreator = new Creator();
        $acfViewData = $groupCreator->create(AcfViewData::class);
        $acfCardData = $groupCreator->create(AcfCardData::class);
        $item = $groupCreator->create(Item::class);
        $options = new Options();
        $settings = new Settings($options);
        $html = new Html();
        $fields = new Fields();
        $queryBuilder = new QueryBuilder();
        $cache = new Cache($acfViewData, $acfCardData);
        $twig = new Twig();
        $cardMarkup = new CardMarkup($queryBuilder);
        $viewMarkup = new ViewMarkup($html, $fields);
        $acfViewFactory = new AcfViewFactory($cache, $viewMarkup, $twig, $fields);
        $acfCardFactory = new AcfCardFactory($queryBuilder, $cardMarkup, $twig);
        $plugin = new Plugin($viewMarkup, $cardMarkup, $options, $cache, $acfViewFactory, $acfCardFactory);
        $acfViews = new AcfViews($html, $viewMarkup, $plugin, $cache);
        $acfCards = new AcfCards($html, $plugin, $queryBuilder, $cardMarkup, $cache);
        $demoImport = new DemoImport($acfViews, $settings, $item, $acfCards, $cache);
        $acfIntegration = new AcfIntegration();
        $dashboard = new Dashboard($plugin, $html, $demoImport, $acfIntegration);
        $acfPro = new AcfPro($plugin);
        $upgrades = new Upgrades($plugin, $settings, $cache, $acfViews, $acfCards);
        $activeInstallations = new ActiveInstallations($plugin, $settings, $options);

        // load right here, as used everywhere
        $settings->load();

        $plugin->setHooks();
        $acfViews->setHooks();
        $dashboard->setHooks();
        $demoImport->setHooks();
        $acfCards->setHooks();
        $acfPro->setHooks();
        $upgrades->setHooks();
        $activeInstallations->setHooks();
    }

    public function init(): void
    {
        // skip initialization if PRO already active
        if (class_exists(Plugin::class)) {
            return;
        }

        require_once __DIR__ . '/prefixed_vendors/vendor/scoper-autoload.php';

        $this->acfGroups();
        $this->all();
    }
};

$acfViews->init();
