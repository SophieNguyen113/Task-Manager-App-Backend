const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoute");
const connectDB = require("./config/connectDB");  
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
-app.use(express.urlencoded({ extended: false }));
app.use(
  cors()
);

// {
//   origin: ["http://localhost:3000", "https://task-manager-app.onrender.com"],
// }

app.use("/api/tasks", taskRoutes);


// Deploying to Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  });
} else {
  // Routes
  app.get('/', (req, res) => {
  res.send('Home Page');
}); 

}

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then( async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
