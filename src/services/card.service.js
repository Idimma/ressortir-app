import Request from '../utils/Request';

class CardService {
  createCard = reference => Request()
    .post('ecommerce/cards/' + reference, {reference});
  allCard = () => Request()
    .get('ecommerce/cards');
  getSingleChat = (id) => Request()
    .get(`ecommerce/cards/${id}`);
  delete = (id, password) => Request()
    .delete(`ecommerce/cards/${id}`, { password });

}

export default new CardService();
