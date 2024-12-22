const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_ENDPOINT = "users";
const REPORTS_ENDPOINT = "reports";

export async function apiCallGetAllManagers() {
  return apiCall(`${USERS_ENDPOINT}/managers`, "GET");
}

export async function apiCallSignUpUser(body) {
  return apiCall(USERS_ENDPOINT, "POST", body);
}

export async function apiCallSignInUser(userEmail) {
  return apiCall(`${USERS_ENDPOINT}/email/${userEmail}`, "GET");
}

export async function apiCallCreateClock(userId, time, endpoint) {
  const body = { userId, time };
  return apiCall(`${REPORTS_ENDPOINT}/${endpoint}`, "POST", body);
}

export async function apiCallUpdateReportStatus(reportId, status) {
  const body = { reportId, status };
  return apiCall(`${REPORTS_ENDPOINT}/status`, "PUT", body);
}

async function apiCall(endpoint, method, body = null) {
  const url = `${BASE_URL}/${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`url is: ${url}, options are: `, options);
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return response.json();
  } catch (error) {
    console.error("API call failed:", error);
    alert(error);
  }
}
