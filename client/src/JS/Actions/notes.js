import {
  FAIL_NOTE,
  GET_NOTE,
  GET_NOTES,
  LOAD_NOTE,
} from "../ActionTypes/notes";
import axios from "axios";

export const getNotes = () => async (dispatch, getState) => {
  dispatch({ type: LOAD_NOTE });
  try {
    const {
      userReducer: { user },
    } = getState();
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let result = await axios.get("/api/notes/all", config);
    dispatch({ type: GET_NOTES, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_NOTE, payload: error.response });
  }
};

export const addNotes = (newNote) => async (dispatch, getState) => {
  dispatch({ type: LOAD_NOTE });
  try {
    const {
      userReducer: { user },
    } = getState();
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    await axios.post("/api/notes/add", newNote, config);
  } catch (error) {
    dispatch({ type: FAIL_NOTE, payload: error.response });
  }
};

export const deleteNotes = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notes/${id}`);
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: FAIL_NOTE, payload: error.response });
  }
};
export const editNotes = (id, newNote) => async (dispatch) => {
  try {
    await axios.put(`/api/notes/${id}`, newNote);
    dispatch(getNotes());
  } catch (error) {
    dispatch({ type: FAIL_NOTE, payload: error.response });
  }
};

export const getNote = (id) => async (dispatch) => {
  dispatch({ type: LOAD_NOTE });
  try {
    let result = await axios(`/api/notes/${id}`);
    dispatch({ type: GET_NOTE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_NOTE, payload: error.response });
  }
};
