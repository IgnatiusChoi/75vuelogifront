import { useState, useEffect } from "react";

export default function useMonth() {
  const [selectedmonth, setselectedmonth] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const thisYear = new Date().getFullYear();

  let months = [];

  useEffect(() => {
    for (var i = 1; i < 13; i++) {
      months.push({
        value: thisYear + "-" + i,
        label: thisYear + "년 " + i + "월",
      });
    }
    setselectedmonth(months);
  }, []);

  return { selectedmonth };
}
