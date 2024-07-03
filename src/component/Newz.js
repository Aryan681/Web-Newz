import React, { Component } from "react";
import NewzItems from "./NewzItems";
import Loader from "./loader";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class Newz extends Component {

  static defaultProps = {
    country: 'in',
    pagesize: 5,
    category: 'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalArticles: 0,
      loading: false,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewzWeb`;
  }

  fetchArticles = async (page = 1) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c74edaad4e384eef919f7f58a89ef26d&page=${page}&pageSize=${this.props.pagesize}`;
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
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / this.props.pagesize)) {
      await this.fetchArticles(this.state.page + 1);
    }
  };

  handlePrevPage = async () => {
    if (this.state.page > 1) {
      await this.fetchArticles(this.state.page - 1);
    }
  };

  noMoreArticles = () => {
    return this.state.page >= Math.ceil(this.state.totalArticles / this.props.pagesize);
  };

  fetchMoreData = async () => {
    if (this.noMoreArticles()) {
      return;
    }

    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c74edaad4e384eef919f7f58a89ef26d&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalArticles: parseData.totalResults,
      loading: false,
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <>
        <h1 className="my-3 text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={!this.noMoreArticles() && (
            <div className="d-flex justify-content-center my-3">
              <Loader />
            </div>
          )}
        >
          <div className="container my-3">
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
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default Newz;
