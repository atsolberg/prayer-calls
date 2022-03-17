function Footer() {
  return (
    <footer className="text-sm leading-6 mt-12 border-t border-slate-200 dark:border-slate-700">
      <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
        <div className="py-2 sm:py-10 sm:flex justify-between text-slate-500">
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
      </div>
    </footer>
  );
}

export default Footer;
