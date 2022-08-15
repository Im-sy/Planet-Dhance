import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/"

export async function mainVideo() {
  try {
    const data = await axios.get(
      API_URL+`video/main`,
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

export async function musicList(songId: number) {
  try {
    const data = await axios.get(
      API_URL+`music/list/${songId}`,
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

export async function tagMusic(tagId: number) {
  try {
    const data = await axios.get(
      API_URL+`tag/${tagId}/music`,
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