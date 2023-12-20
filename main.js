song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload()
{
    song=loadSound("music.mp3");
    song2=loadSound("enchanted-chimes-177906.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}
function modelloaded()
{
    console.log('posenet is initialized')
}
function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        num=Number(leftwristy);
        rd=floor(num);
        vol=rd/500;
        document.getElementById("volume").innerHTML="Volume= " + vol;
        song.setVolume(vol);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        rightwristx=results[0].pose.rightWrist.x
        rightwristy=results[0].pose.rightWrist.y
        leftwristx=results[0].pose.leftWrist.x
        leftwristy=results[0].pose.leftWrist.y
        console.log("rightwristx"+rightwristx);
        console.log("rightwristy"+rightwristy);
        console.log("leftwristx"+leftwristx);
        console.log("leftwristy"+leftwristy);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("score right wrist"+scorerightwrist);
        console.log("score left wrist"+scoreleftwrist);
    }
}