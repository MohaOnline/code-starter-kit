// DynamicArticlePopover.jsx
import React, {useRef, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';

export default function DynamicArticlePopover() {
  const [html, setHtml] = useState(''); // html from backend
  const containerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null); // the hovered span element
  const closeTimerRef = useRef(null);

  // 1) Fetch HTML from backend once (示例)
  useEffect(() => {
    async function fetchHtml() {
      // 示例：你可以替换为真实的 API 调用
      // const r = await fetch('/api/article');
      // const text = await r.text();
      const demo = `
        <p>Some text before. <span data-voice-id="abc123">Hello world</span> and another <span data-voice-id="id-2">click me</span>.</p>
        <p>More content with <span data-voice-id="x-999">第三个 span</span>.</p>
      `;
      // IMPORTANT: sanitize the HTML in real app, e.g. DOMPurify.sanitize(text)
      setHtml(demo);
    }

    fetchHtml();
  }, []);

  // helpers to open / close with small delay to allow moving into Popper
  const openForSpan = (spanEl) => {
    if (!spanEl) return;
    clearTimeout(closeTimerRef.current);
    setAnchorEl(spanEl);
  };

  const startCloseTimer = (delay = 150) => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, delay);
  };

  // 2) Event delegation for dynamic spans
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    function onMouseOver(e) {
      // only interested in element nodes
      const target = e.target;
      if (!(target instanceof Element)) return;
      const span = target.closest('span[data-voice-id]');
      if (span && root.contains(span)) {
        openForSpan(span);
      }
    }

    function onMouseOut(e) {
      // when the pointer leaves a span (or its children), start close timer
      const related = e.relatedTarget;
      const from = e.target;
      if (!(from instanceof Element)) return;
      const leftSpan = from.closest('span[data-voice-id]');
      if (!leftSpan) return;
      // If moving from span to popper or into same span, we handle in popper handlers.
      // Start a short close timer; popper mouseenter will cancel it.
      startCloseTimer(150);
    }

    root.addEventListener('mouseover', onMouseOver);
    root.addEventListener('mouseout', onMouseOut);

    return () => {
      root.removeEventListener('mouseover', onMouseOver);
      root.removeEventListener('mouseout', onMouseOut);
      clearTimeout(closeTimerRef.current);
    };
  }, [containerRef.current]);

  // Popper mouse handlers
  const handlePopperMouseEnter = () => {
    clearTimeout(closeTimerRef.current);
  };
  const handlePopperMouseLeave = () => {
    startCloseTimer(150);
  };

  // Button click handler: logs span text and data-voice-id
  const handleActionClick = (actionName) => {
    if (!anchorEl) return;
    const text = anchorEl.textContent;
    const voiceId = anchorEl.getAttribute('data-voice-id');
    console.log('action:', actionName, {text, voiceId});
    // 你可以在这里执行你要的操作（播放音频、打开 modal、请求接口等）
  };

  return (
    <Box sx={{p: 2}}>
      <Paper sx={{p: 2}}>
        <h3>Article (dynamic HTML)</h3>
        <article
          ref={containerRef}
          // WARNING: sanitize real backend HTML (e.g. DOMPurify)
          dangerouslySetInnerHTML={{__html: html}}
        />
      </Paper>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="top"
        modifiers={[
          {name: 'offset', options: {offset: [0, 8]}},
          {name: 'preventOverflow', options: {boundary: 'viewport'}}
        ]}
        sx={{zIndex: 1300}}
      >
        <Paper
          elevation={4}
          onMouseEnter={handlePopperMouseEnter}
          onMouseLeave={handlePopperMouseLeave}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 0.5,
            py: 0.25,
            borderRadius: 1,
            pointerEvents: 'auto' // ensure popper can receive pointer
          }}
        >
          <Tooltip title="Play">
            <IconButton size="small" onClick={() => handleActionClick('play')}>
              <PlayArrowIcon fontSize="small"/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Bold">
            <IconButton size="small" onClick={() => handleActionClick('bold')}>
              <FormatBoldIcon fontSize="small"/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Info">
            <IconButton size="small" onClick={() => handleActionClick('info')}>
              <InfoIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
        </Paper>
      </Popper>
    </Box>
  );
}
