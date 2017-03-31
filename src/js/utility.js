/**
 * Created by LiveSW on 2016/10/19.
 */
import $ from 'webpack-zepto'
import map from 'array-map'
import find from 'array-find'

export default {
  routerreload: true,
  routereload: function () {
    let r = this.routerreload
    this.routerreload = false
    return r
  },
  routerback: function (isreload, that, message, timeout) {
    if (isreload !== undefined) {
      this.routerreload = isreload
    } else {
      this.routerreload = false
    }
    if (message !== undefined && message !== '') {
      this.toast(that, message)
    }
    if (timeout !== undefined) {
      setTimeout(function () {
        window.history.back()
      }, timeout)
    } else {
      window.history.back()
    }
  },
  routergo: function (that, routename, parmjson, isreload) {
    if (isreload !== undefined) {
      this.routerreload = isreload
    } else {
      this.routerreload = true
    }
    if (parmjson !== undefined) {
      that.$router.push({name: routename, params: parmjson})
    } else {
      that.$router.push({name: routename})
    }
  },
  sdecolor: function (i) {
    if (i.State === 1) {
      return 'spanwhite'
    } else {
      if (i.PlanTime < this.gettime()) {
        return 'spanred'
      } else if (i.PlanTime.substr(0, 10) === this.getdate()) {
        return 'spanyellow'
      } else {
        return 'spangreen'
      }
    }
  },
  sdeopen: function (that, r) {
    if (r.CreateUser === this.getuser().pk_User && r.State === 0) {
      that.$router.push({name: 'ScheduleAdd', params: {pk: r.pk}})
    } else {
      that.$router.push({name: 'ScheduleView', params: {pk: r.pk}})
    }
  },
  routepk: function (that, routekey) {
    let routerpk = ''
    if (routekey !== undefined) {
      routerpk = that.$route.params[routekey]
      if (routerpk === undefined) {
        // console.log(routerpk + '路由未定义')
        routerpk = ''
      }
      routerpk = routerpk === (':' + routekey) ? '' : routerpk
    }
    return routerpk
  },
  routeinit: function (that, title, footshow, newtitle) {
    that.$root.loadingshow = false
    if (footshow === undefined) {
      that.$root.$children[0].footshow = false
    } else {
      that.$root.$children[0].footshow = footshow
    }
    if (title === undefined || title === '') {
      that.$root.$children[0].headershow = false
    } else {
      that.$root.$children[0].headershow = true
      that.$root.$children[0].headertitle = title
    }
  },
  toast: function (that, message) {
    if (that !== undefined) {
      that.$vux.toast.show(message)
    }
  },
  alert: function (that, message) {
    if (that !== undefined) {
      that.$vux.alert.show(message)
    }
  },
  testalert: function (that) {
    this.toast(that, 'ceshi')
  },
  loadingshow: function (that, message) {
    if (that !== undefined && that.$root.loadingshow !== undefined) {
      that.$root.loadingshow = true
    }
  },
  loadinghide: function (that) {
    if (that !== undefined && that.$root.loadingshow !== undefined) {
      that.$root.loadingshow = false
    }
  },
  getuser: function () {
    var user = window.localStorage.getItem('user')
    if (user != null) {
      return JSON.parse(user)
    } else {
      return null
    }
  },
  cityvalue: function (name, list) {
    let rs = map(name, (one, index) => {
      let parent = ''
      if (index === 2) {
        parent = find(list, item => {
          return item.name === name[1]
        }) || {value: '__'}
        return find(list, item => {
          return item.name === one && item.parent === parent.value
        })
      } else {
        return find(list, item => {
          return item.name === one
        })
      }
    })
    return map(rs, one => {
      return one ? one.value : '__'
    }).join(' ')
  },
  cityname: function (value, list) {
    let rs = map(value, (one, index) => {
      return find(list, item => {
        return item.value === one
      })
    })
    return map(rs, one => {
      return one.name
    }).join(' ').replace('--', '')
  },
  getmodel: function (operate, pk, that, mm) {
    if (mm === undefined) {
      return this.getdata(operate, 'GetModel', {pk: pk}, that)
    } else {
      return this.getdata(operate, 'GetModel', {pk: pk}, that).then(function (r) {
        if (r.ok) {
          that[mm] = r.data
        } else {
          that.$vux.toast.show(r.message)
          console.log(r.message)
          // window.alert(r.message)
        }
      })
    }
  },
  getlist: function (pk) {
    return this.getdata('List', 'VuxDefLists', {pk: pk})
  },
  bindlist: function (that, pk, list, value, includeseal) {
    if (includeseal === undefined || includeseal === '') {
      includeseal = false
    }
    this.getdata('List', 'vpList', {pk: pk, ContainSeal: includeseal ? 'Y' : 'N'}, that).then(function (r) {
      if (r.ok) {
        // console.log(r.data)
        if (pk !== 'Dept' && pk.lastIndexOf('Dept') > 0) {
          that[list] = [{value: '', name: '我的数据'}].concat(r.data)
        } else {
          that[list] = [{value: '', name: '请选择'}].concat(r.data)
        }
        if (value !== undefined) {
          that[value] = ['']
        }
      } else {
        that.$vux.toast.show(r.message)
        // console.log(r.message)
      }
    })
  },
  // bindselect: function (that, pk, list) {
  //   let self = this
  //   this.getdata('List', 'VuxDefLists', {pk: pk}, that).then(function (r) {
  //     if (r.ok) {
  //       // Vue.set(list, r.data)
  //       that[list] = r.data
  //       // console.log(r.data)
  //     } else {
  //       this.$vux.toast.show('r.message)
  //       console.log(r.message)
  //     }
  //   })
  // },
  bindweixin: function (that, pk, list, value) {
    let self = this
    this.getdata('WeiXin', 'vpObject', {pk: pk}, that).then(function (r) {
      if (r.ok) {
        self.bindobjectcache(r, self, that, pk, list, value)
      } else {
        that.$vux.toast.show(r.message)
        console.log(r.message)
      }
    })
  },
  bindobject: function (that, pk, list, value) {
    let self = this
    let user = self.getuser()
    let data = window.localStorage.getItem(pk + user.pk_User)
    if (data === null) {
      this.getdata('List', 'vpObject', {pk: pk}, that).then(function (r) {
        if (r.ok) {
          window.localStorage.setItem(pk + user.pk_User, JSON.stringify(r))
          self.bindobjectcache(r, self, that, pk, list, value)
        } else {
          that.$vux.toast.show(r.message)
          console.log(r.message)
        }
      })
    } else {
      self.bindobjectcache(JSON.parse(data), self, that, pk, list, value)
    }
  },
  bindobjectcache: function (r, self, that, pk, list, value) {
    r.data.forEach(function (e) {
      if (e.parent === '0') {
        e.parent = 0
      }
    })
    if (pk !== 'Where' && pk.lastIndexOf('Where') > 0) {
      that[list] = [{value: ' ', name: '授权数据', parent: 0}, {value: '', name: '全部', parent: ' '}].concat(r.data)
    } else {
      that[list] = [{value: ' ', name: '请选择', parent: 0}, {value: '', name: '请选择', parent: ' '}].concat(r.data)
    }
    if (pk === 'Employee' || pk === 'DeptWhere') {
      let user = self.getuser()
      if (value !== undefined && user !== null) {
        that[value] = [user.pk_Dept, user.pk_User]
      }
    } else {
      that[value] = [' ', '']
    }
  },
  pulldownConfig: function () {
    return {
      content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加载中'
    }
  },
  querypage: function (that, loadmore) {
    if (that.$refs.scroller === null) {
      this.toast(that, 'scroller未null')
      return
    }
    setTimeout(() => {
      if (!loadmore) {
        that.pagenum = 1
        that.querydatas = []
      } else {
        that.pagenum += 1
      }
      this.querywhere(that.querypk, that.pagenum, that.querylists, that).then(function (r) {
        if (r.ok) {
          that.$nextTick(() => {
            that.$refs.scroller.donePullup()
            that.$refs.scroller.donePulldown()
          })
          if (!loadmore) {
            that.querydatas = r.data
          } else {
            that.querydatas.rows = Array.concat(that.querydatas.rows, r.data.rows)
          }
          that.pullupmessage = ''
          if (r.data.rows.length < 10) {
            if (r.data.rows.length === 0) {
              that.pullupmessage = '没查到数据'
            } else if (that.pagenum === 1) {
              that.pullupmessage = ''
            } else {
              that.pullupmessage = '没有更多数据'
            }
            // that.$refs.scroller.disablePullup()
            // that.pullupEnabled = false
          } else {
            that.pullupmessage = '上拉加载更多'
            // that.pullupEnabled = true
          }
        } else {
          // this.$vux.toast.show('r.message)
          console.log(r.message)
        }
      })
    }, 500)
  },
  querywhere: function (querypk, pagenum, querylists, that, datalist) {
    if (datalist === undefined) {
      return this.getdata('QueryQuery', 'Query', {pk: querypk, page: pagenum, lists: querylists}, that)
    } else {
      this.getdata('QueryQuery', 'Query', {pk: querypk, page: pagenum, lists: querylists}, that).then(function (r) {
        if (r.ok) {
          that[datalist] = r.data.rows
          // console.log(that[datalist])
        } else {
          that.$vux.toast.show(r.message)
        }
      })
      return null
    }
  },
  querychart: function (querypk, querylists, charttype, that, doc, chart, id, stack) {
    stack = (stack === undefined) ? '' : stack
    let param = {
      pk: querypk,
      page: 0,
      lists: querylists,
      type: charttype,
      stack: stack
    }
    if (id === undefined || doc === undefined || chart === undefined) {
      return this.getdata('QueryQuery', 'Chart', param, that)
    } else {
      this.getdata('QueryQuery', 'Chart', param, that).then(function (r) {
        if (r.ok) {
          let myChart = chart.init(doc.getElementById(id))
          myChart.setOption(r.data)
        } else {
          that.charcd = 1
          that.$vux.toast.show(r.message)
        }
      })
      return null
    }
  },
  querymodel: function (querypk, pk, that, mm) {
    if (mm === undefined) {
      return this.getdata('QueryQuery', 'Model', {pk: querypk, value: pk}, that)
    } else {
      return this.getdata('QueryQuery', 'Model', {pk: querypk, value: pk}, that).then(function (r) {
        if (r.ok) {
          that[mm] = r.data
        } else {
          that.$vux.toast.show(r.message)
          console.log(r.message)
        }
      })
    }
  },
  querycomments: function (soureid, that, lists) {
    if (lists === undefined) {
      return this.getdata('Comment', 'GetList', {pk: soureid}, that)
    } else {
      return this.getdata('Comment', 'GetList', {pk: soureid}, that).then(function (r) {
        if (r.ok) {
          that[lists] = r.data
        } else {
          that.$vux.toast.show(r.message)
          console.log(r.message)
        }
      })
    }
  },
  getdata: function (operate, operatetype, userdata, that) {
    this.loadingshow(that)
    var ticket = ''
    if (userdata === '') {
      userdata = {pk: 'nodata'}
    }
    if (operate !== 'User' && operatetype !== 'Login') {
      var user = window.localStorage.getItem('user')
      if (user === null) {
        console.log('未登陆')
        // window.alert('未登陆')
      } else {
        ticket = JSON.parse(user).Ticket
      }
    }
    let self = this
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://m.tmjk.cn/livemobile.ashx',
        type: 'get',
        dataType: 'jsonp',
        data: {
          param: JSON.stringify({
            operate: operate,
            operatetype: operatetype,
            userticket: ticket,
            localtime: this.gettime(),
            data: userdata
          })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          that.$vux.toast.show('网络或服务中断')
          // window.alert('错误:' + textStatus + ',' + errorThrown + ',' + XMLHttpRequest.readyState)
        },
        success: function (data, textStatus) {
          resolve(data)
          if (data.message === '已离线请登录') {
            that.$vux.toast.show(data.message)
            setTimeout(() => {
              if (that !== undefined) {
                let router = that.$router
                if (router !== undefined) {
                  router.push({name: 'Login', params: {offline: 'n'}})
                }
              }
            }, 500)
          }
        },
        complete: function (XMLHttpRequest, textStatus) {
          self.loadinghide(that)
        }
      })
    })
    return promise
  },
  dateadd: function (date, day) {
    date.setDate(date.getDate() + day)
    return this.getdate(date)
  },
  datetimeadd: function (date, hour) {
    date.setHours(date.getHours() + hour)
    return this.gettime(date)
  },
  gettime: function (date) {
    if (date === undefined) {
      date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth()
    var data = date.getDate()
    var hours = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var time = year + '-' + this.fnW((month + 1)) + '-' + this.fnW(data) + ' ' + this.fnW(hours) + ':' + this.fnW(minute) + ':' + this.fnW(second)
    return time
  },
  getdate: function (date) {
    if (date === undefined) {
      date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth()
    var data = date.getDate()
    var time = year + '-' + this.fnW((month + 1)) + '-' + this.fnW(data)
    return time
  },
  fnW: function (str) {
    return str > 9 ? str : '0' + str
  }
}
