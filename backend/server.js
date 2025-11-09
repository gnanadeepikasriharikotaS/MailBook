// Step 1: Import needed packages
const express = require('express');   // To create server easily
const cors = require('cors');         // To allow frontend to talk to backend
const bodyParser = require('body-parser'); // To read data sent from frontend

// Step 2: Create an Express app
const app = express();

// Step 3: Middlewares (help Express understand requests)
app.use(cors()); // Allow requests from other places (like frontend)
app.use(bodyParser.json()); // Convert JSON data into JavaScript object

// Step 4: Temporary "database" (in-memory)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" }
];

// CRUD OPERATIONS

//  CREATE (Add new user)

app.post('/users', (req, res) => {

let newId = 1;
  if (users.length > 0) {
    // Get the last user's id and add 1
    newId = users[users.length - 1].id + 1;
  }

  const newUser = {
    id: newId,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.json(newUser);
});

//  READ (Get all users)
app.get('/users', (req, res) => {
  res.json(users);          // Send all users to the frontend
});

//  UPDATE (Edit user info)
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id); // Get user id from URL
  const updatedUser = req.body;       // Get new data from frontend

  // Go through all users and update the matching one
  users = users.map(user => {
    if (user.id === id) {
      return { ...user, ...updatedUser };
    }
    return user;
  });

  res.json({ message: "User updated successfully" });
});

//  DELETE (Remove user)

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Remove the user with that id
  users = users.filter(u => u.id !== id);

  // Reassign IDs to keep them continuous (1, 2, 3...)
  users = users.map((user, index) => ({
    ...user,
    id: index + 1  // index starts from 0, so +1
  }));

  res.json({ message: "User deleted successfully and IDs updated!" });
});


// Step 5: Start the server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
