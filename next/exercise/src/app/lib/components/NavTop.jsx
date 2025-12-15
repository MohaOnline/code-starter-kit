// @ts-nocheck
import Link from "next/link";
import {BsPostcard} from 'react-icons/bs';
import { FaHome, FaListUl } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import {GiMaterialsScience, GiNotebook} from "react-icons/gi";
import { GrDocument, GrAssistListening } from "react-icons/gr";
import {MdEditNote, MdOutlineBiotech} from "react-icons/md";
import {RiTailwindCssFill, RiTranslate} from 'react-icons/ri';

import React from "react";
import "./NavTop.css";

export default function NavTop() {
  return (
    <div className={"nav"}>
      <Link href="/">
        <FaHome></FaHome>
      </Link>
      <Link href={"/notebooks/words/english/player"}>
        <BsPostcard />
      </Link>
      <Link href={'/notebooks/words/english/list/v03'}><FaListUl/></Link>
      <Link href={'/notebooks/notes/v02/list'}><GiNotebook/></Link>
      <Link href={'/notebooks/notes/listening-dialog'}><GrAssistListening/></Link>

      <Link href={'/notebooks/words/english/v03'}><RiTailwindCssFill/></Link>
      <Link href={"/notebooks/notes/list"}>
        <GrTechnology />
      </Link>
      <Link href={"/notebooks/editor"}>
        <MdEditNote />
      </Link>
      <Link href={"/notebooks/se/cards"}>
        <MdOutlineBiotech />
      </Link>
      <RiTranslate/>
    </div>
  );
}