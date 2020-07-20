<template>
    <comMask>
        <div class="flex flexColumn" :style="{ height: height,float:'left', width: width,maxWidth:'98%',maxHeight:'100%' }">
            <div class="header">
                <div class="fs18">
                    {{title}}
                </div>
                <div class="flex flex1 flexRight">
                    <i class="fa fa-2x fa-times-circle hand fs20" aria-hidden="true" @click="closeModal()"></i>
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </comMask>
</template>
<script>
    export default {
        props: {
            width:{
                default: "500px"
            },
            height:{
                default: "auto"
            },
            title:{
                default:""
            }
        },
        methods:{
            closeModal(){
                this.$emit('closeModal');
            }
        }
    }
</script>
<style scoped>
    /* .header{
        display: flex;
        align-items: center;
        min-height: 40px;
        background: #409EFF;
        color: #fff;
        padding: 0px 20px;
        position: relative;
    }
    .flexRight{
     position:absolute;
     right:10px;
    }
    .content{
        background: #fff;
        /* flex: 1; */
        /* overflow: auto;
        overflow-y: scroll */
        /* overflow-y: scroll;  */
        /* min-height: 200px; */
        /* max-height:700px; */
        /* height:auto; */
    /* }  */
    .header{
        display: flex;
        align-items: center;
        min-height: 40px;
        background: #409EFF;
        color: #fff;
        padding: 0px 20px;
        position: relative;
    }
    .flexRight{
        position:absolute;
        right:10px;
    }
    .content{
        background: #fff;
        /* flex: 1; */
        /* overflow: auto;
        overflow-y: scroll */
        overflow-y: scroll;
        min-height: 200px;
        max-height:700px;
        height:auto;
        width: 100%;
        position: relative;
        float: left;
    }
  
</style>
