export function ringProgress(config = {}) {
	// var wWidth = window.screen.width;
	// var scale = wWidth/750;
	var defaults = {
		name: document.querySelector('.ringProgress'), //装载SVG的对象
		path: 'ring', //path的id或class
		loop: true, //是否循环
		progress: 50, //已使用长度
		allNum: 100, //总共长度
		r: 195, //半径
		// r: 195*scale, //半径
		strokeWidth: 16, //线的宽度
		startColor: '#dbb34b', //渐变起始颜色
		endColor: '#dbb34b', //渐变结束颜色
		bgColor:'#fffbee',
		small: false, //是
		bgBool: false, //圈内是否使用背景
		bgSrc: '/static/images/svg_bg.png'
	};
	var default_a = Object.assign(defaults, config);
	var _class = default_a.name;
	var _r = default_a.r;
	var _path = default_a.path;
	var _allNum = default_a.allNum||1;
	var _progress = default_a.progress;
	var _bgColor = default_a.bgColor;
	var _bgBool = default_a.bgBool
	var _bgSrc = default_a.bgSrc
	// _class.innerHTML('aaaaa')
	// console.log(_class)
	if (default_a.small == true) {
		_class.innerHTML = _svgContSmall(_r, _path);
	} else {
		_class.innerHTML = _svgCont(_r, _path);
	}
	function _svgCont(_r, _path) {
		var str = '';
		str += '<svg width="' + 2 * _r + 'px" height="' + 2 * _r + 'px" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		str += '    <defs>';
		str += '        <linearGradient id="grad' + default_a.index + '" x1="0%" y1="0%" x2="0%" y2="100%">';
		str += '            <stop offset="0%" style="stop-color:' + default_a.startColor + ';stop-opacity:1" />';
		str += '            <stop offset="100%" style="stop-color:' + default_a.endColor + ';stop-opacity:1" />';
		str += '        </linearGradient>';
		str += '    </defs>';
		str += '    <ellipse xmlns="http://www.w3.org/2000/svg" cx="' + (_r) + '" cy="' + (_r) + '" rx="' + (_r) + '" ry="' + (_r) + '" fill="'+_bgColor+'"/>';
		if (_progress < _allNum) {
			str += '    <path class="' + _path + '" fill="url(#grad' + default_a.index + ')" d="M 0 0 v ' + _r + ' A -' + _r + ' -' + _r + ' 0 1 0 0.01 -' + _r + ' " transform="translate(' + (_r) + ',' + (_r) + ')" />';
		} else {
			str += '    <circle class="111" cx="' + _r + '" cy="' + _r + '" r="' + _r + '"  fill="url(#grad' + default_a.index + ')" />';
		}
		str += '    <circle cx="' + _r + '" cy="' + _r + '" r="' + (_r - default_a.strokeWidth) + '" fill="#FFF" />';
		if(_bgBool) {
		str += '    <image xlink:href="'+_bgSrc+'" height="'+(_r - default_a.strokeWidth)*2+'" width="'+(_r - default_a.strokeWidth)*2+'"  x="'+default_a.strokeWidth+'" y="'+default_a.strokeWidth+'" />';
		}
		str += '</svg>';
		return str;
	}

	function _svgContSmall(_r, _path) {
		var str = '';
		str += '<svg width="' + 2 * _r + 'px" height="' + 2 * _r + 'px" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		str += '    <defs>';
		str += '        <linearGradient id="grad' + default_a.index + '" x1="0%" y1="0%" x2="0%" y2="100%">';
		str += '            <stop offset="0%" style="stop-color:' + default_a.startColor + ';stop-opacity:1" />';
		str += '            <stop offset="100%" style="stop-color:' + default_a.endColor + ';stop-opacity:1" />';
		str += '        </linearGradient>';
		str += '    </defs>';
		// str += '    <ellipse xmlns="http://www.w3.org/2000/svg" cx="'+(_r)+'" cy="'+(_r)+'" rx="'+(_r)+'" ry="'+(_r)+'" fill="#ffc924"/>';
		if (_progress < _allNum) {
			str += '    <path class="' + _path + '" fill="url(#grad' + default_a.index + ')" d="M 0 0 v ' + _r + ' A -' + _r + ' -' + _r + ' 0 1 0 0.01 -' + _r + ' " transform="translate(' + (_r) + ',' + (_r) + ')" />';
		} else {
			str += '    <circle cx="' + _r + '" cy="' + _r + '" r="' + _r + '"  fill="url(#grad' + default_a.index + ')" />';
		}
		str += '    <circle cx="' + _r + '" cy="' + _r + '" r="' + (_r - default_a.strokeWidth) + '" fill="#ffc924" />';
		str += '</svg>';
		return str;
	}
	var obj_path = _class.querySelector('.'+default_a.path);

	function _draw(path, progress, r, allNum) {
		path.setAttribute('transform', 'translate(' + (r) + ',' + (r) + ')');
		var degrees = progress * (360 / allNum);
		var rad = degrees * (Math.PI / 180);
		var x = (Math.sin(rad) * r).toFixed(2);
		var y = -(Math.cos(rad) * r).toFixed(2);;
		var lenghty = window.Number(degrees > 180);
		var descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 0, lenghty, 1, x, y, 'z'];
		path.setAttribute('d', descriptions.join(' '));
	}
	if (_progress < _allNum) {
		_draw(obj_path, _progress, _r, _allNum);
	}
}
