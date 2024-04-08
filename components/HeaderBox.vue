<template>
    <header class="py-2 fixed top-0 left-0 right-0 z-10" style="background-color: #f4a52a">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <nuxt-link to="/"><img :src="logo" alt="Emoji Kitchen Online" class="w-10 h-10"></nuxt-link>
            </div>
            <nav class="hidden lg:flex">
                <nuxt-link to="/" class="text-white hover:text-gray-700">Home</nuxt-link>
                <nuxt-link class="text-white hover:text-gray-700 ml-8" to="/emoji-kitchen-how-to-use">How To Use</nuxt-link>
                <nuxt-link class="text-white hover:text-gray-700 ml-8" to="/emoji-kitchen-download">Download</nuxt-link>
                <nuxt-link class="text-white hover:text-gray-700 ml-8" target="_blank" to="https://discord.gg/tEsWWBMs">Discord</nuxt-link>
                <nuxt-link class="text-white hover:text-gray-700 ml-8" target="_blank" to="https://github.com/cuishunbiao/emojiKitchen">Github</nuxt-link>
            </nav>
            <!-- Add a responsive mobile menu button -->
            <button class="lg:hidden text-white" @click="toggleMobileMenu">Menu</button>
        </div>
        <!-- Responsive mobile menu -->
        <div v-show="mobileMenuVisible" class="lg:hidden">
            <nuxt-link to="/" class="block text-white hover:text-gray-700 py-2">Home</nuxt-link>
            <nuxt-link to="/emoji-kitchen-how-to-use" class="block text-white hover:text-gray-700 py-2">How To Use</nuxt-link>
            <nuxt-link to="/emoji-kitchen-download" class="block text-white hover:text-gray-700 py-2">Download</nuxt-link>
            <nuxt-link to="https://discord.gg/tEsWWBMs" target="_blank" class="block text-white hover:text-gray-700 py-2">Discord</nuxt-link>
            <nuxt-link to="https://github.com/cuishunbiao/emojiKitchen" target="_blank" class="block text-white hover:text-gray-700 py-2">Github</nuxt-link>
        </div>
    </div>
</header>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import logo from "@/assets/images/logo.png";

const router = useRouter();
const mobileMenuVisible = ref(false);
const toggleMobileMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value;
};
// Watch for route changes
watchEffect(() => {
    // Set mobileMenuVisible to false on route change
    mobileMenuVisible.value = false;
});

const handleRouteChange = () => {
  mobileMenuVisible.value = false;
};

watchEffect(() => {
  router.afterEach(handleRouteChange);
});
</script>
