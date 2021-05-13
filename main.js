var prediction1 = "";
var prediction2 = "";
Webcam.set({
    width: 350,
    height: 300, image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function (data_uri) { document.getElementById("result").innerHTML ='<img id="snapshot_display" src="'+data_uri+'">'
});

}
console.log("Ml5 version="+ml5.version)
var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tDhAol8pJ/model.json',modelLoaded)
function modelLoaded(){
    console.log("model is loaded")
}
function speak(){
    var synth=window.speechSynthesis;
    speekdata1="The first prediction is " +prediction1;
    speekdata2="The second prediction is " +prediction2;
    var UtterThis=new SpeechSynthesisUtterance(speekdata1+speekdata2);
    synth.speak(UtterThis);
}
function check(){
    var imageCaptured=document.getElementById("snapshot_display");
    classifier.classify(imageCaptured,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("updateEmoji").innerHTML="&#128522";
        }
        else if(results[1].label=="Happy"){
            document.getElementById("updateEmoji2").innerHTML="&#128522";
        }
        if(results[0].label=="Sad"){
            document.getElementById("updateEmoji").innerHTML="&#128532";
        }
        else if(results[1].label=="Sad"){
            document.getElementById("updateEmoji2").innerHTML="&#128532";
        }
        if(results[0].label=="Angry"){
            document.getElementById("updateEmoji").innerHTML="&#128548";
        }
        else if(results[1].label=="Angry"){
            document.getElementById("updateEmoji2").innerHTML="&#128548";
        }
    }
}