import * as helper from './helper';
import keys from './api/keys';
import { mockEventData, mockCleanEventData } from './mockData';

describe('helper', () => {
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  
  describe('getGeoLocation', () => {
    
  })

  describe('getAddressCoords', () => {

  })

  describe('cleanAddressCoords', () => {

  })

  describe('fetchCityData', () => {
    let location;

    beforeAll(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          events: 'array of events'
        })
      }));

      location = {
        coordinates: {
          lat: 1234,
          lng: 1234
        }
      }
    })

    it('should call fetch with the expected params', () => {
      const coords = location.coordinates;
  
      const url = `${corsAnywhereUrl}http://api.eventful.com/json/events/search?...&where=${coords.lat},${coords.lng}&within=25&&app_key=${keys.eventfulKey}`;
      const init = {mode: 'cors'};

      expect(window.fetch).not.toHaveBeenCalled();

      helper.fetchCityData(location);

      expect(window.fetch).toHaveBeenCalledWith(url, init);
    });

    it('should return an object if status code is okay', () => {
      const response = helper.fetchCityData(location);
      const expected = {events: 'array of events'};

      expect(response).resolves.toEqual(expected);
    });

    it('should throw an error if status code is not okay', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }));

      const response = helper.fetchCityData(location);
      const expected = Error('could not get city event data');

      expect(response).rejects.toEqual(expected);
    })
  })

  describe('cleanEventData', () => {
    it('should return clean data when event data and event category is passed in', () => {
      const expected = mockCleanEventData;
      const data = mockEventData;
      const category = 'event';

      expect(helper.cleanEventData(data, category)).toEqual(expected);
    })
  })

  describe('genApiUrl', () => {
    let location;

    beforeAll(() => {
      location = {
        coordinates: {
          lat: 1234,
          lng: 1234
        }
      }
    })

    //need to think about how to do this
    it('should return default url when location does not have coordinates', () => {

    })

    it('should return music url when type is music', () => {
      const expected = `${corsAnywhereUrl}http://api.eventful.com/json/events/search?......&where=1234,1234&within=25&&app_key=${keys.eventfulKey}&category=music`;
      const type = 'music';

      expect(helper.genApiUrl(type, location)).toEqual(expected);
    });

    it('should return food url when type is food', () => {
      const expected = `${corsAnywhereUrl}http://api.eventful.com/json/events/search?......&where=1234,1234&within=25&&app_key=${keys.eventfulKey}&category=food`;
      const type = 'food';

      expect(helper.genApiUrl(type, location)).toEqual(expected);
    });

    it('should return culture url when type is culture', () => {
      const expected = `${corsAnywhereUrl}http://api.eventful.com/json/events/search?......&where=1234,1234&within=25&&app_key=${keys.eventfulKey}&category=attractions`;
      const type = 'culture';

      expect(helper.genApiUrl(type, location)).toEqual(expected);
    });

    it('should return nightlife url when type is nightlife', () => {
      const expected = `${corsAnywhereUrl}http://api.eventful.com/json/events/search?......&where=1234,1234&within=25&&app_key=${keys.eventfulKey}&category=singles_social`;
      const type = 'nightlife';

      expect(helper.genApiUrl(type, location)).toEqual(expected);
    });
  })

  describe('getCategoryData', () => {

  })
})
