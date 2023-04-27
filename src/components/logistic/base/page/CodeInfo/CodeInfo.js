import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch,useSelector } from 'react-redux';
import CodeGrid from './CodeGrid';
import DetailCodeGird from './DetailCodeGird';

const useStyles = makeStyles((theme) => ({
    divTag: {
      display: 'flex',
      float:'left',  
      width:'49.5%',
      height:'calc(100vh - 220px)',
      alignItems: 'center',
      marginTop:'7vh'
    }
  }));

function CodeInfo() {

    const [edit, setEdit] = useState(false);

    const classes=useStyles();

    const [divisionCodeNo,setDivisionCodeNo] =useState([]);

    const onClick=(divisionCodeNo)=>{
        setDivisionCodeNo(divisionCodeNo);
    }
    return (
        <>
            <div className={classes.divTag} style={{marginRight:'1%'}}>
                <CodeGrid setEdit={setEdit} onClick={onClick}/>
            </div>
            <div className={classes.divTag}>
                <DetailCodeGird divisionCodeNo={divisionCodeNo} edit={edit} onClick={onClick}/>
            </div>
        </>
    );
}

export default CodeInfo;