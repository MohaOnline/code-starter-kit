<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfGroups\Integration;

use org\wplake\acf_views\AcfGroups\Field;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfGroups\RepeaterField;
use org\wplake\acf_views\AcfView\Fields\Fields;

defined('ABSPATH') || exit;

class FieldIntegration extends AcfIntegration
{
    protected function setConditionalRulesForField(
        array $field,
        string $targetField,
        array $notEqualValues
    ): array {
        // multiple calls of this method are allowed
        if (!isset($field['conditional_logic']) ||
            !is_array($field['conditional_logic'])) {
            $field['conditional_logic'] = [];
        }

        foreach ($notEqualValues as $notEqualValue) {
            // using exactly AND rule (so all rules in one array) and '!=' comparison,
            // otherwise if there are no such fields the field will be visible
            $field['conditional_logic'][] = [
                'field' => $targetField,
                'operator' => '!=',
                'value' => $notEqualValue,
            ];
        }

        return $field;
    }

    protected function addConditionalFilter(
        string $fieldName,
        array $notFieldTypes,
        bool $isSubField = false,
        array $includeFields = []
    ): void {
        $acfFieldName = !$isSubField ?
            Field::getAcfFieldName($fieldName) :
            RepeaterField::getAcfFieldName($fieldName);
        $acfKey = !$isSubField ?
            Field::getAcfFieldName(Field::FIELD_KEY) :
            RepeaterField::getAcfFieldName(RepeaterField::FIELD_KEY);

        add_filter(
            'acf/load_field/name=' . $acfFieldName,
            function (array $field) use ($acfKey, $notFieldTypes, $includeFields, $isSubField) {
                // using exactly the negative (excludeTypes) filter,
                // otherwise if there are no such fields the field will be visible
                $notRightFields = !$isSubField ?
                    $this->getFieldChoices(true, $notFieldTypes) :
                    $this->getSubFieldChoices($notFieldTypes);

                foreach ($includeFields as $includeField) {
                    unset($notRightFields[$includeField]);
                }

                return $this->setConditionalRulesForField(
                    $field,
                    $acfKey,
                    array_keys($notRightFields)
                );
            }
        );
    }

    protected function getSubFieldChoices(array $excludeTypes = []): array
    {
        $subFieldChoices = [
            '' => 'Select',
        ];

        $supportedFieldTypes = $this->getFieldTypes();

        $groups = $this->getGroups();
        foreach ($groups as $group) {
            $fields = acf_get_fields($group);

            foreach ($fields as $groupField) {
                $subFields = (array)($groupField['sub_fields'] ?? []);

                if (!in_array($groupField['type'], ['repeater', 'group',], true) ||
                    !$subFields) {
                    continue;
                }

                foreach ($subFields as $subField) {
                    // inner complex types, like repeater or group aren't allowed
                    if (!in_array($subField['type'], $supportedFieldTypes, true) ||
                        in_array($subField['type'], ['repeater', 'group',], true) ||
                        ($excludeTypes && in_array($subField['type'], $excludeTypes, true))) {
                        continue;
                    }

                    $fullFieldId = Field::createKey(
                        $group['key'],
                        $groupField['key'],
                        $subField['key']
                    );
                    $subFieldChoices[$fullFieldId] = $subField['label'] . ' (' . $subField['type'] . ')';
                }
            }
        }

        return $subFieldChoices;
    }

    protected function getExtraFieldChoices(array $excludeTypes): array
    {
        $fieldChoices = [];

        $postFields = [
            Fields::FIELD_POST_TITLE => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_TITLE),
                __('Title', 'acf-views')
            ],
            Fields::FIELD_POST_TITLE_LINK => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_TITLE_LINK),
                __('Title with link', 'acf-views')
            ],
            Fields::FIELD_POST_EXCERPT => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_EXCERPT),
                __('Excerpt', 'acf-views')
            ],
            Fields::FIELD_POST_THUMBNAIL => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_THUMBNAIL),
                __('Featured Image', 'acf-views')
            ],
            Fields::FIELD_POST_THUMBNAIL_LINK => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_THUMBNAIL_LINK),
                __('Featured Image with link', 'acf-views')
            ],
            Fields::FIELD_POST_AUTHOR => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_AUTHOR),
                __('Author', 'acf-views')
            ],
            Fields::FIELD_POST_DATE => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_DATE),
                __('Published date', 'acf-views')
            ],
            Fields::FIELD_POST_MODIFIED => [
                Field::createKey(Fields::GROUP_POST, Fields::FIELD_POST_MODIFIED),
                __('Modified date', 'acf-views')
            ],
        ];

        foreach ($postFields as $fieldName => $fieldInfo) {
            if (in_array($fieldName, $excludeTypes, true)) {
                continue;
            }

            $fieldChoices[$fieldInfo[0]] = $fieldInfo[1];
        }

        if (!in_array(Fields::GROUP_TAXONOMY, $excludeTypes, true)) {
            $taxonomies = get_taxonomies([], 'objects');

            foreach ($taxonomies as $taxonomy) {
                $itemName = Field::createKey(
                    Fields::GROUP_TAXONOMY,
                    Fields::TAXONOMY_PREFIX . $taxonomy->name
                );
                $fieldChoices[$itemName] = $taxonomy->label;
            }
        }

        return $fieldChoices;
    }

    protected function setConditionalFieldsRulesByValues(): void
    {
        //// Masonry fields

        $masonryFields = [
            Field::FIELD_MASONRY_ROW_MIN_HEIGHT,
            Field::FIELD_MASONRY_GUTTER,
            Field::FIELD_MASONRY_MOBILE_GUTTER,
        ];

        foreach ($masonryFields as $masonryField) {
            add_filter(
                'acf/load_field/name=' . Field::getAcfFieldName($masonryField),
                function (array $field) {
                    return $this->setConditionalRulesForField(
                        $field,
                        Field::getAcfFieldName(Field::FIELD_GALLERY_TYPE),
                        ['', 'plain',],
                    );
                }
            );
        }

        $masonryRepeaterFields = [
            RepeaterField::FIELD_MASONRY_ROW_MIN_HEIGHT,
            RepeaterField::FIELD_MASONRY_GUTTER,
            RepeaterField::FIELD_MASONRY_MOBILE_GUTTER,
        ];

        foreach ($masonryRepeaterFields as $masonryRepeaterField) {
            add_filter(
                'acf/load_field/name=' . RepeaterField::getAcfFieldName($masonryRepeaterField),
                function (array $field) {
                    return $this->setConditionalRulesForField(
                        $field,
                        RepeaterField::getAcfFieldName(RepeaterField::FIELD_GALLERY_TYPE),
                        ['', 'plain',],
                    );
                }
            );
        }

        //// repeaterFields tab ('repeater' + 'group')

        add_filter(
            'acf/load_field/name=' . Item::getAcfFieldName(Item::FIELD_REPEATER_FIELDS_TAB),
            function (array $field) {
                // using exactly the negative (excludeTypes) filter,
                // otherwise if there are no such fields the field will be visible
                $notRepeaterFields = $this->getFieldChoices(true, ['repeater', 'group',]);

                return $this->setConditionalRulesForField(
                    $field,
                    Field::getAcfFieldName(Field::FIELD_KEY),
                    array_keys($notRepeaterFields)
                );
            }
        );
    }

    protected function setConditionalFieldRules(): void
    {
        $fieldRules = [
            Field::FIELD_LINK_LABEL => [
                'link',
                'page_link',
                'file',
                'post_object',
                'relationship',
                'taxonomy',
                'user',
            ],
            Field::FIELD_IMAGE_SIZE => [
                'image',
                'gallery',
                Fields::FIELD_POST_THUMBNAIL,
                Fields::FIELD_POST_THUMBNAIL_LINK,
            ],
            Field::FIELD_ACF_VIEW_ID => [
                'post_object',
                'relationship',
            ],
            Field::FIELD_GALLERY_TYPE => [
                'gallery',
            ],
            Field::FIELD_GALLERY_WITH_LIGHT_BOX => [
                'gallery',
            ],
            Field::FIELD_MAP_ADDRESS_FORMAT => [
                'google_map',
            ],
            Field::FIELD_IS_MAP_WITH_ADDRESS => [
                'google_map',
            ],
            Field::FIELD_IS_MAP_WITHOUT_GOOGLE_MAP => [
                'google_map',
            ],
            Field::FIELD_OPTIONS_DELIMITER => [
                'select',
                'post_object',
                'page_link',
                'relationship',
                'taxonomy',
                'user',
                Fields::GROUP_TAXONOMY,
            ],
        ];

        foreach ($fieldRules as $fieldName => $conditionalFields) {
            $this->addConditionalFilter($fieldName, $conditionalFields);
            $this->addConditionalFilter($fieldName, $conditionalFields, true);
        }

        $this->setConditionalFieldsRulesByValues();
    }

    protected function getImageSizes(): array
    {
        $imageSizeChoices = [];
        $imageSizes = get_intermediate_image_sizes();

        foreach ($imageSizes as $imageSize) {
            $imageSizeChoices[$imageSize] = ucfirst($imageSize);
        }

        $imageSizeChoices['full'] = __('Full', 'acf-views');

        return $imageSizeChoices;
    }

    protected function setFieldChoices(): void
    {
        add_filter(
            'acf/load_field/name=' . Field::getAcfFieldName(Field::FIELD_KEY),
            function (array $field) {
                $field['choices'] = $this->getFieldChoices();

                return $field;
            }
        );

        add_filter(
            'acf/load_field/name=' . RepeaterField::getAcfFieldName(RepeaterField::FIELD_KEY),
            function (array $field) {
                $field['choices'] = $this->getSubFieldChoices();

                return $field;
            }
        );

        add_filter(
            'acf/load_field/name=' . Field::getAcfFieldName(Field::FIELD_IMAGE_SIZE),
            function (array $field) {
                $field['choices'] = $this->getImageSizes();

                return $field;
            }
        );

        add_filter(
            'acf/load_field/name=' . RepeaterField::getAcfFieldName(RepeaterField::FIELD_IMAGE_SIZE),
            function (array $field) {
                $field['choices'] = $this->getImageSizes();

                return $field;
            }
        );
    }

    public function getFieldChoices(bool $isWithExtra = true, array $excludeTypes = []): array
    {
        $fieldChoices = [];

        if (!function_exists('acf_get_fields')) {
            return $fieldChoices;
        }

        $fieldChoices = [
            '' => 'Select',
        ];

        if ($isWithExtra) {
            $fieldChoices = array_merge($fieldChoices, $this->getExtraFieldChoices($excludeTypes));
        }

        $supportedFieldTypes = $this->getFieldTypes();

        $groups = $this->getGroups();
        foreach ($groups as $group) {
            $fields = acf_get_fields($group);

            foreach ($fields as $groupField) {
                if (!in_array($groupField['type'], $supportedFieldTypes, true) ||
                    ($excludeTypes && in_array($groupField['type'], $excludeTypes, true))) {
                    continue;
                }

                $fullFieldId = Field::createKey($group['key'], $groupField['key']);
                $fieldChoices[$fullFieldId] = $groupField['label'] . ' (' . $groupField['type'] . ')';
            }
        }

        return $fieldChoices;
    }

    public function getFieldTypes(): array
    {
        $fieldTypes = [];
        $groupedFieldTypes = $this->getGroupedFieldTypes();
        foreach ($groupedFieldTypes as $group => $fields) {
            $fieldTypes = array_merge($fieldTypes, $fields);
        }

        return $fieldTypes;
    }
}