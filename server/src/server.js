import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT; 

app.get("/", (req, res) => {
    res.send("Server is working");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});