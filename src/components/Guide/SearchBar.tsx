import React from "react";
import { Search } from "lucide-react";
import { useGuideStore } from "../../store/guideStore";

const SearchBar = React.memo(() => {
  const searchQuery = useGuideStore((state) => state.searchQuery);
  const setSearchQuery = useGuideStore((state) => state.setSearchQuery);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search guides..."
        aria-label="Search guides"
        className="w-full bg-[#0d111c]/35 text-sm text-gray-200 pl-9 pr-3 py-2 rounded-lg border border-zinc-700/45 focus:border-blue-500/45 focus:bg-[#0d111c]/70 transition-all outline-none placeholder:text-neutral-600"
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
