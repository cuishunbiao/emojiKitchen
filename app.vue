<template>
    <HeaderBox />
    <div class="page">
        <NuxtPage />
    </div>
    <Footer />
</template>
<script setup>
import HeaderBox from '~/components/HeaderBox.vue'
import Footer from '~/components/Footer.vue'
</script>
<style>
.page{
    padding-top: 3.5rem;
}
</style>