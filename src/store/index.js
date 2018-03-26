import { observable } from "mobx";

class RootStore {
  @observable userName = 'Aaron Su'
}
const rootStore = new RootStore()
export default rootStore