/*
  https://www.drupal.org/project/imce Drupal 的文件管理器
  https://tiptap.dev/    公式编辑需要 Pro 版本
  https://prosemirror.net/
  https://github.com/ajaxorg/ace    好像只有浏览器引用
  https://platejs.org/docs/examples/equation    多人协作 Editor，HTML不一定干净
  https://ckeditor.com/docs/ckeditor4/latest/examples/fileupload.html 有经验
  https://ckeditor.com/cke4/addon/mathjax https://ckeditor.com/docs/ckeditor4/latest/examples/mathjax.html
  https://ckeditor.com/cke4/addon/mathedit  挺好用的公式编辑器，要熟悉Tax
  https://ckeditor.com/cke4/addon/FMathEditor config.extraPlugins = 'FMathEditor'; 可视化公式编辑器

  https://github.com/mathjax/MathJax-demos-node/tree/master/node-mathjax/server

  https://lexical.dev/docs/getting-started/react
  https://lexical.dev/docs/intro
  http://mathquill.com/
  https://www.nextjs.cn/learn/basics/create-nextjs-app
  https://mhchem.github.io/MathJax-mhchem/
  https://docs.strapi.io/cms/quick-start
  https://github.com/editor-js/awesome-editorjs?tab=readme-ov-file

  */

import NavTop from '@/app/lib/components/NavTop.js';
import React from 'react';

const homepage = () => {
  return (
      <>
        <NavTop/>
      </>
  );
};

export default async function Page() {
  return homepage();
}
