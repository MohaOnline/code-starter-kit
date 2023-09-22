<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Acf;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\MarkupField;

defined('ABSPATH') || exit;

class TrueFalseField extends MarkupField
{
    public function getMarkup(
        AcfViewData $acfViewData,
        string $fieldId,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        bool $isWithFieldWrapper,
        bool $isWithRowWrapper
    ): string {
        $suffix = sprintf('true-false--state--{{ %s.state }}', esc_html($fieldId));

        return sprintf(
            '<div class="%s %s"></div>',
            esc_html(
                $this->getFieldClass(
                    'true-false',
                    $acfViewData,
                    $field,
                    $isWithFieldWrapper,
                    $isWithRowWrapper
                )
            ),
            esc_html($this->getItemClass($suffix, $acfViewData, $field)),
        );
    }

    public function getTwigArgs(
        AcfViewData $acfViewData,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue
    ): array {
        $args = [
            'value' => !!$formattedValue,
            'state' => !!$formattedValue ?
                'checked' :
                'unchecked',
        ];

        return $args;
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers;
    }
}
