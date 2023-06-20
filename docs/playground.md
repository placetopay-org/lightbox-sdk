<script setup>
import { LightboxSdk } from '@placetopay/lightbox-sdk';
import '@placetopay/lightbox-sdk/dist/css/styles.css';

const openLightbox = () => {
    LightboxSdk.init(window.origin).open();
}
</script>

# Playground

<button @click="openLightbox" class="bg-[#3c3c43] text-[#fffff5db] px-4 py-1 rounded-md">Try it by clicking here</button>
