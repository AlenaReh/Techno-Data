console.log("Loding login JS file " )
const loginFormHandler = async (event) => {
  event.preventDefault();
  // alert("Button clicked"); 
  const email = document.querySelector("#user-email").value.trim();
  const password = document.querySelector("#user-password").value.trim();
  console.log(email, password); 
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in!!!");
    }
  }
};
console.log(document.getElementById("btnLogin"));
document.getElementById("btnLogin").addEventListener("click", loginFormHandler);
