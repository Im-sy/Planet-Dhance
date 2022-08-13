import SearchSongInfo from '../components/SearchSongInfo';


export function HashResult() {
  return (
    <div>
      <div className="search-bar">
        <h3>검색창 자리</h3>
      </div>
      <div>
        <SearchSongInfo
          img={'여기에 이미지 url 혹은 blob'}
          value={'#Song'}
          type={0}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 1rem", margin:"0.5rem 1rem" }}
        />
        <SearchSongInfo
          img={'여기에 이미지 url 혹은 blob'}
          value={'# Artist'}
          type={1}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 1rem", margin:"0.5rem 1rem" }}
        />
        <SearchSongInfo
          img={'여기에 이미지 url 혹은 blob'}
          value={'# Custom'}
          type={2}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 1rem", margin:"0.5rem 1rem" }}
        />
        <SearchSongInfo
          img={'여기에 이미지 url 혹은 blob'}
          value={'# Custom2'}
          type={2}
          sx={{ display: 'flex', flexDirection: 'column', width: '5rem',  borderRadius: "50%", padding:" 0px 1rem", margin:"0.5rem 1rem" }}
        />

        {/* <SearchSongInfo />
        <SearchSongInfo /> */}
      </div>
      <br />
    </div>
  );
}
