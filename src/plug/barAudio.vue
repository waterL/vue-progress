<template>
    <div class="ovh">
      <div class="ringProgress_cont">
        <div class="ringProgressAudio"></div>
        <template v-if="playImgA.imgBool">
          <img :src="playImgA.playSrc" class="ring_btn" v-show="!playBool" :width="playImgA.width" alt="" @click="playBtn">
          <img :src="playImgA.pauseSrc" class="ring_btn" v-show="playBool" :width="playImgA.width" alt="" @click="playBtn">
        </template>
        <template v-else>
          <p class="ring_play ring_btn" v-show="!playBool" @click="playBtn"></p>
          <p class="ring_pause ring_btn" v-show="playBool" @click="playBtn"></p>
        </template>
      </div>
      <audio :src="src" style="display:none;" ref="audio"></audio>
    </div>
</template>
<script>
import {ringProgress} from '../Base/Progress'
export default {
  name: 'barAudio',
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
    //是否显示背景
    bgBool: {
      type: Boolean,
      default: false,
    },
    // audio的src
    src: {
      type: String,
      default: '',
      required: true
    },
    // 是否在音频播放完成执行结束事件
    playEndBool: {
      type: Boolean,
      default: false,
    },
    //默认数据为data => playImgA;
    playImg: {
      type: Object,
    }
  },
  data () {
    return {
      playBool: false,
      playImgA: {
        imgBool:false, //是否使用图片
        playSrc: '/static/images/play.png', //播放按钮图片
        pauseSrc: '/static/images/pause.png', //暂停按钮图片
        small: true,
        width: this.r/2 //图片宽度
      }
    }
  },
  created(){
    this.$nextTick(()=>{
      this.playImgA = Object.assign(this.playImgA, this.playImg);
      console.log(this.playImgA, 'playImg',this.playImg);
      // console.log(this.allNum)
      // console.log(this.progress)
      this.scale = Number(this.progress)/Number(this.allNum) * 100;
      this.progress();
      this.playAudio();
    })
  },
  methods:{
    //点击播放按钮
    playBtn(){
        if(this.src == '') {
          alert('请传入音频路径')
        }
        var bool = this.playBool;
        var audio = this.$refs.audio;
        if(audio.error != null) {
          alert('音频错误')
          return false;
        }
        if(!bool){
            audio.play();
            console.log('play')
        } else {
            audio.pause();
            console.log('pause')
        }
        this.playBool = !bool;
    },
    //监听音频
    playAudio(){
        var audio = this.$refs.audio;
        //监听音频正在播放
        audio.addEventListener("timeupdate", this.progress);
        //监听音频播放结束
        audio.addEventListener("ended", this.playEnd);

    },
    //进度条动画
    progress(){
        var audio = this.$refs.audio;
        var currentTime = Number(audio.currentTime) || 0;
        var duration = Number(audio.duration) || 1;
        console.log(currentTime, 'duration', duration)
        //运行进度条插件
        ringProgress({
          name: document.querySelector('.ringProgressAudio'),
          allNum: duration,
          progress: currentTime,
          r: this.r,
          bgBool: this.bgBool,
        })
    },
    //音频播放结束
    playEnd(){
        this.playBool = false;
        if(this.playEndBool == true) {
          this.$emit('playEndA', 'aaa')
        }
    },
  },
  watch: {
    'playImg.imgBool'(){
      var config = {
        imgBool:false,
        playSrc: '/static/images/play.png',
        pauseSrc: '/static/images/pause.png',
      };
      console.log(1111)
      this.playImgA = Object.assign(config, this.playImg)
    }
  }
}
</script>
<style scoped>
.ovh{overflow: hidden;}
.ringProgress_cont{position: relative;margin: 0.6rem auto; float: left;}
.ring_btn{position: absolute;top:50%;left: 50%;transform: translate(-50%, -50%);}
.ring_play{width: 0;height: 0;border-width: 60px 60px 60px 80px;border-style: solid;border-color: transparent transparent transparent #000;transform: translate(-25%, -65%);}
.ring_pause{border-width: 0 20px 0 20px;border-style: solid;border-color:rgba(0,0,0,1);width: 40px;height:120px;transform: translate(-50%, -65%);}
</style>