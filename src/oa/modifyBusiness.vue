<template>
  <div class="step">
    <el-upload
      class="avatar-uploader"
      action="http://m.tmjk.cn/LiveMobile.ashx"
      :data="parmdata"
      :show-file-list="false"
      :on-success="handleAvatarScucess">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p style="text-align: center;font-size: 12px;color:#29a7e1">ps:添加头像</p>
    <group>
      <x-input title="输入用户"></x-input>
      <x-input type="password" title="填写密码"></x-input>
      <x-input type="password" title="确认密码"></x-input>
      <x-input title="商户名称*"></x-input>
      <x-input title="主营项目*"></x-input>
      <x-input title="联系姓名*"></x-input>
      <x-input title="手机号码*"></x-input>
      <x-input placeholder="填写职位">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/job.png" width="24" height="24">
      </x-input>
      <x-input placeholder="电子邮箱">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/email.png" width="24"
             height="24">
      </x-input>
      <x-input placeholder="官方网站">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/net.png" width="24" height="24">
      </x-input>
      <x-input placeholder="微信平台">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/chat.png" width="24" height="24">
      </x-input>
      <x-textarea placeholder="公司简介" :height="150"></x-textarea>
    </group>
    <p style="padding-left: 16px;;font-size: 14px">请仔细填写联系方式，保证我们能尽快联系到您。</p>
    <div class="btn">
      <x-button @click.native="modify">确认修改</x-button>
    </div>
  </div>
</template>

<script>
  import u from '../js/utility'
  import {Flexbox, FlexboxItem, Blur, XInput, XButton, Group, XTextarea} from 'vux'
  export default {
    components: {Flexbox, FlexboxItem, Blur, XInput, XButton, Group, XTextarea},
    data () {
      return {
        imageUrl: '',
        parmdata: {
          param: JSON.stringify({
            operate: 'FileUpload',
            operatetype: 'FileUpload',
            userticket: '',
            localtime: u.gettime()
          })
        }
      }
    },
    activated: function () {
      let that = this
      u.routeinit(that, '商户修改')
    },
    methods: {
      handleAvatarScucess: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.imageUrl = 'http://m.tmjk.cn/upload/img/' + r.data[0]
        }
      },
      modify: function () {
        this.$router.push({name: 'Business'})
      }
    }
  }
</script>
<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }

  .btn button.weui-btn {
    margin-top: 20px;
    background-color: #29a7e1;
    width: 60%;
    color: #fff;
    border-radius: 0;
  }

  .weui-cell {
    padding: 20px 15px
  }

</style>
