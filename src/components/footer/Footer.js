function Footer() {
  return (
    <footer className="text-sm leading-6 mt-12">
      <div className="p-2 sm:p-10 border-t border-slate-200 sm:flex justify-between text-slate-500 dark:border-slate-200/5">
        <div className="mb-6 sm:mb-0 sm:flex">
          <p>Copyright © 2022 Solberg LLC.</p>
        </div>
        <a
          className="hover:text-slate-900 dark:hover:text-slate-400"
          href="https://github.com/atsolberg/prayer-calls"
        >
          Source on GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
