function parseQuestions(str) {
  const regex =
    /(\d+)\.\s(.+)\n\s+A\)\s(.+)\n\s+B\)\s(.+)\n\s+C\)\s(.+)\n\s+D\)\s(.+)\n\s+Đáp án:\s(.+)/gm
  let match
  const questions = []

  while ((match = regex.exec(str)) !== null) {
    const question = {
      id: match[1],
      content: match[2],
      options: {
        A: match[3],
        B: match[4],
        C: match[5],
        D: match[6],
      },
      answer: match[7],
    }
    questions.push(question)
  }

  return questions
}

module.exports = parseQuestions
