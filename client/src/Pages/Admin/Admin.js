import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Forms from "../../Components/Forms/Forms";
import { Button, Accordion, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { Users, deleteUser } from "../../JS/Actions/user";

function Admin() {
  const [showUsers, setShowUsers] = useState(false);
  const listUsers = useSelector((state) => state.userReducer.listUsers);
  const loadUser = useSelector((state) => state.userReducer.loadUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Users());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      toast.success("Deleted successfully!!!", { theme: "dark" });
    }
  };
  const handleShowUsers = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };
  return (
    <div>
      <Forms title="Admin Space...">
        <Button onClick={handleShowUsers} variant="primary">
          {showUsers ? "Hide Users" : "Show Users"}
        </Button>

        {loadUser && <Loading />}
        {showUsers &&
          listUsers &&
          listUsers
            .filter((user) => user.name !== "admin")
            .reverse()
            .map((user) => (
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
                      <Accordion.Header>{user.name} </Accordion.Header>
                    </span>

                    {!user.isAdmin && (
                      <div>
                        <Button
                          variant="outline-danger"
                          className="mx-2"
                          onClick={() => handleDelete(user._id)}
                        >
                          {console.log(user._id)}
                          Delete
                        </Button>
                      </div>
                    )}
                  </Card.Header>

                  <Card.Body>
                    <Accordion.Body>
                      <h4>
                        <Badge pill></Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <p>{user.email}</p>
                          <img
                            src={user.image}
                            alt="ProfilePic"
                            style={{ width: "70px", height: "70px" }}
                          />
                        </div>
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

export default Admin;
