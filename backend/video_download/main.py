from pytube import YouTube


yt = YouTube('https://www.youtube.com/watch?v=B5JePOg-vLk')
yt.streams.first().download('backend/video_download/data/speech2Text')