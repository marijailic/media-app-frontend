<template>
    <div class="flex justify-center h-screen">
        <div
            class="flex min-h-full flex-col justify-center items-center w-full max-w-lg"
        >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2
                    class="text-center text-2xl/9 font-bold tracking-tight text-white/40"
                >
                    MediaApp
                </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="text-center">
                    <h1
                        class="text-3xl/10 font-bold tracking-tight text-white/90"
                    >
                        404 - Page Not Found
                    </h1>
                    <p class="mt-4 text-sm/6 text-white/50">
                        The page you are looking for does not exist.
                    </p>
                    <router-link
                        to="/login"
                        class="mt-6 inline-flex items-center justify-center rounded-md bg-blue/75 px-4 py-2 text-sm/6 font-semibold text-white/95 shadow-sm hover:bg-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/90"
                    >
                        Go Back
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFoundView",
};
</script>
