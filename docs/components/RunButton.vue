<script setup lang="ts">
import { createLightbox, InitialOptions } from '@placetopay/lightbox-sdk';
import '@placetopay/lightbox-sdk/dist/styles.css';

const props = defineProps<{
    url: string;
    config: InitialOptions;
}>();

const open = () => {
    createLightbox(props.url, props.config).open();
};
</script>

<template>
    <button @click="open" class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md flex items-center gap-1">
        <span>Run</span>
        <img src="/play.svg" alt="play" />
    </button>
</template>
