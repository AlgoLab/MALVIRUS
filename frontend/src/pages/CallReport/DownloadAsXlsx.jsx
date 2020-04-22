import React from 'react';

import dayjs from 'dayjs';

function identity(x) {
  return x;
}

function DownloadAsXlsx({
  fileNamePrefix,
  header,
  data,
  massage = identity,
  comparator,
  children,
}) {
  const performDownload = (evt) => {
    evt.preventDefault();
    import(/* webpackChunkName: "xlsx" */ 'xlsx/dist/xlsx.core.min').then(
      ({ writeFile, utils }) => {
        const ws_name = fileNamePrefix.slice(0, 31);
        const filename = `${ws_name}-${dayjs().format('YYMMDD_HHmmss')}.ods`;
        const wb = utils.book_new();
        const out_data = data.slice();
        if (comparator) out_data.sort(comparator);
        const ws = utils.json_to_sheet(out_data.map(massage), {
          header,
        });
        utils.book_append_sheet(wb, ws, ws_name);
        writeFile(wb, filename, { compression: true });
      }
    );
  };
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="."
      onClick={performDownload}
    >
      {children}
    </a>
  );
}

export default DownloadAsXlsx;
