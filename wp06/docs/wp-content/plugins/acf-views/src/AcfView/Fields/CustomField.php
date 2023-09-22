<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView\Fields;

defined('ABSPATH') || exit;

abstract class CustomField extends MarkupField
{
    protected function getPostId($notFormattedValue): int
    {
        $notFormattedValue = $notFormattedValue ?
            (array)$notFormattedValue :
            [];

        return (int)($notFormattedValue[0] ?? 0);
    }
}
