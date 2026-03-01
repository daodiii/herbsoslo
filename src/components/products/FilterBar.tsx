"use client";

import { categories, type Category } from "@/data/products";

interface FilterBarProps {
  active: Category | "All";
  onChange: (category: Category | "All") => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const allCategories: (Category | "All")[] = ["All", ...categories];

  return (
    <div className="sticky top-20 z-30 py-4">
      <div className="glass rounded-[20px] p-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`rounded-full px-5 py-2 font-body text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                active === cat
                  ? "bg-accent-gold text-background"
                  : "text-muted hover:text-foreground hover:bg-[rgba(201,168,76,0.1)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
