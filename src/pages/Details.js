import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFile, convertMdToHtml } from "../util/api";

import Modal from "../components/modal/Modal";

function Details() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true);
  const { name, contents } = file;

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
