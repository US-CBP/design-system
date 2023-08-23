export default {
  title: 'Patterns/Pagination'
};

const Template = () => {
  return `
    <div class="cbp-pagination">
      <button class="cbp-pagination__prev" type="button" aria-label="Previous Page">
        <i class="fas fa-chevron-left"></i>
      </button>
      <select aria-label="Select page">
        <option value="1">Pg. 1 of 1000</option>
        <option value="2">Pg. 2 of 1000</option>
        <option value="3">Pg. 3 of 1000</option>
        <option value="4">Pg. 4 of 1000</option>
        <option value="5">Pg. 5 of 1000</option>
      </select>
      <button class="cbp-pagination__next" type="button" aria-label="Next Page">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `
}

export const Pagination = Template.bind({});
Pagination.args = {};