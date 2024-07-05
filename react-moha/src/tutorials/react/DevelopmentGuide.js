import React from "react";

/**
 *
 */
export class DevelopmentGuideSimplifiedChinese extends React.Component {
    render() {
        return (  /* Parentheses are only needed when multiline JSX starts from next line.
                     Normally could be treated as quotation marks. */
            <React.Fragment>
                <h1>React 开发指南</h1>
                {/* curly braces */}
                <p>参考资料</p>
            </React.Fragment>
        );
    }
}

class DevelopmentGuide extends DevelopmentGuideSimplifiedChinese {
    /**
     * How to use in JSX: {React.createElement(UserGuide)}
     * */
}

export default DevelopmentGuide;