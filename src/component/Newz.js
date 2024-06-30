import React, { Component } from "react";
import NewzItems from "./NewzItems";
import Loader from "./loader";
import PropTypes from 'prop-types'


export class Newz extends Component {

  static defaultProps ={
    country : 'in',
    pagesize : '5',
    category : 'general'
  }
  static PropType ={
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category : PropTypes.string

  }
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalArticles: 0,
      loading: false,
    };
  }

 

  fetchArticles = async (page = 1) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1330346e890489f9793904ea0730765&page=${page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalArticles: parseData.totalResults,
      page: page,
      loading: false,
    });
  };

  componentDidMount = async () => {
   
    await this.fetchArticles();
  };

  handleNextPage = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / `${this.props.pagesize}`)) {
      await this.fetchArticles(this.state.page + 1);
    }
  };

  handlePrevPage = async () => {
    if (this.state.page > 1) {
      await this.fetchArticles(this.state.page - 1);
    }
  };

  noMoreArticles = () => {
    return this.state.page >= Math.ceil(this.state.totalArticles /  `${this.props.pagesize}`);
  };

  render() {
    return (
    
      <div className="container my-3">
        <h1 className="my-3 text-center">Top Headlines</h1>
        <hr />
    
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
        {this.state.loading && (
      <div className="d-flex justify-content-center my-3">
        <Loader />
      </div>
    )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 my-1">
          {!this.state.loading && this.state.articles.map((element) => (
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
        
        <div className=" d-flex justify-content-between" >
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
