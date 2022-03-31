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
      <h4 className="text-xl mt-3 font-bold mb-2">Todo List</h4>
      <ul>
        <li>
          <i className="far fa-square" /> Get a logo?
        </li>
        <li>
          <i className="far fa-square-check" /> Add bible version picker
        </li>
        <li>
          <i className="far fa-square-check" /> Add search feature
        </li>
        <li>
          <i className="far fa-square" /> Add preview to search
        </li>
      </ul>
      <h4 className="text-lg mt-3 font-bold mb-2">Get more bible versions</h4>
      <ul>
        <li>
          <i className="far fa-square-check" /> ESV
        </li>
        <li>
          <i className="far fa-square-check" /> NASB
        </li>
        <li>
          <i className="far fa-square" /> AMP
        </li>
        <li>
          <i className="far fa-square" /> ️NKJV
        </li>
      </ul>
      <h4 className="text-lg mt-3 font-bold mb-2">Start archiving backwards</h4>
      <ul>
        <li>
          <i className="far fa-square-check" /> March 2022
        </li>
        <li>
          <i className="far fa-square-check" /> February 2022
        </li>
        <li>
          <i className="far fa-square-check" /> January 2022
        </li>
        <li>
          <i className="far fa-square-check" /> December 2021
        </li>
        <li>
          <i className="far fa-square-check" /> November 2021
        </li>
        <li>
          <i className="far fa-square" /> October 2021
        </li>
        <li>
          <i className="far fa-square" /> September 2021
        </li>
        <li>
          <i className="far fa-square" /> August 2021
        </li>
        <li>
          <i className="far fa-square" /> July 2021
        </li>
        <li>
          <i className="far fa-square" /> June 2021
        </li>
        <li>
          <i className="far fa-square" /> May 2021
        </li>
        <li>
          <i className="far fa-square" /> April 2021
        </li>
        <li>
          <i className="far fa-square" /> March 2021
        </li>
        <li>
          <i className="far fa-square" /> February 2021
        </li>
        <li>
          <i className="far fa-square" /> January 2021
        </li>
        <li>
          <i className="far fa-square" /> December 2020
        </li>
        <li>
          <i className="far fa-square" /> November 2020
        </li>
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
