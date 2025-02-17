const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
}); 