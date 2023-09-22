<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView;

defined('ABSPATH') || exit;

class Post
{
    /**
     * @var int|string Can be string in case with 'options' or 'user_x'
     */
    private $id;
    private array $fieldsCache;
    private bool $isBlock;

    /**
     * @param int|string $id
     * @param array $fieldsCache
     * @param bool $isBlock
     */
    public function __construct($id, array $fieldsCache = [], bool $isBlock = false)
    {
        $this->id = $id;
        $this->fieldsCache = $fieldsCache;
        $this->isBlock = $isBlock;
    }

    public function isOptions(): bool
    {
        return 'options' === $this->id;
    }

    /**
     * @return int|string
     */
    public function getId()
    {
        return $this->id;
    }

    public function getFieldValue(string $fieldName, bool $isSkipCache = false): array
    {
        if (isset($this->fieldsCache[$fieldName]) &&
            !$isSkipCache) {
            return $this->fieldsCache[$fieldName];
        }

        $value = [
            '',
            '',
        ];

        // custom field type. Just pass the ID in this case
        if (0 === strpos($fieldName, '_')) {
            if (!$this->isOptions() &&
                !$this->isBlock) {
                $value[0] = $this->id;
            }

            return $value;
        }

        if (function_exists('get_field')) {
            $notFormattedValue = !$this->isBlock ?
                get_field($fieldName, $this->id, false) :
                get_field($fieldName, false, false);
            $formattedValue = !$this->isBlock ?
                get_field($fieldName, $this->id) :
                get_field($fieldName, false);

            $value = [
                $notFormattedValue,
                $formattedValue
            ];
        }

        $this->fieldsCache[$fieldName] = $value;

        return $value;
    }
}
