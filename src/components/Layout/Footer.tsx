const CURRENT_YEAR = new Date().getFullYear();
const DEVELOPER_DISCORD_URL = "https://discord.com/users/239962549871837184";

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.307 1.192-2.02a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .164-.006c3.974 1.817 8.274 1.817 12.218 0a.075.075 0 0 1 .164.006c.127.098.252.196.372.292a.077.077 0 0 1-.009.128 12.81 12.81 0 0 1-1.873.892.077.077 0 0 0-.041.107c.33.713.73 1.39 1.192 2.02a.078.078 0 0 0 .084.028 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
  </svg>
);

const Footer = () => (
  <footer className="mt-6 flex flex-col items-center space-y-8">
    <button onClick={() => window.ipcRenderer.openExternal(DEVELOPER_DISCORD_URL)} className="flex items-center space-x-2 text-gray-500 hover:text-blue-300/80 transition-all duration-300 group border hover:border-blue-500/20 px-8 py-2.5 rounded-full bg-white/1 hover:bg-white/3 cursor-pointer">
      <DiscordIcon />
      <span className="text-base font-semibold">Contact Developer</span>
    </button>
    <div className="flex flex-col items-center space-y-2">
      <span className="text-sm font-normal text-gray-400 capitalize">
        &copy; {CURRENT_YEAR} All rights reserved Made with{" "}
        <span className="text-blue-300 hover:text-blue-400 transition-colors cursor-default normal-case">
          iEarthDEV
        </span>
      </span>
      <span className="text-sm font-medium text-gray-500">
        v1.0.0-beta
      </span>
    </div>
  </footer>
);

export default Footer;
