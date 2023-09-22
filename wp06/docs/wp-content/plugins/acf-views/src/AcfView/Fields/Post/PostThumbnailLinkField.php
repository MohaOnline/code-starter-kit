<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Post;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\Acf\ImageField;
use org\wplake\acf_views\AcfView\Fields\CustomField;

defined('ABSPATH') || exit;

class PostThumbnailLinkField extends CustomField
{
    protected ImageField $imageField;

    public function __construct(ImageField $imageField)
    {
        $this->imageField = $imageField;
    }

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

            '<a target="{{ %s.target }}" class="%s" href="{{ %s.href }}">',
            esc_html($fieldId),
            esc_html(
                $this->getFieldClass('link', $acfViewData, $field, $isWithFieldWrapper, $isWithRowWrapper)
            ),
            esc_html($fieldId),
        );
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber + 1);
        $markup .= $this->imageField->getMarkup(
            $acfViewData,
            $fieldId,
            $item,
            $field,
            $fieldMeta,
            $tabsNumber,
            true,
            $isWithRowWrapper
        );
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
            'target' => '_self',
            'href' => '',
        ];

        $postId = $this->getPostId($notFormattedValue);

        if (!$postId) {
            return array_merge(
                $args,
                $this->imageField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, 0, 0)
            );
        }

        $args['href'] = (string)get_the_permalink($postId);
        $imageId = (int)get_post_thumbnail_id($postId);

        return array_merge(
            $args,
            $this->imageField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, $imageId, $imageId)
        );
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers;
    }
}
