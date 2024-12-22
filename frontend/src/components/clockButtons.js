import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "../utils/styledComponents";
import ClockPopup from "./clockPopup";
import Modal from "react-modal";

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

Modal.setAppElement("#root");

function ClockButtons({ user, setUser }) {
  const [isReportInProgress, setIsReportInProgress] = useState(false);
  const [popupMode, setPopupMode] = useState();
  useEffect(() => {
    const boolean = user.reports.some(
      (report) => report.status === "InProgress"
    );
    setIsReportInProgress(boolean);
  }, [user]);

  const handleClockInPopup = () => {
    setPopupMode("Clock in");
  };

  const handleClockOutPopup = () => {
    setPopupMode("Clock out");
  };

  const handleCloseClockPopup = () => {
    setPopupMode();
  };

  return (
    <>
      <ButtonsContainer>
        <Button disabled={isReportInProgress} onClick={handleClockInPopup}>
          Clock in
        </Button>
        <Button disabled={!isReportInProgress} onClick={handleClockOutPopup}>
          Clock Out
        </Button>
      </ButtonsContainer>
      <Modal
        isOpen={popupMode}
        onRequestClose={handleCloseClockPopup}
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
        <ClockPopup
          userId={user.id}
          setUser={setUser}
          mode={popupMode}
          onClose={handleCloseClockPopup}
        />
      </Modal>
    </>
  );
}
export default ClockButtons;
