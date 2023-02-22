class APIFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  // search function to such product by keyword
    search() {
      const keywords = this.queryStr.keywords;
      if (keywords) {
        const regex = new RegExp(keywords, "i");
        this.query = this.query.find({ $or: [{ name: regex }, { description: regex }] });
      }
      return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        // remove fields from queryCopy
        const removeFields = ["keywords", "limit", "page"];
        removeFields.forEach((el) => delete queryCopy[el]);
    
        // advance filter for price, ratings etc
        

        // Filter by price range
    const { price } = this.queryStr;
    if (price) {
      const range = price.split("-");
      if (range.length === 2) {
        const minPrice = range[0] || 0;
        const maxPrice = range[1] || Number.MAX_SAFE_INTEGER;
        this.query = this.query.find({ price: { $gte: minPrice, $lte: maxPrice } });
      } else {
        const priceVal = parseInt(price);
        if (!isNaN(priceVal)) {
          this.query = this.query.find({ price: { $gte: priceVal } });
        }
      }
    }
    return this;
      }


   
  }
  
  module.exports = APIFeatures;
  