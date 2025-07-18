


好的，这非常棒。选择 Tiptap 是一个明智的技术决策。

为了让 AI（如 GPT-4, Claude, Gemini 等）能最高效、最准确地理解并完成这个项目，我们需要提供一系列逻辑清晰、循序渐进且目标明确的提示词 (Prompts)。

以下就是为您精心设计的一整套提示词，您可以按顺序将它们提供给 AI 代码助手。

---

### Master Prompt (主提示词)

在开始之前，先给 AI 一个整体的上下文，让它明白最终目标。

**Prompt 0:**
 "需要添加一个名为‘发声笔记本’的功能。请你作为我的技术伙伴，一步步帮我完成。这个项目的主要技术栈是：Next.js (使用 App Router), TypeScript, Tailwind CSS, shadcn, CodeMirror 编辑器, Prisma ORM, 以及 MySQL 数据库。
 
**核心功能是**：用户可以在codemirror中粘贴或输入文字、数学公式、插入图片。应用会将段落用 p 包裹，自动将段落分割成句子，并为每个句子包裹一个带有特殊属性的 `<span>` 标签，尾部添加喇叭icon做上标。用户可以点击上标来播放对应的语音（由 Azure TTS 合成），用户提供的文本,同时复制放入 aria-label 属性值，共稍后语音合成。内容需要能保存到 MySQL 数据库并能重新加载编辑。

我接下来会分步骤向你提出具体请求，请确保每一步的代码都清晰、健壮并遵循最佳实践。"

---

### 项目开发系列提示词 (按顺序使用)

#### 第1步：项目初始化与数据库配置

**Prompt 1:**
"请为我创建一个全新的 Next.js 项目。
**要求如下:**
1.  使用 `create-next-app`。
2.  集成 TypeScript。
3.  集成 Tailwind CSS。
4.  安装并初始化 Prisma ORM，配置其与 MySQL 数据库连接。
5.  在项目根目录下创建一个 `.env` 文件，并把数据库连接字符串（`DATABASE_URL`）放在里面。
请提供完整的终端命令和需要创建或修改的文件内容。"

#### 第2步：数据库 Schema 与 API 路由

**Prompt 2:**
"现在，请为我们的‘发声笔记本’设计数据库结构并创建相应的 API。
**要求如下:**
1.  在 `schema.prisma` 文件中，创建一个名为 `Note` 的模型 (model)。
2.  `Note` 模型应包含以下字段：
    * `id`: `String`, 主键, 使用 CUID 或 UUID。
    * `title`: `String`, 笔记标题，可以为空。
    * `content`: `Json`, 用于存储 Tiptap 编辑器输出的结构化 JSON 内容。
    * `createdAt`: `DateTime`, 自动记录创建时间。
    * `updatedAt`: `DateTime`, 自动记录更新时间。
3.  运行 Prisma aigration 来将此模型同步到数据库。
4.  创建一套完整的 RESTful API 路由 (`app/api/notes/...`) 来实现对 `Note` 模型的 CRUD (Create, Read, Update, Delete) 操作。请使用 Next.js 的 App Router Route Handlers 来实现。"

#### 第3步：Tiptap 编辑器核心功能 - 自定义节点

**Prompt 3:**
"这是最关键的一步。我们需要创建一个自定义的 Tiptap 节点来表示‘句子’。
**要求如下:**
1.  在项目中创建一个文件，例如 `components/editor/SentenceNode.ts`。
2.  创建一个名为 `SentenceNode` 的 Tiptap Node 扩展。
3.  **节点定义**:
    * 它应该是一个 `inline` 节点。
    * 它应该渲染为一个 HTML `<span>` 标签。
    * 它必须包含两个自定义属性 (attributes)：
        * `data-voice-id`: `string`, 用于存储语音文件的唯一ID。
        * `aria-label`: `string`, 用于存储要发送给 TTS 服务合成的文本。
4.  **实现 `renderHTML`**: 这个方法需要能将节点数据正确渲染为带有 `data-voice-id` 和 `aria-label` 属性的 `<span>` 标签。
5.  **实现 `parseHTML`**: 这个方法需要能正确解析粘贴或加载进来的 HTML，将带有 `data-voice-id` 属性的 `<span>` 标签识别并转换回 `SentenceNode`，同时捕获它的 `data-voice-id` 和 `aria-label` 属性。"

#### 第4步：Tiptap 编辑器核心功能 - 自动处理插件

**Prompt 4:**
"现在，我们需要一个 Tiptap 插件来自动处理用户粘贴的文本。
**要求如下:**
1.  在项目中创建一个文件，例如 `components/editor/PasteHandler.ts`。
2.  创建一个 Tiptap Plugin。
3.  **插件逻辑**:
    * 监听 Tiptap 的 `paste` 事件。
    * 在事件处理函数中，检查粘贴的是否为纯文本 (plain text)。
    * 如果是，则阻止 Tiptap 的默认粘贴行为。
    * 使用一个轻量级的句子分割库（比如 `sentence-splitter`，请先在项目中安装它）将粘贴的文本分割成句子数组。
    * 遍历句子数组，为每个句子创建一个 `SentenceNode` (上一步创建的)。创建时：
        * 使用 `uuid` 库（请先安装）为 `data-voice-id` 生成一个唯一的 UUID。
        * 将句子文本本身设置为 `aria-label` 的初始值。
    * 最后，将这些新创建的 `SentenceNode` 节点包裹在一个段落 (`paragraph`) 中，并作为一个事务 (transaction) 插入到编辑器当前光标位置。"

#### 第5步：Tiptap 编辑器核心功能 - 自定义交互UI

**Prompt 5:**
"我们需要一个界面让用户可以方便地修改每个句子的 `aria-label`。
**要求如下:**
1.  使用 Tiptap for React 的 `BubbleMenu` 组件。
2.  创建一个新的 React 组件，例如 `components/editor/AriaLabelEditor.tsx`，它内部使用 `BubbleMenu`。
3.  **显示逻辑**: 这个 `BubbleMenu` 应该只在用户的光标或选区完全处于一个 `SentenceNode` 内部时才显示。
4.  **UI 内容**: 菜单中应包含一个文本输入框 (`<input type="text">`)。
5.  **数据绑定**:
    * 输入框需要显示当前选中的 `SentenceNode` 的 `aria-label` 属性值。
    * 当用户在输入框中修改内容时，需要立即通过 Tiptap 命令 (command) 更新该节点的 `aria-label` 属性。"

#### 第6步：前后端整合与页面构建

**Prompt 6:**
"现在，我们将所有部分组合起来，构建笔记页面。
**要求如下:**
1.  创建一个页面路由，例如 `app/notes/[id]/page.tsx`。
2.  在这个页面中，使用 `useEffect` 在组件加载时从我们的 API (`/api/notes/[id]`) 获取笔记数据。
3.  创建一个编辑器组件 `components/editor/Editor.tsx`，它初始化 Tiptap 实例，并确保加载了我们自定义的 `SentenceNode` 和 `PasteHandler` 插件。
4.  将从 API 获取的 `content` (JSON格式) 加载到 Tiptap 编辑器中。
5.  在页面上添加一个“保存”按钮。点击时，获取 Tiptap 编辑器的最新内容（使用 `.getJSON()` 方法），并通过 `UPDATE` API (`/api/notes/[id]`) 将其保存到数据库。"

#### 第7步：语音合成与播放

**Prompt 7:**
"最后，我们来实现语音功能。
**要求如下:**
1.  **后端**: 创建一个新的 API 路由 `app/api/tts/route.ts`。它接收一段文本作为输入，使用 Azure Speech SDK for JavaScript（请先安装）调用 Azure TTS 服务，合成语音并以音频文件（如 MP3）的形式返回。注意处理好 Azure Key 和 Region 的安全（使用环境变量）。
2.  **前端**:
    * 在 `Editor.tsx` 组件中，为编辑器内容区域添加一个点击事件的监听器。
    * 如果用户点击的目标是一个带有 `data-voice-id` 属性的 `<span>` 标签：
        * 获取其 `aria-label` 的内容。
        * 调用后端的 `/api/tts` 接口，传递 `aria-label` 的文本。
        * 接收返回的音频数据，并使用 `Audio` 对象播放它。
    * （可选高级功能）实现一个简单的播放队列逻辑，支持循环播放和顺序播放。"

---

### 使用建议

* **分步进行**: 一定要按顺序将 Prompt 提供给 AI，完成并测试好一步再进行下一步。
* **代码审查**: AI 生成的代码可能不是 100% 完美，你需要审查并可能进行微调。特别是在版本兼容性和异步处理上。
* **提供反馈**: 如果 AI 的输出不符合预期，可以向它提供更正信息，例如：“这个实现方式不对，请使用 Tiptap 的 `updateAttributes` 命令来更新节点属性。”

遵循这套提示词，你就能引导 AI 高效地构建出这个功能相当复杂的“发声笔记本”应用。