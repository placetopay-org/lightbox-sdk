<script setup lang="ts">
import { emitClose } from '@placetopay/lightbox-sdk';
import IsInsideIndicator from './IsInsideIndicator.vue';
</script>

<template>
    <div class="p-4 min-h-screen flex">
        <div class="border-4 border-dashed p-4 w-full border-gray-500">
            <h1 class="text-3xl font-semibold">Interactions</h1>
            <IsInsideIndicator />

            <div class="mt-8 flex flex-wrap gap-4">
                <button @click="() => emitClose()" class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
