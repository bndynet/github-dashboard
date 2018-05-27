import * as randomcolor from 'randomcolor/randomColor';
import * as color from 'color/index';

export class Color {
    value: string;
    lighten: string;
    darken: string;

    alphaValue: string;
    alphaLighten: string;
    alphaDarken: string;

    constructor() {
        let c = color(randomcolor());
        this.value = c.toString();
        this.lighten = c.lighten(0.5);
        this.darken = c.darken(0.5);

        let ac = c.alpha(.5);
        this.alphaValue = ac.toString();
        this.alphaLighten = ac.lighten(0.5);
        this.alphaDarken = ac.darken(0.5);
    }
}