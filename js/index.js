var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
audio.volume  = 0.5
var musicList = []
function $(selector){
    return document.querySelector(selector)
}
function $$(selector){
    return document.querySelectorAll(selector)
}
audio.ontimeupdate = function(){
    // console.log(this.currentTime)
    $('.progress .progress-now').style.width = this.currentTime / this.duration *100 + '%'
    // var min = Math.floor(this.currentTime/60)
    // var sec_str = Math.floor(this.currentTime)%60 + ''
    // var sec = sec_str.length<2?'0'+sec_str:sec_str
    // $('.progress .time').innerText = min + ':'+ sec
}

audio.onplay = function(){
    clock = setInterval(function(){
        var min = Math.floor(audio.currentTime/60) //不能用this.currentTime,this是windows
        var sec= Math.floor(audio.currentTime)%60 + ''
        sec = sec.length ===2? sec : '0'+sec
        $('.progress .time').innerText = min + ':'+ sec
        $('.music .play .fas').classList.remove('fa-play')
        $('.music .play .fas').classList.add('fa-pause')
    },1000)
}

audio.onpause = function(){
    clearInterval(clock)
}

audio.onended = function(){
    currentIndex = (++currentIndex)% musicList.length
    //console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}

$('.music .play').onclick = function(){
    if(audio.paused) {
        audio.play()
        this.querySelector('.fas').classList.remove('fa-play')
        this.querySelector('.fas').classList.add('fa-pause')
    } else{
        audio.pause()
        this.querySelector('.fas').classList.remove('fa-pause')
        this.querySelector('.fas').classList.add('fa-play')        
    }
}

$('.music .forward').onclick =function(){
    currentIndex = (++currentIndex)% musicList.length
    //console.log(currentIndex)
    loadMusic(musicList[currentIndex])
    $$('li').forEach(function(node){
            node.classList.remove('select')          
        }
    )
    $$('.generate-list li')[currentIndex].classList.add('select')
}
$('.music .backward').onclick = function(){
    currentIndex = (--currentIndex+ musicList.length) % musicList.length
    loadMusic(musicList[currentIndex])
    $$('li').forEach(function(node){
        node.classList.remove('select')          
    }
)
    $$('.generate-list li')[currentIndex].classList.add('select')
}

$('.progress .bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime =  audio.duration * percent
}
$('.music .loudspeaker').onclick = function(){
    $('.music .volume-total').classList.toggle('show')
}
$('.music .volume-total').onclick = function(e){
    var percent = e.offsetY / parseInt(getComputedStyle(this).height)
    audio.volume = percent * 1
    console.log(audio.volume)
    $('.music .volume-now').style.height = e.offsetY + 'px';
}
$('.musicplayer .playlist').onclick = function(){
    $('.generate-list').classList.toggle('hide')
}

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','/music.json', true)
    xhr.onload = function(){
        if(xhr.status >=200 && xhr.status <300 ||xhr.status===304){
    callback(JSON.parse(this.responseText))
  }else {
    console.log('数据获取异常')
  }
  xhr.onerror = function(){
    console.log('网络异常')
  }
}
xhr.send()
}

function loadMusic(musicObj){
    console.log(musicObj)
    audio.src = musicObj.src
    $('.info .title').innerText = musicObj.title
    $('.info .auther').innerText = musicObj.auther
    $('.info .cover img').setAttribute('src', musicObj.img)
}

function generateList(musicList){
    musicList.forEach(function(node,index){
        var li = document.createElement('li')
        li.setAttribute('index',index)
        li.innerText = index +1 + node.title + '-' +node.auther
        $('.generate-list').appendChild(li)
    })
    $$('.generate-list li')[currentIndex].classList.add('select')
}

$('.generate-list').onclick = function(e){
    loadMusic(musicList[e.target.getAttribute('index')])
    $$('li').forEach(function(node){
        node.classList.remove('select')          
    }
)
        $$('li').forEach(function(node){
            node.classList.remove('select')          
        }
    )
    e.target.classList.add('select')
    // $$('li').forEach(function(node){
    //     if(node.classList.contains('select')){
    //         node.classList.remove('select')
    //         e.target.classList.add('select')
    //     }else {
    //         e.target.classList.add('select')
    //     }
    // })
}

getMusicList(function(list){
    // console.log(list)
    // var song = list[currentIndex]
    // var audioObject = new Audio(song.src)
    musicList = list
    loadMusic(musicList[currentIndex])
    generateList(musicList)
})


