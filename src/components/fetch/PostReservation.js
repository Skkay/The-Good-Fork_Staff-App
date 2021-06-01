import axios from "axios";

import { getFetchingOption, API_URL } from './options';

const postReservation = (token, serviceId, tableId, date, customerName) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: `${API_URL}/reservations`,
    withCredentials: true,
    data: {
      serviceId: serviceId,
      tableId: tableId,
      date: date,
      reservedByStaff: true,
      customerName: customerName,
    },
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

export default postReservation;
