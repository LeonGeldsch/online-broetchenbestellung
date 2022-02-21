export default class Input {

    el: any

    constructor( id: string ) {
        this.el = document.getElementById( id );
    }

    getValue() : string {

        return this.el.value;
    }

}
