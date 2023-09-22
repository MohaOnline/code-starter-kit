<?php

declare(strict_types=1);

namespace org\wplake\acf_views;

use Exception;
use org\wplake\acf_views\vendors\Twig\Environment;
use org\wplake\acf_views\vendors\Twig\Loader\FilesystemLoader;

defined('ABSPATH') || exit;

class Twig
{
    protected FilesystemLoader $loader;
    protected Environment $twig;

    public function __construct()
    {
        $this->loader = new FilesystemLoader(__DIR__ . '/templates');
        $this->twig = new Environment($this->loader, [
            // will generate exception if a var doesn't exist instead of replace to NULL
            'strict_variables' => true,
            // 'html' by default, just highlight that it's secure to not escape TWIG variable values in PHP
            'autoescape' => 'html',
        ]);
    }


    public function render(int $viewId, string $template, array $args): string
    {
        $html = '';

        // emulate the template file for every View.
        // as Twig generates a PHP class for every template file
        // so if you use the same, it'll have HTML of the very first View

        $templateFile = __DIR__ . '/templates/' . $viewId;

        file_put_contents($templateFile, $template);

        try {
            $html = $this->twig->render($viewId, $args);
        } catch (Exception $e) {
            $debugMode = defined('WP_DEBUG') &&
                (!defined('WP_DEBUG_DISPLAY') || WP_DEBUG_DISPLAY);

            $html .= sprintf(
                '<pre style="color:red;">ACF Views (id=%s): %s%s</pre>',
                $viewId,
                $e->getMessage(),
                $debugMode ? 'Args: ' . print_r($args, true) : ''
            );
        }

        unlink($templateFile);

        // print_r $args with pre

        return $html;
    }
}
