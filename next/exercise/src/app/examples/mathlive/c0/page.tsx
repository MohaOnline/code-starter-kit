"use client";

import { useEffect } from "react";

export default function MathLiveC0Page() {
  useEffect(() => {
    // Load CSS files
    const cssFiles = ["/3rd/kekule.css", "/3rd/app.20adb9abe9e03fe9841ba13cb745b451.css"];

    const loadedCssLinks: HTMLLinkElement[] = [];

    cssFiles.forEach(href => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      loadedCssLinks.push(link);
    });

    // Load JS files in sequence
    const jsFiles = [
      "/3rd/manifest.5abe310ef2fafcf81b83.js",
      "/3rd/raphael.min.js",
      "/3rd/kekule.js?modules=chemWidget,calculation,algorithm&min=false",
      "/3rd/vendor.e55a4821aab8e14561d1.js",
      "/3rd/app.1cc15c095a577f654c22.js",
    ];

    const loadedScripts: HTMLScriptElement[] = [];

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
        loadedScripts.push(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        for (const src of jsFiles) {
          await loadScript(src);
        }
        console.log("All scripts loaded successfully");
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadAllScripts();

    // Cleanup function
    return () => {
      // Remove CSS links
      loadedCssLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });

      // Remove scripts
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <>
      <div id="app"></div>
    </>
  );
}
