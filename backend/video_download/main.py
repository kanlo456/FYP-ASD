from pytube import YouTube


yt = YouTube('https://www.youtube.com/watch?v=SuPafRvCw6Q&t=46s')
yt.streams.first().download('backend/video_download/data/speech_data')