<template>
<div>
  <input 
    :placeholder="this.placeholder"
    ref="input"
    v-model="data"
    @keyup.enter="updateValue($event.target.value)"
    @keyup.down="calMatchListIndex(1)" 
    @keyup.up="calMatchListIndex(-1)" 
    @click="resetMatchList"
    @blur="clearMatchList"
    @keyup.esc="clearMatchList"
    />
  <div>
    <li v-for="(item, index) in matchList">
      <p 
        :class="{'item-selected': isSelected(index)}"
        @mouseenter="setMatchList(index)">
      {{item}}</p>
    </li>
  </div>
</div>
</template>

<script>
export default {
  name: 'AutoCompleteInput',
  props: {
    // 绑定到input的数据
    value: [String, Number],
    // 补全输入最大显示数字
    maxCount: {
      type: Number,
      default: 8
    },
    // 预设值数组
    presetList: Array,
    // placeholder
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: this.value || '', // 临时处理值
      matchList: [], // 匹配输入值的数组
      matchListIndex: null // 匹配输入值数组的索引
    }
  },
  computed: {
    dataList () {
      return this.presetList || []
    }
  },
  watch: {
    data () {
      if (this.matchList[this.matchListIndex] !== this.data) {
        this.resetMatchList()
      }
    },
    matchListIndex () {
      if (this.matchListIndex !== null) {
        this.data = this.matchList[this.matchListIndex]
      }
    }
  },
  methods: {
    updateValue (value) {
      this.clearMatchList()
      this.data = ''
      // 通过 input 事件带出数值
      this.$emit('input', value)
    },
    // 设置autocomplete面板内容
    setMatchList () {
      if (this.matchListIndex === null) {
        if (this.data === '') {
          this.matchList = []
          return
        }
        let matchData = this.dataList.filter(v => v.indexOf(this.data) > -1)
        this.matchList = matchData.slice(0, this.maxCount)
      }
    },
    // 计算MatchIndex
    calMatchListIndex (param) {
      if (this.matchListIndex === null) {
        this.matchListIndex = 0
        return
      }
      if (this.matchListIndex + param >= this.matchList.length) {
        this.matchListIndex = null
        return
      }
      if (this.matchListIndex + param < 0) {
        this.matchListIndex = 0
        return
      }
      this.matchListIndex = this.matchListIndex + param
    },
    // 判断是否是选中的项
    isSelected (index) {
      return index === this.matchListIndex
    },
    // 重置匹配列表
    resetMatchList () {
      this.matchListIndex = null
      this.matchList = []
      this.setMatchList()
    },
    // 清空匹配列表
    clearMatchList () {
      this.matchList = []
    }
  }
}
</script>

<style scoped>
.item-selected {
  background: #41B883;
  color: #FFF
}
</style>
