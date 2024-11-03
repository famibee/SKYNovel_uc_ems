const Humane = await import('humane-js');
import "!style-loader!css-loader!humane-js/themes/bigbox.css";

export function init(pia) {
	Humane.baseCls = 'humane-bigbox';
	pia.addTag('notice', hArg=> {
		Humane.log(hArg.text);
		return false;
	});
}
