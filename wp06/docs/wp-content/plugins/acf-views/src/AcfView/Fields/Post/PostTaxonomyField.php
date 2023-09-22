<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields\Post;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\Acf\TaxonomyField;
use org\wplake\acf_views\AcfView\Fields\CustomField;
use org\wplake\acf_views\AcfView\Fields\Fields;

defined('ABSPATH') || exit;

class PostTaxonomyField extends CustomField
{
    protected TaxonomyField $taxonomyField;

    public function __construct(TaxonomyField $taxonomyField)
    {
        $this->taxonomyField = $taxonomyField;
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
        return $this->taxonomyField->getMarkup(
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
            return $this->taxonomyField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, [], []);
        }

        $taxonomyName = substr($fieldMeta->getFieldId(), strlen(Fields::TAXONOMY_PREFIX));
        $postTerms = get_the_terms($postId, $taxonomyName);

        if (false === $postTerms ||
            is_wp_error($postTerms)) {
            return $this->taxonomyField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, [], []);
        }

        $termIds = array_column($postTerms, 'term_id');

        return $this->taxonomyField->getTwigArgs($acfViewData, $item, $field, $fieldMeta, $termIds, $termIds);
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $this->taxonomyField->isWithFieldWrapper($acfViewData, $field, $fieldMeta);
    }
}
