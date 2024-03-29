<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import IsInsideIndicator from './components/IsInsideIndicator.vue';
import OptionSection from './components/OptionSection.vue';
import RunButton from './components/RunButton.vue';
import VInput from './components/VInput.vue';
import VSwitch from './components/VSwitch.vue';

const url = ref('');
const allowRedirects = ref(true);
const closeButton = ref(true);

const config = computed(() => ({
    allowRedirects: allowRedirects.value,
    closeButton: closeButton.value,
    enforceStyles: true,
    styles: {
        backdropColor: '#0000ff',
    }
}));

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

onMounted(() => {
    let i = 0;
    const defaultUrl = `${window.origin}/lightbox-sdk/example-page`;
    const clear = setInterval(() => {
        url.value += defaultUrl[i];
        i++;
        if (i === defaultUrl.length) {
            clearInterval(clear);
        }
    }, 20);
})
</script>

# Playground

<ClientOnly>
    <IsInsideIndicator />
</ClientOnly>

## Url {.!mb-0}

It is the target url that will be displayed in the lightbox.

<VInput v-model="url"/>

<OptionSection v-for="section in sections" 
    :title="section.title"
    :description="section.description"
    :type="section.type"
    :default="section.default"
    v-model="section.model.value"
/>

## Code

```js-vue
import { createLightbox } from '@placetopay/lightbox-sdk';

createLightbox('{{ url }}', { // [!code focus:4]
    allowRedirects: {{ allowRedirects }}, 
    closeButton: {{ closeButton }}
}).open();
```

<ClientOnly>
    <RunButton :url="url" :config="config" />
</ClientOnly>
