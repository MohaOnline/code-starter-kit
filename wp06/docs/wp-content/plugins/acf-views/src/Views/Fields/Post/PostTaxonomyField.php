<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Fields\Post;

use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Fields\Acf\TaxonomyField;
use org\wplake\acf_views\Views\Fields\CustomField;
use org\wplake\acf_views\Views\Fields\Fields;

defined('ABSPATH') || exit;

class PostTaxonomyField extends TaxonomyField
{
    use CustomField;

    protected function isMultiple(FieldMeta $fieldMeta): bool
    {
        return true;
    }

    protected function getNotFormattedValue(FieldMeta $fieldMeta, $notFormattedValue)
    {
        $notFormattedValue = parent::getNotFormattedValue($fieldMeta, $notFormattedValue);

        $post = $this->getPost($notFormattedValue);

        if (!$post) {
            return $notFormattedValue;
        }

        $taxonomyName = substr($fieldMeta->getFieldId(), strlen(Fields::TAXONOMY_PREFIX));
        $postTerms = get_the_terms($post, $taxonomyName);

        if (false === $postTerms ||
            is_wp_error($postTerms)) {
            return $notFormattedValue;
        }

        return array_column($postTerms, 'term_id');
    }
}
