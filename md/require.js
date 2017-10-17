const axios = require('axios')
const Q = require('q')
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true

module.exports = {
  u: 'http://10.0.0.17:9999/',

  // 1商品品种
  // 1.1查询所有品种
  searchAll: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainVarietyList',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'size': data.size, 'page': data.page}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.2查询关键字
  checkCommodity: function (data, word) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainVarietyByVarietyName',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'varietyName': word, 'page': data.page, 'size': data.size}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.3添加商品
  addCommodity: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseVariety',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'sortPriority': data.sortPriority, 'varietyName': data.name}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.4 移入回收站
  removeCommodity: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseVarietyRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.5 修改品种
  reviseCommodity: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/modifyVariety',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'sortPriority': data.sortPriority, 'varietyName': data.name, 'id': data.id}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.6 回收站列表信息
  rubbishCommodity: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainVarietyRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'page': data.page, 'size': data.size}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.7 移出回收站
  backCommodity: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeVarietyRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.8 删除
  removeBank: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeVariety',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.9 验证是否存在
  checkvarietyName: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/verifyVariety',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'varietyName': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 1.10 回收站关键词查找
  rubbishWord: function (data, word) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainVarietyRecycleByName',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'varietyName': word, 'page': data.page, 'size': data.size}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },


  // 2 商品标签
  // 2.1 查看所有标签
  searchAllTag: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainLabel',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'size': data.size, 'page': data.page, 'isRecycled': data.isRecycled}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  //  2.2根据标签名查找
    searchByLabeiName: function (data) {
        var deferred = Q.defer()
        axios({
            method: 'POST',
            url: this.u + 'api/product/obtainLabelByLabelName',
            headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
            data: {"labelName":data.labelName,'page': data.page,'size': data.size}
        }).then(function (response) {
            deferred.resolve(response.data)
        }).catch(function (error) {
            console.log(error)
        })
        return deferred.promise
    },
  // 2.2 标签移入回收站
  removeTagRubbish: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseLabelRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 2.3 删除标签
  removeTag: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeLabel',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data.labelId}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 2.4 标签移出回收站
  backTag: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeLabelRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 2.5 验证标签是否存在
  checkTagName: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/verifyLabel',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'labelName': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 2.6 添加标签
  addTag: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseLabel',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: { 'labelName': data.labelName,'sortPriority': data.sortPriority}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 2.7 修改标签
  reviseTag: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/modifyLabel',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: { 'id': data.id, 'labelName': data.labelName,'sortPriority': data.sortPriority}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },

    //2.9 会员标签查看
    searchTag: function (data) {
        var deferred = Q.defer()
        axios({
            method: 'POST',
            url: this.u + 'api/member/obtainMemberLabel',
            headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
            data: {"memberId":data.memberId}
        }).then(function (response) {
            deferred.resolve(response.data)
        }).catch(function (error) {
            console.log(error)
        })
        return deferred.promise
    },






  // 3商品规格
  // 3.1查看所有规格
  searchAllSpec: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainSpecList',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'size': data.size, 'page': data.page, 'isRecycled': data.isRecycled}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.2添加规格
  addSpec: function (data, varietyId) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseSpec',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'specName': data.name, 'sortPriority': data.sortPriority, 'varietyId': varietyId}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.3移入回收站
  removeSpecRubbish: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseSpecRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.4修改规格
  reviseSpec: function (data, varietyId) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/modifySpec',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data.id, 'specName': data.name, 'sortPriority': data.sortPriority, 'varietyId': varietyId}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.5移出回收站
  backSpec: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeSpecRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.6彻底删除
  removeSpec: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeSpec',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.7关键字查找
  checkSpecWord: function (data, word) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainSpecBySpecName',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'size': data.size, 'page': data.page, 'isRecycled': data.isRecycled, 'specName': word}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.8验证规格
  checkSpec: function (specName, varietyId) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/verifySpec',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'specName': specName, 'varietyId': varietyId}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.9根据规格id查看规格参数
  checkAllSpecParam: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainSpecParamList',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'page': data.page, 'size': data.size, 'specId': data.id}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.10添加规格参数
  addSpecParam: function (id, parameter) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseSpecParam',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'specId': id, 'parameter': parameter}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.11修改规格参数
  reviseSpecParam: function (id, specId, parameter) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/modifySpecParam',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': id, 'specId': specId, 'parameter': parameter}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.12删除规格参数
  removeSpecParam: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeSpecParam',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.13验证规格参数
  checkSpecParameter: function (id, parameter) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/verifySpecParam',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': id, 'parameter': parameter}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 3.14关键字查找规格参数
  checkWordSpecParam: function (data, word) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainSpecParamByParameter',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'page': data.page, 'size': data.size, 'specId': data.id, 'parameter': word}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },


  // 4类别
  // 4.1查询所有类别
  searchAllType: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/obtainProductCategoryList',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'page': data.page, 'size': data.size, 'isRecycled': data.isRecycled}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 4.2类别移入回收站
  removeTypeRubbish: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/increaseCategoryRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 4.3类别移出回收站
  backType: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeCategoryRecycle',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 4.4删除类别
  removeType: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/product/removeProductCategory',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 5会员管理
  // 5.1会员列表
  searchMember: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/member/obtainMemberList',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'page': data.page, 'size': data.size, 'memberTel': data.memberTel, 'res': data.beginTime, 'res2': data.overTime}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 5.2查看会员详情
  checkMemberDetail: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/member/obtainMemberById',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data.id}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 5.3更改会员状态
  changeMember: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/member/changeMemberStatus',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'id': data}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },
  // 5.4增加会员积分
  addMemberScore: function (data) {
    var deferred = Q.defer()
    axios({
      method: 'POST',
      url: this.u + 'api/member/addMemberIntegral',
      headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
      data: {'memberId': data.memberId, 'recordDescribe': data.recordDescribe, 'recordContent': data.recordContent, 'contentGenre': data.contentGenre, 'recordGenre': data.recordGenre}
    }).then(function (response) {
      deferred.resolve(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    return deferred.promise
  },


  // 6.卡券列表
    searchPacket: function (data) {
        var deferred = Q.defer()
        axios({
            method: 'POST',
            url: this.u + 'api/member/obtainCouponByMemberId',
            headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
            data: {'memberId': data.memberId}
        }).then(function (response) {
            deferred.resolve(response.data)
        }).catch(function (error) {
            console.log(error)
        })
        return deferred.promise
    },
    //7.收货地址的列表
    searchAdress:function (data) {
        var deferred = Q.defer();
        axios({
            method: 'POST',
            url: this.u + 'api/member/obtainAddress',
            headers: {'Authorization': '', 'Content-Type': 'application/json;charset=utf-8'},
            data: {'memberId': data.memberId}
        }).then(function (response) {
            deferred.resolve(response.data)
        }).catch(function (error) {
            console.log(error)
        })
        return deferred.promise
    }
}
