import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFile } from "../api";
import Modal from "../components/modal/Modal";

function Details() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getFile(id);
      // const f = await res.json();
      const f = res;
      setFile(f);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <h2>{file.name}</h2>
      <h3>Contents</h3>
      <p>{file.contents}</p>
      <button type="button" onClick={() => setShowModal(true)}>
        Share
      </button>
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
