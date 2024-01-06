<template>
    <div v-if="tipsStatus" class="fixed top-0 left-0 right-0 text-white p-4 shadow-lg" style="background-color: #f4a52a">
        <div class="flex justify-between items-center">
            <div class="flex">
                Click to choose two emoticons that appeal to you and craft a new emoticon. <nuxt-link class="ml-4" to="/emoji-kitchen-how-to-use">emoji kitchen how to use</nuxt-link>
            </div>
            <button class="text-white hover:text-red-500" @click="hideTips">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div>
    <div class="fixed flex items-center justify-center space-x-4 select-box" :class="{ smallTop: !tipsStatus }">
        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg box-item">
                <img width="80" v-if="aContent" :src="aContent" alt="emoji" />
                <div class="flex justify-center mt-2">
                    <button v-if="aContent" @click="clearAContent" class="text-red-500 hover:text-red-700">
                        Remove
                    </button>
                </div>
            </div>
        </div>

        <div class="text-4xl">+</div>

        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg box-item">
                <img width="80" v-if="bContent" :src="bContent" alt="emoji" />
                <div class="flex justify-center mt-2">
                    <button v-if="bContent" @click="clearBContent" class="text-red-500 hover:text-red-700">
                        Remove
                    </button>
                </div>
            </div>
        </div>

        <div class="text-4xl">=</div>

        <div class="w-1/3 flex justify-center items-center">
            <div class="border border-gray-300 p-4 rounded-lg box-item">
                <div v-if="noResult" style="
            height: 6.5rem;
            display: flex;
            align-items: center;
            text-align: center;
            color: rgb(239, 68, 68);
            font-size: 1.2rem;
          ">
                    No matching results
                </div>
                <img width="80" ref="imagesResultRef" id="imagesResultId" v-if="!noResult && requestImage" :src="requestImage" alt="emoji" />
                <div class="flex justify-center mt-2">
                    <button v-if="requestImage" @click="copyImage" class="text-red-500 hover:text-red-700">
                        {{ currentText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4 flex flex-wrap gap-4 app-box" :class="{ appBoxSmallTop: !tipsStatus }" style="justify-content: space-around">
        <li v-for="item in knownSupportedEmoji" :key="item">
            <div :class="{
                'bg-blue-300 radius':
                    selectedAIcon === item || selectedBIcon === item,
            }" @click="imageHandle(item)">
                <img width="60" :alt="`u${item}`" :src="generateEmojiUrl(item)" />
            </div>
        </li>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import emojiData from "./assets/data/emojiData.json";
import { knownSupportedEmoji } from "./assets/js/images";

const rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

const imagesList = ref([]);
const resultImageData = ref("");
const requestImage = ref("");

const aContent = ref("");
const selectedAIcon = ref(null);
const bContent = ref("");
const selectedBIcon = ref(null);

const tipsStatus = ref(true);

const imagesResultRef = ref();
const imagesResultButton = ref();

const currentText = ref("Copy image");
const noResult = ref(false);

const hideTips = () => {
    tipsStatus.value = false;
};

const generateEmojiUrl = (emoji) => {
    return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${filterItemUrl(
        emoji
    )}.svg`;
};

const googleRequestUrlEmojiPart = (emoji) => {
    return emoji
        .split("-")
        .map((part) => `u${part.toLowerCase()}`)
        .join("-");
};

const filterItemUrl = (item) => {
    return item
        .split("-")
        .filter((x) => x !== "fe0f")
        .join("_");
};

const imageHandle = (item) => {
    //is check true？
    if(item === selectedAIcon.value){
        aContent.value = ''
        selectedAIcon.value = ''
        resultImageData.value = ''
        noResult.value = false;
        return;
    }
    if(item === selectedBIcon.value){
        bContent.value = ''
        selectedBIcon.value = ''
        resultImageData.value = ''
        noResult.value = false;
        return;
    }
    //
    if (!aContent.value) {
        aContent.value = generateEmojiUrl(item);
        selectedAIcon.value = item;
    } else if (!bContent.value) {
        bContent.value = generateEmojiUrl(item);
        selectedBIcon.value = item;
    }

    console.log(item);
    if (aContent.value && bContent.value) {
        resultImageData.value =
            emojiData[selectedAIcon.value]
                .filter(
                    (c) =>
                        c.leftEmoji === selectedAIcon.value &&
                        c.rightEmoji === selectedBIcon.value
                )
                .sort((a, b) => (a.date > b.date ? 1 : -1))
                .pop() ??
            emojiData[selectedBIcon.value]
                .filter(
                    (c) =>
                        c.leftEmoji === selectedBIcon.value &&
                        c.rightEmoji === selectedAIcon.value
                )
                .sort((a, b) => (a.date > b.date ? 1 : -1))
                .pop();

        if (!resultImageData.value) {
            noResult.value = true;
            return;
        }
        noResult.value = false;
        const { date, leftEmoji, rightEmoji } = resultImageData.value;
        googleRequestUrl(date, leftEmoji, rightEmoji);
    }
};

const clearAContent = () => {
    aContent.value = "";
    selectedAIcon.value = null;
};

const clearBContent = () => {
    bContent.value = "";
    selectedBIcon.value = null;
};

const googleRequestUrl = (date, first, second) => {
    requestImage.value = `${rootUrl}/${date}/u${first}/u${first}_u${second.replace(
        /-/g,
        "-u"
    )}.png`;
};

watch([aContent, bContent], () => {
    if (!aContent.value || !bContent.value) {
        requestImage.value = "";
    }
});

const copyImage = async () => {
    const doCopyImg2Clipboard = async (
        image,
        success = () => { },
        failure = () => { }
    ) => {
        if (!image || !image.src) {
            return;
        }
        const src = image.src;
        const response = await fetch(src);
        const blob = response.blob();
        const data = [
            new ClipboardItem({
                [blob.type ||
                    "image/" + src.split(".").slice(-1)[0].replace("jpg", "jpeg")]: blob,
            }),
        ];
        navigator.clipboard.write(data).then(success, failure);
    };

    doCopyImg2Clipboard(
        document.getElementById("imagesResultId"),
        function () {
            currentText.value = "success";
            setTimeout(() => {
                currentText.value = "Copy image";
            }, 2000);
        },
        function (err) {
            console.log(err, "error");
        }
    );
};
</script>

<style>
li:hover {
    cursor: pointer;
}

.radius {
    border-radius: 0.5rem;
}

.select-box {
    width: 70%;
    height: 15rem;
    top: 12.5%;
    margin: 0 auto;
    background-color: #fff;
    left: 50%;
    margin-left: -35%;
    border-radius: 1rem;
    padding: 0 2rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
}

.box-item {
    padding: 1rem 2rem;
    min-width: 9rem;
    min-height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.select-box.smallTop {
    top: 4%;
}

.app-box {
    margin-top: 23rem;
}
.app-box.appBoxSmallTop {
    margin-top: 23%;
}


@media screen and (max-width: 900px) {
    .select-box {
        width: 90%;
        margin-left: -45%;
    }
}

@media screen and (max-width: 650px) {
    .select-box {
        width: 100%;
        height: 8rem;
        margin-left: -50%;
        box-shadow: none;
    }

    .box-item {
        padding: 0.2rem;
        min-width: 6rem;
        min-height: 6rem;
        font-size: 1rem;
    }

    .box-item img {
        width: 60px;
    }

    .w-1\/3 {
        width: 25%;
    }

    .app-box {
        margin-top: 16rem;
    }

    .app-box img {
        width: 40px;
    }
}
</style>
