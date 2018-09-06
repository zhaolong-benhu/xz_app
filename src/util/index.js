export {platform} from './platform';
export {global_width,global_height} from './screen'

/**
 *
 * @param url 地址
 * @returns obj 参数对象
 */
export function parseQueryString(url) {
	var obj = {};
	var keyvalue = [];
	var key = "",
		value = "";
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	for (var i in paraString) {
		keyvalue = paraString[i].split("=");
		key = keyvalue[0];
		value = keyvalue[1];
		obj[key] = value;
	}
	return obj;
}




