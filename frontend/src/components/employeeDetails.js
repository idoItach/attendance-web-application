import { Title } from "../utils/styledComponents";
import { styled } from "styled-components";

const TitleWithPadding = styled(Title)`
  padding-bottom: 20px;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-bottom: 10px;
`;

const Field = styled.div`
  text-align: center;
  padding: 6px 0;
  text-align: left;
`;
function EmployeeDetails({ user }) {
  return (
    <>
      <TitleWithPadding>Employee details</TitleWithPadding>
      <DetailsContainer>
        <Field>
          <b>First name:</b> {user.firstName}
        </Field>
        <Field>
          <b>Last name:</b> {user.lastName}
        </Field>
        <Field>
          <b>Role: </b> {user.role}
        </Field>
        {user.manager && (
          <Field>
            <b>Manager: </b>
            {`${user.manager.firstName} ${user.manager.lastName}`}
          </Field>
        )}
      </DetailsContainer>
    </>
  );
}
export default EmployeeDetails;
