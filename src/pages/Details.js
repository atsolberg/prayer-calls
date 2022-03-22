import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFile } from "../util/api";
import { formatFileDate } from "../util/date";
import { months } from "../util/constants";
import { convertMdToHtml } from "../util/markdown";

import Modal from "../components/modal/Modal";
import Button from "../components/button/Button";
import A from "../components/anchor/A";
import PrayerCall from "../components/prayer-call/PrayerCall";
import BiblesProvider from "../providers/BiblesProvider";

function getCallSlug(name) {
  if (!name) return "";
  const parts = name.split("-");
  const month = months[Number(parts[1].replace("0", "")) - 1];
  return `${month.name.toLowerCase()}-${parts[2]}-${parts[0]}`;
}

function Details() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true);
  const { name, contents } = file;
  const slug = getCallSlug(name);

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
    <BiblesProvider>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          <div className="sm:flex items-center">
            <h2 className="mb-3 mt-4 text-sky-500 dark:text-sky-400 font-bold text-xl sm:text-3xl">
              {formatFileDate(name)}
            </h2>
            <p className="ml-auto my-4 flex items-center">
              <span className="mr-2">Links -</span>
              <A
                href={`https://billyebrim.org/israel-call-${slug}`}
                target="_blank"
                rel="noreferrer"
              >
                Morning Call
              </A>
              <span className="inline-block border-l border-slate-300 dark:border-slate-700 h-5 mx-3" />
              <A
                href={`https://billyebrim.org/${slug}-noon-prayer/`}
                target="_blank"
                rel="noreferrer"
              >
                Noon Call
              </A>
              <Button
                className="float-right hidden"
                onClick={() => setShowModal(true)}
              >
                Share
              </Button>
            </p>
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
    </BiblesProvider>
  );
}

export default Details;
