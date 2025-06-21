import { NextResponse } from "next/server";
import LodgesDao from "@/app/dao/lodge.dao";
import { bucket } from "@/app/config/firebase.config";

const lodgeDao = new LodgesDao();

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const lodge = await lodgeDao.getById(id);
    if (!lodge) return NextResponse.json({ message: "Ese lodge no existe.." }, { status: 404 });
    if (lodge.images.length >= 5) return NextResponse.json({ message: "Máximo de 5 imágenes alcanzado.." }, { status: 400 });
    const formData = await request.formData();
    const file = formData.get("image");
    if (!file || !(file instanceof Blob)) return NextResponse.json({ message: "No se ha subido ninguna imagen válida." }, { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `lodges/${id}/${Date.now()}-${file.name}`;
    const firebaseFile = bucket.file(fileName);
    const stream = firebaseFile.createWriteStream({ metadata: { contentType: file.type || "image/webp" }});
    stream.end(buffer);
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });
    await firebaseFile.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`;
    lodge.images.push(publicUrl);
    await lodgeDao.updateById(id, { images: lodge.images });
    return NextResponse.json({ message: "Imagen subida con éxito.", imageUrl: publicUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al subir imagen.", error: error.message }, { status: 500 });
  }
}