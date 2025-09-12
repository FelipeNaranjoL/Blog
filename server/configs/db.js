import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Escucha cuando la conexión se establece correctamente
        mongoose.connection.on('connected', () => 
            console.log("Base de datos conectada")
        );

        // Conexión a la base de datos
        await mongoose.connect(`${process.env.MONGODB_URI}/madera326_db_user`);
    } catch (error) {
        console.log(error.message + " error al conectarse a la bd");
    }
}

export default connectDB;
