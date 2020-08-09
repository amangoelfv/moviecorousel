  
genres={
         28:"Action",
         12:"Adventure",
         16:"Animation",
         35:"Comedy",
         80:"Crime",
         99:"Documentary",
         18:"Drama",
         10751:"Family",
         14:"Fantasy",
         36:"History",
         27:"Horror",
         10402: "Music",
         9648: "Mystery",
         10749: "Romance",
         878: "Science Fiction",
         10770: "TV Movie",
         53: "Thriller",
         10752: "War",
         37: "Western"
      }
    
  


const url=`https://api.themoviedb.org/3/movie/popular?api_key=73c3c4a4e786dc86e4038b79f7c8cec5`
const options={
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
}
export const getTrending=async()=>{

  
   const { results }=await fetch(url,options).then(response=>response.json())
    const movies=results.map(
        ({
            original_title,id,vote_average,poster_path,genre_ids,backdrop_path,overview
      
        })=>({
            key:String(id),
            title:original_title,
            rating:vote_average,
            poster:'http://image.tmdb.org/t/p/original'+poster_path,
            backdrop:'http://image.tmdb.org/t/p/original'+backdrop_path,
            description:overview,
            genres:genre_ids.map((genre)=>genres[genre])


        })
    )    
    console.log(movies);
    return movies


}