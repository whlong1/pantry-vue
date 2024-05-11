<template>
  <h2>Upload Photo</h2>
  <div class="text-white">
    <label 
      @dragover.pre
      @drop.pre="handleDropOrSelect"
      class="border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer block"
    >
      Drop an image here or click to select
      <input 
        ref="file" 
        type="file" 
        accept="image/*" 
        @change="handleDropOrSelect"
      />
    </label>

    <div v-if="imageUrl" class="mt-2.5">
      <img :src="imageUrl" alt="Preview" class="w-40">
    </div>

    <div v-if="newFood">
      {{ JSON.stringify(newFood, null, 2) }}
    </div>

    <button @click="handleSubmit">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as foodService from '../services/foodService';
import * as photoService from '../services/photoService';

const file = ref(null);
const imageUrl = ref(null);
const newFood = ref(null);

const handleDropOrSelect = (e) => {
  file.value = null;
  imageUrl.value = null;
  if (e.type === "drop") setFileAndPreview(e.dataTransfer.files[0]);
  if (e.type === "change") setFileAndPreview(e.target.files[0]);
};

const setFileAndPreview = (file) => {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => imageUrl.value = e.target.result;
    reader.readAsDataURL(file);
    file.value = file;
  }
};

const handleSubmit = async () => {
  if (!imageUrl.value) return;
  const { photoId, putUrl, getUrl } = await photoService.generatePresignedPutURL(file.value);
  const uploadSuccess = await photoService.uploadFileToS3Bucket(file.value, putUrl);

  if (!uploadSuccess) return;

  newFood.value = await foodService.createFood(getUrl);

  imageUrl.value = null;
  file.value = null;
  // delete photo
};
</script>
