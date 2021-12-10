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


        this.linksContainer = [];

        for (let i = 1; i <= this.pages; i++) {
            this.linksContainer.push(i);
            if (i === 8) break;
        }

        this.render();




        this.ulBlock.addEventListener('click', evt => {
            evt.preventDefault();
            if (evt.target.tagName === "A") {
                this.currentPage = parseInt(evt.target.innerHTML);
                this.biasLinks();
            }
        })
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

        for (let j = 1; i <= this.pages; startPosition++, j++) {



            // if ((i + bias) >= this.pages) break;

            this.linksContainer.push(startPosition + bias);

            if (j === this.maxLinks) break;
        }
        // console.log(this.linksContainer);

        return this.render();
    }




    render() {
        this.ulBlock.innerHTML = "";
        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="1">
        <a href="javascript:" class="pagination-widget__page-link pagination-widget__page-link_first pagination-widget__page-link_disabled">&laquo;</a>
    </li>`;

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.currentPage - 1}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.currentPage - 1}" class="pagination-widget__page-link pagination-widget__page-link_prev pagination-widget__page-link_disabled">&lt;</a>
    </li>`;

        this.linksContainer.forEach(el => {
            this.ulBlock.innerHTML += `<li class="pagination-widget__page ${el === this.currentPage ? "pagination-widget__page_active" : null}" data-role="pagination-page" data-page-number="${el}"><a href="/catalog/17a8a01d16404e77/smartfony/?page=${el}" class="pagination-widget__page-link">${el}</a>
            </li>`;
        });

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.currentPage + 1}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.currentPage + 1}" class="pagination-widget__page-link pagination-widget__page-link_next ">&gt;</a>
    </li>`;

        this.ulBlock.innerHTML += `<li class="pagination-widget__page" data-role="pagination-page" data-page-number="${this.pages}">
        <a href="/catalog/17a8a01d16404e77/smartfony/?page=${this.pages}" class="pagination-widget__page-link pagination-widget__page-link_last ">&raquo;</a>
    </li>`;

    }





}


const pagination = new Pagination;