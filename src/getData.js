import axios from 'axios';

export const getData = async () => {
  try {
    const res = await axios(
      `https://dev-exercise.s3.amazonaws.com/movies.json`
    );
    return res.data;
  } catch (error) {
    alert(error);
  }
};
