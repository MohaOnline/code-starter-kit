可以！有几种方案让 Popper 跟随鼠标的 X 位置：

方案 1: 使用虚拟元素（推荐）
创建一个虚拟的定位元素，位置跟随鼠标：

// 在组件顶部添加
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// 修改 mouseover 处理函数，记录鼠标位置
const handleVoiceSpanMouseOver = useCallback((event) => {
if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
if (currentHoveredSpanRef.current === event.target) {
return;
}
event.stopPropagation();
currentHoveredSpanRef.current = event.target;

    // 记录鼠标位置
    setMousePosition({ x: event.clientX, y: event.clientY });
    setPopperAnchorEl(event.target);
    clearTimeout(popperToolbarCloseTimerRef.current);
}
}, []);

// 创建虚拟定位元素
const virtualElement = useMemo(() => {
if (!popperAnchorEl) return null;

return {
getBoundingClientRect: () => ({
width: 0,
height: 0,
top: mousePosition.y,
right: mousePosition.x,
bottom: mousePosition.y,
left: mousePosition.x,
x: mousePosition.x,
y: mousePosition.y,
}),
};
}, [popperAnchorEl, mousePosition]);

// 修改 Popper 组件
const PopperToolbar = memo(() => {
return (
<>
{popperAnchorEl && virtualElement && (
<Popper
open={Boolean(popperAnchorEl)}
anchorEl={virtualElement}  // 使用虚拟元素
placement="top"
modifiers={[
{name: 'offset', options: {offset: [0, 8]}},
{name: 'preventOverflow', options: {boundary: 'viewport'}}
]}
sx={{zIndex: 1300}}
>
{/* ... Paper 内容 ... */}
</Popper>
)}
</>
);
});
方案 2: 使用 Popper 的自定义 modifier
更精确地控制位置：

const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

const handleVoiceSpanMouseOver = useCallback((event) => {
if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
if (currentHoveredSpanRef.current === event.target) {
return;
}
event.stopPropagation();
currentHoveredSpanRef.current = event.target;

    // 记录鼠标位置
    setMousePosition({ x: event.clientX, y: event.clientY });
    setPopperAnchorEl(event.target);
    clearTimeout(popperToolbarCloseTimerRef.current);
}
}, []);

const PopperToolbar = memo(() => {
return (
<>
{popperAnchorEl && (
<Popper
open={Boolean(popperAnchorEl)}
anchorEl={popperAnchorEl}
placement="top"
modifiers={[
{
name: 'offset',
options: {offset: [0, 8]}
},
{
name: 'preventOverflow',
options: {boundary: 'viewport'}
},
{
// 自定义 modifier：调整 X 位置到鼠标位置
name: 'customPosition',
enabled: true,
phase: 'main',
fn: ({ state }) => {
// 获取 span 的位置
const spanRect = popperAnchorEl.getBoundingClientRect();

                // 计算鼠标相对于 span 的偏移
                const offsetX = mousePosition.x - spanRect.left;
                
                // 调整 Popper 的 X 位置
                state.styles.popper.transform = 
                  `translate(${offsetX}px, ${state.styles.popper.transform.match(/translate\([^,]+,\s*([^)]+)\)/)?.[1] || '0px'})`;
                
                return state;
              },
            },
          ]}
          sx={{zIndex: 1300}}
        >
          <Paper elevation={4}
                 onMouseEnter={handlePopperToolbarMouseEnter}
                 onMouseLeave={handlePopperToolbarMouseLeave}
                 sx={{
                   display: 'flex',
                   alignItems: 'center',
                   px: 0.5,
                   py: 0.25,
                   borderRadius: 1,
                   pointerEvents: 'auto'
                 }}
          >
            {/* ... 按钮内容 ... */}
          </Paper>
        </Popper>
      )}
    </>
);
});
方案 3: 简单版 - 使用 offset modifier（最简单）
const [mouseX, setMouseX] = useState(0);

const handleVoiceSpanMouseOver = useCallback((event) => {
if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
if (currentHoveredSpanRef.current === event.target) {
return;
}
event.stopPropagation();
currentHoveredSpanRef.current = event.target;

    // 计算鼠标相对于 span 的位置
    const spanRect = event.target.getBoundingClientRect();
    const relativeX = event.clientX - spanRect.left - spanRect.width / 2;
    setMouseX(relativeX);
    
    setPopperAnchorEl(event.target);
    clearTimeout(popperToolbarCloseTimerRef.current);
}
}, []);

const PopperToolbar = memo(() => {
return (
<>
{popperAnchorEl && (
<Popper
open={Boolean(popperAnchorEl)}
anchorEl={popperAnchorEl}
placement="top"
modifiers={[
{
name: 'offset',
options: {
offset: [mouseX, 8]  // X 偏移跟随鼠标
}
},
{
name: 'preventOverflow',
options: {boundary: 'viewport'}
}
]}
sx={{zIndex: 1300}}
>
{/* ... Paper 内容 ... */}
</Popper>
)}
</>
);
});
推荐使用方案 3（最简单实用）
这是最简单且效果好的方案。完整代码修改：

// 添加状态
const [mouseOffsetX, setMouseOffsetX] = useState(0);

// 修改 mouseover 处理
const handleVoiceSpanMouseOver = useCallback((event) => {
if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
if (currentHoveredSpanRef.current === event.target) {
return;
}
event.stopPropagation();
currentHoveredSpanRef.current = event.target;

    // 计算鼠标相对于 span 中心的偏移
    const spanRect = event.target.getBoundingClientRect();
    const spanCenterX = spanRect.left + spanRect.width / 2;
    const offsetX = event.clientX - spanCenterX;
    setMouseOffsetX(offsetX);
    
    setPopperAnchorEl(event.target);
    clearTimeout(popperToolbarCloseTimerRef.current);
}
}, []);

// 修改 Popper 的 modifiers
modifiers={[
{name: 'offset', options: {offset: [mouseOffsetX, 8]}},
{name: 'preventOverflow', options: {boundary: 'viewport'}}
]}
这样 Popper 的 X 位置就会跟随鼠标了，减少误操作的可能性。