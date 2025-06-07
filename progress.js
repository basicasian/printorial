// progress.js

function getProgress() {
    return JSON.parse(localStorage.getItem('progress')) || {};
  }
  
  function saveProgress(progress) {
    localStorage.setItem('progress', JSON.stringify(progress));
  }
  
  function markInteraction(chapterId, isQuiz = false) {
    const progress = getProgress();
    if (!progress[chapterId]) {
      progress[chapterId] = {
        hasInteracted: false,
        quizStarted: false,
        quizCompleted: false
      };
    }
    progress[chapterId].hasInteracted = true;
    if (isQuiz) progress[chapterId].quizStarted = true;
    saveProgress(progress);
  }
  
  function markQuizCompleted(chapterId, completed) {
    const progress = getProgress();
    if (!progress[chapterId]) {
      progress[chapterId] = {
        hasInteracted: false,
        quizStarted: false,
        quizCompleted: false
      };
    }
    progress[chapterId].quizCompleted = completed;
    saveProgress(progress);
  }
  
  function getChapterStatus(chapterId) {
    const progress = getProgress();
    const chapter = progress[chapterId];
    if (chapter && chapter.quizCompleted) {
      return { text: "Completed", color: "green" };
    }
    if (chapter && (chapter.hasInteracted || chapter.quizStarted)) {
      return { text: "In progress", color: "orange" };
    }
    return { text: "Not started", color: "red" };
  }
  