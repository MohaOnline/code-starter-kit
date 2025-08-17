'use client';

import React from 'react';
import Link from 'next/link';

// 3rd part libs: Bootstrap v5.
import {
  Container, Row, Col, Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import "@/pages/bs5/styles/customized.css";

/**
 * Basic Layout:
 *
 * @see /pages/bs5/v01
 * @return {JSX.Element}
 */
export default function v01() {
  return (
    <>
      <Link href="/3rd/bs5/js/bootstrap.bundle.js"></Link>
      <Container fluid> {/* with fluid > 100% width */}
        <div>Title</div>

      </Container>

      <Button variant="primary">
        Push!
      </Button>

      <Container> {/*  */}
        <div>Result</div>

      </Container>
    </>
  );
}