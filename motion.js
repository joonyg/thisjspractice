const $SearchId = document.querySelector(".moviecardList").innerHTML;
const $searchInput = document.querySelector("#guessinput");
const $submitButton = document.querySelector("#submitButton"); //# id 지칭
const $movieTitle = document.querySelector(".movie-title");
const $moiveCard = document.querySelectorAll(".movie-card");
const $searchclass = document.querySelector(".searchclass"); //.class 지칭

//검색 버튼을 눌럿을시 작동
$submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  const searchValue = $searchInput.value.trim();

  if (searchValue === "") {
    alert("영화제목을 작성해주세요");
  } else {
    findMovie(searchValue);
  }
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzEyYmI3NmY5ZjQzNzU1ZjAxMzAwOWVkYzc5MDFkMyIsInN1YiI6IjY1MmYyNDU0Y2FlZjJkMDBlMjhkMzMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SXVIGI3j0xD82oZJRu3546pG6-gGHA43YIogeCM1zh0",
  },
};

// API 호출 및 필터링
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//엔터키 누르면 값나오는 로직
$searchclass.addEventListener("submit", function (event) {
  event.preventDefault();

  if ($searchInput.value === "") {
    alert("영화제목을 작성해주세요");
  } else {
    findMovie($searchInput.value);
  }
});

//카드를 클릭시 카드의 고유 아이디를 보여주는 기능
$moiveCard.forEach((card) => {
  card.addEventListener("click", () => {
    const moviesid = card.getAttribute("id");
    alert(`id : ${moviesid}`);
  });
});

//검색한 값을 가져와서 문자열과 일치하는 카드만을 보여줌
function findMovie(searchValue) {
  //정규표현식 사용 : 검색한 문자열과 일치하는지
  const regex = new RegExp(searchValue, "i");

  $moiveCard.forEach((card) => {
    card.style.display = "none";
  });

  $moiveCard.forEach((card) => {
    const title = card.querySelector(".movie-title").innerText;

    if (regex.test(title)) {
      card.style.display = "block";
    }
  });
}
