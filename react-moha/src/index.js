import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserGuide from './tutorials/macos/UserGuide';
import reportWebVitals from './reportWebVitals';

// be referred in index.html as start point of the application.

/*
React Normal Flow:
   ReactDOM.createRoot(htmlDOM).render(React Elements);

createElement has 2 types of first parameter: String as HTML tag name, and React Components.
*/

// React Element == JSX, could be referred through variable name in Children part.
const homeLink = React.createElement(
    'a',
    {
        href: '/',
        className: "menu-link"
    },
    'Homepage'  // arguments from 3rd position are Children.
)

// Empty container, non-div, non-section, just no HTML dom element, etc.
const frag = React.createElement(
    React.Fragment,
    null,
    homeLink,
)

// Bind root to Dom to display React Elements.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <React.Fragment // Comments could be in JSX tag.
        >
            {/* refer to ... */}
            {/*{frag}*/}

            <App/>
        </React.Fragment>
        {/*{React.createElement(UserGuide)}*/}

    </React.StrictMode> // Could be <></> from React 16.2
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
