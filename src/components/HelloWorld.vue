<template>
  <div class="hello">
    <!-- <audio src="/static/bg.mp3" controls=""></audio> -->
    <!-- 固定 -->
    <bar allNum="100" progress="30"></bar>
    <!-- 音频 -->
    <barAudio src="/static/bg.mp3" :playEndBool="playEndBool" @playEndA="playEnd" :playImg="playImg" :bgBool="bgBool"></barAudio>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      playEndBool: true,
      playImg: {
        imgBool: true,
        playSrc: '/static/images/play.png',
      },
      bgBool: true,
    }
  },
  methods: {
    playEnd(a){
      alert('播放完成')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
