<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ExamplePage from '../../components/ExamplePage.vue';

const { Layout } = DefaultTheme;

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();

const getLayout = computed(() => {
    const isCustomPage = frontmatter.value.layout && (frontmatter.value.layout as string).startsWith('component:');

    if (!isCustomPage) return Layout;

    return ExamplePage;
});
</script>

<template>
    <component :is="getLayout" />
</template>
