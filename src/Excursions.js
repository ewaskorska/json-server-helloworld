class Excursions {
    
    constructor(api) {
        this.apiService = api;
    }

    load() {
        this.apiService.loadData()
            .then(data => {
                this.insert( data );
            })
            .catch(err => console.error(err));   
    }

    insert(data) {
        const ulEl = this._findUl();
        this._clearElement(ulEl)
        data.forEach( item => {
            const liEl = this._createLi(item);
            ulEl.appendChild( liEl );
        });
    }

    add() {
        const form = document.querySelector('form');
        form.addEventListener('submit', e => {
            e.preventDefault();
    
            const {name, price} = e.target.elements;
            const data = {
                name: name.value, price: price.value
            };
    
            this.apiService.addData(data)
                .catch(err => console.error(err))
                .finally( () => this.load )
        });
    }

    remove() {
        const ulEl = this._findUl();
        ulEl.addEventListener('click', e => {
            const targetEl = e.target;
            if(this._isElementType(targetEl, 'A')) {
                const id = this._getIdFromRoot(targetEl);
                this.apiService.removeData(id)
                    .catch(err => console.error(err))
                    .finally( () => this.load );
            }
        })
    }

    update() {
        const ulEl = this._findUl();
        ulEl.addEventListener('click', e => {
            const targetEl = e.target;
            if(this._isElementType(targetEl, 'BUTTON')) {
                const parentEl = targetEl.parentElement;
                const spanList = parentEl.querySelectorAll('span');
                const isEditable = [...spanList].every(
                    span => span.isContentEditable
                );
                if(isEditable) {
                    const id = parentEl.dataset.id;
                    const data = {
                        name: spanList[0].innerText,
                        price: spanList[1].innerText,
                    }
                    this.apiService.updateData(id, data)
                        .catch(err => console.error(err))
                        .finally( () => {
                            this._toggleButtonText(targetEl, spanList);
                        });
                } else {
                    this._toggleButtonText(targetEl, spanList);
                }
            }
        });
    }

    _getIdFromRoot(element) {
        const parentEl = element.parentElement;
        return parentEl.dataset.id;
    }

    _isElementType(targetEl, type) {
        return targetEl.tagName === type;
    }

    _findUl() {
        return document.querySelector('.excursions');
    }

    _toggleButtonText(target, spanList) {
        let isEditable;
        if(target.innerText === 'edytuj') {
            target.innerText = 'zapisz';
            isEditable = true;
        } else {
            target.innerText = 'edytuj';
            isEditable = false;
        }
        spanList.forEach(
            span => span.contentEditable = isEditable
        );
    }
    
    _clearElement(element) {
        element.innerHTML = '';
    }

    _createLi(item) {
        const liEl = document.createElement('li');
        liEl.dataset.id = item.id;
        liEl.classList.add('excursions__item');
        liEl.innerHTML = `
            [<a href="#">usuń</a>]
            <span>${item.name}</span>:
            <span>${item.price}</span>PLN
            <button>edytuj</button>
        `;
        return liEl;
    }
}

export default Excursions;