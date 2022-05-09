<template>
  <div class="pagination">
    <button @click="$emit('getPage',pageNo-1)" :disabled="pageNo==1">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPage',1)">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPage',page)" :class="{active:page==pageNo}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPage',totalPage)">{{ totalPage }}</button>
    <button @click="$emit('getPage',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <div class="box"><input type="number" v-model="goPage"><button @click="$emit('getPage',goPageNo)">跳转</button></div>
  </div>
</template>

<script>
//当前页数pageNo
//每页展示多少条数据pageSize
//一共多少条数据total
//分页器连续页面个数continues 5|7，对称
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data(){
      return {
          goPage:1
      }
  },
  computed: {
      //总页数
    totalPage: function () {
        const { pageSize, total} = this;
      return Math.ceil(total / pageSize);
    },
    startNumAndEndNum:function(){
        const { pageNo, continues,totalPage } = this;
        let start=0,end=0;
        if(continues>totalPage){
            start=1;
            end=totalPage;
        }else{
            start = pageNo - (continues-1)/2;
            end = pageNo + (continues-1)/2;
            if(start<1){
                start = 1
                end = continues
            }
            if(end>totalPage){
                start = totalPage-continues+1
                end = totalPage
            }
        }
        return {start,end}
    },
    //计算跳转页面功能，如果要跳转的页面不存在，则回到最后一页
    goPageNo:function(){
        let {goPage,totalPage}=this
        return goPage>totalPage||goPage<1?1:goPage
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin: 30px;
  .box{
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-content: center;
      input{
      margin-left: 30px;
      width: 35.5px;
      text-align: center;
      line-height: 100%;
    }
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>