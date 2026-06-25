import React, { useState, useEffect, useCallback } from "react";

type DraggableRegionStyle = React.CSSProperties & {
  WebkitAppRegion: "drag" | "no-drag";
};

const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const updateMaximizedStatus = useCallback(async () => {
    const maximized = await window.ipcRenderer.isMaximized();
    setIsMaximized(maximized);
  }, []);

  const minimizeWindow = useCallback(() => {
    window.ipcRenderer.minimize();
  }, []);

  const toggleMaximizeWindow = useCallback(() => {
    window.ipcRenderer.maximize();
    updateMaximizedStatus();
  }, [updateMaximizedStatus]);

  const closeAppWindow = useCallback(() => {
    window.ipcRenderer.close();
  }, []);

  useEffect(() => {
    updateMaximizedStatus();
  }, [updateMaximizedStatus]);

  const MinimizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <rect fill="currentColor" width="10" height="1" x="1" y="6" />
    </svg>
  );

  const MaximizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <rect fill="none" stroke="currentColor" width="9" height="9" x="1.5" y="1.5" />
    </svg>
  );

  const UnmaximizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path fill="none" stroke="currentColor" d="M3.5,3.5 L3.5,1.5 L10.5,1.5 L10.5,8.5 L8.5,8.5 M1.5,3.5 L8.5,3.5 L8.5,10.5 L1.5,10.5 L1.5,3.5" />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path fill="currentColor" d="M1.1,1.1 L10.9,10.9 M10.9,1.1 L1.1,10.9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );

  return (
    <div className="h-10 bg-transparent flex items-center justify-between select-none" style={{ WebkitAppRegion: "drag" } as DraggableRegionStyle}>
      <div className="flex items-center gap-2 px-4 text-gray-400">
        <span
          aria-hidden="true"
          className="h-4.5 w-4.5 shrink-0 bg-current opacity-90 [-webkit-mask-image:url('/logo-race-mind.png')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] mask-[url('/logo-race-mind.png')] mask-center mask-no-repeat mask-contain"
        />
        <span className="text-sm font-medium">RaceMind</span>
      </div>
      <div className="flex h-full" style={{ WebkitAppRegion: "no-drag" } as DraggableRegionStyle}>
        <button onClick={minimizeWindow} className="w-12 h-10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors text-gray-400 hover:text-white" title="Minimize">
          <MinimizeIcon />
        </button>
        <button onClick={toggleMaximizeWindow} className="w-12 h-10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors text-gray-400 hover:text-white" title={isMaximized ? "Restore" : "Maximize"}>
          {isMaximized ? <UnmaximizeIcon /> : <MaximizeIcon />}
        </button>
        <button onClick={closeAppWindow} className="w-12 h-10 flex items-center justify-center hover:bg-red-500/90 transition-colors text-gray-400 hover:text-white" title="Close">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
