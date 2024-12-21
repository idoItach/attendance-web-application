import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../utils/styledComponents";
import { apiCallSignUpUser } from "../utils/api";

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 0;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 1.5em;
  padding-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  margin: 10px;
  gap: 100px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const managers = ["Alice Johnson", "Bob Smith", "Carol Lee"];
const roles = ["Employee", "Manager"];

function SignUpUserForm({ onClose }) {
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    managerId: undefined,
  });
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormValid =
      newUserData.firstName &&
      newUserData.lastName &&
      newUserData.email &&
      newUserData.role;
    setIsSignUpButtonDisabled(!isFormValid);
  }, [newUserData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewUserData((previousUserData) => ({
      ...previousUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...newUserData, manager: newUserData.manager?.id };
    const user = await apiCallSignUpUser(body);
    if (user) {
      alert("User signed up successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title>Sign up a new user</Title>
      <FormField>
        <label>First Name:</label>
        <Input
          type="text"
          name="firstName"
          value={newUserData.firstName}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <label>Last Name:</label>
        <Input
          type="text"
          name="lastName"
          value={newUserData.lastName}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <label>Email:</label>
        <Input
          type="email"
          name="email"
          value={newUserData.email}
          onChange={handleChange}
          required
        />
      </FormField>

      <FormField>
        <label>Role:</label>
        <Select
          name="role"
          value={newUserData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField>
        <label>Manager:</label>
        <Select
          name="manager"
          value={newUserData.manager}
          onChange={handleChange}
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </Select>
      </FormField>
      <ButtonsContainer>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" disabled={isSignUpButtonDisabled}>
          Sign up
        </Button>
      </ButtonsContainer>
    </form>
  );
}

export default SignUpUserForm;
