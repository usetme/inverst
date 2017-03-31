<template>
  <div class="weui_cell">
    <div class="weui_cell_bd weui_cell_primary">
      <textarea
        style="width: 100%;border: none"
        disabled="disabled"
        class="weui_textarea"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        :cols="cols"
        v-model="value"
        :style="textareaStyle"
        :maxlength="max"></textarea>
      <div class="weui_textarea_counter" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: {type: String, default: ''},
      showCounter: {
        type: Boolean,
        default: true
      },
      max: Number,
      value: {
        type: String,
        default: ''
//        twoWay: true
      },
      name: String,
      placeholder: String,
      rows: {
        type: Number,
        default: 3
      },
      cols: {
        type: Number,
        default: 30
      },
      height: Number,
      // https://github.com/yisibl/blog/issues/3
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false'
    },
    watch: {
      value (newVal) {
        if (this.max && this.value.length > this.max) {
          this.value = newVal.slice(0, this.max)
        }
        this.$emit('on-change', this.value)
      }
    },
    computed: {
      count () {
        if (this.value !== null && this.max !== null) {
          let len = this.value.replace(/\n/g, 'aa').length
          return len > this.max ? this.max : len
        }
      },
      textareaStyle () {
        if (this.height) {
          return {
            height: `${this.height}px`
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
::-webkit-input-placeholder{color:#555;}

</style>
