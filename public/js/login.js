const loginFormHandler = async (event) => {
  event.preventDefault();

  // Values being pulled from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Sends POST request to the API
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Request Data:", JSON.stringify({ username, password }));

    if (response.ok) {
      const responseData = await response.json();
      // Check if the res includes 'redirect' field
      if (responseData.redirect) {
        // If 'redirect' field is there, navigate to the provided URL
        document.location.replace(responseData.redirect);
      } else {
        // If redirect field isn't present, navigate to a default location below
        document.location.replace("/profile");
      }
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
