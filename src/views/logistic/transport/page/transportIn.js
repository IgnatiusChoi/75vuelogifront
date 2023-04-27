import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import axios from "axios";
import Swal from "sweetalert2";

//김승표
function TransportIn(props) {
    
    const [Searchvehicle, setSearchvehicleList] = useState();
    const [list, setList] = useState([]);
    const [grid, setGrid] = useState();
    const [edit, setEdit] = useState(false);

    const column = {
        columnDefs: [
            { headerName: '차량', field: 'commercialVehicle' },
            { headerName: '기사님', field: 'driver' }, 
            { headerName: '출차 상태', field: 'transportStatus', editable: true},
        ]
    };

    const setSearchvehicle = (setSearchvehicleList) => {
  
        axios.get("http://localhost:8282/logi/transport/getCommercialVehicleInList").then(({data}) => {
            if(data.errorCode < 0){
                return Swal.fire({
                    icon: "error",
                    title: data.errorMsg
                  });
            }
            setSearchvehicleList(data.gridRowJson);
        }).catch(e => {
            Swal.fire({
                icon: "error",
                title: e
              });
        });
    }
        const api = params => {
        setGrid(params.api);
    };

    const update = () => {
        console.log('뭐야'+JSON.stringify(Searchvehicle));
        for (var i = 0; i < Searchvehicle.length; i++) {
            console.log('뭐야22222'+JSON.stringify(Searchvehicle[i]));
            console.log('asios');
            axios.post('http://localhost:8282/logi/transport/updateCarStatusReady', Searchvehicle[i])
            .then(response => {
                console.log('성공1');
                setList([]); //그냥 리렌더링할려고 억지로 list 건드려봄
                setSearchvehicleList(response.data.gridRowJson);
                console.log('성공2');
            })
            .catch(e => {
                console.log('실패'+e);
                alert('실패');
                return;
            });
        }
        alert('완료 되었습니다');
    };

    useEffect(() => {
        setSearchvehicle(setSearchvehicleList);
    }, [list]);

    return (
        <>
            <MyGrid
                column={column}
                title={'입차 관리'}
                list={Searchvehicle}
                rowData={list}
                rowSelection="multiple"
            >
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '1vh' }}
                    onClick={update}
                    api={api}
                >
                    저장
                </Button>
            </MyGrid>
        </>
    );
}

export default TransportIn;