const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_ENDPOINT = "users";

export async function apiCallSignUpUser(body) {
  return apiCall(USERS_ENDPOINT, "POST", body);
}

export async function apiCallSignInUser(userEmail) {
  return apiCall(`${USERS_ENDPOINT}/email/${userEmail}`, "GET");
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