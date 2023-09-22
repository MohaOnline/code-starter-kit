<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Post;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\CustomField;

defined('ABSPATH') || exit;

class PostTitleField extends CustomField
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
        return sprintf(
            "{{ %s.value }}",
            esc_html($fieldId),
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
        ];

        $postId = $this->getPostId($notFormattedValue);

        if (!$postId) {
            return $args;
        }

        // get_the_title will escape the title, twig also, so we'll have double escape. That's why we use get_post()
        $args['value'] = get_post($postId)->post_title ?? '';

        return $args;
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return true;
    }
}
