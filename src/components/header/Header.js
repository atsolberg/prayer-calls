import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import q from "../../util/element";
import { useBibles } from "../../providers/BiblesProvider";

import Dropdown from "../dropdown/Dropdown";
import Search from "../search/Search";
import Sun from "../icons/Sun";
import Moon from "../icons/Moon";
import Magnifier from "../icons/Magnifier";
import { Btn } from "../button/Button";

function BibleMenuItem({ item, ctx }) {
  if (ctx === "button") return item.abbreviationLocal;

  return (
    <div>
      <div className="py-2 border-dashed border-b border-1 border-slate-500">
        {item.abbreviationLocal}
      </div>
      <div className="py-2">{item.nameLocal}</div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-5 mx-4 border-1 border-r border-slate-300 dark:border-slate-700" />
  );
}

function Header() {
  const [bible, setBible, bibles] = useBibles();
  const [searching, setSearching] = useState(false);

  function onTheme() {
    const root = q("html");
    const isDark = q.is(root, ".dark");
    if (isDark) {
      localStorage.theme = "light";
      root.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      root.classList.add("dark");
    }
  }

  function onSearch() {
    setSearching(!searching);
  }
  function onHideSearch() {
    setSearching(false);
  }

  // Handle open(⌘ + k), close(esc) on keyboard
  useEffect(() => {
    function keydown({ metaKey, ctrlKey, mod = metaKey || ctrlKey, keyCode }) {
      if (mod && keyCode === 75 /* k */) setSearching(true);
      if (searching && keyCode === 27 /* esc */) setSearching(false);
    }
    function click({ target }) {
      if (searching && !q.closest(target, "#search-modal")) setSearching(false);
    }

    return q.addListeners(document, { keydown, click });
  }, [searching]);

  return (
    <header
      className={cx([
        "sticky",
        "w-full",
        "top-0",
        "z-40",
        "transition-colors",
        "duration-500",

        "border-b",
        "border-slate-200",
        "dark:border-slate-700",
        "dark:border-slate-50/[0.06]",

        "backdrop-blur",
        "bg-white/75",
        "dark:bg-slate-900/75",
      ])}
    >
      <div className="mx-auto w-11/12 md:w-10/12 lg:w-9/12">
        <div className="py-3">
          <div className="relative flex items-center">
            <Link to="/" className="">
              🙏&nbsp;&nbsp;☎️
            </Link>

            <div className="relative flex items-center ml-auto">
              <div className="hidden md:contents">
                <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                  {/* Nav Links */}
                  <ul className="flex space-x-8 items-center">
                    <li>
                      <Link className="hover:text-sky-500" to="/about">
                        About
                      </Link>
                    </li>
                  </ul>
                </nav>

                <Divider />
              </div>

              <Dropdown
                placeholder="Bible..."
                size="sm"
                drop="right"
                overrides={{ button: "dark:!ring-0" }}
                items={Object.values(bibles.byId)}
                initial={bibles.byId[bible]}
                onSelect={({ selectedItem }) => {
                  setBible(selectedItem);
                }}
                valuer={(item) => item.id}
                labeler={BibleMenuItem}
              />

              <Divider />

              {/* Search Toggle */}
              <Btn
                id="search-toggle"
                onClick={onSearch}
                className="p-1 rounded -ml-2 -mr-2"
              >
                <span className="sr-only">Search</span>
                <Magnifier className="w-6 h-6 text-sky-500" />
              </Btn>

              <Divider />

              {/* Theme Toggle */}
              <Btn
                id="theme-toggle"
                onClick={onTheme}
                className="p-1 rounded -ml-2"
              >
                <span className="sr-only">Theme</span>
                <Sun className="dark:hidden w-6 h-6 text-sky-500" />
                <Moon className="hidden dark:inline w-6 h-6 text-sky-500" />
              </Btn>
            </div>
          </div>
        </div>
      </div>
      <Search id="search-modal" active={searching} onHide={onHideSearch} />
    </header>
  );
}

export default Header;
