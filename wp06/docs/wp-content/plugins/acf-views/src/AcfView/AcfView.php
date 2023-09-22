<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfView;

use org\wplake\acf_views\AcfGroups\AcfViewData;
use org\wplake\acf_views\AcfGroups\Item;
use org\wplake\acf_views\AcfView\Fields\Fields;
use org\wplake\acf_views\Twig;

defined('ABSPATH') || exit;

class AcfView
{
    protected AcfViewData $view;
    protected Post $dataPost;
    protected Twig $twig;
    protected Fields $fields;
    protected int $pageId;
    protected string $html;

    public function __construct(
        AcfViewData $view,
        Post $dataPost,
        Twig $twig,
        Fields $fields,
        int $pageId,
        string $markup
    ) {
        $this->view = $view;
        $this->dataPost = $dataPost;
        $this->pageId = $pageId;
        $this->html = $markup;
        $this->twig = $twig;
        $this->fields = $fields;
    }

    protected function getTwigArgsForVariable(
        Item $item,
        FieldMeta $fieldMeta,
        $notFormattedValue,
        $formattedValue
    ): array {
        if (in_array($fieldMeta->getType(), ['repeater', 'group',], true) &&
            !$this->fields->isFieldInstancePresent($fieldMeta->getType())) {
            return [];
        }

        $twigArgs = $this->fields->getFieldTwigArgs(
            $this->view,
            $item,
            $item->field,
            $fieldMeta,
            $notFormattedValue,
            $formattedValue
        );

        return [
            $item->field->getTwigFieldId() => array_merge(
                $twigArgs,
                [
                    'label' => $item->field->label,
                ]
            ),
        ];
    }

    protected function renderTwig(array $twigVariables, array $fieldValues): void
    {
        if (!$this->view->isRenderWhenEmpty) {
            $isEmpty = true;

            foreach ($twigVariables as $twigVariableName => $twigVariableValue) {
                $isEmptyValue = is_array($twigVariableValue) &&
                    key_exists('value', $twigVariableValue) &&
                    empty($twigVariableValue['value']);

                // ignore the system variables
                if (!$twigVariableValue ||
                    '_view' === $twigVariableName ||
                    $isEmptyValue) {
                    continue;
                }

                $isEmpty = false;
                break;
            }

            if ($isEmpty) {
                $this->html = '';
                return;
            }
        }

        $this->html = $this->twig->render($this->view->getSource(), $this->html, $twigVariables);
    }

    public function insertFields(bool $isMinifyMarkup = true): array
    {
        if ($isMinifyMarkup) {
            // remove special symbols that used in the markup for a preview
            // exactly here, before the fields are inserted, to avoid affecting them
            $this->html = str_replace(["\t", "\n", "\r"], '', $this->html);
        }

        $fieldValues = [];

        // internal variables
        $twigVariables = [
            '_view' => [
                'classes' => $this->view->cssClasses ?
                    $this->view->cssClasses . ' ' :
                    '',
                'id' => $this->view->getSource(),
                'object_id' => strval($this->dataPost->getId()),
            ],
        ];

        $fieldsMeta = $this->view->getFieldsMeta();
        // e.g. already filled for cache/tests
        if (!$fieldsMeta) {
            $this->view->setFieldsMeta();
            $fieldsMeta = $this->view->getFieldsMeta();
        }

        foreach ($this->view->items as $item) {
            $fieldMeta = $fieldsMeta[$item->field->getAcfFieldId()];

            // for IDE
            if (!$fieldMeta instanceof FieldMeta) {
                continue;
            }

            list($notFormattedFieldValue, $formattedFieldValue) = $this->dataPost->getFieldValue(
                $fieldMeta->getFieldId()
            );

            // 1. default value from our plugin. Note: custom field types don't support default values
            if (!$notFormattedFieldValue &&
                !$fieldMeta->isCustomType()) {
                $notFormattedFieldValue = $formattedFieldValue = $item->field->defaultValue;
            }

            // 2. default value from ACF. Note: custom field types don't support default values
            if (!$notFormattedFieldValue &&
                !$fieldMeta->isCustomType()) {
                $notFormattedFieldValue = $formattedFieldValue = $fieldMeta->getDefaultValue();
            }

            $fieldValues[$item->field->id] = $formattedFieldValue;

            $twigVariables = array_merge(
                $twigVariables,
                $this->getTwigArgsForVariable(
                    $item,
                    $fieldMeta,
                    $notFormattedFieldValue,
                    $formattedFieldValue
                )
            );
        }

        $this->renderTwig($twigVariables, $fieldValues);

        return $fieldValues;
    }

    public function getHTML(): string
    {
        return $this->html;
    }

    public function getViewData(): AcfViewData
    {
        return $this->view;
    }
}
