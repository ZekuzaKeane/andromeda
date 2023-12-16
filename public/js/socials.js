const socialFormHandler = async (event) => {
  event.preventDefault();

  // Values being pulled from the socials form
  const twitter = document.querySelector("#twitter-login").value.trim();
  const instagram = document.querySelector("#instagram-login").value.trim();
  const tiktok = document.querySelector("#tikTok-login").value.trim();
  const youtube = document.querySelector("#youtube-login").value.trim();
  const github = document.querySelector("#github-login").value.trim();
  const twitch = document.querySelector("#twitch-login").value.trim();
  const status = document.querySelector("#social-status").value.trim();


  if (twitter || instagram || tiktok || youtube || github || twitch || status ) {
    // Sends POST request to the API
    const response = await fetch("/api/users/socials", {
      method: "POST",
      body: JSON.stringify({ twitter, instagram, tiktok, youtube, github, twitch, status }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("Request Data:", JSON.stringify({ twitter, instagram, tiktok, youtube, github, twitch, status }));

    if (response.ok) {
      console.log('response is OK!');
      const responseData = await response.json();
      // Check if the res includes 'redirect' field
      if (responseData.redirect) {
        // If 'redirect' field is there, navigate to the provided URL
        console.log('response is getting REDIRECTED');
        document.location.replace(responseData.redirect);
      } else {
        // If redirect field isn't present, navigate to a default location below
        console.log('REPLACING location with socials!');
        document.location.replace("/profile");
      }
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".socials-form")
  .addEventListener("submit", socialFormHandler);