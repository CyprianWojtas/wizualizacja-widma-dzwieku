let c = document.createElement("canvas");
c.width = 1204;
c.height = 1024;
document.body.append(c);
let ctx = c.getContext("2d");

//let pozycja = 0;
var audio;
var audio2;
window.onload = async function() {
    
    let stream = await navigator.mediaDevices.getUserMedia({audio: true});
    
	audio = document.getElementById('audio');
	// audio2 = document.getElementById('myAudio2');

	audio .srcObject = stream;
    //audio2.srcObject = stream;
	//video.play();
    
	var ctxA = new AudioContext();
	var audioSrc = ctxA.createMediaElementSource(audio);
	var analyser = ctxA.createAnalyser();
	analyser.smoothingTimeConstant = 0;
	//console.log(analyser);
	// we have to connect the MediaElementSource with the analyser 
	audioSrc.connect(analyser);
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
   
	// frequencyBinCount tells you how many values you'll receive from the analyser
	var frequencyData = new Uint8Array(analyser.frequencyBinCount);

	c.height = analyser.frequencyBinCount / 4;
   
	// we're ready to receive some data!
	// loop
	let pixele = new ImageData(1, c.height);
	function renderFrame() {
		requestAnimationFrame(renderFrame);
		// update data in frequencyData
		analyser.getByteFrequencyData(frequencyData);
		// render frame based on values in frequencyData
		// console.log(frequencyData)
		//ctx.clearRect(0, 0, c.width, c.height);
		//ctx.beginPath();
		for (let i = 0; i < frequencyData.length / 4; i++)
		{
			pixele.data[i * 4] = frequencyData[i * 4];
			pixele.data[i * 4 + 1] = frequencyData[i * 4];
			pixele.data[i * 4 + 2] = frequencyData[i * 4];
			pixele.data[i * 4 + 3] = 255;
		}
		ctx.putImageData(pixele, 1, 0);

		let obr = ctx.getImageData(0, 0, c.width, c.height);
		ctx.putImageData(obr, 1, 0);
		//pozycja++;

		//pozycja %= 1024;
		//ctx.stroke();
	}
	audio.play();
	//audio2.play();
	renderFrame();
  };
