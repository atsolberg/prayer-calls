import React, { useMemo, useState } from "react";

import PcCtx from "./context";
import Modal from "../modal/Modal";
import PrayerCallVerse from "./PrayerCallVerse";
import PrayerCallLine from "./PrayerCallLine";

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
          const As = l.startsWith("_") ? PrayerCallVerse : PrayerCallLine;
          return <As key={key} text={l} lineNum={i + 1} />;
        })}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
          {modalCopy}
        </Modal>
      </div>
    </PcCtx.Provider>
  );
}

export default PrayerCall;
