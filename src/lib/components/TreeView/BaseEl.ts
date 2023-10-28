export class BaseEl extends HTMLElement {
	template = /*html*/ `
<style>
	@import "/styles/reset.css";
	@import "/styles/components/button.css";
	@import "/styles/font/a-icons.css";
</style>`;

	constructor() {
		super();
	}

	_init() {
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = this.template;
	}
}
