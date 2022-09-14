import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import routes from './routes';

const PORT = process.env.PORT || 5000;

createConnection().then(async () => {
    const app = express();

    //Middleware
    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    // Routes
    app.use('/', routes);

    // start express server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch(error => console.log(error));