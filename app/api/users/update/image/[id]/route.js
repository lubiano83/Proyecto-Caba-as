import { NextResponse } from "next/server";
import UsersDao from "@/app/dao/user.dao";
import { bucket } from "@/app/config/firebase.config";

const userDao = new UsersDao();

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const user = await userDao.getById(id);
        if (!user) return NextResponse.json({ message: "Usuario no encontrado.." }, { status: 404 });
            const buffer = await request.arrayBuffer();
            const fileBuffer = Buffer.from(buffer);
            const fileName = request.headers.get("x-filename") || `profile-${Date.now()}.webp`;
            const contentType = request.headers.get("content-type") || "image/webp";
        if (!fileBuffer || fileBuffer.length === 0) return NextResponse.json({ message: "No se ha recibido ninguna imagen.." }, { status: 400 });
        if (user.image && user.image.includes("storage.googleapis.com")) {
            try {
                const imageUrl = new URL(user.image);
                const pathInBucket = imageUrl.pathname.replace(`/${bucket.name}/`, "");
                const oldFile = bucket.file(pathInBucket);
                await oldFile.delete().catch(() => {});
            } catch (err) {
                console.warn("Error al eliminar imagen anterior:", err.message);
            }
        }
        const firebasePath = `profile/${Date.now()}-${fileName}`;
        const file = bucket.file(firebasePath);
        await file.save(fileBuffer, { metadata: { contentType }});
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        await userDao.updateById(id, { image: publicUrl });
        return NextResponse.json({ message: "Imagen cambiada con éxito..", imageUrl: publicUrl });
    } catch (error) {
        return NextResponse.json({ message: "Error interno del servidor..", error: error.message },{ status: 500 });
    }
};