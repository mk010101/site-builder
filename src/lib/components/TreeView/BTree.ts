import { throttle } from '$lib/util';

export type TreeData = any[];

export class BTree extends HTMLElement {
	template = /*html*/ `
        <style>
	@import "/styles/reset.css";

	:host {
		--margin-left: .5rem;
	}

	.root {
		padding-top: 1rem !important;
	}

	.draggable {
		display: block;
	}

    .drop-target {
		padding: .25rem 0;
		background: #e6d9a6;
	}

	.dragged {
		opacity: .2;
	}

	details {
		position: relative;
		line-height: 1.2;
		user-select: none;
	}

	details > .leaf, details > details {
		margin-left: var(--margin-left);
	}

	.leaf {
		padding: .25rem 0;
		background: #c1c1ea;
		margin-bottom: 1px;
	}

	.dragged-over {
		color: red;
	}

	summary {
		display: flex;
		justify-content: space-between;
	}

	zdetails::before {
		content: '▸';
		position: absolute;
		margin-left: -0.75rem;
	}

	zdetails[open]::before {
		content: '▾';
	}

	summary::marker,
	summary::-webkit-details-marker {
		display: none;
		content: '';
	}
        </style>

        <aside></aside>
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

		//this._el.classList.add('drop-target');
		this._el.classList.add('root');

		const draggables: HTMLElement[] = Array.from(this._el.querySelectorAll('.draggable'));
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
		//el.classList.add('dragged-over');
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
		let parent: HTMLElement = <HTMLElement>el.parentElement;

		if (parent.nodeName === 'SUMMARY') parent = <HTMLElement>parent.parentElement;

		if (el === dragged) return;
		//console.log(parent.nodeName);

		if (parent.classList.contains('drop-target')) {
			parent.appendChild(dragged);
		}
	}

	_id = 0;

	_parse(data: TreeData, str = '') {
		data.forEach((p) => {
			if (p.type === 'dir') {
				str += `<details open draggable="true" class="drop-target draggable">
					<summary>
						<span>${p.label}</span>
						<label><input type='radio' name='tree-dir'>Select</label>
				</summary>`;
				str += `${this._parse(p.children, '')}`;
				str += '</details>';
			} else {
				//str += `<div draggable="true" class="leaf">${p.label}</div>`;
				str += `<label draggable="true" class="leaf draggable">
						<input type='radio' name='tree-page'>
						${p.label}
					</label>`;
			}
		});
		return str;
	}
}

if (!customElements.get('b-tree')) {
	customElements.define('b-tree', BTree);
}
