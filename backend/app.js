import express from "express";
import morgan from 'morgan';
import connect from "./db/db.js";
import userRoutes from "./routes/userRoute.js"
import projectRoute from "./routes/projectRoute.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect();


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/projects', projectRoute);
// app.use("/ai", aiRoutes)



app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app; 