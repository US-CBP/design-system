import { Component, Element, Prop, State, Method, Listen, Event, EventEmitter, Host, h } from '@stencil/core';
//import { doKeyboardNav } from '../../utils/utils';

/** 
 * The Date PIcker Calendar is not intended only for use within the Date Picker dialog and not for individual/standalone use.
 * 
 * @slot - ??
 */
@Component({
  tag: 'cbp-datepicker-calendar',
  styleUrl: 'cbp-datepicker-calendar.scss',
  //shadow: true, // Test with shadowDOM and without
})
export class CbpDatepickerCalendar {

  //private formField: HTMLInputElement;
  private datePicker: HTMLCbpDatepickerElement;
  //private today: Date = new Date();
  private focusIndex: number | undefined;
  private panelItems: HTMLCbpButtonElement[] = [];
  private gridColumns: number | undefined;

  //private focus: boolean = false;
  private monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @Element() private host: HTMLElement;

  @Prop({mutable:true}) date: string = new Date().toJSON().slice(0, 10) || ''; // `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;

  @Prop({reflect:true,mutable:true}) panel: 'day' | 'month' | 'year' = 'day';

  @Prop() type: 'date' | 'month' | 'week' | string = "date";

  @Prop({ mutable: true }) min: string;
  @Prop({ mutable: true }) max: string;


  /** 
   * Specifies the context of the component as it applies to the visual design and whether 
   * it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  @State() private dateObject: Date; // = new Date(this.date);
  //@State() private day: number; // = this.dateObject.getDate();
  //@State() private month: number; // = this.dateObject.getMonth();
  //@State() private year: number; // = this.dateObject.getFullYear();

  /*
    getDate() - returns day (numeric)
    getDay()

    getMonth() - returns zero-based index

    getFullYear()

    toDateString()

    toLocaleDateString();
  */

  @Event() dateSelected: EventEmitter;
  @Event() monthSelected: EventEmitter;
  @Event() yearSelected: EventEmitter;
  /*
  dateSelectedHandler(selectedDate: string) {
    this.dateSelected.emit({ 
      date: selectedDate
    });
  }
  */


  @Listen('buttonClick')
  handleButtonClick(e) {
    console.log('Button Click', e);
    const { name, value } = e.detail;
    switch(name) {
      case "selectYear": 
        this.panel="year";
        break;

      case "selectMonth": 
        this.panel="month";
        break;

      case "date": 
        this.selectDay(value);
        break;

      case "month": 
        this.selectMonth(value);
        break;

      case "year": 
        this.selectYear(value);
        break;
    }
  }


  // Does this need to be a method?
  // Sets focus by value (not index)
  @Method() 
  async setFocus(value) {

    this.focusIndex = this.panelItems.findIndex(item => item.querySelector('button').getAttribute('value') == `${value}`);

    setTimeout(() => {
      console.log('Setting focus on: ', value, this.focusIndex, this.host.querySelector(`button[value="${value}"]`));
      (this.host.querySelector(`button[value="${value}"]`) as HTMLButtonElement)?.focus();
    }, 100);
  }

  // All key presses within the datepicker calendar/panel itself
  private handleKeyPress(e) {
    const { key } = e;
    const navKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    const position   = this.focusIndex % this.gridColumns;
    const lastItemPosition = (this.panelItems?.length-1) % this.gridColumns;

    // Handle standard menu nav keys
    if (navKeys.includes(key)) {

      const i = this.focusIndex; // index of the item that currently has focus
      const l = this.panelItems?.length - 1 || 0; // index of the last item
      const n = {
        Home: 0,
        ArrowUp: -1 < i - this.gridColumns 
          ? i - this.gridColumns 
          : (position > lastItemPosition) 
            ? l - this.gridColumns + (position - lastItemPosition) 
            : l - (lastItemPosition - position),
        ArrowLeft: -1 < i + -1 
          ? i + -1 
          : l,
        ArrowDown: l + 1 > i + this.gridColumns 
          ? i + this.gridColumns 
          : 0 + position, 
        ArrowRight: l + 1 > i + 1 
          ? i + 1 
          : 0,
        End: l,
      }[key];
      if (n !== undefined) {
        console.log('Date Picker Calendar Key Press: ', key, {i}, {l}, {n}, {position}, {lastItemPosition});
        this.focusIndex = n;
        this.setCurrentPanelItem(this.focusIndex);
        e.preventDefault(); // Stop these navigation keys from scrolling the page
      }
    }
    return;
  }

  setCurrentPanelItem(i = 0) {
    this.panelItems?.[i]?.querySelector('button')?.focus();
    //this.panelItems?.[i] || console.log('No button found to focus on in the panelItems collection at index: ', i);
  }


  private selectDay(selectedDate: string) {
    //this.day=day;
    //this.datePicker.close();
    this.dateSelected.emit({ 
      date: selectedDate,
      dateObject: new Date(selectedDate.split('-').join('/'))
    });
  }

  private selectMonth(month) {
    //this.month=month;
    if(this.type == "month") {
      this.dateSelected.emit({ 
        month: month
      });
      this.datePicker.close();
    }
    else {
      // set the month initially
      this.dateObject.setMonth(month);
      // If the month rolled over because the day was invalid for that month
      // (e.g., setting Feb 31 -> March 3 or March 2), snap to the last day of the target month
      if (this.dateObject.getMonth() !== ((month % 12 + 12) % 12)) {
        // Zero day of the next month gives the last day of the current month
        this.dateObject.setDate(0);
      }
      this.date = this.dateObject.toJSON().slice(0, 10);
      //this.focus=true;
      this.panel="day";
    }
  }

  private selectYear(year) {
    //this.year=year;
    this.dateObject.setFullYear(year);
    this.date = this.dateObject.toJSON().slice(0, 10);
    //this.focus=true;
    this.panel = this.type == "month" ? "month" : "day";
  }


  // render the contents of the day/month/year panel based on the current value of the `panel` property.
  private showPanel(panel) {
    console.log('Show Panel: ', this.panel, this.dateObject, this.date);
    //this.focus=true;
    const dateObject = new Date(this.date);

    let panelContents;
    const min = new Date(this.min);
    const max = new Date(this.max);
    const minYear = min.getFullYear();
    const maxYear = max.getFullYear();

    switch(panel) {
      case "day": 
        this.gridColumns = 7;
        const weekdayAbbrs = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const calendarToolbar = <div class="cbp-datepicker-calendar-toolbar">
          <cbp-button fill="outline" color="secondary" name="selectYear" value={`${dateObject.getFullYear()}`}>{dateObject.getFullYear()}</cbp-button>
          <cbp-button fill="outline" color="secondary" name="selectMonth" value={`${dateObject.getMonth()}`}>{this.monthNames[dateObject.getMonth()]}</cbp-button>
        </div>

        let dayHeaders: HTMLElement[]=[];
        for (let dayHeader = 0; dayHeader < weekdayAbbrs.length; dayHeader++ ) {
          let header:HTMLCbpButtonElement = <div>{weekdayAbbrs[dayHeader]}</div>;
          dayHeaders = [...dayHeaders, header];
        };

        let dateControls: HTMLCbpButtonElement[]=[];
        // Passing 0 as the day gives us the last day of the specified month
        const totalDays = new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate(); 
        
        // loop over days of the month
        // TODO: needs to account for day of the week positioning
        for (let day = 1; day <= totalDays; day++ ) {
          let control:HTMLCbpButtonElement = <cbp-button fill="ghost" color="secondary" name="date" value={`${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`}>{day}</cbp-button>;
          dateControls = [...dateControls, control];
        };

        panelContents = <div>
          {calendarToolbar}
          <div role="application">
            {...dayHeaders}
            {...dateControls}
          </div>
        </div>;
        break;

      case "month": 
        this.gridColumns = 3;
        const monthAbbrs = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthControls: HTMLCbpButtonElement[]=[];
        monthAbbrs.forEach( (month, index) => {
          let control:HTMLCbpButtonElement = <cbp-button fill="ghost" color="secondary" name="month" value={`${index}`}>{month}</cbp-button>;
          monthControls = [...monthControls, control];
        });
        panelContents = <div role="application">{...monthControls}</div>;
        break;

      case "year": 
        this.gridColumns = 4;
        let yearControls: HTMLCbpButtonElement[]=[];
        for (let year = minYear; year <= maxYear; year++ ) {
          let control:HTMLCbpButtonElement = <cbp-button fill="ghost" color="secondary" name="year" value={`${year}`}>{year}</cbp-button>;
          yearControls = [...yearControls, control];
        };
        panelContents = <div role="application">{...yearControls}</div>;
        break;
    }
    
    this.host.style.setProperty('--cbp-datepicker-calendar-grid-columns', `${this.gridColumns}`)

    return panelContents;
  }

  componentWillLoad(){
    this.datePicker = this.host.closest('cbp-datepicker') as HTMLCbpDatepickerElement;
  }

  componentWillRender() {
    if(this.date) {
      // using yyyy-mm-dd format invokes UTC date format, but converting to commas or slashes uses local date format.
      this.dateObject = new Date(this.date.split('-').join('/'));
      //this.day = this.dateObject.getDate();
      //this.month = this.dateObject.getMonth()+1; // convert to actual month number from zero-based month index
      //this.year = this.dateObject.getFullYear();
    }
  }

  componentDidRender() {
    //console.log('Date Picker Calendar componentDidRender, setting focus:');

    // Update the panelItems collection after render
    this.panelItems = Array.from(this.host.querySelectorAll('[role=application] cbp-button')) as HTMLCbpButtonElement[];

    // set focus
    //console.log('Setting focus on: ', this.panel, this.dateObject);
    switch(this.panel) {
      case "day": 
        if(this.date) this.setFocus(this.dateObject.toJSON().slice(0, 10));
        break;

      case "month": 
        this.setFocus(this.dateObject.getMonth());
        break;

      case "year": 
        this.setFocus(this.dateObject.getFullYear());
        break;
    };
  }


  render() {
    //this.focus=false;
    console.log('Date Picker Calendar render');
    console.log('Date Property: ', this.date);
    console.log('Date Object: ', this.dateObject);
    //console.log('Year: ', this.year);
    //console.log('Month: ', this.month);
    //console.log('Day: ', this.day);

    return (
      <Host onKeyDown={(e) => this.handleKeyPress(e)}>
        {this.date && this.showPanel(this.panel)}
        <slot />
      </Host>
    );
  }

}

