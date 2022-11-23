import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import SearchIcon from '@mui/icons-material/Search';
import TopBar from "../components/TopBar";
import SearchSongInfo from "../components/SearchSongInfo";
import NavBar from "../components/NavBar";

interface SearchResult {
  id: number;
  type: string;
  className: string;
  imgUrl: string;
}

export function HashResult() {
  const [value, setValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (!!value) {
      console.log(value);
      searchData(value);
    } else {
      setSearchResult([]);
    }
  }, [value]);

  const searchData = useCallback(async function getSearchData(value: string) {
    try {
      await axios
        .get(`http://i7d201.p.ssafy.io/api/tag/list/${value}`)
        .then((res) => {
          console.log(res.data.content);
          setSearchResult(res.data.content);
        });
    } catch (e) {
      console.error("search data Error : ", e);
    }
  }, []);
  return (
    <div>
      <TopBar />
      <div className="search-bar" style={{position: "sticky", top: "42px", padding: "2px 0px", backgroundColor: "#060318ff"}}>
        <div
          style={{ margin: "1rem", overflow: "hidden", borderRadius: "10px", }}
        >
          <form style={{ display: "flex",}}>
            <input
              type="text"
              name="value"
              style={{ flex: "11.5", padding: "5px 5px 5px 12px", color: "white", backgroundColor: "rgba(255, 255, 255, 0.2)", }}
              placeholder="What are you looking for?"
              value={value}
              onChange={handleChange}
            />
            <button
              type="submit"
              style={{ flex: "1.5", backgroundColor: "#E8AA42" }}>
            <SearchIcon/>
            </button>
          </form>
        </div>
      </div>
      <div>
        {[...searchResult].map((data, index) => (
          <SearchSongInfo
            key={data.id}
            id={data.id}
            img={data.imgUrl}
            value={data.type}
            type={data.className}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "6rem",
              height: "4rem",
              borderRadius: "50%",
              padding: "0px 1rem",
              margin: "1rem 1rem",
            }}
          />
        ))}

        {/* <SearchSongInfo />
        <SearchSongInfo /> */}
      </div>
      <br />
      <div>
        <NavBar current={"search"} />
      </div>
    </div>
  );
}
