import React from "react";
import Forms from "../../Components/Forms/Forms";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";

function Notes() {
  return (
    <div>
      <Forms title="Welcome ....">
        <Link to="createNote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create new Note
          </Button>
        </Link>
        <Accordion defaultActiveKey={["0"]} flush>
          <Accordion.Item eventKey="0">
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
                  <Accordion.Header> note.title</Accordion.Header>
                </span>

                <div>
                  <Button variant="outline-warning">Edit</Button>
                  <Button variant="outline-danger" className="mx-2">
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Card.Body>
                <Accordion.Body>
                  <h4>
                    <Badge pill bg="success">
                      Category -note.category-
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>note.content</p>
                    <footer className="blockquote-footer">
                      Created On -date-
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Card.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      </Forms>
    </div>
  );
}

export default Notes;
