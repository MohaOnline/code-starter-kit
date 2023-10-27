<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Views\Cpt;

use org\wplake\acf_views\Common\Cpt\SaveActions;
use org\wplake\acf_views\Common\Instance;
use org\wplake\acf_views\Groups\ViewData;
use org\wplake\acf_views\Html;
use org\wplake\acf_views\Plugin;
use org\wplake\acf_views\Views\FieldMeta;
use org\wplake\acf_views\Views\Post;
use org\wplake\acf_views\Views\ViewFactory;
use org\wplake\acf_views\Views\ViewMarkup;
use org\wplake\acf_views\Views\ViewsDataStorage;
use org\wplake\acf_views\Views\ViewShortcode;

defined('ABSPATH') || exit;

class ViewsSaveActions extends SaveActions
{
    protected ViewMarkup $viewMarkup;
    protected ViewsMetaBoxes $viewsMetaBoxes;
    protected Html $html;
    /**
     * @var ViewData
     */
    protected $validationData;
    protected ViewFactory $viewFactory;

    public function __construct(
        ViewsDataStorage $viewsDataStorage,
        Plugin $plugin,
        ViewData $viewData,
        ViewMarkup $viewMarkup,
        ViewsMetaBoxes $viewsMetaBoxes,
        Html $html,
        ViewFactory $viewFactory
    ) {
        parent::__construct($viewsDataStorage, $plugin, $viewData);

        $this->viewMarkup = $viewMarkup;
        $this->viewsMetaBoxes = $viewsMetaBoxes;
        $this->html = $html;
        $this->viewFactory = $viewFactory;
    }

    protected function getCptName(): string
    {
        return ViewsCpt::NAME;
    }

    /**
     * @param $cptData
     * @return array
     */
    protected function getTranslatableLabels($cptData): array
    {
        $labels = [];

        foreach ($cptData->items as $item) {
            if ($item->field->label) {
                $labels[] = $item->field->label;
            }
            if ($item->field->linkLabel) {
                $labels[] = $item->field->linkLabel;
            }
        }

        return $labels ?
            [
                Plugin::getThemeTextDomain() => array_unique($labels),
            ] :
            [];
    }

    protected function getCustomMarkupAcfFieldName(): string
    {
        return ViewData::getAcfFieldName(ViewData::FIELD_CUSTOM_MARKUP);
    }

    protected function makeValidationInstance(): Instance
    {
        return $this->viewFactory->make(new Post(0), $this->getAcfAjaxPostId(), 0, $this->validationData);
    }

    /**
     * @param ViewData $viewData
     * @return void
     */
    public function updateMarkup($viewData): void
    {
        // pageId 0, so without CSS, also skipCache and customMarkup
        $viewMarkup = $this->viewMarkup->getMarkup($viewData, 0, '', true, true);

        $viewData->markup = $viewMarkup;
    }

    protected function updateIdentifiers(ViewData $acfViewData): void
    {
        foreach ($acfViewData->items as $item) {
            $item->field->id = ($item->field->id &&
                !preg_match('/^[a-zA-Z0-9_\-]+$/', $item->field->id)) ?
                '' :
                $item->field->id;

            if ($item->field->id &&
                $item->field->id === $this->getUniqueFieldId($acfViewData, $item, $item->field->id)) {
                continue;
            }

            $fieldMeta = new FieldMeta($item->field->getAcfFieldId());
            if (!$fieldMeta->isFieldExist()) {
                continue;
            }

            // $Post$ fields have '_' prefix, remove it, otherwise looks bad in the markup
            $name = ltrim($fieldMeta->getName(), '_');
            // transform '_' to '-' to follow the BEM standard (underscore only as a delimiter)
            $name = str_replace('_', '-', $name);
            $item->field->id = $this->getUniqueFieldId($acfViewData, $item, $name);
        }
    }

    // public for tests
    public function getUniqueFieldId(ViewData $acfViewData, $excludeObject, string $name): string
    {
        $isUnique = true;

        foreach ($acfViewData->items as $item) {
            if ($item === $excludeObject ||
                $item->field->id !== $name) {
                continue;
            }

            $isUnique = false;
            break;
        }

        return $isUnique ?
            $name :
            $this->getUniqueFieldId($acfViewData, $excludeObject, $name . '2');
    }

    /**
     * @param int|string $postId
     *
     * @return void
     */
    public function performSaveActions($postId): void
    {
        if (!$this->isMyPost($postId)) {
            return;
        }

        $acfViewData = $this->cptDataStorage->get($postId);

        $this->updateIdentifiers($acfViewData);
        $this->updateMarkup($acfViewData);
        $this->updateTranslationsFile($acfViewData);
        $this->maybeSetUniqueId($acfViewData, 'view_');

        // it'll also update post fields, like 'comment_count'
        $acfViewData->saveToPostContent();
    }

    public function refreshAjax(): void
    {
        $viewId = (int)($_POST['_postId'] ?? 0);

        $postType = get_post($viewId)->post_type ?? '';

        if ($this->getCptName() !== $postType) {
            echo "Post id is wrong";
            exit;
        }

        $acfViewData = $this->cptDataStorage->get($viewId);

        $response = '';

        // ignore customMarkup (we need the preview)
        $markup = $this->viewMarkup->getMarkup(
            $acfViewData,
            0,
            '',
            false,
            true
        );
        $response .= sprintf('<div class="markup">%s</div>', $markup);

        $shortcodes = $this->html->postboxShortcodes(
            $acfViewData->getUniqueId(true),
            false,
            ViewShortcode::NAME,
            get_the_title($viewId),
            false
        );

        $response .= '<div class="elements">';
        $response .= sprintf(
            '<div data-selector="#acf-views_shortcode .inside">%s</div>',
            $shortcodes
        );
        $response .= sprintf(
            '<div data-selector="#acf-views_related_groups .inside">%s</div>',
            $this->viewsMetaBoxes->printRelatedAcfGroupsMetaBox(get_post($viewId), true)
        );
        $response .= sprintf(
            '<div data-selector="#acf-views_related_cards .inside">%s</div>',
            $this->viewsMetaBoxes->getRelatedAcfCardsMetaBox(get_post($viewId))
        );
        $response .= '</div>';

        echo $response;

        exit;
    }

    public function setHooks(): void
    {
        parent::setHooks();

        add_action('wp_ajax_acf_views__view_refresh', [$this, 'refreshAjax',]);
    }
}
