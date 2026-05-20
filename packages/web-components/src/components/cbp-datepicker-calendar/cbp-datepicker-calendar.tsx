import { Component, Element, Prop, State, Method, Listen, Host, h } from '@stencil/core';


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

  private focus: boolean = false;
  private monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @Element() private host: HTMLElement;

  @Prop({mutable:true}) date: string = new Date().toJSON().slice(0, 10); //`${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;

  @Prop({reflect:true,mutable:true}) panel: 'day' | 'month' | 'year' = 'day';

  @Prop() type: 'date' | 'month' | 'week' = "date";

  @Prop({ mutable: true }) min: string;
  @Prop({ mutable: true }) max: string;


  /** 
   * Specifies the context of the component as it applies to the visual design and whether 
   * it inverts when light/dark mode is toggled. 
   * Default behavior is "light-inverts" and does not have to be specified. 
   */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  @State() private dateObject: Date = new Date(this.date);
  @State() private day: number = this.dateObject.getDate();
  @State() private month: number = this.dateObject.getMonth();;
  @State() private year: number = this.dateObject.getFullYear();;

  /*
    getDate()
    getDay()

    getMonth()

    getFullYear()

    toDateString()

    toLocaleDateString();
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

      case "day": 
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

  @Method() 
  async setFocus(value) {
    console.log('Setting focus on: ', value, this.host.querySelector(`button[value="${value}]"`));
    (this.host.querySelector(`button[value="${value}]"`) as HTMLButtonElement)?.focus();
  }



  private selectDay(day) {
    this.day=day;
    this.datePicker.close();
  }

  private selectMonth(month) {
    this.month=month;
    this.type == "month" ? this.datePicker.close() : this.panel="day";
  }

  private selectYear(year) {
    this.year=year;
    this.panel= this.type == "month" ? "month" : "day";
  }



  private showPanel(panel) {
    console.log('Show Panel: ', this.panel, this.dateObject);
    this.focus=true;

    let panelContents;
    const min = new Date(this.min);
    const max = new Date(this.max);
    const minYear = min.getFullYear();
    const maxYear = max.getFullYear();
    let gridColumns: number;

    switch(panel) {
      case "day": 
        gridColumns = 7;

        const calendarToolbar = <div class="cbp-datepicker-calendar-toolbar">
          <cbp-button fill="ghost" color="secondary" name="selectYear" value={`${this.year}`}>{this.year}</cbp-button>
          <cbp-button fill="ghost" color="secondary" name="selectMonth" value={`${this.month}`}>{this.monthNames[this.month]}</cbp-button>
        </div>

        let dateControls: HTMLCbpButtonElement[]=[];
        for (let day = 1; day <= 31; day++ ) {
          let control:HTMLCbpButtonElement = <cbp-button fill="ghost" color="secondary" name="date" value={`${this.dateObject.toJSON().slice(0, 10)}`}>{day}</cbp-button>;
          dateControls = [...dateControls, control];
        };

        panelContents = <div>
          {calendarToolbar}
          <div role="application">{...dateControls}</div>
        </div>;
        break;

      case "month": 
        gridColumns = 3;
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
        gridColumns = 4;
        let yearControls: HTMLCbpButtonElement[]=[];
        for (let year = minYear; year <= maxYear; year++ ) {
          let control:HTMLCbpButtonElement = <cbp-button fill="ghost" color="secondary" name="month" value={`${year}`}>{year}</cbp-button>;
          yearControls = [...yearControls, control];
        };
        panelContents = <div role="application">{...yearControls}</div>;
        break;
    }
    
    this.host.style.setProperty('--cbp-datepicker-calendar-grid-columns', `${gridColumns}`)

    return panelContents;
  }

  componentWillLoad(){
    this.datePicker = this.host.closest('cbp-datepicker') as HTMLCbpDatepickerElement;
  }

  componentDidRender() {
    // set focus
    if(this.focus){
      switch(this.panel) {
        case "day": 
          this.setFocus(this.dateObject.getMonth()); 
          break;

        case "month": 
          this.setFocus(this.dateObject.getMonth());          
          break;

        case "year": 
          this.setFocus(this.dateObject.getFullYear());
          break;
      }
      this.focus=false;
    };
  }


  render() {
    //this.focus=false;
    console.log('Date Picker Calendar render: ', this.host, this.date, this.dateObject, this.year, this.month, this.day);

    return (
      <Host>
        {this.showPanel(this.panel)}
        <slot />
      </Host>
    );
  }

}

