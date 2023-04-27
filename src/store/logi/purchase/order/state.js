import mutations from '@/store/logi/purchase/order/mutation';
import actions from '@/store/logi/purchase/order/action';
export class Order {
    constructor() {
        this.orderList = [];
    }
}
const Purchase = {
    namespaced: true,
    state: new Order(),
    mutations,
    actions,
};
export default Purchase;
