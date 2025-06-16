import UserModel from "@/app/models/user.model.js";
import connectDB from "@/app/config/mongoose.config.js";

export default class UsersDao {

    paginate = async (filters = {}, options = {}) => {
        try {
            await connectDB();
            return await UserModel.paginate(filters, options);
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };

    gets = async() => {
        try {
            await connectDB();
            return await UserModel.find();
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };

    getById = async( id ) => {
        try {
            await connectDB();
            return await UserModel.findOne({ _id: id });
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    }

    getByProperty = async( doc ) => {
        try {
            await connectDB();
            return await UserModel.find( doc );
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };

    create = async( data ) => {
        try {
            await connectDB();
            const item = await UserModel( data );
            await item.save();
            return item;
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    }

    updateById = async (id, doc) => {
        try {
            await connectDB();
            const item = await this.getById(id);
            if (!item) throw new Error("No encontrado..");
            return await UserModel.findByIdAndUpdate(id, doc, { new: true });
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };    

    deleteById = async( id ) => {
        try {
            await connectDB();
            const item = await this.getById( id );
            if ( !item ) return new Error("No encontrado..");
            return await UserModel.findOneAndDelete({ _id: id });
        } catch ( error ) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };

    deleteAll = async () => {
        try {
            await connectDB();
            await UserModel.deleteMany({});
            return await this.gets();
        } catch (error) {
            throw new Error( "Hubo un error en el servidor..", error.message );
        }
    };    
};