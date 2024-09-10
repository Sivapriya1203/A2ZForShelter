// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth');
const dataRoutes = require("./routes/data")
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config();
connectDB();
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', authRoutes);
app.use("/api", dataRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const houseRoutes = require('./routes/houseRoutes')
const cementRoutes = require('./routes/cementRoutes')
const sandRoutes = require('./routes/sandRoutes')
const steelRoutes = require('./routes/steelRoutes')
const stoneRoutes = require('./routes/stoneRoutes')
const woodRoutes = require('./routes/woodRoutes')
const pipeWireRoute = require('./routes/pipeWireRoutes')
const cateringRoute = require('./routes/cateringRoutes')
const interiorRoute = require('./routes/interiorRoutes')
const pgHostelRoute = require('./routes/pgHostelRoutes')
const agentRoute = require('./routes/agentRoute')

app.use('/houseRoute', houseRoutes)
app.use('/cementRoutes', cementRoutes);
app.use('/sandRoute', sandRoutes)
app.use('/steelRoute', steelRoutes)
app.use('/stoneRoute', stoneRoutes)
app.use('/woodRoute', woodRoutes)
app.use('/pipeWiresRoute', pipeWireRoute)
app.use('/cateringRoute', cateringRoute)
app.use('/interiorRoute', interiorRoute)
app.use('/pgHostelRoute', pgHostelRoute)
app.use('/agentRoute', agentRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
