<template>
    <div id="app">
        <div class="container">
            <Countries />
        </div>
    </div>
</template>

<script>
    import Countries from './components/Countries';
    
    export default {
        name: 'app',
        components: {
            Countries
        }
    }
</script>

