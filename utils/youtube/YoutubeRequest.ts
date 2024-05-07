async function youtubeFetcher(
  pattern: string,
  key: string = "AIzaSyBVtr8dyY5BDPCMBrw0ix-l5BKekS5h8tU" // default API key
): Promise<JSON | null> {
  const address: string = `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${pattern}&part=snippet&type=video`;
  return await fetch(address)
    .then((response: Response) => {
      if (!response.ok) throw new Error("res is not ok");
      return response.json();
    })
    .then((data: JSON) => {
      console.log(data);
      return data;
    })
    .catch((error) => null);
}
export default youtubeFetcher;
