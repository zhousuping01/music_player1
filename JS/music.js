/**
 * Created by 周素平 on 2018/8/13.
 */
var volume = document.getElementById('volume');
var audio = document.getElementById('audio');
var colo = document.getElementById('colo');
var bar = document.getElementById('bar');
var bar1 = document.getElementById('bar1');
var btn1 = document.getElementById('btn1');
var img1 = document.getElementById('img1');
var img = document.getElementById('img');
var img2 = document.getElementById('img2');
var laba = document.getElementById('laba');
var kuaitui = document.getElementById('kuaitui');
var kuaijin = document.getElementById('kuaijin');
var changeTime = document.getElementById('changeTime');
var timeWidth = document.getElementById('timeWidth');
var endTime = document.getElementById('endTime');
var totalTime = document.getElementById('totalTime');
var xunhuan = document.getElementById('xunhuan');
var shoucang = document.getElementById('shoucang');
var marquee = document.getElementById('marquee');


window.onload = function(){

    var mobileWidth = window.innerWidth;
    var mobileHeight = window.innerHeight;
    document.body.style.width = mobileWidth;
    document.body.style.height = mobileHeight;

};

var isXun = true;
xunhuan.onclick = function(){
    if(isXun){
        xunhuan.src = "../IMAG/music/danquxunhuan.png";
        if(audio.currentTime == audio.duration){
            audio.currentTime = 0;
            audio.play();
        }
        isXun = false;
    }else{
        xunhuan.src = "../IMAG/music/circulate.png";
        isXun = true;
    }
}

var isDo = true;
shoucang.onclick = function(){
    if(isDo){
        shoucang.setAttribute('src','../IMAG/music/yishoucang.png');
        isDo = false;
    }else{
        shoucang.setAttribute('src','../IMAG/music/shoucang.png');
        isDo = true;
    }

};
kuaijin.onclick = function(){
    audio.currentTime += 5;
};
kuaitui.onclick = function(){
    audio.currentTime -= 5;
};

var isSound = true;
laba.onclick = function(){
    if(isSound){
        audio.muted = true;
        img2.setAttribute('src','../IMAG/music/silent.png');
        isSound = false;
    }
    else{
        audio.muted = false;
        img2.setAttribute('src','../IMAG/music/unquiet.png');
        isSound = true;
    }
};

var isPlay = true;

img.style.animationPlayState = 'paused';
btn1.onclick = function(){
    if(isPlay){
        audio.play();
        img1.setAttribute('src','../IMAG/music/pause.png');
        img.style.animationPlayState = 'running';
        isPlay = false;
    }else{
        audio.pause();
        img1.setAttribute('src','../IMAG/music/play.png');
        img.style.animationPlayState = 'paused';
        isPlay = true;
    }
};
audio.volume = 0.5;
bar.style.left = (volume.clientWidth - bar.offsetWidth)/2 + "px";
colo.style.width = (volume.clientWidth - bar.offsetWidth)/2  + "px";
volume.onclick = function(e){
    var ev = e||window.event;
    var cont = ev.clientX - this.offsetLeft;
    var allwidth = volume.clientWidth;
    if(cont<=allwidth){
        audio.volume = (cont/allwidth);
        bar.style.left = cont + "px";
        colo.style.width = cont + "px"
    }
};

function sendTime(t){
    var minutes = parseInt( t / 60, 10);
    var seconds = parseInt( t % 60, 10);
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
}
var waitTime = setTimeout(function(){
    if(audio.readyState > 2){
        endTime.innerHTML = sendTime(audio.duration);
        clearInterval(waitTime);
    }
},100);

audio.addEventListener('timeupdate',function(){
    changeTime.innerHTML = sendTime(audio.currentTime);
    timeWidth.style.width = (audio.currentTime/audio.duration)*100 + "%";
    if(timeWidth.style.width == 100 + "%"){
        img1.setAttribute('src','../IMAG/music/play.png')
    }
});
totalTime.onclick = function(e){
    var ev = e||window.event;
    console.log(ev.clientX);
    timeWidth.style.width = ( (ev.clientX  - totalTime.offsetLeft) / totalTime.clientWidth)*100 + '%';
    audio.currentTime = audio.duration * ( (ev.clientX  - totalTime.offsetLeft) / totalTime.clientWidth);
};
