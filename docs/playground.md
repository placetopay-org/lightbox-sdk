<script setup lang="ts">
import { ref } from 'vue';
import { LightboxSdk } from '@placetopay/lightbox-sdk';
import IsInsideIndicator from './components/IsInsideIndicator.vue';
import OptionSection from './components/OptionSection.vue';
import RunButton from './components/RunButton.vue';
import VInput from './components/VInput.vue';
import VSwitch from './components/VSwitch.vue';
import '@placetopay/lightbox-sdk/dist/css/styles.css';

const url = ref(`${window.origin}/example-page`);
const allowRedirects = ref(true);
const closeButton = ref(true);

const openLightbox = () => {
    LightboxSdk.init(url.value, { allowRedirects: allowRedirects.value, closeButton: closeButton.value }).open();
}

const sections = [
    {
        title: 'Allow Redirects',
        description:
            'Determines whether to allow redirects from the lightbox to another URL for users who are on an iOS device or a Safari browser.',
        type: 'boolean',
        default: 'true',
        model: allowRedirects,
    },
    {
        title: 'Close Button',
        description: 'Determines if the button to close the lightbox is displayed.',
        type: 'boolean',
        default: 'true',
        model: closeButton,
    },
];
</script>

# Playground

<IsInsideIndicator />

## Url {.!mb-0}

<p>It is the target url that will be displayed in the lightbox.</p>

<VInput v-model="url"/>

<OptionSection v-for="section in sections" :title="section.title" :description="section.description" :type="section.type" :default="section.default" v-model="section.model.value"/>

## Code

```js-vue
import { LightboxSdk } from '@placetopay/lightbox-sdk';

LightboxSdk('{{ url }}', { // [!code focus:4]
    allowRedirects: {{ allowRedirects }}, 
    closeButton: {{ closeButton }}
}).open();
```

<RunButton @click="openLightbox" />
