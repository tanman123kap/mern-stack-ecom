require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db.js");
const productRoutes = require("./routes/product.route.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
    });
};

app.listen(5000, async () => {
    try {
        await connectDb();
        console.log("Server live at port 5000...");
    } catch(error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
});