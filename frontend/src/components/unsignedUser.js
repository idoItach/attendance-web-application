import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import RegisterUserForm from "./registerUserForm";
import { Button } from "../utils/styledComponents";

const Text = styled.div`
  font-size: 1.5em;
`;

const UserEmailContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 30px;
`;

const SignInOutContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 30px;
`;

Modal.setAppElement("#root");

function UnsignedUser({ setUser }) {
  const [userEmail, setUserEmail] = useState("");
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

  const handleUserEmailChanged = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSignIn = () => {
    console.log(userEmail);
    //TODO: setUser
  };

  const handleRegister = () => {
    setIsRegisterFormOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterFormOpen(false);
  };

  return (
    <>
      <Text>Please sign in in order to use this application</Text>
      <UserEmailContainer>
        Email:
        <input
          type="text"
          value={userEmail}
          onChange={handleUserEmailChanged}
          placeholder="Enter email"
        />
      </UserEmailContainer>
      <SignInOutContainer>
        {" "}
        <Button onClick={handleSignIn} disabled={userEmail.length === 0}>
          Sign in
        </Button>
        <Button onClick={handleRegister}>Register</Button>
      </SignInOutContainer>

      <Modal
        isOpen={isRegisterFormOpen}
        onRequestClose={handleCloseRegister}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <RegisterUserForm onClose={handleCloseRegister} />
      </Modal>
    </>
  );
}

export default UnsignedUser;
