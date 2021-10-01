async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
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
  
document.querySelector('#signup').addEventListener('submit', signupFormHandler);