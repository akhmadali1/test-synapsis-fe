import WithTokenn from "../../../configs/axios/withToken";

export default function useUser() {

  const GetAllUserAPI = async (props) => {
    let config = WithTokenn();
    let uData = [];
    let pageJoin = [];
    const page = props?.page;
    const perPage = props?.perPage;
    if (page) {
      pageJoin.push(`page=${page}`);
    }
    if (perPage) {
      pageJoin.push(`per_page=${perPage}`);
    }
    await config
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/users${pageJoin.length > 0 ? `?${pageJoin.join("&")}` : ""}`
      )
      .then((res) => {
        uData = res;
        return uData;
      })
      .catch((err) => {
        return err.response;
      });
    return uData;
  };

  const GetUserAPI = async (id) => {
    let config = WithTokenn();
    let uData = [];
    await config
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/users/${id}`
      )
      .then((res) => {
        uData = res;
        return uData;
      })
      .catch((err) => {
        return err.response;
      });
    return uData;
  };

  const PostUserAPI = async (data) => {
    let config = WithTokenn();
    let errorCode = 0;
    await config.post(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/users`, data).then(function (e) {
      if (e){
        errorCode = e.response.status
      }else{
        errorCode = 200
      }
    }).catch(function (error) {
      if (error.response) {
        errorCode = (error.response.status);
      }
    });
    return errorCode;
  };

  const PutUserAPI = async (id, data) => {
    let config = WithTokenn();
    let errorCode = 0;
    await config.put(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/users/${id}`, data).then(function (e) {
      if (e){
        errorCode = e.response.status
      }else{
        errorCode = 200
      }
    }).catch(function (error) {
      if (error.response) {
        errorCode = (error.response.status);
      }
    });
    return errorCode;
  };

  const DeleteUserAPI = async (id) => {
    let config = WithTokenn();
    let errorCode = 0;
    await config.delete(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/users/${id}`).then(function (e) {
      if (e){
        errorCode = e.response.status
      }else{
        errorCode = 200
      }
    }).catch(function (error) {
      if (error.response) {
        errorCode = (error.response.status);
      }
    });
    return errorCode;
  };


  return {
    GetAllUserAPI,
    GetUserAPI,
    PostUserAPI,
    PutUserAPI,
    DeleteUserAPI
  };
}