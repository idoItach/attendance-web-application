import EmployeeDetails from "./employeeDetails";
import ClockButtons from "./clockButtons";

function Dashboard({ user, setUser }) {
  return (
    <>
      <EmployeeDetails user={user} />
      <ClockButtons user={user} setUser={setUser} />
    </>
  );
}
export default Dashboard;
