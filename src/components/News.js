import React, {useState,useEffect}from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const  News=(props)=> {
    const[articles,setArticles]=useState([])
    const[loading,setLoading]=useState(true)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)

   const updateNews=async()=>{
    props.setProgress(10)
    console.log('cdm')
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data= await fetch(url)
    props.setProgress(30)
    let parsedData= await data.json()
    props.setProgress(70)
    console.log(parsedData)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
   }

   useEffect(()=>{
    updateNews() 
    //eslint-disable-next-line
   },[])
 
         
      
  
  
    const cfl=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1)
    }
    
        document.title=`${cfl(props.category)}-NewsMonkey`              

    
     
     const fetchMoreData = async () => {
     
      console.log('cdm')
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setPage(page+1)
      let data= await fetch(url)
      let parsedData= await data.json()
      console.log(parsedData)
      setArticles(articles.concat(parsedData.articles) )
        setTotalResults(parsedData.totalResults)
      
    }
  
    console.log('render')
    return (
      
        <>
        <h1 className='text-center'style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey-Top {cfl(props.category)} Headlines </h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length!==totalResults}
        loader={<Spinner/>}
      >
    <div className="container">
    <div className="row">
    
      
      { articles.map((element)=>{
        return <div className="col-md-4" key={element.imageUrl}>
        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} newsUrl={element.url}imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
      })}
    
    </div>
    </div>
    </InfiniteScroll>
      
          
        </>
         
         
          
      
    )
  }

News.defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
   }
   News.propTypes = {
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
   }

export default News
