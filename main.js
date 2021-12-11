class Pagination {

    constructor() {
        // init blocks
        this.paginationBlock = document.getElementById('products-list-pagination');
        this.showMoreButton = this.paginationBlock.querySelector('.pagination-widget__show-more-btn');
        this.ulBlock = this.paginationBlock.querySelector('.pagination-widget__pages');
        this.liContainer = this.paginationBlock.querySelectorAll('.pagination-widget__page');

        // init props
        this.currentPage = 1;
        this.pages = 15;
        this.items = 15;
        this.maxLinks = 8;

        // Собираем массив кнопок
        this.linksContainer = [];

        for (let i = 1; i <= this.pages; i++) {
            this.linksContainer.push(i);
            if (i === this.maxLinks) break;
        }

        // Обработчик клика по кнопкам пагинации
        this.ulBlock.addEventListener('click', evt => {
                evt.preventDefault();
                if (evt.target.tagName === "A") {
                    const targetLi = evt.target.closest('li');
                    const targetA = evt.target;
                    if (!targetA.classList.contains('pagination-widget__page-link_disabled') && !targetLi.classList.contains('pagination-widget__page_active')) {
                        this.currentPage = parseInt(targetLi.dataset.pageNumber);
                        this.biasLinks();
                    }
                }
            })
            // Обработчик клика по кнопке показать еще
        this.showMoreButton.addEventListener('click', evt => {
            evt.preventDefault();
            if (this.pages !== this.currentPage) {
                console.log(123);
                this.currentPage++;
                this.biasLinks();
            }
        })

        this.render();
    }



    biasLinks() {
        let bias = 0;

        // если текущая страница больше или равна позиции массива - 3(ну тип 6 позиция пагинации) смещаем пагинацию вперед
        if (this.currentPage >= this.linksContainer[this.linksContainer.length - 3]) {
            // 3 - (последний элемент массива - текущая страница)
            bias = 3 - (this.linksContainer[this.linksContainer.length - 1] - this.currentPage);
            // если (всего страниц - текущая страница < 3)
            if ((this.pages - this.currentPage) < 3) {
                // смещение = смещение - (3 - (всего страниц - текущая страница))
                bias = bias - (3 - (this.pages - this.currentPage));
            }
            // если текущая страница меньше 2 элемента массива(ну тип 3 позиция пагинации) смещаем пагинацию назад
        } else if (this.currentPage <= this.linksContainer[this.linksContainer.length - this.maxLinks + 2]) {
            bias = -3 - (this.linksContainer[0] - this.currentPage);
            if ((this.currentPage) <= 3) {
                // Незнаю, что тут происходит, методом тыка получил рабочий вариант
                bias = bias + 3 - (this.currentPage) + 1;
            }
        }

        let startPosition = this.linksContainer[this.linksContainer.length - 1] - this.maxLinks + 1;

        this.linksContainer = [];

        for (let j = 1; startPosition <= this.pages; startPosition++, j++) {
            this.linksContainer.push(startPosition + bias);
            if (j === this.maxLinks) break;
        }

        return this.render();
    }




    render() {
        this.ulBlock.innerHTML = "";
        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="1">
        <a class="pagination-widget__page-link pagination-widget__page-link_first ${this.currentPage === 1 ? "pagination-widget__page-link_disabled" : ""}">&laquo;</a>
    </li>`;

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.currentPage === 1 ? 1 : this.currentPage - 1}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.currentPage === 1 ? 1 : this.currentPage - 1}" class="pagination-widget__page-link pagination-widget__page-link_prev ${this.currentPage === 1 ? "pagination-widget__page-link_disabled" : ""}">&lt;</a>
    </li>`;

        this.linksContainer.forEach(el => {
            this.ulBlock.innerHTML += `<li class="pagination-widget__page ${el === this.currentPage ? "pagination-widget__page_active" : ""}" data-role="pagination-page" data-page-number="${el}"><a href="/catalog/17a8a01d16404e77/smartfony/?page=${el}" class="pagination-widget__page-link">${el}</a>
            </li>`;
        });

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.currentPage === this.pages ? this.currentPage : this.currentPage + 1}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.currentPage === this.pages ? this.currentPage : this.currentPage + 1}" class="pagination-widget__page-link pagination-widget__page-link_next ${this.currentPage === this.pages ? "pagination-widget__page-link_disabled" : ""}">&gt;</a>
    </li>`;

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.pages}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.pages}" class="pagination-widget__page-link pagination-widget__page-link_last ${this.currentPage === this.pages ? "pagination-widget__page-link_disabled" : ""}">&raquo;</a>
    </li>`;

    }





}


const pagination = new Pagination;