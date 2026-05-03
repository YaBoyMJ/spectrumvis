let audioCtx, analyser, dataArray;

async function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioCtx.createMediaStreamSource(stream);

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  source.connect(analyser);
}

function getAudioData() {
  if (!analyser) return null;
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}