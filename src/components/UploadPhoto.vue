<template>
  <h1 class="text-2xl font-bold mb-4 leading-none text-gray-900">Upload</h1>

  <!-- Upload and Image Preview -->
  <div v-if="!isLoading && !uploadSuccess" class="flex flex-col justify-center items-center box-border">
    <label v-if="!fileState" @dragover.prevent @drop.prevent="handleDropOrSelect" class="flex items-center justify-center min-h-60 mr-1 w-full rounded-sm border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer box-border	">
      <p class="text-sm font-bold text-gray-600">Drag and drop an image or click to select a file</p>
      <input type="file" accept="image/*" @change="handleDropOrSelect" hidden />
    </label>
    <div v-else class="p-2 h-60 min-h-60 ml-1 bg-slate-100 w-full m-0 flex justify-center items-center border-2 border-gray-200 rounded-sm box-border">
      <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="h-full rounded-sm">
      <p v-else class="text-sm font-bold text-gray-600">No Image Selected</p>
    </div>
    <button @click="handleSubmit" :disabled="!fileState" class="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
      Submit
    </button>
  </div>

  <!-- Loading -->
  <div v-if="isLoading" class="p-2 h-60 min-h-60 ml-1 w-full m-0 flex justify-center items-center">
    <p class="text-1xl font-bold mb-4 leading-none text-gray-800">Loading</p>
  </div>

  <!-- Success -->
  <div v-if="uploadSuccess" class="p-2 h-60 min-h-60 ml-1 w-full m-0 flex flex-col justify-center items-center">
    <p class="text-1xl font-bold mb-4 leading-none text-gray-800">Food Item Added!</p>
    <button @click="resetForm" class="w-auto text-white bg-blue-500 hover:bg-blue-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
      Upload More
    </button>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import * as foodService from '../services/foodService';
import * as photoService from '../services/photoService';

const fileState = ref(null);
const imageUrl = ref(null);
const isLoading = ref(false);
const uploadSuccess = ref(false);

const handleDropOrSelect = (e) => {
  if (e.type === "drop") setFileAndPreview(e.dataTransfer.files[0]);
  if (e.type === "change") setFileAndPreview(e.target.files[0]);
};

const setFileAndPreview = (selectedFile) => {
  if (selectedFile && selectedFile.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => imageUrl.value = e.target.result;
    reader.readAsDataURL(selectedFile);
    fileState.value = selectedFile;
  }
};

const handleSubmit = async () => {
  try {
    isLoading.value = true
    const { photoId, putUrl, getUrl } = await photoService.generatePresignedPutURL(fileState.value);
    console.log("Put URL generated.")
    const isUploadOk = await photoService.uploadFileToS3Bucket(fileState.value, putUrl);
    if (!isUploadOk) throw new Error("Upload failed!");
    console.log("Image uploaded to S3 Bucket.")
    const newFood = await foodService.createFood(getUrl);
    console.log("New food item added to database:", newFood);
    await photoService.removeFromS3Bucket(photoId);
    console.log("Image removed from S3.")
    imageUrl.value = null;
    fileState.value = null;
    isLoading.value = false;
    uploadSuccess.value = true;
  } catch (error) {
    console.log("Error:", error)
  }
};

const resetForm = () => {
  uploadSuccess.value = false;
};
</script>