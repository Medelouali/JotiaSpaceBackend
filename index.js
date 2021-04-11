const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");

const server=http.createServer(app);
const socket_io=require("socket.io");
const io=socket_io(server);

// const bodyParser=require("body-parser");
const dotenv=require("dotenv");
dotenv.config();
//routers:
const signRouter=require("./routes/sign/sign");
const dataRouter=require("./routes/sign/data/userRouter");

const PORT=process.env.PORT || 5000;

//mongoose connection{database}:
const mongoose=require("mongoose");
mongoose.connect(process.env.URI,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useUnifiedTopology: true }).
        then(()=>{
            console.log("connected to the database");
        }).catch(()=>{
            console.log("Can't connect to the database...");
        });

//routes:
// app.use(bodyParser);
app.use(cors());
app.use(express.json());

//for testing purpose...
app.get("/", (req, res)=>{
    return res.status(200).send({data: "Server is up and running", error: false});
});

app.use("/sign", signRouter);
app.use("/users", dataRouter);

//socket.io
io.on("connection", socket=>{
    console.log("A user has joined");
    console.log(socket.id);
    socket.on("disconnect", ()=>{
        console.log("a user has disconnected just now");
    });
});

server.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});