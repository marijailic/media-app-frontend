<template>
    <div
        v-if="uploadedFiles.length"
        class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto h-40"
    >
        <div
            v-for="media in uploadedFiles"
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
            'mt-4': uploadedFiles.length,
        }"
        class="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 bg-white/10"
        @dragover.prevent
        @dragenter.prevent
        @drop="handleDroppedFilesUpload"
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
                        @change="handleSelectedFilesUpload"
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
import { useMediaAlbumStore } from "@/stores/mediaAlbum.store";

export default {
    name: "addMediaAlbum",
    data() {
        return {
            mediaAlbumStore: useMediaAlbumStore(),
            filesForUpload: [],
            uploadedFiles: [],
        };
    },
    setup() {
        return {
            albumId: uuidv4(),
        };
    },
    methods: {
        async handleSelectedFilesUpload(event) {
            const selectedFiles = Array.from(event.target.files);
            if (selectedFiles.length) {
                await this.upload(selectedFiles);
            }
        },
        async handleDroppedFilesUpload(event) {
            event.preventDefault();
            event.stopPropagation();

            const droppedFiles = Array.from(event.dataTransfer.files);
            if (droppedFiles.length) {
                await this.upload(droppedFiles);
            }
        },
        async upload(files) {
            this.filesForUpload.push(...files);
            const uploadedFilesData = await this.mediaAlbumStore.uploadFiles(
                this.albumId,
                this.filesForUpload
            );
            this.uploadedFiles.push(...uploadedFilesData);
            this.filesForUpload = [];
        },
        async handleFileDelete(fileId) {
            await this.mediaAlbumStore.deleteFile(this.albumId, fileId);

            this.uploadedFiles = this.uploadedFiles.filter(
                (media) => media.id !== fileId
            );
        },
        finishUpload() {
            this.$emit("closePopup");
            // TODO:: prikazi album na home
        },
    },
};
</script>
