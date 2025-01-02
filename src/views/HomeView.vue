<template>
    <button
        class="fixed top-10 right-10 inline-flex items-center justify-center rounded-md bg-blue/75 px-4 py-2 text-sm font-semibold text-white/95 shadow-sm hover:bg-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/90 z-10"
        @click="handleLogout"
    >
        Log Out
    </button>

    <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-34 py-34 pt-22 pb-22"
    >
        <a
            v-for="album in albums"
            :key="album.id"
            class="group relative bg-white/10 p-4 rounded-md shadow-md hover:shadow-lg hover:bg-white/20 transition-all"
        >
            <img
                :src="album.thumb_url || '/file-placeholder-img.png'"
                class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
            />
        </a>
    </div>

    <Popup
        v-if="popupTriggers.addMediaAlbumTrigger"
        :TogglePopup="() => TogglePopup('addMediaAlbumTrigger')"
    >
    </Popup>

    <button
        class="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-blue/75 text-white/95 shadow-lg flex items-center justify-center z-10 hover:bg-blue/90 transition-all"
        @click="() => TogglePopup('addMediaAlbumTrigger')"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
            />
        </svg>
    </button>
</template>

<script>
import { ref } from "vue";
import Popup from "@/components/Popup.vue";
import { logout } from "@/services/authService";
import { useMediaAlbumStore } from "@/stores/mediaAlbum.store";

export default {
    name: "HomeView",
    components: { Popup },
    data() {
        return {
            mediaAlbumStore: useMediaAlbumStore(),
            albums: [],
        };
    },
    setup() {
        const popupTriggers = ref({
            addMediaAlbumTrigger: false,
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger];
        };

        return {
            Popup,
            popupTriggers,
            TogglePopup,
        };
    },
    async created() {
        this.albums = await this.mediaAlbumStore.fetchAlbumsWithThumbnails();
    },
    methods: {
        handleLogout() {
            const loggedOut = logout();

            if (!loggedOut) {
                this.$router.push("/error");
                return;
            }

            this.$router.push("/login");
        },
    },
};
</script>
