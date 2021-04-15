const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URL;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});

const connection = mongoose.connection;
connection.once("open",()=>console.log("Database connected"));

const listRouter = require("./routes/listItemRouter");
app.use("/list",listRouter);

app.listen(port,()=>console.log(`Server running at port ${port}`))
