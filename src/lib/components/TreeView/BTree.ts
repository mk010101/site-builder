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

	nav {
		display: flex;
		gap: 1rem;
	}

	select {
		max-width: 8rem;
	}

    </style>

	<nav>
		<div>
			<button variant="simple" data-id="move-up">Up</button>
			<button variant="simple" data-id="move-down">Down</button>
		</div>
		<div>
			<button variant="simple" data-id="move-to">Move to:</button> 
			<select></select>
		</div>
	</nav>
    <aside></aside>
    `;

	_treeHolder: HTMLElement;
	_selectedEl: HTMLElement | null = null;
	_nav: HTMLElement;
	_elSelect: HTMLSelectElement;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = this.template;

		this._treeHolder = shadow.querySelector('aside') as HTMLElement;
		this._nav = shadow.querySelector('nav') as HTMLElement;
		this._elSelect = this._nav.querySelector('select') as HTMLSelectElement;

		this._drop = this._drop.bind(this);
		this._itemSelect = this._itemSelect.bind(this);
		this._navHandler = this._navHandler.bind(this);

		this._treeHolder.addEventListener('change', this._itemSelect);
		this._nav.addEventListener('click', this._navHandler);
	}

	setData(data: TreeData) {
		this._clear();

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

		this._buildSelect();
	}

	_clear() {
		const draggables: HTMLElement[] = Array.from(this._treeHolder.querySelectorAll('.draggable'));
		draggables.forEach((el) => {
			el.removeEventListener('dragstart', this._dStart);
			el.removeEventListener('dragend', this._dEnd);
			el.removeEventListener('drop', this._drop);
		});

		const dropTargets: HTMLElement[] = Array.from(
			this.shadowRoot!.querySelectorAll('.drop-target')
		);
		dropTargets.forEach((el) => {
			el.removeEventListener('dragover', this._dOver);
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

			case 'move-to':
				this._moveTo();
				break;
		}
	}

	_moveUp() {
		if (!this._selectedEl || this._selectedEl.hasAttribute('index')) return;

		const parent: HTMLElement = <HTMLElement>this._selectedEl.parentNode;
		const prev = <HTMLElement>this._selectedEl.previousSibling;
		if (prev.hasAttribute('index')) return;
		if (prev?.nodeName !== 'LABEL' && prev?.nodeName !== 'DETAILS') return;
		parent.insertBefore(this._selectedEl, prev);
	}

	_moveDwon() {
		if (!this._selectedEl || this._selectedEl.hasAttribute('index')) return;

		const parent: HTMLElement = <HTMLElement>this._selectedEl.parentNode;
		const next = this._selectedEl.nextSibling?.nextSibling;
		parent.appendChild(this._selectedEl);
		if (next?.nodeName !== 'LABEL' && next?.nodeName !== 'DETAILS') return;
		parent.insertBefore(this._selectedEl, next);
	}

	_moveTo() {
		if (this._selectedEl?.hasAttribute('index')) return;

		const arr = this._elSelect.value.split('/');
		const id = arr[arr.length - 1];
		const parent = this._treeHolder.querySelector(`#${id}`);

		if (
			this._selectedEl &&
			parent !== this._selectedEl &&
			parent !== this._selectedEl.parentElement
		) {
			try {
				parent?.appendChild(this._selectedEl);
				this._buildSelect();
			} catch (err) {}
		}
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

		try {
			if (parent.classList.contains('drop-target')) {
				parent.appendChild(dragged);
				this._buildSelect();
			}
		} catch (err) {}
	}

	_buildSelect() {
		const containers: HTMLElement[] = Array.from(this.shadowRoot!.querySelectorAll('details'));

		function getPath(el: HTMLElement) {
			let prev: any = el;
			const arr: any[] = [];
			while (prev) {
				if (prev.id) arr.push(prev.id);
				prev = prev.parentNode;
			}
			return arr.reverse().join('/');
		}

		let str = '';

		containers.forEach((el) => {
			const path = getPath(el);
			el.setAttribute('path', path);
			str += `<option>${path}</option>`;
		});

		this._elSelect.innerHTML = str;
	}

	_parse(data: TreeData, str = '') {
		data.forEach((p) => {
			if (p.type === 'dir') {
				const disabled = p.label === 'root' ? 'disabled' : '';
				str += `<details id="${p.id}" open draggable="true" class="drop-target draggable">
					<summary>
						<span class="closed">+</span>
						<span class="open">-</span>
						<label class="dir"><input ${disabled} class="radio" type='radio' name='tree'><span>${p.label}</span></label>
				</summary>`;
				str += `${this._parse(p.children, '')}`;
				str += '</details>';
			} else {
				const isIndex = p.isIndex ? "index='true'" : '';
				const draggable = !isIndex ? 'draggable="true"' : '';
				const index = isIndex ? ' (INDEX)' : '';
				str += `<label id="${p.id}" ${isIndex} ${draggable} class="leaf draggable">
						<input type='radio' class="radio page" name='tree'>
						<span>${p.label}${index}</span>
					</label>`;
			}
		});
		return str;
	}
}

if (!customElements.get('b-tree')) {
	customElements.define('b-tree', BTree);
}
