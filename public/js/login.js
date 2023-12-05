const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Values being pulled from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      // Sends POST request to the API
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If success, redirect to profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);