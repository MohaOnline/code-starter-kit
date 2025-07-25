// @ts-nocheck
import Link from "next/link";
import { FaHome, FaListUl } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineBiotech } from "react-icons/md";
import { GrDocument, GrAssistListening } from "react-icons/gr";
import { MdEditNote } from "react-icons/md";

import React from "react";
import "./NavTop.css";

export default function NavTop() {
  return (
    <div className={"nav"}>
      <Link href="/">
        <FaHome></FaHome>
      </Link>
      <Link href={"/notebook-words-english"}>
        <BsPostcard />
      </Link>
      <Link href={"/notebooks/words/english/list"}>
        <FaListUl />
      </Link>
      <Link href={"/notebooks/notes/list"}>
        <GrTechnology />
      </Link>
      <Link href={"/notebooks/editor"}>
        <MdEditNote />
      </Link>
      <Link href={"/notebooks/se/cards"}>
        <MdOutlineBiotech />
      </Link>
      <Link href={"/notebooks/notes/listening-dialog"}>
        <GrAssistListening />
      </Link>
    </div>
  );
}