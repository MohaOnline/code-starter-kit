"use client";

import { useState } from "react";
import { preprocessTextWithSentenceSplitter } from "@/app/lib/utils";

/**
 * 测试 sentence-splitter 功能的页面
 * Test page for sentence-splitter functionality
 */
export default function TestSentenceSplitterPage() {
  const [inputText, setInputText] = useState(
    '那为何一波三折能成为我们认识世界的一剂良药呢？我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。'
  );
  const [processedText, setProcessedText] = useState("");

  const handleProcess = () => {
    try {
      const result = preprocessTextWithSentenceSplitter(inputText);
      setProcessedText(result);
    } catch (error) {
      console.error("处理文本时出错:", error);
      setProcessedText("处理文本时出错: " + (error as Error).message);
    }
  };

  const testCases = [
    {
      name: '中文测试文本',
      text: '那为何一波三折能成为我们认识世界的一剂良药呢？我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。'
    },
    {
      name: '英文测试文本',
      text: 'This is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.'
    },
    {
      name: '中英文混合',
      text: 'Hello world! 这是一个测试句子。How are you? 你好吗？'
    },
    {
      name: '混合处理测试（部分已处理）',
      text: '<p><span aria-label="这是已经处理过的第一个句子。" data-speaker="" data-voice-id="">这是已经处理过的第一个句子。</span><span aria-label="这是已经处理过的第二个句子！" data-speaker="" data-voice-id="">这是已经处理过的第二个句子！</span></p>\n\n这是新添加的未处理段落第一句。这是新添加的未处理段落第二句？\n\n<p><span aria-label="这是另一个已处理的段落。" data-speaker="" data-voice-id="">这是另一个已处理的段落。</span></p>\n\n最后这是一个全新的未处理段落。它包含多个句子！你能看到区别吗？'
    },
    {
      name: '需要拆分的已处理段落',
      text: '<p><span aria-label="这是第一句。这是第二句！这是第三句？" data-speaker="" data-voice-id="">这是第一句。这是第二句！这是第三句？</span></p>'
    },
    {
      name: '英文句子空格测试',
      text: 'This is the first English sentence. This is the second sentence! Is this the third sentence? This is the final sentence.'
    },
    {
      name: '用户反馈的段落问题测试',
      text: '—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n\n人们认识事物，须经过多个不同阶段，这些阶段如台阶般层层递升，将我们逐渐带往更高的认识层次。在此过程中，先跳脱出事物本身，将眼光拓展、放远，能使我们更好地回归，形成更深的认识。如音乐或文学，在最初接触时，我们都处于一种熟悉的"本土"环境中，因此容易被环境所局限，产生"身在山中"而不能知其真面目的情况。我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n\n<p><span aria-label="那为何一波三折能成为我们认识世界的一剂良药呢？我认为，不\"出\"就无法知大方，无法扩大境界；不再次\"入\"便无法将方法化为己用。" data-speaker="" data-voice-id="">那为何一波三折能成为我们认识世界的一剂良药呢？我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。</span><span aria-label="为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。" data-speaker="" data-voice-id="">为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。</span><span aria-label="无怪乎如今的高等教育，多提倡\"通识教育\"，在专注进行某一行业的学习之前，要先从\"百家之长\"中充分汲取营养。" data-speaker="" data-voice-id="">无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。</span><span aria-label="这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。" data-speaker="" data-voice-id="">这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。</span></p>'
    },
    {
      name: '五段文本测试（用户反馈）',
      text: '—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n人们认识事物，须经过多个不同阶段，这些阶段如台阶般层层递升，将我们逐渐带往更高的认识层次。在此过程中，先跳脱出事物本身，将眼光拓展、放远，能使我们更好地回归，形成更深的认识。如音乐或文学，在最初接触时，我们都处于一种熟悉的"本土"环境中，因此容易被环境所局限，产生"身在山中"而不能知其真面目的情况。我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n<p><span aria-label="那为何一波三折能成为我们认识世界的一剂良药呢？" data-speaker="" data-voice-id="">那为何一波三折能成为我们认识世界的一剂良药呢？</span><span aria-label="我认为，不\"出\"就无法知大方，无法扩大境界；不再次\"入\"便无法将方法化为己用。" data-speaker="" data-voice-id="">我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。</span><span aria-label="为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。" data-speaker="" data-voice-id="">为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。</span><span aria-label="无怪乎如今的高等教育，多提倡\"通识教育\"，在专注进行某一行业的学习之前，要先从\"百家之长\"中充分汲取营养。" data-speaker="" data-voice-id="">无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。</span><span aria-label="这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。" data-speaker="" data-voice-id="">这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。</span></p>\nThis is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.\n我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。'
    },
    {
          name: '中英文混合三段测试',
          text: 'This is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.\n我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\nThis is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.'
        },
        {
          name: '四个自然段测试（用户反馈）',
          text: 'This is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.\n我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\nThis is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.\n我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。'
        },
        {
          name: '混合已处理和未处理段落测试（用户反馈）',
          text: '—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n人们认识事物，须经过多个不同阶段，这些阶段如台阶般层层递升，将我们逐渐带往更高的认识层次。在此过程中，先跳脱出事物本身，将眼光拓展、放远，能使我们更好地回归，形成更深的认识。如音乐或文学，在最初接触时，我们都处于一种熟悉的"本土"环境中，因此容易被环境所局限，产生"身在山中"而不能知其真面目的情况。我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。\n<p><span aria-label="那为何一波三折能成为我们认识世界的一剂良药呢？" data-speaker="" data-voice-id="">那为何一波三折能成为我们认识世界的一剂良药呢？</span><span aria-label="我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。" data-speaker="" data-voice-id="">我认为，不"出"就无法知大方，无法扩大境界；不再次"入"便无法将方法化为己用。</span><span aria-label="为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。" data-speaker="" data-voice-id="">为自己的认识体系添砖加瓦，应当是个人认知探索的最终目的，所以才有此兜兜转转。</span><span aria-label="无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。" data-speaker="" data-voice-id="">无怪乎如今的高等教育，多提倡"通识教育"，在专注进行某一行业的学习之前，要先从"百家之长"中充分汲取营养。</span><span aria-label="这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。" data-speaker="" data-voice-id="">这样的认知才是扎根于广阔的大地之上的，这样的人才也是会自我成长的。</span></p>\nThis is a test sentence. Another sentence follows here! And here is a question? Finally, this is the last sentence.\n我们往往自信站得足够近，占尽了先天的优势，但其实也不过"看山是山"罢了。'
        },
        {
          name: 'HTML段落后紧跟文本测试（用户最新反馈）',
          text: '<p><span data-speaker="narrator" data-voice-id="zh-CN-XiaoxiaoNeural" aria-label="这是已处理的段落。">这是已处理的段落。</span></p>\n这是紧跟的第一段未处理文本。\n这是紧跟的第二段未处理文本。'
        }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Sentence Splitter 测试页面</h1>

      <div className="space-y-6">
        {/* 输入区域 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">输入文本</h2>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入要处理的文本..."
          />
          <button
            onClick={handleProcess}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            处理文本
          </button>
        </div>

        {/* 输出区域 */}
        {processedText && (
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">处理结果</h2>
            <div className="bg-white p-4 rounded border">
              <h3 className="text-sm font-medium text-gray-600 mb-2">HTML 代码:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap">{processedText}</pre>
            </div>
            <div className="mt-4 bg-white p-4 rounded border">
              <h3 className="text-sm font-medium text-gray-600 mb-2">渲染效果:</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: processedText }} />
            </div>
          </div>
        )}

        {/* 测试用例 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">预设测试用例</h2>
          <div className="space-y-3">
            {testCases.map((testCase, index) => (
              <div key={index} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{testCase.name}</h3>
                  <button
                    onClick={() => setInputText(testCase.text)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    使用此文本
                  </button>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{testCase.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 说明文档 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">功能说明</h2>
          <div className="text-blue-700 space-y-2">
            <p>
              • 使用 <code className="bg-blue-100 px-1 rounded">sentence-splitter</code> 库进行智能句子分割
            </p>
            <p>• 支持中文和英文文本的句子识别</p>
            <p>
              • 自动将每个句子包装在 <code className="bg-blue-100 px-1 rounded">&lt;span&gt;</code> 标签中
            </p>
            <p>
              • 为每个句子添加 <code className="bg-blue-100 px-1 rounded">aria-label</code> 和{" "}
              <code className="bg-blue-100 px-1 rounded">data-voice-id</code> 属性
            </p>
            <p>
              • 支持段落分割，每个段落包装在 <code className="bg-blue-100 px-1 rounded">&lt;p&gt;</code> 标签中
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
