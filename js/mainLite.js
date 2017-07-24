/*!
 * Profile Sticker (c) 2017 Clyde D'Souza
 * clydedsouza.net
 * http://github.com/clydedz
 */


function checkForFaqPage() {
    /// <summary>Method that executes FAQ tasks if the current page is FAQ.</summary>
    if(window.location.href.toString().includes("/faq")){
        var allQuestions = document.getElementsByClassName("ps-faq-q");

        var doThisWhenYouClickAQuestion = function () {
            /// <summary>Method that handles the collapse logic of a FAQ item.</summary>
            var correspondingAnswer = document.getElementById(this.getAttribute("data-target"));
            var correspondingArrow = document.getElementById(this.getAttribute("data-target") + "-arrow");
            // Check if you're closing the QA item
            for (var k = 0; k < correspondingAnswer.classList.length; k++) {
                if (correspondingAnswer.classList.item(k) == "in") {
                    correspondingAnswer.classList.remove("in");
                    correspondingArrow.classList.remove("mdi-arrow-down");
                    correspondingArrow.classList.add("mdi-arrow-right");
                    return false;
                }
            }
            // If not, you're probably opening a closed QA item
            // In which case you close all other answers and then open only the corresponding answer item
            var allAnswers = document.getElementsByClassName("ps-faq-a");
            for (var i = 0; i < allAnswers.length; i++) {
                allAnswers[i].classList.remove("in");
            }
            var allArrows = document.getElementsByClassName("ps-faq-d");
            for (var i = 0; i < allArrows.length; i++) {
                allArrows[i].classList.remove("mdi-arrow-down");
                allArrows[i].classList.add("mdi-arrow-right");
            }
            correspondingAnswer.classList.add("in");
            correspondingArrow.classList.remove("mdi-arrow-right");
            correspondingArrow.classList.add("mdi-arrow-down");
        };

        // Add an event listener
        for (var i = 0; i < allQuestions.length; i++) {
            allQuestions[i].addEventListener('click', doThisWhenYouClickAQuestion, false);
        }
    }
};

checkForFaqPage();