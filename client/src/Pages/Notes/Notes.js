import React, { useEffect } from "react";
import Forms from "../../Components/Forms/Forms";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../JS/Actions/notes";
import Loading from "../../Components/Loading/Loading";
import { deleteNotes } from "../../JS/Actions/notes";

function Notes({ search }) {
  const dispatch = useDispatch();
  const listNotes = useSelector((state) => state.notesReducer.listNotes);
  const load = useSelector((state) => state.notesReducer.load);
  const user = useSelector((state) => state.userReducer.user);
  const success = useSelector((state) => state.notesReducer.success);
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this note?")) {
      dispatch(deleteNotes(id));
    }
  };

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch, success, user]);

  return (
    <div>
      <Forms title={`Welcome ${user && user.name}....`}>
        <Link to="/add">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create new Note
          </Button>{" "}
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <Button
              id="adminButton"
              variant="success"
              size="lg"
              style={{
                marginLeft: "60%",
                marginTop: "0%",
                marginBottom: "5%",
                position: "absolute",
              }}
            >
              Space Admin
            </Button>
          </Link>
        )}
        {load && <Loading />}
        {listNotes &&
          listNotes
            .reverse()
            .filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))
            .map((note) => (
              <Accordion defaultActiveKey={["0"]}>
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Header> {note.title}</Accordion.Header>
                    </span>

                    <div>
                      <Link to={`/notes/${note._id}`}>
                        <Button variant="outline-warning">Edit</Button>
                      </Link>
                      <Button
                        variant="outline-danger"
                        className="mx-2"
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <Accordion.Body>
                      <h4>
                        <Badge pill bg="success">
                          Category -{note.category}-
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created On:
                          <span>{note.createdAt.substring(0, 10)}</span>
                        </footer>
                      </blockquote>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion>
            ))}
      </Forms>
    </div>
  );
}

export default Notes;
