const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const mongoose=require("mongoose");

const server=http.createServer(app);
const socket_io=require("socket.io");
const io=socket_io(server);
const dotenv=require("dotenv");
dotenv.config();

//routers:
const authorized=require("./logic/validators/auth.js");
const signRouter=require("./requests/post/routes/sign/sign.js");
const postsRouter=require("./requests/post/routes/posts/saveIt/saveIt.js");
const PORT=process.env.PORT || 5000;

//Event handlers...
const handleEvent=require("./sockets/events/handleEvent");

//connecting to the database...
mongoose.connect(process.env.URI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true });
    const db=mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to the database...");
    });
    
//routes:
app.use(cors());
app.use(express.json());

//for testing purpose only...
app.get("/", (req, res)=>{
    return res.status(200).send({data: "Server is up and running right now", error: false});
});

//post
app.use("/sign", signRouter);
app.use("/posts", authorized, postsRouter);

//get

//delete

//patch

//socket.io
io.on("connection", socket=>{
    handleEvent(socket);
    socket.on("disconnect", ()=>{
        console.log("A user has disconnected just now");
    });
});

server.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});