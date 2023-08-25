export default {
  title: 'Patterns/Pagination'
};

const Template = () => {
  return `
    <div class="cbp-pagination">
      <div class="cbp-pagination__items">
        <select aria-label="Items per page">
          <option value="">10/Page</option>
          <option value="25">25 Per Page</option>
          <option value="50">50 Per Page</option>
          <option value="100">100 Per Page</option>
          <option value="100">9000 Per Page</option>
        </select>
        <span class="cbp-pagination__item-count">
          1-10 of 103 Items
        </span>
      </div>
      <div class="cbp-pagination__pages">
        <button class="cbp-pagination__prev" type="button" aria-label="Previous Page">
          <i class="fas fa-chevron-left"></i>
        </button>
        <select aria-label="Select Page">
          <option value="1">Page 1 of 1000</option>
          <option value="2">Page 2 of 1000</option>
          <option value="3">Page 3 of 1000</option>
          <option value="4">Page 4 of 1000</option>
          <option value="5">Page 5 of 1000</option>
        </select>
        <button class="cbp-pagination__next" type="button" aria-label="Next Page">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `
}

export const Pagination = Template.bind({});
Pagination.args = {};