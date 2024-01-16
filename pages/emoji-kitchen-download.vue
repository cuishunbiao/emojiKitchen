<template>
    <div class="container mx-auto pt-10">
        <input v-model="searchTerm" placeholder="Input keyword search you favorite emojis" class="p-2 mb-6 w-full text-center border" />
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="(emojiUrl, name) in filteredEmojiList" :key="name" class="flex flex-col items-center p-4 border rounded-md">
                <img :src="emojiUrl" loading="lazy" :alt="String(name)" class="w-12 h-12 mb-2">
                <span class="text-center">{{ String(name).replace(/_/g, ' ') }}</span>
                <button @click="copyImage(emojiUrl)" class="mt-2 bg-blue-500 text-white px-2 py-1 rounded">Copy Image</button>
            </div>
        </div>
    </div>
</template>
  
<style scope>
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios, { AxiosResponse } from 'axios';

interface EmojiList {
    [key: string]: string;
}

interface ShowCopy {
    [key: string]: boolean;
}

const emojiList = ref<EmojiList>({});
const showCopy = ref<ShowCopy>({});
const imageRefs = ref<Array<HTMLImageElement | null>>([]);

async function fetchEmojis() {
    try {
        const response: AxiosResponse<EmojiList> = await axios.get(
            'https://api.github.com/emojis'
        );
        emojiList.value = response.data;

        // Initialize imageRefs array and create image elements
        imageRefs.value = Object.keys(response.data).map(() => null);

        lazyLoadImages(); // Ensure images are lazy loaded after data is fetched
    } catch (error) {
        console.error('Error fetching emojis:', error);
    }
}

const searchTerm = ref('');
const filteredEmojiList = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return Object.fromEntries(
    Object.entries(emojiList.value).filter(([name]) => name.toLowerCase().includes(term))
  );
});

const showImage = (name: string | number): boolean => {
    return showCopy.value[name] || false;
};

const copyImage = async (imageUrl: string) => {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;

    const successCallback = () => {
        console.log('Image copied to clipboard!');
        // Handle success, e.g., display a notification
    };

    const failureCallback = (err: Error) => {
        console.error('Failed to copy image to clipboard:', err);
        // Handle failure, e.g., display an error message
    };

    await doCopyImg2Clipboard(imageElement, successCallback, failureCallback);
};

const doCopyImg2Clipboard = async (
    image: HTMLImageElement,
    success: () => void,
    failure: (err: Error) => void
) => {
    if (!image || !image.src) {
        return;
    }

    const src = image.src;
    const response = await fetch(src);
    const blob = await response.blob();
    const data = [
        new ClipboardItem({
            [blob.type || `image/${src.split('.').slice(-1)[0].replace('jpg', 'jpeg')}`]: blob,
        }),
    ];

    navigator.clipboard.write(data).then(success, failure);
};

const handleImageLoad = (name: string) => {
    showCopyButton(name);
    console.log(`Image for ${name} has been loaded.`);
};

const showCopyButton = (name: string) => {
    showCopy.value[name] = true;
};

const lazyLoadImages = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target as HTMLImageElement;
                    showCopy.value[image.dataset.name || ''] = true;
                    observer.unobserve(image);
                }
            });
        },
        // 调整 rootMargin 值
        { rootMargin: '0px 0px 20px 0px' }
    );

    Object.values(imageRefs.value).forEach((image) => {
        if (image instanceof HTMLImageElement) {
            observer.observe(image);
        }
    });
};

onMounted(() => {
    fetchEmojis();
});

onUnmounted(() => {
    // Clean up if needed
});
</script>
  