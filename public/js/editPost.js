async function editFormHandler(event) {
    event.preventDefault();
    
    const title = document.getElementById("post-title").value;
    const text = document.getElementById("post-content").value;

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }

  }

  
  document.getElementById('edit').addEventListener('click', editFormHandler);