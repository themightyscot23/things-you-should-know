# Trivia Game Script

def trivia_game():
    # List of questions
    questions = [
        {"question": "What is the capital of Austria?", "answer": "Vienna"},
        {"question": "How do you say thank you in French?", "answer": "merci"},
        {"question": "How many people live in Amsterdam?", "answer": "820k"}
    ]

    # Iterate through each question
    for q in questions:
        # Ask the question
        user_answer = input(q["question"] + " ")

        # Give the correct answer
        print(f"The correct answer is: {q['answer']}\n")

if __name__ == "__main__":
    trivia_game()