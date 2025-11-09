const express = require('express');   
const cors = require('cors');         
const bodyParser = require('body-parser');
const path = require("path");

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Temporary database
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" }
];

// CREATE user
app.post('/users', (req, res) => {

  let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = {
    id: newId,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.json(newUser);
});

// HOME ROUTE (serve index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// READ (get all users)
app.get('/users', (req, res) => {
  res.json(users);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;

  users = users.map(user =>
    user.id === id ? { ...user, ...updatedUser } : user
  );

  res.json({ message: "User updated successfully" });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(u => u.id !== id);

  // Reassign IDs
  users = users.map((user, index) => ({
    ...user,
    id: index + 1
  }));

  res.json({ message: "User deleted successfully and IDs updated!" });
});

// ✅ Use Render PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

