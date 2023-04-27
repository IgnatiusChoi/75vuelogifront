import { makeStyles } from '@material-ui/styles';

//*************************외출 및 조퇴 시작 _준서 _20.08.24 *************************
const UseStyles = makeStyles(theme => ({
    topPaper: {
        padding: theme.spacing(1),
        height: 90,
        background: 'white'
    },
    rightPaper: {
        padding: theme.spacing(2),
        height: 650
    },
    leftPaper: {
        padding: theme.spacing(2),
        height: 650
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
        paddingTop: 8,
        margin: 8
    },
    button: {
        margin: 20
    },
    subCategory: {
        background: '#232f3e',
        color: 'white'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    topFormControl: {
        margin: theme.spacing(1),
        minWidth: 300
    }
}));

export default UseStyles;
//*************************외출 및 조퇴 종료 _준서 _20.08.24 *************************
