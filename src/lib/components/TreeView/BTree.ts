import { throttle } from '$lib/util';

export type TreeData = any[];

export class BTree extends HTMLElement {
	template = /*html*/ `
        <style>
	@import "/styles/reset.css";

	:host {
		--margin-left: 1.5rem;
	}

	.draggable {
		display: block;
	}

    .drop-target {
		padding: .25rem 0;
	}

	.dragged {
		opacity: .2;
	}

	details {
		position: relative;
		line-height: 1.2;
		user-select: none;
		border-left: 1px solid #ccc;
	}

	details > .leaf, details > details {
		margin-left: var(--margin-left);
	}

	.leaf {
		padding: .25rem 0;
	}

	summary {
		display: flex;
		gap: 4px;
		margin-bottom: .25rem;
	}

	.open {display: none}

	details[open] > summary .closed {
		display: none;
	}
	details[open] > summary .open {
		display: block;
	}

	.radio {
		display: none;
	}

	.radio:checked ~ span {
		color: red;
	}
	

	summary::marker,
	summary::-webkit-details-marker {
		display: none;
		content: '';
	}
    </style>

	<nav>
		<button variant="simple" data-id="move-up">Up</button>
		<button variant="simple" data-id="move-down">Down</button>
	</nav>
    <aside></aside>
    `;

	_treeHolder: HTMLElement;
	_selectedEl: HTMLElement | null = null;
	_nav: HTMLElement;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = this.template;

		this._treeHolder = shadow.querySelector('aside') as HTMLElement;
		this._nav = shadow.querySelector('nav') as HTMLElement;

		this._drop = this._drop.bind(this);
		this._itemSelect = this._itemSelect.bind(this);
		this._navHandler = this._navHandler.bind(this);

		this._treeHolder.addEventListener('change', this._itemSelect);
		this._nav.addEventListener('click', this._navHandler);
	}

	setData(data: TreeData) {
		const str = this._parse(data);
		this._treeHolder.innerHTML = str;

		this._treeHolder.classList.add('root');

		const draggables: HTMLElement[] = Array.from(this._treeHolder.querySelectorAll('.draggable'));
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

	_itemSelect(e: Event) {
		const el: HTMLElement = e.target as HTMLElement;
		let parent: HTMLElement = <HTMLElement>el.parentNode;
		if (parent.classList.contains('dir')) parent = <HTMLElement>parent.parentNode?.parentNode;

		this._selectedEl = parent;
	}

	_navHandler(e: Event) {
		const el: HTMLElement = e.target as HTMLElement;
		const id = el.getAttribute('data-id');
		if (!id) return;

		switch (id) {
			case 'move-down':
				this._moveDwon();
				break;

			case 'move-up':
				this._moveUp();
				break;
		}
	}

	_moveUp() {
		if (!this._selectedEl) return;

		const parent: HTMLElement = <HTMLElement>this._selectedEl.parentNode;
		const prev = this._selectedEl.previousSibling;
		if (prev?.nodeName !== 'LABEL' && prev?.nodeName !== 'DETAILS') return;
		parent.insertBefore(this._selectedEl, prev);
	}

	_moveDwon() {
		if (!this._selectedEl) return;

		const parent: HTMLElement = <HTMLElement>this._selectedEl.parentNode;
		const next = this._selectedEl.nextSibling?.nextSibling;
		parent.appendChild(this._selectedEl);
		if (next?.nodeName !== 'LABEL' && next?.nodeName !== 'DETAILS') return;
		parent.insertBefore(this._selectedEl, next);
	}

	_dStart(e: DragEvent) {
		const el: HTMLElement = e.target as HTMLElement;
		el.classList.add('dragged');
	}

	_dOver(e: DragEvent) {
		e.preventDefault();
	}

	_dEnd(e: DragEvent) {
		const el: HTMLDivElement = e.target as HTMLDivElement;
		el.classList.remove('dragged');
	}

	/// -------------------------------
	_drop(e: DragEvent) {
		e.preventDefault();
		const el: HTMLElement = e.target as HTMLElement;
		const dragged: HTMLElement = <HTMLElement>this._treeHolder.querySelector('.dragged');
		let parent: HTMLElement = <HTMLElement>el.parentElement;

		if (parent.nodeName === 'SUMMARY') parent = <HTMLElement>parent.parentElement;
		if (parent.nodeName === 'LABEL') parent = <HTMLElement>parent.parentElement?.parentElement;

		if (el === dragged) return;

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
						<span class="closed">+</span>
						<span class="open">-</span>
						<label class="dir"><input class="radio" type='radio' name='tree'><span>${p.label}</span></label>
				</summary>`;
				str += `${this._parse(p.children, '')}`;
				str += '</details>';
			} else {
				str += `<label draggable="true" class="leaf draggable">
						<input type='radio' class="radio page" name='tree'>
						<span>${p.label}</span>
					</label>`;
			}
		});
		return str;
	}
}

if (!customElements.get('b-tree')) {
	customElements.define('b-tree', BTree);
}
