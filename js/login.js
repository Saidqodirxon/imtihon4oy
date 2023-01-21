let form = document.querySelector("form");
let loginName = document.getElementById("login");
let passwordName = document.getElementById("password");
let error = document.getElementById("error-text");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let login = loginName.value;
  let password = passwordName.value;
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: login,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.location.replace("../index.html");
      } else {
        error.innerHTML = "Email ERROR";
      }
    });
});
