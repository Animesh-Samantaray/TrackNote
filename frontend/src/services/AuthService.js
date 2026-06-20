import API from "./api";

export const signin=async(data)=>{
  return await API.post('/auth/signin',data);
}
export const signup=async(data)=>{
  return await API.post('/auth/signup',data);
}
export const logout=async()=>{
  return await API.post('/auth/logout');
}
export const me=async()=>{
  return await API.get('/auth/me');
}
export const deleteAccount=async()=>{
  return await API.delete('/auth/');
}


