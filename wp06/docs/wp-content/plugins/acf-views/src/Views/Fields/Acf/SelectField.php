<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Fields\Acf;

use org\wplake\acf_views\Groups\FieldData;
use org\wplake\acf_views\Groups\ItemData;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Fields\ListField;

defined('ABSPATH') || exit;

class SelectField extends ListField
{
    const LOOP_ITEM_NAME = 'choice_item';

    protected function isMultiple(FieldMeta $fieldMeta): bool
    {
        return $fieldMeta->isMultiple() ||
            'checkbox' === $fieldMeta->getType();
    }

    protected function getItemMarkup(
        ViewData $acfViewData,
        string $fieldId,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        bool $isWithFieldWrapper,
        bool $isWithRowWrapper
    ): string {
        $markup = '';
        $twigName = $this->isMultiple($fieldMeta) ?
            'choice_item' :
            $fieldId;

        $markup .= sprintf(
            '<div class="%s">',
            esc_html(
                $this->getFieldClass(
                    'choice',
                    $acfViewData,
                    $field,
                    $this->isMultiple($fieldMeta) || $isWithFieldWrapper,
                    $isWithRowWrapper
                )
            )
        );
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber + 1);
        $markup .= sprintf("{{ %s.title }}", esc_html($twigName));
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber);
        $markup .= "</div>";

        return $markup;
    }

    protected function getItemTwigArgs(
        ViewData $acfViewData,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        bool $isForValidation = false
    ): array {
        if ($isForValidation) {
            return [
                'title' => 'Option',
                'value' => 'option',
            ];
        }

        $notFormattedValue = is_string($notFormattedValue) ?
            (string)$notFormattedValue :
            '';

        return [
            'title' => (string)($fieldMeta->getChoices()[$notFormattedValue] ?? ''),
            'value' => $notFormattedValue,
        ];
    }

}
