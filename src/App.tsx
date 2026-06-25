import TitleBar from "./components/Layout/TitleBar";
import Sidebar from "./components/Layout/Sidebar";
import HomePage from "./pages/Home/HomePage";
import FuelPage from "./pages/Fuel/FuelPage";
import GuidePage from "./pages/Guide/GuidePage";
import { useAppStore } from "./store/appStore";

function App() {
  const activeTab = useAppStore((state) => state.activeTab);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0f1420]">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden rounded-tl-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border border-gray-800/80">
            {activeTab === "home" && <HomePage />}
            {activeTab === "fuel" && <FuelPage />}
            {activeTab === "guide" && <GuidePage />}
        </main>
      </div>
    </div>
  );
}

export default App;
