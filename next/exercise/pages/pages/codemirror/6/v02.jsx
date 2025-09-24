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

  if (!node) return null;

  if (node.type.name === 'SelfClosingTag') {
    return [{
      from: node.from,
      to: node.to
    }];
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
          return [
            {from: node.from, to: getTagNameEnd(doc, node.from)},
            {from: match.pos, to: match.end}
          ];
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
          return [
            {from: match.pos, to: getTagNameEnd(doc, match.pos)},
            {from: node.from, to: node.to}
          ];
        }
      }
    }
  }

  return null;
}

// 获取标签名结束位置（不包括属性）
function getTagNameEnd(doc, from) {
  const text = doc.sliceString(from);
  const match = text.match(/<(\w+)/);
  if (match) {
    return from + match[0].length;
  }
  return from;
}

// 鼠标移动扩展
const tagHighlightExtension = EditorView.domEventHandlers({
  mousemove(event, view) {
    const pos = view.posAtCoords({x: event.clientX, y: event.clientY});

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
  },

  mouseleave(event, view) {
    view.dispatch({
      effects: tagHighlightEffect.of(Decoration.none)
    });
  }
});

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
          <li>将鼠标移动到 HTML 标签上可以高亮显示匹配的开始和结束标签</li>
          <li>只高亮标签名部分，不包括属性</li>
          <li>支持嵌套标签的正确匹配</li>
          <li>自闭合标签（如 &lt;br/&gt;）会高亮整个标签</li>
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
