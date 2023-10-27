<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Fields\Post;

use org\wplake\acf_views\Groups\FieldData;
use org\wplake\acf_views\Groups\ItemData;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Fields\CustomField;
use org\wplake\acf_views\Views\Fields\MarkupField;

defined('ABSPATH') || exit;

class PostCommentsField extends MarkupField
{
    use CustomField;

    public function getMarkup(
        ViewData $acfViewData,
        string $fieldId,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        int $tabsNumber,
        bool $isWithFieldWrapper,
        bool $isWithRowWrapper
    ): string {
        $markup = '';

        $markup .= "\r\n" . str_repeat("\t", $tabsNumber);
        $markup .= sprintf("{%% for comment_item in %s.value %%}", esc_html($fieldId));
        $markup .= "\r\n" . str_repeat("\t", $tabsNumber + 1);

        $markup .= sprintf(
            '<div class="%s">',
            esc_html(
                $this->getFieldClass('comment', $acfViewData, $field, $isWithFieldWrapper, $isWithRowWrapper)
            ),
        );

        // todo in basic, only name and content. In pro, allow to choose ACF View id

        $markup .= "\r\n";
        $markup .= str_repeat("\t", $tabsNumber);
        $markup .= "{% endfor %}\r\n";

        return $markup;
    }

    public function getTwigArgs(
        ViewData $acfViewData,
        ItemData $item,
        FieldData $field,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue,
        bool $isForValidation = false
    ): array {
        $args = [
            'value' => '',
        ];

        if ($isForValidation) {
            return array_merge($args, [
                'value' => 'content',
            ]);
        }

        $post = $this->getPost($notFormattedValue);

        if (!$post) {
            return $args;
        }

        $content = $post->post_content;
        // to avoid double escaping
        $content = html_entity_decode($content, ENT_QUOTES);


        $args['value'] = $content;

        return $args;
    }

    public function isWithFieldWrapper(ViewData $acfViewData, FieldData $field, FieldMeta $fieldMeta): bool
    {
        return true;
    }
}
