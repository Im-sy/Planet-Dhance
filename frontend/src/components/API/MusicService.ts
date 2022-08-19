import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/"

export async function mainVideo(pageNum: number) {
  try {
    const data = await axios.get(
      API_URL+`video/main/${pageNum}`,
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

export async function tagSearch(
  tagId: number,
  searchType: string,
  pageNum: number
) {
  try {
    const data = await axios.get(
      API_URL+`tag/${tagId}/${searchType}/${pageNum}`,
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

export async function playVideo(
  videoId: number,
  prevPage: string,
  userId: number,
) {
  try {
    const data = await axios.get(
      API_URL+`video/${videoId}/${prevPage}/${userId}`,
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

export async function randomPlayVideo(
  userId: number,
) {
  try {
    const data = await axios.get(
      API_URL+`video/random/${userId}`,
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

export async function challenge(
  musicId: number,
  userId: number,
) {
  try {
    const data = await axios.get(
      API_URL+`music/${musicId}/challenge/${userId}`,
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

export async function upload(
  formData: FormData
) {
  try {
    const data = await axios.post(
      API_URL+`video/upload`,
      {
        formData: formData
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
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