import * as XLSX from "xlsx";

const BYTE_MASK = 0xff; // Define a constant for the byte mask used in the stringToArrayBuffer function

export function exportToExcel(tableRef) {
  const table = tableRef.current;
  const worksheet = XLSX.utils.table_to_sheet(table);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xls", type: "binary" });
  const filename = "logistics.xls";
  const blob = new Blob([stringToArrayBuffer(wbout)], {
    type: "application/octet-stream",
  });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function stringToArrayBuffer(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & BYTE_MASK;
  }
  return buf;
}
