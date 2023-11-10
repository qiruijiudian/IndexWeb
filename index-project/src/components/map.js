
export function MP() {
  return new Promise(function(resolve, reject) {
    // window.init = function() {
    //   resolve(BMap)
    // }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=93ryhHn98fcRjKhVmVAYQEiY6ovVcC5x&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  })
}