import mongoose from "mongoose";

let isConnected = false;

const connectDB = async() => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("✅ Conectado a la base de datos");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
}

export default connectDB;