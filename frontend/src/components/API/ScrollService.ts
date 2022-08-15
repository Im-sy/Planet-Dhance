import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/"

export async function scrollTagArtist(
  tagId: number,
  pageNum: number,
) {
  try {
    const data = await axios.get(
      API_URL+`tag/${tagId}/artist/${pageNum}`,
    ).then(
      res => {
        console.log(res)
        return res.data
      }
    );
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message)
      return error.message
    } else {
      console.log(error)
      return 'unexpected error occurred'
    }
  }
}