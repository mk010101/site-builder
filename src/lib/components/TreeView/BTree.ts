import { throttle } from '$lib/util';

export type TreeData = any[];

export class BTree extends HTMLElement {
	template = /*html*/ `
        <style>
	@import "/styles/reset.css";
    .drop-target {
		zbackground: #e6d9a6;
	}

	.dragging {
		opacity: .2;
	}

	details,
	.content {
		padding-left: 0.75rem;
		position: relative;
		line-height: 1.2;
		user-select: none;
	}

	.content > div {
		padding: .25rem 0;
		background: #c1c1ea;
		margin-bottom: 1px;
	}

	details::before {
		content: '▸';
		position: absolute;
		margin-left: -0.75rem;
	}

	details[open]::before {
		content: '▾';
	}

	summary::marker,
	summary::-webkit-details-marker {
		display: none;
		content: '';
	}
        </style>

        <aside class="drop-target">TEST</aside>
    `;

	_el: HTMLElement;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = this.template;
		this._el = shadow.querySelector('aside') as HTMLElement;
		this._drop = this._drop.bind(this);
	}

	setData(data: TreeData) {
		const str = this._parse(data);
		this._el.innerHTML = str;

		this._el.classList.add('drop-target');

		const draggables: HTMLElement[] = Array.from(this._el.querySelectorAll('*[draggable="true"]'));
		draggables.forEach((el) => {
			el.addEventListener('dragstart', this._dStart);
			el.addEventListener('dragend', this._dEnd);
			el.addEventListener('drop', this._drop);
		});

		const dropTargets: HTMLElement[] = Array.from(
			this.shadowRoot!.querySelectorAll('.drop-target')
		);
		dropTargets.forEach((el) => {
			el.addEventListener('dragover', this._dOver);
		});
	}

	_dStart(e: DragEvent) {
		const el: HTMLElement = e.target as HTMLElement;
		el.classList.add('dragged');
	}

	_dOver(e: DragEvent) {
		e.preventDefault();
		const el: HTMLDivElement = e.target as HTMLDivElement;
	}

	_dEnd(e: DragEvent) {
		const el: HTMLDivElement = e.target as HTMLDivElement;
		el.classList.remove('dragged');
	}

	/// -------------------------------
	_drop(e: DragEvent) {
		e.preventDefault();
		const el: HTMLElement = e.target as HTMLElement;
		const dragged: HTMLElement = <HTMLElement>this._el.querySelector('.dragged');
		console.log(el, dragged);
	}

	_id = 0;

	_parse(data: TreeData, str = '') {
		data.forEach((p) => {
			if (p.type === 'dir') {
				str += `<details open draggable="true" class="drop-target"><summary>${p.label}</summary>`;
				str += `<div class="content">${this._parse(p.children, '')}</div>`;
				str += '</details>';
			} else {
				str += `<div draggable="true">
				${p.label}</div>
				`;
			}
		});
		return str;
	}
}

if (!customElements.get('b-tree')) {
	customElements.define('b-tree', BTree);
}
