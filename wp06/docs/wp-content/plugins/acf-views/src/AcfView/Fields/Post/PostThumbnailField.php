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

class PostThumbnailField extends CustomField
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
        return $this->imageField->getMarkup(
            $acfViewData,
            $fieldId,
            $item,
            $field,
            $fieldMeta,
            $tabsNumber,
            $isWithFieldWrapper,
            $isWithRowWrapper
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
        $postId = $this->getPostId($notFormattedValue);

        if (!$postId) {
            return $this->imageField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, 0, 0);
        }

        $imageId = (int)get_post_thumbnail_id($postId);

        return $this->imageField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, $imageId, $imageId);
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $this->imageField->isWithFieldWrapper($acfViewData, $field, $fieldMeta);
    }
}
