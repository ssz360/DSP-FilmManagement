import "./register.page.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { User } from "../../open_api_models/User";
import { useNavigate } from "react-router-dom";
import React from "react";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [name, setName] = useState<string>("");

  let navigate = useNavigate();

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmationChange(e: any) {
    setPasswordConfirmation(e.target.value);
  }

  function handleNameChange(e: any) {
    setName(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const user = new User();
    user
      .register({
        email: email,
        password: password,
        name,
        passwordConfirmation,
      })
      .then((x) => {
        navigate("/login");
      });
  }

  return (
    <div className="login">
      <h1>Register</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label from="email">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label from="password">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label from="password">Password Confirmation:</Form.Label>
          <Form.Control
            type="password"
            name="password-confirmation"
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label from="password">Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Button className="m-5" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;
