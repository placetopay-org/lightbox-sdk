<script setup>
import { LightboxSdk } from '@placetopay/lightbox-sdk';
</script>

<template>
    <div class="flex gap-1 items-center">
        <template v-if="LightboxSdk.isInside()">
            <img src="/check.svg" alt="check" />
            <span class="font-medium text-primary text-sm">currently inside a lightbox</span>
        </template>
        <template v-else>
            <img src="/cross.svg" alt="cross" />
            <span class="font-medium text-gray-500 text-sm">currently outside of a lightbox</span>
        </template>
    </div>
</template>
