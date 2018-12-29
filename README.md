# 音乐播放器
<p>静态页面</p>
<img src="image/music%20player.png" width="400">

#### 功能分析
- 从music.json文件获取数据
- 播放、前进、后退、时间进度条
- 音乐列表、音量控制

#### 代码分析
1. 使用AJAX获取数据，封装成getMusicList() 函数
2. 封装loadMusic函数，设置audio对象的src，获取歌曲信息和图片
3. 封装generatelist函数,生成音乐播放列表，在列表中显示正在播放的曲目
4. 给控件绑定click事件 ，设置歌曲的播放、前进、后退，进度条的快进，根据音量条控制音量大小
5. 给音乐列表绑定click事件，选择想要播放的音乐
6. 监听playing事件，设置定时器间隔显示当前歌曲时间
7. 监听pause事件，清除定时器
8. 监听timeupdate事件，设置进度条
9. 监听ended事件，自动切换下一首

  
