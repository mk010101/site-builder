import { defineEl } from '$lib/util';
import { BaseEl } from './TreeView/BaseEl';

export class BModal extends BaseEl {
	template = /*html*/ `
<style>
    :host {
        display: flex;
        position: fixed;
        top: 0;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        display: flex;
    }

    section {
        min-width: 300px;
        min-height: 200px;
        background-color: #ffcc00;
    }

</style>
<section>TEST</section>
`;
	constructor() {
		super();
		this._init();
		console.log(534);
	}

	show() {
		//
	}
}

defineEl('b-modal', BModal);
