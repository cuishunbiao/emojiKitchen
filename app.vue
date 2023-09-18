<template>
    <div class="flex items-center justify-center space-x-4" style="width: 70%; height: 30%; margin: 0 auto;">
        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg" style="padding: 1rem 2rem; min-width: 9rem; min-height: 9rem;">
                <img width="80" v-if="aContent" :src="aContent" alt="emoji">
                <div class="flex justify-center mt-2"> <!-- 使用 flex 布局居中按钮 -->
                    <button v-if="aContent" @click="clearAContent" class="text-red-500 hover:text-red-700">Remove</button>
                </div>
            </div>
        </div>

        <div class="text-4xl">+</div>

        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg" style="padding: 1rem 2rem; min-width: 9rem; min-height: 9rem;">
                <img width="80" v-if="bContent" :src="bContent" alt="emoji">
                <div class="flex justify-center mt-2"> <!-- 使用 flex 布局居中按钮 -->
                    <button v-if="bContent" @click="clearBContent" class="text-red-500 hover:text-red-700">Remove</button>
                </div>
            </div>
        </div>

        <div class="text-4xl">=</div>

        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg" style="padding: 1rem 2rem; min-width: 9rem; min-height: 9rem;">
                <img width="80" v-if="requestImage" :src="requestImage" alt="emoji">
                <div class="flex justify-center mt-2"> <!-- 使用 flex 布局居中按钮 -->
                    <button v-if="requestImage" class="text-red-500 hover:text-red-700"></button>
                </div>
            </div>
        </div>
    </div>

    <!-- 图标列表 -->
    <div class="mt-4 flex flex-wrap gap-4" style="justify-content: space-around;">
        <li v-for="item in knownSupportedEmoji" :key="item">
            <div :class="{ 'bg-blue-200 radius': selectedAIcon === item || selectedBIcon === item }" @click="imageHandle(item)">
                <img width="80" :alt="`u${item}`" :src="generateEmojiUrl(item)" alt="">
            </div>
        </li>
    </div>
</template>
  
<script setup>
import { ref, watch } from "vue";
import emojiData from './assets/data/emojiData.json';
import { knownSupportedEmoji } from './assets/js/images';

const rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

const imagesList = ref([]);
const resultImageData = ref('');
const requestImage = ref('');

const aContent = ref('');
const selectedAIcon = ref(null);
const bContent = ref('');
const selectedBIcon = ref(null);

const generateEmojiUrl = (emoji) => {
    return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${filterItemUrl(emoji)}.svg`;
};

const googleRequestUrlEmojiPart = (emoji) => {
    return emoji
        .split("-")
        .map((part) => `u${part.toLowerCase()}`)
        .join("-");
};

const filterItemUrl = (item) => {
    return item.split("-").filter((x) => x !== "fe0f").join("_");
};

const imageHandle = (item) => {
    if (!aContent.value) {
        aContent.value = generateEmojiUrl(item);
        selectedAIcon.value = item;
    } else if (!bContent.value) {
        bContent.value = generateEmojiUrl(item);
        selectedBIcon.value = item;
    }

    console.log(item)
    if (aContent.value && bContent.value) {
        resultImageData.value = emojiData[selectedAIcon.value].filter((c) => c.leftEmoji === selectedAIcon.value && c.rightEmoji === selectedBIcon.value)
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .pop() ??
            emojiData[selectedBIcon.value].filter((c) => c.leftEmoji === selectedBIcon.value && c.rightEmoji === selectedAIcon.value)
                .sort((a, b) => (a.date > b.date ? 1 : -1))
                .pop();

        googleRequestUrl(resultImageData.value.date, resultImageData.value.leftEmoji, resultImageData.value.rightEmoji);
    }
};

const clearAContent = () => {
    aContent.value = '';
    selectedAIcon.value = null;
};

const clearBContent = () => {
    bContent.value = '';
    selectedBIcon.value = null;
};

const googleRequestUrl = (date, first, second) => {
    requestImage.value = `${rootUrl}/${date}/u${first}/u${first}_u${second}.png`;
};

// 监视aContent和bContent的变化
// watch([aContent, bContent], () => {
//     if (aContent.value && bContent.value) {
//         triggerGoogleRequest();
//     }
// });
</script>
  
<style>
li:hover{
    cursor: pointer;
}
.radius{
    border-radius: .5rem;
}
</style>
  