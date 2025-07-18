// https://denghao.me/demo/2017/html5player/index.html


Zepto(function($) {
  var fisrtTime = 1,
    index = 0,
    audio,
    JS_music = $("#JS_music"),
    JS_liric = $("#JS_liric"),
    JS_btnChange = $(".JS_btnChange"),
    JS_btnPrev = $(".btn-prev"),
    JS_btnNext = $(".btn-next"),
    list = [{
      name: 'part 1',
      url: "http://imgd2.soufunimg.com/2015/06/19/chengdu/gebz/66847e8f33d844f9af74a2cc23ae8fad/files/1.mp3"
    }, {
      name: 'part 2',
      url: "http://imgd2.soufunimg.com/2015/06/19/chengdu/gebz/66847e8f33d844f9af74a2cc23ae8fad/files/2.mp3"
    }, {
      name: 'part 3',
      url: "http://imgd2.soufunimg.com/2015/06/19/chengdu/gebz/66847e8f33d844f9af74a2cc23ae8fad/files/3.mp3"
    }];

  var myAudio = {
    init(src) {
      audio = document.createElement("audio");
      if (src) {
        audio.src = src;
      }
      audio.load();
      audio.play();
      this.autoplay();
      this.progress();
      document.body.appendChild(audio);
    },
    play(src) {
      if (audio) {
        if (src) {
          audio.src = src;
        }
        audio.play();
      }
    },
    pause() {
      if (audio) {
        audio.pause();
      }
    },
    toggle() {
      if (audio) {
        if (audio.paused) {
          setTimeout(function() {
            audio.play();
          }, 800)
        } else {
          audio.pause();
        }
      }
    },
    autoplay() {
      document.addEventListener("touchstart", function() {
        if (fisrtTime) {
          audio.play();
        }
        fisrtTime = 0;
      }, false);

      document.addEventListener("WeixinJSBridgeReady", function() {
        audio.play();
      }, false);

      document.addEventListener('YixinJSBridgeReady', function() {
        audio.play();
      }, false);
    },
    progress() {
      var inner = $(".progress div");
      audio.addEventListener("timeupdate", function() {
        var p = Math.floor(audio.currentTime) / Math.floor(audio.duration) * 100;
        inner.css('width', p + '%');
        if (p >= 100) {
          $("#JS_music,#btnPlay").removeClass('on');
        }
      }, false)
    }
  }

  // audio init
  setTimeout(function() {
    JS_music.addClass('on');
    myAudio.init(list[index].url);
    JS_liric.text(list[index].name);
  }.call(this), 1000);

  //audio play
  $("#JS_music,#btnPlay").on('click', function(e) {
    $("#JS_music,#btnPlay").toggleClass('on');
    myAudio.toggle();
  });

  // prev or next
  JS_btnChange.on('click', function(e) {
    var isPrev = $(this).hasClass('btn-prev');
    JS_btnChange.css('opacity', '1');
    if (isPrev) {
      if (index > 0) {
        index--
      } else {
        JS_btnPrev.css('opacity', '0.3');
        return;
      }
    } else {
      if (index < list.length - 1) {
        index++
      } else {
        JS_btnNext.css('opacity', '0.3');
        return;
      }
    }
    $("#JS_music,#btnPlay").addClass('on');
    myAudio.play(list[index].url);
    JS_liric.text(list[index].name);
  })

});
