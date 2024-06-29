import React, { Component } from "react";
import NewzItems from "./NewzItems";

export class Newz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalArticles: 0,
      loading: false,
    };
  }

 

  fetchArticles = async (page = 1) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c74edaad4e384eef919f7f58a89ef26d&page=${page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalArticles: parseData.totalResults,
      page: page,
    });
  };

  componentDidMount = async () => {
    await this.fetchArticles();
  };

  handleNextPage = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / 20)) {
      await this.fetchArticles(this.state.page + 1);
    }
  };

  handlePrevPage = async () => {
    if (this.state.page > 1) {
      await this.fetchArticles(this.state.page - 1);
    }
  };

  noMoreArticles = () => {
    return this.state.page >= Math.ceil(this.state.totalArticles / 20);
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-3 text-center">Top Headlines</h1>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevPage}
            className="btn btn-dark"
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.noMoreArticles()}
            onClick={this.handleNextPage}
          >
            Next
          </button>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 my-1">
          {this.state.articles.map((element) => (
            <div className="col mb-4" key={element.url}>
              <NewzItems
                title={element.title ? element.title.slice(0, 50) : ""}
                description={
                  element.description ? element.description.slice(0, 100) : ""
                }
                imageUrl={element.urlToImage}
                url={element.url}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevPage}
            className="btn btn-dark"
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.noMoreArticles()}
            onClick={this.handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Newz;
