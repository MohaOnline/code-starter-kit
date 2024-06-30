import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Element == JSX, could be referred through variable name in Children part.
const homeLink = React.createElement(
    'a',
    {
        href: '//moha.online',
        className: "menu-link"
    },
    'Homepage'  // arguments from 3rd position are Children.
)

// Bind root to Dom to display React Elements.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {homeLink}
        <App/>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
