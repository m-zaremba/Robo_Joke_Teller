window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button");
  const audio = document.getElementById("audio");

  const toggleButtonState = () => {
    button.toggleAttribute("disabled");
  }

  const formatJoke = (data) => {
    let joke = "";
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellAJoke(joke);
  };

  const getJokes = async () => {
    const apiUrl =
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const tellAJoke = (joke) => {
    VoiceRSS.speech({
      key: "Your API key",
      src: joke,
      hl: "en-gb",
      v: "Alice",
      r: -1,
      c: "mp3",
      f: "44khz_16bit_stereo",
      ssml: false,
    });
    toggleButtonState();
  };

  button.addEventListener("click", () => {
    getJokes().then((data) => formatJoke(data));
  });
  audio.addEventListener("ended", () => {
    toggleButtonState();
  });
});
