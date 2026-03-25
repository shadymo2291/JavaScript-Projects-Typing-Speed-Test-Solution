// ==================
// Typing Speed Test:
// ==================

// General Element:
// ----------------
// ----------------

let small_screen = window.matchMedia(`(max-width: 780px)`); // **

let difficulity_title = document.querySelector(
  ".difficulity_control .name span",
);
let difficulity_options = document.querySelectorAll(
  ".difficulity_control_options span",
);
let mode_title = document.querySelector(".mode_control .name span");
let mode_options = document.querySelectorAll(".mode_control_options span");
let target_text = document.querySelector(".text_area .text");
let character_list;
let restart_btn = document.querySelector(".restart");
let typing_input = document.querySelector(".typing_input");
let word_per_minute = document.querySelector(
  ".info_container .wpm span:last-child",
);
let typing_accuracy = document.querySelector(
  ".info_container .accuracy span:last-child",
);
let adjusted_time = document.querySelector(
  ".info_container .time span:last-child",
);
let best_score = document.querySelector(".best_score div span");

let test_Complete = document.querySelector(".test_Complete");
let test_Complete_wpm = document.querySelector(
  ".test_Complete .wpm span:last-child",
);
let test_Complete_accuracy = document.querySelector(
  ".test_Complete .accuracy span:last-child",
);
let test_Complete_correct_ch = document.querySelector(
  ".test_Complete .character div span:first-child",
);
let test_Complete_incorrect_ch = document.querySelector(
  ".test_Complete .character div span:last-child",
);
let test_Complete_btn = document.querySelector(".test_Complete button");

let baseline_established = document.querySelector(".baseline_established");
let baseline_established_wpm = document.querySelector(
  ".baseline_established .wpm span:last-child",
);
let baseline_established_accuracy = document.querySelector(
  ".baseline_established .accuracy span:last-child",
);
let baseline_established_correct_ch = document.querySelector(
  ".baseline_established .character div span:first-child",
);
let baseline_established_incorrect_ch = document.querySelector(
  ".baseline_established .character div span:last-child",
);
let baseline_established_btn = document.querySelector(
  ".baseline_established button",
);

let higher_Score = document.querySelector(".higher_Score");
let higher_Score_wpm = document.querySelector(
  ".higher_Score .wpm span:last-child",
);
let higher_Score_accuracy = document.querySelector(
  ".higher_Score .accuracy span:last-child",
);
let higher_Score_correct_ch = document.querySelector(
  ".higher_Score .character div span:first-child",
);
let higher_Score_incorrect_ch = document.querySelector(
  ".higher_Score .character div span:last-child",
);
let higher_Score_btn = document.querySelector(".higher_Score button");

let control_section = document.querySelector(".info_controls");
let text_area_section = document.querySelector(".text_area");

let restart_container = document.querySelector(".restart_container");
let start_container = document.querySelector(".start_container");
let start_the_test_btn = document.querySelector("button.start");

let easy_paragraghs = [];
let medium_paragraghs = [];
let hard_paragraghs = [];
let target_array = [];

let all_data;

let current_Chara = 0;
let correct_ch = 0;
let incorrect_ch = 0;
let wpm = 0;
let accuracy = 0;

let time_mode_interval;
let passage_mode_timer;

let result = {};
let all_results = [];
let start = false;

let time_mode_counter;
let passage_mode_counter;

// Get The Data From JSON File:
// ----------------------------
// ----------------------------

let myRequest = new XMLHttpRequest();

myRequest.open("GET", "./json/data.json");
myRequest.send();
myRequest.onreadystatechange = function () {
  if (myRequest.readyState === 4 && myRequest.status === 200) {
    all_data = JSON.parse(myRequest.responseText);

    get_target_array(all_data);
  }
};

// Create The Main Array Of Paragraghs Depending On The Selected Level:
// --------------------------------------------------------------------
// --------------------------------------------------------------------

function get_target_array(main_data) {
  easy_paragraghs = [];
  medium_paragraghs = [];
  hard_paragraghs = [];
  target_text.innerHTML = "";

  // Create The Paragraghs Of different Modes:

  for (let i = 0; i < main_data.easy.length; i++) {
    easy_paragraghs.push(main_data.easy[i].text);
    medium_paragraghs.push(main_data.medium[i].text);
    hard_paragraghs.push(main_data.hard[i].text);
  }

  // Create The Target Array Depending On Selected Level:

  difficulity_options.forEach((dOption) => {
    if (dOption.classList.contains("selected")) {
      if (dOption.innerHTML === "easy") {
        target_array = easy_paragraghs;
      } else if (dOption.innerHTML === "medium") {
        target_array = medium_paragraghs;
      } else if (dOption.innerHTML === "hard") {
        target_array = hard_paragraghs;
      }
    }
  });

  get_random_text(target_array);
  restart_with_new_text(target_array);
}

// Get Random Text From The Main Array Of Paragraghs:
// -------------------------------------------------
// -------------------------------------------------

function get_random_text(arr) {
  let random_number;
  random_number = Math.floor(Math.random() * arr.length);

  let final_text = "";
  final_text = arr[random_number].split("");

  for (let i = 0; i < final_text.length; i++) {
    let character = document.createElement("span");
    character.innerHTML = final_text[i];
    target_text.appendChild(character);
  }

  arr.splice(random_number, 1);

  character_list = document.querySelectorAll(`.text span`);

  typing_input.value = "";
  typing_input.focus();
  current_Chara = 0;
  correct_ch = 0;
  incorrect_ch = 0;

  if (start_container.style.display === "none") {
    check_the_charater(character_list);
  }
}

// Get Random Text From The Main Array Of Paragraghs With Restart Btn:
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function restart_with_new_text(t_arr) {
  restart_btn.onclick = () => {
    target_text.innerHTML = "";
    typing_accuracy.innerHTML = `0%`;
    word_per_minute.innerHTML = 0;

    clearInterval(passage_mode_timer);
    clearInterval(time_mode_interval);

    set_timer();

    get_random_text(t_arr);

    if (target_array.length === 0) {
      get_target_array(all_data);
    }
  };
}

// Get Random Text From The Main Array Of Paragraghs With Changing Level:
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

difficulity_options.forEach((diff_option) => {
  diff_option.onclick = () => {
    difficulity_options.forEach((d) => {
      d.classList.remove("selected");
    });

    diff_option.classList.add("selected");

    if (target_array.length === 0) {
      return false;
    }

    typing_input.value = "";

    typing_input.focus();

    current_Chara = 0;
    correct_ch = 0;
    incorrect_ch = 0;

    typing_accuracy.innerHTML = `0%`;
    word_per_minute.innerHTML = 0;

    change_the_title_of_controlers();

    get_target_array(all_data);

    if (start_container.style.display === "none") {
      check_the_charater(character_list);
    }

    clearInterval(passage_mode_timer);
    clearInterval(time_mode_interval);

    set_timer();
  };
});

mode_options.forEach((mode_option) => {
  mode_option.onclick = () => {
    mode_options.forEach((mode) => {
      mode.classList.remove("selected");
    });

    mode_option.classList.add("selected");

    if (target_array.length === 0) {
      return false;
    }

    typing_input.value = "";

    typing_input.focus();

    current_Chara = 0;
    correct_ch = 0;
    incorrect_ch = 0;

    typing_accuracy.innerHTML = `0%`;
    word_per_minute.innerHTML = 0;

    change_the_title_of_controlers();

    get_target_array(all_data);

    if (start_container.style.display === "none") {
      check_the_charater(character_list);
    }

    clearInterval(passage_mode_timer);
    clearInterval(time_mode_interval);

    set_timer();
  };
});

// Setting The Timer:
// -----------------
// -----------------

function set_timer() {
  mode_options.forEach((mode) => {
    if (mode.classList.contains("selected")) {
      if (mode.innerHTML === "timed(60s)") {
        time_mode_counter = 60;

        if (start_container.style.display === "none") {
          time_mode_interval = setInterval(() => {
            --time_mode_counter;

            if (time_mode_counter <= 10) {
              adjusted_time.classList.add("losing_time");
            } else {
              adjusted_time.classList.remove("losing_time");
            }

            let seconds = Math.floor(time_mode_counter % 60);
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            let minutes = Math.floor(time_mode_counter / 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            adjusted_time.innerHTML = `${minutes}:${seconds}`;

            if (current_Chara == character_list.length) {
              adjusted_time.classList.remove("losing_time");
              adjusted_time.innerHTML = `00:00`;

              clearInterval(time_mode_interval);
            }
            if (time_mode_counter === 0) {
              clearInterval(time_mode_interval);

              get_the_score(wpm, accuracy, correct_ch, incorrect_ch);
              adjusted_time.classList.remove("losing_time");
              adjusted_time.innerHTML = `00:00`;

              typing_input.blur();
            }
          }, 1000);
        }
      } else {
        passage_mode_counter = 0;

        if (start_container.style.display === "none") {
          passage_mode_timer = setInterval(() => {
            passage_mode_counter++;

            let seconds = Math.floor(passage_mode_counter % 60);
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            let minutes = Math.floor(passage_mode_counter / 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            adjusted_time.innerHTML = `${minutes}:${seconds}`;

            if (current_Chara == character_list.length) {
              clearInterval(passage_mode_timer);
              clearInterval(time_mode_interval);

              adjusted_time.innerHTML = `00:00`;

              typing_input.blur();
            }
          }, 1000);
        }
      }
    }
  });
}

set_timer();

// Setting Before Start The Test:
// -----------------------------
// -----------------------------

clearInterval(passage_mode_timer);
clearInterval(time_mode_interval);

target_text.onclick = () => {
  typing_input.focus();
};

// Start The Test:
// --------------
// --------------

start_the_test_btn.onclick = () => {
  start_container.style.display = "none";

  restart_container.style.display = "flex";

  typing_input.focus();

  target_text.style.filter = "blur(0px)";

  typing_input.value = "";

  typing_input.focus();

  current_Chara = 0;
  correct_ch = 0;
  incorrect_ch = 0;

  typing_accuracy.innerHTML = `0%`;
  word_per_minute.innerHTML = 0;

  change_the_title_of_controlers();
  get_target_array(all_data);
  check_the_charater(character_list);

  clearInterval(passage_mode_timer);
  clearInterval(time_mode_interval);

  set_timer();
};

// Change Mode And Difficulity Title With Screen Size Change:
// ---------------------------------------------------------
// ---------------------------------------------------------

function change_the_title_of_controlers() {
  if (small_screen.matches) {
    // **
    difficulity_options.forEach((dOption) => {
      if (dOption.classList.contains("selected")) {
        difficulity_title.innerHTML = dOption.innerHTML;
      }
    });

    mode_options.forEach((mOption) => {
      if (mOption.classList.contains("selected")) {
        mode_title.innerHTML = mOption.innerHTML;
      }
    });
  } else {
    difficulity_title.innerHTML = "difficulity:";

    mode_title.innerHTML = "mode:";
  }
}

change_the_title_of_controlers();

small_screen.addEventListener("change", change_the_title_of_controlers); // **

// Check The Correct and Incorrect Character:
// ------------------------------------------
// ------------------------------------------

function check_the_charater(ch_list) {
  typing_input.setAttribute("maxlength", ch_list.length);

  ch_list[current_Chara].classList.add("active");

  typing_input.oninput = () => {
    ch_list[current_Chara].classList.remove("active");

    if (typing_input.value.split("")[current_Chara] == null) {
      current_Chara--;

      if (ch_list[current_Chara].classList.contains("correct")) {
        correct_ch--;
      } else {
        incorrect_ch--;
      }

      ch_list[current_Chara].classList.remove("correct", "incorrect");
    } else {
      if (
        typing_input.value.split("")[current_Chara] ===
        ch_list[current_Chara].innerHTML
      ) {
        ch_list[current_Chara].classList.add("correct");

        correct_ch++;
      } else {
        ch_list[current_Chara].classList.add("incorrect");

        incorrect_ch++;
      }

      // Calculate The WPM and Accuracy: **

      mode_options.forEach((mode) => {
        if (mode.classList.contains("selected")) {
          if (mode.innerHTML === "timed(60s)") {
            if (60 - time_mode_counter > 0) {
              wpm = Math.round(
                correct_ch / 5 / ((60 - time_mode_counter) / 60),
              );
              word_per_minute.innerHTML = `${wpm}`;
            }
          } else {
            if (passage_mode_counter > 0) {
              wpm = Math.round(correct_ch / 5 / (passage_mode_counter / 60));
              word_per_minute.innerHTML = `${wpm}`;
            }
          }
        }
      });

      accuracy = ((correct_ch / (correct_ch + incorrect_ch)) * 100).toFixed(0);
      if (accuracy == 100) {
        typing_accuracy.style.color = "#4cd67a";
      } else {
        typing_accuracy.style.color = "#d64c5a";
      }

      typing_accuracy.innerHTML = `${accuracy}%`;

      current_Chara++;

      if (current_Chara < ch_list.length) {
        ch_list[current_Chara].classList.add("active");
      }

      if (current_Chara == ch_list.length) {
        setTimeout(() => {
          get_the_score(wpm, accuracy, correct_ch, incorrect_ch);
        }, 1200);
      }
    }
  };
}

// Get The Result and Show The Score:
// ----------------------------------
// ----------------------------------

function get_the_score(wpm, accuracy, correct_ch, incorrect_ch) {
  result = {
    time: new Date(),
    wpm: wpm,
    accuracy: accuracy,
    correctCharacter: correct_ch,
    inCorrectCharacter: incorrect_ch,
  };

  all_results.push(result);

  window.sessionStorage.setItem("all_results", JSON.stringify(all_results));

  // Show The Score:

  clearInterval(passage_mode_timer);
  clearInterval(time_mode_interval);

  if (parseInt(accuracy) === 100) {
    test_Complete_accuracy.style.color = "#4cd67a";
    baseline_established_accuracy.style.color = "#4cd67a";
    higher_Score_accuracy.style.color = "#4cd67a";
  }
  if (!start) {
    test_Complete_accuracy.innerHTML = `${accuracy}%`;
    test_Complete_correct_ch.innerHTML = `${correct_ch}/`;
    test_Complete_incorrect_ch.innerHTML = incorrect_ch;
    test_Complete_wpm.innerHTML = wpm;

    control_section.style.display = "none";
    text_area_section.style.display = "none";

    test_Complete.style.display = "flex";
    start = true;
  } else {
    if (parseInt(wpm) > parseInt(best_score.innerHTML)) {
      higher_Score_accuracy.innerHTML = `${accuracy}%`;
      higher_Score_correct_ch.innerHTML = `${correct_ch}/`;
      higher_Score_incorrect_ch.innerHTML = incorrect_ch;
      higher_Score_wpm.innerHTML = wpm;

      control_section.style.display = "none";
      text_area_section.style.display = "none";
      higher_Score.style.display = "flex";
    } else {
      baseline_established_accuracy.innerHTML = `${accuracy}%`;
      baseline_established_correct_ch.innerHTML = `${correct_ch}/`;
      baseline_established_incorrect_ch.innerHTML = incorrect_ch;
      baseline_established_wpm.innerHTML = wpm;

      control_section.style.display = "none";
      text_area_section.style.display = "none";
      baseline_established.style.display = "flex";
    }
  }

  get_best_score();
}

// Get Best Score:
// ----------------
// ----------------

function get_best_score() {
  if (window.sessionStorage.getItem("all_results")) {
    let scores = JSON.parse(window.sessionStorage.getItem("all_results"));

    let highest_score = [];

    for (let i = 0; i < scores.length; i++) {
      highest_score.push(Object.values(scores[i])[1]);
    }
    best_score.innerHTML = `${Math.max(...highest_score)}`;
  } else {
    best_score.innerHTML = 0;
  }
}

get_best_score();

// buttons control:
// ----------------
// ----------------

test_Complete_btn.onclick = restart;
baseline_established_btn.onclick = restart;
higher_Score_btn.onclick = restart;

function restart() {
  control_section.style.display = "flex";
  text_area_section.style.display = "block";

  test_Complete.style.display = "none";
  baseline_established.style.display = "none";
  higher_Score.style.display = "none";

  target_text.innerHTML = "";
  typing_accuracy.innerHTML = `0%`;
  word_per_minute.innerHTML = 0;
  clearInterval(passage_mode_timer);
  clearInterval(time_mode_interval);
  set_timer();

  get_random_text(target_array);

  if (target_array.length === 0) {
    get_target_array(all_data);
  }
}
