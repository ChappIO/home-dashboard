<script>
    export let title;
</script>

<div class="screen" id={title}>
    <h1>{title}</h1>
    <div class="content">
        <slot/>
    </div>
</div>

<style>
    .screen {
        width: 100vw;
        height: 100vh;
        scroll-snap-align: center;
        scroll-snap-stop: always;
        padding: 12px;
        display: flex;
        flex-direction: column;
    }

    .content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
