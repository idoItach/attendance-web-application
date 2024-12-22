import React, { useState } from "react";
import styled from "styled-components";
import { Button, Title } from "../utils/styledComponents";
import { apiCallCreateClock } from "../utils/api";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

function ClockPopup({ userId, mode, onClose }) {
  const [time, setTime] = useState();
  const submitClock = async () => {
    const endpoint = mode === "Clock in" ? "clock-in" : "clock-out";
    apiCallCreateClock(userId, time, endpoint);
  };
  return (
    <>
      <Title>{mode}</Title>
      <ButtonsContainer>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button onClick={submitClock}>{mode}</Button>
      </ButtonsContainer>
    </>
  );
}

export default ClockPopup;
