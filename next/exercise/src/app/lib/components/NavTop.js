import Link from 'next/link';
import {FaHome, FaListUl} from 'react-icons/fa';
import {BsPostcard} from 'react-icons/bs';

import React from 'react';
import './NavTop.css';

export default function NavTop() {
  return (
      <div className={'nav'}><Link href="/"><FaHome></FaHome></Link>
        <Link href={'/notebook-words-english'}> <BsPostcard/></Link>
        <Link href={'/notebooks/words/english/list'}> <FaListUl/></Link>
      </div>
  );
}