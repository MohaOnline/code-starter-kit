<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Fields\Acf;

use org\wplake\acf_views\Groups\FieldData;
use org\wplake\acf_views\Groups\ItemData;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Fields\MarkupField;

defined('ABSPATH') || exit;

class ImageField extends MarkupField
{
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

        $isWithOuterWrapper = $field->galleryWithLightBox ||
            $fieldMeta->getCustomArg('isWithOuterWrapper');

        if ($isWithOuterWrapper) {
            $markup .= sprintf('<div class="%s"', esc_html($this->getItemClass('image-outer', $acfViewData, $field)));

            if ($fieldMeta->getCustomArg('isWithSizeInWrapperData')) {
                $markup .= ' data-width="{{ image_item.width }}" data-height="{{ image_item.height }}"';
            }

            $markup .= ">\r\n";
            $markup .= str_repeat("\t", $tabsNumber + 1);
        }

        $markup .= sprintf(
            '<img class="%s" src="{{ %2$s.value }}" width="{{ %2$s.width }}" height="{{ %2$s.height }}" alt="{{ %2$s.alt }}" decoding="{{ %2$s.decoding }}" loading="{{ %2$s.loading }}" srcset="{{ %2$s.srcset }}" sizes="{{ %2$s.sizes }}"',
            esc_html(
                $this->getFieldClass(
                    'image',
                    $acfViewData,
                    $field,
                    $isWithFieldWrapper,
                    $isWithRowWrapper
                )
            ),
            esc_html($fieldId)
        );

        if ($field->galleryWithLightBox) {
            $markup .= sprintf(' data-full-size="{{ %s.full_size }}"', esc_html($fieldId));
        }

        $markup .= '>';

        if ($isWithOuterWrapper) {
            $markup .= "\r\n" . str_repeat("\t", $tabsNumber);
            $markup .= "</div>";
        }

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
            'width' => 0,
            'height' => 0,
            'value' => '',
            'alt' => '',
            'srcset' => '',
            'sizes' => '',
            'decoding' => 'async',
            'loading' => 'lazy',
            'full_size' => '',
        ];

        if ($isForValidation) {
            return array_merge($args, [
                'width' => 1,
                'height' => 1,
                'value' => 'https://wordpress.org/',
                'alt' => 'wordpress.org',
                'srcset' => 'https://wordpress.org/ 1w',
                'sizes' => '(max-width: 1px) 1vw',
                'full_size' => 'https://wordpress.org/',
            ]);
        }

        $imageSize = $field->imageSize ?: 'full';

        $notFormattedValue = $notFormattedValue ?
            (int)$notFormattedValue :
            0;

        if (!$notFormattedValue) {
            return $args;
        }

        $imageData = (array)(wp_get_attachment_image_src($notFormattedValue, $imageSize) ?: []);
        $imageSrc = (string)($imageData[0] ?? '');
        $width = (int)($imageData[1] ?? 0);
        $height = (int)($imageData[2] ?? 0);

        if (!$imageSrc) {
            return $args;
        }

        $args['width'] = $width;
        $args['height'] = $height;
        $args['value'] = $imageSrc;
        $args['alt'] = (string)get_post_meta($notFormattedValue, '_wp_attachment_image_alt', true);

        if ($field->galleryWithLightBox) {
            $args['full_size'] = (string)wp_get_attachment_image_url($notFormattedValue, 'full');
        }

        $imageMeta = wp_get_attachment_metadata($notFormattedValue);

        if (!is_array($imageMeta)) {
            return $args;
        }

        $sizesArray = [absint($width), absint($height)];
        $srcSet = (string)wp_calculate_image_srcset($sizesArray, $imageSrc, $imageMeta, $notFormattedValue);
        $sizes = (string)wp_calculate_image_sizes($sizesArray, $imageSrc, $imageMeta, $notFormattedValue);

        if (!$srcSet ||
            !$sizes) {
            return $args;
        }

        $args['srcset'] = $srcSet;
        $args['sizes'] = $sizes;

        return $args;
    }

    public function isWithFieldWrapper(ViewData $acfViewData, FieldData $field, FieldMeta $fieldMeta): bool
    {
        return $acfViewData->isWithUnnecessaryWrappers;
    }
}
