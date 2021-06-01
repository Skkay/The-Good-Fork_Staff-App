import getFetchingOption from './options';

const fetchOrders = (token, statusId, eatIn) => {
  const options = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/orders?status.id=${statusId}&eatIn=${eatIn}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

const fetchAllOrders = (token, statusId) => {
  const options = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/orders?status.id=${statusId}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

const fetchAllOrdersForChef = (token) => {
  const options = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/orders?status.id=3&chefHasValidated=false`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

const fetchAllOrdersForBarman = (token) => {
  const options = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/orders?status.id=3&barmanHasValidated=false`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export { fetchOrders, fetchAllOrders, fetchAllOrdersForChef, fetchAllOrdersForBarman };
