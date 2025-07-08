import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class NewsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const URL = "https://api.spaceflightnewsapi.net/v4/articles";

    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.results || [], loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { articles, loading, error } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Spaceflight News</h1>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {!loading &&
            !error &&
            articles.map((article, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      className="card-img-top"
                      alt={article.title}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      {article.summary || "No summary available."}
                    </p>
                    <a
                      href={article.url}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default NewsApp;
