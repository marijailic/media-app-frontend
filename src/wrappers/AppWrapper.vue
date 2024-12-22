<template>
    <RouterView />

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

export default {
    name: "AppWrapper",
    components: { Popup },
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
};
</script>
