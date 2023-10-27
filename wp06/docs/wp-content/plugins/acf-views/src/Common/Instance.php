<?php

declare(strict_types=1);

namespace org\wplake\acf_views\Common;

use org\wplake\acf_views\Twig;

defined('ABSPATH') || exit;

abstract class Instance
{
    protected string $html;
    protected array $twigVariables;
    protected Twig $twig;
    /**
     * @var CptData
     */
    protected $cptData;

    public function __construct(Twig $twig, CptData $cptData, string $markup)
    {
        $this->twig = $twig;
        $this->cptData = $cptData;
        $this->html = $markup;
        $this->twigVariables = [];
    }

    abstract protected function setTwigVariables(bool $isForValidation = false): void;

    abstract protected function renderTwig(bool $isForValidation = false): void;

    public function getMarkupValidationError(): string
    {
        $this->setTwigVariables(true);

        $this->renderTwig(true);

        preg_match('/<span class="acf-views__error-message">(.*)$/', $this->html, $errorMessage);

        $errorMessage = $errorMessage[1] ?? '';
        $errorMessage = str_replace('</span>', '', $errorMessage);
        $errorMessage = trim($errorMessage);

        return $errorMessage;
    }
}
