import { observable, autorun, computed } from 'mobx';

// not used, but can be used for global state
class PongStore {
  @observable personNumber = null;
  @observable message = "";

    setCurrentPerson(personNumber) {
      if (!personNumber || (personNumber != 1 && personNumber != 2)) {
        return;
      }
      this.personNumber = personNumber;
    }
}

var store = window.store = new PongStore

export default store;