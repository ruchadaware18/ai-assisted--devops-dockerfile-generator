import ollama



def generate_dockerfile(language, framework=""):
    PROMPT = f"""
    ONLY generate an ideal Dockerfile for a {language} project using {framework} with best practices.
    Do not use any markdown formatting like ``` or ''' in the start or in the end. 
    Include the #!/bin/bash in the start of the file. Just return plain Dockerfile content, starting with the FROM instruction.
    Do not provide any description. Make sure the command for installing the framework is present.
    Include:
    - Base image
    - Installing dependencies including {framework} that is input by user
    - Setting working directory
    - Adding source code
    - Running the application

    """

    response = ollama.chat(model='llama3.2:1b', messages=[{'role': 'user', 'content': PROMPT}])

    return response['message']['content']