import styled from 'styled-components';
import MovieComponent from "./components/MovieComponents";
import { useState } from 'react';
import axios from "axios";
import MovieInfoComponent from './components/MovieInfoComponent';
export const API_KEY= 'a506cc04';


// Styled component for a container with a flex column layout
const Container = styled.div`
  display: flex;
  flex-direction: column;                                  // Container's children will be arranged in a column
`;

// Styled component for a header with a flex row layout and styling
const Header = styled.div`
  display: flex;
  flex-direction: row;                             // Header content will be arranged in a row
  justify-content: space-between;
  background-color: black;                                        // Black background color
  color: white;                                                    // White text color
  padding: 10px;                                                // Padding around the header content
  font-size: 25px;                                                 // Font size of the header text
  font-weight: bold;                                                       // Bold font for emphasis
  box-shadow: 0px 3px 6px 0px #555;                                      // Box shadow for a subtle depth effect
  align-items:center;                                           //vertical alignment
`;

// rest of code
// we need to divide the appname and search box
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;                                
`;

const MovieImage= styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  

`;
const imageUrl = ('https://cdn1.vectorstock.com/i/1000x1000/91/65/movie-camera-flat-app-icon-with-long-shadow-vector-3619165.jpg');

//creating searchbox
const SearchBox= styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color:white;
align-items:center;
`;

// create search icon
const SearchIcon = styled.img`
  width: 32px; /* Adjust the width as needed */
  height: 32px; /* Adjust the height as needed */
`;

const searchUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIipC-vMEFEecKPfRr66bvMgAF7KPhvg8PA&usqp=CAU';

const SearchInput= styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer=styled.div`
display: flex;
flex-direction:row;
flex-wrap: wrap;
padding:30px;
gap:24px;
justify-content: space-evenly;        //so that elements are evenly spaced
`; 


function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    // Handle the response or return it as needed
    console.log(response)
    updateMovieList(response.data.Search)
  };
  
  const onTextChange = (event) =>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout= setTimeout(()=> fetchData(event.target.value),500);
    updateTimeoutId(timeout)
  };
  return ( 
    <Container>
    <Header>
      <AppName>        
<MovieImage src={imageUrl} alt="Movie Image"></MovieImage>
        Moviedoo
        </AppName>
        <SearchBox>
          <SearchIcon src={searchUrl} alt="Search Icon"></SearchIcon>
          <SearchInput 
          placeholder="Search your movie here..."
           value ={searchQuery} 
           onChange={onTextChange}
           />
        </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie}/>}
    

    <MovieListContainer>
  {movieList?.length ? (
    movieList.map((movie, index) => <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>)
  ) : (
    "No Movies Found"
  )}
</MovieListContainer>

    </Container>
  );
}

export default App;
