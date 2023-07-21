import React, { useState, useEffect } from "react";
import Forms from "../../Components/Forms/Forms";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editNotes } from "../../JS/Actions/notes";

import Loading from "../../Components/Loading/Loading";
function UpdateNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });
  const navigate = useNavigate();
  const load = useSelector((state) => state.notesReducer.load);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const { id } = useParams();

  const notesList = useSelector((state) => state.notesReducer.listNotes);
  const noteToUpdate = notesList.find((note) => note._id === id);

  useEffect(() => {
    if (noteToUpdate) {
      setNote({
        title: noteToUpdate.title,
        content: noteToUpdate.content,
        category: noteToUpdate.category,
      });
    }
  }, [noteToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editNotes(id, note));
    navigate("/notes");
  };
  return (
    <Forms title="Edit Note">
      <Card>
        <Card.Header> Edit this Note</Card.Header>
        <Card.Body>
          <Form>
            {load && <Loading />}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                name="title"
                value={note.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the content"
                name="content"
                value={note.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the category"
                name="category"
                value={note.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="outline-info"
              className="mx-2"
              onClick={handleSubmit}
            >
              Update Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on: <span>{new Date().toLocaleDateString()}</span>
        </Card.Footer>
      </Card>
    </Forms>
  );
}

export default UpdateNote;
