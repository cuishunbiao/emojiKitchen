<template>
    <div class="text-gray-900">
        <main class="container mx-auto px-4 py-8 max-w-screen-md">
            <section class="mb-8">
                <div class="text-4xl text-center font-semibold mb-4">Emoji Kitchen How to Use?</div>
                <p class="text-lg mt-10">
                    we've got this awesome "Emojify" feature that lets you turn plain emojis into super exciting and personalized expressions.
                </p>
                <p class="text-lg mt-2">
                    You can mix and match different emojis to create unique combinations that perfectly capture your emotions or messages.
                </p>
            </section>
            <section class="mb-8">
                <div class="text-2xl font-semibold mb-4">How to go about it?</div>
                <p class="text-lg">
                    Pick two emojis you really like, then blend them together to create a brand new emoji. For example, 😊 + 🌟 = ✨. Once you've crafted the emoji you want, simply click "Copy Image" and paste it into your chat app, social media, or anywhere you want to use it.
                </p>
            </section>
            <section class="mb-8">
                <div class="text-xl font-semibold mb-2">Joy + Caring = Super joyful and caring</div>
                <img :src="joyful" alt="Joyful and Caring Emoji" class="w-full mb-4">
            </section>
            <section class="mb-8">
                <div class="text-xl font-semibold mb-2">Sad + Little Rabbit = Sad little rabbit</div>
                <img :src="rabbit" alt="Sad Little Rabbit Emoji" class="w-full mb-4">
            </section>
            <section class="mb-8">
                <div class="text-xl font-semibold mb-2">Anger + Shut up = Anger beyond words</div>
                <img :src="anger" alt="Anger Beyond Words Emoji" class="w-full mb-4">
            </section>
            <section class="mt-8">
                <p class="text-lg">
                    Our mission at emojiKitchen.info is to make playing with and crafting unique emojis fun and easy.
                </p>
                <p class="text-lg mt-2">
                    So go ahead, explore its features, unleash your creativity, and add a personalized touch to your emoji game!
                </p>
            </section>
        </main>
    </div>
</template>
  
<script setup lang="ts">
import anger from "@/assets/images/anger.png";
import joyful from "@/assets/images/joyful.png";
import rabbit from "@/assets/images/rabbit.png";

useSeoMeta({
    title: 'emoji kitchen how to use - Emoji Kitchen Online',
    ogTitle: 'emoji kitchen how to use - Emoji Kitchen Online',
    keywords: 'emoji kitchen how to use, emoji kitchen',
    description: "we've got this awesome \"Emojify\" feature that lets you turn plain emojis into super exciting and personalized expressions.",
    ogDescription: "we've got this awesome \"Emojify\" feature that lets you turn plain emojis into super exciting and personalized expressions."
})
</script>
