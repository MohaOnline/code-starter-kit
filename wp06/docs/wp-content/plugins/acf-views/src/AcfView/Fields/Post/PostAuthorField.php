<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Post;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\Acf\LinkField;
use org\wplake\acf_views\AcfView\Fields\CustomField;

defined('ABSPATH') || exit;

class PostAuthorField extends CustomField
{
    protected LinkField $linkField;

    public function __construct(LinkField $linkField)
    {
        $this->linkField = $linkField;
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
        return $this->linkField->getMarkup(
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
            return $this->linkField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, [], []);
        }

        $authorId = get_post_field('post_author', $postId);
        $authorUser = $authorId ?
            get_user_by('ID', $authorId) :
            null;

        if (!$authorUser) {
            return $this->linkField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, [], []);
        }

        $fieldArgs = [
            'url' => (string)get_author_posts_url($authorUser->ID),
            'title' => $authorUser->display_name,
        ];

        return $this->linkField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, $fieldArgs, $fieldArgs);
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $this->linkField->isWithFieldWrapper($acfViewData, $field, $fieldMeta);
    }
}
