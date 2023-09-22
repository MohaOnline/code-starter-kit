<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\FieldMeta;
use org\wplake\acf_views\AcfView\Fields\Acf\ColorPickerField;
use org\wplake\acf_views\AcfView\Fields\Acf\DatePickerField;
use org\wplake\acf_views\AcfView\Fields\Acf\FileField;
use org\wplake\acf_views\AcfView\Fields\Acf\GalleryField;
use org\wplake\acf_views\AcfView\Fields\Acf\GoogleMapField;
use org\wplake\acf_views\AcfView\Fields\Acf\ImageField;
use org\wplake\acf_views\AcfView\Fields\Acf\LinkField;
use org\wplake\acf_views\AcfView\Fields\Acf\PageLinkField;
use org\wplake\acf_views\AcfView\Fields\Acf\PostObjectField;
use org\wplake\acf_views\AcfView\Fields\Acf\SelectField;
use org\wplake\acf_views\AcfView\Fields\Acf\TaxonomyField;
use org\wplake\acf_views\AcfView\Fields\Acf\TrueFalseField;
use org\wplake\acf_views\AcfView\Fields\Acf\UrlField;
use org\wplake\acf_views\AcfView\Fields\Acf\UserField;
use org\wplake\acf_views\AcfView\Fields\Post\PostAuthorField;
use org\wplake\acf_views\AcfView\Fields\Post\PostDateField;
use org\wplake\acf_views\AcfView\Fields\Post\PostExcerptField;
use org\wplake\acf_views\AcfView\Fields\Post\PostModifiedField;
use org\wplake\acf_views\AcfView\Fields\Post\PostTaxonomyField;
use org\wplake\acf_views\AcfView\Fields\Post\PostThumbnailField;
use org\wplake\acf_views\AcfView\Fields\Post\PostThumbnailLinkField;
use org\wplake\acf_views\AcfView\Fields\Post\PostTitleField;
use org\wplake\acf_views\AcfView\Fields\Post\PostTitleLinkField;

defined('ABSPATH') || exit;

class Fields
{
    const GROUP_POST = '$post$';
    const GROUP_TAXONOMY = '$taxonomy$';
    // all fields have ids like 'field_x', so no conflicts possible
    // Post fields have '_post_' prefix
    const TAXONOMY_PREFIX = '_taxonomy_';

    // all fields have ids like 'field_x', so no conflicts possible
    const FIELD_POST_TITLE = '_post_title';
    const FIELD_POST_TITLE_LINK = '_post_title_link';
    const FIELD_POST_THUMBNAIL = '_post_thumbnail';
    const FIELD_POST_THUMBNAIL_LINK = '_post_thumbnail_link';
    const FIELD_POST_AUTHOR = '_post_author';
    const FIELD_POST_DATE = '_post_date';
    const FIELD_POST_MODIFIED = '_post_modified';
    const FIELD_POST_EXCERPT = '_post_excerpt';
    const FIELD_POST_TAXONOMY = '_post_taxonomy';

    /**
     * @var MarkupField[]
     */
    protected array $fields;

    public function __construct()
    {
        $imageField = new ImageField();
        $selectField = new SelectField();
        $linkField = new LinkField();
        $postObjectField = new PostObjectField($linkField);
        $datePickerField = new DatePickerField();
        $taxonomyField = new TaxonomyField($linkField);

        $this->fields = [
            //// basic
            'url' => new UrlField($linkField),

            //// content types
            'image' => $imageField,
            'file' => new FileField($linkField),
            'gallery' => new GalleryField($imageField),

            //// choice types
            'select' => $selectField,
            'checkbox' => $selectField,
            'radio' => $selectField,
            'button_group' => $selectField,
            'true_false' => new TrueFalseField(),

            //// relational types
            'link' => $linkField,
            'page_link' => new PageLinkField($linkField),
            'post_object' => $postObjectField,
            'relationship' => $postObjectField,
            'taxonomy' => $taxonomyField,
            'user' => new UserField($linkField),

            //// jquery types
            'google_map' => new GoogleMapField(),
            'date_picker' => $datePickerField,
            'date_time_picker' => $datePickerField,
            'time_picker' => $datePickerField,
            'color_picker' => new ColorPickerField(),

            //// custom types
            self::FIELD_POST_TITLE => new PostTitleField(),
            self::FIELD_POST_TITLE_LINK => new PostTitleLinkField($linkField),
            self::FIELD_POST_THUMBNAIL => new PostThumbnailField($imageField),
            self::FIELD_POST_THUMBNAIL_LINK => new PostThumbnailLinkField($imageField),
            self::FIELD_POST_AUTHOR => new PostAuthorField($linkField),
            self::FIELD_POST_DATE => new PostDateField(),
            self::FIELD_POST_MODIFIED => new PostModifiedField(),
            self::FIELD_POST_EXCERPT => new PostExcerptField(),
            self::FIELD_POST_TAXONOMY => new PostTaxonomyField($taxonomyField),
        ];
    }

    protected function applyFieldMarkupFilter(string $fieldMarkup, FieldMeta $fieldMeta, int $viewId): string
    {
        $fieldMarkup = (string)apply_filters(
            'acf_views/view/field_markup',
            $fieldMarkup,
            $fieldMeta,
            $viewId
        );
        $fieldMarkup = (string)apply_filters(
            'acf_views/view/field_markup/name=' . $fieldMeta->getName(),
            $fieldMarkup,
            $fieldMeta,
            $viewId
        );

        if (!$fieldMeta->isCustomType()) {
            $fieldMarkup = (string)apply_filters(
                'acf_views/view/field_markup/type=' . $fieldMeta->getType(),
                $fieldMarkup,
                $fieldMeta,
                $viewId
            );
        }

        return (string)apply_filters(
            'acf_views/view/field_markup/view_id=' . $viewId,
            $fieldMarkup,
            $fieldMeta,
            $viewId
        );
    }

    protected function applyFieldDataFilter(array $fieldData, FieldMeta $fieldMeta, int $viewId): array
    {
        $fieldData = (array)apply_filters(
            'acf_views/view/field_data',
            $fieldData,
            $fieldMeta,
            $viewId
        );

        if (!$fieldMeta->isCustomType()) {
            $fieldData = (array)apply_filters(
                'acf_views/view/field_data/type=' . $fieldMeta->getType(),
                $fieldData,
                $fieldMeta,
                $viewId
            );
        }

        $fieldData = (array)apply_filters(
            'acf_views/view/field_data/name=' . $fieldMeta->getName(),
            $fieldData,
            $fieldMeta,
            $viewId
        );

        return (array)apply_filters(
            'acf_views/view/field_data/view_id=' . $viewId,
            $fieldData,
            $fieldMeta,
            $viewId
        );
    }

    public function getFieldMarkup(
        AcfViewData $acfViewData,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        int $viewId,
        string $fieldIdPrefix = ''
    ): string {
        $fieldId = $fieldIdPrefix . $field->getTwigFieldId();
        $fieldType = $fieldMeta->getType();

        if (!$fieldMeta->isFieldExist()) {
            return '';
        }

        $fieldMarkup = '';
        $isWithWrapper = $this->isWithFieldWrapper($acfViewData, $field, $fieldMeta);

        if (!isset($this->fields[$fieldType]) ||
            !$this->fields[$fieldType] instanceof MarkupField) {
            // disable Twig escaping for wysiwyg, oembed. HTML is expected there. For textarea it's '<br>'
            $filter = in_array($fieldType, ['wysiwyg', 'oembed', 'textarea',], true) ?
                '|raw' :
                '';

            $fieldMarkup .= "\r\n";
            $fieldMarkup .= str_repeat("\t", $tabsNumber);
            $fieldMarkup .= sprintf('{{ %s.value%s }}', esc_html($fieldId), esc_html($filter));
            $fieldMarkup .= "\r\n";
        } else {
            if ($isWithWrapper) {
                $fieldMarkup .= "\r\n";
            }

            $fieldMarkup .= str_repeat("\t", $tabsNumber) .
                $this->fields[$fieldType]->getMarkup(
                    $acfViewData,
                    $fieldId,
                    $item,
                    $field,
                    $fieldMeta,
                    $tabsNumber,
                    $isWithWrapper,
                    $this->isWithRowWrapper($acfViewData, $field, $fieldMeta)
                ) .
                "\r\n";
        }

        return $this->applyFieldMarkupFilter($fieldMarkup, $fieldMeta, $viewId);
    }

    public function isWithFieldWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        $fieldType = $fieldMeta->getType();

        if (!$fieldMeta->isFieldExist()) {
            return false;
        }

        if (!isset($this->fields[$fieldType]) ||
            !$this->fields[$fieldType] instanceof MarkupField) {
            return true;
        }

        return $this->fields[$fieldType]->isWithFieldWrapper($acfViewData, $field, $fieldMeta);
    }

    public function isWithRowWrapper(AcfViewData $acfViewData, Field $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $field->label ||
            in_array($fieldMeta->getType(), ['repeater', 'group',], true);
    }

    public function getRowMarkup(
        string $type,
        string $rowSuffix,
        string $fieldHtml,
        AcfViewData $acfViewData,
        Field $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        string $fieldId
    ): string {
        $rowMarkup = '';
        $isWithRowWrapper = $this->isWithRowWrapper($acfViewData, $field, $fieldMeta);
        $isWithFieldWrapper = $this->isWithFieldWrapper($acfViewData, $field, $fieldMeta);
        $fieldNameClass = $acfViewData->getBemName() . '__' . $field->id . $rowSuffix;

        if ($isWithRowWrapper) {
            $rowClasses = $fieldNameClass;

            if ($acfViewData->isWithCommonClasses) {
                $rowClasses .= ' ' . $acfViewData->getBemName() . '__' . $type;
            }

            $rowMarkup .= str_repeat("\t", $tabsNumber);
            $rowMarkup .= sprintf("<div class=\"%s\">", esc_html($rowClasses));
            $rowMarkup .= "\r\n";
        }

        if ($field->label) {
            $rowMarkup .= str_repeat("\t", $tabsNumber + 1);

            $labelClass = $acfViewData->getBemName() . '__' . $field->id . '-label';

            $labelClass .= $acfViewData->isWithCommonClasses ?
                ' ' . $acfViewData->getBemName() . '__label' :
                '';

            $rowMarkup .= sprintf("<div class=\"%s\">", esc_html($labelClass));
            $rowMarkup .= "\r\n" . str_repeat("\t", $tabsNumber + 2);
            $rowMarkup .= sprintf('{{ %s.label }}', esc_html($fieldId));
            $rowMarkup .= "\r\n" . str_repeat("\t", $tabsNumber + 1);
            $rowMarkup .= "</div>";
            $rowMarkup .= "\r\n";
        }

        if ($isWithFieldWrapper) {
            $rowMarkup .= str_repeat("\t", $tabsNumber + 1);
            $fieldClasses = '';

            if ($isWithRowWrapper) {
                $fieldClasses .= $acfViewData->getBemName() . '__' . $field->id . '-field';
                $fieldClasses .= $acfViewData->isWithCommonClasses ?
                    ' ' . $acfViewData->getBemName() . '__field' :
                    '';
            } else {
                $fieldClasses .= $fieldNameClass;

                if ($acfViewData->isWithCommonClasses) {
                    $fieldClasses .= ' ' . $acfViewData->getBemName() . '__field';
                }
            }

            $rowMarkup .= sprintf(
                "<div class=\"%s\">",
                esc_html($fieldClasses),
            );
        }

        // no escaping for $field, because it's an HTML code (output that have already escaped variables)
        $rowMarkup .= $fieldHtml;

        if ($isWithFieldWrapper) {
            $rowMarkup .= str_repeat("\t", $tabsNumber + 1);
            $rowMarkup .= "</div>";
            $rowMarkup .= "\r\n";
        }

        if ($isWithRowWrapper) {
            $rowMarkup .= str_repeat("\t", $tabsNumber);
            $rowMarkup .= "</div>";
            $rowMarkup .= "\r\n";
        }

        return $rowMarkup;
    }

    public function getFieldTwigArgs(
        AcfViewData $acfViewData,
        Item $item,
        Field $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue
    ): array {
        $fieldType = $fieldMeta->getType();

        if (!isset($this->fields[$fieldType]) ||
            !$this->fields[$fieldType] instanceof MarkupField) {
            $formattedValue = (string)$formattedValue;

            $formattedValue = 'textarea' === $fieldType ?
                str_replace("\n", "<br/>", $formattedValue) :
                $formattedValue;

            $fieldData = [
                'value' => $formattedValue,
            ];
        } else {
            $fieldData = $this->fields[$fieldType]->getTwigArgs(
                $acfViewData,
                $item,
                $field,
                $fieldMeta,
                $notFormattedValue,
                $formattedValue
            );
        }

        return $this->applyFieldDataFilter($fieldData, $fieldMeta, $acfViewData->getSource());
    }

    public function isFieldInstancePresent(string $fieldType): bool
    {
        return key_exists($fieldType, $this->fields);
    }
}
