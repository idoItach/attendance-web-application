import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Title } from "../utils/styledComponents";
import { apiCallCreateClock } from "../utils/api";

const Container = styled.div`
  width: 30vw;
  height: 60vh;
`;
const ButtonsContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 10px 20px;
  justify-content: space-between;
  gap: 20px;
`;

const DatePickerWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

function ClockPopup({ userId, mode, onClose, setUser }) {
  const [time, setTime] = useState(new Date());

  const handleDateChange = (date) => {
    setTime(date);
  };

  const submitClock = async () => {
    const endpoint = mode === "Clock in" ? "clock-in" : "clock-out";
    const timestamp = time.getTime();
    const report = await apiCallCreateClock(userId, timestamp, endpoint);

    if (report) {
      setUser((user) => {
        const updatedReports = user.reports ? [...user.reports] : [];
        const reportIndex = updatedReports.findIndex((r) => r.id === report.id);

        if (reportIndex !== -1) {
          updatedReports[reportIndex] = report; // Replace existing report
        } else {
          updatedReports.push(report); // Add new report
        }

        return { ...user, reports: updatedReports };
      });
      alert(`${mode} done successfully`);
      onClose();
    }
  };

  return (
    <Container>
      <Title>{mode}</Title>
      <br />
      <label>Select Date and Time:</label>
      <br /> <br />
      <DatePickerWrapper>
        <DatePicker
          selected={time}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </DatePickerWrapper>
      <ButtonsContainer>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submitClock}>Save</Button>
      </ButtonsContainer>
    </Container>
  );
}

export default ClockPopup;
