import React, { Component } from 'react'

export class NewsItem extends Component {
    
   
  render() {
    let {title, description, imageUrl, newsUrl, author, date, channel} = this.props
    return (
      <div className = "my-3">
        <span class="badge text-bg-dark" style = {{margin: "0% 75%"}}>{channel}</span>  
        <div className="card" >
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title"> {title}... </h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            <p class="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem