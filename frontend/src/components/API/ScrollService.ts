import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/"

export async function scrollVideoLatest(
  musicId: number,
  pageNum: number,
) {
  try {
    const data = await axios.get(
      API_URL+`music/${musicId}/latest/${pageNum}`,
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

export async function scrollVideoHitLike(
  musicId: number,
  pageNum: number,
) {
  try {
    const data = await axios.get(
      API_URL+`music/${musicId}/hitlike/${pageNum}`,
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