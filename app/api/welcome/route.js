import { NextResponse } from "next/server";
import { bucket } from "@/app/config/firebase.config";

export async function GET() {
  try {
    const [files] = await bucket.getFiles({ prefix: "welcome/" });
    const imageFiles = files.filter(file => {
      const name = file.name;
      return (
        name !== "welcome/" && /\.(jpg|jpeg|png|webp|avif)$/i.test(name)
      )
    });
    const urls = await Promise.all(
      imageFiles.map(async (file) => {
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 60 * 60 * 1000,
        });
        return signedUrl;
      })
    );
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener imágenes", error: error.message }, { status: 500 });
  }
}