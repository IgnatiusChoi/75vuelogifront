//**************************************** 2020-11-19 최지은 시작 ****************************************
import { makeStyles } from "@material-ui/core/styles";

const usestyles = makeStyles(theme => ({
  // 간격띄우기
  margin: {
    "& > *": { margin: theme.spacing(2) },
  },
  cal: {
    padding: theme.spacing(2),
  },
}));

export default usestyles;
//**************************************** 2020-11-19 최지은 종료 ****************************************
