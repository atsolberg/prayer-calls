import A from "../components/anchor/A";
import { bool, node } from "prop-types";

TodoItem.propTypes = {
  children: node,
  done: bool,
};
function TodoItem({ children, done }) {
  return (
    <li>
      <i className={`far fa-square${done ? "-check" : ""}`} /> {children}
    </li>
  );
}

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
          external
        >
          billyebrim.org
        </A>
      </p>
      <div className="sm:flex">
        <p className="mb-2">
          <A
            href="https://billyebrim.org/weekly-israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
            external
          >
            Morning Prayer
          </A>
          <A
            href="https://billyebrim.org/israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
            external
          >
            Archive
          </A>
        </p>
        <p className="sm:ml-20">
          <A
            href="https://billyebrim.online.church/"
            target="_blank"
            rel="noreferrer"
            external
          >
            Noon Prayer
          </A>
          <A
            href="https://billyebrim.org/wednesday-noon-prayer/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
            external
          >
            Archive
          </A>
        </p>
      </div>
      <h4 className="text-xl mt-3 font-bold mb-2">Todo List</h4>
      <ul>
        <TodoItem done>Add bible version picker</TodoItem>
        <TodoItem done>Add search feature</TodoItem>
        <TodoItem done>Add next/prev links</TodoItem>
        <TodoItem done>Fix links when no morning call exists</TodoItem>
        <TodoItem done>Add custom links</TodoItem>
        <TodoItem done>Add preview to search</TodoItem>
        <TodoItem done>Add env vars for keys</TodoItem>
        <TodoItem>Get a logo?</TodoItem>
        <TodoItem>Add share feature</TodoItem>
      </ul>
      <h4 className="text-lg mt-3 font-bold mb-2">Get more bible versions</h4>
      <ul>
        <TodoItem done>ESV</TodoItem>
        <TodoItem done>NASB</TodoItem>
        <TodoItem>AMP</TodoItem>
        <TodoItem>NKJV</TodoItem>
      </ul>
      <h4 className="text-lg mt-3 font-bold mb-2">Start archiving backwards</h4>
      <ul>
        <TodoItem done>March 2022</TodoItem>
        <TodoItem done>February 2022</TodoItem>
        <TodoItem done>January 2022</TodoItem>
        <TodoItem done>December 2021</TodoItem>
        <TodoItem done>November 2021</TodoItem>
        <TodoItem done>October 2021</TodoItem>
        <TodoItem done>September 2021</TodoItem>
        <TodoItem done>August 2021</TodoItem>
        <TodoItem done>July 2021</TodoItem>
        <TodoItem done>June 2021</TodoItem>
        <TodoItem done>May 2021</TodoItem>
        <TodoItem done>April 2021</TodoItem>
        <TodoItem done>March 2021</TodoItem>
        <TodoItem done>February 2021</TodoItem>
        <TodoItem done>January 2021</TodoItem>
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
