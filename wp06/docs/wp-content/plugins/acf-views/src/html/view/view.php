<?php

$view = $view ?? [];
$content = $view['content'] ?? '';
$bemName = $view['bemName'] ?? '';

$newLine = "\r\n";

printf(
    "<div class=\"{{ _view.classes }}%s %s--id--{{ _view.id }} %s--object-id--{{ _view.object_id }}\">",
    esc_html($bemName),
    esc_html($bemName),
    esc_html($bemName)
);
echo esc_html($newLine);
// no escaping for $content, because it's an HTML code (of other things, that have escaped variables)
echo $content;
echo "</div>";
echo esc_html($newLine);

