import mongoose from "mongoose";
import config from "../config";

const options = {
  socketTimeoutMS: 0,
  connectTimeoutMS: 30000,
};

export const dbConnect = async () => {
  await mongoose.connect(config.DB_URI, options);

  mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB.');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Error en la conexión de MongoDB: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado de MongoDB.');
  });
  
  process.on('SIGINT', () => {
    mongoose.connection.close()
    .then(() => {
        console.log('Conexión de MongoDB cerrada debido a la finalización de la aplicación');
        process.exit(0);
    })
  });
};