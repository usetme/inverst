<template>
  <div class="addproduct">
    <group>
      <popup-picker title="选择分类*" :data="cats" v-model="cat"></popup-picker>
      <x-input title="产品名称*" value=""></x-input>
      <x-textarea title="配料*" placeholder="请输入产品配料成分"></x-textarea>
      <x-input title="规格/净含量*" value=""></x-input>
      <x-input title="保质期*" value=""></x-input>
      <x-input title="生产许可证号*" value=""></x-input>
      <x-input title="产品执行标准*" value=""></x-input>
      <x-input title="存储方式" value=""></x-input>
      <x-input title="食用方法" value=""></x-input>
      <x-input title="生产单位" value=""></x-input>
      <x-input title="生产单位地址" value=""></x-input>
      <x-input title="委托/出品单位" value=""></x-input>
      <x-input title="委托/出品单位地址" value=""></x-input>
      <x-textarea title="产品描述" placeholder="请描述产品价值优点"></x-textarea>
    </group>
    <el-upload
      style="float: left;width: 100%;margin-top: 30px"
      action="http://m.tmjk.cn/LiveMobile.ashx"
      :show-file-list="false"
      ref="upload"
      :data="parmdata"
      :on-success="handleAvatarScucess"
      list-type="picture-card">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i></el-upload>
    <el-upload
      v-show="image1"
      style="float: left;width: 100%"
      action="http://m.tmjk.cn/LiveMobile.ashx"
      :show-file-list="false"
      ref="upload"
      :data="parmdata"
      :on-success="handleAvatarScucess1"
      list-type="picture-card">
      <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i></el-upload>
    <el-upload
      v-show="image2"
      style="float: left;width: 100%"
      action="http://m.tmjk.cn/LiveMobile.ashx"
      :show-file-list="false"
      ref="upload"
      :data="parmdata"
      :on-success="handleAvatarScucess2"
      list-type="picture-card">
      <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i></el-upload>
    <el-upload
      v-show="image3"
      style="float: left;width: 100%"
      action="http://m.tmjk.cn/LiveMobile.ashx"
      :show-file-list="false"
      ref="upload"
      :data="parmdata"
      :on-success="handleAvatarScucess3"
      list-type="picture-card">
      <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i></el-upload>
    <p style="text-align: center;font-size: 12px;color:#29a7e1">ps:请添加<strong>'四张'</strong>产品附图</p>
    <flexbox style="margin-top:30px">
      <flexbox-item>
        <div class="flex-demo">
          <x-button type="primary" @click.native="submit" style="width: 150px">保存</x-button>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <x-button type="primary" @click.native="subadd" style="width: 150px">保存并继续添加</x-button>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import u from '../js/utility'
  import {PopupPicker, Group, Cell, XButton, XInput, XTextarea, Flexbox, FlexboxItem} from 'vux'
  export default {
    components: {PopupPicker, Group, Cell, XButton, XInput, XTextarea, Flexbox, FlexboxItem},
    data () {
      return {
        image1: false,
        image2: false,
        image3: false,
        parmdata: {
          param: JSON.stringify({
            operate: 'FileUpload',
            operatetype: 'FileUpload',
            userticket: '',
            localtime: u.gettime()
          })
        },
        imageUrl: '',
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        value: ['iphone'],
        cat: [],
        cats: []
      }
    },
    activated: function () {
      let that = this
      u.routeinit(that, '商品新增')
    },
    created: function () {
      let that = this
      u.bindlist(that, 'Category', 'cats')
    },
    methods: {
      handleAvatarScucess: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.image1 = true
          this.imageUrl = 'http://m.tmjk.cn/upload/img/' + r.data[0]
        }
      },
      handleAvatarScucess1: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.image2 = true
          this.imageUrl1 = 'http://m.tmjk.cn/upload/img/' + r.data[0]
        }
      },
      handleAvatarScucess2: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.image3 = true
          this.imageUrl2 = 'http://m.tmjk.cn/upload/img/' + r.data[0]
        }
      },
      handleAvatarScucess3: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.imageUrl3 = 'http://m.tmjk.cn/upload/img/' + r.data[0]
        }
      },
      submit: function () {
        this.$router.push({name: 'Product'})
      },
      subadd: function () {
        window.location.reload()
      }
    }
  }
</script>
<style scoped>
  [class^=el-icon-] {
    line-height: 100px;
  }

  .avatar {
    width: 100%;
    height: 100%
  }
</style>
