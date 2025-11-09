const API_URL = "http://localhost:5000/users";

//  Get all users from backend
async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  users.forEach(user => {
    const row = `
      <tr>
        <td>${user.id}</td>
        <td><input value="${user.name}" id="name-${user.id}"></td>
        <td><input value="${user.email}" id="email-${user.id}"></td>
        <td>
          <button onclick="updateUser(${user.id})">Update</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

//  Add new user
async function addUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please enter both name and email!");
    return;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();

  alert(` User "${data.name}" added successfully!`);

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  fetchUsers();
}

//  Update user
async function updateUser(id) {
  const name = document.getElementById(`name-${id}`).value;
  const email = document.getElementById(`email-${id}`).value;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();
  alert(` ${data.message}`);
  fetchUsers();
}

//  Delete user
async function deleteUser(id) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();

  alert(`${data.message}`);
  fetchUsers();
}

// Fetch all users when page loads
fetchUsers();
