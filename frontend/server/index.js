const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const busSchema = require("./models/bus"); 

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Custom routes
const customerroutes = require("./routes/customer");
const routesroute = require("./routes/route");
const bookingroute = require("./routes/booking");

app.use(bookingroute);
app.use(routesroute);
app.use(customerroutes);

// MongoDB Connection
const DBURL = "mongodb+srv://karthi:karthi@tedbus.9oqcm.mongodb.net/?retryWrites=true&w=majority&appName=tedbus";
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error('MongoDB connection error:', err));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, Ted bus is working');
});

// VirtualLook Endpoint
app.post("/virtualLook", async (req, res) => {
    try {
        const bus = await busSchema.findOne({ _id: req.body.busid }); // Use findOne instead of find
        if (!bus) {
            return res.status(404).json({ status: false, message: "No buses available" });
        }
        return res.status(200).json({ status: true, bus:bus});
    } catch (error) {
        console.error("Error fetching virtualLook:", error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
