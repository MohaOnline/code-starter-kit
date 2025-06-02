import NavTop from '../../../../lib/components/NavTop.js';
// import {Footer} from "../../../../lib/components/Footer";
import {Footer} from "@/app/lib/components/Footer";
import React from 'react';

const homepage = () => {
    return (
        <>
            <NavTop/>
            <Footer/>
        </>
    );
};

export default function ListPage() {
    return homepage();
}