<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfGroups\Integration;

use org\wplake\acf_views\AcfGroup;
use org\wplake\acf_views\AcfView\Fields\Fields;

defined('ABSPATH') || exit;

class AcfIntegration
{
    // Important! Use this wrapper to avoid recursion
    protected function getGroups(): array
    {
        if (!function_exists('acf_get_field_groups')) {
            return [];
        }

        $acfGroups = acf_get_field_groups();

        // Important! To avoid recursion, otherwise within 'getChoices()' will be available the same group as the current
        // and this class will call 'acf_get_fields()' that will call 'getChoices()'
        $acfGroups = array_filter($acfGroups, function ($acfGroup) {
            $isPrivate = (bool)($acfGroup['private'] ?? false);
            $isOwn = 0 === strpos($acfGroup['key'], AcfGroup::GROUP_NAME_PREFIX);
            // don't check at all, as 'local' not presented only when json is disabled.
            // in other cases contains 'php' or 'json'
            // $isLocal = (bool)($acfGroup['local'] ?? false);

            return (!$isPrivate &&
                !$isOwn);
        });


        return array_values($acfGroups);
    }

    protected function getGroupChoices(bool $isWithExtra = true): array
    {
        $groupChoices = [
            '' => __('Select', 'acf-views'),
        ];

        if ($isWithExtra) {
            $groupChoices[Fields::GROUP_POST] = __('$Post$', 'acf-views');
            $groupChoices[Fields::GROUP_TAXONOMY] = __('$Taxonomy$', 'acf-views');
        }

        $groups = $this->getGroups();
        foreach ($groups as $group) {
            $groupId = $group['key'];
            $groupChoices[$groupId] = $group['title'];
        }

        return $groupChoices;
    }

    protected function getPostTypeChoices(): array
    {
        return get_post_types();
    }

    ////

    protected function setFieldChoices(): void
    {
    }

    protected function setConditionalFieldRules(): void
    {
    }

    ////

    public function getGroupedFieldTypes(): array
    {
        return [
            'basic' => [
                'text',
                'textarea',
                'number',
                'range',
                'email',
                'url',
                'password',
            ],
            'content' => [
                'image',
                'file',
                'wysiwyg',
                'oembed',
                'gallery',
            ],
            'choice' => [
                'select',
                'checkbox',
                'radio',
                'button_group',
                'true_false',
            ],
            'relational' => [
                'link',
                'post_object',
                'page_link',
                'relationship',
                'taxonomy',
                'user',
            ],
            'jquery' => [
                'google_map',
                'date_picker',
                'date_time_picker',
                'time_picker',
                'color_picker',
            ],
            'layout' => [
                'repeater',
                'group',
            ],
        ];
    }

    public function setHooks(): void
    {
        $this->setFieldChoices();
        $this->setConditionalFieldRules();
    }
}
