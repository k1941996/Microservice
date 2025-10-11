import eComm from './EcommApiInterceptor';

export const createProduct = (data) => eComm.post('/product/create', data);
