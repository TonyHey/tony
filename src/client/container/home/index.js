import React, { Component } from "react"
import PropTypes from "prop-types"
import Fetch from "isomorphic-fetch"
import logo from "../../../logo.svg"
// import qrcode from "./qrcode.jpg"
import styles from "./index.module.less"

class App extends Component {
  componentDidMount() {
    /* eslint-disable */
        let c = document.getElementsByTagName("canvas")[0],
            x = c.getContext("2d"),
            pr = window.devicePixelRatio || 1,
            w = window.innerWidth,
            h = window.innerHeight,
            f = 90,
            m = Math,
            r = 0,
            u = m.PI * 2,
            v = m.cos,
            z = m.random
        let q
        c.width = w*pr
        c.height = h*pr
        x.scale(pr, pr)
        x.globalAlpha = 0.6
        function i(){
            x.clearRect(0,0,w,h)
            q=[{x:0,y:h*.5+f},{x:0,y:h*.5-f}]
            while(q[1].x<w+f) d(q[0], q[1])
        }
        function d(i,j){
            x.beginPath()
            x.moveTo(i.x, i.y)
            x.lineTo(j.x, j.y)
            const k = j.x + (z()*2-0.25)*f, n = y(j.y)
            x.lineTo(k, n)
            x.closePath()
            r-=u/-50
            x.fillStyle = "#"+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
            x.fill()
            q[0] = q[1]
            q[1] = {x:k,y:n}
        }
        function y(p){
            const t = p + (z()*2-1.1)*f
            return (t>h||t<0) ? y(p) : t
        }
        document.addEventListener("click", () => i())
        i()

        const ua = navigator.userAgent.toLowerCase()
        if (/micromessenger/.test(ua)) {
            const { wx } = window
            const { href } = location
            const link = encodeURI(href.split("#")[0])
            const { title, desc, imgUrl } = this.props
            Fetch("/api/signature?url=" + link,
                { method: "GET" })
            .then(res => res.json()).then(data => {
                wx.config({
                    debug: false,
                    appId: "wx74e1a7285e3aa575", // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,
                    jsApiList: ["onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                wx.ready(() => {
                    wx.onMenuShareAppMessage({
                        title, // 分享标题
                        desc, // 分享描述
                        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl, // 分享图标
                        success() {
                            console.log("success")
                            // 用户确认分享后执行的回调函数
                        },
                        cancel() {
                            console.log("failed")
                            // 用户取消分享后执行的回调函数
                        }
                    })
                })
            }).catch(err => console.log(err))
        }
        /* eslint-enable */
  }

  render() {
    const { title, desc } = this.props
    return (
      <div className={styles.app}>
        <section className={styles.container}>
          <div className={styles.app_header}>
            <img src={logo} className={styles.app_logo} alt="logo" />
            <h1 id="wx-share-title">{title}</h1>
            <h2 id="wx-share-desc">{desc}</h2>
          </div>
          <p className={styles.app_intro}>
            <a
              rel="noopener noreferrer"
              href="https://github.com/TonyHey"
              target="_blank"
            >
              github
            </a>
          </p>
          <p className={styles.app_intro}>
            <a
              rel="noopener noreferrer"
              href="http://project.freedomlove.me"
              target="_blank"
            >
              project
            </a>
          </p>
          <p className={styles.app_intro}>
            <a
              rel="noopener noreferrer"
              href="https://tonyhey.github.io/tony-cv"
              target="_blank"
            >
              resume
            </a>
          </p>
          <p className={styles.app_intro}>
            <a
              rel="noopener noreferrer"
              href="https://www.facebook.com/Tonyheee"
              target="_blank"
            >
              facebook
            </a>
          </p>
        </section>
        <canvas id="canvas_box" className={styles.canvas}>your browser not suport canvas</canvas>
      </div>
    )
  }
}

App.defaultProps = {
  title: "Tony's Here",
  desc: "Keep moving and carry on",
  imgUrl: "https://cdn.freedomlove.me/upload/motor.jpg",
}
App.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  imgUrl: PropTypes.string,
}
export default App
