import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../utils/styledComponents";
import { apiCallUpdateReportStatus } from "../utils/api";

const Container = styled.div`
  max-height: 350px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: auto;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 8px 25px 8px 5px;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 8px 25px 8px 5px;
  white-space: nowrap;
`;

const ButtonsTd = styled.td`
  display: flex;
  padding: 8px 25px 8px 5px;
  white-space: nowrap;
  gap: 20px;
`;

const ApproveButton = styled(Button)`
  color: white;
  background-color: #81c995;
`;

const RejectButton = styled(Button)`
  color: white;
  background-color: #f28b82;
`;

const ToggleButton = styled(Button)`
  margin-bottom: 15px;
  background-color: #4a90e2;
  color: white;
`;

function ReportTable({ managedUsers }) {
  const [displayOnlyPendingReports, setDisplayOnlyPendingReports] =
    useState(true);

  // Store all reports and dynamically filter for display
  const [allReports, setAllReports] = useState(
    managedUsers.flatMap((user) =>
      user.reports.map((report) => ({
        ...report,
        userName: `${user.firstName} ${user.lastName}`,
      }))
    )
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const updateReportStatus = async (reportId, status) => {
    const report = await apiCallUpdateReportStatus(reportId, status);
    if (report) {
      setAllReports((reports) =>
        reports.map((r) =>
          r.id === report.id ? { ...report, userName: r.userName } : r
        )
      );
      alert(`Set new status ${status} done successfully`);
    }
  };

  const toggleDisplayMode = () => {
    setDisplayOnlyPendingReports((prev) => !prev);
  };

  return (
    <Container>
      <ToggleButton onClick={toggleDisplayMode}>
        {displayOnlyPendingReports
          ? "Show All Reports"
          : "Show Pending Reports"}
      </ToggleButton>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {allReports
            .filter(
              (report) =>
                !displayOnlyPendingReports || report.status === "Pending"
            )
            .map((report) => (
              <tr key={report.id}>
                <Td>{report.userName}</Td>
                <Td>{formatDate(report.startTime)}</Td>
                <Td>{formatTime(report.startTime)}</Td>
                <Td>{formatTime(report.endTime)}</Td>
                {report.status === "Pending" ? (
                  <ButtonsTd>
                    <ApproveButton
                      onClick={() => updateReportStatus(report.id, "Approved")}
                    >
                      Approve
                    </ApproveButton>
                    <RejectButton
                      onClick={() => updateReportStatus(report.id, "Rejected")}
                    >
                      Reject
                    </RejectButton>
                  </ButtonsTd>
                ) : (
                  <>{report.status}</>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ReportTable;
