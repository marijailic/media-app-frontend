<template>
    <div
        v-if="uploadedMedia.length"
        class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto h-40"
    >
        <div
            v-for="media in uploadedMedia"
            :key="media.id"
            class="relative rounded-lg p-4 text-center"
        >
            <img
                :src="media.thumb_url || '/file-placeholder-img.png'"
                class="w-full h-32 object-cover rounded-lg"
            />
            <button
                @click="handleFileDelete(media.id)"
                class="absolute top-2 right-2 rounded-full bg-red/90 text-white/90 px-2 py-1 text-xs shadow-sm hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
                Delete
            </button>
        </div>
    </div>

    <div
        :class="{
            'mt-4': uploadedMedia.length,
        }"
        class="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 bg-white/10"
        @dragover.prevent
        @dragenter.prevent
        @drop="handleFileDrop"
    >
        <div class="text-center flex flex-col items-center">
            <div class="flex text-sm/6 text-white/50">
                <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-semibold text-blue/75 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue/50 focus-within:ring-offset-2 hover:text-blue/90"
                >
                    <span>Upload files</span>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        accept=".jpeg, .png, .jpg, .pdf, .doc, .docx, .xls, .xlsx"
                        multiple
                        @change="handleFilesUpload"
                    />
                </label>
                <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs/5 text-white/40">
                JPEG, PNG, JPG, PDF, DOC, DOCX, XLS, XLSX
            </p>
            <p class="text-xs/5 text-white/40">files up to 2MB</p>
        </div>
    </div>
    <button
        @click="finishUpload"
        class="popup-close mt-4 flex w-full justify-center rounded-md bg-blue/75 px-3 py-1.5 text-sm font-semibold text-white/95 shadow-sm hover:bg-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/90"
    >
        Finish
    </button>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import backendApiService from "@/services/backendApiService.js";

export default {
    name: "addMediaAlbum",
    data() {
        return {
            files: [],
            uploadedMedia: [],
        };
    },
    setup() {
        return {
            uuid: uuidv4(),
        };
    },
    methods: {
        async handleFilesUpload(event) {
            const selectedFiles = Array.from(event.target.files);
            if (selectedFiles.length) {
                this.files.push(...selectedFiles);
                await this.uploadFiles();
            }
        },
        async handleFileDrop(event) {
            event.preventDefault();
            event.stopPropagation();

            const droppedFiles = Array.from(event.dataTransfer.files);
            if (droppedFiles.length) {
                this.files.push(...droppedFiles);
                await this.uploadFiles();
            }
        },
        async uploadFiles() {
            const formData = new FormData();
            formData.append("id", this.uuid);

            this.files.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });

            try {
                const response = await backendApiService.post({
                    url: "api/media-album",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                });

                const data = await response.json();
                this.uploadedMedia.push(...data.data);
            } catch (error) {
                console.error("Error uploading files:", error);
            }
            this.files = [];
        },
        async handleFileDelete(fileId) {
            try {
                const response = await backendApiService.delete({
                    url: `api/media-album/${this.uuid}/media/${fileId}`,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    this.uploadedMedia = this.uploadedMedia.filter(
                        (media) => media.id !== fileId
                    );
                }
            } catch (error) {
                console.error("Error deleting files:", error);
            }
        },
        finishUpload() {
            this.$emit("closePopup");
            // TODO:: prikazi album na home
        },
    },
};
</script>
