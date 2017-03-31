<template>
  <table border="1" style="border-collapse: collapse">
    <tr>
      <td v-for="(i,index) in data[0]">{{index}}</td>
    </tr>
    <tr v-for="r in data">
      <td v-for="c in r">{{c}}</td>
    </tr>
  </table>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      data: Array
    },
    created: function () {
    },
    route: {
      data (rt) {
      }
    },
    methods: {}
  }
</script>
<style scoped>
  table {
    width: 95%;
    margin: 0 auto;
    margin-top: 1em;
  }

  table td {
    text-align: center;
    border: 1px solid #d2d2d2
  }

  @import '../../css/mystyle.css';
</style>
