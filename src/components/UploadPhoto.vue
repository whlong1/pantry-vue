<template>
  <h2 class="text-2xl font-bold mb-4">Upload</h2>
  <div v-if="!isLoading && !uploadSuccess">
    <label @dragover.prevent @drop.prevent="handleDropOrSelect"
      class="border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer block">
      Drop an image here or click to select
      <input type="file" accept="image/*" @change="handleDropOrSelect" hidden />
    </label>
    <div v-if="imageUrl" class="mt-2.5">
      <img :src="imageUrl" alt="Preview" class="w-40">
    </div>
    <button @click="handleSubmit" :disabled="!fileState">
      Submit
    </button>
  </div>
  <!-- Loading -->
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <!-- Success -->
  <div v-if="uploadSuccess">
    <p>Food added successfully!</p>
    <button @click="resetForm">Upload More</button>
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
    const isUploadOk = await photoService.uploadFileToS3Bucket(fileState.value, putUrl);
    if (!isUploadOk) throw new Error("Upload failed!");

    const newFood = await foodService.createFood(getUrl);
    await photoService.removeFromS3Bucket(photoId);
    console.log("New Food:", newFood);

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