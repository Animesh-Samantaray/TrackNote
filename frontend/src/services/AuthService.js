import API from "./api";

export const signin=async(data)=>{
  await API.post('/auth/signin',data);
}
export const signup=async(data)=>{
  await API.post('/auth/signup',data);
}
export const logout=async()=>{
  await API.post('/auth/logout');
}
export const me=async()=>{
  await API.get('/auth/me');
}
export const deleteAccount=async()=>{
  await API.delete('/auth/');
}


