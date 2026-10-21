<script>
export default {
    name: "WidgetContainer",
    props: {
        title: String,
        maxWidth: { type: String, default: "fit-content"},
        height: { type: String, default: "220px"}
    }
}
</script>

<template>
    <div class="container">
        <p class="title" role="heading" aria-level="3">
            <slot name="title">{{ title }}</slot>
        </p>
        <slot></slot>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: v-bind(height);
    min-width: 200px;
    max-width: v-bind(maxWidth);

    background-color: var(--c-raised);
    border-radius: 6px;
    overflow: hidden;
}

.title {
    width: 100%;
    padding: 10px 0 8px;

    font-family: var(--f-mono);
    font-size: 11px;
    letter-spacing: .08em;
    color: var(--c-muted);
    text-transform: uppercase;
    text-align: center;
}
</style>
