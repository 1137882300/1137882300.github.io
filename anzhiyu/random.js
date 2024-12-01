var posts=["article/112258.html","article/112246.html","article/112263.html","article/112231.html","article/112260.html","article/112256.html","article/112252.html","article/112235.html","article/112247.html","article/112254.html","article/112262.html","article/112230.html","article/112253.html","article/112248.html","article/112250.html","article/112255.html","article/112244.html","article/112225.html","article/112240.html","article/112236.html","article/112237.html","article/112239.html","article/112243.html","article/112257.html","article/112245.html","article/112249.html","article/112219.html","article/112224.html","article/112232.html","article/112211.html","article/112217.html","article/112218.html","article/112238.html","article/112241.html","article/112242.html","article/112268.html","article/112261.html","article/112221.html","article/112216.html","article/112251.html","article/112264.html","article/112267.html","article/112265.html","article/112210.html","article/112266.html","article/112234.html","article/112212.html","article/112233.html","article/112259.html","article/112213.html","article/112215.html","article/112220.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"時光","link":"https://blog.shiguang666.eu.org/","avatar":"https://blog.shiguang666.eu.org/img/avatar.png","descr":"心寄朗朗乾坤，胸怀真修之道。","recommend":true,"color":null},{"name":"金丝雀","link":"https://blog.loricat.cn/","avatar":"https://photo.loricat.cn/tx.png","descr":"迷失的人迷失了，相逢的人会再相逢 —— 金丝雀","recommend":true,"color":null},{"name":"茗辰原 の 异世界","link":"https://not.mcy.cloudns.org/","avatar":"https://ice.frostsky.com/2024/01/07/e83fb8c32b0eedf803ea76a2d839f7e3.png","descr":"茗辰原，一个与众不同的异世界，等待你的探索与发现。","recommend":true,"color":null},{"name":"梦泽不是梦","link":"https://www.mengze2.cn","avatar":"https://www.mengze2.cn/favicon.ico","descr":"记录人间的苦逼的日子/我在人间凑数的日子","recommend":true,"color":null},{"name":"lozhu's blog","link":"https://lozhu.happy365.day","avatar":"https://lozhu.happy365.day/images/logo.png","descr":"一切皆是因为好玩～","recommend":true,"color":null},{"name":"Gin 琴酒","link":"https://blog.gincode.icu/","avatar":"https://files.superbed.cn/store/images/0e/8f/64baa3da1ddac507ccec0e8f.png","descr":"满堂花醉三千客，一剑霜寒十四州。|","color":null},{"name":"学海无涯","link":"https://caolib.github.io","avatar":"https://img2.imgtp.com/2024/04/04/A1kg7et8.gif","descr":"停止摆烂，背水一战","recommend":true,"color":"vip","tag":"新"},{"name":"Jerry Zhou","link":"https://blog.jerryz.com.cn/","avatar":"https://img.examcoo.com/ask/7386438/202111/163626915705190.jpg","descr":"永远相信美好的事情即将发生","recommend":false,"color":"vip","tag":"新"},{"name":"星空故事·魔法小屋","link":"https://blog.sinzmise.top/","avatar":"https://blog.sinzmise.top/img/avatar.png","descr":"种下一颗有故事的种子，让它带着魔法和奇迹生根发芽","recommend":false,"color":"vip","tag":"新"},{"name":"Langchain","link":"https://python.langchain.com/","avatar":"https://js.langchain.com/img/favicon.ico","descr":"AI 框架","recommend":true},{"name":"Youtube","link":"https://www.youtube.com/","avatar":"https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png","descr":"全球最大的视频网站"},{"name":"Weibo","link":"https://www.weibo.com/","avatar":"https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png","descr":"中國最大社交分享平台"},{"name":"Twitter","link":"https://twitter.com/","avatar":"https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png","descr":"社交分享平台","tag":"技术"},{"name":"Evan","link":"https://www.evan.xin","avatar":"https://www.evan.xin/logo.png","descr":"Crappy technophiles","recommend":true,"color":"vip"},{"name":"小城故事","link":"https://webxc.eu.org","avatar":"https://npm.elemecdn.com/webxc/logo/logo.jpg","descr":"欢迎光临小城故事!","recommend":true,"color":null},{"name":"云烟","link":"https://www.yunyanck.cn/","avatar":"https://q1.qlogo.cn/g?b=qq&nk=634267404&s=100","descr":"祝少年不老 何妨迷路看风光","recommend":false,"color":"vip","tag":"新"},{"name":"JiangnanPsalter","link":"https://jiangnanpsalter.com/","avatar":"https://jiangnanpsalter.com/img/avater.jpg","descr":"风华绝代，难绘就一成","recommend":false,"color":"vip","tag":"新"},{"name":"旅游的企鹅","link":"https://www.lydqe.cc/","avatar":"https://www.lydqe.cc/upload/biao.jpeg","descr":"努力学习新的知识","recommend":false,"color":"vip","tag":"新"},{"name":"懵仙兔兔","link":"https://2dph.com","avatar":"https://2dph.com/logo.png","descr":"永远相信，美好的事情即将发生 —— 懵仙兔兔","recommend":false,"color":"vip","tag":"新"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };