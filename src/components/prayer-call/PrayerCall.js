import React, { useMemo, useState } from "react";

import { convertMdToHtml } from "../../util/markdown";

import PcCtx from "./context";
import Modal from "../modal/Modal";
import PrayerCallVerse from "./PrayerCallVerse";

function PrayerCall({ content }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCopy, setModalCopy] = useState("");
  const ctxValue = useMemo(
    () => [setModalOpen, setModalCopy],
    [setModalOpen, setModalCopy]
  );

  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <PcCtx.Provider value={ctxValue}>
      <div className="space-y-1">
        {lines.map((l, i) => {
          const key = `${l}-${i}`;
          return l.startsWith("_") ? (
            <PrayerCallVerse key={key} verse={l} />
          ) : (
            <div
              key={key}
              dangerouslySetInnerHTML={{ __html: convertMdToHtml(l).outerHTML }}
            />
          );
        })}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
          {modalCopy}
        </Modal>
      </div>
    </PcCtx.Provider>
  );
}

export default PrayerCall;
