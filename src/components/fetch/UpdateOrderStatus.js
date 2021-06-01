import axios from "axios";

import { getFetchingOption, API_URL } from './options';

const updateOrderStatus = (token, orderId, statusId) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: `${API_URL}/orders/${orderId}/update_status/${statusId}`,
    withCredentials: true,
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

const chefValidateOrder = (token, orderId) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: `${API_URL}/orders/${orderId}/chef_validate`,
    withCredentials: true,
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

const barmanValidateOrder = (token, orderId) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: `${API_URL}/orders/${orderId}/barman_validate`,
    withCredentials: true,
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

export { updateOrderStatus, chefValidateOrder, barmanValidateOrder };
