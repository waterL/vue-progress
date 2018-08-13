<template>
    <div class="ovh">
      <div class="ringProgress_cont">
          <p class="txt" v-if="!customBool">完成{{scale}}%</p>
          <p class="txt" v-else>{{customCont}}</p>
          <div class="ringProgress"></div>
        </div>
    </div>
</template>
<script>
import {ringProgress} from '../Base/Progress'
export default {
  name: 'bar',
  props: {
    //圆半径
    r: {
      type: [String, Number],
      default: 150,
    },
    //进度条宽度
    strokeWidth: {
      type: [String, Number],
      default: 10,
    },
    //总长度
    allNum: {
      type: String,
      default: '1'
    },
    //已运行长度
    progress: {
      type: String,
      default: '1'
    },
    //自定义内容
    customCont: {
      type: String,
      default: ''
    },
    //是否自定义内容
    customBool: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      scale: 50,
    }
  },
  created(){
    this.$nextTick(()=>{
      // console.log(this.allNum)
      // console.log(this.progress)
      this.scale = Number(this.progress)/Number(this.allNum) * 100
      ringProgress({
        allNum: Number(this.allNum),
        progress: Number(this.progress),
        r: this.r
      })
    })
  },
  methods:{

  }
}
</script>
<style >
.ovh{overflow: hidden;}
.ringProgress_cont{position: relative;margin: 0.6rem auto; float: left;}
.ringProgress_cont .txt{line-height: 40px;font-size: 36px;color: #dbb34b;text-align: center;position: absolute;top:50%;width: 100%;transform: translateY(-50%);margin: 0;}
</style>