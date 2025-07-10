<script setup lang="ts">
import VSwitch from './VSwitch.vue';

defineEmits<{
    (e: 'update:modelValue', value: boolean | string): void;
}>();

const props = defineProps<{
    modelValue: boolean | string;
    title: string;
    description: string;
    type: string;
    default: string;
    options?: Array<{ value: string; label: string }>;
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
            <VSwitch 
                v-if="type === 'boolean'"
                :modelValue="modelValue as boolean" 
                @update:modelValue="$emit('update:modelValue', $event)" 
            />
            <select 
                v-else-if="type === 'select'"
                :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
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
