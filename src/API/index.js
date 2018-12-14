class Reuse {
  static baseURL() {
    return "https://api.foursquare.com/v2/"; //foursquare is used for this project
  }
  static auth() {
    const keys ={
        client_id: "MI1Z5W4IBL43PB42IPIZUDJ5IXV02YO3EJ0SXE4BZ1RNUMDF",
        client_secret: "XSVCLYLIJNFF1AXCUWNN2BTXWQKGB3JFBO0C5ORVJWDPI24L",
        v: 20181120,
        }; //the client id and client secret used for developing this project
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(params) {
    if (!params) {
      return "";
    }
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static fetchHeaders(endPoint, method, params) {
    let request = {
      method,
      headers: Reuse.headers()
    };
    return fetch(
      `${Reuse.baseURL()}${endPoint}?${Reuse.auth()}&${Reuse.urlBuilder(
        params
      )}`,
      request
    ).then(response => response.json());
  }
}
//getting all the required data from the API
export default class fourSquare {
  static search(params) {
    return Reuse.fetchHeaders("venues/search", "GET", params);
  }
  static getVenue(VENUE_ID) {
    return Reuse.fetchHeaders(`venues/${VENUE_ID}`, "GET");
  }
  static getPhotos(VENUE_ID) {
    return Reuse.fetchHeaders(`venues/${VENUE_ID}/photos`, "GET");
  }
}
