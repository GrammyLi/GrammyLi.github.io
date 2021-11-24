/*
 * @Author: your name
 * @Date: 2021-10-13 12:44:25
 * @LastEditTime: 2021-10-13 12:44:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/avatar-generator/demo.js
 */
var { round, random } = Math

function rgb(colors) {
  return `rgb(${ colors.join(',') })`
}

function getPixels({ count, bias, baseColor, baseFrequency }) {
  return new Array(count)
    .join(' ')
    .split(' ')
    .map(p => random() <= baseFrequency ? baseColor : rgb(
      bias.map((c, i) => round(random() * bias[i]))
    ))
}

var pixels = null

var pxCount = 5
var totalPxCount = 0

var pxSize = 32
var canvasSize = 0

var baseColor = '#ffffff'
var baseFrequency = .4
var [ red, green, blue ] = [ 255, 0, 127 ]

var autoplay = true
var autoplaySpeed = 6
var _autoplaySpeedMax = 30
var _autoplayCounter = 0

var canvas = document.getElementById('c')
var ctx = canvas.getContext('2d')

function draw() {
  var newCanvasSize = pxSize * pxCount * 2 - pxSize
  if (newCanvasSize !== canvasSize) {
    canvas.width = newCanvasSize
    canvas.height = newCanvasSize
  }

  var _speed = _autoplaySpeedMax - autoplaySpeed
  var shouldAutoplay = autoplay && !(_autoplayCounter++ % _speed)
  var isPxCountChanged = totalPxCount !== pxCount * pxCount
  if (!pixels || shouldAutoplay || isPxCountChanged) {
    totalPxCount = pxCount * pxCount
    pixels = getPixels({
      count: totalPxCount,
      bias: [ red, green, blue ],
      baseColor,
      baseFrequency
    })
  }

  pixels.forEach((pixel, index) => {
    ctx.fillStyle = pixel

    // top left
    ctx.fillRect(
      Math.floor(index / pxCount) * pxSize,
      index % pxCount * pxSize,
      pxSize,
      pxSize
    )

    // top right
    ctx.fillRect(
      ((pxCount + Math.floor(pxCount - (index + 1) / pxCount)) - 1 )* pxSize,
      index % pxCount * pxSize,
      pxSize,
      pxSize
    )

    // bottom left
    ctx.fillRect(
      Math.floor(index / pxCount) * pxSize,
      (((pxCount * 2 - 1) - (index % pxCount)) - 1) * pxSize,
      pxSize,
      pxSize
    )

    // bottom right
    ctx.fillRect(
      ((pxCount + Math.floor(pxCount - (index + 1) / pxCount)) - 1) * pxSize,
      (((pxCount * 2 - 1) - (index % pxCount)) - 1) * pxSize,
      pxSize,
      pxSize
    )
  })

  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)

var $refresher =  document.getElementById('refresh')
$refresher.addEventListener('click', e => { pixels = null })

var $pxCount = document.getElementById('px-count')
$pxCount.value = pxCount
$pxCount.addEventListener('change', e => {
  pxCount = parseInt(e.target.value, 10)
})

var $pxSize = document.getElementById('px-size')
$pxSize.value = pxSize
$pxSize.addEventListener('change', e => {
  pxSize = parseInt(e.target.value, 10)
})

var $baseColor = document.getElementById('base-color')
$baseColor.value = baseColor
$baseColor.addEventListener('change', e => {
  baseColor = e.target.value
})

var $baseFrequency = document.getElementById('base-frequency')
$baseFrequency.value = baseFrequency
$baseFrequency.addEventListener('input', e => {
  baseFrequency = parseFloat(e.target.value, 10)
})

var $red = document.getElementById('red-slider')
$red.value = red
$red.addEventListener('input', e => {
  red = parseInt(e.target.value, 10)
})

var $green = document.getElementById('green-slider')
$green.value = green
$green.addEventListener('input', e => {
  green = parseInt(e.target.value, 10)
})

var $blue = document.getElementById('blue-slider')
$blue.value = blue
$blue.addEventListener('input', e => {
  blue = parseInt(e.target.value, 10)
})

var $autoplay = document.getElementById('autoplay')
$autoplay.checked = autoplay
$autoplay.addEventListener('change', e => {
  autoplay = e.target.checked
})

var $autoplaySpeed = document.getElementById('autoplay-speed')
$autoplaySpeed.value = autoplaySpeed
$autoplaySpeed.max = _autoplaySpeedMax
$autoplaySpeed.addEventListener('input', e => {
  autoplaySpeed = parseInt(e.target.value, 10)
})