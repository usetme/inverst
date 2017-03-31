<template>
  <div class="step business">
    <div class="avatar-uploader">
      <img :src="image" class="avatar" style="text-align: center;border-radius:50%">
    </div>
    <group>
      <cell title="担任职位" v-model="mm.Job"></cell>
      <cell title="电子邮箱" v-model="mm.Email"></cell>
      <cell title="官方网站" v-model="mm.Memo1"></cell>
      <cell title="微信平台" v-model="mm.Memo2"></cell>
    </group>
    <group title="公司简介">
      <Mytextarea :height="100" v-model="mm.Memo3"></Mytextarea>
    </group>
    <div>
      <flexbox style="margin-top:30px">
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="tab('Product')" style="width: 100px">商品列表</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="tab('AddProduct')" style="width: 100px">商品添加</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="tab('ModifyBusiness')" style="width: 100px">修改信息</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import u from '../js/utility'
  import {XInput, Group, XButton, Cell, XTextarea, Flexbox, FlexboxItem} from 'vux'
  import Mytextarea from '../components/mytextarea'
  export default {
    components: {XInput, Group, XButton, Cell, XTextarea, Flexbox, FlexboxItem, Mytextarea},
    data () {
      return {
        image: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        mm: {}
      }
    },
    activated: function () {
//      let that = this
      u.routeinit(this)
      if (u.routereload()) {
//        u.querymodel('pk_Customer', '260c7fd6-0ff0-4c57-80d4-a74700f0f130', that, 'mm')
      }
    },
    methods: {
      tab: function (a) {
        this.$router.push({name: a})
      }
    }
  }
</script>
<style scoped>
  button.weui-btn {
    width: 108px;
    border-radius: 0;
    background-color: #29a7e1;
    font-size: 16px;
  }

  .weui-cell {
    padding: 20px 15px
  }
</style>
