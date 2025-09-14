你现在把整個 PNG 导入对象当成了 img 的 src，所以最终渲染成了 [object Object]。在 Next.js 15 中，导入 PNG 会得到一个对象（包含 src、width、height 等），而不是字符串 URL。修复方法有两种：

- 简单修复（保持 <img>）：让 Piece 接受 string 或带 src 的对象，并在渲染时取正确的字符串。
- 或者使用 next/image 组件，直接传入导入对象。

以下是保持 <img> 的最小改动方案：

```
// ... existing code ...

type PieceProps = {
  image: string | { src: string };
  alt: string;
};

// ... existing code ...

function Piece({image, alt}: PieceProps) {
  const src = typeof image === 'string' ? image : image.src;
  return <img css={imageStyles} src={src} alt={alt} draggable="false"/>; // draggable set to false to prevent dragging of the images
}

export function King() {
  return <Piece image={king} alt="King"/>;
}

export function Pawn() {
  return <Piece image={pawn} alt="Pawn"/>;
// ... existing code ...
```


说明：
- 将 PieceProps.image 改为 string | { src: string }，兼容构建产物为对象的情况。
- 在 Piece 里统一提取字符串 src 后再渲染。

可选方案（若你更偏好框架组件）：改用 next/image 并直接传入 king/pawn 对象即可，需要引入 Image，并把 <img> 替换为 <Image src={image} alt={alt} draggable={false} />。如果需要我给出这套改动的具体代码，也可以继续发我。