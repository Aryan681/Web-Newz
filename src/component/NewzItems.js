import React, { Component } from "react";

export class NewzItems extends Component {
  render() {
    let { title, description, imageUrl, url } = this.props;
    return (
        <div className="col mb-4">
          <div className="card h-100">
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={
                  imageUrl ||
                  "https://i0.wp.com/newz.mt/bng-media/2024/01/20240105-0015-NEWZ-Article-Image.jpg?resize=1250%2C720&ssl=1"
                }
                className="card-img-top"
                alt="..."
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '200px', // Set a fixed height for consistency
                }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{title || "..."}...</h5>
              <p className="card-text">{description || "..."}...</p>
              <a
                href={url}
                target="_blank"
                className="btn btn-sm btn-dark"
                rel="noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
  }
}

export default NewzItems;
