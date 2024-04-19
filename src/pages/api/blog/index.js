import WithTokenn from "../../../configs/axios/withToken";

export default function usepost() {

  const GetAllPostAPI = async () => {
    let config = WithTokenn();
    let uData = [];
    await config
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts`
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

  const GetPostAPI = async (id) => {
    let config = WithTokenn();
    let uData = [];
    let uDataComment = [];
    await config
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts/${id}`
      )
      .then((res) => {
        uData.data = res;
      })
      .catch((err) => {
        return err.response;
      });

    await config
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts/${id}/comments`
      )
      .then((res) => {
        uDataComment = res;
      })
      .catch((err) => {
        return err.response;
      });
    uData['comments'] = uDataComment;
    return uData;
  };

  const PostPostAPI = async (data) => {
    let config = WithTokenn();
    let uData = [];
    await config
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts`,
        data
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

  const PutPostAPI = async (id, data) => {
    let config = WithTokenn();
    let uData = [];
    await config
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts/${id}`,
        data
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

  const DeletePostAPI = async (id) => {
    let config = WithTokenn();
    let uData = [];
    await config
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_API_HOST}/posts/${id}`
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


  return {
    GetAllPostAPI,
    GetPostAPI,
    PostPostAPI,
    PutPostAPI,
    DeletePostAPI
  };
}