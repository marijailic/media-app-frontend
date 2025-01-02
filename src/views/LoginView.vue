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
                <form class="space-y-6" @submit.prevent="handleLogin">
                    <div>
                        <label
                            for="email"
                            class="block text-sm/6 font-medium text-white/50"
                            >Email address</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="email"
                                type="email"
                                name="email"
                                id="email"
                                autocomplete="email"
                                required
                                class="block w-full rounded-md bg-white/10 px-3 py-1.5 text-base text-white/50 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue/50 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label
                                for="password"
                                class="block text-sm/6 font-medium text-white/50"
                                >Password</label
                            >
                            <div class="text-sm">
                                <a
                                    href="#"
                                    class="font-semibold text-blue/75 hover:text-blue/90"
                                    >Forgot password?</a
                                >
                            </div>
                        </div>
                        <div class="mt-2">
                            <input
                                v-model="password"
                                type="password"
                                name="password"
                                id="password"
                                autocomplete="current-password"
                                required
                                class="block w-full rounded-md bg-white/10 px-3 py-1.5 text-base text-white/50 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue/50 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div v-if="errorMessage">
                        <p class="mt-2 text-center text-sm/6 text-white/40">
                            {{ errorMessage }}
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-blue/75 px-3 py-1.5 text-sm/6 font-semibold text-white/95 shadow-sm hover:bg-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue/90"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm/6 text-white/40">
                    Not a member?
                    <a
                        href="#"
                        class="font-semibold text-blue/75 hover:text-blue/90"
                        >You should be.</a
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "@/services/authService";

// TODO:: You should be. - dodati na backend?
// TODO:: Forgot password? - dodati na backend?

export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async handleLogin() {
            this.errorMessage = "";

            const loggedIn = await login({
                email: this.email,
                password: this.password,
            });

            if (!loggedIn) {
                this.errorMessage =
                    "Invalid email or password. Please try again.";
                return;
            }

            this.$router.push("/home");
        },
    },
};
</script>
