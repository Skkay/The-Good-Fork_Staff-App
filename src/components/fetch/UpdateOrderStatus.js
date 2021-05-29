import axios from "axios";

import getFetchingOption from './options';

const updateOrderStatus = (token, orderId, statusId) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: `http://192.168.1.18/3proj_api/public/api/orders/${orderId}/update_status/${statusId}`,
    withCredentials: true,
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

export default updateOrderStatus;