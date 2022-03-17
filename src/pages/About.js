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
        >
          https://billyebrim.org
        </A>
        :
      </p>
      <div className="sm:flex">
        <p className="mb-2">
          <A
            href="https://billyebrim.org/weekly-israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
          >
            Morning Prayer
          </A>
          <A
            href="https://billyebrim.org/israel-prayer-call/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
          >
            Archive
          </A>
        </p>
        <p className="sm:ml-20">
          <A
            href="https://billyebrim.online.church/"
            target="_blank"
            rel="noreferrer"
          >
            Noon Prayer
          </A>
          <A
            href="https://billyebrim.org/wednesday-noon-prayer/"
            target="_blank"
            rel="noreferrer"
            className="ml-4 pl-4 border-l border-slate-400 dark:border-slate-200/25"
          >
            Archive
          </A>
        </p>
      </div>
    </div>
  );
}

export default About;
