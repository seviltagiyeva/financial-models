export const loadState = () => {
  try {
    const serializedStage = localStorage.getItem('state');
    if (serializedStage === null ) {
      return undefined;
    }
    return JSON.parse(serializedStage);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};


export const saveState = (state) => {
  try {
    const serializedStage = JSON.stringify(state);
    localStorage.setItem('state', serializedStage);
  } catch (e) {
    console.log('could not save state');
    console.log(e);
  }
};
