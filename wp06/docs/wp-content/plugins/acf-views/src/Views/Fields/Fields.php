<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Fields;

use org\wplake\acf_views\Groups\FieldData;
use org\wplake\acf_views\Groups\ItemData;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Fields\Acf\ColorPickerField;
use org\wplake\acf_views\Views\Fields\Acf\DatePickerField;
use org\wplake\acf_views\Views\Fields\Acf\FileField;
use org\wplake\acf_views\Views\Fields\Acf\GalleryField;
use org\wplake\acf_views\Views\Fields\Acf\ImageField;
use org\wplake\acf_views\Views\Fields\Acf\LinkField;
use org\wplake\acf_views\Views\Fields\Acf\MapField;
use org\wplake\acf_views\Views\Fields\Acf\PageLinkField;
use org\wplake\acf_views\Views\Fields\Acf\PostObjectField;
use org\wplake\acf_views\Views\Fields\Acf\SelectField;
use org\wplake\acf_views\Views\Fields\Acf\TaxonomyField;
use org\wplake\acf_views\Views\Fields\Acf\TrueFalseField;
use org\wplake\acf_views\Views\Fields\Acf\UrlField;
use org\wplake\acf_views\Views\Fields\Acf\UserField;
use org\wplake\acf_views\Views\Fields\Comment\CommentAuthorEmail;
use org\wplake\acf_views\Views\Fields\Comment\CommentAuthorNameField;
use org\wplake\acf_views\Views\Fields\Comment\CommentAuthorNameLinkField;
use org\wplake\acf_views\Views\Fields\Comment\CommentContentField;
use org\wplake\acf_views\Views\Fields\Comment\CommentDateField;
use org\wplake\acf_views\Views\Fields\Comment\CommentFields;
use org\wplake\acf_views\Views\Fields\Comment\CommentParentField;
use org\wplake\acf_views\Views\Fields\Comment\CommentStatusField;
use org\wplake\acf_views\Views\Fields\Comment\CommentUserField;
use org\wplake\acf_views\Views\Fields\Post\PostAuthorField;
use org\wplake\acf_views\Views\Fields\Post\PostCommentsField;
use org\wplake\acf_views\Views\Fields\Post\PostContentField;
use org\wplake\acf_views\Views\Fields\Post\PostDateField;
use org\wplake\acf_views\Views\Fields\Post\PostExcerptField;
use org\wplake\acf_views\Views\Fields\Post\PostFields;
use org\wplake\acf_views\Views\Fields\Post\PostModifiedField;
use org\wplake\acf_views\Views\Fields\Post\PostTaxonomyField;
use org\wplake\acf_views\Views\Fields\Post\PostThumbnailField;
use org\wplake\acf_views\Views\Fields\Post\PostThumbnailLinkField;
use org\wplake\acf_views\Views\Fields\Post\PostTitleField;
use org\wplake\acf_views\Views\Fields\Post\PostTitleLinkField;
use org\wplake\acf_views\Views\Fields\Term\TermDescriptionField;
use org\wplake\acf_views\Views\Fields\Term\TermFields;
use org\wplake\acf_views\Views\Fields\Term\TermNameField;
use org\wplake\acf_views\Views\Fields\Term\TermNameLinkField;
use org\wplake\acf_views\Views\Fields\Term\TermSlugField;
use org\wplake\acf_views\Views\Fields\User\UserAuthorLinkField;
use org\wplake\acf_views\Views\Fields\User\UserBioField;
use org\wplake\acf_views\Views\Fields\User\UserDisplayNameField;
use org\wplake\acf_views\Views\Fields\User\UserEmailField;
use org\wplake\acf_views\Views\Fields\User\UserFields;
use org\wplake\acf_views\Views\Fields\User\UserFirstNameField;
use org\wplake\acf_views\Views\Fields\User\UserLastNameField;
use org\wplake\acf_views\Views\Fields\Woo\WooFields;
use org\wplake\acf_views\Views\Fields\Woo\WooGalleryField;
use org\wplake\acf_views\Views\Fields\Woo\WooHeightField;
use org\wplake\acf_views\Views\Fields\Woo\WooLengthField;
use org\wplake\acf_views\Views\Fields\Woo\WooPriceField;
use org\wplake\acf_views\Views\Fields\Woo\WooRegularPriceField;
use org\wplake\acf_views\Views\Fields\Woo\WooSalePriceField;
use org\wplake\acf_views\Views\Fields\Woo\WooSkuField;
use org\wplake\acf_views\Views\Fields\Woo\WooStockStatusField;
use org\wplake\acf_views\Views\Fields\Woo\WooWeightField;
use org\wplake\acf_views\Views\Fields\Woo\WooWidthField;

defined('ABSPATH') || exit;

class Fields
{
    const GROUP_TAXONOMY = '$taxonomy$';
    const TAXONOMY_PREFIX = '_taxonomy_';

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
        $postContent = new PostContentField();
        $mapField = new MapField();

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
            'google_map' => $mapField,
            'google_map_multi' => $mapField,
            'open_street_map' => $mapField,
            'date_picker' => $datePickerField,
            'date_time_picker' => $datePickerField,
            'time_picker' => $datePickerField,
            'color_picker' => new ColorPickerField(),

            PostFields::FIELD_TITLE => new PostTitleField(),
            PostFields::FIELD_TITLE_LINK => new PostTitleLinkField($linkField),
            PostFields::FIELD_THUMBNAIL => new PostThumbnailField($imageField),
            PostFields::FIELD_THUMBNAIL_LINK => new PostThumbnailLinkField($imageField),
            PostFields::FIELD_AUTHOR => new PostAuthorField($linkField),
            PostFields::FIELD_DATE => new PostDateField(),
            PostFields::FIELD_MODIFIED => new PostModifiedField(),
            PostFields::FIELD_CONTENT => $postContent,
            PostFields::FIELD_EXCERPT => new PostExcerptField(),
            PostFields::FIELD_TAXONOMY => new PostTaxonomyField($linkField),
            PostFields::FIELD_COMMENTS => new PostCommentsField(),

            TermFields::FIELD_NAME => new TermNameField(),
            TermFields::FIELD_SLUG => new TermSlugField(),
            TermFields::FIELD_DESCRIPTION => new TermDescriptionField(),
            TermFields::FIELD_NAME_LINK => new TermNameLinkField($linkField),

            UserFields::FIELD_FIRST_NAME => new UserFirstNameField(),
            UserFields::FIELD_LAST_NAME => new UserLastNameField(),
            UserFields::FIELD_DISPLAY_NAME => new UserDisplayNameField(),
            UserFields::FIELD_EMAIL => new UserEmailField(),
            UserFields::FIELD_BIO => new UserBioField(),
            UserFields::FIELD_AUTHOR_LINK => new UserAuthorLinkField($linkField),

            CommentFields::FIELD_AUTHOR_EMAIL => new CommentAuthorEmail(),
            CommentFields::FIELD_AUTHOR_NAME => new CommentAuthorNameField(),
            CommentFields::FIELD_AUTHOR_NAME_LINK => new CommentAuthorNameLinkField($linkField),
            CommentFields::FIELD_CONTENT => new CommentContentField(),
            CommentFields::FIELD_DATE => new CommentDateField(),
            CommentFields::FIELD_STATUS => new CommentStatusField(),
            CommentFields::FIELD_PARENT => new CommentParentField(),
            CommentFields::FIELD_USER => new CommentUserField(),

            WooFields::FIELD_PRICE => new WooPriceField(),
            WooFields::FIELD_REGULAR_PRICE => new WooRegularPriceField(),
            WooFields::FIELD_SALE_PRICE => new WooSalePriceField(),
            WooFields::FIELD_SKU => new WooSkuField(),
            WooFields::FIELD_STOCK_STATUS => new WooStockStatusField(),
            WooFields::FIELD_GALLERY => new WooGalleryField($imageField),
            WooFields::FIELD_WEIGHT => new WooWeightField(),
            WooFields::FIELD_LENGTH => new WooLengthField(),
            WooFields::FIELD_WIDTH => new WooWidthField(),
            WooFields::FIELD_HEIGHT => new WooHeightField(),
        ];
    }

    protected function applyFieldMarkupFilter(
        string $fieldMarkup,
        FieldMeta $fieldMeta,
        string $shortUniqueViewId
    ): string {
        $fieldMarkup = (string)apply_filters(
            'acf_views/view/field_markup',
            $fieldMarkup,
            $fieldMeta,
            $shortUniqueViewId
        );
        $fieldMarkup = (string)apply_filters(
            'acf_views/view/field_markup/name=' . $fieldMeta->getName(),
            $fieldMarkup,
            $fieldMeta,
            $shortUniqueViewId
        );

        if (!$fieldMeta->isCustomType()) {
            $fieldMarkup = (string)apply_filters(
                'acf_views/view/field_markup/type=' . $fieldMeta->getType(),
                $fieldMarkup,
                $fieldMeta,
                $shortUniqueViewId
            );
        }

        return (string)apply_filters(
            'acf_views/view/field_markup/view_id=' . $shortUniqueViewId,
            $fieldMarkup,
            $fieldMeta,
            $shortUniqueViewId
        );
    }

    protected function applyFieldDataFilter(array $fieldData, FieldMeta $fieldMeta, string $shortUniqueViewId): array
    {
        $fieldData = (array)apply_filters(
            'acf_views/view/field_data',
            $fieldData,
            $fieldMeta,
            $shortUniqueViewId
        );

        if (!$fieldMeta->isCustomType()) {
            $fieldData = (array)apply_filters(
                'acf_views/view/field_data/type=' . $fieldMeta->getType(),
                $fieldData,
                $fieldMeta,
                $shortUniqueViewId
            );
        }

        $fieldData = (array)apply_filters(
            'acf_views/view/field_data/name=' . $fieldMeta->getName(),
            $fieldData,
            $fieldMeta,
            $shortUniqueViewId
        );

        return (array)apply_filters(
            'acf_views/view/field_data/view_id=' . $shortUniqueViewId,
            $fieldData,
            $fieldMeta,
            $shortUniqueViewId
        );
    }

    public function getFieldMarkup(
        ViewData $acfViewData,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
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

        return $this->applyFieldMarkupFilter($fieldMarkup, $fieldMeta, $acfViewData->getUniqueId(true));
    }

    public function isWithFieldWrapper(ViewData $acfViewData, FieldData $field, FieldMeta $fieldMeta): bool
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

    public function isWithRowWrapper(ViewData $acfViewData, FieldData $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers ||
            $field->label ||
            in_array($fieldMeta->getType(), ['repeater', 'group',], true);
    }

    public function getRowMarkup(
        string $type,
        string $rowSuffix,
        string $fieldHtml,
        ViewData $acfViewData,
        FieldData $field,
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
        ViewData $acfViewData,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue,
        bool $isForValidation = false
    ): array {
        $fieldType = $fieldMeta->getType();

        if (!isset($this->fields[$fieldType]) ||
            !$this->fields[$fieldType] instanceof MarkupField) {
            $formattedValue = (string)$formattedValue;

            $formattedValue = 'textarea' === $fieldType ?
                str_replace("\n", "<br/>", $formattedValue) :
                $formattedValue;

            if ($isForValidation) {
                $formattedValue = '1';
            }

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
                $formattedValue,
                $isForValidation
            );
        }

        return $this->applyFieldDataFilter($fieldData, $fieldMeta, $acfViewData->getUniqueId(true));
    }

    public function isFieldInstancePresent(string $fieldType): bool
    {
        return key_exists($fieldType, $this->fields);
    }
}
