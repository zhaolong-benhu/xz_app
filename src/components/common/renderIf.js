/**
 * Created by qzy on 03/05/2017.
 * File description:
 */
export default function renderIf(condition, content) {
	if (condition) {
		return content;
	} else {
		return null;
	}
}