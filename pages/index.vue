<template>
    <!-- <div v-if="tipsStatus" class="fixed top-0 left-0 right-0 text-white p-4 shadow-lg" style="background-color: #f4a52a">
        <div class="flex justify-between items-center">
            <div class="flex">
                Click to choose two emoticons that appeal to you and craft a new emoticon. 
            </div>
            <button class="text-white hover:text-red-500" @click="hideTips">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div> -->
    <div class="fixed flex items-center justify-center space-x-4 select-box" ref="selectBox">
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
    <div class="p-2 mt-4 flex flex-wrap gap-4 app-box" ref="appBox" style="justify-content: space-around">
        <li v-for="item in knownSupportedEmoji" :key="item">
            <div :class="{
                'bg-blue-300 radius':
                    selectedAIcon === item || selectedBIcon === item,
            }" @click="imageHandle(item)">
                <img width="60" :alt="`u${item}`" :src="generateEmojiUrl(item)" />
            </div>
        </li>
    </div>
    <div class="container mx-auto mt-16 px-4 py-8 max-w-screen-md">
        <section class="mb-8">
            <div class="text-5xl text-center font-semibold mb-4">Emoji Kitchen How to Use?</div>
            <p class="text-lg mt-10">
                we've got this awesome "Emojify" feature that lets you turn plain emojis into super exciting and personalized expressions.
            </p>
            <p class="text-lg mt-2">
                You can mix and match different emojis to create unique combinations that perfectly capture your emotions or messages.
            </p>
        </section>
        <section class="mb-8">
            <div class="text-3xl font-semibold mb-4">How to go about it?</div>
            <p class="text-lg">
                Pick two emojis you really like, then blend them together to create a brand new emoji. For example, 😊 + 🌟 = ✨. Once you've crafted the emoji you want, simply click "Copy Image" and paste it into your chat app, social media, or anywhere you want to use it.
            </p>
        </section>
        <section class="mb-8">
            <div class="text-2xl font-semibold mb-2">Joy + Caring = Super joyful and caring</div>
            <img :src="joyful" alt="Joyful and Caring Emoji" class="w-full mb-4">
        </section>
        <section class="mb-8">
            <div class="text-2xl font-semibold mb-2">Sad + Little Rabbit = Sad little rabbit</div>
            <img :src="rabbit" alt="Sad Little Rabbit Emoji" class="w-full mb-4">
        </section>
        <section class="mb-8">
            <div class="text-2xl font-semibold mb-2">Anger + Shut up = Anger beyond words</div>
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
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import emojiData from "./assets/data/emojiData.json";
import { knownSupportedEmoji } from "./assets/js/images";
import anger from "@/assets/images/anger.png";
import joyful from "@/assets/images/joyful.png";
import rabbit from "@/assets/images/rabbit.png";

const rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

const imagesList = ref([]);
const resultImageData = ref("");
const requestImage = ref("");

const aContent = ref("");
const selectedAIcon = ref(null);
const bContent = ref("");
const selectedBIcon = ref(null);

const imagesResultRef = ref();
const imagesResultButton = ref();

const currentText = ref("Copy image");
const noResult = ref(false);

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


const selectBox = ref(null)
const appBox = ref(null)
const handleScroll = () => {
    const box = selectBox.value;
    if (!box) return;
    const { scrollTop } = document.documentElement;
    const appBoxHeight = appBox.value.clientHeight
    if (scrollTop >= appBoxHeight) {
        box.style.display = 'none';
    } else {
        box.style.display = 'flex';
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

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
    top: 11%;
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
    margin-top: 19rem;
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
        margin-top: 10rem;
    }

    .app-box img {
        width: 40px;
    }
}
</style>
