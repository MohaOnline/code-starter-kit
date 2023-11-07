<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views;

use org\wplake\acf_views\Views\Fields\Comment\CommentFields;
use org\wplake\acf_views\Views\Fields\Fields;
use org\wplake\acf_views\Views\Fields\Post\PostFields;
use org\wplake\acf_views\Views\Fields\Term\TermFields;
use org\wplake\acf_views\Views\Fields\User\UserFields;
use org\wplake\acf_views\Views\Fields\Woo\WooFields;

defined('ABSPATH') || exit;

class Post
{
    /**
     * @var int|string Can be string in case with 'options' or 'user_x'
     */
    protected $id;
    protected array $fieldsCache;
    protected bool $isBlock;
    protected int $userId;
    protected int $termId;
    protected int $commentId;

    /**
     * @param int|string $id id, 'options', 'user_x', 'term_x'
     * @param array $fieldsCache
     * @param bool $isBlock
     * @param int $userId
     * @param int $termId
     * @param int $commentId
     */
    public function __construct(
        $id,
        array $fieldsCache = [],
        bool $isBlock = false,
        int $userId = 0,
        int $termId = 0,
        int $commentId = 0
    ) {
        $this->id = $id;
        $this->fieldsCache = $fieldsCache;
        $this->isBlock = $isBlock;
        $this->userId = $userId;
        $this->termId = $termId;
        $this->commentId = $commentId;
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

        $isCustomFieldType = 0 === strpos($fieldName, '_');

        if ($isCustomFieldType) {
            $isPostGroup = 0 === strpos($fieldName, PostFields::PREFIX);
            $isTaxonomyGroup = 0 === strpos($fieldName, Fields::TAXONOMY_PREFIX);
            $isUserGroup = 0 === strpos($fieldName, UserFields::PREFIX);
            $isWooGroup = 0 === strpos($fieldName, WooFields::PREFIX);
            $isTermGroup = 0 === strpos($fieldName, TermFields::PREFIX);
            $isCommentGroup = 0 === strpos($fieldName, CommentFields::PREFIX);

            if (!$this->isOptions() &&
                ($isPostGroup || $isTaxonomyGroup || $isWooGroup)) {
                $value[0] = $this->id;
            }

            if ($isUserGroup) {
                $value[0] = $this->userId;
            }

            if ($isTermGroup) {
                $value[0] = $this->termId;
            }

            if ($isCommentGroup) {
                $value[0] = $this->commentId;
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
