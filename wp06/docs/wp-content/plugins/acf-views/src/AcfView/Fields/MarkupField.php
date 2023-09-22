<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;

defined('ABSPATH') || exit;

abstract class MarkupField
{
    abstract public function getMarkup(
        AcfViewData $acfViewData,
        string $fieldId,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        bool $isWithFieldWrapper,
        bool $isWithRowWrapper
    ): string;

    abstract public function getTwigArgs(
        AcfViewData $acfViewData,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue
    ): array;

    abstract public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool;

    public function isWithRowWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $field->label;
    }

    protected function getFieldClass(
        string $suffix,
        AcfViewData $acfViewData,
        Field $field,
        bool $isWithFieldWrapper,
        bool $isWithRowWrapper
    ): string {
        $classes = [];
        $isFirstTag = !$isWithRowWrapper &&
            !$isWithFieldWrapper;

        if ($isFirstTag) {
            $classes[] = $acfViewData->getBemName() . '__' . $field->id;

            if (!$acfViewData->isWithCommonClasses) {
                return implode(' ', $classes);
            }
        }

        $classes[] = $this->getItemClass($suffix, $acfViewData, $field);

        if (!$isWithFieldWrapper &&
            $acfViewData->isWithCommonClasses) {
            $classes[] = $acfViewData->getBemName() . '__field';
        }

        return implode(' ', $classes);
    }

    protected function getItemClass(string $suffix, AcfViewData $acfViewData, Field $field): string
    {
        $classes = [];

        $classes[] = $acfViewData->getBemName() . '__' . $field->id . '-' . $suffix;

        if ($acfViewData->isWithCommonClasses) {
            $classes[] = $acfViewData->getBemName() . '__' . $suffix;
        }

        return implode(' ', $classes);
    }
}
