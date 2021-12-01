var count = 0;
var ss = 0;
var timeout;
function getRandomArbitrary(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function(){
	setInterval(function(){
		var screenHeight = $(document).height();
		var screenWidth = $(document).width();
		var startLeft = getRandomArbitrary(0, screenWidth);
		var timeRun = getRandomArbitrary(4000, 6000);
		var opacityR = Math.random() * (1 - 0.2) + 0.2;
		var sizeR = getRandomArbitrary(10, 40);
		var endLeft = getRandomArbitrary(startLeft - 100, startLeft + 100);
		var snow = document.createElement('span');
		$(snow).addClass('snow-item fa fa-heart').css({
			'position'  : 'absolute',
			'z-index'   : 'auto',
			'color'     : '#ff0000',
			'display'   : 'block',
			'top'       : 0,
			'left'      : startLeft,
			'opacity'   : opacityR,
			'font-size' : sizeR+'px'
		})
		.appendTo('body')
		.animate({
			'top'       : screenHeight-sizeR,
			'left'      : endLeft
		},{
			duration : timeRun,
			easing : 'linear',
			complete:function(){
				$(this).fadeOut('fast',function(){
					$(this).remove();
				});
			}
		});
	},500);
});

window.onmousedown = () =>{
	if(count == 0 ){
		runshow();
		document.getElementById("body").style.backgroundImage = 'none';
		document.getElementById('dl').style.opacity = "1";
		document.getElementById('name').style.opacity = "1";
		var audio = new Audio('1.mp3');
		console.log("time" + audio.duration.toString);
		audio.play(); 
			
	}
	count++;
	start();
}
start = () => {
	timeout = setTimeout(function(){
        ss++;
		start();
    }, 1000);
	if(ss == 227 ){window.close() ;}
}

runshow = () => {
	var dds = document.getElementsByTagName('dd');
	var dl = document.getElementsByTagName('dl')[0];
	dl.style.transform = "rotateX(-10deg) rotateY(0deg)";
	for (var i = 0; i < dds.length; i++) {
		var inverted = document.createElement('div');
		var inverteds = document.createElement('div');
		var img = document.createElement('img');
		img.src = dds[i].getElementsByTagName('img')[0].src;
		inverted.appendChild(img);
		inverted.className = 'inverted';
		inverteds.appendChild(inverted)
		inverteds.className = 'inverteds';
		dds[i].appendChild(inverteds);
	}
	deal(dds, dds.length - 1);
	function deal(dds, n) {
		var speed = 500;
		var translateZTerminus = 400;
		var angle = 360 / dds.length * n; //<> 308
		var translateZ = 0;
		var rotateY = 0;
		if(window.screen.availWidth < 500){
			translateZTerminus = 150;
			speed = 550;
			angle = 360 / dds.length * n;
		}
		var time = setInterval(function () {
			translateZ += translateZTerminus / speed * 10;
			rotateY += angle / speed * 10;
			dds[n].style.transform = 'rotateY(' + rotateY + 'deg) translateZ(' + translateZ + 'px)';

			if (rotateY >= angle && translateZ >= translateZTerminus) {
				clearInterval(time);
				dds[n].style.transform = 'rotateY(' + angle + 'deg) translateZ(' + translateZTerminus + 'px)';
				if (n > 0)
					deal(dds, n - 1);
			}
		}, 10);
		console.log(speed+" "+translateZTerminus+" "+angle+" "+translateZ+" "+rotateY);
		console.log(dds[n].style.width);
	}
}


window.onload = function () {
}