import subprocess

def validate_dockerfile(dockerfile_text):

    with open("Dockerfile", "w") as f:
        f.write(dockerfile_text)

    result = subprocess.run(["hadolint", "Dockerfile"], capture_output=True, text=True)

    return result.stdout or "No issues found!"

