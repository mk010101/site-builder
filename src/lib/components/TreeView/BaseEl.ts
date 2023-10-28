export class BaseEl extends HTMLElement {
	template = '';
	constructor() {
		super();
	}

	_init() {
		const shadow = this.attachShadow({ mode: 'open' });

		const cssStr = /*css*/ `
		<style>
			@import "/styles/reset.css";
			@import "/styles/components/button.css";
			@import "/styles/font/a-icons.css";

			:host, * {
				font-family: var(--font-family);
			}
		</style>`;

		this.template += cssStr;
		shadow.innerHTML = this.template;
	}
}
