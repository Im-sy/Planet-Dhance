import React from 'react'
import jwt_decode from 'jwt-decode';
import axios from "axios"

const API_URL = "https://i7d201.p.ssafy.io/api/user/"

interface signUpCreateSignUpRequest {
  email: string,
  nickname: string,
  introduce: string,
  nationName: string,
  pwd: string,
  oAuth2Sub: string,
  type: string,
}

export async function signup(
  email: string,
  nickname: string,
  introduce: string,
  nationName: string,
  pwd: string,
  oAuth2Sub: string,
  type: string,
) {
  try {
    const {data} = await axios.post(
      API_URL+'signup',
      {
        email: email,
        nickname: nickname,
        introduce: introduce,
        nationName: nationName,
        pwd: pwd,
        oAuth2Sub: oAuth2Sub,
        type: type
      },
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

export async function login(
  email: string,
  pwd: string,
) {
  try {
    const dataRes = await axios.post(
      API_URL+'login',
      {
        email: email,
        pwd: pwd,
      },
    ).then(
      res => {
        console.log(res)
        var token = res.data.token
        var decoded = jwt_decode(token);
        console.log(decoded)
        // localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
      }
    );
    console.log(dataRes)
    return dataRes;
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

export async function logout(userId: number) {
  try {
    const data = await axios.post(
      API_URL+`logout/${userId}`,
      {
        userId: userId
      },
    ).then(
      res => {
        console.log(res)
        // localStorage.removeItem("user");
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

export async function profile(userId: number) {
  try {
    const data = await axios.get(
      API_URL+`profile/${userId}`,
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

export async function update(userId: number) {
  try {
    const data = await axios.put(
      API_URL+`update/${userId}`,
      {
        userId: userId
      },
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

export async function deleteUser(userId: number) {
  try {
    const data = await axios.delete(
      API_URL+`delete/${userId}`,
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

export async function checkEmail(email: string) {
  try {
    const data = await axios.post(
      API_URL+`check/email`,
      {email: email}
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

export async function checkNick(nickname: string) {
  try {
    const data = await axios.post(
      API_URL+`check/nickname`,
      {nickname: nickname}
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

export async function oauth2() {
  try {
    const data = await axios.get(
      API_URL+`oauth2/authorization/google`,
    ).then(
      res => {
        console.log(res.data)
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