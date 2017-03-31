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
      <x-input title="输入用户" v-model="mm.Code"></x-input>
      <x-input type="password" title="填写密码" v-model="mm.Password"></x-input>
      <x-input type="password" title="确认密码"></x-input>
      <x-input title="商户名称*" v-model="mm.Name"></x-input>
      <x-input title="主营项目*" v-model="mm.Memo5"></x-input>
      <x-input title="联系姓名*" v-model="mm.Health"></x-input>
      <x-input title="手机号码*" v-model="mm.Mobile"></x-input>
      <x-input placeholder="填写职位" v-model="mm.Job">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/job.png" width="24" height="24">
      </x-input>
      <x-input placeholder="电子邮箱" v-model="mm.Email">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/email.png" width="24"
             height="24">
      </x-input>
      <x-input placeholder="官方网站" v-model="mm.Memo1">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/net.png" width="24" height="24">
      </x-input>
      <x-input placeholder="微信平台" v-model="mm.Memo2">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/img/chat.png" width="24" height="24">
      </x-input>
      <x-textarea placeholder="公司简介" :height="150" v-model="mm.Memo3"></x-textarea>
    </group>
    <p style="padding-left: 16px;;font-size: 14px">请仔细填写联系方式，保证我们能尽快联系到您。</p>
    <div class="btn">
      <x-button @click.native="next">咱去登录吧~</x-button>
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
        mm: {},
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
      u.routeinit(that, '申请加入')
    },
    methods: {
      handleAvatarScucess: function (response, file, fileList) {
        let r = response
        if (r.ok) {
          this.imageUrl = 'http://m.tmjk.cn/upload/img/' + r.data[0]
          this.mm.Memo4 = r.data[0]
        }
      },
      next: function () {
        let that = this
        u.getdata('Regsiter', 'AddUpdate', that.mm, that).then(function (r) {
          if (r.ok) {
            let userdata = {usercode: that.mm.Code, password: that.mm.Password}
            u.getdata('User', 'CustomerLogin', userdata, that).then(function (r) {
              if (r.ok) {
                u.toast(that, '注册成功正在跳转...')
                setTimeout(function () {
                  that.$router.push({name: 'Business'})
                }, 500)
                window.localStorage.setItem('user', JSON.stringify(r.data))
              } else {
                u.alert(that, r.message)
              }
            })
            that.$router.push({name: 'Business'})
          } else {
            u.alert(that, r.message)
          }
        })
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
