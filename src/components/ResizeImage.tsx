import axios from "axios";
import { useState } from "react";

export default function ResizeImage() {
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/resize-image", formData);
      const base64Image = response.data.image;
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setImageUrl(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div>
        <p>Resize Image</p>
        <div>
          <input type="file" onChange={handleImageUpload} />
          <img id="resized-img" alt="Resized Image" src={imageUrl} />
        </div>
      </div>
    </main>
  );
}
