def calculate_mbti(answers):
    """
    Fungsi untuk menghitung hasil MBTI berdasarkan jawaban user.
    Jawaban dalam bentuk list, misalnya: ["ya", "tidak", "ya", ...]
    """
    scores = {
        "E": 0, "I": 0,
        "S": 0, "N": 0,
        "T": 0, "F": 0,
        "J": 0, "P": 0
    }

    questions = [
        # E/I
        {"ya": "E", "tidak": "I"},
        {"ya": "E", "tidak": "I"},
        {"ya": "E", "tidak": "I"},
        # S/N
        {"ya": "S", "tidak": "N"},
        {"ya": "S", "tidak": "N"},
        {"ya": "S", "tidak": "N"},
        # T/F
        {"ya": "T", "tidak": "F"},
        {"ya": "T", "tidak": "F"},
        {"ya": "T", "tidak": "F"},
        # J/P
        {"ya": "J", "tidak": "P"},
        {"ya": "J", "tidak": "P"},
        {"ya": "J", "tidak": "P"}
    ]

    for i, answer in enumerate(answers):
        if answer in questions[i]:  
            scores[questions[i][answer]] += 1  

    mbti_result = (
        "E" if scores["E"] > scores["I"] else "I",
        "S" if scores["S"] > scores["N"] else "N",
        "T" if scores["T"] > scores["F"] else "F",
        "J" if scores["J"] > scores["P"] else "P"
    )

    return "".join(mbti_result)
