import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deleteSavePost,
  getAllUsers,
  getCurrentUser,
  getPostById,
  getRecentPosts,
  getSavedPost,
  likePost,
  savePost,
  signInUserAccount,
  signOutUserAccount,
} from "../Appwrite/api";
import { Enum } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInUserAccount = () => {
  return useMutation({
    mutationFn: (user) => signInUserAccount(user),
  });
};

export const useSignOutUserAccount = () => {
  return useMutation({
    mutationFn: signOutUserAccount,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Enum.GET_RECENT_POST],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [Enum.GET_RECENT_POST],
    queryFn: getRecentPosts,
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: likePost,
  });
};

export const useSavePost = () => {
  return useMutation({
    mutationFn: savePost
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:deleteSavePost,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[Enum.GET_RECENT_POST]
      })
    }
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: [Enum.GET_CURRENT_USER],
  });
};

export const useGetPostById = ()=>{
  return useQuery({
    queryFn:getPostById,
    
  })
}

export const useGetSavedPost =(saves)=>{
  return useQuery({
    queryFn:(saves)=>getSavedPost(saves),
    queryKey:[Enum.GET_POSTs]
  })
}

export const useGetAllUsers =()=>{
  return useQuery({
    queryFn:getAllUsers,
    queryKey:['getall']

  })
  }
