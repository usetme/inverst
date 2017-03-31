<template>
  <div class="login">
    <flexbox orient="vertical" style="position: absolute;top: 44%;">
      <flexbox-item>
        <group>
          <x-input title="用户" v-model="Code"></x-input>
        </group>
        <group>
          <x-input title="密码" v-model="Password" type="password"></x-input>
        </group>
      </flexbox-item>
      <flexbox-item>
        <flexbox style="margin-top:30px">
          <flexbox-item>
            <div class="flex-demo" style="margin-left: 8%">
              <x-button type="primary" @click.native="enter">商家登录</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <x-button type="primary" @click.native="join">申请加入</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>

  </div>
</template>
<script>
  import u from '../js/utility'
  import {Flexbox, FlexboxItem, Group, XButton, XInput} from 'vux'
  export default{
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      XButton,
      XInput
    },
    data () {
      return {
        Code: '',
        Password: '',
        login: {}
      }
    },
    activated: function () {
      let that = this
      u.routeinit(that)
      if (this.$route.params.offline === 'n') {
        window.localStorage.removeItem('user')
      } else {
        let that = this
        let l = window.localStorage.getItem('user')
        l = JSON.parse(l)
        if (l === null) {
        } else {
          if (l.LoginTime <= u.datetimeadd(new Date(), -24)) {
            window.localStorage.removeItem('user')
          } else {
            that.$router.push({name: 'Product'})
          }
        }
      }
    },
    methods: {
      enter: function () {
        let that = this
        let userdata = {usercode: that.Code, password: that.Password}
        u.getdata('User', 'CustomerLogin', userdata).then(function (r) {
          if (r.ok) {
            window.localStorage.setItem('user', JSON.stringify(r.data))
            that.$router.push({name: 'Business'})
          } else {
            u.alert(that, r.message)
          }
        })
      },
      join: function () {
        let that = this
        that.$router.push({name: 'Join1'})
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
</style>
