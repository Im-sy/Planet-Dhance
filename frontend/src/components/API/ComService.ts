import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/"

export async function follow(
  fromId: number,
  toId: number,
) {
  try {
    const {data} = await axios.post(
      API_URL+`follow/${fromId}/${toId}`,
      {
        fromId: fromId,
        toId: toId,
      },
    ).then(
      res => {
        console.log(res)
        return res.data
      }
    );
    return data;
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

export async function unfollow(
  fromId: number,
  toId: number,
) {
  try {
    const {data} = await axios.delete(
      API_URL+`unfollow/${fromId}/${toId}`
    ).then(
      res => {
        console.log(res)
        return res.data
      }
    );
    return data;
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

export async function like(
  userId: number,
  videoId: number,
) {
  try {
    const {data} = await axios.post(
      API_URL+`like/${userId}/${videoId}`,
      {
        userId: userId,
        videoId: videoId,
      },
    ).then(
      res => {
        console.log(res)
        return res.data
      }
    );
    return data;
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

export async function unlike(
  userId: number,
  videoId: number,
) {
  try {
    const {data} = await axios.delete(
      API_URL+`unlike/${userId}/${videoId}`
    ).then(
      res => {
        console.log(res)
        return res.data
      }
    );
    return data;
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

export async function favFollow(
  userId: number,
  pageNum: number,
) {
  try {
    const data = await axios.get(
      API_URL+`user/${userId}/follow/${pageNum}`,
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

export async function favLike(
  userId: number,
  pageNum: number,
) {
  try {
    const data = await axios.get(
      API_URL+`user/${userId}/like/${pageNum}`,
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

export async function addHit(
  videoId: number,
) {
  try {
    const data = await axios.post(
      API_URL+`video/hit/${videoId}`,
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