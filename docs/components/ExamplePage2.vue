<script setup lang="ts">
import '../../lib/dist/styles.css';
import { emitClose, hideCloseButton, updateStyles, createLightbox } from '../../lib/dist';
import IsInsideIndicator from './IsInsideIndicator.vue';
</script>

<template>
    <div class="p-4 min-h-screen flex">
        <div class="border-4 border-dotted p-4 w-full border-orange-500">
            <h1 class="text-3xl font-semibold">Interactions</h1>
            <IsInsideIndicator />

            <div class="mt-8 flex flex-wrap gap-4">
                <button @click="() => emitClose()" class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md">
                    Close
                </button>
                <button
                    @click="() => updateStyles({ width: '90%', height: '90%', radius: 20, backdropOpacity: 0.7 })"
                    class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md"
                >
                    Update Styles
                </button>
                <button @click="() => hideCloseButton()" class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md">
                    Hide Close Button
                </button>
                <button
                    @click="() => createLightbox('http://localhost:5173/lightbox-sdk/example-page').open()"
                    class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md"
                >
                    Open Other Page
                </button>
                <button
                    @click="() => createLightbox('https://rollupjs.org/tutorial/#installing-rollup-locally').open()"
                    class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md"
                >
                    Open test
                </button>
                <button
                    @click="() => createLightbox('https://rollupjs.org/tutorial/#installing-rollup-locally').close()"
                    class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md"
                >
                    Open test CLOSE
                </button>
            </div>
        </div>
    </div>
</template>
