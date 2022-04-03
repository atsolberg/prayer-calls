import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cx from "classnames";

import { getFile } from "../util/api";
import { formatFileDate } from "../util/date";
import { call_links, months } from "../util/constants";
import { convertMdToHtml } from "../util/markdown";
import { useCalls } from "../providers/CallsProvider";

import Modal from "../components/modal/Modal";
import Button from "../components/button/Button";
import A from "../components/anchor/A";
import PrayerCall from "../components/prayer-call/PrayerCall";
import LoadingBars from "../components/icons/LoadingBars";
import { titlecase } from "../util/string";

function getCallSlug(name) {
  if (!name) return "";
  const parts = name.split("-");
  const month = months[Number(parts[1].replace("0", "")) - 1];
  return `${month.name.toLowerCase()}-${parts[2]}-${parts[0]}`;
}

function Details() {
  const { id } = useParams();
  const calls = useCalls();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true);

  const { name, contents } = file;
  const slug = getCallSlug(name);

  const prev = calls.loaded && calls.entities.next(id);
  const next = calls.loaded && calls.entities.prev(id);
  const custom_links = call_links[id];

  const links = {
    morning: `https://billyebrim.org/israel-call-${slug}`,
    noon: `https://billyebrim.org/${slug}-noon-prayer/`,
  };
  if (custom_links && !custom_links.morning) delete links.morning;
  if (custom_links && !custom_links.noon) delete links.noon;
  if (custom_links?.evening) links.evening = custom_links.evening;

  // Fetch markdown file
  useEffect(() => {
    async function fetchData() {
      const res = await getFile(id);
      const f = res;
      setFile(f);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <h2 className="text-sky-500 flex items-center justify-center">
          <LoadingBars size={20} className="inline mr-3 my-8" /> Loading...
        </h2>
      ) : (
        <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          <div className="sm:flex items-center">
            <h2 className="mb-3 mt-4 text-sky-500 font-bold text-xl sm:text-3xl">
              {formatFileDate(name)}
            </h2>
            <p className="ml-auto my-4 flex items-center">
              <span className="mr-2">Links -</span>
              <ul className="list-none">
                {Object.entries(links).map(([name, url]) => (
                  <li
                    key={url}
                    className={cx([
                      "inline",
                      "border-1",
                      "border-r",
                      "border-slate-300 dark:border-slate-700",
                      "mr-3 pr-3",
                      "last:border-r-0",
                    ])}
                  >
                    <A href={url} target="_blank" rel="noreferrer">
                      {titlecase(name)}
                    </A>
                  </li>
                ))}
              </ul>
              <Button
                className="float-right hidden"
                onClick={() => setShowModal(true)}
              >
                Share
              </Button>
            </p>
          </div>

          <div className="my-4 cf">
            {prev && (
              <A className="float-left" as={Link} to={`/details/${prev.id}`}>
                <i className="fas fa-chevron-left" /> Prev
              </A>
            )}
            {next && (
              <A className="float-right" as={Link} to={`/details/${next.id}`}>
                Next <i className="fas fa-chevron-right" />
              </A>
            )}
          </div>

          <PrayerCall content={contents} />
          <div
            className="hidden"
            dangerouslySetInnerHTML={{
              __html: convertMdToHtml(contents).outerHTML,
            }}
          />
          {showModal ? (
            <Modal>
              <h3>Test Modal</h3>
              <div>
                <p>This is a test modal</p>
                <button type="button" onClick={() => setShowModal(false)}>
                  Ok
                </button>
              </div>
            </Modal>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Details;
