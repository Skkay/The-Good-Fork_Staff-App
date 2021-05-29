import axios from "axios";

import getFetchingOption from './options';

const postReservation = (token, serviceId, tableId, date, customerName) => {
  const options = getFetchingOption(token);

  return axios({
    method: "POST",
    url: "http://192.168.1.18/3proj_api/public/api/reservations",
    withCredentials: true,
    data: {
      serviceId: serviceId,
      tableId: tableId,
      date: date,
      customerName: customerName,
    },
    headers: {
      'accept': options.headers.accept,
      'Authorization': options.headers.Authorization
    }
  });
}

export default postReservation;
