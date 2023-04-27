import axios from "axios";
import Swal from "sweetalert2";
export const setSearchStockListAxios = (setSearchStockList) => {
  
    axios.get("http://localhost:8282/logi/purchase/searchStockList").then(({data}) => {
        if(data.errorCode < 0){
            return Swal.fire({
                icon: "error",
                title: data.errorMsg
              });
        }
        setSearchStockList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}

export const setSearchOrderInfoListOnDelivery = (setOrderInfoList) => {
    axios.get("http://localhost:8282/logi/purchase/searchOrderInfoListOnDelivery").then(({data}) => {
        if(data.errorCode < 0){
            return Swal.fire({
                icon: "error",
                title: data.errorMsg
              });
        }
        setOrderInfoList(data.gridRowJson);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}
export const setWarehousing = (orderNoList) => {
    axios.get("http://localhost:8282/logi/purchase/warehousing",{
        params:{
            orderNoList : orderNoList.join(",")
        }
    }).then(({data}) => {
        Swal.fire({
            icon: data.errorCode < 0 ? "error":"success",
            title: data.errorMsg
          });
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: e
          });
    });
}