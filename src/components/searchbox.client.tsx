"use client";

import { type KeyboardEventHandler, useCallback, useEffect, useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { font } from "@/src/theme";
import Button from "./button.client";

import "./navBar.css";


export interface LinkItem {
  label: string;
  url: string;
}

const Searchbox: FC = () => {
  const router = useRouter();
  const [searchboxOpen, setSearchboxOpen] = useState(false);
  const onClickSearchButton = useCallback(() => {
    setSearchboxOpen(!searchboxOpen);
  }, [searchboxOpen]);
  const [sbValue, setSbValue] = useState('');
  useEffect(() => {
    setSbValue('');
  }, [searchboxOpen]);
  const search = useCallback(() => {
    const value = sbValue.trim();
    if (value) {
      router.push(`/search?query=${value}`);
    }
  }, [sbValue, router]);
  const handleSearchboxKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(ev => {
    if (ev.key === 'Esc') {
      ev.preventDefault();
      setSearchboxOpen(false);
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      search();
    }
  }, [search]);

  return (
    <div className="px-1 flex items-center justify-center">
      <div
        className={`${searchboxOpen ? 'w-96 max-w-[60vw] opacity-100' : 'w-0 opacity-0 pointer-events-none'} transition-all flex relative`}
      >
        {searchboxOpen && (
          <>
            <input
              aria-label="Searchbox"
              className={`flex-1 border border-gray-500 rounded-sm px-2 py-1 ${font.standardMono.className}`}
              autoFocus
              onKeyDown={handleSearchboxKeyDown}
              value={sbValue}
              onChange={ev => setSbValue(ev.target.value)}
              onBlur={() => setSearchboxOpen(false)}
            />
            <div className="z-10 absolute right-1 top-1/2 -translate-y-1/2 h-full flex items-center justify-center">
              <Button
                className="flex-none inline-block cursor-pointer mr-0 relative z-0 group rounded-full overflow-hidden backdrop-blur-[1px] backdrop-brightness-125"
                aria-label="next"
                onTrigger={search}
              >
                <div
                  className="absolute -z-10 inset-0 bg-background opacity-20 group-hover:opacity-50 pointer-events-none"
                />
                <MagnifyingGlassIcon
                  width="1.2em" height="1.2em"
                  stroke="currentColor"
                  role="presentation"
                  aria-hidden="true"
                  className="m-1 pointer-events-none select-none opacity-75 group-hover:opacity-100 group-focus:opacity-100"
                />
              </Button>
            </div>
          </>
        )}
      </div>
      <Button
        className="flex-none inline-block cursor-pointer hover:opacity-75 focus:opacity-75"
        aria-label="Search in the site"
        onTrigger={onClickSearchButton}
      >
        {searchboxOpen ? (
          <XMarkIcon
            width="1.2em" height="1.2em"
            stroke="currentColor"
            role="presentation"
            aria-hidden="true"
            className="m-2 pointer-events-none select-none"
          />
        ) : (
          <MagnifyingGlassIcon
            width="1.2em" height="1.2em"
            stroke="currentColor"
            role="presentation"
            aria-hidden="true"
            className="m-2 pointer-events-none select-none"
          />
        )}
      </Button>
    </div>
  );
};


export default Searchbox;
