import axios from 'axios';
const API = 'https://hn.algolia.com/api/v3';
const fetchData = async query => {
  const url = `${API}/search?query=${query}`;
  return await axios.get(url);
};

const postData = async query => {
  const url = `${API}/search`;
  return await axios.post(url, { query });
};


jest.mock('axios');

describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: '1',
            title: 'a',
          },
          {
            objectID: '2',
            title: 'b',
          },
        ],
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData('react')).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${API}/search?query=react`,
    );
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(fetchData('react')).rejects.toThrow(errorMessage);
  });

  it('post successfully data to an API', async () => {
    const header = { 200: "ok" };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve(header),
    );

    await expect(postData('react')).resolves.toEqual(header);
  });
});