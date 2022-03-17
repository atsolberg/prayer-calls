import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFile, convertMdToHtml } from "../util/api";
import { months } from "../util/constants";

import Modal from "../components/modal/Modal";

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
  console.log(`slug: `, slug);

  useEffect(() => {
    async function fetchData() {
      const res = await getFile(id);
      const f = res;
      setFile(f);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="my-0 mx-auto w-8/12">
      <h2 className="mb-3 mt-4 text-sky-500 dark:text-sky-400 font-bold text-xl sm:text-3xl">
        {name}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="float-right uppercase font-bold border rounded text-sm px-3 py-1 border-slate-500 text-"
        >
          Share
        </button>
      </h2>
      <p>
        <a
          href={`https://billyebrim.org/israel-call-${slug}`}
          target="_blank"
          rel="noreferrer"
        >
          Morning Call
        </a>
        <a
          href={`https://billyebrim.org/${slug}-noon-prayer/`}
          target="_blank"
          rel="noreferrer"
        >
          Noon Call
        </a>
      </p>
      <div
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
  );
}

export default Details;
