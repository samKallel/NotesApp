import {
  FAIL_NOTE,
  GET_NOTE,
  GET_NOTES,
  LOAD_NOTE,
} from "../ActionTypes/notes";
//initialState
const initialState = {
  listNotes: [],
  note: {},
  errors: [],
  load: false,
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_NOTE:
      return { ...state, load: true };
    case GET_NOTE:
      return { ...state, note: payload.note, load: false };
    case GET_NOTES:
      return { ...state, listNotes: payload.listNotes, load: false };
    case FAIL_NOTE:
      return { ...state, load: false, errors: payload };

    default:
      return state;
  }
};
export default notesReducer;
