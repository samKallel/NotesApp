import {
  FAIL_NOTE,
  GET_NOTE,
  GET_NOTES,
  LOAD_NOTE,
  SUCC_NOTES,
} from "../ActionTypes/notes";
//initialState
const initialState = {
  listNotes: [],
  noteToGet: {},
  errors: [],
  load: false,
  success: false,
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_NOTE:
      return { ...state, load: true };
    case GET_NOTES:
      return { ...state, listNotes: payload.notes, load: false, success: true };
    case FAIL_NOTE:
      return { ...state, load: false, errors: payload.errors, success: false };
    case GET_NOTE:
      return { ...state, noteToGet: payload.notes, load: false, success: true };
    case SUCC_NOTES:
      return { ...state, success: true };
    default:
      return state;
  }
};
export default notesReducer;
