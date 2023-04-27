/* import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css"; */
import Axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import DeployHead from './DeployHead';
import DeployGrid from './DeployGrid';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const Deploy = () => {
    const [itemCode, setItemCode] = useState(null);
    const [divisionCode, setDivisionCode] = useState(null);
    const [deployCondition, setDeployCondition] = useState(null);     

    const [bom, getBomDeployFetch] = useAsync((param) =>api.getBomDeploy(param), [], true);
    
    const getBomDeploy = useCallback(() => {
        const params = {
            deployCondition: deployCondition,
            itemCode: itemCode,
            divisionCode: divisionCode,
        }
        getBomDeployFetch(params);
    },[deployCondition, divisionCode, getBomDeployFetch, itemCode]);

    const searchBom = () => {
        if(itemCode === null && deployCondition === null) {
            alert("품목코드 검색을 먼저 해주시고, BOM 검색조건을 선택해주세요.");
            return;
        }else if(deployCondition === null) {
            alert("BOM 검색조건을 선택해주세요. \n(정전개를 할건지 역전개를 할건지 선택해주세요.)");
            return;
        }else if(itemCode === null) {
            alert("품목코드검색을 먼저해주세요.");
            return;
        }
        getBomDeploy();
    }; 

    const props = {setDeployCondition, setItemCode, setDivisionCode, searchBom, bom};  
    
    return (
        <>            
            <DeployHead trCondition = {setDeployCondition}
                trItemCode = {setItemCode}
                trDivisionCode = {setDivisionCode}
                searchBom = {searchBom}
            />            
            <DeployGrid props = {props} />            
        </>
    );
};

export default Deploy;