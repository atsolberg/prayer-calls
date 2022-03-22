function Footer() {
  return (
    <footer className="text-sm leading-6 mt-12 border-t border-slate-200 dark:border-slate-700">
      <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
        <div className="py-2 sm:py-10 sm:flex justify-between text-slate-500">
          <div className="mb-6 sm:mb-0 flex items-center">
            Built by Solberg LLC with
            <a href="https://www.reactjs.org" target="_blank" rel="noreferrer">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                alt=""
                className="h-3 inline mx-1"
              />
            </a>{" "}
            and
            <a href="https://www.nodejs.org" target="_blank" rel="noreferrer">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE1IDE1IiB3aWR0aD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgNC4yMTI4MUw3LjUgMC40MjExNDNMMSA0LjIxMjgxVjEwLjc4NzJMMi4wMDYzNCAxMS4zNzQyTDQuMDYyNjQgMTAuNTQyMkM0LjYyOTIxIDEwLjMxMyA1LjAwMDA0IDkuNzYyOSA1LjAwMDA0IDkuMTUxNzFWNEg2LjAwMDA0VjkuMTUxNzFDNi4wMDAwNCAxMC4xNzA0IDUuMzgyIDExLjA4NzEgNC40Mzc3MiAxMS40NjkyTDMuMDk4MjYgMTIuMDExMkw3LjUgMTQuNTc4OEwxNCAxMC43ODcyVjQuMjEyODFaTTcgNkM3IDQuODk1NDMgNy44OTU0MyA0IDkgNEgxMC4xNjY3QzExLjE3OTIgNCAxMiA0LjgyMDgxIDEyIDUuODMzMzNWNkgxMVY1LjgzMzMzQzExIDUuMzczMSAxMC42MjY5IDUgMTAuMTY2NyA1SDlDOC40NDc3MiA1IDggNS40NDc3MiA4IDZDOCA2LjU1MjI4IDguNDQ3NzIgNyA5IDdIMTBDMTEuMTA0NiA3IDEyIDcuODk1NDMgMTIgOUMxMiAxMC4xMDQ2IDExLjEwNDYgMTEgMTAgMTFIOUM3Ljg5NTQzIDExIDcgMTAuMTA0NiA3IDlIOEM4IDkuNTUyMjggOC40NDc3MiAxMCA5IDEwSDEwQzEwLjU1MjMgMTAgMTEgOS41NTIyOCAxMSA5QzExIDguNDQ3NzIgMTAuNTUyMyA4IDEwIDhIOUM3Ljg5NTQzIDggNyA3LjEwNDU3IDcgNloiIGZpbGw9IiM4NGJhNjQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
                alt=""
                className="h-3 inline ml-1"
              />
            </a>
          </div>
          <a
            className="flex hover:text-slate-400 dark:hover:text-slate-300"
            href="https://github.com/atsolberg/prayer-calls"
            target="_blank"
            rel="noreferrer"
          >
            Source on GitHub <span className="sr-only">Code on GitHub</span>
            <svg
              viewBox="0 0 16 16"
              className="w-5 h-5 ml-2"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
