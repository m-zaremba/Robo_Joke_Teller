window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button");

  const formatJoke = (data) => {
    let joke = "";
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    return joke;
  };

  const getJokes = async () => {
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  getJokes().then((data) => formatJoke(data));

});
