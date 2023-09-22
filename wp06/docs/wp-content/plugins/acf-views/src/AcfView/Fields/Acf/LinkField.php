<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Acf;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\MarkupField;

defined('ABSPATH') || exit;

class LinkField extends MarkupField
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
        $markup = sprintf(
            '<a target="{{ %s.target }}" class="%s" href="{{ %s.value }}">',
            esc_html($fieldId),
            esc_html(
                $this->getFieldClass('link', $acfViewData, $field, $isWithFieldWrapper, $isWithRowWrapper)
            ),
            esc_html($fieldId),
        );
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber + 1);
        $markup .= sprintf("{{ %s.linkLabel|default(%s.title) }}", esc_html($fieldId), esc_html($fieldId));
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber);
        $markup .= '</a>';

        return $markup;
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
            'target' => '',
            'title' => '',
            'linkLabel' => $field->linkLabel,
        ];

        $notFormattedValue = $notFormattedValue ?
            (array)$notFormattedValue :
            [];

        if (!$notFormattedValue) {
            return $args;
        }

        $args['value'] = (string)$notFormattedValue['url'] ?? '';
        $args['title'] = (string)$notFormattedValue['title'] ?? '';
        $args['target'] = isset($notFormattedValue['target']) && $notFormattedValue['target'] ?
            '_blank' :
            '_self';

        return $args;
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers;
    }
}
