<template>

  <div class="text-white">

    <label 
      v-on:dragover.prevent
      v-on:drop.prevent="handleDropOrSelect"
      class="border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer block"
    >
      Drop and drop an image or click to select
      <input 
        class="hidden" 
        type="file"
        ref="fileInput" 
        accept="image/*" 
        v-on:change="handleDropOrSelect" 
      />
    </label>
    
    <div v-if="imageUrl" class="mt-2.5">
      <img :src="imageUrl" alt="Preview" class="w-40">
    </div>

    <div v-if="newFood">
      {{JSON.stringify(newFood, null, 2)}}
    </div>


  </div>
  <button v-on:click="handleSubmit">Submit</button>
</template>

<script>
import * as foodService from "../services/foodService.js"
import * as photoService from "../services/photoService.js"
export default {
  data() {
    return {
      file: null, // image file to be uploaded
      imageUrl: null, // url for previewing the image
      newFood: null
    };
  },
  methods: {

    async handleSubmit(){
      console.log("hello")
      if (!this.imageUrl) return
      const { photoId, putUrl, getUrl } = await photoService.generatePresignedPutURL(this.file)
      console.log(photoId, putUrl, getUrl)
      const uploadStatus = await photoService.uploadFileToS3Bucket(this.file, putUrl)
      console.log("component", uploadStatus)
      const newFood = await foodService.createFood(getUrl)
      console.log(newFood)
      this.imageUrl = null
      this.file = null
      this.newFood = newFood
    },

    handleDropOrSelect(e) {
      if (e.type === "drop") this.previewImage(e.dataTransfer.files[0]);
      if (e.type === "change")  this.previewImage(e.target.files[0]);
      
    },

    previewImage(file) {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if(e.target) this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
        this.file = file;
      }
    }
  }
}
</script>