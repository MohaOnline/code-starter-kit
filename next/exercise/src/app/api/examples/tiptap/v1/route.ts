/**
 * TipTap 编辑器内容 API 路由
 * 用于保存和读取编辑器内容
 */
import { NextResponse } from 'next/server';

// 模拟数据存储
let savedNote = {
  id: '1',
  title: '自定义 Span 属性示例',
  body: `<div><span aria-label="—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过
