<template>
  <div style="overflow: hidden">
    <p class="addbtn" @click="add">添加</p>
    <tab bar-active-color="#29a7e1" :line-width="4">
      <tab-item @click.native="show1" selected>商品列表</tab-item>
      <tab-item @click.native="datashow==2" v-show="maintab" :selected="sel">商品详情</tab-item>
    </tab>
    <panel :list="list" @on-click-item="main" v-show="datashow==1"></panel>
    <div v-if="datashow===2" class="step">
      <group class="introduce">
        <swiper :list="demo02_list" style="width:100%;margin:0;" :auto="true" :loop="true" :interval="1800"></swiper>
        <cell-box>产品名称: <span>各种片</span></cell-box>
        <cell-box>分类:<span>富硒大米</span></cell-box>
        <cell-box>配料:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>产品产地:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>净含量:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>保质期:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>生产许可证号:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>产品执行标准:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>存储方式:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>食用方法:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>生产单位:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>生产单位地址:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>委托单位:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>委托单位地址:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>产品描述:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>公司简介:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>公司网站:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
        <cell-box>微信平台:<span>富硒荠菜、苦瓜精粉、雪莲果精粉、富硒西兰花</span></cell-box>
      </group>
      <flexbox style="margin-top:30px">
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="repair" style="width: 108px">修改内容</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="add" style="width: 108px">添加商品</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import u from '../js/utility'
  import {Tab, TabItem, Panel, Group, CellBox, XButton, Flexbox, FlexboxItem, Swiper, SwiperItem} from 'vux'
  export default {
    components: {Tab, TabItem, Panel, Group, CellBox, XButton, Flexbox, FlexboxItem, Swiper, SwiperItem},
    data () {
      return {
        demo02_list: [{
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/3.jpg',
          title: '送你一次旅行'
        }],
        dialogImageUrl: ['http://placeholder.qiniudn.com/60x60/3cc51f/ffffff', 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff', 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'],
        imageUrl: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        sel1: false,
        datashow: 1,
        maintab: false,
        sel: false,
        list: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '商品一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '商品二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '商品二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '商品二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '商品二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }]
      }
    },
    activated: function () {
      let that = this
      u.routeinit(that, '商品')
    },
    methods: {
      show1: function () {
        let that = this
        that.datashow = 1
        that.maintab = false
        that.sel = false
      },
      main: function (item) {
        let that = this
        that.maintab = true
        that.sel = true
        that.datashow = 2
      },
      repair: function () {
        this.$router.push({name: 'ModifyProduct'})
      },
      add: function () {
        this.$router.push({name: 'AddProduct'})
      }
    }
  }
</script>
<style scoped>
  .weui-cell {
    font-size: 13px
  }
</style>
