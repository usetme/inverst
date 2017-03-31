<template>
  <div>
    <search  v-model="value" placeholder="输入客商名称查找" @result-click="resultClick" :auto-fixed="false"
             :auto-scroll-to-top="true" @on-change="getResult" :results="results"></search>
  </div>
</template>
<script>
  import Search from '../defserach'
  import u from '../../js/utility'

  export default {
    components: {
      Search
    },
    props: {
      pk: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        currentPk: this.pk,
        results: [],
        value: '',
        isclickpk: false
      }
    },
    watch: {
      currentPk (newValue) {
        this.$emit('on-change', newValue)
        this.$emit('input', newValue)
        let that = this
        if (!that.isclickpk && newValue !== '' && newValue !== null) {
          u.getmodel('Customer', newValue, that).then(function (r) {
            if (r.ok) {
              that.value = `${r.data.Name} ${(r.data.Mobile === '' || r.data.Mobile === null) ? '' : '手机:' + r.data.Mobile} `
            } else {
              that.value = '错误：' + r.message
            }
          })
        }
        if (newValue === '' || newValue === null) {
          that.value = ''
        } else {
          that.currentPk = newValue
        }
      },
      value (newValue) {
        let that = this
        if (newValue === '' || newValue === null) {
          that.currentPk = ''
        }
      },
      pk (val) {
        this.currentPk = val
      }
    },
    methods: {
      resultClick (item) {
        this.value = item.title
        this.currentPk = item.pk_customer
//        console.log(this.currentPk)
        this.isclickpk = true
      },
      getResult (val) {
        if (!this.isclickpk) {
          this.results = val ? this.getsearch(val) : []
        } else {
          this.isclickpk = false
        }
      },
      getsearch (val) {
        let rs = []
        let that = this
        u.querywhere('caffdf70-2bff-444a-9158-a6aa00dd957b', 0, [{
          'Field': 'Customer.Name',
          'Condition': 'like',
          'Value': val
        }], that).then(function (r) {
          if (r.ok) {
//            console.log(r.data)
            for (let row of r.data.rows) {
              rs.push({
                title: `${row.Name} ${(row.Mobile === '' || row.Mobile === null) ? '' : '手机:' + row.Mobile} `,
                pk_customer: row.pk
              })
            }
          } else {
            rs.push({
              title: r.message,
              pk_customer: ''
            })
          }
        })
        return rs
      }
    }
  }
</script>
