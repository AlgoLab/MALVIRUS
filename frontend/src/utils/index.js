export function normFile(e) {
  const fileList = Array.isArray(e) ? e : (e && e.fileList) || [];
  if (fileList.length === 0) return [];
  return fileList.slice(fileList.length - 1);
}

export function getFalse() {
  return false;
}

export function stringifyError(error) {
  if (error == null) return 'Errore non specificato';
  if (error.cause != null) {
    return stringifyError(error.cause);
  }
  if (error.description != null) {
    return `${error.description}${
      error.errorCode != null ? ` [codice: ${error.errorCode}]` : ''
    }`;
  }
  if (error.errors != null) {
    return error.errors.map(stringifyError).join('\n');
  }
  if (error.message != null) {
    return error.message;
  }
  if (error.toString != null) return error.toString();
  return JSON.stringify(error, null, 2);
}
