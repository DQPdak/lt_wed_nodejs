import { useState } from "react";
import { UploadImage } from "../Services/uploadImageService";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    setLoading(true);
    try {
      const data = await UploadImage(image);
      console.log("Image uploaded successfully:", data);
      if (data) {
        alert("Upload thành công!");
        setPreview(data); // Link Cloudinary
      } else {
        alert("Upload thất bại!");
      }
    } catch (err) {
      alert("Lỗi khi upload ảnh!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img src={preview} alt="Preview" width="300" />
        </div>
      )}
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Đang upload..." : "Upload"}
      </button>
    </div>
  );
}
