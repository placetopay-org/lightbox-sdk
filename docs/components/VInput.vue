<script setup lang="ts">
defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

defineProps<{
    modelValue: string;
}>();
</script>

<template>
    <input
        class="input"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<style>
.input {
    width: 100%;
    color: #fffff5db;
    background-color: #3c3c43;
    padding: 4px 16px;
    border-radius: 8px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%23fffff5db" width="20" height="20" viewBox="0 0 24 24"><path d="M22 7v10h-20v-10h20zm2-2h-24v14h24v-14zm-18 3h-3v2h3v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm-4 6h-10v2h10v-2zm4-3h-4v2h4v-2zm-14 0h-4v2h4v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2z"/></svg>');
    background-repeat: no-repeat;
    background-position: 16px center; /* Ajusta la posición horizontal a tu gusto */
    padding-left: 44px; /* Ajusta este valor para que el texto no se superponga con la imagen */
}
</style>
