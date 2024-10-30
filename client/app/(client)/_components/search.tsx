"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const onHandleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue) {
      router.push(`/search?q=${searchValue}`, { scroll: true });
    }
  };

  const onClickSearchIcon = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative">
      <SearchIcon
        onClick={onClickSearchIcon}
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <Input
        ref={inputRef}
        className="rounded-full border-none bg-muted pl-12 pr-14"
        value={searchValue}
        onChange={onChangeSearchValue}
        onKeyDown={onHandleKeyDown}
        placeholder="Tìm kiếm sản phẩm..."
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
};

export default Search;
