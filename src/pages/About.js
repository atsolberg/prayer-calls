import A from "../components/anchor/A";

function About() {
  return (
    <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
      <p className="py-4">
        This site records content from the Billye Brim Ministries prayer calls
        every Wednesday morning and noon.
      </p>
      <p className="mb-2">
        You can check them out at{" "}
        <A
          href="https://billyebrim.org/weekly-israel-prayer-call/"
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap"
        >
          billyebrim.org{" "}
          <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
        </A>
      </p>
      <div className="sm:flex">
        <p className="mb-2">
          <A
            href="https://billyebrim.org/weekly-israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
          >
            Morning Prayer{" "}
            <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
          </A>
          <A
            href="https://billyebrim.org/israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
          >
            Archive{" "}
            <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
          </A>
        </p>
        <p className="sm:ml-20">
          <A
            href="https://billyebrim.online.church/"
            target="_blank"
            rel="noreferrer"
          >
            Noon Prayer{" "}
            <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
          </A>
          <A
            href="https://billyebrim.org/wednesday-noon-prayer/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
          >
            Archive{" "}
            <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
          </A>
        </p>
      </div>

      <h4 className="text-xl mt-3 font-bold">Todo List</h4>
      <ul>
        <li>- Get a logo?</li>
        <li>- Add preview to search</li>
        <li>- Get more bible versions (ESV, NASV, AMP, NKJV)</li>
        <li>- Start archiving backwards, December, November, ect</li>
      </ul>

      <h4 className="text-xl mt-3 font-bold">Contact</h4>
      <p>
        If you would like to send feedback or report a bug, I can be reached at{" "}
        <A href="mailto:aaron@prayercalls.net">
          aaron@prayercalls.net{" "}
          <i className="fa-solid fa-xs fa-arrow-up-right-from-square" />
        </A>
      </p>
    </div>
  );
}

export default About;
