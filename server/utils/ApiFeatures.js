class ApiFeatures {
  constructor(queryDB, queryURL) {
    this.queryDB = queryDB;
    this.queryURL = queryURL;
  }

  filter() {
    const queryUrlObj = { ...this.queryURL };
    const excludedFromFiltering = ["sort", "fields", "page", "limit"];
    excludedFromFiltering.map((el) => delete queryUrlObj[el]);

    let queryUrlStr = JSON.stringify(queryUrlObj);
    queryUrlStr = queryUrlStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const filter = JSON.parse(queryUrlStr);

    this.queryDB.find(filter);

    return this;
  }

  sort() {
    if (this.queryURL.sort) {
      const sortBy = this.queryURL.sort.split(",").join(" ");
      this.queryDB.sort(sortBy);
    }
    return this;
  }

  fields() {
    if (this.queryURL.fields) {
      const fields = this.queryURL.fields.split(",").join(" ");
      this.queryDB.select(fields);
    } else {
      this.queryDB.select("-__v");
    }

    return this;
  }

  pagination() {
    const page = this.queryURL.page * 1 || 1;
    const limit = this.queryURL.skip * 1 || 50;
    const skip = (page - 1) * limit;

    this.queryDB.limit(limit).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
