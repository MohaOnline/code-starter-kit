<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views;

use org\wplake\acf_views\Groups\FieldData;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Twig;
use org\wplake\acf_views\Views\Fields\Fields;

defined('ABSPATH') || exit;

class ViewFactory
{
    protected ViewsDataStorage $viewsDataStorage;
    protected ViewMarkup $viewMarkup;
    protected Twig $twig;
    protected Fields $fields;

    /**
     * @var ViewData[]
     */
    protected array $renderedViews;
    protected array $maps;

    public function __construct(ViewsDataStorage $viewsDataStorage, ViewMarkup $viewMarkup, Twig $twig, Fields $fields)
    {
        $this->viewsDataStorage = $viewsDataStorage;
        $this->viewMarkup = $viewMarkup;
        $this->twig = $twig;
        $this->fields = $fields;
        $this->renderedViews = [];
        $this->maps = [];
    }

    /**
     * @return FieldData[]
     */
    protected function getFieldsByType(string $type, ViewData $view): array
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

    protected function getItemSelector(
        ViewData $acfViewData,
        FieldData $field,
        string $target,
        bool $isInnerTarget = false
    ): string {
        $markupId = $acfViewData->getMarkupId();

        $viewSelector = $acfViewData->bemName ?
            '.' . $acfViewData->bemName :
            sprintf(
                '.%s--id--%s',
                $acfViewData->getBemName(),
                $markupId
            );

        $fieldSelector = sprintf(
            '%s .%s__%s',
            esc_html($viewSelector),
            esc_html($acfViewData->getBemName()),
            esc_html($field->id)
        );

        if ($acfViewData->isWithUnnecessaryWrappers ||
            $field->label ||
            $isInnerTarget) {
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

    protected function isGoogleMapSelectorInner(FieldData $fieldData): bool
    {
        return false;
    }

    /**
     * @param ViewData $acfViewData
     * @param FieldData[] $mapFields
     * @return void
     */
    protected function addGoogleMap(ViewData $acfViewData, array $mapFields): void
    {
        foreach ($mapFields as $mapField) {
            if ($mapField->isMapWithoutGoogleMap) {
                continue;
            }

            $isInnerTarget = $this->isGoogleMapSelectorInner($mapField);
            $this->maps[] = $this->getItemSelector($acfViewData, $mapField, 'map', $isInnerTarget);
        }
    }

    protected function markViewAsRendered(ViewData $view): void
    {
        $this->renderedViews[$view->getSource()] = $view;

        $mapFields = $this->getFieldsByType('google_map', $view);
        $mapMultipleFields = $this->getFieldsByType('google_map_multi', $view);

        $mapFields = array_merge($mapFields, $mapMultipleFields);

        $this->addGoogleMap($view, $mapFields);
    }

    public function make(Post $dataPost, int $viewId, int $pageId, ViewData $viewData = null): View
    {
        $viewData = $viewData ?: $this->viewsDataStorage->get($viewId);

        $viewMarkup = $this->viewMarkup->getMarkup($viewData, $pageId);

        return new View($this->twig, $viewMarkup, $viewData, $dataPost, $this->fields, $pageId);
    }

    public function makeAndGetHtml(Post $dataPost, int $viewId, int $pageId, bool $isMinifyMarkup = true): string
    {
        $acfView = $this->make($dataPost, $viewId, $pageId);
        $acfView->insertFields($isMinifyMarkup);

        $html = $acfView->getHTML();

        // mark as rendered, only if is not empty
        if ($html) {
            $this->markViewAsRendered($acfView->getViewData());
        }

        return $html;
    }

    /**
     * @return ViewData[]
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
