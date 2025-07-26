'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Upload, 
  Image as ImageIcon, 
  File, 
  Save, 
  Undo, 
  Redo, 
  Eye, 
  Edit3,
  Trash2,
  Plus,
  Search,
  Grid,
  List
} from 'lucide-react'
import Image from 'next/image'

// 媒体文件接口定义 / Media file interface definition
interface MediaFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadDate: Date
  thumbnail?: string
}

// 内容块接口定义 / Content block interface definition
interface ContentBlock {
  id: string
  type: 'text' | 'image' | 'heading' | 'paragraph'
  content: string
  mediaId?: string
  styles?: Record<string, string>
}

// 文档接口定义 / Document interface definition
interface Document {
  id: string
  title: string
  blocks: ContentBlock[]
  lastModified: Date
}

/**
 * Payload CMS 编辑器示例页面
 * 演示类似 Payload CMS 的编辑器和媒体管理器功能
 * 
 * 主要功能：
 * 1. 可视化内容编辑器
 * 2. 媒体文件管理器
 * 3. 编辑器与媒体管理器的无缝集成
 * 4. 实时预览和自动保存
 * 
 * 技术栈：Next.js 15, TypeScript, Tailwind CSS, Shadcn UI
 */
export default function PayloadEditorDemo() {
  // 客户端渲染状态 / Client-side rendering state
  const [isClient, setIsClient] = useState(false)
  
  // 媒体文件状态管理 / Media files state management
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)
  const [mediaViewMode, setMediaViewMode] = useState<'grid' | 'list'>('grid')
  const [mediaSearchTerm, setMediaSearchTerm] = useState('')
  
  // 文档内容状态管理 / Document content state management
  const [document, setDocument] = useState<Document>({
    id: '1',
    title: '新文档',
    blocks: [
      {
        id: '1',
        type: 'heading',
        content: '欢迎使用 Payload 编辑器示例'
      },
      {
        id: '2', 
        type: 'paragraph',
        content: '这是一个演示 Payload CMS 编辑器功能的示例页面。您可以编辑文本、上传媒体文件，并将它们集成到您的内容中。'
      }
    ],
    lastModified: new Date()
  })
  
  // 编辑器状态管理 / Editor state management
  const [isEditing, setIsEditing] = useState(true)
  const [history, setHistory] = useState<Document[]>([document])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  
  // 文件上传引用 / File upload reference
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 确保客户端渲染 / Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // 文件上传处理 / File upload handler
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newMedia: MediaFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          url: e.target?.result as string,
          uploadDate: new Date(),
          thumbnail: file.type.startsWith('image/') ? e.target?.result as string : undefined
        }
        
        setMediaFiles(prev => [...prev, newMedia])
      }
      reader.readAsDataURL(file)
    })
    
    // 清空文件输入 / Clear file input
    if (event.target) {
      event.target.value = ''
    }
  }, [])
  
  // 拖拽上传处理 / Drag and drop upload handler
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    
    // 模拟文件输入事件 / Simulate file input event
    const mockEvent = {
      target: { files }
    } as React.ChangeEvent<HTMLInputElement>
    
    handleFileUpload(mockEvent)
  }, [handleFileUpload])
  
  // 添加内容块 / Add content block
  const addContentBlock = useCallback((type: ContentBlock['type'], content: string = '', mediaId?: string) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      content,
      mediaId
    }
    
    const updatedDocument = {
      ...document,
      blocks: [...document.blocks, newBlock],
      lastModified: new Date()
    }
    
    setDocument(updatedDocument)
    
    // 添加到历史记录 / Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(updatedDocument)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [document, history, historyIndex])
  
  // 更新内容块 / Update content block
  const updateContentBlock = useCallback((blockId: string, content: string) => {
    const updatedDocument = {
      ...document,
      blocks: document.blocks.map(block => 
        block.id === blockId ? { ...block, content } : block
      ),
      lastModified: new Date()
    }
    
    setDocument(updatedDocument)
    
    // 自动保存逻辑 / Auto-save logic
    if (autoSaveEnabled) {
      // 这里可以添加实际的保存逻辑 / Add actual save logic here
      console.log('自动保存文档 / Auto-saving document:', updatedDocument.title)
    }
  }, [document, autoSaveEnabled])
  
  // 删除内容块 / Delete content block
  const deleteContentBlock = useCallback((blockId: string) => {
    const updatedDocument = {
      ...document,
      blocks: document.blocks.filter(block => block.id !== blockId),
      lastModified: new Date()
    }
    
    setDocument(updatedDocument)
    
    // 添加到历史记录 / Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(updatedDocument)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [document, history, historyIndex])
  
  // 撤销操作 / Undo operation
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setDocument(history[historyIndex - 1])
    }
  }, [history, historyIndex])
  
  // 重做操作 / Redo operation
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setDocument(history[historyIndex + 1])
    }
  }, [history, historyIndex])
  
  // 插入媒体到编辑器 / Insert media into editor
  const insertMedia = useCallback((media: MediaFile) => {
    addContentBlock('image', media.name, media.id)
    setSelectedMedia(null)
  }, [addContentBlock])
  
  // 过滤媒体文件 / Filter media files
  const filteredMediaFiles = mediaFiles.filter(file => 
    file.name.toLowerCase().includes(mediaSearchTerm.toLowerCase())
  )
  
  // 格式化文件大小 / Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 / Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payload CMS 编辑器示例
          </h1>
          <p className="text-gray-600">
            演示类似 Payload CMS 的可视化编辑器和媒体管理器功能
          </p>
        </div>
        
        {/* 工具栏 / Toolbar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Input
                  value={document.title}
                  onChange={(e) => setDocument(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg font-semibold border-none shadow-none p-0 h-auto"
                  placeholder="文档标题"
                />
                <Badge variant="secondary">
                  最后修改: {isClient ? document.lastModified.toLocaleTimeString() : '加载中...'}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex === 0}
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {isEditing ? '编辑' : '预览'}
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 媒体管理器 / Media Manager */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>媒体管理器</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMediaViewMode(mediaViewMode === 'grid' ? 'list' : 'grid')}
                    >
                      {mediaViewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索媒体文件..."
                    value={mediaSearchTerm}
                    onChange={(e) => setMediaSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {/* 文件上传区域 / File upload area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:border-gray-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    拖拽文件到此处或
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    选择文件
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                
                {/* 媒体文件列表 / Media files list */}
                <div className={`space-y-2 max-h-96 overflow-y-auto ${
                  mediaViewMode === 'grid' ? 'grid grid-cols-2 gap-2 space-y-0' : ''
                }`}>
                  {filteredMediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`border rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMedia?.id === file.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedMedia(file)}
                    >
                      {mediaViewMode === 'grid' ? (
                        <div className="text-center">
                          {file.thumbnail ? (
                            <Image
                              src={file.thumbnail}
                              alt={file.name}
                              width={80}
                              height={80}
                              className="w-full h-20 object-cover rounded mb-2"
                            />
                          ) : (
                            <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                              <File className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <p className="text-xs text-gray-600 truncate">{file.name}</p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          {file.thumbnail ? (
                            <Image
                              src={file.thumbnail}
                              alt={file.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <File className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* 选中媒体的操作 / Selected media actions */}
                {selectedMedia && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">
                      已选择: {selectedMedia.name}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => insertMedia(selectedMedia)}
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        插入
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setMediaFiles(prev => prev.filter(f => f.id !== selectedMedia.id))
                          setSelectedMedia(null)
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        删除
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* 编辑器区域 / Editor area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>内容编辑器</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addContentBlock('heading', '新标题')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      标题
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addContentBlock('paragraph', '新段落')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      段落
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={isEditing ? "edit" : "preview"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edit" onClick={() => setIsEditing(true)}>编辑模式</TabsTrigger>
                    <TabsTrigger value="preview" onClick={() => setIsEditing(false)}>预览模式</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="edit" className="space-y-4 mt-4">
                    {document.blocks.map((block) => (
                      <div key={block.id} className="group relative border rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteContentBlock(block.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        
                        {block.type === 'heading' && (
                          <Input
                            value={block.content}
                            onChange={(e) => updateContentBlock(block.id, e.target.value)}
                            className="text-2xl font-bold border-none shadow-none p-0 h-auto"
                            placeholder="输入标题..."
                          />
                        )}
                        
                        {block.type === 'paragraph' && (
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateContentBlock(block.id, e.target.value)}
                            className="border-none shadow-none p-0 resize-none"
                            placeholder="输入段落内容..."
                            rows={3}
                          />
                        )}
                        
                        {block.type === 'image' && block.mediaId && (
                          <div className="space-y-2">
                            {(() => {
                              const media = mediaFiles.find(f => f.id === block.mediaId)
                              return media ? (
                                <div className="relative">
                                  <Image
                                    src={media.url}
                                    alt={media.name}
                                    width={600}
                                    height={400}
                                    className="w-full max-w-md h-auto rounded-lg"
                                  />
                                  <Input
                                    value={block.content}
                                    onChange={(e) => updateContentBlock(block.id, e.target.value)}
                                    className="mt-2"
                                    placeholder="图片说明..."
                                  />
                                </div>
                              ) : (
                                <div className="text-red-500">媒体文件未找到</div>
                              )
                            })()} 
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="preview" className="space-y-4 mt-4">
                    <div className="prose max-w-none">
                      {document.blocks.map((block) => {
                        if (block.type === 'heading') {
                          return (
                            <h2 key={block.id} className="text-2xl font-bold text-gray-900 mb-4">
                              {block.content || '未命名标题'}
                            </h2>
                          )
                        }
                        
                        if (block.type === 'paragraph') {
                          return (
                            <p key={block.id} className="text-gray-700 leading-relaxed mb-4">
                              {block.content || '空段落'}
                            </p>
                          )
                        }
                        
                        if (block.type === 'image' && block.mediaId) {
                          const media = mediaFiles.find(f => f.id === block.mediaId)
                          return media ? (
                            <figure key={block.id} className="mb-6">
                              <Image
                                src={media.url}
                                alt={media.name}
                                width={600}
                                height={400}
                                className="w-full max-w-md h-auto rounded-lg shadow-md"
                              />
                              {block.content && (
                                <figcaption className="text-sm text-gray-600 mt-2 italic">
                                  {block.content}
                                </figcaption>
                              )}
                            </figure>
                          ) : (
                            <div key={block.id} className="text-red-500 mb-4">
                              媒体文件未找到
                            </div>
                          )
                        }
                        
                        return null
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}