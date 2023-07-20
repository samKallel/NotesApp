import React, { useState } from "react";
import Forms from "../../Components/Forms/Forms";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNotes } from "../../JS/Actions/notes";

function CreateNote() {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };
  const Add = () => {
    dispatch(addNotes(newNote));
    // navigate("/notes");
  };
  return (
    <Forms title="Create a Note">
      <Card>
        <Card.Header> Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={Add}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                name="title"
                value={newNote.title}
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
                value={newNote.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the category"
                name="category"
                value={newNote.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="outline-info" className="mx-2" type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on: <span>{new Date().toLocaleDateString()}</span>
        </Card.Footer>
      </Card>
    </Forms>
  );
}

export default CreateNote;
