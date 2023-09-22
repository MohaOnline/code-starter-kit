<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfGroups\Integration;

use org\wplake\acf_views\AcfGroups\Item;

defined('ABSPATH') || exit;

class ItemIntegration extends AcfIntegration
{
    protected function setFieldChoices(): void
    {
        add_filter(
            'acf/load_field/name=' . Item::getAcfFieldName(Item::FIELD_GROUP),
            function (array $field) {
                $field['choices'] = $this->getGroupChoices();

                return $field;
            }
        );
    }
}