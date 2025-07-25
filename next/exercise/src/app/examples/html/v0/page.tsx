export default function Page() {
  return (
    <>
      <h1>一个干净的 HTML 测试页面</h1>
      <p>这是一个用于测试纯净 HTML 和 CSS 的页面。</p>
      
      <div className="test-box">
        <h2>CSS 样式测试</h2>
        <p>这个白色背景的盒子证明CSS样式已经正确加载。</p>
        
        <h3>JavaScript 功能测试</h3>
        <button id="test-button" style={{padding: '10px 20px', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
          点击测试 JavaScript
        </button>
        
        <p style={{marginTop: '15px'}}>
          当前时间: <span id="current-time" style={{fontWeight: 'bold', color: '#007acc'}}>加载中...</span>
        </p>
      </div>
      
      <div className="test-box">
        <h3>技术说明</h3>
        <ul>
          <li>这个页面使用了自定义的 layout.tsx 来覆盖 Next.js 的默认布局</li>
          <li>CSS 文件位于: <code>/public/examples/html/v0/css/style.css</code></li>
          <li>JavaScript 文件位于: <code>/public/examples/html/v0/script/main.js</code></li>
          <li>页面避免了 Next.js 默认注入的额外脚本和样式</li>
        </ul>
      </div>
    </>
  );
}