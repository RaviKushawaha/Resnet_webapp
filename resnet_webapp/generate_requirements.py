import subprocess
import re

# Run 'pip list' and capture the output
output = subprocess.run(['pip', 'list'], stdout=subprocess.PIPE).stdout.decode('utf-8')

# Split the output into lines and skip the header
lines = output.split('\n')[2:]

# Open requirements.txt file for writing
with open('requirements.txt', 'w') as f:
    for line in lines:
        # Each line has the format 'package version'
        # We use regex to capture the package name and version separately
        match = re.match(r'(\S+)\s+(\S+)', line)
        if match:
            package, version = match.groups()
            # Write the package and version in 'package==version' format
            f.write(f'{package}=={version}\n')

print('requirements.txt has been generated.')
