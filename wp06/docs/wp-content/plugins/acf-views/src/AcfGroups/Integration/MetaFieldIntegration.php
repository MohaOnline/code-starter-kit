<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfGroups\Integration;

use org\wplake\acf_views\AcfGroups\MetaField;

defined('ABSPATH') || exit;

class MetaFieldIntegration extends AcfIntegration
{
    protected FieldIntegration $fieldIntegration;

    public function __construct(FieldIntegration $fieldIntegration)
    {
        $this->fieldIntegration = $fieldIntegration;
    }

    protected function setFieldChoices(): void
    {
        add_filter(
            'acf/load_field/name=' . MetaField::getAcfFieldName(MetaField::FIELD_GROUP),
            function (array $field) {
                $field['choices'] = $this->getGroupChoices(false);

                return $field;
            }
        );

        add_filter(
            'acf/load_field/name=' . MetaField::getAcfFieldName(MetaField::FIELD_FIELD_KEY),
            function (array $field) {
                $field['choices'] = $this->fieldIntegration->getFieldChoices(false);

                return $field;
            }
        );
    }
}