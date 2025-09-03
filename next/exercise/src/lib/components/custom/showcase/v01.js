import React, {useState, useRef, useCallback} from 'react';

const ResponsiveShowcase = ({children}) => {
  const [selectedSize, setSelectedSize] = useState('md');
  const [customWidth, setCustomWidth] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Predefined breakpoint widths
  const breakpoints = {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setCustomWidth(null);
  };

  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = containerRef.current.offsetWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.max(200, startWidthRef.current + deltaX);

      setCustomWidth(`${newWidth}px`);
      setSelectedSize(null); // Clear toolbar selection when dragging
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  }, []);

  const getCurrentWidth = () => {
    if (customWidth) return customWidth;
    return selectedSize ? breakpoints[selectedSize] : breakpoints.md;
  };

  return (
    <section className="w-full p-4 bg-gray-50 min-h-screen">
      {/* Toolbar */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm border max-w-fit mx-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700 mr-2">Width:</span>
          {Object.keys(breakpoints).map((size) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`px-3 py-1 text-sm rounded transition-colors ${selectedSize === size && !customWidth
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
          {customWidth && (
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                            Custom: {customWidth}
                        </span>
          )}
        </div>
      </div>

      {/* Scrollable Container for Div */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center min-w-full">
          {/* Resizable Container */}
          <div
            ref={containerRef}
            className="relative bg-white border-2 border-dashed border-gray-300 min-h-96 transition-all duration-200 ease-out"
            style={{
              width: getCurrentWidth(),
              minWidth: getCurrentWidth()
            }}
          >
            {/* Content Area */}
            <div className="p-4 h-full">
              {children}
            </div>

            {/* Drag Handle */}
            <div
              className={`absolute top-0 right-0 w-2 h-full cursor-ew-resize bg-blue-500 opacity-0 hover:opacity-100 transition-opacity ${isDragging ? 'opacity-100' : ''
              }`}
              onMouseDown={handleMouseDown}
              style={{
                background: isDragging
                  ? 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)'
                  : '#3b82f6'
              }}
            />

            {/* Resize indicator */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 pointer-events-none">
              {getCurrentWidth()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveShowcase;