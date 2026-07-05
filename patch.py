import re

with open('index.html', 'r') as f:
    content = f.read()

new_sandbox = 'sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"'
content = re.sub(r'sandbox="allow-scripts allow-same-origin"', new_sandbox, content)

with open('index.html', 'w') as f:
    f.write(content)
