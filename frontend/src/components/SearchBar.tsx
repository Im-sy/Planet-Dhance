import React, {useState} from 'react'
import axios from 'axios';

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log('e', event.target.value)
		// axios.get
		setValue(event.target.value)
	};

  return (
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
  )
}
