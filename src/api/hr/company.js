/* eslint-disable import/prefer-default-export */

import { hrApi } from '../index'

function searchCustomerList(searchOption) {
  console.log(searchOption)
  return hrApi.get('/company/searchCustomer', {
    params: {
      ...searchOption,
    },
  })
}

export { searchCustomerList }
