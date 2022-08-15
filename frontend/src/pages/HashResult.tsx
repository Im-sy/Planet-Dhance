import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios';

import TopBar from '../components/TopBar'
import SearchSongInfo from '../components/SearchSongInfo';
import NavBar from '../components/NavBar'

interface SearchResult {
  id : number;
  type : string;
  className : string;
  imgUrl : string;
}

export function HashResult() {
  const [value, setValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
    
  };
  useEffect(() =>{
    if (!!(value)){
      console.log(value);
      searchData(value);
    }else{
      setSearchResult([])
    }
  },[value])

  const searchData = useCallback(async function getSearchData(value: string){
    try{
      await axios.get(`http://i7d201.p.ssafy.io/api/tag/list/${value}`).then((res)=>{
        console.log(res.data.content);
        setSearchResult(res.data.content);
      });
      
    }catch(e){
      console.error("search data Error : ",e);
    }
  },[])
  return (
    <div>
      <TopBar />
      <div className="search-bar">
      <div style={{ margin: '1rem', overflow:'hidden', borderRadius:'20px'}}>
      <form 
				style={{display: "flex"}}>
				<input
					type="text" name="value" 
					style={{flex:"10", padding:"5px", color:"black"}}
					placeholder="해시태그 검색" 
					value={value} onChange={handleChange} />
				<input type="submit" value="입력" 
					style={{flex:"2", backgroundColor:'#E8AA42'}} 
				/>
			</form>
    </div>
      </div>
      <div>
        {
          [...searchResult].map((data, index)=>
          <SearchSongInfo 
          key={data.id}
          id={data.id}
          img={data.imgUrl}
          value={data.type}
          type={data.className}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 1rem", margin:"0.5rem 1rem" }}
            />
          )
        }

        {/* <SearchSongInfo />
        <SearchSongInfo /> */}
      </div>
      <br />
      <div>
        <NavBar 
          current={"search"}
        />
      </div>
    </div>
  );
}
