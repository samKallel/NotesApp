import {
  FAIL_NOTE,
  GET_NOTE,
  GET_NOTES,
  LOAD_NOTE,
} from "../ActionTypes/notes";
//initialState
const initialState = {
  listNotes: [],
  noteToGet: {},
  errors: [],
  load: false,
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_NOTE:
      return { ...state, load: true };
    case GET_NOTES:
      return { ...state, listNotes: payload.notes, load: false };
    case FAIL_NOTE:
      return { ...state, load: false, errors: payload };
    case GET_NOTE:
      return { ...state, noteToGet: payload.notes, load: false };

    default:
      return state;
  }
};
export default notesReducer;
