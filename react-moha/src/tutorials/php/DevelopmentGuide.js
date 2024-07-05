import React from "react";  // Default import


function DevelopmentGuide() {
    return (
        <React.Fragment>
            <h1>PHP 开发指引</h1>
            <code>
                # PHP 7.4 只能使用 3.1.6 版本的 xdebug
                /usr/local/Cellar/php@7.4/7.4.33_6/bin/pecl install xdebug-3.1.6
            </code>
        </React.Fragment>
    );
}
