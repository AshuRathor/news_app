import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:8,
    category: "general"
  }
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  articles = [
//     {
//         "source": {
//             "id": "bbc-sport",
//             "name": "BBC Sport"
//         },
//         "author": null,
//         "title": "'£10 worth of salmon?' England's cricketers play Secret Santa",
//         "description": "Freya Davies, Alice Davidson-Richards, Nat Sciver and Katherine Brunt share what they would buy their teammates for Secret Santa.",
//         "url": "http://www.bbc.co.uk/sport/cricket/64050783",
//         "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/BAD6/production/_128103874_secretsanta.png",
//         "publishedAt": "2022-12-25T09:22:25.4026845Z",
//         "content": "The build-up to Christmas for England's women is slightly different - and warmer - to usual. \r\nThey played the last game of their eight-match series against the West Indies on 22 December, and arrive… [+5362 chars]"
//     },
//     {
//         "source": {
//             "id": "espn-cric-info",
//             "name": "ESPN Cric Info"
//         },
//         "author": null,
//         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//         "publishedAt": "2020-04-27T11:41:47Z",
//         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//     },
//     {
//         "source": {
//             "id": "espn-cric-info",
//             "name": "ESPN Cric Info"
//         },
//         "author": null,
//         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//         "publishedAt": "2020-03-30T15:26:05Z",
//         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//     }
]

  constructor(props){
    super(props ); 
    this.state = {
        articles : this.articles,
        page:1,
        loading: false,
        totalResults: 0
    }
    document.title = `${this.props.category} ${this.state.page} - Cat News`
    console.log("hellow Iam a constructor")

}
  async updateOnClick(pageNo){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5d0bd3ed6ba407cb7afbb5ee016ecc3&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.props.setProgress(0)
    this.setState({loading:true})
    this.props.setProgress(30)
    let data = await fetch(url)
    this.props.setProgress(60)
    let parsedData = await data.json()
    this.props.setProgress(80)
    console.log(parsedData)
    this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false})
    document.title = `${this.props.category} ${this.state.page} - Cat News`
    this.props.setProgress(100)
  }

  async componentDidMount(){
    console.log("cdm")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5d0bd3ed6ba407cb7afbb5ee016ecc3&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({articles:this.state.articles.concat(parsedData.articles), totalResults:parsedData.totalResults, loading:false})
    this.updateOnClick(this.state.page);
  }

  handleOnPrev = async()=>{
    console.log("prev page clicked")
    // console.log(this.state.page)
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5d0bd3ed6ba407cb7afbb5ee016ecc3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      // articles:parsedData.articles,
      // loading:false 
    })
    this.updateOnClick(this.state.page);
  }
  handleOnNext = async()=>{
    console.log("next page clicked")
    if(Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page+1){
    }
    else{
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5d0bd3ed6ba407cb7afbb5ee016ecc3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      // this.setState({loading:true})
      // let data = await fetch(url)
      // let parsedData = await data.json()
      // console.log(parsedData)
      this.setState({
        page: this.state.page+ 1,
        // articles:parsedData.articles,
        // loading:false
      })
      this.updateOnClick(this.state.page);

    }
  }

  fetchMoreData = async() => {
    this.setState({
      page:this.state.page+1,
      
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5d0bd3ed6ba407cb7afbb5ee016ecc3&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    console.log("The page number is ",this.state.page)
    this.setState({
      articles:  this.state.articles.concat(parsedData.articles), 
        totalResults:parsedData.totalResults})
  };

  render() {
    return (
      <>
        <h2 className='text-center'>Welcome to Newscat - top headlines</h2>
        {this.state.loading && <Spinner style = {{alignItem:"center"}}/>} {/* the spinner only works when loading is on */}
        
        {/* {this.state.articles.map((element)=>{console.log(element)})} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row"> 
        {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key  ={element.url} >
              <NewsItem imageUrl = {element.urlToImage} title = {element.title?element.title.slice(0,45):""} newsURL = {element.url} description = {element.description?element.description.slice(0,88):""} author = {element.author} date = {element.publishedAt} channel = {element.source.name}/>
            </div>

          })}
        </div>
          </div>
        
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleOnPrev}>&laquo; Previous</button>  
          <button type="button" disabled = {Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page+1} className="btn btn-dark" onClick={this.handleOnNext}>Next &raquo;</button>
        
        </div> */}
      </>
    )
  }
}

export default News