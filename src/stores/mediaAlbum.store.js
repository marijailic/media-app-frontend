import { defineStore } from "pinia";
import backendApiService from "@/services/backendApiService";

export const useMediaAlbumStore = defineStore("mediaAlbum", {
    state: () => ({}),
    actions: {
        async fetchAlbumsWithThumbnails() {
            const albumResponse = await backendApiService.get({
                url: "api/media-album/albums",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!albumResponse.ok) {
                this.$router.push("/error");
                return;
            }

            const albumData = await albumResponse.json();

            const queryParams = new URLSearchParams();
            albumData.data.forEach((album) =>
                queryParams.append("album_ids[]", album.id)
            );

            const thumbnailResponse = await backendApiService.get({
                url: `api/media-album/thumbnails?${queryParams.toString()}`,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!thumbnailResponse.ok) {
                this.$router.push("/error");
                return;
            }

            const thumbnailData = await thumbnailResponse.json();

            const albumsWithThumbnails = albumData.data.map((album) => {
                const thumbnail = thumbnailData.data.find(
                    (thumb) => thumb.id === album.id
                );
                return {
                    ...album,
                    thumb_url: thumbnail ? thumbnail.thumb_url : null,
                };
            });

            return albumsWithThumbnails;
        },
        async uploadFiles(albumId, files) {
            const formData = new FormData();
            formData.append("id", albumId);

            files.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });

            const response = await backendApiService.post({
                url: "api/media-album",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                this.$router.push("/error");
                return;
            }

            const responseData = await response.json();
            const uploadedFilesData = responseData.data;
            return uploadedFilesData;
        },
        async deleteFile(albumId, fileId) {
            const response = await backendApiService.delete({
                url: `api/media-album/${albumId}/media/${fileId}`,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                this.$router.push("/error");
                return;
            }
        },
    },
});
