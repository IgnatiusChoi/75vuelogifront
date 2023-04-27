import { createSelector } from "reselect";

// input selector //

const selectHR = state => state.hr.affair;

// output selector //

export const selectSalaryList = createSelector(
  [selectHR],
  salaryListInselector => salaryListInselector.salaryList,
);

export const selectedErrorCD = createSelector(
  [selectHR],
  selectedErrorCD => selectedErrorCD.flag,
);
