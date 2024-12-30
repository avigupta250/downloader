import express from 'express';
import cors from 'cors';
import { downloadRouter } from './routes/download.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', downloadRouter);

// Error handling
app.use(errorHandler);
app.get("/",(req,res)=>{
  res.send("server is ruunig")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});