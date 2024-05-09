"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);
      // once deployed, prefix this with your cloudflare worker url
      // i.e.: https://<name>.<account-name>.workers.dev/api/search?q=${input}

      const res = await fetch(`/api/search?q=${input}`);
      const data = await res.json();
      setSearchResults(data);
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 items-center duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-6xl tracking-tight font-bold">SpeedSearch ⚡</h1>
        <p className="text-2xl max-w-prose text-center">
          A high-performance API built with Hono, Next.js and Cloudflare. <br />{" "}
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xl">⌘ J</span>
          </kbd>{" "}
          or Press the button{" "}
          <Button size="sm" onClick={handleOpen}>
            Search
          </Button>{" "}
          & Type a query and get your results in milliseconds.
        </p>

        <div className="w-full">
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search countries..."
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full" />
                  <p className="p-2 text-xs">
                    Found {searchResults.results.length} results in{" "}
                    {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </main>
  );
}

Home.propTypes = {
  searchResults: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
  }),
};
