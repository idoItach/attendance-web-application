import React from "react";
import { Title } from "../utils/styledComponents";
import { styled } from "styled-components";
import ReportTable from "./reportTable";

const Container = styled.div`
  padding-top: 30px;
`;

const ReportsContainer = styled.div`
  border: 1px solid slategray;
  border-radius: 10px;
  margin: auto;
  padding: 20px 20px;
`;
function SubmittedReports({ user, setUser }) {
  return (
    <Container>
      <Title>Submitted reports</Title>
      <ReportsContainer>
        <ReportTable managedUsers={user.managedUsers} setUser={setUser} />
      </ReportsContainer>
    </Container>
  );
}

export default SubmittedReports;
