const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const { requestLogger, errorLogger } = require('../Loggin-Middelware/logger'); 

const app = express();

mongoose.connect('mongodb://localhost:27017/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', urlRoutes);


app.use(errorLogger);


app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});