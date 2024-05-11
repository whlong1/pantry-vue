// Original Next.js Reference:
// https://github.com/whlong1/next.js-photo-app/blob/main/src/services/photoService.ts

const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/photos`;
import * as tokenService from "./tokenService";

const generatePresignedPutURL = async (fileUploadData) => {
  try {
    const { name, type, size } = fileUploadData;
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, type, size }),
    });
    // Output includes: { photoId, putUrl, getUrl }
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

const uploadFileToS3Bucket = async (file, putUrl) => {
  const uploadResponse = await fetch(putUrl, {
    body: file,
    method: "PUT",
    headers: { "Content-Type": file.type },
  });
  return uploadResponse.ok;
};

export { generatePresignedPutURL, uploadFileToS3Bucket };