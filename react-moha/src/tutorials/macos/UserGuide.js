import React from "react";  // Default import

export class UserGuideSimplifiedChinese extends React.Component {
    render() {
        return React.createElement(React.Fragment, null,
            React.createElement('h1', null, 'macOS 用户指南')
        );
    }
}

class UserGuide extends UserGuideSimplifiedChinese {
    /**
     * How to use in JSX: {React.createElement(UserGuide)}
     * */
}

export default UserGuide;  // Default export.

export class BasicUsageTasteSimplifiedChinese extends React.Component {   // Named export, use {BasicUsageTaste} to import or {BasicUsageTaste as Taste}.
    render() {

        return React.createElement(React.Fragment, null,
            React.createElement('h2', null, '用户指南')
        );
    }
}


export class BasicUsageTasteEnglish extends React.Component {
    render() {

        return React.createElement(React.Fragment, null,
            React.createElement('h2', null, 'User Guide')
        );
    }
}