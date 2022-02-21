export default class ScrollIndicator {

    constructor() {
        window.addEventListener( 'scroll', this.eventListener );
    }

    eventListener( event : Event ) : void {
        console.log( event );
    }

}
