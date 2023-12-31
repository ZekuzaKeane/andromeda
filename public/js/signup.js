const signupFormHandler = async (event) => {
  event.preventDefault();

  // const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    if (response.ok && responseData.message === "User created successfully!") {
      console.log("Successful signup!");
      document.location.replace("/login");
    } else {
      alert(responseData.message || response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
