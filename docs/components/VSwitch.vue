<script setup lang="ts">
defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

defineProps<{
    modelValue: boolean;
}>();
</script>

<template>
    <label class="flex w-fit">
        <input
            class="toggle-checkbox"
            :checked="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
            type="checkbox"
        />
        <div class="toggle-slot">
            <div class="sun-icon-wrapper">
                <div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
            </div>
            <div class="toggle-button"></div>
            <div class="moon-icon-wrapper">
                <div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
            </div>
        </div>
    </label>
</template>

<style>
.toggle-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.toggle-slot {
    overflow: hidden;
    font-size: 6px;
    cursor: pointer;
    position: relative;
    height: 3.5em;
    width: 7em;
    border: 0px solid transparent;
    border-radius: 10em;
    background-color: #3c3c43;
    transition: background-color 250ms;
}

.toggle-checkbox:checked ~ .toggle-slot {
    background-color: #f26f25;
}

.toggle-button {
    transform: translate(0.3em, 0.25em);
    position: absolute;
    height: 3em;
    width: 3em;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 0.75em #fffff5db;
    transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
}

.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 0.75em #fffff5db;
    transform: translate(3.65em, 0.25em);
}

.sun-icon {
    position: absolute;
    height: 6em;
    width: 6em;
    color: #ffbb52;
}

.sun-icon-wrapper {
    position: absolute;
    height: 6em;
    width: 6em;
    opacity: 1;
    transform: translate(2em, 2em) rotate(15deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
}

.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(3em, 2em) rotate(0deg);
}

.moon-icon {
    position: absolute;
    height: 6em;
    width: 6em;
    color: white;
}

.moon-icon-wrapper {
    position: absolute;
    height: 6em;
    width: 6em;
    opacity: 0;
    transform: translate(11em, 2em) rotate(0deg);
    transform-origin: 50% 50%;
    transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71);
}

.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(2em, 2em) rotate(-15deg);
}
</style>
