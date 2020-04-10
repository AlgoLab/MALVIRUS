export function normFile(e) {
  const fileList = Array.isArray(e) ? e : (e && e.fileList) || [];
  if (fileList.length === 0) return [];
  return fileList.slice(fileList.length - 1);
}

export function getFalse() {
  return false;
}
