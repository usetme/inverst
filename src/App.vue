<template>
  <div id="app" style="height:100%;">
    <loading v-model="loadingshow" text="正在加载"></loading>
    <view-box v-bind:class="bgcolor" ref="viewBox" slot="bottom">
      <x-header slot="header" style="width:100%"
                :left-options="leftoptions" :right-options="rightoptions"
                @on-click-title="scrollTop" @on-click-more="showMenus = true" v-show="headershow">{{headertitle}}
        <a slot="right" style="display: inline-block">
          <img src="./assets/img/exit.png" alt="" @click="home" style="width:72%">
        </a>
      </x-header>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
    </view-box>
  </div>
</template>

<script>
  import {ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading} from 'vux'
  import {mapState, mapActions} from 'vuex'
  import u from './js/utility'
  export default {
    name: 'app',
    data () {
      return {
        headershow: false,
        headertitle: '',
        leftoptions: {showBack: true},
        headermenus: {},
        rightoptions: {},
        showMenus: false,
        loadingshow: false,
        footshow: false
      }
    },
    components: {
      ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading
    },
    mounted () {
    },
    beforeDestroy () {
      this.box.removeEventListener('scroll', this.handler, false)
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction
      }),
      bgcolor () {
        if (this.$route.path === '/' || this.$route.path.toLowerCase().includes('login')) {
          return 'bgcontent1'
        } else {
          return
        }
      },
      leftOptions () {
        return {
          showBack: this.route.path !== '/'
        }
      },
      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      componentName () {
        if (this.route.path) {
          const parts = this.route.path.split('/')
          if (/component/.test(this.route.path) && parts[2]) return parts[2]
        }
      },
      title () {
        if (this.route.path === '/') return 'Home'
        if (this.route.path === '/project/donate') return 'Donate'
        if (this.route.path === '/demo') return 'Demo list'
        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      }
    },
    methods: {
      home: function () {
        let that = this
        u.routergo(that, 'Business', false)
      },
      scrollTop () {
//        this.$refs.viewBox.scrollTop(0)
      },
      ...mapActions([
        'updateDemoPosition'
      ])
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import 'css/mystyle.css';

  html, body {
    font-family: '微软雅黑';
    height: 100%;
    width: 100%;
    color: #666;
    overflow-x: hidden;
  }

  .router-view {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }

  .vux-pop-out-enter-active {
    animation-name: popInLeft;
  }

  .vux-pop-out-leave-active {
    animation-name: popOutRight;
  }

  .vux-pop-in-enter-active {
    perspective: 1000;
    animation-name: popInRight;
  }

  .vux-pop-in-leave-active {
    animation-name: popOutLeft;
  }

  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutLeft {
    from {
      opacity: 1;
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes popInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutRight {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  .bgcontent {
    background-color: #348cb2;
  }
</style>
