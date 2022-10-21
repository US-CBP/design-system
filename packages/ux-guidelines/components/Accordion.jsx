import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Accordion = () => {
  return (
    <div className="cbp-accordion">
      <div className="cbp-accordion__item">
        <button className="cbp-accordion__title">
          <div className="title-left">
            {/* <i className="fas fa-angle-down"></i> */}
            <FontAwesomeIcon icon={faAngleDown} />
            <span className="cbp-text-heading-2xs">Emails</span>
          </div>

          <div className="title-right">
            <div className="cbp-badge">
              <span className="cbp-text-badge">2</span>
            </div>
          </div>
        </button>
        <div className="cbp-accordion__content">
          <h6 className="cbp-text-heading-3xs text-italic">
            Most Recent to Oldest
          </h6>
          <hr />
          <ul className="cbp-list">
            <li>
              <b>1-555-555-5555</b>
              <div>
                <ul className="cbp-list__info">
                  <li>
                    <b>Type:</b> Mobile
                  </li>
                  <li>
                    <b>Carrier:</b> Verizon
                  </li>
                  <li>
                    <b>Locality:</b> Wallawall, Washington
                  </li>
                  <li>
                    <b>Country Code:</b> 1 (United States)
                  </li>
                  <li>
                    <b>Added:</b> 01/01/2021
                  </li>
                </ul>
                <button className="cbp-btn cbp-btn__secondary--outline">
                  <i className="fas fa-phone"></i>
                  call
                </button>
              </div>
            </li>

            <li>
              <b>1-555-555-5555</b>
              <div>
                <ul className="cbp-list__info">
                  <li>
                    <b>Type:</b> Mobile
                  </li>
                  <li>
                    <b>Carrier:</b> Verizon
                  </li>
                  <li>
                    <b>Locality:</b> Wallawall, Washington
                  </li>
                  <li>
                    <b>Country Code:</b> 1 (United States)
                  </li>
                  <li>
                    <b>Added:</b> 01/01/2021
                  </li>
                </ul>

                <button className="cbp-btn cbp-btn__secondary--outline">
                  <i className="fas fa-phone"></i>
                  call
                </button>
              </div>
            </li>

            <li>
              <b>1-555-555-5555</b>
              <div>
                <ul className="cbp-list__info">
                  <li>
                    <b>Type:</b> Mobile
                  </li>
                  <li>
                    <b>Carrier:</b> Verizon
                  </li>
                  <li>
                    <b>Locality:</b> Wallawall, Washington
                  </li>
                  <li>
                    <b>Country Code:</b> 1 (United States)
                  </li>
                  <li>
                    <b>Added:</b> 01/01/2021
                  </li>
                </ul>

                <button className="cbp-btn cbp-btn__secondary--outline">
                  <i className="fas fa-phone"></i>
                  call
                </button>
              </div>
            </li>
          </ul>
          <div className="cbp-accordion__footer">
            <div className="cbp-page-list">
              <select name="pages">
                <option value="1">1/Page</option>
                <option value="2">2/Page</option>
                <option value="3">3/Page</option>
                <option value="4">4/Page</option>
                <option value="5">5/Page</option>
                <option value="6">6/Page</option>
                <option value="7">7/Page</option>
                <option value="8">8/Page</option>
                <option value="9">9/Page</option>
                <option defaultValue="" value="10">
                  10/Page
                </option>
              </select>

              <nav className="cbp-pagination">
                <div className="cbp-page-list">
                  <select name="">
                    <option value="1">1 of 5</option>
                    <option value="2">2 of 5</option>
                    <option value="3">3 of 5</option>
                    <option value="4">4 of 5</option>
                    <option value="5">5 of 5</option>
                  </select>
                </div>
                <ul className="cbp-pagination-number">
                  <li className="cbp-pagination-down">
                    <button type="button" disabled="">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </li>
                  <li>
                    <button className="active">1</button>
                  </li>
                  <li className="additonal-btn">
                    <button>2</button>
                  </li>
                  <li className="additonal-btn">
                    <button>3</button>
                  </li>
                  <li className="additonal-btn">
                    <button>4</button>
                  </li>
                  <li className="additonal-btn">
                    <button>5</button>
                  </li>
                  <li className="cbp-pagination-up">
                    <button>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;