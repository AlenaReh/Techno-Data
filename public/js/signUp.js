console.log("LOADING JS++++++")
async function signupFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log('Congratulations! You can sign in with your credentials now!');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    
}
  
document.querySelector('#signup').addEventListener('click', signupFormHandler);