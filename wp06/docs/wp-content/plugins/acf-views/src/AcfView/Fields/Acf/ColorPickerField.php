<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Acf;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\MarkupField;

defined('ABSPATH') || exit;

class ColorPickerField extends MarkupField
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
        if ('string' === $fieldMeta->getReturnFormat()) {
            return sprintf('{{ %s.value }}', esc_html($fieldId));
        }

        return sprintf(
            'rgba({{ %s.red }};{{ %s.green }};{{ %s.blue }};{{ %s.alpha }})',
            esc_html($fieldId),
            esc_html($fieldId),
            esc_html($fieldId),
            esc_html($fieldId)
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
            'value' => '',
            'red' => '',
            'green' => '',
            'blue' => '',
            'alpha' => '',
        ];

        if ($formattedValue) {
            $formattedValue = 'string' === $fieldMeta->getReturnFormat() ?
                (string)$formattedValue :
                (array)$formattedValue;
        }

        if (!$formattedValue) {
            return $args;
        }

        if ('string' === $fieldMeta->getReturnFormat()) {
            $args['value'] = $formattedValue;
        } else {
            // value is just bool, as 'red' can be zero, but still be a value
            $args['value'] = !!($formattedValue['red'] ?? '');
            $args['red'] = (string)($formattedValue['red'] ?? '');
            $args['green'] = (string)($formattedValue['green'] ?? '');
            $args['blue'] = (string)($formattedValue['blue'] ?? '');
            $args['alpha'] = (string)($formattedValue['alpha'] ?? '');
        }

        return $args;
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return true;
    }
}
