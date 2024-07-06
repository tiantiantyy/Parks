<template>
  <header class="screen-header">
    <!-- <div class="currentScale" v-if="isDev">当前缩放：{{scale}}</div> -->
    <div class="header-top">
      <!-- <div class="header-time">
        <dateTime />
      </div> -->
      <div class="header-name">
        <h1>中国世界地质公园导览信息系统</h1>
      </div>
      <div class="header-nav">
      <ul>
        <li style="padding-left:50px ;" v-for="(item, index) in navList" :key="index" 
          @click="switchMenu(index)" :class="{'active': activeIndex === index}">{{item.name}}</li>
      </ul>
    </div>
      <div class="header-tool">
        <screenFull />
      </div>
    </div>
    
  </header>
</template>

<script>
import dateTime from '@/components/common/dateTime'
import screenFull from '@/components/common/screenFull'
export default {
  components: {
    dateTime,
    screenFull
  },
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      activeIndex: 0,
      navList: [
        {
          name: '数字公园',
          router: 'index'
        },
        {
          name: '媒体公园',
          router: 'index2'
        },
        {
          name: '智慧公园',
          router: 'index3'
        },
    
      ]
    }
  },
  computed: {
    scale() {
      return this.$store.state.common.scale
    }
  },
  methods: {
    switchMenu(index) {
      const self = this
      self.activeIndex = index
      self.$router.push({name: self.navList[index].router})
    }
  },
  mounted() {
    const self = this
    self.navList.forEach((item, index) => {
      if (item.router === self.$route.name) {
        self.activeIndex = index
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .currentScale{
    font-size: 14px;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .screen-header{
    width: 100%;
    height: 60px;
    color:#fff;
    background-color: #393659;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -1px;
      left: 0;
      // background: linear-gradient(90deg, rgba(46,118,214,0.1), rgba(0,175,215,1), rgba(46,118,214,0.1));
    }
    .header-top{
      height: 30px;
      padding: 15px;
      padding-bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // background-image: url('../assets/image/head.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top center;
      .header-time,.header-tool{
        width: 300px;
        line-height: 30px;
      }
      .header-time{
        text-align: left;
      }
      .header-tool{
        text-align: right;
      }
      .header-name{
        h1{
          max-width: 400px;
          line-height: 30px;
          font-size:25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        
      }
      .header-nav{
          flex-grow: 1; /* 让 .header-nav 自适应宽度 */
          height: 30px;
        ul{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 0px;
          li{
            width: auto;
            line-height: 30px;
            font-size: 16px;
            cursor: pointer;
            &.active{
              font-weight: bold;
              font-size: 18px;
            }
          }
        }
    }
    }
    
  }
</style>
