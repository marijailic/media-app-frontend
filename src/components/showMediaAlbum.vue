<template>
    <div>
        <h2>Album ID: {{ id }}</h2>
    </div>
</template>

<script>
export default {
    name: "showMediaAlbum",
    props: {
        id: String,
    },
};
</script>
