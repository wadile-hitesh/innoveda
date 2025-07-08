import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest ) {
  const formData = await req.formData();
  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: "File Not Found" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const transformer = sharp(fileBuffer)
      .resize(500, 500)
      .toBuffer()
      .then((data) => {
        console.log(data);
        return data;
      });

    const base64Image = Buffer.from(await transformer).toString("base64");

    return NextResponse.json({ image: base64Image }, { status: 200 });
  } catch (error) {

    if(error instanceof Error){
      return NextResponse.json({ error: "Error Occured While" });
    }
  }
}
