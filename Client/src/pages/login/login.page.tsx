import "./login.page.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { User } from "../../open_api_models/User";
import { setGlobalUser } from "../../global/variables.global";
import { useNavigate } from "react-router-dom";
import React from "react";
import { userChanged } from "../../services/event.service";

function LoginPage() {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("123456789");

  let navigate = useNavigate();

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const user = new User();
    user
      .login({ email: email, password: password }, { credentials: "include" })
      .then((x) => {
        userChanged(x.data);
        setGlobalUser(x.data);

        document.location.href = "/";
        // navigate('/');
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
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
        <Button className="m-5" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
