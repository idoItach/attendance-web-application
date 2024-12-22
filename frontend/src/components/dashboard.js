import EmployeeDetails from "./employeeDetails";
import ClockButtons from "./clockButtons";
import SubmittedReports from "./submittedReports";

function Dashboard({ user, setUser }) {
  return (
    <>
      <EmployeeDetails user={user} />
      <ClockButtons user={user} setUser={setUser} />
      {user?.role === "Manager" && <SubmittedReports user={user} />}
    </>
  );
}
export default Dashboard;
