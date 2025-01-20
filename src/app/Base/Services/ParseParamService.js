class ParseParamService {
  /**
   * Parse query parameters and return an object of filters.
   * @param {Object} query - The query object from the request.
   * @returns {Object} The filters object.
   */
  static parseQueryParams(query) {
    const filters = {};
    if (query.title) {
      filters.title = query.title;
    }
    if (query.performer) {
      filters.performer = query.performer;
    }
    return filters;
  }
}

module.exports = ParseParamService;
