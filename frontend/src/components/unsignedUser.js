import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import SignUpUserForm from "./signUpUserForm";
import { Button } from "../utils/styledComponents";
import { apiCallSignInUser } from "../utils/api";

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
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);

  const handleUserEmailChanged = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSignIn = async () => {
    const user = await apiCallSignInUser(userEmail);
    console.log(user);
    //TODO: setUser
  };

  const handleSignUpButton = () => {
    setIsSignUpFormOpen(true);
  };

  const handleCloseSignUpForm = () => {
    setIsSignUpFormOpen(false);
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

export default UnsignedUser;
