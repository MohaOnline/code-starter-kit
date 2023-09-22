<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfGroups\Integration;

use org\wplake\acf_views\AcfGroups\MountPoint;

defined('ABSPATH') || exit;

class MountPointIntegration extends AcfIntegration
{
    protected function setFieldChoices(): void
    {
        add_filter(
            'acf/load_field/name=' . MountPoint::getAcfFieldName(MountPoint::FIELD_POST_TYPES),
            function (array $field) {
                $field['choices'] = $this->getPostTypeChoices();

                return $field;
            }
        );
    }

}