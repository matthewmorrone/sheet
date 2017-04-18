(function($) {
	$.fn.twoSidedMultiSelect = function(s2) {
		var $s1 = $(this),
			$s2 = $(s2) || $s1.clone()
			// $sw = $('<div></div>', {class: 'twoSidedMultiSelect'})

		// $s1.before($sw)
		// $sw.append($s1)
		// $sw.append($s2)

		$s1.attr("side", "left")
		$s2.attr("side", "right")

		$s1.find('option').click(function() {
			if ($(this).parent().attr("side") === "left") {
				$('select[side="right"]').append($(this))
			}
			else {
				$('select[side="left"]').append($(this))
			}
			$s2.find('option').each(function() {
				$(this).attr('selected', 'selected')
			})
		})
		$s2.find('option').click(function() {
			if ($(this).parent().attr("side") === "left") {
				$('select[side="right"]').append($(this))
			}
			else {
				$('select[side="left"]').append($(this))
			}
			$s2.find('option').each(function() {
				$(this).attr('selected', 'selected')
			})
		})

		if ($s1.find('option[selected="selected"]').length > 0) {
			$s2.html($s1.find('option[selected="selected"]'))
		}
		else {
			$s2.append($s1.find('option'))
		}
		$s2.find('option').each(function() {
			$(this).attr('selected', 'selected')
		})
	}
})
(jQuery)

Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: false,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name]
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			value: value
		})
		return this
	}
})
Array.prototype.define("first", function() {
	return this[0]
})
Array.prototype.define("last", function() {
	return this[this.length - 1]
})
Object.prototype.define("each", function(f) {
	for (var i in this) {
		f && this.hasProperty(i) && f.call(this[i], i, this)
	}
	return this
})
Array.prototype.define('each', Array.prototype.forEach)

Array.prototype.define('clean', function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] && this[i].length && Array.isArray(this[i])) {
			this[i].clean(deleteValue)
		}
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
})
Array.define('make', function makeArray(w, h, d) {
	var arr = [];
	for(i = 0; i < w; i++) {
		arr[i] = [];
		for(j = 0; j < h; j++) {
			arr[i][j] = (d && d[i] && d[i][j] ? d[i][j] : '');
		}
	}
	return arr;
})
