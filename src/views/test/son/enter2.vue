<template>
    <div style="background:skyblue;">
        <button @click="$emit('update:text',msg-100)">加酒</button>
        <input :value="msg">
    </div>
</template>
<script>
export default {
    name:"SonOneIndex",
    props:['msg']
}
</script>
<style lang="">
    
</style>