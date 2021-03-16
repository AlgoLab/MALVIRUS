import { useCallback, useState } from 'react';

export function usePersistentState(keyname, initialState) {
  const restoreState = useCallback(() => {
    const state = window.sessionStorage.getItem(keyname);
    if (state !== null) {
      return JSON.parse(state);
    }
    return initialState;
  }, [keyname, initialState]);
  const [state, setState] = useState(restoreState);
  const setPersistentState = useCallback(
    (state) => {
      setState(state);
      window.sessionStorage.setItem(keyname, JSON.stringify(state));
    },
    [keyname, setState]
  );
  return [state, setPersistentState];
}
