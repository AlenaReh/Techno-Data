async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const text = document.getElementById("text").value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");//viewpost
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#postBtn").addEventListener("click", newFormHandler);
