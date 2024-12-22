import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import SignUpUserForm from "./signUpUserForm";
import { Button, Title } from "../utils/styledComponents";
import { apiCallSignInUser } from "../utils/api";

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

function SignIn({ setUser }) {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);

  const handleUserEmailChanged = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSignIn = async () => {
    const user = await apiCallSignInUser(userEmail);
    setUser(user);
  };

  const handleSignUpButton = () => {
    setIsSignUpFormOpen(true);
  };

  const handleCloseSignUpForm = () => {
    setIsSignUpFormOpen(false);
  };

  return (
    <>
      <Title>Please sign in in order to use this application</Title>
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
        <Button onClick={handleSignUpButton}>Sign up</Button>
      </SignInOutContainer>

      <Modal
        isOpen={isSignUpFormOpen}
        onRequestClose={handleCloseSignUpForm}
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
        <SignUpUserForm onClose={handleCloseSignUpForm} />
      </Modal>
    </>
  );
}

export default SignIn;
