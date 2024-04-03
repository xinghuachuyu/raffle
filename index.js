/* 
1: 定义抽奖次数渲染
  1-1 获取DOM元素
  1-2 定义剩余的抽奖次数
2: 点击抽奖按钮,实现滚动抽奖效果(复杂度高)
  2-1 获取点击按钮 ,绑定点击事件
  2-2 为每一个list选项添加类名,实现高亮状态
  2-3 定义当前高亮的列表项索引值
  2-4 使用定时器实现滚动效果
  2-5 使用随机数定义停止条件
3: 弹窗处理 
  3-1 打开弹窗.显示中奖信息(处理未中奖时的弹窗提示内容)
  3-2 打开弹窗的同时,减少剩余的抽奖次数
  3-3 关闭按钮的事件绑定
  3-4 再来一次按钮事件绑定 
4:  定义runGame函数
5: timer定时器bug修复
 */
(function () {
  //定义抽奖次数渲染
  let number = 5//从后端拿来数据
  let index = -1
  let curIndex = null
  let timeId = null
  let numberText = document.querySelector('.controller-left .num')
  let startBtn = document.querySelector('.controller-right')
  let prizeList = document.querySelectorAll('.prize')
  let mask = document.querySelector('.mask')
  let maskText = mask.querySelector('.mask-middle')
  let closeBtn = document.querySelector('.mask-content .close-btn')
  let againBtn = document.querySelector('.mask-content .mask-btn button')
  //入口函数
  var init = function () {
    numberText.innerHTML = number
    initEvent()
  }
  //绑定各种事件
  var initEvent = function () {
    startBtn.addEventListener('click', onStartBtnClick)
    closeBtn.addEventListener('click', onCloseBtnClick)
    againBtn.addEventListener('click', onAgainBtnClick)
  }
  //点击开始抽奖按钮函数
  var onStartBtnClick = function () {
    runGame()
    index = -1
  }
  //抽奖函数
  var runGame = function () {
    //判断是否还能抽奖
    if (number <= 0) {
      prizeList[curIndex].classList.remove('active')
      return
    }
    numberText.innerHTML = --number
    if (timeId) return
    //获取随机数
    let num = 3000 + Math.floor(Math.random() * 3000)
    timeId = setInterval(function () {
      num -= 300
      // console.log(num);
      if (num <= 0) {
        clearInterval(timeId)
        timeId = null
        //调用打开弹窗函数
        openDiolog()
        return
      }
      //index++是先赋值再+1;++index是先+1后赋值
      curIndex = ++index % prizeList.length
      //先清除有active的--用forEach方法
      // querySelectorAll里有forEach方法，而getElementsByClassName没有
      prizeList.forEach(function (node) {
        //后期优化
        //node表示数组中的对象对象
        node.classList.remove('active')
      })
      prizeList[curIndex].classList.add('active')
    }, 100)

  }
  //打开弹窗函数
  var openDiolog = function () {
    let span = prizeList[curIndex].querySelector('span').innerText
    if (curIndex === 4) { maskText.innerHTML = '很遗憾，您未中奖' }
    else { maskText.innerHTML = '恭喜您获奖：' + span }
    //根据抽奖次数更改文案
    if (number === 0) {
      againBtn.innerHTML = '确定'
    }
    mask.style.display = 'block'
  }
  //关闭弹窗函数
  var onCloseBtnClick = function () {
    mask.style.display = 'none'
    prizeList[curIndex].classList.remove('active')
  }
  //再来一次函数
  var onAgainBtnClick = function () {
    index = -1
    mask.style.display = 'none'
    runGame()
  }
  //调用入口函数
  init()
})()