import { connect as baseConnect } from 'react-refetch';

export function composeThen(fn1, fn2) {
  if (fn2 == null) return fn1;
  return (value, meta) => {
    const result = fn1(value, meta);
    fn2(result.value || result);
    return result;
  };
}

function parse(cause) {
  const { error, message } = cause;

  if (error) {
    return error;
  } else if (message) {
    return message;
  } else {
    return '';
  }
}

export function newError(cause) {
  const e = new Error(parse(cause));
  e.cause = cause;
  return e;
}

export const connect = baseConnect.defaults({
  handleResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const copy = response.clone();
      const json = response.json();
      return json.then(
        (cause) => Promise.reject(newError(cause)),
        () => copy.text().then((text) => Promise.reject(new Error(text)))
      );
    }
  },
});
