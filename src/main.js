require("file?name=index.html!./index.html");
require("file?name=pixi.js!../lib/pixi.js");
require("file?name=pixi.js.map!../lib/pixi.js.map");

require("file?name=tex07.jpg!./img/tex07.jpg");
require("file?name=tex03.jpg!./img/tex03.jpg");
require("file?name=digits.png!./img/digits.png");
require("file?name=bkg-grass.jpg!./img/bkg-grass.jpg");

import {TheGame} from './TheGame.js';

function CustomFilter(fragmentSource) {
    PIXI.AbstractFilter.call(this,
        null,
        fragmentSource,
        {
            customUniform : {type : '1f', value : 0}
        }
    );
}

CustomFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
CustomFilter.prototype.constructor = CustomFilter;

function TunnelFilter() {
	var tex1 = PIXI.Texture.fromImage("tex03.jpg");
	var tex2 = PIXI.Texture.fromImage("tex07.jpg");

    PIXI.AbstractFilter.call(this,
        require("./tunnel.vert"),
        require("./tunnel.frag"),
        {
            iResolution: { type: 'v2', value: { x: 100, y: 100 } },
            iChannel0: { type: 'sampler2D', value: tex1 },
            iChannel1: { type: 'sampler2D', value: tex2 },
            iGlobalTime: { type : '1f', value : 0.01}
        }
    );
}

TunnelFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
TunnelFilter.prototype.constructor = TunnelFilter;

var renderer;

function init() {
	renderer = PIXI.autoDetectRenderer();
	renderer.backgroundColor = 0x3498db;
	document.body.appendChild(renderer.view);

	var resize = window.onresize = function() {
		renderer.resize(document.body.clientWidth, document.body.clientHeight);
	};
	resize();
};

/*
	var bg = PIXI.Sprite.fromImage("bkg-grass.jpg");
    bg.filters = [filter];
	bg.scale.set(1,1);

	stage.addChild(bg);

	var digitTexture = PIXI.Texture.fromImage("digits.png");

	var digit = new PIXI.Sprite();
	digit.scale.set(1,1);
	digit.height = 20;
	digit.height = 45;
	digit.filters = [digit];
	

	stage.addChild(digit);
*/

(() => {
	init();

	var stage = new PIXI.Container();

	var digitTexture = PIXI.Texture.fromImage("digits.png");

	var tunnelFilter = new TunnelFilter();

	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xe74c3c); // Red 
	graphics.drawRect(0, 0, 200, 200); // drawCircle(x, y, radius)
	graphics.endFill();

	//graphics.filters = [tunnelFilter];
	graphics.shader

	stage.addChild(graphics);

	function animate() {
    	tunnelFilter.uniforms.iGlobalTime.value += 0.1;
		
	    renderer.render(stage);

	    requestAnimationFrame(animate);
	}

	animate();
})();