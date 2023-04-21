import { BallTriangle } from 'react-loader-spinner';
import { Box } from 'components/Box/Box';

export const LoadingSpinner = () => {
  return (
    <Box pt={5} display="flex" justifyContent="center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </Box>
  );
};
