import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import SearchRoutes from "./routes/search.route.js";
import {protectRoute} from "./middleware/protect.route.js";
import TvRoutes from "./routes/tv.route.js";
import {ENV_VARS} from "./config/envVars.js";
import {connectDb} from "./config/db.js";
import cookieParser from "cookie-parser";
const app=express();

const port=ENV_VARS.PORT;
// Middleware to parse JSON requests
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//allow us to parse JSON requests.
app.use(express.json()); 
app.use(cookieParser());

// Mounting the auth routes on "/api/v1/auth"
app.use("/api/v1/auth", authRoutes);

// Mounting the movie routes on "/api/v1/movie"
app.use("/api/v1/movie", protectRoute,movieRoutes);

// Mounting the TV routes on "/api/v1/tv"
app.use("/api/v1/tv",protectRoute,TvRoutes);

app.use("/api/v1/search",protectRoute,SearchRoutes);

// Start the server
app.listen(port, () =>{
  console.log("Server started at http://localhost:"+port);
  connectDb();
});
