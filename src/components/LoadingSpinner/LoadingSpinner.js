import { BallTriangle } from 'react-loader-spinner';
import { Box } from 'components/Box/Box';

export const LoadingSpinner = () => {
  return (
    <Box pt={5} display="flex" justifyContent="center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#F7A600"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </Box>
  );
};
