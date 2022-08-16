import React, {useState} from 'react'
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log('e', event.target.value)
		// axios.get
		setValue(event.target.value)
	};

  return (
		<div>
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
		
  )
}
