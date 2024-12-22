import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../utils/styledComponents";
import { apiCallUpdateReportStatus } from "../utils/api";

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

function ReportTable({ managedUsers, setUser }) {
  const [displayOnlyPendingReports, setDisplayOnlyPendingReports] =
    useState(true);
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
      setUser((user) => {
        const updatedReports = user.reports;
        const reportIndex = updatedReports.findIndex((r) => r.id === report.id);

        updatedReports[reportIndex] = report;
        return { ...user, reports: updatedReports };
      });
      alert(`Set new status ${status} done successfully`);
    }
  };

  return (
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
        {managedUsers.map((user) =>
          user.reports.map((report) => {
            if (displayOnlyPendingReports && report.status === "Pending") {
              return (
                <tr key={report.id}>
                  <Td>{`${user.firstName} ${user.lastName}`}</Td>
                  <Td>{formatDate(report.startTime)}</Td>
                  <Td>{formatTime(report.startTime)}</Td>
                  <Td>{formatTime(report.endTime)}</Td>
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
                </tr>
              );
            } else return <></>;
          })
        )}
      </tbody>
    </Table>
  );
}

export default ReportTable;
