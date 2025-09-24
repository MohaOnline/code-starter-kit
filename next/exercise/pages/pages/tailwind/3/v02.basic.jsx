import {Typography} from "@mui/material";
import Link from "next/link";
import React from "react";

export function Tailwind3V02Basic() {
  return (<>
    <Typography variant="h6" gutterBottom>Tailwind v3 待飞预备 <Link className={``} target={'_blank'}
                                                                 href={`https://v3.tailwindcss.com/docs/preflight`}>preflight</Link> 样式重置</Typography>
    <ul className={`list-disc list-inside`}>
      <li>没有边距 margin</li>
      <li>标题、列表无样式</li>
      <li>图片和其他替换元素（如 svg 、 video 、 canvas 等）默认是 display: block 。</li>
      <li><Link target={'_blank'} href={`https://unpkg.com/tailwindcss@3.4.17/src/css/preflight.css`}>完整 css</Link></li>
    </ul>

  </>)
}
