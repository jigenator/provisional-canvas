import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="relative flex items-center">
      <Search className="text-fg-muted pointer-events-none absolute left-2 h-3.5 w-3.5" />
      <Input
        type="search"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 pr-7 pl-7 text-sm"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-0.5 h-6 w-6"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

export { SearchInput };
export type { SearchInputProps };
