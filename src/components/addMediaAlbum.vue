<template>
    <div
        class="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 bg-white/10"
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
                        accept=".jpeg, .png, .jpg, .pdf, .doc, .docx, .xls"
                        multiple
                        @change="handleFileUpload"
                    />
                </label>
                <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs/5 text-white/40">
                JPEG, PNG, JPG, PDF, DOC, DOCX, XLS files up to 2MB
            </p>
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
    data() {
        return {
            files: [],
        };
    },
    setup() {
        return {
            uuid: uuidv4(),
        };
    },
    methods: {
        async handleFileUpload(event) {
            const selectedFiles = Array.from(event.target.files);
            if (selectedFiles.length) {
                this.files.push(...selectedFiles);
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
            } catch (error) {
                console.error("Error uploading files:", error);
            }
            this.files = [];
            // TODO:: pokazati uploadane fileove, mogucnost brisanja
        },
        finishUpload() {
            console.log("MediaAlbum upload finished!");
            // TODO:: zatvori popup
        },
    },
};
</script>
