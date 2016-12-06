function initializeRecorder() {
  navigator.getUserMedia({
    video: true,
    audio: false
  }, function(stream) {
    recorder = RecordRTC(stream, { type: 'video'});
    recorder.startRecording();
  }, function(err) {
    console.log(err);
  });
}

function writeVideoToFile() {
  recorder.stopRecording(function(videoURL) {
    console.log(videoURL);

    var recordedBlob = recorder.getBlob();
    recorder.save(idNumber + ".webm");
    ipcRenderer.send("video-saved", "true");
  })


}
