<template>
    <div
        class="popup fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
        <div
            class="popup-inner w-full max-w-md rounded-lg bg-white/10 p-6 shadow-lg"
        >
            <component
                :is="componentName"
                v-bind="componentProps"
                @closePopup="TogglePopup"
            />
            <button
                class="popup-close mt-4 flex w-full justify-center rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-blue/75 shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/90"
                @click="TogglePopup()"
            >
                Quit
            </button>
        </div>
    </div>
</template>

<script>
import addMediaAlbum from "@/components/addMediaAlbum.vue";
import showMediaAlbum from "@/components/showMediaAlbum.vue";

export default {
    name: "Popup",
    props: {
        TogglePopup: Function,
        componentName: String,
        componentProps: Object,
    },
    components: { addMediaAlbum, showMediaAlbum },
};
</script>
