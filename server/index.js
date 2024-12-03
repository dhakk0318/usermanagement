const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors( 
  {
    origin: 'http://localhost:3002'
  }
));

connectDB(); 

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
