<script setup lang="ts">
import VSwitch from './VSwitch.vue';

defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
    modelValue: boolean;
    title: string;
    description: string;
    type: string;
    default: string;
}>();

const getHref = () => `#${props.title.toLowerCase().replace(/ /g, '-')}`;
const getAriaLabel = () => `Permalink to "${props.title}" {.!mb-0}`;
</script>

<template>
    <section class="mt-8">
        <hr />
        <div class="flex items-center gap-4">
            <h2 class="!my-0 !py-0 !border-t-0" id="allow-redirects" tabindex="-1">
                {{ title }}
                <a class="header-anchor" :href="getHref()" :aria-label="getAriaLabel()">&ZeroWidthSpace;</a>
            </h2>
            <VSwitch :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
        </div>
        <div class="flex gap-2">
            <p>
                <strong>Type:</strong> <code>{{ type }}</code>
            </p>
            <p>
                <strong>Default:</strong> <code>{{ default }}</code>
            </p>
        </div>
        <p class="!mt-0">{{ description }}</p>
    </section>
</template>
