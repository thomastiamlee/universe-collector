function initializeRecorder() {
  navigator.getUserMedia({
    video: true,
    audio: false
  }, function(stream) {
    recorder = RecordRTC(stream, { type: 'video'});
    recorder.startRecording();
    startSession();
  }, function(err) {
    console.log(err);
  });
}

function writeVideoToFile() {
  recorder.stopRecording(function(videoURL) {
    console.log(videoURL);

    var recordedBlob = recorder.getBlob();
    recorder.save(__dirname + "/../data/" + idNumber + ".webm");
    ipcRenderer.send("video-saved", "true");
  })


}
