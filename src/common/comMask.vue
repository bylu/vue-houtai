<template>
    <div id="comMask">
        <slot></slot>
    </div>
</template>
<style scoped>
    #comMask {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 1999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
</style>