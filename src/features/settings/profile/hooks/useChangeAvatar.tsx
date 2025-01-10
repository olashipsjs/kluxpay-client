import { useApolloClient } from '@apollo/client';
import { UPLOAD_FILE } from '@graphql/file';
import { CHANGE_AVATAR } from '@graphql/user';

const useChangeAvatar = () => {
  const client = useApolloClient();

  const changeAvatar = async (payload: any) => {
    const { file } = payload;

    try {
      const { data: uploadData } = await client.mutate({
        mutation: UPLOAD_FILE,
        variables: { file },
      });

      const fileId = uploadData?.uploadFile?._id;

      if (!fileId) {
        throw new Error('Unable to upload file');
      }

      const { data: fileData } = await client.mutate({
        mutation: CHANGE_AVATAR,
        variables: { fileId },
      });

      const user = fileData?.changeAvatar;

      if (!user) {
        throw new Error('Unable to change avatar');
      }

      return { user };
    } catch (error) {
      throw error;
    }
  };

  return { changeAvatar };
};

export default useChangeAvatar;
