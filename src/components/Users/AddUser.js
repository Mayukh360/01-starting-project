import React, { useState, useRef } from "react";
import Wrapper from "../Helpers/Wrapper";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [error, setError] = useState();
  const nameInput = useRef();
  const ageInput = useRef();
  const collegeInput=useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = nameInput.current.value;
    const enteredAge = ageInput.current.value;
    const enteredCollegeName=collegeInput.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0  ||enteredCollegeName.trim().length ===0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge,enteredCollegeName);
    // event.target.reset();
    nameInput.current.value = "";
    ageInput.current.value = "";
    collegeInput.current.value="";
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInput} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInput} />
          <label htmlFor="college">College Name</label>
          <input id="college" type="text" ref={collegeInput} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
