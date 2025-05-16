import logo from './logo.svg';
import './App.css';
import React from "react";
import Showcase from "./components/Showcase";
import Countdown from "./components/Countdown"
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Words from "./Words";
import UserGuide from "./tutorials/macos/UserGuide";
import SamplesJSX from "./samples/JSX";

function App() {
    /**
     * Be referred as <App/> in JSX.
     */
    return (
        <Router>
            {/*<div className="App">*/}
            {/*    <Countdown start={60}></Countdown>*/}
            {/*    <Countdown start={120}></Countdown>*/}

            {/*    <header className="App-header">*/}
            {/*        <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*        <p>*/}
            {/*            Edit <code>src/App.js</code> and save to reload.*/}
            {/*        </p>*/}
            {/*        <a*/}
            {/*            className="App-link"*/}
            {/*            href="https://reactjs.org"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            Learn React*/}
            {/*        </a>*/}
            {/*    </header>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            {React.createElement(Showcase, {title: "macOS 用户指南", url: "/tutorials/macos/UserGuide"})}*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            /!* Refers React Component through JSX. *!/*/}
            {/*            <Showcase title="React 开发指南" url="/tutorials/react/DevelopmentGuide">*/}
            {/*                <p>React 开发的基本指南</p>*/}
            {/*            </Showcase>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            <Routes>
                <Route path="/words" element={<Words/>}/>
                <Route path="/samples/jsx" element={<SamplesJSX/>}/>
                <Route path="/tutorials/macos/UserGuide" element={<UserGuide/>}/>
            </Routes>
        </Router>
    );
}

export default App;
