import {useState, useRef, useEffect} from 'react';
import {EditorView, basicSetup} from 'codemirror';
import {EditorState, StateField, StateEffect} from '@codemirror/state';
import {html} from '@codemirror/lang-html';
import {Decoration, DecorationSet} from '@codemirror/view';
import {syntaxTree} from '@codemirror/language';

// 自定义标签高亮效果
const tagHighlightEffect = StateEffect.define();

// 标签高亮装饰器
const tagHighlightField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(decorations, tr) {
    decorations = decorations.map(tr.changes);

    for (let effect of tr.effects) {
      if (effect.is(tagHighlightEffect)) {
        decorations = effect.value;
      }
    }

    return decorations;
  },
  provide: f => EditorView.decorations.from(f)
});

// 创建高亮装饰样式
const tagHighlightMark = Decoration.mark({
  class: "cm-tag-highlight"
});

// 查找匹配的标签对
function findMatchingTags(view, pos) {
  const tree = syntaxTree(view.state);
  const doc = view.state.doc;

  let node = tree.resolveInner(pos);

  // 向上查找到标签节点
  while (node && !['OpenTag', 'CloseTag', 'SelfClosingTag'].includes(node.type.name)) {
    node = node.parent;
  }

  // 如果没找到标签节点，尝试在附近位置查找
  if (!node) {
    // 尝试前后几个字符位置
    for (let offset of [-1, 1, -2, 2]) {
      const testPos = Math.max(0, Math.min(doc.length, pos + offset));
      let testNode = tree.resolveInner(testPos);

      while (testNode && !['OpenTag', 'CloseTag', 'SelfClosingTag'].includes(testNode.type.name)) {
        testNode = testNode.parent;
      }

      if (testNode) {
        node = testNode;
        break;
      }
    }
  }

  // 如果还是没找到，尝试更大范围的搜索
  if (!node) {
    const lineStart = doc.lineAt(pos).from;
    const lineEnd = doc.lineAt(pos).to;
    const lineText = doc.sliceString(lineStart, lineEnd);

    // 在当前行查找标签
    const tagRegex = /<\/?[\w]+[^>]*>/g;
    let match;
    while ((match = tagRegex.exec(lineText)) !== null) {
      const tagStart = lineStart + match.index;
      const tagEnd = tagStart + match[0].length;

      // 如果光标在标签范围内或附近
      if (pos >= tagStart - 2 && pos <= tagEnd + 2) {
        let tagNode = tree.resolveInner(tagStart + 1);
        while (tagNode && !['OpenTag', 'CloseTag', 'SelfClosingTag'].includes(tagNode.type.name)) {
          tagNode = tagNode.parent;
        }
        if (tagNode) {
          node = tagNode;
          break;
        }
      }
    }
  }

  if (!node) return null;

  if (node.type.name === 'SelfClosingTag') {
    return getTagHighlightRanges(doc, node.from);
  }

  // 获取标签名
  const tagText = doc.sliceString(node.from, node.to);
  const tagNameMatch = tagText.match(/<\/?(\w+)/);

  if (!tagNameMatch) return null;

  const tagName = tagNameMatch[1];
  const isOpenTag = node.type.name === 'OpenTag';

  if (isOpenTag) {
    // 查找对应的关闭标签
    const closeTagPattern = new RegExp(`</${tagName}>`);
    let searchPos = node.to;
    let openCount = 1;

    // 简化的标签匹配逻辑
    const text = doc.sliceString(searchPos);
    const openTagRegex = new RegExp(`<${tagName}\\b[^>]*>`, 'g');
    const closeTagRegex = new RegExp(`</${tagName}>`, 'g');

    let match;
    let allMatches = [];

    // 收集所有开始和结束标签
    while ((match = openTagRegex.exec(text)) !== null) {
      allMatches.push({
        type: 'open',
        pos: searchPos + match.index,
        end: searchPos + match.index + match[0].length
      });
    }

    closeTagRegex.lastIndex = 0;
    while ((match = closeTagRegex.exec(text)) !== null) {
      allMatches.push({
        type: 'close',
        pos: searchPos + match.index,
        end: searchPos + match.index + match[0].length
      });
    }

    // 按位置排序
    allMatches.sort((a, b) => a.pos - b.pos);

    // 找到匹配的关闭标签
    let count = 1;
    for (let match of allMatches) {
      if (match.type === 'open') {
        count++;
      }
      else if (match.type === 'close') {
        count--;
        if (count === 0) {
          const openTagRanges = getTagHighlightRanges(doc, node.from);
          const closeTagRanges = getTagHighlightRanges(doc, match.pos);
          return [...openTagRanges, ...closeTagRanges];
        }
      }
    }
  }
  else {
    // 查找对应的开始标签
    const openTagPattern = new RegExp(`<${tagName}\\b[^>]*>`);
    let searchText = doc.sliceString(0, node.from);
    let openCount = 1;

    // 从后往前搜索
    const openTagRegex = new RegExp(`<${tagName}\\b[^>]*>`, 'g');
    const closeTagRegex = new RegExp(`</${tagName}>`, 'g');

    let allMatches = [];
    let match;

    while ((match = openTagRegex.exec(searchText)) !== null) {
      allMatches.push({
        type: 'open',
        pos: match.index,
        end: match.index + match[0].length
      });
    }

    closeTagRegex.lastIndex = 0;
    while ((match = closeTagRegex.exec(searchText)) !== null) {
      allMatches.push({
        type: 'close',
        pos: match.index,
        end: match.index + match[0].length
      });
    }

    // 按位置倒序排序
    allMatches.sort((a, b) => b.pos - a.pos);

    // 找到匹配的开始标签
    let count = 1;
    for (let match of allMatches) {
      if (match.type === 'close') {
        count++;
      }
      else if (match.type === 'open') {
        count--;
        if (count === 0) {
          const openTagRanges = getTagHighlightRanges(doc, match.pos);
          const closeTagRanges = getTagHighlightRanges(doc, node.from);
          return [...openTagRanges, ...closeTagRanges];
        }
      }
    }
  }

  return null;
}

// 获取标签的高亮部分（标签名 + 结束符号，跳过属性）
function getTagHighlightRanges(doc, from) {
  const text = doc.sliceString(from);
  const ranges = [];

  // 匹配开始标签
  const openMatch = text.match(/<(\w+)([^>]*)>/);
  if (openMatch) {
    const tagName = openMatch[1];
    const attributes = openMatch[2].trim();

    // 如果没有属性，高亮整个标签
    if (!attributes) {
      ranges.push({
        from: from,
        to: from + openMatch[0].length
      });
    }
    else {
      // 有属性时，分别高亮标签名和结束符号
      ranges.push({
        from: from,
        to: from + tagName.length + 1 // +1 for '<'
      });

      // 高亮 > 部分
      const closingBracketPos = from + openMatch[0].length - 1;
      ranges.push({
        from: closingBracketPos,
        to: closingBracketPos + 1
      });
    }

    return ranges;
  }

  // 匹配结束标签
  const closeMatch = text.match(/^<\/(\w+)>/);
  if (closeMatch) {
    ranges.push({
      from: from,
      to: from + closeMatch[0].length
    });
    return ranges;
  }

  // 如果上面都没匹配到，可能是在标签内部，尝试更宽松的匹配
  const fallbackMatch = text.match(/<[^>]+>/);
  if (fallbackMatch) {
    ranges.push({
      from: from,
      to: from + fallbackMatch[0].length
    });
  }

  return ranges;
}

// 获取标签结束位置（包括整个标签）
function getTagNameEnd(doc, from) {
  const text = doc.sliceString(from);
  const match = text.match(/<(\w+)[^>]*>/);
  if (match) {
    return from + match[0].length;
  }
  // 如果是结束标签
  const closeMatch = text.match(/<\/(\w+)>/);
  if (closeMatch) {
    return from + closeMatch[0].length;
  }
  return from;
}

// 处理标签高亮的通用函数
function handleTagHighlight(view, pos) {
  if (pos !== null) {
    const matchingTags = findMatchingTags(view, pos);

    if (matchingTags) {
      const decorations = Decoration.set(
        matchingTags.map(tag => tagHighlightMark.range(tag.from, tag.to))
      );

      view.dispatch({
        effects: tagHighlightEffect.of(decorations)
      });
    }
    else {
      view.dispatch({
        effects: tagHighlightEffect.of(Decoration.none)
      });
    }
  }
}

// 鼠标移动和光标位置变化扩展
const tagHighlightExtension = [
  EditorView.domEventHandlers({
    mousemove(event, view) {
      const pos = view.posAtCoords({x: event.clientX, y: event.clientY});
      handleTagHighlight(view, pos);
    },

    mouseleave(event, view) {
      view.dispatch({
        effects: tagHighlightEffect.of(Decoration.none)
      });
    }
  }),

  EditorView.updateListener.of((update) => {
    if (update.selectionSet) {
      const pos = update.state.selection.main.head;
      handleTagHighlight(update.view, pos);
    }
  })
];

// 自定义样式主题
const tagHighlightTheme = EditorView.theme({
  ".cm-tag-highlight": {
    backgroundColor: "#e3f2fd",
    borderRadius: "2px",
    border: "1px solid #2196f3",
  }
});

export default function CodeMirrorV02() {
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>示例页面</title>
</head>
<body>
    <div class="container">
        <h1>欢迎来到我的网站</h1>
        <p class="site">这是一个段落。</p>
        <div class="content">
            <p>这是另一个段落。</p>
            <ul>
                <li>列表项 1</li>
                <li>列表项 2</li>
            </ul>
        </div>
    </div>
</body>
</html>`);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          html(),
          tagHighlightField,
          tagHighlightExtension,
          tagHighlightTheme,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setCode(update.state.doc.toString());
            }
          })
        ]
      });

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{marginBottom: '20px', color: '#333'}}>
        CodeMirror 6 - HTML 编辑器示例
      </h1>

      <div style={{marginBottom: '15px', color: '#666'}}>
        <p><strong>功能说明：</strong></p>
        <ul>
          <li>将鼠标移动到 HTML 标签上或光标停留在标签处可以高亮显示匹配的开始和结束标签</li>
          <li>高亮包括完整的开始标签（包括 &gt; 符号）和结束标签</li>
          <li>支持嵌套标签的正确匹配</li>
          <li>自闭合标签（如 &lt;br/&gt;）会高亮整个标签</li>
          <li>选择文本范围时会清除高亮效果</li>
        </ul>
      </div>

      <div
        ref={editorRef}
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          minHeight: '400px'
        }}
      />

      <div style={{marginTop: '20px'}}>
        <h3 style={{color: '#333'}}>当前代码长度: {code.length} 字符</h3>
      </div>

      <style jsx global>{`
          .cm-editor {
              height: 400px;
          }

          .cm-focused {
              outline: none;
          }

          .cm-tag-highlight {
              animation: highlight-pulse 0.3s ease-in-out;
          }

          @keyframes highlight-pulse {
              0% {
                  opacity: 0.5;
              }
              100% {
                  opacity: 1;
              }
          }
      `}</style>
    </div>
  );
}
