import useUser from '@hooks/useUser';

const useConfirm = () => {
  const { setUser } = useUser();

  const confirm = async () => {
    setUser({ type: 'VERIFY_EMAIL' });
  };

  return { confirm };
};

export default useConfirm;
