import "dotenv/config";
import express from "express";
import cors from "cors";
import { router }  from "./routes";
import db from "./config/mongo";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

db().then(()=> { console.log('Conectado con la base de datos')})

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Listo en puerto ${PORT}`))