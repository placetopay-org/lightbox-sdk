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
const backupTarget = ref('self');

const config = computed(() => ({
    allowRedirects: allowRedirects.value,
    closeButton: closeButton.value,
    backupTarget: backupTarget.value,
    enforceStyles: true,
    styles: {
        backdropColor: '#0000ff',
    }
}));

const sections = [
    {
        title: 'Allow Redirects',
        description:
            'Determines whether to allow redirects (backupTarget: "self") from the lightbox to another URL for users who are on an iOS device or a Safari browser. Does not affect popup or blank fallback options.',
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
    {
        title: 'Backup Target',
        description: 'Defines fallback behavior when the lightbox cannot open normally (e.g., in Safari or iOS). Choose "self" to redirect in the same window, "popup" to open a popup window with informative backdrop, or "blank" to open in a new tab.',
        type: 'select',
        default: 'self',
        options: [
            { value: 'self', label: 'Self (redirect current window)' },
            { value: 'popup', label: 'Popup (with backdrop & message)' },
            { value: 'blank', label: 'Blank (new tab)' }
        ],
        model: backupTarget,
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
    :options="section.options"
    v-model="section.model.value"
/>

## Code

```js-vue
import { createLightbox } from '@placetopay/lightbox-sdk';

const lightbox = createLightbox('{{ url }}', { // [!code focus:5]
    allowRedirects: {{ allowRedirects }}, 
    closeButton: {{ closeButton }},
    backupTarget: '{{ backupTarget }}'
});

lightbox.open();

// Close programmatically after 30 seconds (works for lightbox AND popup)
setTimeout(() => lightbox.close(), 30000);
```

<ClientOnly>
    <RunButton :url="url" :config="config" />
</ClientOnly>

## Enhanced Close() Method

The `lightbox.close()` method now automatically handles all scenarios:

**Normal browsers** (Chrome, Firefox, Edge):
- Opens as regular lightbox iframe
- `close()` removes iframe and cleans up styles

**Safari/iOS browsers**:
- `backupTarget: 'popup'` → Opens popup with backdrop
- `close()` closes popup window and removes backdrop
- `backupTarget: 'blank'` → Opens new tab
- `close()` closes tab window (if accessible)
- `backupTarget: 'self'` → Redirects current window
- `close()` has no effect (already navigated away)

**Testing**: Try the playground above with different configurations. The close behavior will automatically adapt to what was actually opened.
