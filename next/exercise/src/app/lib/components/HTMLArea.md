用 CodeMirror 做一个 NextJS 15 能用的 component：
    - 支持 onChange 事件
    - 支持 value 属性
    - Component 分左右两栏，左边是 codemirror，接收html，右边是实时预览区，实时预览支持 html 渲染；能用 MathJax 和 mhchem 扩展渲染公式。
    - 预览部分随着 codemirror 内容变化而变化， codemirror 向下滚动，预览部分滚动到相应内容；
    - 为 CodeMirror 配工具条，暂时支持插入以下代码
        - <p></p>
        - <span  aria-label="" speaker="" data_voice_id=""></span>
        -  \(  \) 
        - <img aria-label="" speaker="" data_voice_id="" src=""/>
