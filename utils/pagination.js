const pagination =(perPage)=>{
    const currentPage = Number(this.queryStr.page) || 1;
    const skipPage = perPage * (currentPage - 1);

    this.query = this.query.limit(perPage).skipPage
    return this;
  }

export default { pagination}