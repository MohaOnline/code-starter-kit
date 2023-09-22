<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Acf;

use DateTime;
use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\MarkupField;

defined('ABSPATH') || exit;

class DatePickerField extends MarkupField
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
        return sprintf('{{ %s.value }}', esc_html($fieldId));
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
        ];

        $notFormattedValue = $notFormattedValue ?
            (string)$notFormattedValue :
            [];

        if (!$notFormattedValue) {
            return $args;
        }

        $date = false;

        switch ($fieldMeta->getType()) {
            case 'date_picker':
                $date = DateTime::createFromFormat('Ymd', $notFormattedValue);
                break;
            case 'date_time_picker':
                $date = DateTime::createFromFormat('Y-m-d H:i:s', $notFormattedValue);
                break;
            case 'time_picker':
                $date = DateTime::createFromFormat('H:i:s', $notFormattedValue);
                break;
        }

        if (false === $date) {
            return $args;
        }

        // date_i18n() unlike the '$date->format($displayFormat)' supports different languages
        $args['value'] = date_i18n($fieldMeta->getDisplayFormat(), $date->getTimestamp());

        return $args;
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return true;
    }
}
