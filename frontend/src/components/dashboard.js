import EmployeeDetails from "./employeeDetails";
import ClockButtons from "./clockButtons";

function Dashboard({ user }) {
  return (
    <>
      <EmployeeDetails user={user} />
      <ClockButtons user={user} />
    </>
  );
}
export default Dashboard;
