import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { ScentFamily } from '../types/fragrance';

interface FilterBarProps {
  selectedFamily: ScentFamily;
  onSelectFamily: (family: ScentFamily) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

const FAMILIES: ScentFamily[] = [
  'All Fragrances',
  'Woody & Smoky',
  'Amber & Resinous',
  'Floral & Solar',
  'Fresh & Oceanic',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedFamily,
  onSelectFamily,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="w-full bg-[#121212]/95 border-y border-[#262626] py-5 sticky top-20 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Scent Family Interactive Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto scrollbar-none pb-1 lg:pb-0">
            {FAMILIES.map((family) => {
              const isActive = selectedFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => onSelectFamily(family)}
                  className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap shrink-0 rounded transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF8F5] text-[#0D0D0D] font-semibold shadow-sm'
                      : 'text-[#99948A] hover:text-[#FAF8F5] hover:bg-[#1C1C1C]'
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>

          {/* Search by Note or Mood + Result Counter */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search notes (e.g. Vanilla, Bergamot, Rum, Oud)..."
                className="w-full bg-[#171717] border border-[#2B2B2B] focus:border-[#DA4F37] text-xs text-[#FAF8F5] placeholder-[#666259] rounded px-3 py-2 pl-9 pr-8 outline-none transition-colors font-sans"
              />
              <Search className="w-3.5 h-3.5 text-[#666259] absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666259] hover:text-[#FAF8F5]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-[11px] font-mono text-[#807B73] whitespace-nowrap shrink-0">
              <span className="text-[#FAF8F5] font-semibold">{totalCount}</span> {totalCount === 1 ? 'Creation' : 'Creations'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
