import Request from "../utils/Request";

export default class BaseService {
    service;
    constructor() {
      this.service = Request();
    }

}

