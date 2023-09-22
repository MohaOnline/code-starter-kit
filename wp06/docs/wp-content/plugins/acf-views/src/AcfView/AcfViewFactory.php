<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfView\Fields\Fields;
use org\wplake\acf_views\Cache;
use org\wplake\acf_views\Twig;

defined('ABSPATH') || exit;

class AcfViewFactory
{
    protected Cache $cache;
    protected ViewMarkup $viewMarkup;
    protected Twig $twig;
    protected Fields $fields;

    /**
     * @var AcfViewData[]
     */
    protected array $renderedViews;
    protected array $maps;

    public function __construct(Cache $cache, ViewMarkup $viewMarkup, Twig $twig, Fields $fields)
    {
        $this->cache = $cache;
        $this->viewMarkup = $viewMarkup;
        $this->twig = $twig;
        $this->fields = $fields;
        $this->renderedViews = [];
        $this->maps = [];
    }

    /**
     * @return Field[]
     */
    protected function getFieldsByType(string $type, AcfViewData $view): array
    {
        $fieldsMeta = $view->getFieldsMeta();
        if (!$fieldsMeta) {
            $view->setFieldsMeta();
            $fieldsMeta = $view->getFieldsMeta();
        }

        $fitFields = [];

        foreach ($view->items as $item) {
            $isFit = $type === $fieldsMeta[$item->field->getAcfFieldId()]->getType();

            if (!$isFit) {
                continue;
            }

            $fitFields[] = $item->field;
        }

        return $fitFields;
    }

    protected function getItemSelector(AcfViewData $acfViewData, Field $field, string $target): string
    {
        $viewSelector = $acfViewData->bemName ?
            '.' . $acfViewData->bemName :
            sprintf(
                '.%s--id--%s',
                $acfViewData->getBemName(),
                $acfViewData->getSource()
            );

        $fieldSelector = sprintf(
            '%s .%s__%s',
            esc_html($viewSelector),
            esc_html($acfViewData->getBemName()),
            esc_html($field->id)
        );

        if ($acfViewData->isWithUnnecessaryWrappers ||
            $field->label) {
            $fieldSelector = $acfViewData->isWithCommonClasses ?
                sprintf(
                    '%s .%s__%s',
                    esc_html($fieldSelector),
                    esc_html($acfViewData->getBemName()),
                    $target
                ) :
                sprintf(
                    '%s .%s__%s-%s',
                    esc_html($fieldSelector),
                    esc_html($acfViewData->getBemName()),
                    $field->id,
                    $target
                );
        }

        return $fieldSelector;
    }


    protected function addGoogleMap(AcfViewData $acfViewData, array $mapFields): void
    {
        foreach ($mapFields as $mapField) {
            if ($mapField->isMapWithoutGoogleMap) {
                continue;
            }

            $this->maps[] = $this->getItemSelector($acfViewData, $mapField, 'map');
        }
    }

    protected function getAcfView(Post $dataPost, int $viewId, int $pageId): AcfView
    {
        $viewGroup = $this->cache->getAcfViewData($viewId);

        // don't use the 'AcfViewData->markup' field, as user can override it (and it shouldn't be supported)
        $viewMarkup = $this->viewMarkup->getMarkup($viewGroup, $pageId);

        return new AcfView($viewGroup, $dataPost, $this->twig, $this->fields, $pageId, $viewMarkup);
    }

    protected function markViewAsRendered(AcfViewData $view): void
    {
        $this->renderedViews[$view->getSource()] = $view;
        $mapFields = $this->getFieldsByType('google_map', $view);

        $this->addGoogleMap($view, $mapFields);
    }

    public function createAndGetHtml(Post $dataPost, int $viewId, int $pageId, bool $isMinifyMarkup = true): string
    {
        $acfView = $this->getAcfView($dataPost, $viewId, $pageId);
        $acfView->insertFields($isMinifyMarkup);

        $html = $acfView->getHTML();

        // mark as rendered, only if is not empty
        if ($html) {
            $this->markViewAsRendered($acfView->getViewData());
        }

        return $html;
    }

    /**
     * @return AcfViewData[]
     */
    public function getRenderedViews(): array
    {
        return $this->renderedViews;
    }

    public function getMaps(): array
    {
        return $this->maps;
    }
}
