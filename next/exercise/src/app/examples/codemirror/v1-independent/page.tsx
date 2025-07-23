'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Code, 
  FileText, 
  Eye, 
  Tag, 
  Image, 
  Link, 
  List, 
  Table,
  Bold,
  Italic,
  Underline
} from 'lucide-react'

// 常用 HTML 标签模板
const HTML_TEMPLATES = {
  // 基础标签
  heading1: '<h1></h1>',
  heading2: '<h2></h2>',
  heading3: '<h3></h3>',
  paragraph: '<p></p>',
  div: '<div></div>',
  span: '<span></span>',
  
  // 文本格式
  bold: '<strong></strong>',
  italic: '<em></em>',
  underline: '<u></u>',
  
  // 链接和媒体
  link: '<a href=""></a>',
  image: '<img src="" alt="" />',
  
  // 列表
  unorderedList: '<ul>\n  <li></li>\n  <li></li>\n</ul>',
  orderedList: '<ol>\n  <li></li>\n  <li></li>\n</ol>',
  
  // 表格
  table: '<table>\n  <thead>\n    <tr>\n      <th></th>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td></td>\n      <td></td>\n    </tr>\n  </tbody>\n</table>',
  
  // 表单
  form: '<form>\n  <input type="text" placeholder="" />\n  <button type="submit">Submit</button>\n</form>',
  input: '<input type="text" placeholder="" />',
  textarea: '<textarea placeholder=""></textarea>',
  button: '<button></button>',
  
  // 布局
  section: '<section>\n  \n</section>',
  article: '<article>\n  \n</article>',
  header: '<header>\n  \n</header>',
  footer: '<footer>\n  \n</footer>',
  nav: '<nav>\n  \n</nav>'
}

// 工具栏按钮配置
const TOOLBAR_BUTTONS = [
  { key: 'heading1', label: 'H1', icon: Tag },
  { key: 'heading2', label: 'H2', icon: Tag },
  { key: 'heading3', label: 'H3', icon: Tag },
  { key: 'paragraph', label: 'P', icon: FileText },
  { key: 'bold', label: 'Bold', icon: Bold },
  { key: 'italic', label: 'Italic', icon: Italic },
  { key: 'underline', label: 'U', icon: Underline },
  { key: 'link', label: 'Link', icon: Link },
  { key: 'image', label: 'Image', icon: Image },
  { key: 'unorderedList', label: 'UL', icon: List },
  { key: 'orderedList', label: 'OL', icon: List },
  { key: 'table', label: 'Table', icon: Table },
  { key: 'div', label: 'Div', icon: Code },
]

interface CodeMirrorHtmlEditorProps {}

export default function CodeMirrorHtmlEditor({}: CodeMirrorHtmlEditorProps) {
  // 编辑器状态管理
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>Start editing your HTML code in the left panel to see live preview here. This is a comprehensive HTML editor with real-time preview functionality.</p>
    
    <div class="section">
        <h2>Section 1: Introduction</h2>
        <p>This is the first section of our HTML document. It contains various elements to demonstrate the editor's capabilities.</p>
        <ul>
            <li>Real-time HTML preview</li>
            <li>Syntax highlighting with CodeMirror</li>
            <li>Quick HTML tag insertion</li>
            <li>Responsive layout design</li>
            <li>Theme switching support</li>
            <li>Scroll synchronization</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Section 2: Features</h2>
        <p>Our HTML editor provides numerous features for web developers:</p>
        <ol>
            <li>Live preview updates as you type</li>
            <li>Syntax highlighting for better code readability</li>
            <li>Quick insertion of common HTML elements</li>
            <li>Responsive design that works on all devices</li>
            <li>Dark and light theme support</li>
            <li>Scroll synchronization between editor and preview</li>
        </ol>
    </div>
    
    <div class="section">
        <h2>Section 3: Code Examples</h2>
        <p>Here are some examples of HTML elements you can create:</p>
        <h3>Tables</h3>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Live Preview</td>
                    <td>Real-time HTML rendering</td>
                    <td>✅ Active</td>
                </tr>
                <tr>
                    <td>Syntax Highlighting</td>
                    <td>CodeMirror integration</td>
                    <td>✅ Active</td>
                </tr>
                <tr>
                    <td>Theme Support</td>
                    <td>Dark/Light mode switching</td>
                    <td>✅ Active</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2>Section 4: Forms</h2>
        <p>Example form elements:</p>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name">
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email">
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" placeholder="Enter your message"></textarea>
            
            <button type="submit">Submit</button>
        </form>
    </div>
    
    <div class="section">
        <h2>Section 5: Additional Content</h2>
        <p>This section contains additional content to ensure the editor has enough content for scrolling tests.</p>
        <h3>Subsection 5.1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h3>Subsection 5.2</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h3>Subsection 5.3</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>
    
    <div class="section">
        <h2>Section 6: More Content</h2>
        <p>Even more content to test scrolling functionality.</p>
        <ul>
            <li>Item 1: First test item</li>
            <li>Item 2: Second test item</li>
            <li>Item 3: Third test item</li>
            <li>Item 4: Fourth test item</li>
            <li>Item 5: Fifth test item</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Section 7: Final Section</h2>
        <p>This is the final section of our test document. It should provide enough content to enable scrolling in the CodeMirror editor.</p>
        <p>The scroll synchronization feature should now work properly with this extended content.</p>
    </div>
</body>
</html>`)
  
  const { theme } = useTheme()
  console.log('当前主题: .............', theme)
  
  // 引用管理
  const toolbarRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLIFrameElement>(null)
  const codeMirrorRef = useRef<any>(null) // CodeMirror 实例引用
  const [isToolbarSticky, setIsToolbarSticky] = useState(false)
  const [toolbarOriginalTop, setToolbarOriginalTop] = useState(0)
  
  // 滚动同步状态
  const [isScrollSyncing, setIsScrollSyncing] = useState(false)
  
  // 工具栏置顶效果监听 - 修复置顶逻辑
  useEffect(() => {
    const handleScroll = () => {
      if (toolbarRef.current) {
        const rect = toolbarRef.current.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        
        // 记录工具栏原始位置
        if (toolbarOriginalTop === 0 && !isToolbarSticky) {
          setToolbarOriginalTop(scrollTop + rect.top)
        }
        
        // 判断是否需要置顶：当前滚动位置超过工具栏原始位置
        const shouldStick = scrollTop > toolbarOriginalTop
        setIsToolbarSticky(shouldStick)
      }
    }
    
    // 初始化时记录位置
    if (toolbarRef.current && toolbarOriginalTop === 0) {
      const rect = toolbarRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setToolbarOriginalTop(scrollTop + rect.top)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toolbarOriginalTop, isToolbarSticky])
  
  // 编辑器滚动同步到预览区 - 支持自定义滚动比例
  const handleEditorScroll = useCallback((scrollTop: number = 0, scrollHeight: number = 100, clientHeight: number = 100, customScrollRatio?: number) => {
    console.log('🔄 滚动事件触发:', { scrollTop, scrollHeight, clientHeight, customScrollRatio, isScrollSyncing })
    
    if (isScrollSyncing || !previewRef.current) {
      console.log('⏸️ 滚动同步跳过:', { isScrollSyncing, hasPreviewRef: !!previewRef.current })
      return
    }
    
    setIsScrollSyncing(true)
    
    try {
      const previewDocument = previewRef.current.contentDocument
      if (!previewDocument) {
        console.log('❌ 无法访问预览文档')
        return
      }
      
      console.log('📊 预览文档状态:', {
        scrollHeight: previewDocument.documentElement.scrollHeight,
        clientHeight: previewDocument.documentElement.clientHeight,
        currentScrollTop: previewDocument.documentElement.scrollTop
      })
      
      // 计算滚动比例 - 优先使用自定义比例
      let scrollRatio: number
      if (customScrollRatio !== undefined) {
        scrollRatio = Math.max(0, Math.min(1, customScrollRatio))
        console.log('🎯 使用自定义滚动比例:', scrollRatio.toFixed(3))
      } else {
        const maxEditorScroll = Math.max(0, scrollHeight - clientHeight)
        scrollRatio = maxEditorScroll > 0 ? scrollTop / maxEditorScroll : 0
        console.log('📐 编辑器滚动计算:', { maxEditorScroll, scrollRatio })
      }
      
      // 计算预览区对应的滚动位置
      const previewScrollHeight = previewDocument.documentElement.scrollHeight
      const previewClientHeight = previewDocument.documentElement.clientHeight
      const maxPreviewScroll = Math.max(0, previewScrollHeight - previewClientHeight)
      
      // 应用相同的滚动比例到预览区
      const targetScrollTop = scrollRatio * maxPreviewScroll
      
      console.log('🎯 预览区滚动计算:', {
        previewScrollHeight,
        previewClientHeight,
        maxPreviewScroll,
        targetScrollTop,
        finalScrollRatio: scrollRatio.toFixed(3),
        beforeScroll: previewDocument.documentElement.scrollTop
      })
      
      previewDocument.documentElement.scrollTop = targetScrollTop
      
      console.log('✅ 滚动同步完成:', {
        afterScroll: previewDocument.documentElement.scrollTop,
        success: Math.abs(previewDocument.documentElement.scrollTop - targetScrollTop) < 1
      })
      
    } catch (error) {
      console.warn('❌ 预览滚动同步失败:', error)
    }
    
    // 防止循环触发
    setTimeout(() => setIsScrollSyncing(false), 50)
  }, [isScrollSyncing])
  
  // 页面滚动同步监听器 - 基于中心基准线的智能同步
  useEffect(() => {
    console.log('🚀 初始化页面滚动同步监听器')
    
    const handlePageScroll = () => {
      if (isScrollSyncing || !codeMirrorRef.current || !editorRef.current || !previewRef.current) {
        return
      }
      
      try {
        const editor = codeMirrorRef.current.view
        if (!editor) return
        
        // 获取编辑器容器的位置信息
        const editorRect = editorRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const centerLineY = viewportHeight / 2 // 中心基准线位置
        
        console.log('📏 页面滚动检测:', {
          scrollY: window.scrollY,
          editorTop: editorRect.top,
          editorBottom: editorRect.bottom,
          centerLineY,
          editorHeight: editorRect.height
        })
        
        // 计算编辑器中心基准线相对于编辑器顶部的偏移
        const centerOffsetInEditor = centerLineY - editorRect.top
        
        // 如果中心基准线在编辑器范围内
        if (centerOffsetInEditor >= 0 && centerOffsetInEditor <= editorRect.height) {
          // 计算中心基准线对应的代码行
          const lineHeight = 20 // 估算行高
          const approximateLine = Math.floor(centerOffsetInEditor / lineHeight)
          const totalLines = htmlCode.split('\n').length
          const normalizedLine = Math.max(0, Math.min(approximateLine, totalLines - 1))
          
          // 计算滚动比例
          const scrollRatio = normalizedLine / Math.max(1, totalLines - 1)
          
          console.log('🎯 中心基准线代码定位:', {
            centerOffsetInEditor,
            approximateLine,
            normalizedLine,
            totalLines,
            scrollRatio: scrollRatio.toFixed(3)
          })
          
          // 同步预览区域滚动
          handleEditorScroll(0, 100, 100, scrollRatio)
        } else {
          console.log('📍 中心基准线不在编辑器范围内')
        }
        
      } catch (error) {
        console.warn('❌ 页面滚动同步失败:', error)
      }
    }
    
    // 节流处理，避免过于频繁的滚动事件
    let scrollTimer: NodeJS.Timeout | null = null
    const throttledScrollHandler = () => {
      if (scrollTimer) return
      scrollTimer = setTimeout(() => {
        handlePageScroll()
        scrollTimer = null
      }, 16) // 约60fps
    }
    
    console.log('🔧 绑定页面滚动监听器...')
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    console.log('✅ 页面滚动监听器绑定完成')
    
    return () => {
      console.log('🧹 清理页面滚动监听器')
      window.removeEventListener('scroll', throttledScrollHandler)
      if (scrollTimer) {
        clearTimeout(scrollTimer)
      }
    }
  }, [handleEditorScroll, isScrollSyncing, htmlCode])
  
  // CodeMirror 扩展配置
  const extensions = useMemo(() => [
    html(), // HTML 语法支持
  ], [])
  
  // 主题配置 - 修复水合错误：确保服务端和客户端一致
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const editorTheme = useMemo(() => {
    // 在组件挂载前使用默认主题，避免水合错误
    if (!mounted) return undefined
    return theme === 'dark' ? oneDark : undefined
  }, [theme, mounted])
  
  // 插入 HTML 标签的处理函数 - 改进为在光标位置插入
  const insertHtmlTag = useCallback((templateKey: keyof typeof HTML_TEMPLATES) => {
    const template = HTML_TEMPLATES[templateKey]
    if (!template || !codeMirrorRef.current) return
    
    try {
      const view = codeMirrorRef.current.view
      if (view) {
        // 获取当前光标位置
        const selection = view.state.selection.main
        const cursorPos = selection.head
        
        // 在光标位置插入模板
        const transaction = view.state.update({
          changes: {
            from: cursorPos,
            insert: template
          },
          selection: {
            anchor: cursorPos + template.length
          }
        })
        
        view.dispatch(transaction)
        view.focus() // 保持编辑器焦点
      }
    } catch (error) {
      console.warn('Failed to insert at cursor position, falling back to end insertion:', error)
      // 降级处理：如果光标插入失败，仍然在末尾插入
      setHtmlCode(prev => {
        const bodyEndIndex = prev.lastIndexOf('</body>')
        if (bodyEndIndex !== -1) {
          return prev.slice(0, bodyEndIndex) + '    ' + template + '\n' + prev.slice(bodyEndIndex)
        }
        return prev + '\n' + template
      })
    }
  }, [])
  
  // 代码变更处理
  const handleCodeChange = useCallback((value: string) => {
    setHtmlCode(value)
  }, [])
  
  return (
    <div className="min-h-screen bg-background">
      {/* 页面标题 */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">CodeMirror 6 HTML Editor</h1>
            <div className="ml-auto flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Live Preview</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 工具栏占位空间 - 防止置顶时内容跳跃 */}
      {isToolbarSticky && <div className="h-[60px]" />}
      
      {/* 工具栏 */}
      <div 
        ref={toolbarRef}
        className={`border-b transition-all duration-200 ${
          isToolbarSticky 
            ? 'fixed top-0 left-0 right-0 z-50 shadow-md bg-background/95 backdrop-blur-sm' 
            : 'relative bg-card'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground mr-2">Quick Insert:</span>
            {TOOLBAR_BUTTONS.map((button) => {
              const IconComponent = button.icon
              return (
                <Button
                  key={button.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => insertHtmlTag(button.key as keyof typeof HTML_TEMPLATES)}
                  className="h-8 px-2 text-xs"
                  title={`Insert ${button.label}`}
                >
                  <IconComponent className="h-3 w-3 mr-1" />
                  {button.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className={`container mx-auto px-4 py-4 ${isToolbarSticky ? 'pt-6' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] relative">
          {/* 中心对齐线 - 固定在视口50%高度的虚线 */}
          <div className="fixed left-0 right-0 z-20 pointer-events-none" 
               style={{ top: '50vh', transform: 'translateY(-50%)' }}>
            <div className="w-full h-px bg-blue-400/40 border-t border-dashed border-blue-400/60 shadow-sm"></div>
            <div className="absolute left-4 -top-2 text-xs text-blue-400/80 bg-background/90 px-2 py-0.5 rounded shadow-sm border border-blue-400/20">
              对齐基准线 (固定)
            </div>
          </div>
          
          {/* 编辑器面板 */}
          <div className="flex flex-col relative">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">HTML Editor</span>
            </div>
            <div className="flex-1 border rounded-lg overflow-hidden">
              <div ref={editorRef} className="h-full">
                <CodeMirror
                  ref={codeMirrorRef}
                  value={htmlCode}
                  onChange={handleCodeChange}
                  extensions={extensions}
                  theme={editorTheme}
                  className="h-full"
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    highlightSelectionMatches: false,
                    searchKeymap: true,
                  }}
                  style={{
                    fontSize: '14px',
                    height: '100%',
                  }}

                />
              </div>
            </div>
          </div>
          
          {/* 预览面板 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Live Preview</span>
            </div>
            <div className="flex-1 border rounded-lg overflow-hidden bg-white">
              <iframe
                ref={previewRef}
                srcDoc={htmlCode}
                className="w-full h-full border-0"
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部信息 */}
      <div className="border-t bg-card mt-4">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Lines: {htmlCode.split('\n').length}</span>
              <span>Characters: {htmlCode.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>CodeMirror 6</span>
              <Separator orientation="vertical" className="h-3" />
              <span>HTML Editor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}