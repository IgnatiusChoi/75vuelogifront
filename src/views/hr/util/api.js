import axios from 'axios';
import callPromise from "util/callPromise";

export const getBaseWorkTimeList = () =>
axios.get("http://localhost:8282/hr/base/baseWorkTimeList.do");

export const deleteBaseWorkTime = (param) =>
axios.delete("http://localhost:8282/hr/base/baseWorkTimeList.do", 
{ data: {sendData:JSON.stringify(param)} },
{  headers: {  "Content-Type": "application/json" }},
);

export const batchBaseWorkTime = (param) =>
    axios.post("http://localhost:8282/hr/base/baseWorkTimeList.do", 
    { sendData: param },
    {  headers: {  "Content-Type": "application/json" }},
    );