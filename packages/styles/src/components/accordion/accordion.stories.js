export default {
    title: 'Patterns/Accordion',
    argTypes: {
        label: { control: 'text' },
        onClick: { action: 'onClick' },
    },
};



const Template = ({ label, ...args }) => {
    return `
        <div class="cbp-accordion">
            <div class="cbp-accordion__item">
                <button class="cbp-accordion__title" aria-expanded="false" aria-controls="accordion-demo-1">
                    <div>
                        <i class="fas fa-angle-down"></i>
                        <span>Adverse Events</span>
                    </div>
                    <div class="cbp-badge">
                        <span class="cbp-text-badge">7</span>
                    </div>
                </button>

                <div class="cbp-accordion__content" aria-labelledby="accordion-demo-1">
                    <h6 class="cbp-text-heading-3xs text-italic">Most Recent to Oldest</h6>
                    <hr>
            
                    <ul class="cbp-list">
                        <li><b>1-555-555-5555</b>
                            <div>
                            <ul class="cbp-list__info">
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

                        <button class="cbp-btn cbp-btn__secondary--outline">
                            <i class="fas fa-phone"></i>
                            call
                        </button>
                        </div>
                    </li>
                    
                    <li>
                        <b>1-555-555-5555</b>
                        <div>
                        <ul class="cbp-list__info">
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

                        <button class="cbp-btn cbp-btn__secondary--outline">
                            <i class="fas fa-phone"></i>
                            call
                        </button>
                        </div>
                    </li>

                    <li>
                        <b>1-555-555-5555</b>
                        <div>
                        <ul class="cbp-list__info">
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

                        <button class="cbp-btn cbp-btn__secondary--outline">
                            <i class="fas fa-phone"></i>
                            call
                        </button>
                        </div>
                    </li>
                    </ul>
                    <div class="cbp-accordion__footer">
                    <div class="cbp-page-list">
                        <select name="" id="cbp-page-select">
                        <option value="1">1/Page</option>
                        <option value="2">2/Page</option>
                        <option value="3">3/Page</option>
                        <option value="4">4/Page</option>
                        <option value="5">5/Page</option>
                        <option value="6">6/Page</option>
                        <option value="7">7/Page</option>
                        <option value="8">8/Page</option>
                        <option value="9">9/Page</option>
                        <option selected="" value="10">10/Page</option>
                        </select>

                        <nav class="cbp-pagination">
                        <div class="cbp-page-list">
                            <select name="" id="cbp-page-select">
                            <option value="1">1 of 5</option>
                            <option value="2">2 of 5</option>
                            <option value="3">3 of 5</option>
                            <option value="4">4 of 5</option>
                            <option value="5">5 of 5</option>
                            </select>
                        </div>
                        <ul class="cbp-pagination-number">
                            <li class="cbp-pagination-down">
                            <button type="button" disabled="">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            </li>
                            <li>
                            <button class="active">1</button>
                            </li>
                            <li class="additonal-btn"><button>2</button></li>
                            <li class="additonal-btn"><button>3</button></li>
                            <li class="additonal-btn"><button>4</button></li>
                            <li class="additonal-btn"><button>5</button></li>
                            <li class="cbp-pagination-up">
                            <button>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            </li>
                        </ul>
                        </nav>
                    </div>
                    </div>
                </div>
            </div>

            <div class="cbp-accordion__item">
            <button class="cbp-accordion__title cbp-accordion__title--danger" aria-expanded="false" aria-controls="accordion-demo-1">
                <div>
                <i class="fas fa-angle-down"></i>
                <span>Adverse Events</span>
                </div>
                <div class="cbp-badge">
                <span class="cbp-text-badge">7</span>
                </div>
            </button>
            <div class="cbp-accordion__content" aria-labelledby="accordion-demo-1">
                <h6 class="cbp-text-heading-3xs text-italic">Most Recent to Oldest</h6>
                <hr>
                <ul class="cbp-list">
                <li>
                    <b>1-555-555-5555</b>
                    <div>
                    <ul class="cbp-list__info">
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

                    <button class="cbp-btn cbp-btn__secondary--outline">
                        <i class="fas fa-phone"></i>
                        call
                    </button>
                    </div>
                </li>
                
                <li>
                    <b>1-555-555-5555</b>
                    <div>
                    <ul class="cbp-list__info">
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

                    <button class="cbp-btn cbp-btn__secondary--outline">
                        <i class="fas fa-phone"></i>
                        call
                    </button>
                    </div>
                </li>

                <li>
                    <b>1-555-555-5555</b>
                    <div>
                    <ul class="cbp-list__info">
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

                    <button class="cbp-btn cbp-btn__secondary--outline">
                        <i class="fas fa-phone"></i>
                        call
                    </button>
                    </div>
                </li>
                </ul>
                <div class="cbp-accordion__footer">
                <div class="cbp-page-list">
                    <select name="" id="cbp-page-select">
                    <option value="1">1/Page</option>
                    <option value="2">2/Page</option>
                    <option value="3">3/Page</option>
                    <option value="4">4/Page</option>
                    <option value="5">5/Page</option>
                    <option value="6">6/Page</option>
                    <option value="7">7/Page</option>
                    <option value="8">8/Page</option>
                    <option value="9">9/Page</option>
                    <option selected="" value="10">10/Page</option>
                    </select>

                    <nav class="cbp-pagination">
                    <div class="cbp-page-list">
                        <select name="" id="cbp-page-select">
                        <option value="1">1 of 5</option>
                        <option value="2">2 of 5</option>
                        <option value="3">3 of 5</option>
                        <option value="4">4 of 5</option>
                        <option value="5">5 of 5</option>
                        </select>
                    </div>
                    <ul class="cbp-pagination-number">
                        <li class="cbp-pagination-down">
                        <button type="button" disabled="">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        </li>
                        <li>
                        <button class="active">1</button>
                        </li>
                        <li class="additonal-btn"><button>2</button></li>
                        <li class="additonal-btn"><button>3</button></li>
                        <li class="additonal-btn"><button>4</button></li>
                        <li class="additonal-btn"><button>5</button></li>
                        <li class="cbp-pagination-up">
                        <button>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        </li>
                    </ul>
                    </nav>
                </div>
                </div>
            </div>
            </div>
        </div>
    `;
};

export const Accordion = Template.bind({});
Accordion.args = {};
